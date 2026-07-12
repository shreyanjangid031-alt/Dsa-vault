require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const vaultIndex = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'vault-index.json'), 'utf-8')
);

// --- Layer 1: Edit distance (Levenshtein) ---
function editDistance(a, b) {
  a = a.toLowerCase().trim();
  b = b.toLowerCase().trim();

  // dp[i][j] = edit distance between first i chars of a and first j chars of b
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // characters match, no edit needed
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // delete
          dp[i][j - 1],     // insert
          dp[i - 1][j - 1]  // substitute
        );
      }
    }
  }

  return dp[a.length][b.length];
}

// Normalize titles before comparing: strip underscores/spaces so
// "Two_Sum_Complete" and "Two Sum Complete" are treated the same
function normalize(title) {
  return title.toLowerCase().replace(/[_\s-]+/g, '');
}

function findTitleMatches(draftTitle) {
  const normDraft = normalize(draftTitle);
  const matches = [];

  for (const note of vaultIndex) {
    const existingTitle = path.basename(note.filename, '.md');
    const normExisting = normalize(existingTitle);
    const distance = editDistance(normDraft, normExisting);

    // Threshold: allow small distance relative to string length.
    // e.g. distance <= 3 catches typos/formatting differences without
    // false-matching genuinely different titles.
    const threshold = Math.max(2, Math.floor(normExisting.length * 0.15));

    if (distance <= threshold) {
      matches.push({ title: existingTitle, distance });
    }
  }

  return matches;
}

// --- Layer 2: Content-level near-duplicate check (LLM) ---
async function checkContentOverlap(draftTitle, draftContent) {
  const lightIndex = vaultIndex.map(note => ({
    title: path.basename(note.filename, '.md'),
    topic: note.topic,
    tags: note.tags,
  }));

  const systemPrompt = `You detect near-duplicate notes in an Obsidian DSA vault.
A near-duplicate means the draft covers substantially the same underlying problem
or technique as an existing note, even if titled differently — not just a related topic.

STRICT RULES:
- Only reference titles that appear EXACTLY in the provided existing notes list.
- Being "related" (e.g. both use arrays) is NOT enough — it must be essentially the same problem/technique.
- If unsure, do not flag it — false negatives are safer than false positives here.
- Respond with ONLY valid JSON: {"likely_duplicate_of": "Exact Title" or null, "reasoning": "one sentence"}`;

  const userPrompt = `EXISTING notes:
${JSON.stringify(lightIndex, null, 2)}

DRAFT note:
Title: ${draftTitle}
Content:
${draftContent}`;

  const completion = await groq.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.1,
  });

  return JSON.parse(completion.choices[0].message.content);
}

// --- Combined check ---
async function checkDuplicate(draftTitle, draftContent) {
  const titleMatches = findTitleMatches(draftTitle);

  // Only bother calling the LLM if title-matching found nothing —
  // no point spending an API call when we're already confident.
  let contentCheck = null;
  if (titleMatches.length === 0) {
    contentCheck = await checkContentOverlap(draftTitle, draftContent);
  }

  return { titleMatches, contentCheck };
}

// --- Test run ---
// --- Test run ---
const testTitle = 'Two Sum Problem'; // close to existing "Two_Sum_Complete"
const testContent = `
Given an array of integers and a target, find two numbers that add up to the target.
Use a hashmap to store complements as you iterate.
`;

checkDuplicate(testTitle, testContent)
  .then(result => console.log(JSON.stringify(result, null, 2)))
  .catch(err => console.error('Error:', err.message));