# AS Documentation Index

## 📚 Overview

This index tracks every document in the Amazingly Strange Website knowledge base, their owners, and last update timestamps. Update this file whenever documentation changes.

**Last Updated:** 2025-11-05

## 🗺️ Document Map

| Alias | Path | Owner | Last Updated |
|-------|------|-------|--------------|
| Overview | `docs/AS_OVERVIEW.md` | Product Lead | 2025-11-02 |
| Setup | `docs/AS_SETUP.md` | DevOps | 2025-11-05 |
| Development Workflow | `docs/AS_DEVELOPMENT.md` | Engineering | 2025-11-02 |
| Standards | `docs/AS_STANDARDS.md` | Engineering | 2025-11-02 |
| API Reference | `docs/AS_API.md` | Engineering | 2025-11-02 |
| Roadmap | `docs/AS_ROADMAP.md` | Product | 2025-11-03 |
| Executive Summary | `docs/AS_EXEC_SUMMARY.md` | Leadership | 2025-11-03 |
| AI Prompt | `docs/AS_AI_PROMPT.md` | AI Steward | 2025-11-02 |
| AI Standards | `docs/AS_AI_STANDARDS.md` | Engineering Leadership | 2025-11-02 |
| Release Runbook | `AS_RELEASE_RUNBOOK.md` | DevOps | 2025-11-02 |

## 🧭 Navigation Guide

### For New Developers
1. Start with `AS_OVERVIEW.md`
2. Follow environment steps in `AS_SETUP.md`
3. Learn workflow rules in `AS_DEVELOPMENT.md`
4. Reference coding guidelines in `AS_STANDARDS.md`

### For Operations / DevOps
1. `AS_SETUP.md` – environment & deployment
2. `AS_RELEASE_RUNBOOK.md` (repository root) – release checklist
3. `AS_ROADMAP.md` – schedule upcoming releases

### For Leadership
1. `AS_EXEC_SUMMARY.md`
2. `AS_ROADMAP.md`
3. `AS_OVERVIEW.md`

## 🔗 Cross-Reference Matrix

| Primary Doc | Depends On | Notes |
|-------------|------------|-------|
| AS_OVERVIEW | AS_ROADMAP, AS_STANDARDS | Summarizes roadmap & standards
| AS_SETUP | AS_STANDARDS | Uses naming/env conventions
| AS_DEVELOPMENT | AS_STANDARDS, AS_SETUP | Links to QA + deployment steps
| AS_ROADMAP | AS_OVERVIEW | Shares mission/objectives
| AS_AI_PROMPT | AS_ROADMAP, AS_STANDARDS, AS_AI_STANDARDS | Prompt references priorities & guardrails
| AS_AI_STANDARDS | AS_OVERVIEW, AS_ROADMAP | Defines compliance suite for all docs

## 📆 Change Timeline

| Date | Doc(s) Updated | Summary | Author |
|------|----------------|---------|--------|
| 2025-11-02 | ALL | Initialized AS documentation from GENERIC templates | GitHub Copilot |
| 2025-11-02 | CSS_SYSTEM_UPDATE.md | CSS system synchronized with static site, blog table system added | GitHub Copilot |
| 2025-11-02 | Layout, BrandContainer, globals.css | Font optimization: Raleway & Amatic SC, resolved preload warnings | GitHub Copilot |
| 2025-11-02 | Layout.tsx | Font weight optimization: Removed unused weights (YAGNI principle) | GitHub Copilot |
| 2025-11-03 | AS_ROADMAP.md | Added Supabase database setup completion milestone | GitHub Copilot |
| 2025-11-03 | AS_ROADMAP.md | Updated with database table creation, RLS policies, and migration priorities | GitHub Copilot |
| 2025-11-03 | Admin interfaces | Completed Supabase-connected admin dashboard and blog management | GitHub Copilot |
| 2025-11-03 | AS_ROADMAP.md | Enhanced Phase 3 with detailed acceptance criteria and standards compliance | GitHub Copilot |
| 2025-11-03 | AS_EXEC_SUMMARY.md | Updated progress tracker, added Phase 3 architecture, success metrics | GitHub Copilot |
| 2025-11-03 | AS_ROADMAP.md | Added engineering principles, data flow, testing requirements to all Phase 3 tasks | GitHub Copilot |
| 2025-11-04 | Admin components | Phase 3C rich text editor completed: MarkdownEditor component with @uiw/react-md-editor | GitHub Copilot |
| 2025-11-04 | Admin components | ImageUploader component with drag-drop, compression, and Supabase Storage integration | GitHub Copilot |
| 2025-11-04 | Testing | Added Vitest testing framework with basic CRUD operation tests | GitHub Copilot |
| 2025-11-03 | useAuth hook | Created authentication hook with Supabase integration and admin role checking | GitHub Copilot |
| 2025-11-03 | Admin pages | Updated admin dashboard and blog pages to use new AdminLayout component | GitHub Copilot |
| 2025-11-04 | Media Library | Implemented comprehensive media management system with storage buckets, database schema, and admin UI | GitHub Copilot |
| 2025-11-04 | User Management | Created secure server-side API routes for user management with audit logging | GitHub Copilot |
| 2025-11-04 | Media Library Browser | Fixed onSelect parameter usage, implemented selection mode functionality | GitHub Copilot |
| 2025-11-05 | Documentation | Consolidated non-AS_ docs into AS_INDEX.md change log, updated AS_SETUP.md with contact info | GitHub Copilot |

Record future updates here with one-line summaries.

## ✅ Maintenance Checklist

- [ ] Update "Last Updated" column after modifying a doc
- [ ] Ensure new documents follow `AS_*.md` naming
- [ ] Re-run link verification quarterly
- [ ] Archive stale templates to keep index concise

## 🆘 Documentation Support

- Use repository search (`cmd+shift+f`) to find topics quickly
- Reach out to documentation owner listed in the map for edits
- Keep `AS_AI_PROMPT.md` aligned with roadmap & standards after each major iteration
