# BUSINESS VERCEL DEPLOYMENT GUIDE

**Document Date:** December 18, 2025  
**Version:** 2.0.0  
**Status:** Single Source of Truth - Multi-Tenant Architecture  
**Last Updated:** December 18, 2025

---

## 🎯 PURPOSE

This document serves as the **single source of truth** for deploying and managing all Amazing Business Platform websites on Vercel and Firebase. It covers:
- **MagicWRX Business**: Multi-tenant Platform-as-a-Service for unlimited clients
- **AmazinglyStrange Business**: Gaming community platform with blog features
- **MXN.CHAT Business**: Privacy-first chat platform
- Deployment strategies across 2 Supabase projects and multiple hosting platforms

---

## 🏗️ PLATFORM ARCHITECTURE OVERVIEW

### **Multi-Tenant Strategy**

```
┌─────────────────────────────────────────────────────────────────┐
│                    AMAZING BUSINESS PLATFORM                    │
│           Platform-as-a-Service Ecosystem (Dec 2025)            │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
         ┌──────────▼──────────┐   ┌─────────▼──────────┐
         │   MAGICWRX          │   │ AMAZINGLYSTRANGE   │
         │   Supabase          │   │   Supabase         │
         │   (Multi-Tenant)    │   │   (Dedicated DB)   │
         │                     │   │                    │
         │ - Client Sites      │   │ - Gaming Blog      │
         │ - Artist Blogs      │   │ - Media Library    │
         │ - Pixel Art         │   │ - Layout Manager   │
         │ - Revenue Sharing   │   │ - Admin Dashboard  │
         └──────────┬──────────┘   └─────────┬──────────┘
                    │                        │
         ┌──────────┴──────────┐  ┌─────────┴──────────┐
         │                     │  │                     │
    ┌────▼────────┬────────────▼──▼──┐   ┌─────────────▼──────────┐
    │ MagicWRX.com│  MXN.CHAT        │   │  AmazinglyStrange.com  │
    │ (Vercel)    │  (Vercel)        │   │  (Firebase → Vercel)   │
    └─────────────┴──────────────────┘   └────────────────────────┘
```

### **Supabase Project Allocation**

| Supabase Project | Account | Platforms | Architecture |
|------------------|---------|-----------|--------------|
| **MagicWRX Supabase** | magicwrxstudio@gmail.com | MagicWRX, Artist Blogs, Pixel Art | Multi-tenant with RLS |
| **MXN.CHAT Supabase** | magicwrxstudio@gmail.com | MXN.CHAT | Privacy-isolated |
| **AmazinglyStrange Supabase** | brian@amazinglystrange.com | AmazinglyStrange.com | Dedicated |

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       VERCEL DEPLOYMENT ECOSYSTEM                           │
│                                                                             │
│  ┌──────────────────────────────┐    ┌──────────────────────────────┐     │
│  │  MAGICWRX GITHUB ORG         │    │  AMAZINGLYSTRANGE GITHUB     │     │
│  │  (Web Tools Business)        │    │  (Gaming Business)           │     │
│  └──────────────────────────────┘    └──────────────────────────────┘     │
│                │                                    │                       │
│                │                                    │                       │
│  ┌─────────────▼──────────────┐      ┌────────────▼──────────────────┐   │
│  │   VERCEL (magicwrxs)       │      │   FIREBASE (Current Hosting)  │   │
│  │                            │      │   Vercel (Future Migration)   │   │
│  └────────────────────────────┘      └───────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          MAGICWRX ORGANIZATION                              │
│                       GitHub: github.com/MagicWRX                           │
│                       Vercel Team: magicwrxs-projects                       │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
    │   MXN.CHAT       │         │   MAGICWRX       │         │   MAGICWRX       │
    │   (Chat App)     │         │   HOSTING        │         │   BLOG           │
    │                  │         │   (Main Site)    │         │   (Coming Soon)  │
    ├──────────────────┤         ├──────────────────┤         ├──────────────────┤
    │ Repo: mxn-chat   │         │ Repo: MagicWRX   │         │ Repo: blog       │
    │ Status: ✅ Live  │         │ Status: ✅ Live  │         │ Status: ⚫ TBD   │
    │ Vercel: Active   │         │ Vercel: Active   │         │ Vercel: Planned  │
    │ URL: mxn-chat    │         │ URL: magic-xxx   │         │ URL: TBD         │
    │  .vercel.app     │         │  .vercel.app     │         │                  │
    │ Domain: TBD      │         │ Domain: TBD      │         │ Domain: TBD      │
    └──────────────────┘         └──────────────────┘         └──────────────────┘

    ┌──────────────────┐         ┌──────────────────┐
    │   MAGICWRX AUTH  │         │   FUTURE         │
    │   (Coming Soon)  │         │   PROJECTS       │
    │                  │         │                  │
    ├──────────────────┤         ├──────────────────┤
    │ Repo: TBD        │         │ Repo: TBD        │
    │ Status: ⚫ TBD   │         │ Status: ⚫ TBD   │
    │ Vercel: Planned  │         │ Vercel: Planned  │
    │ URL: TBD         │         │ URL: TBD         │
    │ Domain: TBD      │         │ Domain: TBD      │
    └──────────────────┘         └──────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                      AMAZINGLYSTRANGE ORGANIZATION                          │
