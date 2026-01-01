# 🚀 Amazing Business Platform Development Session - AI Prompt Guide

**Document Date:** December 5, 2025  
**Version:** 1.0.1  
**Last Updated:** December 5, 2025

---

## 📋 Context Overview

Follow BUSINESS_AI_PROMPT guidelines.

I'm working on the **Amazing Business Platform**, a multi-faceted ecosystem encompassing:

- **MXN.CHAT: as the flagship web based browser based Chat app.
- **Magic WRX**: Freemium website builder and template marketplace
- **Monster Gaming**: Unified gaming platform for 5+ mobile games
- **Amazing Holding**: Strategic parent company managing both verticals

## 🏢 Project Overview

### **Repositories**
- **Primary**: MagicWRX/MagicWRX (GitHub)
- **Location**: `/Users/brianlindahl/Development/Business/Websites/MagicWRX`
- **Docs**: `CODE:`DOCs``

### **Current Date**: October 12, 2025

### **Tech Stack**
- **Frontend**: Next.js 15, React 19, TypeScript 5, Tailwind CSS 3.4
- **Backend**: Firebase v10, Supabase, Stripe, Resend
- **Hosting**: Vercel (primary), Firebase Hosting (static)
- **Gaming**: Unity 2022+, AdMob, Unity Ads
- **Infrastructure**: Vercel, Firebase, Supabase, Cloudflare (Phase 3)

---

## 📊 Current Status (as of Oct 12, 2025)

### **Magic WRX Platform**
- ✅ **Deployed**: Production site live on Vercel
- ✅ **Authentication**: Firebase Auth + Demo mode working
- ✅ **Templates**: 5 premium templates available
- ✅ **Pricing Page**: All tiers displayed correctly
- 🟡 **Stripe Integration**: Configured but products not created
- 🟡 **Dashboard**: Basic structure exists, needs enhancements
- 🔴 **Site Builder**: Not implemented yet (Sprint 2)
- 🔴 **Production Access**: 401 errors on some production URLs
- 🔴 **Testing**: No test suite implemented

### **Monster Gaming Platform**
- ✅ **Live Games**: 5 mobile games generating $2.50/day total
- ✅ **AdMob**: Basic monetization active
- 🔴 **Unified Backend**: Not started
- 🔴 **Cross-game Features**: Planned for Phase 2

### **Business Metrics**
- **Current MRR**: $0 (pre-revenue)
- **Target Month 6**: $1,000 MRR
- **Target Year 1**: $30,000 MRR
- **Free Users**: ~100 (early stage)
- **Paid Users**: 0 (Stripe not configured)

---

## 🗂️ Project Structure

```
Business/
├── DOCs/                          # Master documentation
│   ├── BUSINESS_ROADMAP.md        # Strategic roadmap (read this!)
│   ├── BUSINESS_AI_PROMPT.md      # This file
│   ├── amazing_business_strategy.md
│   ├── amazing_business_strategy copy.md
│   └── amazing_tech_stack_guide.md
│
└── Websites/
    └── MagicWRX/                  # Primary platform
        ├── src/                   # Next.js application
        │   ├── app/              # App Router pages
        │   ├── components/       # Reusable components
        │   ├── hooks/            # Custom hooks
        │   ├── lib/              # Utilities (firebase, stripe, etc.)
        │   └── types/            # TypeScript types
        ├── public/               # Static assets
        ├── .env.local            # Environment variables
        ├── package.json          # Dependencies
        ├── next.config.js        # Next.js config
        ├── firebase.json         # Firebase config
        ├── vercel.json           # Vercel config
        └── DOCs/                 # Technical documentation
            ├── README.md
            ├── FREEMIUM_PLATFORM_TRANSFORMATION.md
            ├── IMMEDIATE_IMPLEMENTATION_STEPS.md
            ├── STRIPE_INTEGRATION_PLAN.md
            ├── STRIPE_INTEGRATION_SETUP.md
            ├── MAGIC_WRX_MASTER_CONTROL_GUIDE.md
            ├── SERVICE_STATUS_DASHBOARD.md
            └── test-results.md
```

