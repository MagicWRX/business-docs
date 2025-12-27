# GENERIC_DOC_INDEX.md

**Purpose:** Central documentation index for all projects. This serves as the master template and directory structure guide for the entire DOCs repository.

**Date Created:** October 16, 2025  \
**Last Updated:** December 2025 (Consolidated Documentation Structure)

---

## 🗂️ DOCs Directory Organization

All documentation is now centralized in the `/DOCs/` directory with the following structure:

```
DOCs/
├── BUSINESS/          # Business-level documentation (all platforms)
│   ├── DOC_INDEX.md   # Index of business documents
│   ├── BUSINESS_ROADMAP.md
│   ├── BUSINESS_ADMIN.md
│   ├── BUSINESS_WORKSPACES.md
│   ├── BUSINESS_VERCEL.md
│   └── ...
│
├── MAGICWRX/          # MagicWRX platform (multi-tenant SaaS)
│   ├── MAGICWRX_DOC_INDEX.md
│   ├── MAGICWRX_ROADMAP.md
│   ├── MAGICWRX_DEPLOYMENT.md
│   └── ...
│
├── MXN/               # MXN.CHAT platform (ephemeral chat)
│   ├── MXN_DOC_INDEX.md
│   ├── MXN_ROADMAP.md
│   ├── MXN_VIBE_CONTROLLER.md
│   └── ...
│
├── AMS/               # AmazinglyStrange (blog/media platform)
│   ├── DOC_INDEX.md
│   ├── AMS_ROADMAP.md
│   ├── AMS_SETUP.md
│   └── ...
│
├── GENERIC/           # Templates and standards
│   ├── GENERIC_DOC_INDEX.md (this file)
│   ├── GENERIC_ROADMAP.md
│   └── ...
│
└── CODE/              # Code ledgers and technical standards
    └── CODE_LEDGER.md
```

### Naming Convention Rules

All documentation MUST follow this prefix convention:
- **BUSINESS_** - Business-level docs (in `/BUSINESS/`)
- **MAGICWRX_** - MagicWRX docs (in `/MAGICWRX/`)
- **MXN_** - MXN.CHAT docs (in `/MXN/`)
- **AMS_** or **AMAZINGLYSTRANGE_** - AmazinglyStrange docs (in `/AMS/`)
- **GENERIC_** - Templates (in `/GENERIC/`)

Format: `PREFIX_SHORT_SUBJECT_TITLE.md`

Example: `MXN_ROADMAP.md`, `BUSINESS_ADMIN.md`, `AMS_SETUP.md`

---

## 📋 Platform-Specific Index Files

Each subdirectory has its own DOC_INDEX.md that catalogs all documentation for that platform:

| Platform | Index File | Key Documents |
|----------|-----------|---------------|
| Business | [DOC_INDEX.md](../BUSINESS/DOC_INDEX.md) | 9 business-level documents |
| MagicWRX | [MAGICWRX_DOC_INDEX.md](../MAGICWRX/MAGICWRX_DOC_INDEX.md) | SaaS platform docs |
| MXN.CHAT | [MXN_DOC_INDEX.md](../MXN/MXN_DOC_INDEX.md) | Chat platform specs |
| AmazinglyStrange | [DOC_INDEX.md](../AMS/DOC_INDEX.md) | 27 blog/media platform docs |

---

## 🧭 Quick Overview

| Section | Description | Visual Aid |
|---------|-------------|------------|
| Executive Summary | One-paragraph project snapshot | ✅ Highlight panel |
| Document Map | Inventory of all docs with owners | ✅ Table |
| Standards Link | References `AI_STANDARDS.md` & core policies | ✅ Icon legend |
| Change Log | Timestamped updates every iteration | ✅ Timeline block |

> **Always link to `AI_STANDARDS.md` in the first section.**

---

## ✨ Executive Summary (Fill In)

