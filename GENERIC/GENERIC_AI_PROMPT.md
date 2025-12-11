# GENERIC_AI_PROMPT.md

**Purpose:** Canonical prompt template that orchestrates AI-assisted development while enforcing standards.

**Date Created:** October 16, 2025  \
**Last Updated:** October 16, 2025

---

## 🎯 Prompt Header (Copy/Paste into AI Sessions)

```
Follow Docs/AI_STANDARDS.md, Docs/DOC_INDEX.md, Docs/ROADMAP.md, and Docs/AI_PROMPT.md.
Respect SOLID, DRY, KISS, YAGNI, SSOT, Composition, SoC, Demeter, Explicitness, Clean boundaries, Immutable Core.
Produce data flow diagrams, Linux tree snapshots, and accessibility-friendly summaries.
Write and update unit tests.
```

Include this block verbatim in every AI interaction.

---

## 🧭 Prompt Structure

| Step | Instruction | Visual Aid |
|------|-------------|------------|
| 1 | Load current roadmap goals | ✅ Timeline |
| 2 | Summarize relevant docs | ✅ Table |
| 3 | Define acceptance criteria | ✅ Checklist |
| 4 | Generate implementation plan | ✅ Flow diagram |
| 5 | Propose code/tests updates | ✅ Code block |
| 6 | Outline documentation edits | ✅ Tree |

---

## 🧩 Quick Reference Diagram

```
┌────────────┐    references    ┌────────────┐
│ AI Prompt  │ ───────────────▶ │ Roadmap    │
└────┬───────┘                  └────┬───────┘
     │ updates                         │ informs
     ▼                                ▼
┌────────────┐    sync docs      ┌────────────┐
│ AI Output  │ ───────────────▶ │ Doc Index  │
└────────────┘                  └────────────┘
```

---

## 🛡 Guardrails Checklist

```
[ ] Cited standards section + version date
[ ] Highlighted principle usage (min 3 callouts)
[ ] Explicit test coverage plan
[ ] Documentation delta summary
[ ] Accessibility summary (visual aids noted)
```

---

## 🧪 Validation Snippet

When requesting code:
```
Provide: implementation diff, tests, doc updates, risks, manual steps.
Ensure: compliance with AI_STANDARDS.md.
```

When reviewing code:
```
Return: findings ordered by severity, affected files, missing tests, doc drift.
```

---

## 📌 Maintenance Notes

- Update "Date Created" and "Last Updated" each iteration.
- Reference new documents in the prompt whenever they are added to the index.
- Archive previous prompt versions in `/Docs/Archive/` if needed for audits.
