# AS Setup Guide

## 🚀 Quick Start

Get the Amazingly Strange Website running locally and deployed to Vercel with the steps below. This guide covers prerequisites, Supabase configuration, environment management, and production deployment.

### 📋 Prerequisites

Ensure the following tools are installed:

- Node.js ≥ 18
- npm ≥ 8
- Git
- Vercel CLI (`npm install -g vercel@latest`)

Verify versions:

```bash
node --version
npm --version
git --version
vercel --version
```

### � Contact Information

| Contact | Email |
|---------|-------|
| Primary Developer | Brian@BrianLindahl.com |
| Business Contact | Brian@AmazinglyStrange.com |
| Studio Contact | MagicWRXStudio@gmail.com |

## 🔗 Project Identifiers

| Service | Project Name/ID |
|---------|-----------------|
| Vercel | amazinglystrange (ID: prj_SaTOpwOzQa33pSRIqOtOSRJr9xVO) |
| Supabase | amazingly-strange-supabase (ID: nthggvagtopobmdnquph) |

## �🛠️ Local Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amazingly-strange-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create local environment file**
   ```bash
   cp .env.example .env.local
   ```

4. **Populate `.env.local`**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 to view the landing page.

### 🔐 Supabase Configuration

1. **Create a project** at https://supabase.com
2. **Run the database setup script**
   ```bash
   # Apply the schema to your Supabase project
   # Use Supabase dashboard SQL editor or CLI
   # Run scripts/setup/01-base-schema.sql
   # Then run scripts/setup/02-media-schema.sql
   # Finally run scripts/setup/03-storage-buckets.sql
   ```
3. **Site URL** (if auth is added later)
   - Local: `http://localhost:3000`
   - Production: [Your Vercel URL]

### 🧪 Local Testing Checklist

- [ ] Home page renders without runtime errors
- [ ] Game download links are functional
- [ ] Images load from public/ directory
- [ ] Responsive design works on mobile/desktop

## 🌐 Deployment Workflow (Vercel)

### 1. Authenticate Vercel CLI
```bash
vercel login
```

### 2. Link project (one time)
```bash
vercel link
```

### 3. Configure production environment variables
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
```

### 4. Deploy

- **Preview:** `vercel`
- **Production:** `vercel --prod`

### 5. Post-deploy checks

- [ ] Site loads on production domain
- [ ] All assets load correctly
- [ ] Links to external sites work
- [ ] Environment variables are set

For detailed release steps (including rollback and monitoring), see `AS_RELEASE_RUNBOOK.md` in the repository root.

## 🔧 Environment Management

| Environment | Location | Notes |
|-------------|----------|-------|
| Local | `.env.local` | Never commit; mirrors production variables |
| Preview | Vercel Preview env vars | Managed via CLI/dashboard |
| Production | Vercel Production env vars | Encrypted at rest |

### Syncing environment variables

```bash
# Pull production variables to local .env
vercel env pull .env.local
```

## 🐛 Troubleshooting

| Issue | Likely Cause | Resolution |
|-------|--------------|------------|
| Build fails on Vercel | Type errors or missing env vars | Run `npm run type-check` & `npm run build` locally, verify `vercel env ls` |
| Images not loading | Incorrect paths in public/ | Check file paths in components |
| Supabase connection fails | Wrong env vars | Re-copy credentials from Supabase Settings → API |
| Tailwind styles not applying | Config issues | Verify `tailwind.config.ts` and class names |

## 📚 Related Documents

- `docs/AS_OVERVIEW.md` – architecture context and roadmap summary
- `docs/AS_DEVELOPMENT.md` – branching, QA, debugging
- `docs/AS_API.md` – database schema & data flow
- `docs/AS_STANDARDS.md` – naming conventions and doc rules
