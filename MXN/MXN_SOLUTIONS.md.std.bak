# MXN.CHAT Solutions Database
## Single Source of Truth for Recurring Issues

This document serves as a comprehensive reference for common issues, bugs, and their solutions encountered during MXN.CHAT development. When similar issues reoccur, reference this document first.

---
## Clean-up Prompt
Review Chat and included Scripts and Documents developed that aided in the Resolution of current issue and add solution to MXN_SOLUTIONS.md.  Scripts, Documents, *.SQL files can either be consolidated based on their value to development or deleted for clean-up sake. Issue resolutions are after remedied are reported and tracked in MXN_DEBUG.md, MXN_TESTING.md, MXN_SOLUTiONS.md.

## Issue Report
Tested on live MXN.CHAT with following issues.
Include review of MXN_SOLUTIONS.md, MXN_DEBUG.md, MXN_TESTING.md for solutions or repeating problems.

Inspect MXN_Supabase_Database_SSOT.md for structure stands, permissions, and updates or needed changes.

Google Sign-button not responding.

---

### 10. Google Sign-In Button Not Responding - Domain Mismatch
**Date:** December 15, 2025
**Status:** ✅ DIAGNOSED - Solution Identified
**Severity:** CRITICAL (Blocks user authentication)

#### **Symptoms:**
- Google Sign-In button appears but doesn't respond when clicked
- No console errors or OAuth redirect occurs
- Users cannot authenticate with Google OAuth
- Works in local development but fails on live site

#### **Root Cause Analysis:**
Domain mismatch between Supabase configuration and actual site hosting:

1. **Site URL Mismatch:** Supabase project configured with `https://mxn.chat` as site URL, but live site redirects to `https://www.mxn.chat`
2. **OAuth Redirect URIs:** Google Cloud Console redirect URIs configured for `mxn.chat` domain, but app hosted on `www.mxn.chat`
3. **DNS Configuration:** `mxn.chat` redirects (307) to `https://www.mxn.chat/`, causing OAuth callback URL mismatch

**Diagnostic Evidence:**
- `curl -I https://mxn.chat` shows `307` redirect to `https://www.mxn.chat/`
- OAuth state parameter shows `site_url: https://mxn.chat`
- Google Cloud Console redirect URIs include `https://mxn.chat/auth/v1/callback` but not `https://www.mxn.chat/auth/v1/callback`

#### **Solution Implemented:**
1. **Update Supabase Site URL:**
   - Go to Supabase Dashboard → Authentication → Settings
   - Change "Site URL" from `https://mxn.chat` to `https://www.mxn.chat`

2. **Update Google Cloud Console Redirect URIs:**
   - Go to Google Cloud Console → APIs & Credentials → OAuth 2.0 Client IDs
   - Add redirect URI: `https://www.mxn.chat/auth/v1/callback`
   - Keep existing `https://mxn.chat/auth/v1/callback` for backward compatibility

3. **Update DNS/Redirect Configuration:**
   - Ensure `mxn.chat` properly redirects to `www.mxn.chat` (currently working)
   - Consider updating Supabase site URL to use `www.mxn.chat` as primary

#### **Verification Steps:**
1. Test OAuth flow on live site (`https://www.mxn.chat`)
2. Verify Google sign-in redirects to Google and back successfully
3. Check browser console for any remaining errors
4. Test complete authentication flow (Google → profile creation → chat access)

#### **Files Modified:**
- None (Configuration changes required in external services)

#### **Prevention:**
- Always verify actual deployment domain matches Supabase site URL
- Include both root domain and www subdomain in OAuth redirect URIs
- Test OAuth flows on production domain before release

#### **Current Status:**
- Issue diagnosed and solution identified
- Requires updates to Supabase Dashboard and Google Cloud Console
- Should resolve Google Sign-In functionality on live site

---

### 11. Vercel Build Fails - Local `file:` Dependency / Ignored `dist/`
**Date:** December 29–30, 2025
**Status:** ✅ RESOLVED
**Severity:** CRITICAL (Blocks production deployment)