- **Project Name:** `{{Project Title}}`
- **Vision Statement:** `{{Single sentence describing the outcome}}`
- **Current Iteration Goal:** `{{NOW focus}}`
- **Next Milestone Date:** `{{Target date}}`

---

## 📚 Document Inventory

### Business-Level Documents (DOCs/BUSINESS/)
```
┌────────────────────────────┬────────────────┬────────────┐
│ Document                   │ Owner          │ Updated    │
├────────────────────────────┼────────────────┼────────────┤
│ BUSINESS_ROADMAP.md        │ Delivery       │ Dec 2025   │
│ BUSINESS_ADMIN.md          │ Engineering    │ Dec 2025   │
│ BUSINESS_WORKSPACES.md     │ Docs Lead      │ Dec 2025   │
│ BUSINESS_VERCEL.md         │ DevOps         │ Dec 2025   │
│ BUSINESS_AI_PROMPT.md      │ AI Steward     │ Dec 2025   │
│ BUSINESS_EMAIL_BREVO.md    │ Marketing      │ Dec 2025   │
│ BUSINESS_ARCHITECTURE_*.md │ Architecture   │ Dec 2025   │
└────────────────────────────┴────────────────┴────────────┘
```

### Platform Documents
| Platform | Count | Index Link | Status |
|----------|-------|------------|--------|
| **MagicWRX** | 15 | [MAGICWRX_DOC_INDEX.md](../MAGICWRX/MAGICWRX_DOC_INDEX.md) | ✅ Complete |
| **MXN.CHAT** | 29 | [MXN_DOC_INDEX.md](../MXN/MXN_DOC_INDEX.md) | ✅ Complete |
| **AmazinglyStrange** | 27 | [DOC_INDEX.md](../AMS/DOC_INDEX.md) | ✅ Complete |

See each platform's DOC_INDEX.md for complete document listings.

---

## 🔄 Change Timeline

```
[ Iteration ] ---> [ Summary ] ---> [ Owner ] ---> [ Date ]
|------------|     |---------|      |-------|      |------|
[ Dec 2025 ] ---> [ Consolidated all docs into DOCs/ structure ] ---> [ AI Assistant ] ---> [ Dec 2025 ]
[ Dec 2025 ] ---> [ Created platform subdirectories: BUSINESS, MAGICWRX, MXN, AMS ] ---> [ AI Assistant ] ---> [ Dec 2025 ]
[ Dec 2025 ] ---> [ Applied PREFIX naming convention to all docs ] ---> [ AI Assistant ] ---> [ Dec 2025 ]
[ Dec 2025 ] ---> [ Created DOC_INDEX.md for each platform ] ---> [ AI Assistant ] ---> [ Dec 2025 ]
[ Dec 2025 ] ---> [ Added SCALABLE_FOUNDATION_PATHWAY.md ] ---> [ AI Assistant ] ---> [ Dec 5 ]
[ Dec 2025 ] ---> [ Added BUSINESS_WORKSPACES.md with workspace overview ] ---> [ AI Assistant ] ---> [ Dec 5 ]
```

Record every documentation update with a one-line summary.

---

## 🔗 Cross-Reference Matrix

| Primary Doc | Depends On | Notes |
|-------------|------------|-------|
| ROADMAP.md | AI_STANDARDS.md | Must cite compliance checklist |
| AI_PROMPT.md | ROADMAP.md | Prompt includes roadmap call |
| TITLE_Project.md | DOC_INDEX.md | Listed under overview |

---

## ✅ Accessibility Reminders

- Use bullet-first summaries and bold keywords.
- Provide contrast-friendly tables (two-tone shading when exported).
- Keep paragraphs under four lines.
- Offer quick symbols (✅, ⚠️, 🛠) for scan-friendly context.

---

## 📝 Maintenance Checklist

- [ ] Update dates after edits.
- [ ] Sync table references with actual files.
- [ ] Validate links.
- [ ] Confirm AI prompt references latest roadmap.
- [ ] Log change in timeline.