│                    GitHub: github.com/AmazinglyStrange                      │
│                    Current: Firebase Hosting (may migrate to Vercel)        │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
    │ AMAZINGLYSTRANGE │         │ MONSTERSREIGN    │         │ PIXELEXTREME     │
    │      .COM        │         │      .COM        │         │      .COM        │
    │  (Main Hub)      │         │  (Gaming Site)   │         │  (Gaming Site)   │
    ├──────────────────┤         ├──────────────────┤         ├──────────────────┤
    │ Repo: main-site  │         │ Repo: monsters   │         │ Repo: pixel      │
    │ Status: ✅ Live  │         │ Status: ✅ Live  │         │ Status: ✅ Live  │
    │ Host: Firebase   │         │ Host: Firebase   │         │ Host: Firebase   │
    │ URL: Firebase    │         │ URL: Firebase    │         │ URL: Firebase    │
    │  Hosting URL     │         │  Hosting URL     │         │  Hosting URL     │
    │ Domain: Active   │         │ Domain: Active   │         │ Domain: Active   │
    │ Migrate: TBD     │         │ Migrate: TBD     │         │ Migrate: TBD     │
    └──────────────────┘         └──────────────────┘         └──────────────────┘

    ┌──────────────────┐
    │   FUTURE GAMING  │
    │   PROJECTS       │
    │                  │
    ├──────────────────┤
    │ Repo: TBD        │
    │ Status: ⚫ TBD   │
    │ Host: TBD        │
    │ URL: TBD         │
    │ Domain: TBD      │
    └──────────────────┘
```

---

## 🗂️ PROJECT STRUCTURE

### **MagicWRX Organization - Web Development Tools Business**

#### **MagicWRX Hosting (Primary Platform)**

```
/Users/brianlindahl/Development/Business/Websites/MagicWRX/
├── src/                                # Application source
│   ├── app/                           # Next.js 15 App Router
│   ├── components/                    # React components
│   ├── hooks/                         # Custom hooks
│   ├── lib/                           # Utilities
│   └── types/                         # TypeScript types
│
├── public/                            # Static assets
│   ├── templates/                     # Template previews
│   └── hero-images/                   # Hero section images
│
├── 📋 VERCEL CONFIGURATION
├── vercel.json                        # Vercel project settings
├── .vercelignore                      # Files to exclude from deployment
│
├── 🔧 DEPLOYMENT SCRIPTS
├── deploy-vercel.sh                   # Automated Vercel deployment
├── setup-vercel.sh                    # Initial Vercel setup
├── setup-vercel-cli.sh                # Install Vercel CLI
├── setup-vercel-env.sh                # Configure environment variables
│
├── 📚 DOCUMENTATION
├── README.md                          # Project overview
├── VERCEL_SETUP.md                    # Setup instructions
├── VERCEL_COMMANDS.md                 # CLI command reference
├── FREEMIUM_PLATFORM_TRANSFORMATION.md
├── STRIPE_INTEGRATION_PLAN.md
│
└── 🌐 BUILD OUTPUT
    └── .vercel/                       # Vercel deployment metadata
```

#### **MXN.Chat (Gaming Chat Platform)**

```
/Users/brianlindahl/Development/Business/Websites/mxn-chat/
├── src/                               # Next.js application
├── functions/                         # Firebase Functions
├── dataconnect/                       # Firebase Data Connect
├── public/                            # Static assets
├── vercel.json                        # Vercel configuration
└── firebase.json                      # Firebase config (for Functions)
```

#### **MagicWRX Blog (Planned)**

```
/Users/brianlindahl/Development/Business/Websites/magicwrx-blog/
├── src/                               # Next.js blog app
│   ├── app/                           # App Router
│   │   ├── blog/                      # Blog posts
│   │   ├── tutorials/                 # Technical tutorials
│   │   └── guides/                    # How-to guides
│   └── content/                       # MDX content files
├── public/                            # Static assets
└── vercel.json                        # Vercel configuration
```

---

### **AmazinglyStrange Organization - Gaming & Entertainment Business**

#### **AmazinglyStrange.com (Main Gaming Hub)**

```
/path/to/amazinglystrange/
├── public/                            # Static website files
│   ├── index.html                     # Homepage
│   ├── games/                         # Game showcase pages
│   ├── about/                         # About pages
│   └── assets/                        # Images, CSS, JS
│
├── 🔥 FIREBASE CONFIGURATION
├── firebase.json                      # Firebase hosting config
├── .firebaserc                        # Firebase project settings
│
└── 📚 DOCUMENTATION
    └── README.md                      # Project overview
