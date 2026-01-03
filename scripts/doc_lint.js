#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = __dirname;
const ROOT = path.resolve(SCRIPTS_DIR, '..');
const MAP_JSON = path.join(ROOT, 'DOCS_DOC_SCRIPT_MAP.json');

function parseFrontmatter(mdPath) {
  const text = fs.readFileSync(mdPath, 'utf8');
  if (!text.startsWith('---')) return null;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return null;
  const yaml = text.slice(3, end).trim();
  const lines = yaml.split(/\r?\n/).map(l => l.trim());
  const result = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // simple key: value
    const kv = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (kv) {
      const key = kv[1];
      let val = kv[2];
      if (val === '') {
        // might be array or multiline
        const arr = [];
        i++;
        while (i < lines.length && lines[i].startsWith('- ')) {
          arr.push(lines[i].slice(2).replace(/^"|"$/g, ''));
          i++;
        }
        result[key] = arr;
        continue;
      } else {
        // strip quotes
        val = val.replace(/^"|"$/g, '');
        if (val === 'true') val = true;
        if (val === 'false') val = false;
        result[key] = val;
      }
    }
    i++;
  }
  return result;
}

function check() {
  if (!fs.existsSync(MAP_JSON)) {
    console.log('DOCS_DOC_SCRIPT_MAP.json not found; generating one first...');
    const gen = path.join(SCRIPTS_DIR, 'gen_doc_script_map.js');
    if (!fs.existsSync(gen)) { console.error('gen_doc_script_map.js missing'); process.exit(2); }
    const res = require('child_process').spawnSync('node', [gen], { stdio: 'inherit' });
    if (res.status !== 0) process.exit(res.status);
    if (!fs.existsSync(MAP_JSON)) { console.error('Map JSON still missing'); process.exit(2); }
  }

  const map = JSON.parse(fs.readFileSync(MAP_JSON, 'utf8'));
  const report = map.report;
  const errors = [];
  const warnings = [];

  for (const [docRel, refs] of Object.entries(report)) {
    const docPath = path.join(ROOT, docRel);
    if (!fs.existsSync(docPath)) continue; // maybe removed, ignore
    const fm = parseFrontmatter(docPath) || {};
    if (fm.ssot === true || fm.ssot === 'true') {
      // required metadata
      if (!fm.owner) errors.push(`${docRel}: ssot=true but missing owner in frontmatter`);
      if (!fm.lastReviewed) warnings.push(`${docRel}: ssot=true but missing lastReviewed`);
      if (!fm.codeRefs || !Array.isArray(fm.codeRefs) || fm.codeRefs.length === 0) warnings.push(`${docRel}: ssot=true but missing codeRefs; add repo-relative paths to authoritative code files`);
      // check codeRefs exist
      if (fm.codeRefs && Array.isArray(fm.codeRefs)) {
        for (const cr of fm.codeRefs) {
          const candidate1 = path.resolve(ROOT, '..', cr); // repo root expects codeRefs relative to repo root
          const candidate2 = path.resolve(ROOT, cr); // sometimes relative to DOCs
          let found = false;
          if (fs.existsSync(candidate1) || fs.existsSync(candidate2)) found = true;

          // If not found, attempt to locate the path anywhere under repo root
          if (!found) {
            const parts = cr.split('/').filter(Boolean);
            // recursive search with limited depth
            function searchDir(dir, depth = 3) {
              if (depth < 0) return null;
              try {
                const items = fs.readdirSync(dir, { withFileTypes: true });
                for (const it of items) {
                  const full = path.join(dir, it.name);
                  if (it.isDirectory()) {
                    // check if this directory ends with the cr path
                    const candidate = path.join(full, ...parts.slice(1));
                    if (fs.existsSync(candidate)) return candidate;
                    const res = searchDir(full, depth - 1);
                    if (res) return res;
                  }
                }
              } catch (err) {
                return null;
              }
              return null;
            }
            const foundPath = searchDir(path.resolve(ROOT, '..'), 4);
            if (foundPath) found = true;
            if (foundPath) {
              // replace cr with resolved path in a warning manner
              warnings.push(`${docRel}: codeRef shorthand '${cr}' resolved to ${foundPath.replace(ROOT + path.sep, '')}`);
            }
          }

          if (!found) {
            errors.push(`${docRel}: codeRef missing or not found: ${cr} (checked ${candidate1} and ${candidate2})`);
          }
        }
      }
    }
  }

  // Write a machine-readable summary for CI consumers
  const summary = { generatedAt: new Date().toISOString(), errors, warnings };
  fs.writeFileSync(path.join(path.dirname(MAP_JSON), 'DOCS_DOC_LINT_REPORT.json'), JSON.stringify(summary, null, 2));

  // Also create a human-friendly summary
  const summaryMd = [`# DOC-LINT SUMMARY`, `Generated: ${summary.generatedAt}`, '', `## Errors (${errors.length})`, ...errors.map(e => `- ${e}`), '', `## Warnings (${warnings.length})`, ...warnings.map(w => `- ${w}`)];
  fs.writeFileSync(path.join(path.dirname(MAP_JSON), 'DOCS_DOC_LINT_SUMMARY.md'), summaryMd.join('\n'));

  if (errors.length > 0) {
    console.error('\nDOC-LINT ERRORS:');
    for (const e of errors) console.error(' - ' + e);
    console.error('\nFailing due to doc-lint errors.');
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn('\nDOC-LINT WARNINGS:');
    for (const w of warnings) console.warn(' - ' + w);
  }

  console.log('\nDOC-LINT: OK (no blocking errors).');
}

check();
