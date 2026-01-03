#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MAP_JSON = path.join(ROOT, 'DOCS_DOC_SCRIPT_MAP.json');

if (!fs.existsSync(MAP_JSON)) {
  console.error('Map JSON not found. Run gen_doc_script_map.js first.');
  process.exit(1);
}

const map = JSON.parse(fs.readFileSync(MAP_JSON, 'utf8'));
const report = map.report;

function parseFrontmatter(mdPath) {
  const text = fs.readFileSync(mdPath, 'utf8');
  if (!text.startsWith('---')) return { front: null, rest: text };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { front: null, rest: text };
  const frontRaw = text.slice(0, end+4);
  const rest = text.slice(end+4);
  const lines = frontRaw.split(/\r?\n/).slice(1, -1);
  const result = {};
  for (const line of lines) {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (m) {
      const k = m[1];
      let v = m[2].trim();
      if (v === '') continue; // skip arrays here
      v = v.replace(/^"|"$/g, '');
      result[k] = v;
    }
  }
  return { front: frontRaw, frontObj: result, rest };
}

function ensureFrontArray(mdPath, key) {
  const text = fs.readFileSync(mdPath, 'utf8');
  if (!text.startsWith('---')) return null;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return null;
  const frontRaw = text.slice(0, end+4);
  const lines = frontRaw.split(/\r?\n/);
  // find key line
  let idx = lines.findIndex(l => l.startsWith(key+':'));
  if (idx === -1) {
    // insert before closing ---
    lines.splice(lines.length-1, 0, `${key}:`);
  }
  fs.writeFileSync(mdPath, [...lines, text.slice(end+4)].join('\n'));
  return true;
}

const changes = [];

for (const [docRel, refs] of Object.entries(report)) {
  const docPath = path.join(ROOT, docRel);
  if (!fs.existsSync(docPath)) continue;
  let content = fs.readFileSync(docPath, 'utf8');
  let modified = false;

  // ensure front arrays exist for codeRefs
  if (content.startsWith('---')) {
    if (!/\ncodeRefs:\s*\n/.test(content)) {
      // insert codeRefs: [] after frontmatter opening
      const end = content.indexOf('\n---', 3);
      const front = content.slice(0, end+4);
      const rest = content.slice(end+4);
      const newFront = front.replace('\n---', '\ncodeRefs:\n---');
      content = newFront + rest;
      modified = true;
    }
  }

  for (const ref of refs) {
    if (!ref.checkedPath) continue;
    // only normalize refs that were resolved to a repo-relative path
    // generate repoRel by searching files
    const found = ref.checkedPath;
    let repoRoot = path.resolve(__dirname, '..', '..');
    let repoRel = path.relative(repoRoot, found).split(path.sep).join('/');
    // If repoRel empty skip
    if (!repoRel) continue;

    // Determine kind
    const kind = repoRel.includes('/scripts/') || repoRel.startsWith('scripts/') || repoRel.includes('/scripts/') ? 'SCRIPT' : 'CODE';

    // Replace raw occurrences in the document with canonical marker
    const raw = ref.raw.replace(/^\/+/, '');
    // Try to find and replace the raw occurrence if present
    if (content.includes(ref.raw)) {
      const marker = `${kind}:\`${repoRel}\``;
      content = content.split(ref.raw).join(marker);
      modified = true;
      changes.push({ doc: docRel, raw: ref.raw, replaced: marker });
    } else if (content.includes(raw)) {
      const marker = `${kind}:\`${repoRel}\``;
      content = content.split(raw).join(marker);
      modified = true;
      changes.push({ doc: docRel, raw: raw, replaced: marker });
    }

    // Ensure the repoRel is present in frontmatter codeRefs
    // Naively insert repoRel as dash entry
    if (content.startsWith('---')) {
      const end = content.indexOf('\n---', 3);
      const front = content.slice(0, end+4);
      const rest = content.slice(end+4);
      if (!front.includes(repoRel)) {
        const newFront = front.replace('\n---', `\n  - "${repoRel}"\n---`);
        content = newFront + rest;
        modified = true;
        changes.push({ doc: docRel, addedToFront: repoRel });
      }
    }
  }

  if (modified) {
    fs.copyFileSync(docPath, docPath + '.std.bak');
    fs.writeFileSync(docPath, content);
  }
}

if (changes.length === 0) {
  console.log('No standardizations applied.');
  process.exit(0);
}

console.log('Standardized references:');
for (const c of changes) {
  if (c.replaced) console.log(` - ${c.doc}  '${c.raw}' -> '${c.replaced}'`);
  if (c.addedToFront) console.log(` - ${c.doc}  added to front codeRefs: '${c.addedToFront}'`);
}

console.log('\nRegenerating DOCS map...');
require('child_process').spawnSync('node', [path.join(__dirname, 'gen_doc_script_map.js')], { stdio: 'inherit' });
console.log('Done.');