---

## 🎯 Code Quality Requirements

All code **must** comply with:

1. **SOLID** and **DRY** at all layers
2. **KISS** – Favor the simplest solution that works
3. **YAGNI** – No speculative features or unused abstractions
4. **Single Source of Truth** – Centralize shared data/configuration
5. **Composition over Inheritance** – Prefer components and interfaces
6. **Separation of Concerns** – Each script has one primary reason to change
7. **Law of Demeter** – Classes only talk to their immediate collaborators
8. **Explicitness Over Implicitness** – No hidden side effects
9. **Clean Architecture Boundaries** – Core layer must not depend on UI or external SDKs
10. **Immutable Core** – Core data structures are readonly unless explicitly mutable

---

## 📝 Documentation & State Management (MANDATORY)

Every significant code change or feature addition requires updates to the following documentation files. **Do not consider a task complete until these are updated.**

#### 1. `BUSINESS_ROADMAP.md`
*   Maintain the strategic roadmap with current status, priorities, and timelines.
*   Move completed tasks to a "Completed" section or check them off.
*   Add new tasks arising from your work to appropriate sections.
*   Ensure the document reflects the immediate focus and long-term goals.

#### 2. `BUSINESS_WORKSPACES.md`
*   Document workspace structures, purposes, technologies, and statuses.
*   Update when new workspaces are added or existing ones change.
*   Maintain accurate overviews for each project.

#### 3. `GENERIC_DOC_INDEX.md`
*   If you create a new file (Document or Code), add it to the index with a brief description.
*   Ensure links are working and index is up-to-date.

#### 4. Project-specific documentation
*   Update README.md, AI_PROMPT.md, or other docs in relevant workspaces.
*   Maintain architecture diagrams, flow charts, and technical specifications.

---

## 🚨 Known Issues Requiring Attention

### **Critical (P0) - Immediate**
1. **Stripe Products Not Created** 🚨
   - Products/prices not set up in Stripe Dashboard
   - Blocking all payment processing and subscriptions
   - Required for revenue generation
   
2. **Production URLs Returning 401** 🔴
   - Homepage and some pages inaccessible in production
   - Blocking user acquisition
   - Likely auth middleware issue

3. **Stripe Webhook URLs Not Updated** ⚠️
   - Webhook endpoint uses localhost, not production URL
   - Blocking payment confirmations
   - Need to get new webhook signing secret

### **High Priority (P1) - This Week**
4. **No Testing Infrastructure**
   - Jest + React Testing Library not configured
   - No unit, integration, or E2E tests
   - Risk of bugs in production

5. **Firebase Service Account Key Placeholder**
   - Server-side Firebase operations may fail
   - Admin features not working correctly

6. **Email Service Not Tested**
   - Resend API configured but never tested
   - User notifications may not send

### **Medium Priority (P2) - Sprint 2**
7. **Site Builder Not Implemented**
   - Core feature for freemium model missing
   - Planned for next sprint

8. **Gaming Backend Not Started**
   - Cannot unify 5 existing mobile games
   - Blocking cross-game features and revenue growth

---

## 💡 What I Need Help With

### **Option 1: Fix Stripe Integration** (Recommended - Critical for Revenue)
**Goal**: Enable payment processing and subscription management

**Tasks**:
1. Create products in Stripe Dashboard for all 4 pricing tiers:
   - Free: $0/month (no Stripe product needed)
   - Starter: $29/month
   - Pro: $99/month
   - Enterprise: $299/month
2. Get price IDs and update `src/app/pricing/page.tsx`
3. Create webhook endpoint on Stripe Dashboard
4. Update webhook URL to production
5. Add webhook signing secret to environment variables
6. Test checkout flow with test cards

**Expected Output**:
- Step-by-step guide to create Stripe products
- Code changes needed in pricing page
- Environment variable updates
- Testing procedure with test cards

---

### **Option 2: Fix Production Access Issues**
**Goal**: Make homepage and key pages publicly accessible

