# MAGICWRX_DEPLOYMENT.md

**Purpose:** Deployment protocols and Vercel configuration.

**Date Created:** December 18, 2025  
**Last Updated:** December 18, 2025

---

## 🚀 Deployment Strategy

Magic WRX is hosted on **Vercel**, leveraging its native integration with Next.js.

### **Pipeline**

1.  **Development**: Local changes tested via `npm run dev`.
2.  **Preview**: Pull Requests to `master` trigger a Preview Deployment on Vercel.
3.  **Production**: Merges to `master` trigger a Production Deployment.

### **Vercel Configuration**

-   **Framework Preset**: Next.js
-   **Build Command**: `next build`
-   **Output Directory**: `.next`
-   **Install Command**: `npm install`

### **Environment Variables**

Ensure the following variables are set in the Vercel Project Settings:

-   `NEXT_PUBLIC_SUPABASE_URL`
-   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
-   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
-   `STRIPE_SECRET_KEY`
-   `STRIPE_WEBHOOK_SECRET`
-   `RESEND_API_KEY`

### **Troubleshooting**

-   **Build Failures**: Check the Vercel logs. Common issues include missing dependencies or linting errors.
-   **Environment Issues**: Verify that variables are applied to the correct environment (Production vs. Preview).

---
