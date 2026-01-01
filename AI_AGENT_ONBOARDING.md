---
title: AI Agent Onboarding
owner: Docs Team
ssot: false
status: draft
tags: [onboarding, agent]
lastReviewed: 2026-01-01
---

# AI Agent Onboarding

This doc explains how AI agents and automation should consume the DOCs SSOTs.

## Quick start
1. Read `DOCS_TEMPLATE.md` to learn required frontmatter and codeRef formats.
2. Use `DOCS/scripts/gen_doc_script_map.js` to generate the doc→code map.
3. Validate docs with `DOCS/scripts/doc_lint.js`.

## Frontmatter expectations
- `ssot: true` marks canonical documents.
- `codeRefs` should contain repo-relative paths referenced by standardized markers in the body: `CODE:` or `SCRIPT:`.

## Best practices for agents
- Prefer reading frontmatter `codeRefs` first, then fall back to inline markers.
- Resolve shorthand references using the project's repo index before flagging as missing.
- Always open a draft PR for bulk changes and include `DOCS_DOC_SCRIPT_MAP.md` in the PR description for reviewer context.

## Example agent workflow
1. Run `gen_doc_script_map.js` to find candidate refs.
2. Attempt to resolve shorthand refs using repo heuristics.
3. Propose replacements and create a PR with changes and `DOCS_DOC_SCRIPT_MAP.md` attached.
4. Run `doc_lint.js` in CI to ensure no blocking errors.

## Pre-commit & CI checks
- Agents should **never** introduce `.bak` or `.std.bak` files in PRs; move backup files into `DOCS_BACKUPS/` and commit the relocation instead.
- Run `npm run check-repo-no-bak` in CI (or `node DOCS/scripts/check_repo_no_bak.js`) to block merges that introduce tracked `.bak` files.

## Contact
- Owner: Docs Team
- Slack: #docs
- For urgent issues, open an issue labelled `doc-incident`.
