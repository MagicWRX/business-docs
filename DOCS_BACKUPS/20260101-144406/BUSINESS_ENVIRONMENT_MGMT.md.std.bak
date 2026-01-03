# Environment Management Strategy for Multi-Project Workspace

**Document Date:** December 16, 2025  
**Version:** 1.0.0  
**Status:** Active Implementation Guide

---

## 🎯 Purpose

This document defines the strategy for managing environment variables, accounts, and configurations across the AMAZING BUSINESS ecosystem with multiple Supabase accounts and project-specific requirements.

---

## 📋 Account Architecture

### Primary Accounts

#### MagicWRX Studios Account (MagicWRXStudios@gmail.com)
**Business Unit:** MAGIC (Tools/SaaS Platform)  
**Projects:** MXN.CHAT, MagicWRX, base-template, Template-WRX

**Services:**
- **Supabase Organization:** `magicwrx-studios`
  - Project: `mxn-chat` (opcsbfwqazyzsskuuooz)
  - Project: `magicwrx-platform` (to be created)
- **Vercel Team:** `magicwrxs-projects`
- **Google Cloud Console:** OAuth for business tools
- **Stripe Account:** Subscriptions & SaaS payments
- **Brevo (Sendinblue):** Transactional emails for all MAGIC projects

#### Amazingly Strange Account (brian@AmazinglyStrange.com)
**Business Unit:** MONSTER (Gaming Platform)  
**Projects:** Amazingly-Strange-Website

**Services:**
- **Supabase Organization:** `amazingly-strange`
  - Project: `gaming-community` (separate DB)
- **Vercel Team:** `amazingly-strange` (or shared with MAGIC)
- **Google Cloud Console:** OAuth for gaming community
- **Stripe Account:** Gaming payments & IAP
- **Firebase:** Gaming leaderboards, analytics (legacy)

---

## 🔐 Environment Variable Matrix

### Project-Specific .env.local Files

#### 1. MXN.CHAT (.env.local)
**Location:** `/Users/brianlindahl/Development/Business/Websites/mxn-chat/.env.local`  
**Port:** 3000  
**Account:** MagicWRXStudios@gmail.com

```bash
# Supabase (MagicWRX Studios Account)
NEXT_PUBLIC_SUPABASE_URL=https://opcsbfwqazyzsskuuooz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ[...]
SUPABASE_SERVICE_ROLE_KEY=eyJ[...]

# Google OAuth (MXN.CHAT Project)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=1027436435314-[...].apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=[your-secret]

# Brevo Email (Shared across MAGIC projects)
BREVO_API_KEY=xkeysib-[...]
NEXT_PUBLIC_SENDER_EMAIL=admin@mxn.chat

# Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=[auto-injected]

# App Config
NEXT_PUBLIC_APP_URL=https://mxn-chat-magicwrxs-projects.vercel.app
NEXT_PUBLIC_APP_URL_LOCAL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_DEBUG_PANEL=false
```

---

#### 2. MagicWRX (.env.local)
**Location:** `/Users/brianlindahl/Development/Business/Websites/MagicWRX/.env.local`  
**Port:** 3001  
**Account:** MagicWRXStudios@gmail.com  
**Status:** 🔄 MIGRATION FROM FIREBASE TO SUPABASE

```bash
# === PHASE 1: FIREBASE (CURRENT - TO BE DEPRECATED) ===
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy[...]
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=magic-wrx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=magic-wrx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=magic-wrx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=[...]
NEXT_PUBLIC_FIREBASE_APP_ID=[...]

# === PHASE 2: SUPABASE (NEW - TO BE ACTIVATED) ===
# TODO: Create Supabase project 'magicwrx-platform' under MagicWRXStudios@gmail.com
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ[...]
SUPABASE_SERVICE_ROLE_KEY=eyJ[...]

# Google OAuth (MagicWRX Platform)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[magicwrx-oauth-client].apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=[your-secret]

# Stripe (SaaS Subscriptions)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[...]
STRIPE_SECRET_KEY=sk_live_[...]
STRIPE_WEBHOOK_SECRET=whsec_[...]

# Brevo Email (Shared)
BREVO_API_KEY=xkeysib-[...]
NEXT_PUBLIC_SENDER_EMAIL=support@magicwrx.com

# OpenAI (Blog Assistant)
OPENAI_API_KEY=sk-[...]

# App Config
NEXT_PUBLIC_APP_URL=https://magicwrx.vercel.app
NEXT_PUBLIC_APP_URL_LOCAL=http://localhost:3002
```