```

#### **MonstersReign.com (Gaming Content Site)**

```
/path/to/monstersreign/
├── public/                            # Static website files
│   ├── index.html                     # Homepage
│   ├── content/                       # Gaming content
│   └── assets/                        # Media files
│
├── firebase.json                      # Firebase hosting config
└── README.md                          # Project overview
```

#### **PixelExtreme.com (Gaming News & Reviews)**

```
/path/to/pixelextreme/
├── public/                            # Static website files
│   ├── index.html                     # Homepage
│   ├── reviews/                       # Game reviews
│   ├── news/                          # Gaming news
│   └── assets/                        # Media files
│
├── firebase.json                      # Firebase hosting config
└── README.md                          # Project overview
```

---

## 🚀 VERCEL & FIREBASE ACCOUNT STRUCTURE

### **MagicWRX GitHub Organization**
- **GitHub URL**: https://github.com/MagicWRX
- **Business Focus**: Web Development Tools & Hosting Platform
- **Primary Hosting**: Vercel
- **Vercel Team**: magicwrxs-projects
- **Account Type**: Hobby (Free) → Pro (when needed)

### **AmazinglyStrange GitHub Organization**
- **GitHub URL**: https://github.com/AmazinglyStrange
- **Business Focus**: Gaming & Entertainment
- **Current Hosting**: Firebase Hosting
- **Future Migration**: May migrate to Vercel (TBD)
- **Firebase Project**: amazinglystrange-gaming

---

## 📋 CURRENT PROJECTS BY ORGANIZATION

### **MagicWRX Organization (Vercel Hosting)**

| Project | Repository | Framework | Status | Vercel URL | Custom Domain | Purpose |
|---------|-----------|-----------|--------|------------|---------------|---------|
| **MagicWRX Hosting** | MagicWRX/MagicWRX | Next.js 15 | ✅ Live | `magic-g7ua1cnfl-magicwrxs-projects.vercel.app` | TBD (magicwrx.com) | Primary freemium platform, template builder |
| **MXN.Chat** | MagicWRX/mxn-chat | Next.js | ✅ Live | `mxn-chat.vercel.app` | TBD | Gaming chat & community platform |
| **MagicWRX Blog** | MagicWRX/blog | Next.js | ⚫ Planned | TBD | TBD | Technical blog & tutorials |
| **MagicWRX Auth** | MagicWRX/auth | Next.js | ⚫ Planned | TBD | TBD | Centralized authentication service |
| **Future Tools** | TBD | TBD | ⚫ Planned | TBD | TBD | Additional web development tools |

### **AmazinglyStrange Organization (Firebase Hosting - May Migrate)**

| Project | Repository | Framework | Status | Firebase URL | Custom Domain | Purpose |
|---------|-----------|-----------|--------|--------------|---------------|---------|
| **AmazinglyStrange.com** | AmazinglyStrange/main-site | Static/HTML | ✅ Live | Firebase URL | amazinglystrange.com | Main gaming hub & brand site |
| **MonstersReign.com** | AmazinglyStrange/monsters | Static/HTML | ✅ Live | Firebase URL | monstersreign.com | Gaming content & community |
| **PixelExtreme.com** | AmazinglyStrange/pixel | Static/HTML | ✅ Live | Firebase URL | pixelextreme.com | Gaming news & reviews |
| **Future Games** | TBD | Unity/Next.js | ⚫ Planned | TBD | TBD | New gaming projects |

---

## 🔄 DEPLOYMENT STRATEGY BY BUSINESS

### **MagicWRX Business → Vercel (Primary)**

**Why Vercel:**
- ✅ Next.js optimization (automatic)
- ✅ Edge functions for global performance
- ✅ Preview deployments for every PR
- ✅ Built-in analytics and monitoring
- ✅ Serverless API routes
- ✅ Free SSL certificates
- ✅ Git integration (auto-deploy on push)

**Workflow:**
1. Developer pushes to GitHub (MagicWRX org)
2. Vercel detects commit via webhook
3. Automatic build and deployment
4. Preview URL generated for testing
5. Merge to master → production deployment

### **AmazinglyStrange Business → Firebase (Current) / Vercel (Future)**

**Current: Firebase Hosting**
- ✅ Already deployed and working
- ✅ Custom domains active
- ✅ SSL certificates configured
- ✅ CDN distribution global
- ✅ Low cost for static sites

**Migration Consideration to Vercel:**
- 🤔 When dynamic features needed (Next.js, API routes)
- 🤔 When unifying deployment across both businesses
- 🤔 When scaling requires edge computing
- 🤔 When preview deployments become essential

**Decision Timeline:** To be determined based on:
1. Feature requirements (static vs dynamic)
2. Traffic growth and performance needs
3. Cost comparison at scale
4. Team workflow preferences

---

## 📋 VERCEL.JSON CONFIGURATION

### **Standard Configuration for All Projects**

```json
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  
  "regions": ["iad1"],
  
  "env": {
    "NEXT_PUBLIC_APP_NAME": "Magic WRX",
    "NODE_ENV": "production"
  },
  
  "build": {
    "env": {
      "NEXT_PUBLIC_FIREBASE_API_KEY": "@firebase-api-key",
      "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
      "STRIPE_SECRET_KEY": "@stripe-secret-key"
    }
  },
  
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ],
  
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

### **Configuration Explanations**

| Property | Purpose | Example |
|----------|---------|---------|
| `framework` | Tells Vercel which framework to use | `"nextjs"` |
| `regions` | Deployment regions (iad1 = US East) | `["iad1"]` or `["all"]` |
| `env` | Public environment variables | Build-time configs |
| `build.env` | Secure environment variables | API keys, secrets |
| `headers` | Security headers for all routes | CSP, CORS, etc. |
| `redirects` | URL redirects (301/302) | `/old` → `/new` |
| `rewrites` | Proxy requests without changing URL | API proxying |

---

## 🔐 ENVIRONMENT VARIABLES

### **Variable Categories**

#### **1. Public Variables (NEXT_PUBLIC_*)**
These are exposed to the browser and safe to share:

```bash
# Application Settings
NEXT_PUBLIC_APP_NAME="Magic WRX"
NEXT_PUBLIC_BASE_URL="https://magicwrx.com"

# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyBHy6eur9Ux9-tfhybSHROXL6hbz8Vvjd4"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="magic-wrx.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="magic-wrx"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="magic-wrx.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="24629615626"
NEXT_PUBLIC_FIREBASE_APP_ID="1:24629615626:web:f9d4d0fac5f709b996d3f3"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-RJEJT2JT5T"

# Supabase Public Configuration
NEXT_PUBLIC_SUPABASE_URL="https://ujfcflnrtrkdgfclwelz.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Stripe Public Key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51Rl5zyPuaQ83EEEJ..."

# Feature Flags
NEXT_PUBLIC_USE_FIREBASE_EMULATOR="false"
```

#### **2. Secret Variables (Server-Only)**
These are NEVER exposed to the browser:

```bash
# Firebase Server Configuration
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@magic-wrx.iam.gserviceaccount.com"

# Email Service
RESEND_API_KEY="re_CgegqT2Q_K3yY7kJobarR5qDiMgfX24qg"

# Database Credentials (if needed)
DATABASE_URL="postgresql://..."
```

### **Adding Environment Variables to Vercel**

#### **Method 1: Vercel CLI** (Recommended)
```bash
# Navigate to project directory
cd /Users/brianlindahl/Development/Business/Websites/MagicWRX

# Add single variable
vercel env add NEXT_PUBLIC_APP_NAME

# You'll be prompted:
# ? What's the value of NEXT_PUBLIC_APP_NAME? Magic WRX
# ? Add NEXT_PUBLIC_APP_NAME to which Environments? (all, production, preview, development)
# Select: a (all)

# Add secret variable
vercel env add STRIPE_SECRET_KEY
# Paste the secret key when prompted
```

#### **Method 2: Vercel Dashboard** (Web UI)
1. Go to https://vercel.com/magicwrxs-projects/magic-wrx/settings/environment-variables
2. Click "Add New"
3. Enter variable name (e.g., `STRIPE_SECRET_KEY`)
4. Enter value
5. Select environments: Production, Preview, Development
6. Click "Save"

#### **Method 3: Bulk Import from .env.local**
```bash
# Pull existing variables
vercel env pull .env.local

# Push local variables to Vercel
vercel env add < .env.local
# Note: This requires manual confirmation for each variable
```

### **Environment Variable Priority**

```
1. Vercel Dashboard/CLI (highest priority)
2. vercel.json (build.env)
3. .env.local (local development only)
4. .env (fallback, committed to repo)
```

⚠️ **NEVER commit `.env.local` or any file containing secrets to Git!**

---

## 🛠️ DEPLOYMENT WORKFLOWS

### **Workflow 1: Automatic Deployment (Recommended)**

```
┌─────────────────────────────────────────┐
│  Developer pushes to GitHub (master)    │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  Vercel detects commit via webhook      │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  Vercel triggers build automatically    │
│  - npm install                          │
│  - npm run build                        │
│  - Run tests (if configured)            │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  Build succeeds                         │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  Deploy to Production                   │
│  URL: magic-xxx.vercel.app              │
└─────────────────────────────────────────┘
```

**Setup Steps:**
1. Connect GitHub repository to Vercel
2. Configure build settings
3. Set environment variables
4. Enable automatic deployments
5. Push to `master` branch → automatic deployment

### **Workflow 2: Manual Deployment via CLI**

```bash
# Navigate to project
cd /Users/brianlindahl/Development/Business/Websites/MagicWRX

# Deploy to production
vercel --prod

# Deploy to preview (for testing)
vercel

# Deploy with build logs
vercel --prod --debug
```

### **Workflow 3: Scripted Deployment**

```bash
# Use the deployment script
./deploy-vercel.sh

# What the script does:
# 1. Checks if Vercel CLI is installed
# 2. Runs npm install
# 3. Runs npm run build (local verification)
# 4. Deploys to Vercel production
# 5. Outputs deployment URL
```

### **Workflow 4: Preview Deployments (Pull Requests)**

Every pull request automatically gets a preview deployment:
```
PR #42 → https://magic-wrx-git-feature-branch-magicwrxs-projects.vercel.app
```

**Benefits:**
- Test changes before merging
- Share with stakeholders
- Run E2E tests against preview
- No impact on production

---

## 📦 BUILD CONFIGURATION

### **Build Settings in Vercel Dashboard**

| Setting | Value | Notes |
|---------|-------|-------|
| **Framework Preset** | Next.js | Auto-detected |
| **Build Command** | `npm run build` | Runs Next.js build |
| **Output Directory** | `.next` | Next.js output folder |
| **Install Command** | `npm install` | Installs dependencies |
| **Development Command** | `npm run dev` | Local dev server |
| **Node.js Version** | 20.x | LTS version |

### **Custom Build Commands (if needed)**

```json
{
  "scripts": {
    "build": "next build",
    "build:analyze": "ANALYZE=true next build",
    "build:vercel": "next build && npm run generate-sitemap",
    "generate-sitemap": "node scripts/generate-sitemap.js"
  }
}
```

### **Build Optimization**

```javascript
// next.config.js
module.exports = {
  // Production optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization
  images: {
    domains: ['firebasestorage.googleapis.com', 'supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
  },
}
```

---

