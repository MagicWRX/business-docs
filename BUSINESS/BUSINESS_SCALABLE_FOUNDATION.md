# Scalable Foundation Pathway & Feature Integration

**Document Date:** December 5, 2025
**Version:** 1.0.0
**Status:** Strategic Draft

---

## 🚀 Executive Summary: The "Magic Head" Architecture

To achieve scale while immediately integrating AI, Media, SEO, Security, and Commerce, we will adopt a **Hub-and-Spoke** architecture.

*   **The HEAD (Hub):** `MagicWRX` (Platform Core). Handles global auth (`auth-tool`), billing (Stripe Connect), centralized media storage, and AI orchestration.
*   **The SPOKES (Instances):** User sites based on `base-template`. These are lightweight, high-performance Next.js apps that consume services from the Head via APIs/SDKs.

This approach allows us to build features *once* in the CODE:`DOCs/BUSINESS/Head/Shared` Packages and deploy them to thousands of user sites instantly.

---

## 🏗️ Foundation Pathway for Scale

### 1. Unified Identity & Security (The Gatekeeper)
*   **Strategy:** Use `auth-tool` (Supabase Auth) as the Single Sign-On (SSO) provider.
*   **Scale Factor:** Users log in once to MagicWRX to manage all their sites.
*   **Security Checks:**
    *   **Middleware:** Implement `security-headers` (CSP, X-Frame-Options) in `base-template`.
    *   **Verification:** Enforce email verification before deployment (as defined in Launch Playbook).
    *   **RLS:** Row-Level Security in Supabase ensures users only access their own data/media.

### 2. Centralized Media Library (The Asset Hub)
*   **Strategy:** A shared Media Library component connected to Supabase Storage.
*   **Implementation:**
    *   **Bucket Structure:** `/{tenant_id}/{site_id}/images/*`
    *   **UI:** A "Media Picker" modal available in the Site Builder and CMS.
    *   **Optimization:** Use Next.js `<Image />` with remote patterns allowed for the Supabase Storage domain.

### 3. AI Assistant Integration (The Force Multiplier)
*   **Strategy:** Embed an AI Copilot into the Admin Dashboard and Site Builder.
*   **Tech:** Vercel AI SDK + OpenAI/Anthropic.
*   **Capabilities:**
    *   **Content Gen:** "Write a blog post about..."
    *   **SEO Helper:** "Generate meta tags for this page."
    *   **Support:** "How do I add a product?"
*   **Immediate Action:** Add `<AIAssistant />` floating widget to `MagicWRX` dashboard.

### 4. Commerce Engine (Stripe + Cart)
*   **Strategy:** Lightweight shopping cart for `base-template` sites, powered by Stripe.
*   **Components:**
    *   **Simple Shopping Cart:** React Context + LocalStorage for cart state.
    *   **Stripe Payments:** Stripe Checkout (Client-only for simple sites, or via MagicWRX API for platform fees).
    *   **Products:** Defined in Supabase or simple JSON config for MVP.

### 5. SEO Automation (The Growth Engine)
*   **Strategy:** Programmatic SEO using Next.js Metadata API.
*   **Implementation:**
    *   `layout.tsx` in `base-template` fetches global site config (Title, Description, OG Images) from Supabase.
    *   `sitemap.ts` generates dynamic sitemaps based on active routes/pages.

---

## 📅 Immediate Implementation Plan (The "Add Now" List)

### Phase 1: The Core (Week 1)
1.  **Security:** Add `middleware.ts` to `base-template` with security headers and Auth verification.
2.  **SEO:** Configure dynamic `metadata` in `CODE:`DOCs/BUSINESS/Websites/base-template/src/app/layout.tsx``.
3.  **AI:** Create a standalone `ai-assistant` package (or component folder) using Vercel AI SDK.

### Phase 2: The Assets (Week 2)
1.  **Media:** Set up Supabase Storage buckets and RLS policies.
2.  **Library UI:** Build the Media Gallery component in `MagicWRX`.

### Phase 3: The Commerce (Week 3)
1.  **Stripe:** Finalize the Stripe Connect setup in `MagicWRX`.
2.  **Cart:** Build the `<ShoppingCart />` component for `base-template`.

---

## 🛠️ Technical Specifications for Immediate Tasks

### A. AI Assistant Component
```tsx
// components/AIAssistant.tsx
'use client';
import { useChat } from 'ai/react';

export function AIAssistant() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  // ... UI implementation
}
```

### B. Security Middleware
```ts
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Content-Security-Policy', "default-src 'self'; ...");
  return response;
}
```

### C. SEO Metadata
```tsx
// app/layout.tsx
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // Fetch from DB
  const siteConfig = await getSiteConfig(); 
  return {
    title: siteConfig.title,
    description: siteConfig.description,
    openGraph: { ... },
  };
}
```

---

## 🔄 Integration with Workspaces

| Feature | MagicWRX (Head) | Base Template (Spoke) | Auth Tool |
| :--- | :--- | :--- | :--- |
| **AI** | Hosts the API Route & UI Widget | Consumes API for content gen | - |
| **Media** | Manages Uploads & Storage | Displays Images (Read-only) | - |
| **SEO** | Defines Global Rules | Implements Page-level Tags | - |
| **Security** | Manages Policies | Enforces Headers & Auth | Handles Login |
| **Commerce** | Connects Stripe Accounts | Renders Cart & Checkout | - |