**Tasks**:
1. Investigate why production URLs return 401 errors
2. Review authentication middleware configuration
3. Make homepage (/) publicly accessible
4. Ensure /pricing, /templates, /contact are public
5. Keep /dashboard, /admin protected
6. Test all routes in production

**Expected Output**:
- Root cause analysis of 401 errors
- Code changes to fix access issues
- Updated security rules if needed
- Verification procedure

---

### **Option 3: Set Up Testing Infrastructure**
**Goal**: Implement comprehensive testing framework

**Tasks**:
1. Install Jest + React Testing Library
2. Configure Jest for Next.js 15
3. Create example unit tests for:
   - `useAuth` hook
   - Firebase utility functions
   - React components
4. Create example integration test for API routes
5. Set up Playwright for E2E tests
6. Add test scripts to package.json
7. Create GitHub Actions workflow for CI

**Expected Output**:
- Complete testing setup
- Example tests following best practices
- Documentation on writing tests
- CI/CD configuration

---

### **Option 4: Implement User Dashboard**
**Goal**: Build user dashboard with site management

**Tasks**:
1. Create dashboard layout with navigation
2. Display user subscription tier and status
3. Show usage statistics (sites, storage, bandwidth)
4. List user's sites with management actions
5. Add upgrade prompts for free users
6. Integrate Stripe Customer Portal for billing
7. Write unit tests for dashboard components

**Expected Output**:
- Complete dashboard implementation
- Responsive design (mobile-first)
- Integration with CODE:`DOCs/BUSINESS/Firebase/Supabase`
- Tests with 80%+ coverage

---

### **Option 5: Build Site Builder MVP**
**Goal**: Create drag-and-drop website builder

**Tasks**:
1. Design site builder UI/UX
2. Implement drag-and-drop with @dnd-kit
3. Create component library (headers, heroes, galleries, etc.)
4. Build real-time preview panel
5. Add customization panel (colors, fonts, layouts)
6. Implement save/publish functionality
7. Add site versioning and history
8. Write comprehensive tests

**Expected Output**:
- Working site builder prototype
- Component library with 10+ components
- Clean architecture implementation
- Full test coverage

---

### **Option 6: Gaming Platform Backend Architecture**
**Goal**: Design unified backend for 5+ mobile games

**Tasks**:
1. Review existing game codebases
2. Design Supabase database schema for:
   - Unified player accounts
   - Cross-game leaderboards
   - Achievement system
   - In-game currency
3. Create Unity integration guide
4. Design authentication flow for Unity clients
5. Plan data synchronization strategy
6. Create API endpoints for game services

**Expected Output**:
- Complete architecture document
- Database schema (SQL)
- Unity integration code examples
- API endpoint specifications
- Migration plan for existing games

---

### **Option 7: Custom Task**
**Describe your specific need here**

---

## 📚 Instructions for AI Assistant

### **Before Starting**
1. ✅ Read `DOCs/BUSINESS_ROADMAP.md` for strategic context
2. ✅ Review relevant technical documentation in `CODE:`DOCs/BUSINESS/MagicWRX/DOCs``
3. ✅ Understand the current status and known issues
4. ✅ Confirm which option (1-7) or custom task to pursue

### **While Working**
1. 🎯 Follow the 10 code quality principles listed above
2. 🧪 Write or update unit tests for any code changes (80%+ coverage target)
3. 📝 Provide clear, step-by-step solutions with explanations
4. ⚠️ Verify changes don't break existing functionality
5. 📚 Update relevant documentation as needed
6. 🔍 Use TypeScript strict mode and proper typing
7. 🎨 Follow existing code style and conventions
8. 🚫 Apply KISS + YAGNI - avoid over-engineering

### **Code Style Guidelines**
```typescript
// ✅ GOOD: Simple, clear, testable
export function calculateMRR(users: User[]): number {
  return users
    .filter(u => u.subscription.status === 'active')
    .reduce((sum, u) => sum + u.subscription.price, 0);
}

// ❌ BAD: Over-engineered, hard to test
export class MRRCalculator {
  private strategy: ICalculationStrategy;
  
  constructor(
    strategy: ICalculationStrategy,
    private logger: ILogger,
    private cache: ICache
  ) {
    this.strategy = strategy;
  }
  
  async calculate(users: User[]): Promise<number> {
    // ... 50 lines of abstraction
  }
}
```