## 🔄 DEPLOYMENT CHECKLIST

### **Pre-Deployment Checklist**

- [ ] **Code Quality**
  - [ ] All tests passing (`npm test`)
  - [ ] No TypeScript errors (`npm run type-check`)
  - [ ] ESLint passing (`npm run lint`)
  - [ ] Build succeeds locally (`npm run build`)

- [ ] **Environment Variables**
  - [ ] All required variables set in Vercel
  - [ ] Production URLs updated (not localhost)
  - [ ] API keys are production keys (not test)
  - [ ] Secrets stored securely (not in code)

- [ ] **Configuration**
  - [ ] `vercel.json` reviewed and updated
  - [ ] `next.config.js` optimized for production
  - [ ] Security headers configured
  - [ ] Redirects and rewrites tested

- [ ] **Content**
  - [ ] Images optimized (< 1MB each)
  - [ ] Assets compressed (gzip/brotli)
  - [ ] Fonts subset and optimized
  - [ ] No dead links or broken images

- [ ] **Performance**
  - [ ] Lighthouse score > 90
  - [ ] Core Web Vitals passing
  - [ ] Bundle size analyzed
  - [ ] Lazy loading implemented

### **Post-Deployment Checklist**

- [ ] **Verification**
  - [ ] Production URL accessible
  - [ ] All pages loading correctly
  - [ ] Authentication working
  - [ ] API endpoints responding
  - [ ] Forms submitting successfully

- [ ] **Testing**
  - [ ] User flows tested (signup, login, purchase)
  - [ ] Mobile responsiveness verified
  - [ ] Cross-browser testing (Chrome, Safari, Firefox)
  - [ ] Payment processing working (test mode)

- [ ] **Monitoring**
  - [ ] Vercel Analytics enabled
  - [ ] Error tracking active (Sentry, if configured)
  - [ ] Uptime monitoring configured
  - [ ] Performance metrics baseline established

- [ ] **Communication**
  - [ ] Team notified of deployment
  - [ ] Changelog updated
  - [ ] Documentation updated
  - [ ] Stakeholders informed (if major release)

---

## 🚨 TROUBLESHOOTING GUIDE

### **Common Issues & Solutions**

#### **Issue 1: Build Fails with "Module not found"**

**Symptom:**
```
Error: Cannot find module 'xyz'
```

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build

# If still failing, check import paths
# Ensure case-sensitivity matches (macOS is case-insensitive, Linux is not)
```

**Vercel-specific:**
```bash
# Trigger fresh build by adding to vercel.json:
{
  "installCommand": "rm -rf node_modules && npm install"
}
```

#### **Issue 2: Environment Variables Not Working**

**Symptom:**
- `process.env.VARIABLE_NAME` is undefined
- API calls failing with authentication errors

**Solution:**
1. Check variable name has `NEXT_PUBLIC_` prefix if used in browser
2. Verify variable is set in Vercel Dashboard
3. Redeploy after adding variables (changes don't apply retroactively)
4. Check environment scope (Production vs Preview vs Development)

```bash
# List all environment variables
vercel env ls

# Pull variables to local .env
vercel env pull
```

#### **Issue 3: Production URL Returns 404**

**Symptom:**
- Specific routes return 404 in production
- Works fine locally

**Solution:**
1. Check `vercel.json` for incorrect redirects/rewrites
2. Ensure dynamic routes have `generateStaticParams` or are properly configured
3. Verify build output includes all pages

```bash
# Check build output locally
npm run build
ls -la .next/server/app

# If missing pages, check Next.js App Router setup
```

#### **Issue 4: Build Exceeds Time Limit**

**Symptom:**
```
Error: Build exceeded maximum duration of 45s
```

**Solution:**
1. Optimize build process (remove unnecessary dependencies)
2. Use Vercel Pro plan (longer build times)
3. Implement incremental static regeneration
4. Split large builds into smaller deployments

```javascript
// next.config.js - Enable ISR
module.exports = {
  experimental: {
    isrMemoryCacheSize: 0, // Disable ISR cache during build
  },
}
```

#### **Issue 5: Large Bundle Size Warning**

**Symptom:**
```
Warning: Page size exceeds 100KB
```

**Solution:**
```bash
# Analyze bundle
npm run build
npx @next/bundle-analyzer

# Common fixes:
# 1. Use dynamic imports
# 2. Remove unused dependencies
# 3. Optimize images
# 4. Enable tree shaking
```

```javascript
// Example: Dynamic import
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
```

#### **Issue 6: CORS Errors on API Routes**

**Symptom:**
```
Access to fetch at 'https://api.example.com' from origin 'https://magicwrx.vercel.app' 
has been blocked by CORS policy
```

**Solution:**
Add CORS headers in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,POST,PUT,DELETE,OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
      ]
    }
  ]
}
```

Or add in API route:

```typescript
// src/app/api/example/route.ts
export async function GET(request: Request) {
  return new Response(JSON.stringify({ data: 'example' }), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
}
```

---

## 📊 MONITORING & ANALYTICS

### **Vercel Analytics (Built-in)**

**Enable Analytics:**
1. Go to Vercel Dashboard → Project → Analytics
2. Click "Enable Analytics"
3. Add to your app (automatic for Next.js)

**Metrics Tracked:**
- Page views
- Unique visitors
- Top pages
- Referrers
- Devices (desktop/mobile)
- Countries