#### **Symptoms:**
- Vercel deployment does not update production site after GitHub push.
- Vercel build logs show:
  - `Module not found: Can't resolve '@amazing/location-filter'`
  - Import trace includes `./src/components/ChatInterface.tsx` and `./src/components/MessageList.tsx`.
- Local development works because the dependency exists on disk.

#### **Root Cause Analysis:**
This was a packaging/deployment mismatch, not a branch mismatch.

1. **Local-only dependency path**
   - `mxn-chat/package.json` referenced `@amazing/location-filter` via a local filesystem path (example pattern: `file:../../SHARED/location-filter`).
   - Vercel only checks out the Git repo being deployed, so that path does not exist in the build container.

2. **Compiled entrypoint missing in the deployed repo**
   - Even after vendoring the package into the repo (e.g., `vendor/location-filter`), the package’s `main` points to `dist/index.js`.
   - `dist/` was ignored by the app’s `.gitignore`, so the compiled output was not present in Vercel.
   - Result: webpack could not resolve the module.

#### **Solution Implemented:**
1. Vendor the shared package into the deployed repo:
   - Add `vendor/location-filter/` into the MXN Chat repo.
2. Update the dependency to a repo-relative path:
   - Set `@amazing/location-filter` to `file:./vendor/location-filter`.
3. Ensure the vendored package entrypoint exists in Vercel:
   - Un-ignore and commit `vendor/location-filter/dist/**` (or change the package to build during install).

#### **Files Modified:**
- `Websites/mxn-chat/package.json` (dependency path)
- `mxn-chat/.gitignore` (allow vendored `dist/` output)
- `mxn-chat/vendor/location-filter/dist/**` (committed build output)

#### **Verification Steps:**
1. In the deployed repo (clean environment):
   - `npm ci` (or `npm install`)
   - `npm run build`
2. In Vercel:
   - Confirm the latest deployment uses the expected commit.
   - Confirm the build completes with no `module not found` errors.

#### **Prevention Standard (Do This Every Time):**
- **No local filesystem dependencies in production deployments.** Do not use `file:../../...` paths for anything that must build on Vercel.
- If using shared packages:
  - Prefer **monorepo workspaces** (single Vercel project rooted at monorepo) OR
  - Publish packages (private registry) OR
  - Vendor packages into the repo **and commit the actual runtime entrypoint** (e.g., `dist/`).
- Add a pre-deploy check: run `npm ci && npm run build` in a clean clone (or via CI) to catch missing modules before pushing.

## Clarify Updating Documents
Ensure Documents are updated. Review chat and solved fix and add process, protocols to MXN_SOLUTIONS.md. Update MXN_INDEX.md, MXN_TREE, and MXN_SUPABASE_SCHEMA_SSOT.md with updates, fixes and corrections so faulty patterns and protocols can be avoided and improved.

## � Common Operational Procedures

### 1. Account Deletion & Cleanup
**Context:** "Deleting Accounts" is a core administrative and user-right feature.
**Procedure:**
- **User Self-Delete:** Users can delete their account from the Profile settings. This triggers a cascade delete (via Postgres `ON DELETE CASCADE` or RLS policies) for their messages and room memberships.
- **Admin Delete:** Admins can delete users via the Supabase Dashboard > Authentication > Users.
- **Data Cleanup:** Ensure `messages`, `room_members`, and `profiles` are cleaned up.

- **Membership model update (array -> join table):** We have migrated to `room_members` join table for membership management. Front-end should rely on `room_members` and not rely on `rooms.members` array for access checks.

  - *Note:* Messages are ephemeral (24h), so long-term cleanup is automatic.
  - *Note:* User aliases are released immediately upon deletion.

