#!/usr/bin/env node
const { execSync } = require('child_process');

try {
  const out = execSync('git diff --cached --name-only', { encoding: 'utf8' });
  const files = out.split(/\r?\n/).filter(Boolean);
  const bad = files
    .filter(f => /\.bak$|\.std\.bak$/.test(f))
    .filter(f => !f.startsWith('DOCS_BACKUPS/'));
  if (bad.length) {
    console.error('\n\x1b[31mError: Found staged backup files that must not be committed:\x1b[0m');
    bad.forEach(f => console.error('  -', f));
    console.error('\nTo proceed, unstage them: git reset <file> or move them into DOCS_BACKUPS/ and commit the backup location instead.');
    process.exit(1);
  }
  process.exit(0);
} catch (err) {
  console.error('Failed to check staged files:', err.message);
  process.exit(2);
}
