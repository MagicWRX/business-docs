# MAGICWRX_AI_PROMPT.md

**Purpose:** Context injection for AI agents working on MagicWRX.

**Date Created:** December 18, 2025  
**Last Updated:** December 18, 2025

---

## 🤖 AI Agent Context

You are working on **MagicWRX**, a Next.js 15+ business website builder platform.

### 🔑 Key Constraints
1.  **Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Supabase (Auth/DB).
2.  **No Firebase:** The project has migrated *away* from Firebase. Do not suggest Firebase solutions.
3.  **Styling:** Use Tailwind utility classes. Avoid CSS modules unless necessary for complex animations.
4.  **Icons:** Use `lucide-react`.
5.  **Images:** Always use `next/image` component.

### 📂 Project Structure
- `src/app`: Routes.
- `src/components`: Reusable UI.
- `CODE:`DOCs/MAGICWRX/ADMIN/src/lib/supabase``: Database clients.
- `DOCs/MAGICWRX`: Source of Truth documentation.

### 📝 Coding Standards
- **Strict TypeScript:** No `any`. Define interfaces for all props and data.
- **Server Components:** Default to Server Components. Use `'use client'` only when interactivity is needed.
- **Hooks:** Use `useMemo` and `useCallback` to prevent re-renders.
- **Linting:** Ensure code passes `eslint`.

### 🔗 Reference Links
- [Roadmap](MAGICWRX_ROADMAP.md)
- [System Architecture](MAGICWRX_SYSTEM.md)
- [Tech Stack](MAGICWRX_TECH_STACK.md)

---

## 📌 Alignment Checklist

```
[x] AI_STANDARDS.md cited
[x] Roadmap link verified
```