### 2. Posting Messages (Core Flow)
**Context:** The lifeblood of the app.
**Debug Checklist if Broken:**
1. **Check RLS:** Can the user `INSERT` into `messages`?
2. **Check Room Membership:** Is the user a member of `room_id`?
3. **Check Payload:** Ensure `author_id` matches the authenticated user (prevent spoofing).
4. **Check Subscription:** Is the client subscribed to `room:ID`? (See "Message Visibility" solution above).

---

## �🚨 Critical Issues

### 3. Supabase Insert Error "{}" - Message Sending Failure
**Date:** December 12, 2025
**Status:** 🔄 DIAGNOSING (Enhanced Error Logging Added)
**Severity:** CRITICAL (Core Functionality Broken)

#### **Symptoms:**
- Console shows: `❌ Supabase insert error: {}`
- Empty error object suggests the error details are not being captured properly
- Messages fail to send but no clear error message is displayed

#### **Root Cause Analysis:**
The error "{}" indicates the Supabase error object is empty or not being properly serialized. Common causes:

1. **RLS Policy Violation:** User doesn't have permission to insert into the room
2. **Authentication Issues:** User session expired or `auth.uid()` is null
3. **Foreign Key Constraints:** User or room doesn't exist in database
4. **Network/Connection Issues:** Supabase connection problems
5. **Schema Mismatch:** Code trying to insert with wrong column names

#### **Diagnostic Steps:**
1. **Check Authentication:**
   ```javascript
   // In browser console
   console.log('Auth user:', supabase.auth.getUser())
   console.log('Auth session:', supabase.auth.getSession())
   ```

2. **Test Direct Insert (Debug Function Added):**
   ```javascript
   // In browser console (after logging in)
   testMessageInsert()
   ```
   This will attempt a direct insert and show detailed error information.

3. **Verify Room Membership:**
   ```sql
   -- Check if user is in room members array
   SELECT id, name, members FROM rooms WHERE id = 'general';
   ```

4. **Test Direct Insert in Supabase:**
   ```sql
   -- Try inserting directly in Supabase SQL Editor
   INSERT INTO messages (room_id, author_id, text, author_name)
   VALUES ('general', 'your-user-uuid', 'test message', 'Test User');
   ```

5. **Check RLS Policies:**
   ```sql
   -- Verify policies are active
   SELECT * FROM pg_policies WHERE tablename = 'messages';
   ```

#### **Enhanced Error Logging (Implemented):**
Added detailed error logging to capture:
- `messageError.message`
- `messageError.details`
- `messageError.hint`
- `messageError.code`
- Full error object
- Authentication status check

#### **Quick Fixes to Try:**
1. **Refresh Authentication:** Log out and log back in
2. **Check Room Access:** Ensure user is a member of the target room
3. **Verify User Exists:** Confirm user profile exists in `users` table
4. **Test with Public Room:** Try sending to a public room first
5. **Use Debug Function:** Call `testMessageInsert()` in browser console

### 2. Message Visibility - Optimistic Updates
**Date:** December 12, 2025
**Status:** ✅ RESOLVED
**Severity:** HIGH (User Experience)

#### **Symptoms:**
- Users send a message but do not see it appear in the chat list immediately.
- Messages only appear after a page refresh or when switching rooms and back.
- Occurs frequently when switching between different user accounts in the same browser session.

#### **Root Cause:**
- Real-time subscriptions (`supabase.channel`) can have a slight delay or fail to re-establish quickly after account switching.
- Relying solely on the database `INSERT` event to update the UI causes a lag or missed updates if the subscription isn't active yet.

#### **Solution:**
- **Optimistic UI Updates:** Immediately add the message to the local React state upon successful API response, without waiting for the real-time subscription event.
- **Implementation in `ChatContext.tsx`:**
  ```typescript
  // Inside sendMessage function
  const { data, error } = await supabase.from('messages').insert({...}).select();
  
  if (data && data[0]) {
    // Optimistically add to local state
    dispatch({ type: 'ADD_MESSAGE', payload: data[0] });
  }
  ```