**Web Vitals:**
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)

### **Custom Analytics Integration**

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### **Error Tracking**

**Option 1: Vercel Runtime Logs**
```bash
# View logs in real-time
vercel logs --follow

# View logs for specific deployment
vercel logs [deployment-url]

# Filter by severity
vercel logs --level error
```

**Option 2: Sentry Integration** (Recommended)
```bash
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.VERCEL_ENV || 'development',
  tracesSampleRate: 1.0,
});
```

### **Uptime Monitoring**

**Recommended Tools:**
- **UptimeRobot** (Free): https://uptimerobot.com
- **Pingdom** (Paid): https://pingdom.com
- **Better Uptime** (Freemium): https://betteruptime.com

**Setup:**
1. Create monitor for production URL
2. Set check interval (1-5 minutes)
3. Configure alerts (email, Slack, SMS)
4. Monitor multiple endpoints (/api/health, /, /pricing)

---

## 🔒 SECURITY BEST PRACTICES

### **1. Environment Variable Security**

```bash
# ✅ GOOD: Use environment variables
const apiKey = process.env.STRIPE_SECRET_KEY;

# ❌ BAD: Hardcode secrets
const apiKey = "sk_live_abc123...";
```

### **2. Security Headers**

Already configured in `vercel.json`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

**Add Content Security Policy (CSP):**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.vercel-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://firebasestorage.googleapis.com https://*.supabase.co"
        }
      ]
    }
  ]
}
```

### **3. Rate Limiting**

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = new Map();

export function middleware(request: NextRequest) {
  const ip = request.ip || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 100;

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
  } else {
    const record = rateLimit.get(ip);
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count++;
      if (record.count > maxRequests) {
        return new NextResponse('Too Many Requests', { status: 429 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

### **4. Input Validation**

```typescript
// src/lib/validation.ts
import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

// API route usage
export async function POST(request: Request) {
  const body = await request.json();
  const validated = ContactFormSchema.safeParse(body);
  
  if (!validated.success) {
    return new Response('Invalid input', { status: 400 });
  }
  
  // Process validated data
}
```

### **5. Authentication Protection**

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
```

---

## 📈 PERFORMANCE OPTIMIZATION

### **1. Image Optimization**

```typescript
// Use Next.js Image component
import Image from 'next/image';

export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={600}
      priority // Load above the fold images first
      placeholder="blur" // Show blur while loading
      blurDataURL="data:image/..." // Low-quality placeholder
    />
  );
}
```

### **2. Font Optimization**

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

### **3. Code Splitting**

```typescript
// Dynamic imports for large components
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./Chart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Disable server-side rendering if not needed
});
```

### **4. Edge Functions** (Coming Soon)

```typescript
// app/api/edge-example/route.ts
export const runtime = 'edge';

export async function GET() {
  return new Response('Hello from the edge!');
}
```

### **5. Caching Strategy**

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

---

## 🔥 FIREBASE HOSTING (AmazinglyStrange Business)

### **Firebase Hosting Overview**

Firebase Hosting is currently used for the **AmazinglyStrange Organization** gaming websites:
- AmazinglyStrange.com
- MonstersReign.com
- PixelExtreme.com

### **Firebase Project Structure**

```
Firebase Project: amazinglystrange-gaming
│
├── Hosting Sites:
│   ├── amazinglystrange-com (primary site)
│   ├── monstersreign-com
│   └── pixelextreme-com
│
├── Custom Domains:
│   ├── amazinglystrange.com → amazinglystrange-com
│   ├── monstersreign.com → monstersreign-com
│   └── pixelextreme.com → pixelextreme-com
│
└── SSL Certificates: Auto-provisioned by Firebase
```

### **Firebase Hosting Configuration**

#### **Standard firebase.json for Static Sites**

```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(css|js)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=86400"
          }
        ]
      }
    ]
  }
}
```

#### **Multi-Site Configuration**

```json
{
  "hosting": [
    {
      "target": "amazinglystrange",
      "public": "public",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
    },
    {
      "target": "monstersreign",
      "public": "public",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
    },
    {
      "target": "pixelextreme",
      "public": "public",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
    }
  ]
}
```

### **Firebase Deployment Commands**

```bash
# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init hosting

# Select existing project or create new one
# Choose "amazinglystrange-gaming"

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy specific site (multi-site setup)
firebase deploy --only hosting:amazinglystrange
firebase deploy --only hosting:monstersreign
firebase deploy --only hosting:pixelextreme

# View deployment history
firebase hosting:channel:list

# Rollback to previous version
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL DESTINATION_SITE_ID:live
```

### **Firebase vs Vercel Comparison**

| Feature | Firebase Hosting | Vercel |
|---------|-----------------|--------|
| **Best For** | Static sites, SPAs | Next.js, full-stack apps |
| **Pricing (Free Tier)** | 10GB storage, 360MB/day transfer | 100GB bandwidth/month |
| **SSL** | ✅ Free, auto-renewal | ✅ Free, auto-renewal |
| **Custom Domains** | ✅ Unlimited | ✅ Unlimited (Hobby: 1 per project) |
| **CDN** | ✅ Global (via Google Cloud) | ✅ Global edge network |
| **Build Process** | ❌ Manual (build locally) | ✅ Automatic CI/CD |
| **Preview Deploys** | ✅ Channels (manual) | ✅ Automatic on PR |
| **Serverless Functions** | ✅ Via Cloud Functions | ✅ Native API routes |
| **Database** | ✅ Firestore, Realtime DB | ❌ Needs external service |
| **Analytics** | ✅ Built-in | ✅ Built-in (paid) |
| **GitHub Integration** | ❌ Manual deployment | ✅ Auto-deploy on push |

