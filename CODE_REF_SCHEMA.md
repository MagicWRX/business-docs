---
title: Code Reference Schema
owner: Docs Team
ssot: false
status: draft
tags: [schema, code-ref]
lastReviewed: 2026-01-01
---

# Code Reference Schema

This file documents the canonical schema for referencing code from DOCs and the process for a controlled conversion.

## Goals
- Make references machine-resolvable and unambiguous
- Preserve human-readable inline mentions while storing authoritative refs in frontmatter

## Canonical markers
- Inline markers (in document body):
  - `CODE:`"path/to/file" — points at code files (TypeScript, JS, CSS, etc.)
  - `SCRIPT:`"path/to/script" — points at scripts (Node, shell, generators)

- Frontmatter array `codeRefs` must contain the same repo-relative paths, e.g.:
  - `codeRefs: ["src/lib/auth.ts", "scripts/test-auth.js"]`

## Resolution heuristics
1. If inline `CODE:` or `SCRIPT:` present, use those values directly.
2. If an inline human-friendly mention (e.g., `auth.ts` or `auth module`) is found, run a repo-wide fuzzy search for likely matches.
3. Apply heuristics: prefer files in `src/`, `lib/`, or `scripts/` and match file name + context keywords.
4. If multiple matches, add a PR comment asking for human confirmation and add the top candidates to `codeRefs` as suggestions.

## Conversion PR process
1. Branch from `main` with name `docs/code-refs-YYYYMMDD`.
2. Run `scripts/standardize_code_refs.js --dry-run` to propose edits.
3. Create a PR with proposed changes, include `DOCS_DOC_SCRIPT_MAP.md` for context and the dry-run summary.
4. Reviewers validate a sample of changed docs; once approved, run without `--dry-run` and commit.
5. Run `doc_lint.js` and ensure CI passes before merging.

## Non-goals
- This schema does not mandate absolute file hashes or line ranges (these can be added later if needed).

> Note: We'll iterate this schema based on the first controlled conversion PR feedback.