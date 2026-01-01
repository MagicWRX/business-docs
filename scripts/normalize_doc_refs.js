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

function searchForSegments(parts, maxDepth=6) {
  const repoRoot = path.resolve(__dirname, '..', '..'); // repo root
  let found = null;

  function walk(dir, depth) {
    if (depth < 0 || found) return;
    let items;
    try { items = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
    for (const it of items) {
      const full = path.join(dir, it.name);
      const rel = path.relative(repoRoot, full).split(path.sep).join('/');
      // match tail
      if (rel.endsWith(parts.join('/'))) {
        found = full;
        return;
      }
    }
    for (const it of items) {
      if (!it.isDirectory()) continue;
      walk(path.join(dir, it.name), depth -1);
      if (found) return;
    }
  }
  walk(repoRoot, maxDepth);
  return found;
}

const changes = [];

for (const [docRel, refs] of Object.entries(report)) {
  const docPath = path.join(ROOT, docRel);
  if (!fs.existsSync(docPath)) continue;
  const lines = fs.readFileSync(docPath, 'utf8').split(/\r?\n/);
  let modified = false;

  for (const ref of refs) {
    const raw = ref.raw;
    if (!raw || raw.trim().length === 0) continue;
    // skip if exists true
    if (ref.exists) continue;
    // only attempt for paths-like refs (contain / or dot)
    if (!raw.includes('/') && !raw.includes('.')) continue;

    const parts = raw.replace(/^\/*/, '').split('/').filter(Boolean);
    // require at least 1 segment; if only single short segment, skip
    if (parts.length === 1 && parts[0].length < 4) continue;

    const found = searchForSegments(parts, 6);
    if (!found) continue;

    const repoRoot = path.resolve(__dirname, '..', '..');
    const repoRel = path.relative(repoRoot, found).split(path.sep).join('/');

    // Replace raw with repoRel on the specified line if present
    const lineIdx = Math.max(0, (ref.line || 1) - 1);
    if (lineIdx < lines.length) {
      if (lines[lineIdx].includes(raw)) {
        lines[lineIdx] = lines[lineIdx].replace(raw, repoRel);
        modified = true;
        changes.push({ doc: docRel, line: lineIdx+1, raw, replacedWith: repoRel });
        continue;
      }
    }

    // otherwise do a global replace of first occurrence
    let replaced = false;
    for (let i=0;i<lines.length;i++){
      if (lines[i].includes(raw)) {
        lines[i] = lines[i].replace(raw, repoRel);
        modified = true;
        replaced = true;
        changes.push({ doc: docRel, line: i+1, raw, replacedWith: repoRel });
        break;
      }
    }
  }

  if (modified) {
    // backup
    fs.copyFileSync(docPath, docPath + '.bak');
    fs.writeFileSync(docPath, lines.join('\n'));
  }
}

if (changes.length === 0) {
  console.log('No shorthand refs normalized.');
  process.exit(0);
}

console.log('Normalized references:');
for (const c of changes) {
  console.log(` - ${c.doc}:${c.line}  '${c.raw}' -> '${c.replacedWith}'`);
}

// update map after changes
console.log('\nRegenerating DOCS map...');
require('child_process').spawnSync('node', [path.join(__dirname, 'gen_doc_script_map.js')], { stdio: 'inherit' });
console.log('Done.');