### **When to Stay on Firebase (AmazinglyStrange Sites)**

✅ **Keep Firebase if:**
- Sites are primarily static HTML/CSS/JS
- No need for server-side rendering (SSR)
- Already integrated with Firebase services (Auth, Firestore, etc.)
- Low deployment frequency (no need for auto-deploy)
- Cost optimization important (free tier generous)

### **When to Migrate to Vercel**

🚀 **Migrate to Vercel if:**
- Need Next.js framework features (SSR, ISR, API routes)
- Want automatic deployments on Git push
- Require preview deployments for every PR
- Need edge functions for performance
- Team prefers unified deployment across both businesses
- Plan to add dynamic features (user accounts, databases, etc.)

### **Migration Path: Firebase → Vercel**

If deciding to migrate AmazinglyStrange sites to Vercel:

```bash
# 1. Create Vercel project
vercel login
cd /path/to/amazinglystrange
vercel init

# 2. Link to GitHub repo
# Connect repo in Vercel Dashboard

# 3. Configure build settings
# Framework Preset: Other (for static sites) or Next.js (if upgrading)
# Build Command: npm run build (or leave empty for static)
# Output Directory: public (or dist)

# 4. Add custom domain
# Vercel Dashboard → Domains → Add amazinglystrange.com

# 5. Update DNS
# Point domain to Vercel nameservers or A/CNAME records

# 6. Deploy
vercel --prod

# 7. Test thoroughly
# Verify all pages, images, links work correctly

# 8. Switch DNS to Vercel
# Update nameservers or DNS records

# 9. Monitor
# Watch for any issues in first 24-48 hours

# 10. Deprecate Firebase Hosting
firebase hosting:disable
```

### **Firebase Hosting Deployment Checklist**

**Pre-Deployment:**
- [ ] Build locally (`npm run build` or manual)
- [ ] Test build output in `public/` directory
- [ ] Verify images and assets are included
- [ ] Check firebase.json configuration
- [ ] Ensure custom domain settings correct

**Deployment:**
- [ ] `firebase login`
- [ ] `firebase use amazinglystrange-gaming`
- [ ] `firebase deploy --only hosting:TARGET`
- [ ] Verify deployment URL in terminal output

**Post-Deployment:**
- [ ] Test production URL
- [ ] Verify custom domain works
- [ ] Check SSL certificate active
- [ ] Test all pages and navigation
- [ ] Verify assets loading correctly

---

## 🌐 CUSTOM DOMAINS

### **Adding a Custom Domain**

**Step 1: Purchase Domain**
- Recommended: Vercel Domains, Namecheap, Google Domains

**Step 2: Add Domain in Vercel**
1. Go to Project Settings → Domains
2. Enter domain: `magicwrx.com`
3. Click "Add"

**Step 3: Configure DNS**

**Option A: Use Vercel Nameservers** (Recommended)
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B: Add DNS Records**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Step 4: Verify & Deploy**
- Vercel automatically issues SSL certificate
- Wait for DNS propagation (up to 48 hours, usually minutes)
- Test: `https://magicwrx.com`

### **Subdomain Configuration**

```
app.magicwrx.com → Main application
api.magicwrx.com → API endpoints
blog.magicwrx.com → Blog
docs.magicwrx.com → Documentation
```

**DNS Setup:**
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com

Type: CNAME
Name: api
Value: cname.vercel-dns.com
```

---

## 💰 COST MANAGEMENT

### **Vercel Pricing Tiers**

| Tier | Price | Bandwidth | Build Time | Team Members |
|------|-------|-----------|------------|--------------|
| **Hobby** | $0/month | 100GB | 100 hours | 1 |
| **Pro** | $20/month | 1TB | 400 hours | Unlimited |
| **Enterprise** | Custom | Custom | Custom | Custom |

### **Current Usage (Magic WRX)**
- Tier: Hobby (Free)
- Bandwidth: ~5GB/month (95GB remaining)
- Build Time: ~10 hours/month (90 hours remaining)
- Projects: 2 (MagicWRX, mxn-chat)

### **When to Upgrade to Pro**
- ✅ Need more than 100GB bandwidth/month
- ✅ Require team collaboration
- ✅ Want advanced analytics
- ✅ Need password protection for previews
- ✅ Require commercial usage

### **Cost Optimization Tips**
1. **Optimize images** to reduce bandwidth
2. **Enable caching** for static assets
3. **Use ISR** instead of SSR where possible
4. **Bundle analysis** to reduce build size
5. **Monitor usage** monthly

---

## 📞 SUPPORT & RESOURCES

### **Official Documentation**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel CLI: https://vercel.com/docs/cli

### **Community Resources**
- Vercel Discord: https://vercel.com/discord
- GitHub Discussions: https://github.com/vercel/next.js/discussions
- Stack Overflow: Tag `vercel` or `next.js`

### **Internal Documentation**
- `VERCEL_SETUP.md` - Initial setup guide
- `VERCEL_COMMANDS.md` - CLI command reference
- `MAGIC_WRX_MASTER_CONTROL_GUIDE.md` - Operations guide
- `SERVICE_STATUS_DASHBOARD.md` - Service health monitoring

### **Getting Help**
1. Check Vercel status: https://www.vercel-status.com
2. Review build logs in Vercel Dashboard
3. Search Vercel documentation
4. Ask in Vercel Discord
5. Contact Vercel support (Pro plan)

---

## 🏁 DEPLOYMENT COMMANDS REFERENCE

### **Vercel CLI Commands (MagicWRX Business)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link project to Vercel
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List deployments
vercel ls

# Inspect deployment
vercel inspect [deployment-url]

# Add environment variable
vercel env add [variable-name]

# List environment variables
vercel env ls

# Pull environment variables to local
vercel env pull

# Remove environment variable
vercel env rm [variable-name]

# Rollback deployment
vercel rollback [deployment-url]

# Delete deployment
vercel rm [deployment-url]

# Get project info
vercel project ls

# Switch project
vercel switch

# Get help
vercel --help
```

