# MXN.CHAT A/B Testing & Environment Strategy

**Document Date:** December 15, 2025
**Status:** On Hold / Partially Implemented
**Related:** MXN_FEATURES.md, MXN_DEPLOYMENT_CICD.md

---

## ⚠️ Current Implementation Status (Dec 15, 2025)

**The full A/B testing and strict database separation is currently PAUSED pending further research.**

### Active Setup:
*   **Staging Branch:** A `staging` branch exists in Git.
*   **Vercel Preview:** Pushing to `staging` automatically deploys a live Preview URL (e.g., `mxn-chat-git-staging-magicwrx.vercel.app`).
*   **Database:** ⚠️ **Staging currently shares the Production Supabase database.** Data changes in Staging will affect Live users.

### Pending / On Hold:
*   Creation of separate `mxn-chat-staging` Supabase project.
*   Implementation of Middleware for A/B traffic splitting.
*   Vercel Edge Config setup.

---

## 🎯 Objective
To establish a robust control system for optimizing the user experience by testing different UI/UX variations (A/B Testing) and strictly separating "Live" (Production) environments from "Staging" (Pre-Production).

---

## 1. Environment Strategy (Vercel & Supabase)

To ensure stability while innovating, we will utilize a strict **Dual-Environment Pipeline**.

### **A. Vercel (Frontend & Edge Logic)**
Vercel provides native support for environment separation:

1.  **Production (Live)**
    *   **URL:** `mxn.chat` (and `www.`)
    *   **Git Branch:** `main`
    *   **Data Source:** Supabase **Production** Project
    *   **Stability:** High. Only fully tested features.

2.  **Preview / Staging (Pre-Production)**
    *   **URL:** `git-branch-name.vercel.app` (e.g., `feature-new-sidebar.vercel.app`)
    *   **Git Branch:** Any pull request or non-main branch (e.g., `develop`, `staging`).
    *   **Data Source:** Supabase **Staging** Project (or Branch).
    *   **Purpose:** Internal testing, QA, and "Beta" access for select users.

### **B. Supabase (Backend & Database)**
Supabase offers two primary methods for environment isolation:

1.  **Project Separation (Recommended for MXN)**
    *   Create two distinct projects: `mxn-chat-prod` and `mxn-chat-staging`.
    *   **Pros:** Complete isolation. No risk of accidental data deletion in prod.
    *   **Cons:** Need to keep schemas in sync (handled via Migrations).

2.  **Database Branching (Advanced)**
    *   Allows creating a "branch" of the database for every Git branch.
    *   **Pros:** Instant environments for every feature.
    *   **Cons:** Paid feature, higher complexity.

---

## 2. A/B Testing Architecture

We will implement A/B testing to optimize key UI components (Sidebar, Vibe Lounge, Landing Page).

### **Technology Stack: Vercel Edge Middleware + Edge Config**
This is the fastest, most performance-efficient way to handle A/B testing in Next.js 15.

#### **How it Works:**
1.  **User Request:** User visits `mxn.chat`.
2.  **Edge Middleware:** Intercepts the request *before* the page loads ( < 10ms latency).
3.  **Bucket Assignment:**
    *   Checks for a `mxn-ab-test` cookie.
    *   If none exists, randomly assigns user to **Bucket A (Control)** or **Bucket B (Variant)** based on configured probability (e.g., 50/50).
    *   Sets the cookie so the user stays in that bucket.
4.  **Feature Flag Check:** Consults **Vercel Edge Config** (a low-latency key-value store) to see which features are active for that bucket.
5.  **Response:**
    *   **Rewrites:** Can transparently rewrite the URL (e.g., show `/login-b` content while URL remains `/login`).
    *   **Headers:** Can inject a header `x-show-feature: new-sidebar` that the React components read to render differently.

---

## 3. Targeted A/B Test Scenarios

### **🧪 Test 1: The Vibe Lounge (Core UX)**
*   **Hypothesis:** A grid layout of vibes converts better than a list layout.
*   **Variant A (Control):** Current "Vibe Circles" row + List of topics.
*   **Variant B (Test):** Full-screen "Vibe Grid" with larger, animated cards.
*   **Metric:** % of users who join a room within 30 seconds.

### **🧪 Test 2: Sidebar Navigation**
*   **Hypothesis:** "My Topics" should be at the top for retention.
*   **Variant A (Control):** Standard list (Public Rooms -> My Rooms).
*   **Variant B (Test):** "My Topics" pinned to top with unread badges prominent.
*   **Metric:** Click-through rate on "My Topics".

### **🧪 Test 3: Login / Landing Page**
*   **Hypothesis:** "Enter Chat" (Anonymous) converts better than "Login".
*   **Variant A (Control):** Standard Email/Password form visible immediately.
*   **Variant B (Test):** "Pick a Vibe to Enter" (Anonymous flow), prompting for account creation *after* 5 minutes.
*   **Metric:** Sign-up conversion rate.

---

## 4. Implementation Roadmap

### **Phase 1: Infrastructure Setup**
1.  [ ] Create `mxn-chat-staging` project in Supabase.
2.  [ ] Configure Vercel Environment Variables for `NEXT_PUBLIC_SUPABASE_URL` (different for Production vs. Preview).
3.  [ ] Set up **Vercel Edge Config** store for feature flags.

### **Phase 2: Middleware Logic**
1.  [ ] Create `middleware.ts` update to handle A/B bucketing.
2.  [ ] Create a `useFeatureFlag` hook in React to read the bucket state.

### **Phase 3: Test Execution**
1.  [ ] Build "Variant B" of the Vibe Lounge.
2.  [ ] Wrap both versions in a conditional:
    ```tsx
    {abBucket === 'B' ? <VibeLoungeGrid /> : <VibeLoungeList />}
    ```
3.  [ ] Deploy and monitor Vercel Analytics.

---

## 5. Control Dashboard (Admin)

We will build a simple **"Traffic Control"** page in the Admin Dashboard (`/admin/flags`) to:
*   Toggle features On/Off globally.
*   Adjust A/B split % (e.g., roll out to 10%, then 50%, then 100%).
*   "Kill Switch" specific variants if bugs are found.

**Storage:** These settings will live in **Vercel Edge Config** for instant propagation (no re-deploy needed).