- **Benefit:** Instant feedback for the sender regardless of subscription status.

### 1. React Hydration Error - Server/Client Mismatch
**Date:** December 11, 2025  
**Status:** ✅ RESOLVED  
**Severity:** CRITICAL (blocks app loading)

#### **Symptoms:**
```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up.
```
- App fails to load properly
- Console shows hydration mismatch errors
- Browser shows blank page or broken UI

#### **Root Cause:**
Server-side rendered HTML doesn't match client-side hydration due to:
- Inline scripts with `dangerouslySetInnerHTML` containing dynamic content
- `process.env` values embedded in SSR that differ from client expectations
- Browser extensions modifying HTML before React loads

#### **Solution:**
1. **Remove problematic inline scripts** from `layout.tsx`:
   ```tsx
   // ❌ BAD - Causes hydration mismatch
   <script dangerouslySetInnerHTML={{
     __html: `window.NEXT_PUBLIC_SUPABASE_URL = '${process.env.NEXT_PUBLIC_SUPABASE_URL}';`
   }} />

   // ✅ GOOD - Let Next.js handle env vars naturally
   // Remove the script entirely
   ```

2. **Update browser tests** to extract env vars from Next.js bundle:
   ```javascript
   // Extract from bundled JavaScript instead of inline scripts
   const scripts = document.querySelectorAll('script');
   for (let script of scripts) {
     const content = script.textContent || '';
     const urlMatch = content.match(/https:\/\/[a-z0-9]+\.supabase\.co/);
     // ... extract patterns
   }
   ```

3. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   ```

4. **Restart development server**

#### **Prevention:**
- Never use `dangerouslySetInnerHTML` with dynamic server-side content
- Let Next.js handle `NEXT_PUBLIC_` environment variables automatically
- Test hydration by checking server vs client HTML output

#### **Files Modified:**
- `src/app/layout.tsx` - Removed inline script
- `public/browser-test.js` - Updated env var extraction logic
- `.next/` - Cleared cache

---

### 6. Environment Detection & Browser Test Failures (Added Dec 12, 2025)
**Date:** December 12, 2025
**Status:** ✅ RESOLVED
**Severity:** MEDIUM

#### **Symptoms:**
- Browser test reported missing `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- The Supabase client and auth UI elements were not detected by the testing script on the dedicated test page.

#### **Root Cause:**
- The test harness relied on parsing inline scripts or Next.js bundle contents, which is brittle or blocked by CSP. Some pages did not set global variables in a consistent manner.
- The Supabase client was not guaranteed to be created and attached to `window` before the tests ran.

#### **Solution Implemented:**
1. **Add meta tags** to the test page header so variables are discoverable with a standard DOM API:
```html
<meta name="NEXT_PUBLIC_SUPABASE_URL" content="https://opcsbfwqazyzsskuuooz.supabase.co" />
<meta name="NEXT_PUBLIC_SUPABASE_ANON_KEY" content="<ANON_KEY_HERE>" />
```
2. **Populate `window` and body attributes** from meta tags for robust access:
```html
<script>
window.NEXT_PUBLIC_SUPABASE_URL = document.querySelector('meta[name="NEXT_PUBLIC_SUPABASE_URL"]').content;
document.body.setAttribute('data-supabase-url', window.NEXT_PUBLIC_SUPABASE_URL);
// ... same for anon key
</script>
```
3. **Add a UMD Supabase script** and create a global `window.supabase` client instance in the test page so the test script can easily find it.
4. **Create small test auth UI** on the page (Google button with `data-provider="google"`, input `#test-email`, `#test-password`, Sign Out button, `#auth-status`) to ensure UI elements can be validated by the test.
5. **Modify `browser-test.js`** to use robust detection logic: check meta tags, `data-attributes` on the `body`, and `window.supabase` / global UMD `supabase` or `Supabase` variables rather than brittle bundle parsing.

