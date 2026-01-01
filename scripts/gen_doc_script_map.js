#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT);

function walk(dir, ext = '.md'){
  const res = [];
  for(const entry of fs.readdirSync(dir, { withFileTypes: true })){
    const full = path.join(dir, entry.name);
    if(entry.isDirectory()){
      res.push(...walk(full, ext));
    } else if(entry.isFile() && full.endsWith(ext)){
      res.push(full);
    }
  }
  return res;
}

const mdFiles = walk(DOCS_DIR, '.md');

const fileRefRegex = /(?:\(|\s|\`)([\.\/\w\-@]+\/(?:src|scripts|supabase|SHARED|_legacy|scripts|src|docs|package.json)[^\)\s\`\,]*)/gmi;
const absoluteRefRegex = /(?:\(|\s|\`)(\/?[A-Za-z]:\\[\w\\.\-\/]+|\/[^\s\)\`]+\.(?:js|ts|tsx|sh|sql|md|json))/gmi; // windows/abs

const report = {};
let totalRefs = 0;
let missingRefs = 0;

for(const md of mdFiles){
  const text = fs.readFileSync(md, 'utf8');
  const lines = text.split(/\r?\n/);
  const refs = [];

  for(let i=0;i<lines.length;i++){
    const line = lines[i];
    let m;
    while((m = fileRefRegex.exec(line)) !== null){
      const raw = m[1].trim();
      refs.push({raw, line: i+1, exists: null});
    }
    while((m = absoluteRefRegex.exec(line)) !== null){
      const raw = m[1].trim();
      refs.push({raw, line: i+1, exists: null});
    }
  }

  const unique = Array.from(new Map(refs.map(r=>[r.raw,r])).values());
  for(const r of unique){
    totalRefs++;
    // normalize: if starts with ./ or ../ or / or not
    let candidate;
    if(r.raw.startsWith('/')){
      candidate = path.join('/', r.raw); // keep absolute-ish
    } else if(r.raw.match(/^[a-zA-Z]:\\/)){
      candidate = r.raw; // windows
    } else {
      candidate = path.resolve(path.dirname(md), r.raw);
    }

    // also try relative to workspace root
    const alt = path.resolve(ROOT, r.raw.replace(/^\.\//, ''));

    const exists = fs.existsSync(candidate) || fs.existsSync(alt);
    r.exists = exists;
    r.checkedPath = exists ? (fs.existsSync(candidate) ? candidate : alt) : candidate;
    if(!exists) missingRefs++;
  }

  report[md.replace(ROOT + path.sep, '')] = unique;
}

const outJson = path.join(ROOT, 'DOCS_DOC_SCRIPT_MAP.json');
fs.writeFileSync(outJson, JSON.stringify({generatedAt: new Date().toISOString(), totalRefs, missingRefs, report}, null, 2));

// create a markdown report
let mdReport = `# DOCS → Script/Code Reference Map\n\nGenerated: ${new Date().toISOString()}\n\n`;
mdReport += `**Total references found:** ${totalRefs}  \n**Missing references:** ${missingRefs}  \n\n`;
mdReport += `## Summary by doc\n\n`;
for(const [doc, refs] of Object.entries(report)){
  mdReport += `### ${doc} (${refs.length} refs)\n\n`;
  if(refs.length === 0){ mdReport += `No code/script references found.\n\n`; continue; }
  mdReport += `| Line | Reference | Exists | Checked Path |\n|---:|---|---:|---|\n`;
  for(const r of refs){
    mdReport += '| ' + r.line + ' | ' + '`' + r.raw.replace(/\|/g,'\\|') + '`' + ' | ' + (r.exists ? '✅' : '❌') + ' | ' + (r.checkedPath ? r.checkedPath.replace(ROOT + path.sep, '') : '') + ' |\n';
  }
  mdReport += `\n`;
}

const outMd = path.join(ROOT, 'DOCS_DOC_SCRIPT_MAP.md');
fs.writeFileSync(outMd, mdReport);

console.log(`Generated ${outJson} and ${outMd} — ${totalRefs} refs, ${missingRefs} missing.`);
process.exit(0);