### **After Completing Work**
1. ✅ Run tests and ensure they pass
2. ✅ Check for TypeScript errors (`npm run type-check`)
3. ✅ Verify build succeeds (`npm run build`)
4. ✅ Update `BUSINESS_ROADMAP.md` if action items completed
5. ✅ Document any new environment variables needed
6. ✅ Provide deployment instructions if needed
7. ✅ List any breaking changes or migration steps

---

## 🔧 Development Environment

### **System Information**
- **OS**: macOS
- **Shell**: zsh
- **Node.js**: v18+ (v20 recommended)
- **Package Manager**: npm
- **Git**: Initialized (branch: master)
- **Editor**: VS Code (recommended)

### **Installed Tools**
- ✅ Firebase CLI
- ✅ Vercel CLI
- ✅ Git
- ✅ npm/npx

### **Environment Variables**
All configured in `.env.local`:
- Firebase (Auth, Firestore, Storage, Analytics)
- Supabase (Database, Auth)
- Stripe (API keys, webhook secret)
- Resend (Email API)
- Application settings (name, base URL)

---

## 📊 Expected Output Format

### **For Bug Fixes**
```markdown
## Issue: [Brief description]

### Root Cause
[Explain what's causing the problem]

### Solution
[Explain the fix]

### Code Changes
```typescript
// File: src/path/to/file.ts
// Changes made
```

### Testing
[How to verify the fix works]

### Side Effects
[Any impacts on other parts of the system]
```

### **For New Features**
```markdown
## Feature: [Feature name]

### Requirements
[What the feature needs to do]

### Architecture
[High-level design diagram or explanation]

### Implementation Plan
1. Step 1
2. Step 2
...

### Code Examples
```typescript
// Core implementation
```

### Tests
```typescript
// Unit test examples
```

### Documentation
[What docs need to be updated]

### Deployment Notes
[Special deployment considerations]
```

### **For Architecture Decisions**
```markdown
## Decision: [What we're deciding]

### Context
[Why this decision is needed]

### Options Considered
1. **Option A**: Pros/Cons
2. **Option B**: Pros/Cons
3. **Option C**: Pros/Cons

### Decision
[Which option and why]

### Consequences
- Positive: [Benefits]
- Negative: [Tradeoffs]
- Neutral: [Other impacts]

### Implementation
[How to implement this decision]
```

---

## 🎯 Success Criteria

### **For Any Task**
- ✅ Follows all 10 code quality principles
- ✅ Has 80%+ unit test coverage
- ✅ Builds without errors (`npm run build`)
- ✅ Passes all tests (`npm test`)
- ✅ No TypeScript errors (`npm run type-check`)
- ✅ Documentation updated
- ✅ No breaking changes (or migration guide provided)
- ✅ Follows existing code patterns

### **For Stripe Integration (Option 1)**
- ✅ All 4 products created in Stripe
- ✅ Price IDs updated in code
- ✅ Webhook configured and tested
- ✅ Test payment completes successfully
- ✅ User subscription status updates in database

### **For Testing Setup (Option 3)**
- ✅ Jest configured and working
- ✅ Example tests passing
- ✅ Test coverage report generated
- ✅ CI/CD pipeline running tests
- ✅ Documentation on writing tests created

---

## 📖 Reference Documents

### **Business Strategy**
- `DOCs/amazing_business_strategy.md` - Core strategy
- `DOCs/amazing_business_strategy copy.md` - Gaming focus
- `DOCs/amazing_tech_stack_guide.md` - Technical architecture
- `DOCs/BUSINESS_ROADMAP.md` - Strategic roadmap (primary reference)

