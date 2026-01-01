# MAGICWRX_3.0_SYSTEM.md

**Purpose:** Authoritative system interactions and data flow.

**Date Created:** December 18, 2025  
**Last Updated:** December 18, 2025

---

## 📊 Data Flow Architecture

```mermaid
flowchart TD
    subgraph Client [Client Side]
        UI[Next.js UI Components]
        AuthHook[useSupabaseAuth Hook]
    end

    subgraph Server [Server Side]
        API[Next.js API Routes]
        ServerClient[Supabase Server Client]
        Middleware[Middleware.ts]
    end

    subgraph Database [Supabase]
        Auth[GoTrue Auth]
        DB[(PostgreSQL)]
        Storage[Storage Buckets]
    end

    subgraph External [External Services]
        Stripe[Stripe Payments]
        Resend[Resend Email]
    end

    UI -->|Interacts| AuthHook
    AuthHook -->|Authenticates| Auth
    UI -->|Fetches Data| ServerClient
    ServerClient -->|Queries| DB
    API -->|Webhooks| Stripe
    API -->|Sends| Resend
    Middleware -->|Protects Routes| ServerClient
```

---

## 🧩 Core Components

### 1. Authentication Service
-   **Provider:** Supabase Auth (GoTrue)
-   **Methods:** Email/Password, Google OAuth
-   **Integration:** `src/lib/supabase/client.ts`, `src/hooks/useSupabaseAuth.ts`

### 2. Database Layer
-   **Provider:** Supabase (PostgreSQL)
-   **Key Tables:**
    -   `profiles`: User data linked to Auth ID.
    -   `sites`: Websites created by users.
    -   `subscriptions`: Stripe subscription status.

### 3. Frontend Application
-   **Framework:** Next.js 15 (App Router)
-   **Styling:** Tailwind CSS
-   **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`)

### 4. Deployment Pipeline
-   **Host:** Vercel
-   **CI/CD:** GitHub Actions / Vercel Git Integration
-   **Environment:** Production, Preview, Development

---
