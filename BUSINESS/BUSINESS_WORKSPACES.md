# Business Workspaces Overview

**Document Date:** December 18, 2025  
**Version:** 2.0.0  
**Last Updated:** December 18, 2025  
**Status:** Multi-Tenant Platform Architecture

---
## Business Workspaces Entity Hierarchy
## Google OAuth 2.0 Client IDs:

   amazinglystrangemedia@gmail.com
      amazinglystrange.com 
         ✅ Vercel Redirect URLS:


         ✅ Authorized Redirect URI: https://asvtzicvufmiuudctkbe.supabase.co/auth/v1/callback

         .env.local - 
            Cloud Flare - DNS
            Brevo - admin@amazinglystrange.com

            Client ID:
            61447...

            Client Secret:
            GOCS...



   magicwrxstudio@gmail.com
      magicwrx.com
         Authorized Redirect URI: https://ujfcflnrtrkdgfclwelz.supabase.co/auth/v1/callback

      mxn.chat
         Authorized Redirect URI: https://opcsbfwqazyzsskuuooz.supabase.co/auth/v1/callback

## Vercel
   amazinglystrangemedia@gmail.com
      amazinglystrange.com

      Deployments:
      https://amazinglystrange.vercel.app
      https://amazinglystrange-git-master-amazinglystrange.vercel.app
      https://amazinglystrange-j1l61y9lg-amazinglystrange.vercel.app

      Domains:
      https://amazinglystrange.vercel.app

      
   magicwrxstudio@gmail.com
      magicwrx.com
      mxn.chat

## Supabase
   amazinglystrangemedia@gmail.com
      amazinglystrange.com
      
   magicwrxstudio@gmail.com
      magicwrx.com
      mxn.chat

## Stripe
      magicwrxstudio@gmail.com
      - magicwrx purchases
         - Blog
         - Hosting
         - Secure Login
         - AdSense Revenue Sharing

   How Do I manage Customers?
   Revenue Sharing
      AmazinglyStrange.com - Simple Online Store.

## Brevo
   magicwrxstudio@gmail.com
   - admin@magicwrx.com
   - admin@mxn.chat
   - admin@amazinglystrange.com
      - brian@amazinglystrange.com
   - admin@brianlindahl.com
      - brian@brianlindahl.com
   
   How Do I manage Customers
   - admin@pixelextreme

## CloudFlare
   magicwrxstudio@gmail.com
      DNS, MX Records
      - magicwrx.com
      - mxn.chat
      - amazinglystrange.com

   How Do I manage Customers
   - pixelextreme.com

## Google Adsense 
   amazinglystrangemedia@gmail.com - Current Account tied to MonstersReign.com Mobile Games
   - magicwrx.com shared revenue
      - Websites
      - Blog sites
   - AmazinglyStrange.com
      - Pages: About, Contact, Games, News, 
      - Blog
   - mxn.chat
      - RoomsSidebar.tsx
      - ChatInterface.tsx
         - Vibe Lounge
         - Thoughts

## Admob Advertiseing
   amazinglystrangemedia@gmail.com - account tied to adsense.
   - MonstersReign.com - Admob Banners
      - SnakeBot
      - Monster Trap
      - Monster Dish Delivery
      - Monster Bubble
      - Monster Traffic Jam
      - Monster Egg Match
      - Fluff's Happy Match
      - Murky Merge

## Google Analytics

## Google Search

11. Google 


## 


## Business Workspaces Prompt

1. [✅] Setting up Staging Site in ADMIN 
2. [✅] Setting up Demo Pages for SHARED tools.
3. [✅] ADMIN Master and Tenant System
4. [✅] Location-Filter Testing with in SHARED tools.
5. [ ] Stripe Setup
6. [ ] Adsense Setup
7. [ ] Google AUTH setup for BUSINESS Projects
8. [ ] Clear Database Structure, and Scale Development
9. [ ] Landing_01 thru Landing_12 Page for MagicWRX 
10. [ ] Landing Pages intertwinded with Template-WRX and Layout-Manager.tsx and SHARED tools.
11. [ ] Card Develpoment for SHARED Tools? 
12. [ ] Connect to figma.  Designers can implement their custom design is to base-templates.
13. [ ] mxn.chat VIBE LOUNGE homepage is set to "mxn default blue ring" in the "VIBE TABS". mxn blue is equal to nuetural in mood.
14. [ ] Amazingly Strange need's it's Blue Background for Page.
15. [ ] Amazingly Strange Tools need to be functioning in SHARED workspaces. Each Tool needs a Demo Page for testing and Developing.

16. [ ] Limit Location Filter to just Countries
17. [ ] Setup Google OAuth 
18. [ ] Setup CloudFlare + Brevo - Admin Emails
      MagicWRX 1st May need to move Domains from SquareSpace which needs to wait till New Amazingly Strange Site is complete.
19. [ ] Push mxn.chat to git 
20. [ ] fix mxn.chat bubble color
21. [ ] mxn.chat vibe selector
22. [ ] mxn.cha vibe tap selector
23. [ ] refined Layout-Manager.tsx


## Prompt Workspace Checks
1. BUSINESS_WORKSPACE.md, BUSINESS_EXECUTIVE.md, BUSINESS_ROADMAP.md, BUSiNESS_INDEX.md, BUSINESS_ADMIN.md, BUSINESS_TREE.md, BUSINESS_DATABASE.md
2. MAGICWRX_EXECUTIVE.md, MAGICWRX__ROADMAP.md, MAGICWRX_INDEX.md, MAGICWRX__ADMIN.md, MAGICWRX__TREE.md, MAGICWRX__DATABASE.md
3. MXN_EXECUTIVE.md, MXN_ROADMAP.md, MXN_INDEX.md, MXN_ADMIN.md, MXN_TREE.md, MXN_DATABASE.md
4. AMS_EXECUTIVE.md, AMS_ROADMAP.md, AMS_INDEX.md AMS_ADMIN.md, AMS_TREE.md, AMS_DATABASE.md