**Migration Checklist:**
- [ ] Create Supabase project `magicwrx-platform`
- [ ] Run schema migrations from Firebase → Supabase
- [ ] Test authentication flow with Supabase Auth
- [ ] Migrate user data (if needed)
- [ ] Update all Firebase SDK calls to Supabase
- [ ] Deploy and test
- [ ] Deprecate Firebase services

---

#### 3. Amazingly-Strange-Website (.env.local)
**Location:** `/Users/brianlindahl/Development/Amazingly-Strange-Website/amazingly-strange-website/.env.local`  
**Port:** 3002  
**Account:** brian@AmazinglyStrange.com  
**Status:** 🎮 SEPARATE GAMING ECOSYSTEM

```bash
# Supabase (Amazingly Strange Account - SEPARATE)
NEXT_PUBLIC_SUPABASE_URL=https://[gaming-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ[...]
SUPABASE_SERVICE_ROLE_KEY=eyJ[...]

# Google OAuth (Gaming Community)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[gaming-oauth-client].apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=[your-secret]

# Firebase (Gaming Leaderboards - Legacy)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy[...]
NEXT_PUBLIC_FIREBASE_PROJECT_ID=amazingly-strange

# Stripe (Gaming Payments & IAP)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[...]
STRIPE_SECRET_KEY=sk_live_[...]

# Email (Gaming Communications)
BREVO_API_KEY=xkeysib-[...]
NEXT_PUBLIC_SENDER_EMAIL=community@amazinglystrange.com

# App Config
NEXT_PUBLIC_APP_URL=https://amazinglystrange.com
NEXT_PUBLIC_APP_URL_LOCAL=http://localhost:3003
```

---

#### 4. base-template (.env.local)
**Location:** `/Users/brianlindahl/Development/Business/Websites/base-template/.env.local`  
**Port:** 3003  
**Account:** None (Clean Starter Template)  
**Status:** ✅ DRY CANONICAL STARTER

```bash
# NO external services by default
# This is a clean starter template

# App Config (minimal)
NEXT_PUBLIC_APP_URL_LOCAL=http://localhost:3003
```

**Note:** This template should remain service-agnostic. Add .env.example with placeholders for common services.

---

#### 5. Template-WRX (.env.local)
**Location:** `/Users/brianlindahl/Development/Business/Websites/Template-WRX/.env.local`  
**Port:** 3004  
**Account:** MagicWRXStudios@gmail.com  
**Status:** ✅ MARKETPLACE (Firebase)

```bash
# Firebase (Template Marketplace)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy[...]
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=template-wrx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=template-wrx

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[template-wrx-oauth].apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=[your-secret]

# App Config
NEXT_PUBLIC_APP_URL=https://template-wrx.vercel.app
NEXT_PUBLIC_APP_URL_LOCAL=http://localhost:3004

# Future: May migrate to Supabase alongside MagicWRX
```

---

## 🛠️ Multi-Port Development Script

### Enhanced start-local.sh

Create a unified development script that handles all projects:

**Location:** `/Users/brianlindahl/Development/Business/start-all-local.sh`

