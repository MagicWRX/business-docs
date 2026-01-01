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