#### **Files Modified:**
- `public/test-page.html` — added meta tags, body data attributes, Supabase UMD include, global client creation, test auth UI, and React test root `#root`.
- `public/browser-test.js` — updated detection logic for meta tags, body data attributes, and global client detection.

#### **Validation:**
1. Open the Test Page: `http://localhost:3000/test-page.html`
2. Run the browser console test:
```javascript
fetch('/browser-test.js').then(r => r.text()).then(eval)
```
3. Confirm the following pass: `Supabase URL`, `Supabase Key`, `Supabase Client`, `Google Sign-In Button`, `Email Input`, `Password Input`, and `React Root`.

#### **Prevention:**
- Use explicit meta tags or body data attributes when creating static test pages or pages intended for automated UI tests.
- Ensure global clients are created on `window` (via UMD scripts) if required by test tools.
- Update the test harness to check meta tags and body data attributes as primary sources.


---

### 2. TypeScript Compilation Error - replaceAll() Method
**Date:** December 11, 2025  
**Status:** ✅ RESOLVED  
**Severity:** CRITICAL (blocks app compilation)

#### **Symptoms:**
```
Property 'replaceAll' does not exist on type 'string'. Do you need to change your target library?
```
- Build fails with TypeScript errors
- App won't start in development

#### **Root Cause:**
`String.prototype.replaceAll()` is ES2021+ but TypeScript target is ES2020 or earlier.

#### **Solution:**
Replace `replaceAll()` with `replace()` using regex:
```typescript
// ❌ BAD - ES2021+ only
const result = str.replaceAll('-', '+').replaceAll('_', '/');

// ✅ GOOD - ES2020 compatible
const result = str.replace(/-/g, '+').replace(/_/g, '/');
```

#### **Files Modified:**
- `src/hooks/usePushNotifications.ts` - Fixed VAPID key conversion

---

### 3. Supabase Client Type Error - BufferSource Mismatch
**Date:** December 11, 2025  
**Status:** ✅ RESOLVED  
**Severity:** HIGH (blocks push notifications)

#### **Symptoms:**
```
Type 'Uint8Array<ArrayBufferLike>' is not assignable to type 'string | BufferSource | null | undefined'
```

#### **Root Cause:**
TypeScript strict typing for Push API `applicationServerKey` parameter.

#### **Solution:**
Explicitly cast return type:
```typescript
function urlBase64ToUint8Array(base64String: string): BufferSource {
  // ... conversion logic
  return outputArray as BufferSource;
}
```

#### **Files Modified:**
- `src/hooks/usePushNotifications.ts` - Fixed return type annotation

---

## 🔧 Common Development Issues

### 4. Port 3000 Already in Use
**Date:** Ongoing  
**Status:** ✅ WORKAROUND AVAILABLE  
**Severity:** MEDIUM

#### **Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

#### **Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use the start script which handles this automatically
./start-local.sh
```

#### **Prevention:**
Always use `./start-local.sh` which includes port conflict resolution.

---

### 5. Environment Variables Not Loading in Browser Tests
**Date:** Ongoing  
**Status:** ✅ SOLVED  
**Severity:** MEDIUM

#### **Symptoms:**
```
❌ Supabase URL: Not found in window object
❌ Supabase Key: Not found in window object
```

#### **Root Cause:**
Next.js `NEXT_PUBLIC_` variables aren't globally available in browser by default.

#### **Solution:**
Extract from Next.js bundle using regex patterns:
```javascript
// Look for Supabase URL pattern
const urlMatch = content.match(/https:\/\/[a-z0-9]+\.supabase\.co/);