```bash
#!/bin/bash

# AMAZING BUSINESS - Multi-Project Development Launcher
# Starts all projects on designated ports with proper environment isolation

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Project configurations
declare -A PROJECTS=(
  ["mxn-chat"]="/Users/brianlindahl/Development/Business/Websites/mxn-chat:3000"
  ["magicwrx"]="/Users/brianlindahl/Development/Business/Websites/MagicWRX:3001"
  ["amazingly-strange"]="/Users/brianlindahl/Development/Amazingly-Strange-Website/amazingly-strange-website:3002"
  ["base-template"]="/Users/brianlindahl/Development/Business/Websites/base-template:3003"
  ["template-wrx"]="/Users/brianlindahl/Development/Business/Websites/Template-WRX:3004"
)

# Functions
check_port() {
  local port=$1
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️  Port $port is already in use${NC}"
    return 1
  fi
  return 0
}

start_project() {
  local name=$1
  local path=$(echo ${PROJECTS[$name]} | cut -d: -f1)
  local port=$(echo ${PROJECTS[$name]} | cut -d: -f2)
  
  echo -e "${BLUE}🚀 Starting $name on port $port...${NC}"
  
  # Check if directory exists
  if [ ! -d "$path" ]; then
    echo -e "${RED}❌ Directory not found: $path${NC}"
    return 1
  fi
  
  # Check if .env.local exists
  if [ ! -f "$path/.env.local" ]; then
    echo -e "${YELLOW}⚠️  Warning: $path/.env.local not found${NC}"
    if [ -f "$path/.env.local.example" ]; then
      echo -e "${YELLOW}   Found .env.local.example - copy and configure it${NC}"
    fi
  fi
  
  # Check port availability
  if ! check_port $port; then
    echo -e "${RED}   Skipping $name${NC}"
    return 1
  fi
  
  # Start the dev server
  cd "$path"
  PORT=$port npm run dev > /tmp/$name-dev.log 2>&1 &
  echo $! > /tmp/$name-dev.pid
  
  echo -e "${GREEN}✅ $name started on http://localhost:$port${NC}"
  echo -e "   Logs: /tmp/$name-dev.log"
  echo -e "   PID: $(cat /tmp/$name-dev.pid)"
}

stop_project() {
  local name=$1
  if [ -f "/tmp/$name-dev.pid" ]; then
    local pid=$(cat /tmp/$name-dev.pid)
    if ps -p $pid > /dev/null; then
      kill $pid
      echo -e "${GREEN}✅ Stopped $name (PID: $pid)${NC}"
    fi
    rm /tmp/$name-dev.pid
  else
    echo -e "${YELLOW}⚠️  $name is not running${NC}"
  fi
}

stop_all() {
  echo -e "${BLUE}🛑 Stopping all projects...${NC}"
  for project in "${!PROJECTS[@]}"; do
    stop_project $project
  done
}

status_all() {
  echo -e "${BLUE}📊 Project Status:${NC}"
  for project in "${!PROJECTS[@]}"; do
    local port=$(echo ${PROJECTS[$project]} | cut -d: -f2)
    if [ -f "/tmp/$project-dev.pid" ]; then
      local pid=$(cat /tmp/$project-dev.pid)
      if ps -p $pid > /dev/null; then
        echo -e "${GREEN}✅ $project - Running on :$port (PID: $pid)${NC}"
      else
        echo -e "${RED}❌ $project - Dead process${NC}"
        rm /tmp/$project-dev.pid
      fi
    else
      echo -e "${YELLOW}⏸️  $project - Not running${NC}"
    fi
  done
}

# Main command handler
case "${1:-start}" in
  start)
    if [ -z "$2" ]; then
      # Start all projects
      echo -e "${BLUE}🚀 Starting all projects...${NC}"
      for project in "${!PROJECTS[@]}"; do
        start_project $project
      done
    else
      # Start specific project
      if [ -n "${PROJECTS[$2]}" ]; then
        start_project $2
      else
        echo -e "${RED}❌ Unknown project: $2${NC}"
        echo "Available: ${!PROJECTS[@]}"
        exit 1
      fi
    fi
    ;;
  stop)
    if [ -z "$2" ]; then
      stop_all
    else
      stop_project $2
    fi
    ;;
  restart)
    if [ -z "$2" ]; then
      stop_all
      sleep 2
      for project in "${!PROJECTS[@]}"; do
        start_project $project
      done
    else
      stop_project $2
      sleep 1
      start_project $2
    fi
    ;;
  status)
    status_all
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|status} [project-name]"
    echo ""
    echo "Projects:"
    for project in "${!PROJECTS[@]}"; do
      local port=$(echo ${PROJECTS[$project]} | cut -d: -f2)
      echo "  - $project (port $port)"
    done
    exit 1
    ;;
esac
```

