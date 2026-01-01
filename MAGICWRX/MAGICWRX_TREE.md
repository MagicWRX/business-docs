# MAGICWRX_4.0_TREE.md

**Purpose:** Directory and assembly layout snapshot.

**Date Created:** December 18, 2025  
**Last Updated:** December 18, 2025

---

## 🌲 Project Structure

```
MagicWRX/
├── .github/                # GitHub workflows and templates
├── apps/                   # Monorepo applications (if applicable)
├── auth-tool/              # Standalone auth utility
├── docs/                   # Legacy documentation (Deprecated)
├── public/                 # Static assets
│   ├── hero-images/
│   └── templates/
├── src/                    # Source code
│   ├── app/                # Next.js App Router pages
│   │   ├── (auth)/         # Authentication routes
│   │   ├── (public)/       # Public marketing pages
│   │   ├── (user)/         # Protected user dashboard
│   │   ├── admin/          # Admin panel
│   │   ├── api/            # API endpoints
│   │   └── sites/          # Site builder routes
│   ├── components/         # Reusable React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries (Supabase, Utils)
│   └── styles/             # Global styles
├── supabase/               # Supabase config and migrations
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 📁 Key Directories

-   **`src/app`**: Contains the file-system based routing.
-   **`CODE:`DOCs/MAGICWRX/ADMIN/src/lib/supabase``**: Contains the Supabase client initialization for client and server.
-   **`src/components`**: Shared UI components like buttons, cards, and inputs.
-   **`public`**: Images and static files served from the root.

---
