# AUTH AI Prompt Template

**Purpose:** Guide AI-assisted development while enforcing project standards.

**Date Created:** 2025-11-02  
**Last Updated:** 2025-11-02

---

## 🎯 Prompt Header (Copy Into AI Sessions)

```
Follow docs/AS_STANDARDS.md, docs/AS_AI_STANDARDS.md, docs/AS_ROADMAP.md, docs/AS_INDEX.md, docs/AS_AI_PROMPT.md, and AS_RELEASE_RUNBOOK.md.
Respect SOLID, DRY, KISS, YAGNI, SSOT, Composition, Separation of Concerns, Law of Demeter, Explicitness, Clean Boundaries, Immutable Core.
Produce data-flow diagrams when architecture changes, provide repo tree snapshots when touching structure, ensure accessibility considerations are noted.
Write or update unit/integration tests and document changes.
```

Use this block verbatim at the top of any AI interaction related to this project.

---

## 🧭 Prompt Flow

| Step | Instruction | Output |
|------|-------------|--------|
| 1 | Review `AS_ROADMAP.md` for current priorities | Bullet summary |
| 2 | Note relevant sections from `AS_OVERVIEW.md`, `AS_STANDARDS.md`, and `AS_AI_STANDARDS.md` | Table |
| 3 | Capture acceptance criteria or test plan | Checklist |
| 4 | Outline implementation approach | Sequence diagram / pseudo-code |
| 5 | List code and test modifications | Diff summary |
| 6 | Enumerate documentation updates | File list |

---

## 🧩 Reference Diagram

```
┌─────────────┐   references    ┌──────────────┐
│ AI Prompt    │ ─────────────▶ │ AS_ROADMAP   │
└──────┬──────┘                  └──────┬──────┘
       │ updates                         │ informs
       ▼                                 ▼
┌─────────────┐   sync changes   ┌──────────────┐
│ AI Output    │ ─────────────▶  │ AS_INDEX     │
└─────────────┘                  └──────────────┘
```

---

## 🛡 Guardrails Checklist

```
[ ] Cite sections from AS_STANDARDS.md and AS_AI_STANDARDS.md with version dates
[ ] Call out at least three engineering principles applied
[ ] Provide explicit test coverage plan and results
[ ] Summarize documentation deltas
[ ] Include accessibility considerations when UI changes occur
```

---

## 🧪 Validation Snippets

When requesting code:
```
Provide implementation diff, associated tests, documentation updates, risk assessment, and manual verification steps. Confirm compliance with AS_STANDARDS.md.
```

When performing code review:
```
Return findings ordered by severity with file/line references, mention missing tests, note documentation drift, and highlight behavioral regressions.
```

---

## 📌 Maintenance Notes

- Update "Last Updated" on this file whenever the prompt changes
- Ensure new documents referenced by the prompt are added to `AS_INDEX.md`
- Archive prior prompt revisions in `docs/archive/` if historical tracking is required
