MXN_DEPLOYMENT_CICD.md

Date: 2025-12-06 06:30 (-06:00)

🛠 MXN.CHAT & MagicWRX — Deployment & CI/CD Checklist (SSOT)

This document provides a step-by-step checklist for deploying MXN.CHAT and MagicWRX applications, including CI/CD setup, environment configuration, and best practices to maintain the Single Source of Truth (SSOT) standards.

⸻

1. Accounts & Permissions

### 🔐 Cost-Effective Access Strategy (Solo/Dual Identity)
Since adding members to Vercel incurs a per-seat cost, use the following strategy to manage development via `brian@amazinglystrange.com` while resources are owned by `MagicWRXStudio@gmail.com`.

#### A. Vercel Deployment (Free Method)
**Option 1: Git Integration (Recommended)**
1. Ensure the GitHub repo is connected to the Vercel project (owned by MagicWRXStudio).
2. Add `brian@amazinglystrange.com` as a **Collaborator** on the GitHub repo.
3. **Workflow:** Simply `git push` from your local machine. Vercel will detect the commit and deploy automatically.
   * *No Vercel CLI login required for daily work.*

**Option 2: CLI Owner Login (For Manual Deploys)**
1. If you MUST run `vercel --prod` manually:
2. Run `vercel login` in your terminal.
3. Enter `MagicWRXStudio@gmail.com`.
4. Verify via the email link sent to MagicWRXStudio.
5. **Result:** You are acting as the Owner. No extra seat cost.

#### B. Current MXN-Chat Workflow (Active)
**Development Environment:**
- **IDE:** VS Code with GitHub Copilot (brian@amazinglystrange.com)
- **Git:** SSH authentication with ed25519 key
- **Local Testing:** `npm run dev` on localhost:3000

**Deployment Workflow:**
1. **Code Changes:** Made in VS Code with Copilot assistance
2. **Git Operations:**
   ```bash
   git add .
   git commit -m "Feature description"
   git push origin main
   ```
3. **Automatic Deployment:** Vercel detects push and deploys to production
4. **URL:** `https://mxn-chat-dcgsy3rde-magicwrxs-projects.vercel.app`

**Benefits:**
- ✅ **Zero Cost:** No extra Vercel seats needed
- ✅ **Automated:** Push triggers deployment automatically
- ✅ **Secure:** SSH key authentication
- ✅ **Efficient:** Copilot accelerates development
- ✅ **Reliable:** Git-based deployment history

#### C. Supabase Access
1. Log in to Supabase as **MagicWRXStudio@gmail.com**.
2. Go to **Organization Settings** > **Team**.
3. Invite `brian@amazinglystrange.com` (Supabase allows some free collaboration depending on the plan, or use the Owner Login method below).
4. **Alternative (Owner Login):** Run `supabase login` and use the `MagicWRXStudio@gmail.com` credentials.

#### D. GitHub Collaboration
1. Log in to GitHub as **MagicWRXStudio** (or repo owner).
2. Go to **Settings** > **Collaborators**.
3. Add `brian@amazinglystrange.com`.
4. **Result:** Brian can push code, which triggers Vercel deployments automatically.

---

	•	Vercel account created under MagicWRXStudio@gmail.com
	•	Supabase projects created for MXN-CHAT and MagicWRX
	•	Stripe Business Account configured
	•	Google Analytics / GA4 property created
	•	Google Ads account linked
	•	GitHub/GitLab repositories created with correct permissions

⸻

2. Environment Variables (Vercel & Supabase)
	•	NEXT_PUBLIC_SUPABASE_URL
	•	NEXT_PUBLIC_SUPABASE_ANON_KEY
	•	SUPABASE_SERVICE_ROLE_KEY
	•	STRIPE_SECRET_KEY
	•	STRIPE_WEBHOOK_SECRET
	•	OPENAI_API_KEY
	•	GOOGLE_ANALYTICS_ID
	•	GOOGLE_ADS_ID
	•	Optional feature flags for AI, Ads, and Media Cleanup

⸻

3. Branching Strategy & CI/CD Setup
	•	Main branch: main or master for production deployments
	•	Develop branch for staging
	•	Feature branches for new development
	•	CI/CD triggers on push or merge request events
	•	Vercel integration with GitHub/GitLab for automatic builds
	•	Test suites run on each push (unit + integration)
	•	Linting and formatting checks
	•	SSOT verification (document updates referenced in commit message)

⸻

4. Build & Deployment Steps
	1.	Frontend
	•	Pull latest changes from the feature/develop branch
	•	Run npm install and npm run build
	•	Run local tests and linters
	•	Merge into main for production deployment
	2.	Backend / API Functions
	•	Ensure Edge Functions are up-to-date in api/
	•	Validate RLS policies in Supabase
	•	Run database migrations
	•	Deploy API routes via Vercel
	3.	Supabase Deployment
	•	Apply SQL migration scripts from MXN_SUPABASE_SCHEMA.sql
	•	Test Auth and RLS policies
	•	Configure scheduled tasks for ephemeral media cleanup
	4.	Third-Party Integrations
	•	Stripe webhook endpoint verified
	•	GA4 and Ads scripts tested
	•	OpenAI endpoints configured and tested

⸻

5. Post-Deployment Checks
	•	Confirm deployment URL is live and reachable
	•	Test authentication flows (email verification, signup, login)
	•	Send test messages in MXN.CHAT and validate ephemeral cleanup
	•	Verify payments using Stripe test keys
	•	Validate GA4 and Ads events are firing correctly
	•	Run AI features if enabled and confirm outputs
	•	Monitor server logs and Supabase metrics

⸻

6. Monitoring & Maintenance
	•	Set up alerts for Supabase usage limits
	•	Configure logging for Edge Functions and API routes
	•	Schedule periodic review of SSOT documents
	•	Quarterly audit of CI/CD pipelines, accounts, and environment variables

⸻

7. Best Practices
	•	Always reference MXN_INDEX.md before making any deployment changes
	•	Keep staging and production environments clearly separated
	•	Version all schema migrations and scripts
	•	Maintain feature flags for experimental integrations
	•	Document all changes in commit messages linking to SSOT entries

⸻

End of document.