// Look for JWT pattern (Supabase anon key)
const jwtMatch = content.match(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/);
```

#### **Files Modified:**
- `public/browser-test.js` - Enhanced env var detection

---

### 7. Profile Conflict & Orphan Users - Message Sending Failure
**Date:** December 13, 2025
**Status:** ✅ RESOLVED
**Severity:** HIGH

#### **Symptoms:**
- `409 Conflict` on `/api/upsert-public-user`
- `Foreign key constraint "messages_author_id_fkey"` error when sending messages.
- Error message: "Key is not present in table 'users'".
- User cannot send messages despite being logged in.

#### **Root Cause:**
- A "zombie" or "orphan" record exists in `public.users` with the user's email, but the corresponding `auth.users` record was deleted (e.g., via Supabase dashboard or database reset).
- When a new user signs up with the same email, they get a new UUID.
- The upsert to `public.users` fails because the email is taken by the orphan record (unique constraint).
- Consequently, the user record isn't created/updated with the new UUID.
- Message insert fails because `author_id` (new UUID) doesn't exist in `public.users`.

#### **Solution:**
1. **Orphan Cleanup Logic:** Updated `/api/upsert-public-user` to detect email conflicts.
2. **Verification:** If a conflict exists, the API checks if the conflicting ID exists in `auth.users`.
3. **Auto-Recovery:** If the conflicting ID is NOT in `auth.users` (it's an orphan), the API deletes the orphan record from `public.users` and retries the upsert.
4. **Trigger Fix:** Updated `fn_enforce_message_delete_author` to allow `service_role` to bypass checks, enabling cascade deletes of orphan users who have messages.
5. **Error Handling:** Updated `ChatContext.tsx` to catch these errors and provide clear feedback ("Profile conflict") instead of generic FK violations.

#### **Files Modified:**
- `src/app/api/upsert-public-user/route.ts` - Added orphan detection and cleanup.
- `src/contexts/ChatContext.tsx` - Improved error handling and re-throw logic.
- `supabase/migrations/20251213003000_fix_message_delete_trigger_service_role.sql` - Fixed delete trigger.

### 8. Account Deletion Failure - Missing RLS DELETE Policy
**Date:** December 13, 2025
**Status:** ✅ DIAGNOSED - Solution Implemented
**Severity:** CRITICAL (Account deletion completely broken)

#### **Symptoms:**
- Users click "Delete Account" but it fails silently or shows generic error
- Console shows API call to `/api/delete-account` but deletion doesn't complete
- User remains logged in after attempting deletion
- No error messages in debug logs

#### **Root Cause:**
The `public.users` table has RLS (Row Level Security) enabled, but **no DELETE policy** was defined. Even the `service_role` (which has admin privileges) cannot delete records without an explicit RLS policy allowing DELETE operations.

The delete-account API attempts to:
1. Delete from `public.users` table using service_role
2. Delete from `auth.users` using admin API

But step 1 fails due to missing RLS DELETE policy.

#### **Diagnostic Steps:**
1. **Check RLS Policies:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'users';
   -- Should show policies for SELECT, INSERT, UPDATE but no DELETE
   ```

2. **Test Direct Deletion:**
   ```javascript
   // In browser console with service role key
   const supabaseAdmin = createClient(url, serviceRoleKey);
   const { error } = await supabaseAdmin.from('users').delete().eq('id', userId);
   console.log('Delete error:', error); // Will show RLS violation
   ```

3. **Verify Service Role JWT:**
   ```javascript
   const { data } = await supabaseAdmin.auth.getUser();
   console.log('JWT role:', data.user?.app_metadata?.role); // Should be 'service_role'
   ```

#### **Solution Implemented:**
Added missing RLS DELETE policy for service_role:

```sql
-- Migration: 20251213004000_add_users_delete_policy.sql
DROP POLICY IF EXISTS "Service role can delete users" ON public.users;
CREATE POLICY "Service role can delete users" ON public.users 
FOR DELETE USING (auth.jwt() ->> 'role' = 'service_role');
```

#### **Files Modified:**
- `supabase-fix-all.sql` - Added DELETE policy
- `supabase/migrations/20251213004000_add_users_delete_policy.sql` - New migration file

#### **Verification:**
After applying the migration:
1. Account deletion should work normally
2. Users can successfully delete their accounts
3. Cascade deletes work for messages and room memberships

