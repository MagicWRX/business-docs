---
title: DOCS Template
owner: Docs Team
ssot: true
status: draft
codeRefs: []
tags: [template, ssot]
lastReviewed: 2026-01-01
---

# DOCS Template

Use this file as the canonical template for SSOT documents.

## Purpose
Describe the single source of truth for a feature, concept, or subsystem.

## Required frontmatter
- **title**: human-friendly name
- **owner**: owning team or individual
- **ssot**: true|false
- **status**: draft|active|deprecated
- **codeRefs**: array of repo-relative `CODE:`/`SCRIPT:` refs
- **tags**: array of short tags
- **lastReviewed**: YYYY-MM-DD

## Inline code reference conventions
- Use standardized markers: `CODE:`"path/to/file" and `SCRIPT:`"path/to/script"
- Example: The auth flow is implemented in CODE:`src/lib/auth.ts` and tested by SCRIPT:`scripts/test-auth.js`

## Structure
- Overview / Purpose
- Terminology
- UX / API surface
- Acceptance criteria
- Links / Related docs (use `relatedDocs` frontmatter where applicable)
- Code references (list in `codeRefs` frontmatter)

## Acceptance Criteria
- Clear owner & status
- Frontmatter valid and includes `codeRefs` where applicable
- Links validated by doc-lint

> 🔧 Tip: run `node DOCS/scripts/doc_lint.js` locally to validate frontmatter and codeRefs before opening a PR.

## Pre-commit & CI checks
- Add a local pre-commit check to block staged `.bak` files by running `node DOCS/scripts/check_no_bak.js` as a pre-commit hook (e.g., via Husky).
- CI will run `node DOCS/scripts/check_repo_no_bak.js` on PRs to fail if any tracked `.bak` or `.std.bak` files exist.
- To enable local hooks with Husky:
  - `npm install --save-dev husky`
  - `npx husky install`
  - `npx husky add .husky/pre-commit "npm run check-no-bak"`
- If you don't use Husky, run `npm run check-no-bak` before committing.

> ⚠️ Note: `.gitignore` now includes `*.bak` and `*.std.bak` to prevent accidental new commits; already-tracked files must be moved into `DOCS_BACKUPS/` instead.
