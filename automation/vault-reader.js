const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Your vault is one level up from this automation/ folder
const vaultPath = path.join(__dirname, '..');

function getMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    // Skip the automation folder itself, and Obsidian's internal .obsidian folder
    if (entry.name === 'automation' || entry.name === '.obsidian' || entry.name === '.git') {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(getMarkdownFiles(fullPath)); // recurse into subfolders
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractWikilinks(content, ownName) {
  const regex = /\[\[([^\]|#]+)/g;
  const links = new Set();
  let match;

  while ((match = regex.exec(content)) !== null) {
    let link = match[1].trim();
    link = link.replace(/\\+$/, '');

    if (link !== ownName) {  // skip self-links
      links.add(link);
    }
  }

  return Array.from(links);
}

function readVault() {
  const files = getMarkdownFiles(vaultPath);
  const notes = [];

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(raw); // splits frontmatter (data) from body (content)

    notes.push({
      filename: path.basename(filePath),
      tags: parsed.data.tags || [],
      topic: parsed.data.topic || null,
      status: parsed.data.status || null,
      wikilinks: extractWikilinks(parsed.content, path.basename(filePath, '.md')),
    });
  }

  return notes;
}

// Run it and print the result
const vaultIndex = readVault();
console.log(JSON.stringify(vaultIndex, null, 2));

// Also save it to a file so later scripts can reuse it
fs.writeFileSync(
  path.join(__dirname, 'vault-index.json'),
  JSON.stringify(vaultIndex, null, 2)
);
console.log(`\n✅ Indexed ${vaultIndex.length} notes → saved to vault-index.json`);