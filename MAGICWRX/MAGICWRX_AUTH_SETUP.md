# MAGICWRX_AUTH_SETUP.md

**Purpose:** Consolidated authentication setup and migration guide.

**Date Created:** December 18, 2025  
**Last Updated:** December 18, 2025

---

## 🔐 Authentication Overview

Magic WRX uses **Supabase Auth** as the primary authentication provider, replacing the legacy Firebase Authentication.

### **Configuration**

1.  **Supabase Project**: Ensure a project is created at [supabase.com](https://supabase.com).
2.  **Environment Variables**:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    ```
3.  **Redirect URLs**:
    -   Local: `http://localhost:3000/auth/callback`
    -   Production: `https://your-domain.com/auth/callback`

### **Implementation Details**

-   **Client-Side**: Use `createClientComponentClient` from `@supabase/auth-helpers-nextjs` (or `ssr` package).
-   **Server-Side**: Use `createServerComponentClient` in Server Components and API routes.
-   **Middleware**: `middleware.ts` handles session refreshing and route protection.

### **Migration from Firebase**

Legacy Firebase Auth code has been deprecated.
-   **Old Hook**: `useAuth` (Firebase) -> **New Hook**: `useSupabaseAuth` (Supabase).
-   **User Object**: Firebase `User` -> Supabase `User` (mapped properties).

### **Admin Access**

Admin routes (`/admin/*`) are protected by checking the user's role in the `profiles` table. Ensure the RLS policy allows admins to read all data.

---
