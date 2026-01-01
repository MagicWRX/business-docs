#!/usr/bin/env node
const { execSync } = require('child_process');

try {
  const out = execSync('git ls-files', { encoding: 'utf8' });
  const files = out.split(/\r?\n/).filter(Boolean);
  const bad = files.filter(f => /\.bak$|\.std\.bak$/.test(f));
  if (bad.length) {
    console.error('\n\x1b[31mError: Found tracked backup files in the repository — these should be moved into DOCS_BACKUPS/:\x1b[0m');
    bad.forEach(f => console.error('  -', f));
    console.error('\nFailing CI to avoid accidental merges; please move or remove these files before merging.');
    process.exit(1);
  }
  console.log('No tracked .bak/.std.bak files found.');
  process.exit(0);
} catch (err) {
  console.error('Failed to check tracked files:', err.message);
  process.exit(2);
}