Make it executable:
```bash
chmod +x /Users/brianlindahl/Development/Business/start-all-local.sh
```

**Usage:**
```bash
# Start all projects
./start-all-local.sh start

# Start specific project
./start-all-local.sh start mxn-chat

# Check status
./start-all-local.sh status

# Stop all
./start-all-local.sh stop

# Restart specific project
./start-all-local.sh restart magicwrx
```

---

## 🧪 Testing Strategy

### Environment-Specific Testing

#### Unit Tests
- Run in isolated environment with mock services
- No real API keys needed
- Use `.env.test` files

#### Integration Tests
- Use Supabase local development mode
- Run against test databases
- Separate test projects in each Supabase org

#### E2E Tests
- **MXN.CHAT**: Existing e2e_test.js, test_rls.js
- **MagicWRX**: Create similar test suite post-migration
- **Amazingly-Strange**: Gaming-specific user flows

### CI/CD Testing Matrix

```yaml
# .github/workflows/ci-multi-project.yml
name: Multi-Project CI

on: [push, pull_request]

jobs:
  test-mxn-chat:
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.MXN_SUPABASE_URL }}
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.MXN_SUPABASE_ANON_KEY }}
    steps:
      - uses: actions/checkout@v3
      - name: Test MXN.CHAT
        run: |
          cd Websites/mxn-chat
          npm ci
          npm run test:rls
          npm run test:e2e:lifecycle
  
  test-magicwrx:
    runs-on: ubuntu-latest
    env:
      # Firebase (current) OR Supabase (after migration)
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.MAGICWRX_FIREBASE_PROJECT_ID }}
    steps:
      - uses: actions/checkout@v3
      - name: Test MagicWRX
        run: |
          cd Websites/MagicWRX
          npm ci
          npm run lint
          npm run build
  
  test-amazingly-strange:
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.GAMING_SUPABASE_URL }}
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.GAMING_SUPABASE_ANON_KEY }}
    steps:
      - uses: actions/checkout@v3
      - name: Test Amazingly Strange
        run: |
          cd Amazingly-Strange-Website/amazingly-strange-website
          npm ci
          npm run lint
          npm run build
```

---

## 🎨 Design Strategies

### App Architecture Patterns

#### MXN.CHAT (Reference Implementation)
**Pattern:** Real-time Chat Platform  
**Architecture:**
- Next.js 15 App Router
- Supabase Realtime subscriptions
- Context API for state management
- Mobile-first responsive design
- Ephemeral content (24h auto-delete)

**Reusable Patterns:**
- `ChatContext.tsx` → Generic real-time data context
- `MessageList.tsx` → Infinite scroll component
- Authentication flow with alias-first design

#### MagicWRX (SaaS Platform)
**Pattern:** Multi-Tenant SaaS  
**Architecture:**
- User workspace isolation
- Template marketplace
- Stripe subscription tiers
- AI-assisted content generation
- Admin dashboard

**Migration Priority:**
1. Auth system (Firebase → Supabase)
2. User profiles & workspaces
3. Template storage & metadata
4. Subscription management
5. Admin tools

#### Amazingly-Strange (Gaming Community)
**Pattern:** Gaming Platform  
**Architecture:**
- Separate data isolation
- Unity backend integration
- Leaderboards & tournaments
- In-app purchase handling
- Community features

---

## 🔄 Shared Components Library

Create a shared component library for code reuse:

**Location:** `/Users/brianlindahl/Development/Business/Shared/`

