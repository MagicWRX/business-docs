#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

function readFrontmatter(mdPath) {
  const text = fs.readFileSync(mdPath, 'utf8');
  const res = { title: path.basename(mdPath), owner: null, relatedDocs: [], status: null };
  if (!text.startsWith('---')) return res;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return res;
  const front = text.slice(3, end).trim();
  for (const line of front.split(/\r?\n/)) {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    const k = m[1]; let v = m[2].trim();
    if (v === '') continue;
    if (k === 'relatedDocs') {
      // simplistic: not parsing arrays; search for - items afterwards
      // fallback: find lines beginning with - in the frontmatter
      const arr = front.split(/\r?\n/).filter(l => l.trim().startsWith('- ')).map(l => l.trim().slice(2).replace(/"/g,''));
      res.relatedDocs = arr;
    }
    if (k === 'owner') res.owner = v.replace(/"/g, '');
    if (k === 'status') res.status = v.replace(/"/g,'');
  }
  return res;
}

const docs = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })){
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    if (entry.isFile() && full.endsWith('.md')) docs.push(full);
  }
}

walk(ROOT);

const nodes = {};
for (const doc of docs) {
  const rel = path.relative(ROOT, doc).split(path.sep).join('/');
  const fm = readFrontmatter(doc);
  nodes[rel] = { title: fm.title || rel, owner: fm.owner || '', related: fm.relatedDocs || [], status: fm.status || '' };
}

// Build mermaid edges
let mermaid = '```mermaid\nflowchart LR\n';
for (const [k, v] of Object.entries(nodes)) {
  const id = k.replace(/[^a-zA-Z0-9_]/g, '_');
  const label = k.replace(/`/g,'');
  mermaid += `${id}["${label}"]\n`;
}
for (const [k, v] of Object.entries(nodes)) {
  const from = k.replace(/[^a-zA-Z0-9_]/g, '_');
  for (const to of v.related) {
    const toRel = to.replace(/"/g,'').replace(/^\.\//,'');
    let toKey = toRel;
    // normalize to existing node key if possible
    if (!nodes[toKey]) {
      // try prefixed DOCs/
      if (nodes['DOCs/'+toKey]) toKey = 'DOCs/'+toKey;
      else if (nodes['DOCs/'+toRel]) toKey = 'DOCs/'+toRel;
    }
    if (!nodes[toKey]) continue;
    const toId = toKey.replace(/[^a-zA-Z0-9_]/g, '_');
    mermaid += `${from} --> ${toId}\n`;
  }
}
mermaid += '```\n\n';

// produce markdown
let out = '# DOCS Graph (generated)\n\n';
out += 'Generated: ' + new Date().toISOString() + '\n\n';
out += 'This graph is generated from each doc\'s `relatedDocs` frontmatter. Nodes are docs; edges are explicit relatedDocs links.\n\n';
out += mermaid;

out += '## Index\n\n';
for (const [k,v] of Object.entries(nodes)){
  out += `- **${k}**  — owner: ${v.owner || 'n/a'} — status: ${v.status || 'n/a'}\n`;
  if (v.related && v.related.length) out += `  - related: ${v.related.join(', ')}\n`;
}

fs.writeFileSync(path.join(ROOT, 'DOCS_GRAPH.md'), out);
console.log('DOCS_GRAPH.md generated.');
