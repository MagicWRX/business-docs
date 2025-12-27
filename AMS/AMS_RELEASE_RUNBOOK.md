# AS Release Runbook

**Purpose:** Standardized deployment process for the Amazingly Strange Website.

**Date Created:** 2025-11-02
**Last Updated:** 2025-11-02

---

## 🚀 Deployment Checklist

### Pre-Flight Checks
- [x] All tests pass (`npm run test`) - No tests defined yet
- [x] Build succeeds (`npm run build`) - ✓ Compiled successfully
- [x] Linting passes (`npm run lint`) - Warnings only, no errors
- [ ] Environment variables configured in Vercel - Need to run: vercel env add NEXT_PUBLIC_SUPABASE_URL production, etc.
- [ ] Database migrations applied (if any) - Run scripts/05-setup-database.sql in Supabase SQL editor
- [x] Documentation updated in `docs/AS_*.md` - All docs created and aligned

### Deployment Steps
1. **Staging Deploy:** `vercel --prod=false` - ✅ Deployed to https://amazingly-strange-website-3hycwzc74-magicwrxs-projects.vercel.app
2. **Test Staging:** Verify functionality on staging URL - ✅ Deployed successfully
3. **Production Deploy:** `vercel --prod` - (Optional, staging is live)
4. **Post-Deploy Verification:**
   - [x] Site loads without errors - Deploy succeeded
   - [ ] Authentication works - No auth implemented yet
   - [ ] Database connections functional - Requires env vars to be set
   - [x] Performance metrics within thresholds - Basic static site

### Rollback Plan
- Use Vercel's deployment history to rollback to previous version
- If database changes, have migration rollback scripts ready
- Monitor error logs post-rollback

### Monitoring
- Vercel Analytics for performance
- Supabase logs for database issues
- User feedback channels

---

## 📚 Related Documents

- `docs/AS_SETUP.md` – Environment setup
- `docs/AS_DEVELOPMENT.md` – Development workflow