### **Technical Implementation**
- `CODE:`DOCs/BUSINESS/MagicWRX/DOCs`FREEMIUM_PLATFORM_TRANSFORMATION.md` - Freemium model
- `CODE:`DOCs/BUSINESS/MagicWRX/DOCs`IMMEDIATE_IMPLEMENTATION_STEPS.md` - Week-by-week plan
- `CODE:`DOCs/BUSINESS/MagicWRX/DOCs`STRIPE_INTEGRATION_PLAN.md` - Payment integration
- `CODE:`DOCs/BUSINESS/MagicWRX/DOCs`STRIPE_INTEGRATION_SETUP.md` - Stripe configuration
- `CODE:`DOCs/BUSINESS/MagicWRX/DOCs`MAGIC_WRX_MASTER_CONTROL_GUIDE.md` - Operations guide
- `CODE:`DOCs/BUSINESS/MagicWRX/DOCs`SERVICE_STATUS_DASHBOARD.md` - Service health

### **Test Results**
- `MagicWRX/test-results.md` - Latest test run results
- `MagicWRX/test-core-functionality.md` - Functionality checklist

---

## 🚀 Quick Start Commands

```bash
# Navigate to project
cd /Users/brianlindahl/Development/Business/Websites/MagicWRX

# Install dependencies
npm install

# Start development server
npm run dev
# or
./start-dev.sh

# Build for production
npm run build

# Run tests (once configured)
npm test

# Type checking
npm run type-check

# Deploy to Vercel
vercel --prod
# or
./deploy-vercel.sh

# Deploy to Firebase
firebase deploy --only hosting
# or
./deploy.sh

# Check Firebase status
./firebase-status.sh

# Verify setup
./verify-setup.sh

# Run integration tests
./test-integrations.sh
```

---

## 💬 Communication Templates

### **When Asking for Help**
```
I'm working on [task] and encountering [issue].

**Context**:
- File: [path]
- Error: [error message]
- Expected: [what should happen]
- Actual: [what's happening]

**What I've Tried**:
1. [attempt 1]
2. [attempt 2]

**Environment**:
- Node version: [version]
- Dependencies: [relevant packages]

**Question**:
[Specific question]
```

### **When Reporting Progress**
```
**Completed**:
- ✅ Task 1
- ✅ Task 2

**In Progress**:
- 🔄 Task 3 (60% complete)

**Blocked**:
- 🚫 Task 4 (waiting on [dependency])

**Next Steps**:
1. [next action]
2. [next action]
```

---

## 🎓 Learning Resources

### **Essential Reading**
- Clean Code by Robert C. Martin
- Clean Architecture by Robert C. Martin
- The Pragmatic Programmer by Hunt & Thomas

### **Technology Documentation**
- Next.js 15: https://nextjs.org/docs
- React 19: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs
- Firebase: https://firebase.google.com/docs
- Supabase: https://supabase.com/docs
- Stripe: https://stripe.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

### **Testing**
- Jest: https://jestjs.io/docs/getting-started
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro
- Playwright: https://playwright.dev/docs/intro

---

## 🏁 Final Checklist

Before marking any task as complete:

- [ ] Code follows all 10 quality principles
- [ ] Unit tests written with 80%+ coverage
- [ ] Integration tests for critical paths
- [ ] TypeScript strict mode enabled and passing
**Document Version**: 1.0.1  
**Last Updated**: December 5, 2025  
**Next Review**: December 12, 2025ented
- [ ] No breaking changes (or migration guide included)
- [ ] Tested in both development and production
- [ ] Roadmap updated if action items completed

---

## 📞 Need Help?

If stuck or need clarification:
1. Review `BUSINESS_ROADMAP.md` for strategic context
2. Check relevant technical documentation
3. Search existing code for patterns
4. Ask specific questions with full context
5. Provide error messages, file paths, and what you've tried

---

**Standard AI Prompt Footer:**  
Follow BUSINESS_ROADMAP.md, use KISS + YAGNI, and write unit tests. 🚀

---

**Document Version**: 1.0.0  
**Last Updated**: October 12, 2025  
**Next Review**: October 19, 2025
