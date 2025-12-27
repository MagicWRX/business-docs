MXN_SPECS.md

Date: 2025-12-06 19:00 (-06:00)

🔧 MXN.CHAT — Technical Specifications & Monitoring Guide (SSOT)

This document provides critical technical specifications, monitoring requirements, and operational details for MXN.CHAT as it comes online. Designed as a Single Source of Truth for system health, performance metrics, and troubleshooting.

⸻

## 1. 🚀 System Architecture Overview

### Core Components
- **Frontend:** Next.js 15.5.7 (App Router), React 19, TypeScript
- **Backend:** Supabase (Postgres + Realtime)
- **Hosting:** Vercel Edge Network
- **Storage:** Supabase Storage (RLS-protected)
- **Auth:** Supabase Auth (Email + Google OAuth)
- **Development IDE:** VS Code with GitHub Copilot (brian@amazinglystrange.com)
- **Deployment:** Git-based auto-deployment via Vercel

### Database Schema
- **Project:** `opcsbfwqazyzsskuuooz` (Tools)
- **Tables:** users, rooms, messages
- **Storage:** `mxn-attachments` bucket
- **Realtime:** Enabled on messages and rooms tables

### Environment Variables (Production)
```
NEXT_PUBLIC_SUPABASE_URL=https://opcsbfwqazyzsskuuooz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Current Development Workflow
**Tools & Process:**
- **IDE:** VS Code with GitHub Copilot for AI-assisted development
- **Version Control:** Git with SSH key authentication
- **Local Development:** `npm run dev` on localhost:3000
- **Deployment:** Automatic on `git push` to main branch
- **Production URL:** `https://mxn-chat-dcgsy3rde-magicwrxs-projects.vercel.app`

**Daily Workflow:**
1. Code changes in VS Code with Copilot assistance
2. Local testing via `npm run dev`
3. Git commit and push: `git add . && git commit -m "message" && git push`
4. Automatic Vercel deployment triggered
5. Production verification

⸻

## 2. 📊 Critical Monitoring Metrics

### Real-time Chat Functionality
- **Message Send Success Rate:** >99.5%
- **Message Delivery Latency:** <500ms
- **Realtime Connection Uptime:** >99.9%
- **Storage Upload Success Rate:** >99%

### Authentication
- **Login Success Rate:** >98%
- **OAuth Redirect Success:** >99%
- **Session Persistence:** 24 hours

### Performance
- **Page Load Time:** <2 seconds
- **Time to Interactive:** <3 seconds
- **Lighthouse Score:** >90
- **Core Web Vitals:** All Green

### Infrastructure
- **Vercel Deployment Success:** 100%
- **Supabase API Response:** <200ms
- **Storage Access:** <500ms
- **Database Query Time:** <100ms

⸻

## 3. 🔍 Health Check Endpoints

### Application Health
- **URL:** `https://mxn-chat-magicwrxs-projects.vercel.app`
- **Expected Response:** 200 OK
- **Content Check:** "MXN.CHAT" in title

### API Health
- **Supabase Status:** Check dashboard connectivity
- **Realtime Test:** Send test message
- **Storage Test:** Upload small file

### Database Health
- **Connection Test:** SELECT 1 from users LIMIT 1
- **Realtime Test:** Subscribe to test room
- **RLS Test:** Verify user data isolation

⸻

## 4. 🚨 Critical Failure Scenarios

### Message Sending Failures
- **Symptom:** Messages not appearing in chat
- **Possible Causes:**
  - Supabase realtime disconnected
  - Database write permissions
  - Network connectivity issues
  - Client-side JavaScript errors
  - **FIXED:** Incorrect database column names (room_id vs roomId)

### Authentication Issues
- **Symptom:** Users can't log in
- **Possible Causes:**
  - Supabase auth service down
  - OAuth redirect misconfiguration
  - Environment variables incorrect
  - CORS policy blocking