Read [](file:///Users/brianlindahl/Development/Business/ADMIN/GOOGLE_OAUTH_SETUP.md#1-1), lines 1 to 50

### Does each project need its own Google Auth Client?

**Yes, absolutely.**

For security, reliability, and proper branding, **each distinct Supabase project** (Database) requires its own set of Google OAuth credentials (Client ID and Secret).

Here is the breakdown based on your architecture:

#### 1. MXN Chat (Priority: High)
*   **Database:** MXN Chat (`opcsbfwqazyzsskuuooz`)
*   **Needs:** A dedicated Google Cloud Project (or at least a dedicated OAuth Client credential within your main project).
*   **Why:** Users logging into MXN Chat should see "Sign in to **MXN Chat**", not "MagicWRX".
*   **Redirect URI:** `https://opcsbfwqazyzsskuuooz.supabase.co/auth/v1/callback` (This is the Supabase callback URL you put in Google Cloud).

#### 2. MagicWRX / ADMIN / TOOLS (Priority: High)
*   **Database:** MagicWRX (`ujfcflnrtrkdgfclwelz`)
*   **Needs:** One shared Google OAuth Client is usually sufficient if they all share the same user base (Multi-tenant).
*   **Why:** The ADMIN dashboard and the main MagicWRX site share the same `auth.users` table.
*   **Redirect URI:** `https://ujfcflnrtrkdgfclwelz.supabase.co/auth/v1/callback`.

#### 3. Amazingly Strange (Priority: Medium)
*   **Database:** Amazingly Strange (`asvtzicvufmiuudctkbe`)
*   **Needs:** A separate Google OAuth Client.
*   **Why:** Completely separate business entity and user base.
*   **Redirect URI:** `https://asvtzicvufmiuudctkbe.supabase.co/auth/v1/callback`.

### Summary of Required Google Cloud Credentials

You should create **3 separate OAuth 2.0 Client IDs** in your Google Cloud Console (`magicwrxstudio@gmail.com`):

1.  **MXN Chat Client**
    *   **Authorized Redirect URI:** `https://opcsbfwqazyzsskuuooz.supabase.co/auth/v1/callback`
    *   **Copy ID/Secret to:** MXN Chat Supabase Dashboard -> Authentication -> Google.

2.  **MagicWRX Platform Client**
    *   **Authorized Redirect URI:** `https://ujfcflnrtrkdgfclwelz.supabase.co/auth/v1/callback`
    *   **Copy ID/Secret to:** MagicWRX Supabase Dashboard -> Authentication -> Google.

3.  **Amazingly Strange Client**
    *   **Authorized Redirect URI:** `https://asvtzicvufmiuudctkbe.supabase.co/auth/v1/callback`
    *   **Copy ID/Secret to:** Amazingly Strange Supabase Dashboard -> Authentication -> Google.

**Crucial Detail:**
In Google Cloud, the **Authorized Redirect URI** must point to the **Supabase Project URL**, NOT your website URL (e.g., `mxn.chat`). Supabase handles the handshake and then redirects back to your site based on the "Redirect URLs" list we discussed earlier.



**New Architecture (Dec 2025):**
- **Multi-Tenant Platform**: 
	MagicWRX Supabase serves unlimited clients via Row-Level Security (RLS)
	
- **Centralized Admin**: 
	`/ADMIN/` manages all 3 platforms from one dashboard (http://localhost:3006)

- **Shared Components**: 
	`/SHARED/` library (auth-tool, blog-engine, layout-manager, media-library, location-filter)

---
## 🛠️ Development Scripts & Tools (SSOT)

### 1. Master Build Script (`SHARED/build-shared.sh`)
**Purpose:** Compiles all shared packages in dependency order.
**Usage:**
```bash
./SHARED/build-shared.sh
```
**Packages Built:**
- `location-filter`
- `auth-tool`
- `blog-engine`
- `layout-manager`
- `media-library`
- `analytics-dashboard`
- `contact-manager`
- `gallery-components`
- `header-components`
- `page-editor`

### 2. Workspace Launcher (`SHARED/start-all-local.sh`)
**Purpose:** Starts all projects on their designated ports.
**New Features:**
- **Auto-Build:** Checks if shared packages are built before starting.
- **Fresh Start:** `fresh` command rebuilds all shared tools first.

**Commands:**
```bash
./SHARED/start-all-local.sh start        # Start all projects (auto-builds if needed)
./SHARED/start-all-local.sh fresh        # Rebuild shared tools + start all
./SHARED/start-all-local.sh start [name] # Start specific project (e.g., mxn-chat)
./SHARED/start-all-local.sh stop         # Stop all projects
```

### 3. Admin Validation (`ADMIN/validate-setup.sh`)
**Purpose:** Verifies the ADMIN environment is correctly configured.
**Checks:**
- Node/npm versions
- `.env.local` variables (Supabase URLs)
- **Shared Packages:** Verifies existence and `package.json` for all dependencies.
- Critical file existence.

**Usage:**
```bash
cd ADMIN && ./validate-setup.sh
```

### 4. Project Launchers
Each project has a dedicated `start-local.sh` to ensure correct ports and environment.

| Project | Script | Port | Notes |
|---------|--------|------|-------|
| **MXN Chat** | `mxn-chat/start-local.sh` | **3001** | Uses `dev-manager.sh` internally. |
| **MagicWRX** | `MagicWRX/start-local.sh` | **3002** | **NEW:** Ensures port 3002 (was conflicting). |
| **Hub** | `SHARED/start-all-local.sh` | **3000** | Runs the central hub. |

---
## � Local Port Assignments (SSOT)

| Port | Project | Location |
|------|---------|----------|
| **3000** | **Business HUB** | `SHARED/hub` |
| **3001** | **MXN Chat** | `Websites/mxn-chat` |
| **3002** | **MagicWRX** | `Websites/MagicWRX` |
| **3003** | **Amazingly Strange** | `Amazingly-Strange-Website` |
| **3004** | **Base Template** | `Websites/base-template` |
| **3005** | **Template WRX** | `Websites/Template-WRX` |
| **3006** | **Master ADMIN** | `ADMIN/` |
| **3007** | **Auth Tool** | `Websites/auth-tool` |
| **3008** | **Auth Tool Pkg** | `Websites/auth-tool-package` |

---

## SHARED Tools Hub (Build + Test Lab)

**Purpose:** A dedicated playground for `@amazing/*` packages AND the central launchpad for all local workspaces.

**Local:**
- Runs at **http://localhost:3000** from `SHARED/hub`
- Start via: `bash SHARED/start-all-local.sh start hub` (or just `start`)

**Features:**
- **Workspaces Dashboard:** Links to all running local projects (MXN, MagicWRX, Admin, etc.)
- **Tool Playground:** Isolated testing environments for shared components (Gallery, Auth, etc.)

**Relationship to ADMIN:**
- `ADMIN` remains the **real integration surface** (multi-tenant, real backends).
- The Hub is the **isolation surface** (mock backends by default) + **Navigation Center**.

### Environment Variables (Exact Names)

**Hub (recommended when connecting to real services):**
- `NEXT_PUBLIC_APP_ENV` = `development` | `staging` | `production`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; never expose as `NEXT_PUBLIC_*`)

**mxn-chat (Supabase client uses):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; optional)

