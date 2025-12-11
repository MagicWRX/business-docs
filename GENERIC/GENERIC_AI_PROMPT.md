# GENERIC_AI_PROMPT.md

**Purpose:** Canonical prompt template that orchestrates AI-assisted development while enforcing standards.

**Date Created:** October 16, 2025  
**Last Updated:** December 11, 2025  
**Version:** 1.1.0

---

## 🎯 Prompt Header (Copy/Paste into AI Sessions)

```
Follow Docs/GENERIC/AI_STANDARDS.md and project-specific MXN_INDEX.md.
For MXN.CHAT: Reference Docs/MXN/MXN_INDEX.md, MXN_ROADMAP.md, MXN_TREE.md, MXN_SECURITY.md.
Respect SOLID, DRY, KISS, YAGNI, SSOT, Composition, SoC, Demeter, Explicitness, Clean boundaries, Immutable Core.
Produce data flow diagrams, Linux tree snapshots, and accessibility-friendly summaries.
Write and update unit tests.
Update documentation timestamps and version numbers.
```

Include this block verbatim in every AI interaction.

---

## 🧭 Prompt Structure

| Step | Instruction | Visual Aid |
|------|-------------|------------|
| 1 | Load project MXN_INDEX.md (e.g., `Docs/MXN/MXN_INDEX.md`) | ✅ Navigation |
| 2 | Review current roadmap goals | ✅ Timeline |
| 3 | Summarize relevant docs | ✅ Table |
| 4 | Define acceptance criteria | ✅ Checklist |
| 5 | Generate implementation plan | ✅ Flow diagram |
| 6 | Propose code/tests updates | ✅ Code block |
| 7 | Outline documentation edits | ✅ Tree |
| 8 | Update timestamps and versions | ✅ Header |

---

## 🧩 Quick Reference Diagram

```
┌────────────┐    references    ┌────────────────┐
│ AI Prompt  │ ───────────────▶ │ MXN_INDEX.md   │
└────┬───────┘                  └────┬───────────┘
     │ updates                         │ informs
     ▼                                ▼
┌────────────┐    sync docs      ┌────────────────┐
│ AI Output  │ ───────────────▶ │ ROADMAP.md     │
└────┬───────┘                  └────┬───────────┘
     │ implements                      │ validates
     ▼                                ▼
┌────────────┐    refreshes      ┌────────────────┐
│ Code/Tests │ ───────────────▶ │ TREE.md        │
└────────────┘                  └────────────────┘
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
- Reference project-specific MXN_INDEX.md for current document locations.
- Archive previous prompt versions in `/Docs/Archive/` if needed for audits.
- For MXN.CHAT: Always check `/Docs/MXN/MXN_INDEX.md` before starting work.
- Cross-reference SECURITY.md for key management and E2E testing procedures.
