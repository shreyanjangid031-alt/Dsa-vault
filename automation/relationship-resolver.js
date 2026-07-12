require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Load the vault index we built in Module 1
const vaultIndex = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'vault-index.json'), 'utf-8')
);

const lightIndex = vaultIndex.map(note => ({
  title: path.basename(note.filename, '.md'),
  topic: note.topic,
  tags: note.tags,
}));

async function resolveRelationships(draftTitle, draftContent) {
  const systemPrompt = `You are helping link a new note into an existing Obsidian vault.

STRICT RULES:
- Only suggest titles that appear EXACTLY in the existing notes list provided by the user.
- Never invent a title that isn't in that list.
- Do not suggest a link just because a word overlaps — the connection must be conceptually real (shared technique, prerequisite, related problem pattern).
- If nothing is genuinely related, return an empty array.
- Respond with ONLY valid JSON in this exact shape: {"suggested_links": ["Exact Title 1", "Exact Title 2"]}`;

  const userPrompt = `EXISTING notes in the vault:
${JSON.stringify(lightIndex, null, 2)}

NEW draft note:
Title: ${draftTitle}
Content:
${draftContent}`;

  const completion = await groq.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' }, // forces valid JSON output
    temperature: 0.2, // low temperature = more consistent, less "creative" linking
  });

  return JSON.parse(completion.choices[0].message.content);
}

// --- Test run with a sample draft note ---
const testDraftTitle = 'Trapping Rain Water';
const testDraftContent = `
This problem asks: given an array of heights representing an elevation map,
compute how much water it can trap after raining.
The optimal approach uses two pointers moving from both ends, tracking the
maximum height seen so far from the left and right. Similar in spirit to
other two-pointer array problems.
`;

resolveRelationships(testDraftTitle, testDraftContent)
  .then(result => console.log(JSON.stringify(result, null, 2)))
  .catch(err => console.error('Error:', err.message));