#### **Prevention:**
- Always audit RLS policies for all CRUD operations
- Include DELETE policies when RLS is enabled
- Test admin/service_role operations thoroughly

---

### 8. Account Deletion Failure (500 Error)
**Date:** December 13, 2025
**Status:** ✅ SOLVED
**Severity:** HIGH (User Data Management)

#### **Symptoms:**
- User clicks "Delete Account" and receives an error.
- Console logs: `Error deleting account: – Error: Failed to delete user rows`.
- Network tab shows 500 Internal Server Error for `/api/delete-account`.

#### **Root Cause Analysis:**
1. **Missing RLS Policy:** `public.users` table had no DELETE policy, preventing even `service_role` from deleting rows if RLS was strictly enforced or if the client wasn't bypassing it correctly (though `service_role` usually bypasses, explicit policies are safer).
2. **Foreign Key Constraint:** `public.invitations` table referenced `users.id` without `ON DELETE CASCADE`. Deleting a user who sent invitations failed.
3. **Trigger Blocking:** `fn_enforce_message_delete_author` trigger on `messages` table raised an exception because `service_role` (used during cascade delete) did not match the message author.

#### **Solution:**
Applied migration `20251213010000_fix_account_deletion_blockers.sql` which:
1. Added `ON DELETE CASCADE` to `invitations.sender_id`.
2. Updated `fn_enforce_message_delete_author` to explicitly allow `service_role`.
3. Added a DELETE policy for `service_role` on `public.users`.

#### **Prevention:**
- Always use `ON DELETE CASCADE` for foreign keys referencing `users.id` if the data should be cleaned up when the user is deleted.
- Ensure triggers handle `service_role` or admin overrides.

---

### 9. Account Deletion Freeze & Realtime Errors
**Date:** December 14, 2025
**Status:** ✅ RESOLVED
**Severity:** HIGH (User Experience)

#### **Symptoms:**
- UI freezes after clicking "Delete Account".
- Console errors: `❌ Realtime channel error for room ...`
- Network errors: `400` or `406` on `users` table requests.

#### **Root Cause:**
- **Zombie Subscriptions:** The `ChatContext` created a realtime subscription for rooms (`loadUserRooms`) but never unsubscribed from it when the user logged out (or was deleted).
- **Race Condition:** When the account is deleted, the auth session is invalidated. The active subscription tries to reconnect or fetch data using the now-invalid token, causing Supabase to reject the request with 400/406 errors.
- **UI Freeze:** The flood of errors or the unhandled promise rejection in the background might have caused the UI state to get stuck or the browser to throttle.

#### **Solution:**
- **Managed Subscriptions:** Implemented `roomsSubscriptionRef` in `ChatContext` to track the rooms channel.
- **Cleanup on Logout:** Added explicit cleanup logic in `onAuthStateChange` to remove all channels (`rooms` and `messages`) when the session is cleared (`!session?.user`).

#### **Files Modified:**
- `src/contexts/ChatContext.tsx` - Added subscription refs and cleanup logic.

---

## 📝 Issue Logging Template

When adding new issues, use this template:

### Issue Title
**Date:** YYYY-MM-DD  
**Status:** [OPEN|RESOLVED|WORKAROUND]  
**Severity:** [CRITICAL|HIGH|MEDIUM|LOW]

#### **Symptoms:**
- Bullet point description of error messages/behavior

#### **Root Cause:**
- Technical explanation of why it happens

#### **Solution:**
1. Step-by-step fix instructions
2. Code examples if applicable

#### **Prevention:**
- How to avoid this issue in the future

#### **Files Modified:**
- List of files changed

---

## 📊 Issue Statistics

- **Total Issues Logged:** 9
- **Critical Issues:** 5 (56%)
- **Resolved:** 8 (89%)
- **Diagnosed (Pending Fix):** 1 (11%)
- **Most Common Category:** Authentication & OAuth Configuration

---

*Last Updated: December 15, 2025*