```
Shared/
├── components/          # UI components
│   ├── auth/           # Authentication flows
│   ├── forms/          # Form components
│   └── layouts/        # Layout templates
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useSupabase.ts
│   └── useStripe.ts
├── utils/              # Utility functions
│   ├── supabase.ts     # Supabase helpers
│   ├── stripe.ts       # Stripe helpers
│   └── email.ts        # Email helpers
└── types/              # TypeScript types
    ├── user.ts
    ├── subscription.ts
    └── common.ts
```

Import in projects:
```typescript
// Add to tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@amazing/shared/*": ["../../Shared/*"]
    }
  }
}

// Usage in projects
import { useAuth } from '@amazing/shared/hooks/useAuth';
```

---

## 📊 Account Management Best Practices

### Supabase Organization Strategy

#### MagicWRX Studios Organization
- **Organization Owner:** MagicWRXStudios@gmail.com
- **Projects:**
  - `mxn-chat` (Production)
  - `mxn-chat-staging` (Staging/Testing)
  - `magicwrx-platform` (To be created)
  - `magicwrx-staging` (To be created)
  - `template-wrx` (Future migration from Firebase)

#### Amazingly Strange Organization
- **Organization Owner:** brian@AmazinglyStrange.com
- **Projects:**
  - `gaming-community` (Production)
  - `gaming-staging` (Staging/Testing)

### Vercel Team Strategy

**Option 1: Single Team (Recommended for MVP)**
- Keep all projects under `magicwrxs-projects`
- Use project-level environment variables for isolation
- Lower cost, simpler billing

**Option 2: Separate Teams (Enterprise)**
- `magicwrx-tools` team
- `amazingly-strange-gaming` team
- Better brand separation, higher cost

### Google Cloud Console Organization

**Create separate OAuth consent screens:**
1. **MagicWRX Tools** (Business tools branding)
2. **Amazingly Strange Gaming** (Gaming community branding)

**Shared API Keys:**
- Use same billing account
- Separate quotas per OAuth client
- Monitor usage per project

---

## 🚨 Security Considerations

### Secret Management

1. **Never commit .env.local files**
2. **Use Vercel Environment Variables** for production secrets
3. **Rotate API keys quarterly**
4. **Separate test/staging/production keys**
5. **Use Supabase Service Role keys only in backend APIs**

### Access Control

- **Supabase RLS policies** for all tables
- **Vercel project permissions** for team members
- **Google Cloud IAM** for service accounts
- **Stripe webhook signature verification**

---

## 📝 Implementation Checklist

### Immediate Actions (Week 1)

- [ ] Create Supabase project `magicwrx-platform` under MagicWRXStudios@gmail.com
- [ ] Set up separate Supabase project for Amazingly-Strange under brian@AmazinglyStrange.com
- [ ] Create .env.local files for all 5 projects following this guide
- [ ] Create .env.local.example files for version control
- [ ] Test multi-port development with start-all-local.sh
- [ ] Verify environment isolation (no cross-project leakage)

### Short-term (Week 2-4)

- [ ] Begin MagicWRX Firebase → Supabase migration
- [ ] Set up CI/CD pipelines for each project
- [ ] Create shared components library
- [ ] Document OAuth setup for both accounts
- [ ] Set up Stripe accounts for each business unit

### Long-term (Month 2-3)

- [ ] Complete MagicWRX migration
- [ ] Migrate Template-WRX to Supabase
- [ ] Implement shared authentication patterns
- [ ] Build unified analytics dashboard
- [ ] Launch beta testing across all platforms

---

## 🔗 Related Documents

- [BUSINESS_ROADMAP.md](BUSINESS_ROADMAP.md) - Overall business strategy
- [BUSINESS_WORKSPACES.md](BUSINESS_WORKSPACES.md) - Project descriptions
- [MXN/MXN_INDEX.md](MXN/MXN_INDEX.md) - MXN.CHAT reference architecture
- [MXN/MXN_AUTH_SETUP.md](MXN/MXN_AUTH_SETUP.md) - Authentication configuration guide

---

**Document Compliance:** AI_STANDARDS.md  
**Maintained By:** Development Team  
**Review Frequency:** Weekly during active development