**ADMIN (.env.local.example):**
- `NEXT_PUBLIC_AS_SUPABASE_URL`
- `NEXT_PUBLIC_AS_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MAGICWRX_SUPABASE_URL`
- `NEXT_PUBLIC_MAGICWRX_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MXN_SUPABASE_URL`
- `NEXT_PUBLIC_MXN_SUPABASE_ANON_KEY`

### Vercel + Supabase + Google OAuth (Staging vs Production)

**Recommended approach (simple + reliable):**
- **Vercel Preview Deployments** = staging
- **Vercel Production Deployment** = live

**Supabase:**
- Use **two Supabase projects** (staging + production) to prevent test data and auth settings from leaking into production.
- In Vercel, set env vars by scope:
	- **Preview** → staging Supabase URL/keys
	- **Production** → production Supabase URL/keys

**Google OAuth via Supabase Auth:**
- In Google Cloud Console, set **Authorized redirect URI** to Supabase callback:
	- `https://<SUPABASE_PROJECT_REF>.supabase.co/auth/v1/callback`
- In Supabase Auth settings for each environment, set:
	- **Site URL** (your primary domain)
	- **Additional Redirect URLs** (include local + staging + prod):
		- `http://localhost:3000/*` (Hub)
		- `http://localhost:3005/*` (ADMIN)
		- your staging domain(s)
		- your production domain(s)

**Practical note:** Google OAuth does not support wildcard subdomains well for Vercel previews; prefer a stable staging domain (or rely on PR previews without OAuth).

---
## 🔐 ADMIN Login Credentials Guide

### What's the Difference?