### Image Upload Failures
- **Symptom:** Images not uploading
- **Possible Causes:**
  - Storage bucket permissions
  - File size limits exceeded
  - Network upload failures
  - RLS policy violations

### Performance Degradation
- **Symptom:** Slow loading or unresponsive UI
- **Possible Causes:**
  - Vercel edge function timeouts
  - Database query optimization needed
  - Client-side memory leaks
  - Network congestion

⸻

## 5. 📈 User Experience Metrics

### Core Functionality
- **Message Send:** Must work 100% of the time
- **Message Display:** Real-time updates required
- **Image Sharing:** Upload and display working
- **Room Switching:** Instant navigation

### Mobile Experience
- **Responsive Design:** Works on all screen sizes
- **Touch Interactions:** Smooth scrolling and taps
- **PWA Ready:** Add to home screen functional

### Accessibility
- **Keyboard Navigation:** Full support
- **Screen Reader:** Compatible
- **Color Contrast:** WCAG AA compliant

⸻

## 6. 🔧 Troubleshooting Checklist

### When Messages Aren't Sending
1. Check browser console for JavaScript errors
2. Verify Supabase connection status
3. Test database write permissions
4. Check realtime subscription status
5. Verify user authentication state

### When Messages Aren't Displaying
1. Check realtime channel subscription
2. Verify room membership permissions
3. Test database read access
4. Check client-side state management
5. Verify message filtering logic

### When Images Aren't Uploading
1. Check storage bucket permissions
2. Verify file size limits
3. Test network connectivity
4. Check RLS policies
5. Validate file type restrictions

⸻

## 7. 📋 Operational Procedures

### Daily Monitoring
- Check Vercel deployment status
- Monitor Supabase dashboard metrics
- Review error logs in Vercel
- Test core functionality manually
- Verify Git push workflow is functioning

### Weekly Maintenance
- Update dependencies
- Review performance metrics
- Check storage usage
- Validate backup procedures
- Test VS Code + Copilot development workflow

### Emergency Response
- **Message Issues:** Check Supabase status page
- **Auth Issues:** Verify environment variables
- **Performance:** Scale Vercel functions if needed
- **Storage:** Monitor bucket usage limits
- **Deployment Issues:** Verify Git push access and SSH keys

### Development Workflow Monitoring
- **Copilot Integration:** Ensure VS Code Copilot is functioning
- **Git Operations:** Verify SSH key authentication works
- **Local Development:** Confirm `npm run dev` starts successfully
- **Auto-deployment:** Test that `git push` triggers Vercel deployment

⸻

## 8. 🔗 Integration Status

### Active Integrations
- **Supabase:** ✅ Production
- **Vercel:** ✅ Production
- **Google OAuth:** ✅ Configured
- **Email Auth:** ✅ Working

### Planned Integrations
- **Stripe:** Phase 1.5
- **Analytics:** Phase 2
- **Push Notifications:** Phase 1 (immediate)
- **Email Invites:** Phase 1

⸻

## 9. 📊 Success Criteria

### Phase 1 MVP Success
- [ ] 50 beta users onboarded
- [ ] Message send success rate >99%
- [ ] Image upload working for all users
- [ ] Mobile experience polished
- [ ] Authentication flows reliable

### Performance Benchmarks
- [ ] Cold start time <3 seconds
- [ ] Message delivery <500ms
- [ ] Image upload <5 seconds
- [ ] Page load <2 seconds

⸻

## 10. 📞 Support & Escalation

### Primary Contacts
- **Technical Issues:** Check Supabase/Vercel status pages
- **Code Issues:** Review GitHub repository
- **User Issues:** Monitor user feedback channels

### Escalation Path
1. **Self-Service:** Check monitoring dashboards
2. **Documentation:** Review this specs document
3. **Community:** Check user forums/discussions
4. **Support:** Contact platform providers
5. **Emergency:** Rollback to previous deployment

⸻

End of document.