### **Firebase CLI Commands (AmazinglyStrange Business)**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init hosting

# List Firebase projects
firebase projects:list

# Use specific project
firebase use amazinglystrange-gaming

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy specific site (multi-site)
firebase deploy --only hosting:amazinglystrange
firebase deploy --only hosting:monstersreign
firebase deploy --only hosting:pixelextreme

# Create preview channel
firebase hosting:channel:deploy CHANNEL_NAME

# List hosting channels
firebase hosting:channel:list

# View deployment history
firebase hosting:channel:list

# Open Firebase console
firebase open hosting

# View logs
firebase functions:log

# Disable hosting
firebase hosting:disable

# Get help
firebase --help
```

---

## ✅ DEPLOYMENT CHECKLIST SUMMARY

### **Vercel Deployment (MagicWRX)**

**Pre-Deployment:**
- [ ] Tests passing (`npm test`)
- [ ] Build successful locally (`npm run build`)
- [ ] Environment variables configured on Vercel
- [ ] `vercel.json` reviewed
- [ ] Performance optimized (Lighthouse > 90)

**Deployment:**
- [ ] Deploy to preview first (`vercel`)
- [ ] Test preview deployment thoroughly
- [ ] Deploy to production (`vercel --prod`)
- [ ] Verify production URL accessible

**Post-Deployment:**
- [ ] All pages loading correctly
- [ ] Authentication working
- [ ] Forms submitting
- [ ] API routes responding
- [ ] Analytics tracking active
- [ ] Monitor for errors (Vercel Dashboard)

### **Firebase Deployment (AmazinglyStrange)**

**Pre-Deployment:**
- [ ] Build locally (if using build process)
- [ ] Test build output in `public/` directory
- [ ] Verify all assets included
- [ ] `firebase.json` reviewed
- [ ] Custom domain configured

**Deployment:**
- [ ] Login to Firebase (`firebase login`)
- [ ] Select project (`firebase use amazinglystrange-gaming`)
- [ ] Deploy (`firebase deploy --only hosting:TARGET`)
- [ ] Note deployment URL from terminal

**Post-Deployment:**
- [ ] Test production URL
- [ ] Verify custom domain works
- [ ] Check SSL certificate active
- [ ] Test all pages and navigation
- [ ] Verify assets loading
- [ ] Monitor Firebase Console

---

## 📜 VERSION HISTORY

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | Oct 12, 2025 | Initial Vercel deployment guide | AI Assistant |
| 1.1.0 | Oct 12, 2025 | Added Firebase hosting, separated MagicWRX and AmazinglyStrange businesses | AI Assistant |

---

## 🚀 NEXT REVIEW DATE

**Next Review**: October 19, 2025  
**Update Frequency**: Monthly or when major changes occur

---

## 🎯 CONCLUSION

This document serves as the **single source of truth** for all Vercel and Firebase deployments across the Amazing Business Holdings. 

### **Two Distinct Businesses:**

**MagicWRX Organization (Vercel):**
- Focus: Web development tools and hosting platform
- Projects: MagicWRX Hosting, MXN.Chat, Blog, Auth
- Hosting: Vercel (automatic deployments)
- GitHub: github.com/MagicWRX

**AmazinglyStrange Organization (Firebase):**
- Focus: Gaming and entertainment websites
- Projects: AmazinglyStrange.com, MonstersReign.com, PixelExtreme.com
- Hosting: Firebase Hosting (current), may migrate to Vercel
- GitHub: github.com/AmazinglyStrange

### **All Team Members Should:**

1. **Reference this guide** before deploying to either platform
2. **Follow the checklists** for every deployment
3. **Use correct GitHub organization** for each business
4. **Update environment variables** through appropriate platform (Vercel Dashboard or Firebase Console)
5. **Monitor performance** and costs regularly for both businesses
6. **Keep this document updated** with new learnings

### **Key Principles**

> "Two businesses, two GitHub accounts, one unified strategy."

> "Deploy early, deploy often, monitor always."

> "Environment variables are secrets - treat them as such."

> "Performance is a feature - optimize continuously."

> "Choose the right tool for the job: Vercel for dynamic apps, Firebase for static sites."

---

**Follow BUSINESS_ROADMAP.md, use KISS + YAGNI, and write unit tests.** 🚀
