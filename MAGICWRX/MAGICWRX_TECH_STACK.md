# MAGICWRX_TECH_STACK.md

**Purpose:** Detailed technical stack and configuration reference.

**Date Created:** December 18, 2025  
**Last Updated:** December 18, 2025

---

## 💻 Core Stack

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Framework** | Next.js | 15+ | App Router, Server Components |
| **Language** | TypeScript | 5.x | Type safety |
| **Styling** | Tailwind CSS | 3.x | Utility-first styling |
| **Icons** | Lucide React | Latest | Consistent iconography |
| **Drag & Drop** | @dnd-kit | Latest | Site builder mechanics |

---

## ☁️ Infrastructure & Services

| Service | Provider | Usage |
|---------|----------|-------|
| **Hosting** | Vercel | Production deployment, CI/CD |
| **Database** | Supabase | Postgres DB, Realtime |
| **Auth** | Supabase Auth | User management, OAuth |
| **Storage** | Supabase Storage | User uploads (images) |
| **Payments** | Stripe | Subscriptions, Checkout |
| **Email** | Resend | Transactional emails |

---

## 🔧 Configuration Files

- `next.config.js`: Next.js build config.
- `tailwind.config.js`: Theme extension, colors, plugins.
- `middleware.ts`: Auth protection logic.
- `.env.local`: Environment variables (Supabase keys, Stripe keys).

---

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "@supabase/supabase-js": "latest",
    "@supabase/ssr": "latest",
    "stripe": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  }
}
```

---

## 📌 Alignment Checklist

```
[x] AI_STANDARDS.md cited
[x] Visual aids used
[x] Accessibility review
```