**Account Access** = Logging into **Supabase Dashboard** (https://supabase.com/dashboard)
- Use to: Manage projects, create users, view database, configure settings
- Login with: Your Supabase account email/password

**User Access** = Logging into **ADMIN App** (http://localhost:3006/login)
- Use to: Manage platforms (MagicWRX, MXN, AmazinglyStrange content)
- Login with: User created IN the Supabase project's Authentication tab

---

## 🎛️ Complete Setup Guide (Step-by-Step)

### Overview: Three Core Services

**All services use the `magicwrxstudio@gmail.com` account for:**
- Google Cloud Console (OAuth management)
- Vercel (deployment & hosting)
- Stripe (all billing & payments)
- Supabase (MagicWRX & MXN projects)

**Exception:** `brian@amazinglystrange.com` manages AmazinglyStrange Supabase project

---

### Part 1: Google OAuth Setup

**See complete guide:** [GOOGLE_OAUTH_SETUP.md](../../ADMIN/GOOGLE_OAUTH_SETUP.md)

#### Quick Start: Create OAuth Clients

1. **Login to Google Cloud Console**: https://console.cloud.google.com/
   - Account: `magicwrxstudio@gmail.com`

2. **Create Project** (if not exists):
   - Name: "MagicWRX Business"
   - Enable: Google+ API, Google OAuth2 API

3. **Create OAuth Clients** (for each project):
   
   **MXN.CHAT:**
   - Name: `mxn-auth-dev` (development)
   - Redirect URIs: `http://localhost:3001/auth/callback`, `https://opcsbfwqazyzsskuuooz.supabase.co/auth/v1/callback`
   - Name: `mxn-auth-prod` (production)
   - Redirect URIs: `https://mxn.chat/auth/callback`, `https://opcsbfwqazyzsskuuooz.supabase.co/auth/v1/callback`

   **MagicWRX:**
   - Name: `magicwrx-auth-dev`
   - Redirect URIs: `http://localhost:3002/auth/callback`, `https://ujfcflnrtrkdgfclwelz.supabase.co/auth/v1/callback`
   - Name: `magicwrx-auth-prod`
   - Redirect URIs: `https://magicwrx.com/auth/callback`, `https://ujfcflnrtrkdgfclwelz.supabase.co/auth/v1/callback`

   **ADMIN:**
   - Name: `admin-auth-dev`
   - Redirect URIs: `http://localhost:3006/auth/callback`
   - Name: `admin-auth-prod`
   - Redirect URIs: `https://admin.magicwrx.com/auth/callback`

4. **Save Client ID and Secret** for each client

---

### Part 2: Supabase Configuration

#### Current Supabase Projects

| Project | Account | Project Ref | URL |
|---------|---------|-------------|-----|
| **MagicWRX** | magicwrxstudio@gmail.com | ujfcflnrtrkdgfclwelz | https://ujfcflnrtrkdgfclwelz.supabase.co |
| **MXN.CHAT** | magicwrxstudio@gmail.com | opcsbfwqazyzsskuuooz | https://opcsbfwqazyzsskuuooz.supabase.co |
| **AmazinglyStrange** | brian@amazinglystrange.com | asvtzicvufmiuudctkbe | https://asvtzicvufmiuudctkbe.supabase.co |

#### Configure Google OAuth in Each Project

1. **Login to Supabase Dashboard**:
   - Go to https://supabase.com/dashboard
   - Login with appropriate account (see table above)

2. **Select Project** (e.g., MXN.CHAT)

3. **Enable Google Provider**:
   - Go to **Authentication** → **Providers**
   - Find **Google** and toggle ON
   - Enter **Client ID** from Google Cloud Console
   - Enter **Client Secret** from Google Cloud Console

4. **Configure Redirect URLs**:
   - Go to **Authentication** → **URL Configuration**
   - **Site URL**: Production domain (e.g., `https://mxn.chat`)
   - **Additional Redirect URLs**:
     ```
     http://localhost:3001/*
     http://localhost:3001/auth/callback
     https://mxn.chat/*
     https://mxn.chat/auth/callback
     ```

5. **Repeat for MagicWRX and AmazinglyStrange projects**

---

### Part 3: Vercel Deployment

#### Vercel Projects Setup

1. **Login to Vercel**:
   - Go to https://vercel.com
   - Account: `magicwrxstudio@gmail.com`

2. **Connect GitHub Repositories**:
   - MXN.CHAT: Link to `mxn-chat` repo
   - MagicWRX: Link to `MagicWRX` repo
   - ADMIN: Link to `admin` repo
   - AmazinglyStrange: Link to `amazingly-strange-website` repo

3. **Configure Environment Variables** (for each project):

   **Example: MXN.CHAT on Vercel:**
   - Go to project → **Settings** → **Environment Variables**
   - Add production variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL = https://opcsbfwqazyzsskuuooz.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY = [from Supabase dashboard]
     NEXT_PUBLIC_GOOGLE_CLIENT_ID = [from mxn-auth-prod]
     GOOGLE_CLIENT_SECRET = [from mxn-auth-prod]
     ```

   **Example: MagicWRX on Vercel:**
   - Add Supabase variables (same as above)
   - Add Stripe variables:
     ```
     STRIPE_SECRET_KEY = sk_live_...
     STRIPE_WEBHOOK_SECRET = whsec_...
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_...
     ```

4. **Deploy**:
   - Push to main branch → Vercel auto-deploys
   - Or manually trigger deployment from Vercel dashboard

---

### Part 4: Stripe Integration (MagicWRX Only)

**All billing is managed through `magicwrxstudio@gmail.com` Stripe account.**

1. **Login to Stripe**:
   - Go to https://dashboard.stripe.com
   - Account: `magicwrxstudio@gmail.com`

2. **Get API Keys**:
   - Go to **Developers** → **API keys**
   - Copy:
     - Publishable key (pk_test_ or pk_live_)
     - Secret key (sk_test_ or sk_live_)

3. **Create Products & Pricing**:
   - Go to **Products** → **Add product**
   - Create tiers: Free, Starter, Pro, Enterprise
   - Set recurring billing intervals

4. **Setup Webhooks**:
   - Go to **Developers** → **Webhooks** → **Add endpoint**
   - Endpoint URL: `https://magicwrx.com/api/webhooks/stripe`
   - Events to listen for:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copy webhook signing secret (whsec_...)

5. **Add to Vercel** (see Part 3 above)

---

### Part 5: Local Development Setup

#### Install Dependencies

```bash
# ADMIN
cd /Users/brianlindahl/Development/Business/ADMIN
npm install
npm run dev  # Runs on port 3006

# MXN.CHAT
cd /Users/brianlindahl/Development/Business/Websites/mxn-chat
npm install
npm run dev  # Runs on port 3001

# MagicWRX
cd /Users/brianlindahl/Development/Business/Websites/MagicWRX
npm install
npm run dev  # Runs on port 3002

# Business HUB
cd /Users/brianlindahl/Development/Business/SHARED/hub
npm install
npm run dev  # Runs on port 3000
```

#### Create .env.local Files

**MXN.CHAT (.env.local):**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://opcsbfwqazyzsskuuooz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[from Supabase dashboard]
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[from mxn-auth-dev]
GOOGLE_CLIENT_SECRET=[from mxn-auth-dev]
```

**MagicWRX (.env.local):**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://ujfcflnrtrkdgfclwelz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[from Supabase dashboard]
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[from magicwrx-auth-dev]
GOOGLE_CLIENT_SECRET=[from magicwrx-auth-dev]
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**ADMIN (.env.local):**
```bash
# AmazinglyStrange
NEXT_PUBLIC_AS_SUPABASE_URL=https://asvtzicvufmiuudctkbe.supabase.co
NEXT_PUBLIC_AS_SUPABASE_ANON_KEY=[from AS Supabase]

# MagicWRX
NEXT_PUBLIC_MAGICWRX_SUPABASE_URL=https://ujfcflnrtrkdgfclwelz.supabase.co
NEXT_PUBLIC_MAGICWRX_SUPABASE_ANON_KEY=[from MagicWRX Supabase]

# MXN.CHAT
NEXT_PUBLIC_MXN_SUPABASE_URL=https://opcsbfwqazyzsskuuooz.supabase.co
NEXT_PUBLIC_MXN_SUPABASE_ANON_KEY=[from MXN Supabase]
```

---

### Part 6: Testing

#### Test Authentication Flow

1. **Start Local Servers**:
   ```bash
   # Option 1: Start all projects
   cd /Users/brianlindahl/Development/Business/SHARED
   ./start-all-local.sh start

   # Option 2: Start individual project
   cd /Users/brianlindahl/Development/Business/Websites/mxn-chat
   npm run dev
   ```

2. **Test Google OAuth**:
   - Visit http://localhost:3001 (MXN) or http://localhost:3002 (MagicWRX)
   - Click "Sign in with Google"
   - Authorize with `magicwrxstudio@gmail.com`
   - Verify redirect back to app
   - Check Supabase dashboard for new user

3. **Test ADMIN Dashboard**:
   - Visit http://localhost:3006
   - Login with email/password OR Google OAuth
   - Verify site switcher works (brian@ sees AS, magicwrxstudio@ sees MagicWRX/MXN)
   - Test platform-specific admin features

4. **Test Stripe (MagicWRX)**:
   - Use Stripe test cards: `4242 4242 4242 4242`
   - Create test subscription
   - Verify webhook delivery in Stripe dashboard
   - Check subscription status updates in database

---

## 📋 Quick Reference: Account Access

### Google Cloud Console
- **URL**: https://console.cloud.google.com/
- **Account**: `magicwrxstudio@gmail.com`
- **Purpose**: OAuth client management
- **Current Setup**: `Tools → Auth-Tool Credential` ✅ Complete
- **Needs Setup**: MXN.CHAT, MagicWRX, ADMIN OAuth clients

### Supabase Dashboard
- **URL**: https://supabase.com/dashboard
- **MagicWRX Account**: `magicwrxstudio@gmail.com`
  - Projects: MagicWRX (ujfcflnrtrkdgfclwelz), MXN.CHAT (opcsbfwqazyzsskuuooz)
- **AmazinglyStrange Account**: `brian@amazinglystrange.com`
  - Project: AmazinglyStrange (asvtzicvufmiuudctkbe)

### Vercel
- **URL**: https://vercel.com
- **Account**: `magicwrxstudio@gmail.com`
- **Projects**: MXN.CHAT, MagicWRX, ADMIN, AmazinglyStrange, Hub

### Stripe
- **URL**: https://dashboard.stripe.com
- **Account**: `magicwrxstudio@gmail.com`
- **Purpose**: All billing & payments (MagicWRX subscriptions, revenue sharing)

---

## ✅ Setup Completion Checklist

### Google OAuth
- [x] `auth-tool` OAuth client created
- [ ] `mxn-auth-dev` OAuth client created
- [ ] `mxn-auth-prod` OAuth client created
- [ ] `magicwrx-auth-dev` OAuth client created
- [ ] `magicwrx-auth-prod` OAuth client created
- [ ] `admin-auth-dev` OAuth client created
- [ ] `admin-auth-prod` OAuth client created

### Supabase Configuration
- [ ] MXN.CHAT: Google provider configured (dev + prod)
- [ ] MagicWRX: Google provider configured (dev + prod)
- [ ] AmazinglyStrange: Google provider configured (optional)
- [ ] All redirect URLs added to Supabase

### Vercel Deployment
- [ ] MXN.CHAT: Production env vars set
- [ ] MagicWRX: Production env vars set (including Stripe)
- [ ] ADMIN: Production env vars set (all 3 Supabase instances)
- [ ] All projects deployed and accessible

### Stripe Setup
- [ ] API keys copied
- [ ] Products & pricing tiers created
- [ ] Webhook endpoint configured
- [ ] Webhook signing secret added to Vercel

### Local Development
- [ ] All projects: .env.local files created
- [ ] Dependencies installed (`npm install`)
- [ ] Local servers start successfully
- [ ] Google OAuth works locally
- [ ] Database connections verified

---

### For ADMIN App Login (`/ADMIN/`)

#### MagicWRX & MXN.CHAT Admin

**ADMIN Login:** magicwrxstudio@gmail.com  
**Password:** [Create this user in Supabase Dashboard below]

**How to Create/Reset:**
1. Go to https://supabase.com/dashboard
2. Login with: magicwrxstudio@gmail.com / ***** (Account Access)
3. Select **MagicWRX project** (`ujfcflnrtrkdgfclwelz`)
4. Navigate to **Authentication** → **Users**
5. Add or reset user: `magicwrxstudio@gmail.com`
6. Set password → **Use this for ADMIN login**

#### AmazinglyStrange Admin

**ADMIN Login:** brian@amazinglystrange.com  
**Password:** [Create this user in Supabase Dashboard below]

**How to Create/Reset:**
1. Go to https://supabase.com/dashboard
2. Login with: brian@amazinglystrange.com / ***** (Account Access)
3. Select **AmazinglyStrange project** (`nthggvagtopobmdnquph`)
4. Navigate to **Authentication** → **Users**
5. Add or reset user: `brian@amazinglystrange.com`
6. Set password → **Use this for ADMIN login**

---

### For Platform Management (Dashboard Access)

#### Vercel (Deployment Platform)
- **Login:** magicwrxstudio@gmail.com
- **Password:** ******
- **Used For:** Deploy projects, manage domains, view analytics

#### Supabase Dashboard (Database Management)

**MagicWRX & MXN Projects:**
- **Login:** magicwrxstudio@gmail.com
- **Password:** *****
- **Projects:** MagicWRX (`ujfcflnrtrkdgfclwelz`) + MXN.CHAT (`opcsbfwqazyzsskuuooz`)

**AmazinglyStrange Project:**
- **Login:** brian@amazinglystrange.com
- **Password:** *****
- **Project:** AmazinglyStrange (`nthggvagtopobmdnquph`)

#### Stripe (Payment Processing)
- **Login:** magicwrxstudio@gmail.com
- **Password:** *****
- **Used For:** Manage subscriptions, view revenue, configure products

---

### Quick Reference Table

| Platform | Purpose | Email | Where to Manage |
|----------|---------|-------|-----------------|
| **ADMIN App** | Manage all 3 platforms | magicwrxstudio@gmail.com<br>brian@amazinglystrange.com | Supabase Dashboard → Authentication → Users |
| **Vercel** | Deploy & host apps | magicwrxstudio@gmail.com | https://vercel.com/login |
| **Supabase** | Database & auth setup | magicwrxstudio@gmail.com<br>brian@amazinglystrange.com | https://supabase.com/dashboard |
| **Stripe** | Payment processing | magicwrxstudio@gmail.com | https://dashboard.stripe.com/login |

---

### Common Tasks

**Reset ADMIN Password:**
1. Supabase Dashboard → Your Project → Authentication → Users
2. Find user → Click "..." → Reset Password
3. Copy new password and use at http://localhost:3006/login

**Enable MFA for ADMIN:**
1. Login to ADMIN at http://localhost:3006/login
2. Go to Dashboard → Click "Setup MFA"
3. Scan QR code with Google Authenticator
4. Next login will require 6-digit code

---


## Overview

This document provides a comprehensive overview of all active business workspaces, their purposes, technologies, current statuses, and next steps. It serves as a living reference for understanding the ecosystem of projects under the Amazing Business Platform.

## Workspace Summary

| Workspace | Title | Group | Purpose | Tech Stack | Status | Location |
|-----------|-------|-------|---------|------------|--------|----------|
| DOCs/ | Documentation Hub | Platform Ops | Central documentation, roadmaps and standards | Markdown | Active | `/Users/brianlindahl/Development/Business/DOCs/` |
| **ADMIN/** | **Master Admin Dashboard** | **Platform Ops** | **Multi-tenant admin for all platforms** | **Next.js 15, Supabase (3 instances)** | **In Progress** | `/Users/brianlindahl/Development/Business/ADMIN/` |
| **SHARED/** | **Component Library** | **Platform Core** | **Reusable packages (auth, blog, layout, media)** | **TypeScript, React** | **In Progress** | `/Users/brianlindahl/Development/Business/SHARED/` |
| mxn-chat/ | MXN Chat | Apps | Privacy-first chat platform with aliases and vibes | Next.js, Supabase | Live | `/Users/brianlindahl/Development/Business/Websites/mxn-chat/` |
| MagicWRX/ | Magic WRX (Multi-Tenant Platform) | Platform Core | Multi-tenant SaaS platform for unlimited clients | Next.js, Supabase (multi-tenant RLS), Stripe | Live | `/Users/brianlindahl/Development/Business/Websites/MagicWRX/` |
| base-template/ | Base Template (DRY) | Templates | Core dry template (recommended canonical starter) | Next.js 16, React 19, Tailwind | Live | `/Users/brianlindahl/Development/Business/Websites/base-template/` |
| auth-tool/ | Auth Tool | Platform Core | Google OAuth / Supabase auth (moving to /SHARED/) | Next.js, Supabase | Live | `/Users/brianlindahl/Development/Business/Websites/auth-tool/` |
| auth-tool-package/ | Auth Tool Package | Platform Core | Distribution package for Auth Tool (moving to /SHARED/) | Next.js, Supabase | Live | `/Users/brianlindahl/Development/Business/Websites/auth-tool-package/` |
| Template-WRX/ | Template WRX | Templates Marketplace | Collection of business templates and deploy scripts | Next.js, Firebase | Live | `/Users/brianlindahl/Development/Business/Websites/Template-WRX/` |
| hello-world-vercel-main/ | Hello Vercel Demo | Samples | Minimal Vercel demo used for tests and quickstarts | Next.js | Live | `/Users/brianlindahl/Development/Business/Websites/hello-world-vercel-main/` |
| amazinglystrange/ | Amazingly Strange | Gaming Platform | Gaming community platform with blog and admin features | PHP, Firebase | Live | `/Users/brianlindahl/Development/Hosting/amazinglystrange/` |
| Amazingly-Strange-Website/ | Amazingly Strange Website | Gaming Platform | Next.js version of gaming platform with Supabase | Next.js, Supabase | Live | `/Users/brianlindahl/Development/Amazingly-Strange-Website/amazingly-strange-website/` |

---

## Detailed Workspace Reports

### DOCs/
**Purpose:** Centralized documentation hub for business projects, providing templates and standards for project management, roadmaps, and AI-assisted development.

**Technologies:** Markdown-based documentation system with structured templates.

**Key Features:**
- Generic documentation index template with executive summaries and document inventories
- Business roadmap with visual flow diagrams showing MAGIC (Tools) and MONSTER (Gaming) platform branches
- Code quality principles (SOLID, DRY, KISS, YAGNI, etc.) enforced across all projects
- Directory structure templates and maintenance checklists
- AI prompt standards requiring roadmap compliance

**Current Status:** Active development with established standards. The roadmap targets ambitious growth metrics: $1k MRR by month 6, $30k by year 1, $150k by year 2, and $2M ARR by year 3. Focus on MVP delivery with clean architecture boundaries.

**Next Steps:** Continue implementing roadmap phases, maintain documentation compliance, and track progress against revenue targets.

### ADMIN/ ⭐ NEW
**Purpose:** Centralized multi-tenant admin dashboard to manage all business platforms from a single location.

**Technologies:** Next.js 15, TypeScript, Tailwind CSS, Supabase (3 separate instances), React Query.

**Key Features:**
- Multi-tenant authentication (brian@amazinglystrange.com, magicwrxstudio@gmail.com)
- Site switcher to manage AmazinglyStrange, MagicWRX, and MXN.CHAT
- Shared admin components (blog editor, media manager, user management)
- MagicWRX multi-tenant client management
- Revenue sharing dashboard (Google AdSense API integration)
- Unified analytics across all platforms

**Current Status:** In Progress (Dec 2025). Architecture designed, shared dependencies being initialized.

**Next Steps:** Create `/ADMIN/` directory, implement multi-Supabase client setup, build site switcher UI, migrate existing admin features.

### SHARED/ ⭐ NEW
**Purpose:** Reusable component library extracted from existing projects to reduce code duplication.

**Technologies:** TypeScript, React, published as local npm packages.

**Key Packages:**
- `@amazing/auth-tool`: `/SHARED/auth-tool/` - Google OAuth + Supabase authentication (from auth-tool/) - **✅ Extracted & Integrated**
- `@amazing/blog-engine`: `/SHARED/blog-engine/` - WYSIWYG blog editor (from AmazinglyStrange)
- `@amazing/layout-manager`: `/SHARED/layout-manager/` - Visual page builder (from AS) - **✅ Extracted & Integrated**
- `@amazing/media-library`: `/SHARED/media-library/` - Media upload/optimization (shared across all)

**Current Status:** In Progress (Dec 2025). Layout Manager and Auth Tool extracted and integrated.

**Next Steps:** Extract blog components from AmazinglyStrange, create media library package.

### mxn-chat/
**Purpose:** Real-time VIBE community chat application designed for PRIVATE sharing of 'Thought' based on MOOD/VIBE environments.

**Technologies:** Next.js 15, TypeScript, Tailwind CSS, Supabase (Auth, PostgreSQL, Real-time), React 18.

**Key Features:**
- Real-time messaging with Firebase Firestore listeners <- Switched to Supabase
- User authentication (Email/Password, Google OAuth)
- Friend invitation system
- Gaming-inspired dark UI with neon accents
- Message sanitization and security
- User profiles and presence status
- Single chatroom with AdMob integration at top
- Mobile-responsive design (Flutter compatibility mentioned)

**Current Status:** Successfully migrated to Supabase and deployed live at https://www.mxn.chat. All Firebase services decommissioned in favor of Supabase for better scalability.

**Next Steps:** Monitor performance, gather user feedback, and consider additional features like multiple chat rooms or enhanced moderation tools.

### MagicWRX/
**Purpose:** Multi-tenant Platform-as-a-Service (PaaS) that enables unlimited clients to deploy professional websites and blogs through a shared Supabase database with Row-Level Security (RLS).

**Technologies:** Next.js 16, React 19, TypeScript, Tailwind CSS, Supabase (multi-tenant RLS), Stripe, Google AdSense API.

**Key Features:**
- **Multi-Tenant Architecture**: Single Supabase DB serves unlimited clients via RLS policies
- **Client Sites**: Each client can create multiple websites from 5+ templates
- **Artist Blog Platform**: Revenue-sharing blog platform (70% artist, 30% platform)
- **Pixel Art Platform** (Planned): Art posting and judging community
- **Template Marketplace**: E-commerce, SaaS, Portfolio, Restaurant, Corporate templates
- **Stripe Integration**: Subscription billing for client plans
- **Google AdSense**: Automated revenue tracking and distribution

**Database Schema:**
- `clients` - MagicWRX customers (multi-tenant users)
- `client_sites` - Sites created by clients (isolated by client_id)
- `client_blogs` - Blog posts (Artist Platform, revenue sharing)
- `client_media` - Media files (isolated by client_id)
- `revenue_share` - AdSense revenue tracking

**Current Status:** Live at https://www.magicwrx.com with basic features. Multi-tenant schema designed but not yet implemented. Currently using Firebase (migrating to Supabase multi-tenant).

**Next Steps:** Implement multi-tenant Supabase schema, migrate from Firebase, build client onboarding flow, integrate Stripe subscriptions, launch Artist Blog beta.

### base-template/
**Purpose:** Individual business website template specifically designed for computer repair services, optimized for quick deployment on Vercel.

**Technologies:** Next.js 16, React 19, Tailwind CSS, Vercel deployment.

**Key Features:**
- Responsive mobile-first design
- Professional layout with hero section, services showcase, about, and contact
- Functional contact form with validation
- Service categories: Laptop/Desktop Repair, Virus Removal, Data Recovery, Performance Tuning, Setup & Installation
- SEO optimized with proper meta tags
- Easy customization guide for business owners

**Current Status:** Live at https://base-template-pi.vercel.app. Core dry template (recommended canonical starter) with Next.js 16, React 19, and Tailwind CSS.

**Next Steps:** Deploy customized versions for different repair businesses, potentially expand to other service industries.

### auth-tool/
**Purpose:** Production-ready Google OAuth authentication system using Supabase, designed for secure user management in web applications.

**Technologies:** Next.js 15.4.3, React 19.1.0, TypeScript, Supabase (Auth, Database), Tailwind CSS, Vercel deployment.

**Key Features:**
- Google OAuth 2.0 authentication via Supabase
- Protected routes with middleware
- Dark-themed admin dashboard
- Mobile-first responsive design
- Session management and user profiles
- Environment variable management for production

**Current Status:** Live at https://apps-gnl0vc31n-magicwrxs-projects.vercel.app. Fully operational with Supabase project setup and Google OAuth configuration.

**Next Steps:** Monitor authentication flows, gather user feedback, and consider additional features like social login options.

### auth-tool-package/
**Purpose:** Packaged distribution of the Google OAuth authentication tool, providing a ready-to-deploy authentication solution.

**Technologies:** Identical to auth-tool - Next.js 15.4.3, React 19.1.0, TypeScript, Supabase, Tailwind CSS.

**Key Features:**
- Complete authentication package with setup scripts
- Automated deployment workflow
- Comprehensive documentation and helper scripts
- Same features as auth-tool: Google OAuth, protected routes, admin dashboard

**Current Status:** Live at https://auth-tool-package-io51xm33-magicwrxs-projects.vercel.app. Fully operational distribution package for Auth Tool with scripts and docs.

**Next Steps:** Same as auth-tool - monitor performance and gather feedback for improvements.

### Template-WRX/
**Purpose:** Business website template platform similar to MagicWRX, focused on providing ready-to-use templates for various business types.

**Technologies:** Next.js 15.3.5, React 19, TypeScript, Tailwind CSS, Firebase v11 (Auth, Firestore, Hosting), Vercel deployment option.

**Key Features:**
- Same 5 business templates as MagicWRX: E-commerce, SaaS, Portfolio, Restaurant, Corporate
- Firebase authentication system
- Admin dashboard and user management
- Modern UI with gradients and card shadows
- Mobile-responsive design
- Demo mode without Firebase setup
- Template customization and deployment tools

**Current Status:** Live at https://template-wrx.vercel.app. Production-ready template platform with Firebase integration. Includes deployment scripts and customization guides.

**Next Steps:** Implement template marketplace features, add more business template categories, integrate payment processing.

### hello-world-vercel-main/
**Purpose:** Simple demonstration project showcasing Vercel deployment with static content and serverless API functions, including optional Supabase database integration.

**Technologies:** Next.js 14.2.5, React 18.3.1, Node.js serverless functions, optional Supabase integration.

**Key Features:**
- Static homepage with interactive API testing
- Serverless API endpoints (/api/hello, /api/supabase)
- Optional Supabase database queries
- Environment variable configuration for Supabase
- Basic Next.js project structure

**Current Status:** Live at https://hello-world-vercel-main-ayqwq2u73-magicwrxs-projects.vercel.app. Minimal Vercel demo used for tests and quickstarts with static HTML and API functions.

**Next Steps:** Use as a starting point for more complex Vercel projects, or as a reference for serverless API implementation.

### amazinglystrange/
**Purpose:** Gaming community platform with blog functionality, admin management, and Firebase backend.

**Technologies:** PHP, Firebase (Auth, Firestore, Storage), HTML/CSS/JavaScript.

**Key Features:**
- Blog post management system
- Admin dashboard for content management
- Firebase authentication and data storage
- Gaming-focused community features
- Media upload and management

**Current Status:** Live Firebase-hosted platform for gaming community.

**Next Steps:** Monitor community engagement and consider feature enhancements.

### Amazingly-Strange-Website/
**Purpose:** Next.js version of the gaming platform with Supabase backend, providing enhanced performance and scalability.

**Technologies:** Next.js 16, React 19, TypeScript, Supabase (Auth, PostgreSQL), Tailwind CSS.

**Key Features:**
- Modern Next.js application structure
- Supabase authentication and database
- Blog functionality with rich text editing
- Admin dashboard for content management
- Gaming community features
- Mobile-responsive design

**Current Status:** Live at https://amazingly-strange-website-beta.vercel.app. Successfully deployed with Supabase integration.

**Next Steps:** Complete full feature migration from PHP version, optimize performance, and enhance user experience.

## Maintenance Notes

- **Update Frequency:** Review and update this document quarterly or when new workspaces are added.
- **Contact:** For workspace-specific questions, refer to individual project README.md files.
- **Standards:** All workspaces follow the code quality principles outlined in BUSINESS_AI_PROMPT.md.

---

**Document Version**: 1.0.1  
**Last Updated**: December 16, 2025  
**Next Review**: March 16, 2026

---

## Grouping, Titles & Launch Playbook

### Grouping Principles
- **Platform Core**: Projects that provide foundational services (e.g., `MagicWRX`, `auth-tool`, `auth-tool-package`). Treat these as infra that other workspaces depend on.
- **Templates / Marketplace**: Reusable website templates and template collections (`base-template`, `Template-WRX`). These are canonical deployable artifacts.
- **Apps / Add-ons**: User-facing add-on apps that can be attached to user instances (e.g., `mxn-chat`). These are deployable micro-apps.
- **Samples / Tools**: Minimal demos and utilities used for onboarding and tests (`hello-world-vercel-main`).

### Titles (Canonical)
- MagicWRX — "Magic WRX (HEAD)" (Platform Core)
- Auth Tool — "Auth Tool" (Platform Core)
- Base Template — "Base Template (DRY)" (Templates)
- Template WRX — "Template WRX" (Templates Marketplace)
- MXN Chat — "MXN Chat" (Apps)
- DOCs — "Documentation Hub" (Platform Ops)
- Hello Vercel Demo — "Hello Vercel Demo" (Samples)

### Vercel + Supabase Launch Playbook (Repeatable)
This playbook gives a fast, repeatable path to let users launch templates/apps on Vercel with Supabase-backed auth and storage.

Prereqs (local & team):
- Vercel CLI installed (`npm i -g vercel`) or use Vercel web UI
- Supabase CLI (`npm i -g supabase`) or Supabase account
- `VERCEL_TOKEN` and `SUPABASE_SERVICE_ROLE_KEY` stored in CI or local env
- `auth-tool` configured as canonical auth provider using Supabase

1) Standardize template repo (use `base-template` as canonical starter):
	- Ensure `package.json` has `build` and `start` scripts and a simple `vercel.json` or `project settings` mapping.
	- Convert per-template config to `template.config.json` with placeholders for `SITE_NAME`, `OWNER_EMAIL`, `SUPABASE_URL`, `SUPABASE_KEY`.

2) Provide single-click deploy via Vercel:
	- Create a Vercel Project for each template with Environment Variables defined as runtime placeholders.
	- For a fast launch button add a README link:

```bash
vercel --prod --confirm --token $VERCEL_TOKEN
```

3) Provision Supabase for the user instance:
	- Use a shared Supabase project with multi-tenant schema or a per-user instance strategy (see consolidation recommendation below).
	- For shared project (recommended for MVP): create a `tenant_id` per user and scope data by `tenant_id` in row-level policies (RLS).
	- CLI quick commands (shared project):

```bash
supabase secrets set SUPABASE_URL=$SUPABASE_URL SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
supabase db remote set --project-ref $SUPABASE_PROJECT
```

4) Hook up Auth Tool as canonical onboarding flow:
	- Configure `auth-tool` to require verified email (Supabase Email confirmations enabled).
	- During user onboarding, create a `tenant` record and default site instance using `base-template`.

5) Automate per-user site creation (MVP flow):
	- After email verification, backend function (Cloud Function / Next.js API) clones/copies `base-template` settings into a new Vercel project or deploys environment variables for a templated, param-driven deploy.
	- Option A (fast): Deploy the same template code and use runtime env `TENANT_ID` to scope content (single-codebase, multi-tenant). Recommended for early-stage velocity.
	- Option B (per-tenant project): Use Vercel Programmatic API to create a new project per user. More isolation, higher cost.

6) Monetization & Ads
	- Require `email_verified` for any site to go live and show ads.
	- Integrate ad provider (AdSense/AdMob) at template level; enable ads by default for free tier.
	- Metering: store usage metrics in Supabase (bandwidth, active users, API calls) and expose usage in dashboard.

7) Verification & QA
	- Quick verification script to run after deploy:

```bash
# Verify site is responding
curl -I https://$SITE_DOMAIN
# Verify Supabase connectivity
node ./scripts/check-supabase-connection.js
```

### Quick Commands (copyable)
```bash
# Login CLIs
vercel login
supabase login

# Deploy template in current directory to Vercel
vercel --prod --confirm

# Set required env (example)
vercel env add NEXT_PUBLIC_SUPABASE_URL $VERCEL_PROJECT
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY $VERCEL_PROJECT
```

## Consolidation Recommendation
- For speed-to-market and maintainability, consolidate to a smaller set of canonical codebases:
  - Keep `MagicWRX` as the HEAD platform (single codebase that can host multiple templates via runtime configuration).
  - Make `base-template` the canonical DRY starter template and refactor other templates to be configuration/data on top of this codebase.
  - Treat `mxn-chat`, `auth-tool`, and other apps as micro-frontends or feature modules that can be plugged into the `MagicWRX` platform or deployed independently as needed.

- Consolidation Benefits:
  - Faster updates (single code path), fewer security surfaces, easier CI/CD.
  - Multi-tenant single-codebase approach reduces Vercel project sprawl and speeds onboarding.

- When to split:
  - If an app requires specialized infrastructure (heavy realtime workloads, specialized billing), deploy as separate microservice.

## Recommended Next Steps (short)
1. Adopt `base-template` as canonical starter and add `template.config.json` placeholders.
2. Make `auth-tool` the standard onboarding flow and enable email verification by default.
3. Implement multi-tenant scoping in Supabase with `tenant_id` (row-level policies).
4. Add a small automation service (Next.js API route or Cloud Function) that provisions a tenant record and triggers a template deployment (Option A for MVP).
5. Document the exact deploy steps in a `LAUNCH_PLAYBOOK.md` in each template repo.
