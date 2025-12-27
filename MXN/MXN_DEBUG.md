# MXN.CHAT Debug Panel Documentation

**Document Date:** December 13, 2025
**Version:** 1.1
**Status:** Active

---

## Prompt for DEBUGGING
Review MXN_DEBUG.md, MXN_TESTING.md, and MXN_SOLUTIONS.md for problem solving tips or reocurances. 

## Overview

The MXN.CHAT debug panel provides developers and administrators with real-time system information, authentication status, and debugging tools. By default, the debug panel is hidden in production to maintain a clean user experience.

---

## Debug Panel Features

### Current Information Displayed
- **Authentication Status:** Current user state, session info
- **Room Data:** Active rooms, member counts, message counts
- **Real-time Events:** Connection status, subscription health
- **System Metrics:** Performance data, error logs
- **Environment Info:** Build version, environment variables

### Debug Tools

### 🛠️ Development Scripts (SSOT)
These scripts are the primary tools for diagnosing and managing the MXN.CHAT environment.

- `scripts/test_rls.js` — runs automated checks to validate RLS policies for public/private rooms and member/non-member access. See `DOCs/MXN/MXN_TESTING.md` for usage and environment variables.

#### 1. Health Check (`scripts/health-check.sh`)
**Purpose:** Comprehensive validation of environment, database, DNS, and auth configuration.
**Usage:**
```bash
./scripts/health-check.sh
```
**Checks:**
- `.env.local` variables presence
- Node.js & npm versions
- Supabase connectivity (via curl)
- DNS resolution for configured domains
- Auth configuration validation

#### 2. Development Manager (`scripts/dev-manager.sh`)
**Purpose:** Unified interface for starting, stopping, and cleaning the dev environment.
**Usage:**
```bash
./scripts/dev-manager.sh [start|stop|restart|check|clean]
```
- `start`: Runs `npm run dev` (clears port 3000 first)
- `stop`: Kills process on port 3000
- `check`: Runs `health-check.sh`
- `clean`: Removes `.next` cache (use if build is stuck)

#### 3. Auth & DNS Validator (`check-auth-dns.sh`)
**Purpose:** Specialized deep-dive into Auth and DNS settings.
**Usage:**
```bash
./check-auth-dns.sh
```

#### 4. Message Insert Test (`testMessageInsert()`)
**Purpose:** Test direct message insertion to isolate RLS policy or authentication issues.
**Usage:**
```javascript
// In browser console (after logging in)
testMessageInsert()
```
**What it does:**
- Checks current authentication status
- Attempts to insert a test message into the 'general' room
- Logs detailed success/failure information
- Helps isolate whether the issue is with the UI logic or database permissions

---

## Reactivating the Debug Panel

### Method 1: Browser Console (Recommended)
1. Open MXN.CHAT in your browser
2. Press `F12` or `Ctrl+Shift+I` (Cmd+Option+I on Mac) to open Developer Tools
3. Go to the **Console** tab
4. Paste and run this command:
   ```javascript
   localStorage.setItem('mxn_debug_enabled', 'true');
   location.reload();
   ```
5. The debug panel will appear in the bottom-right corner

### Method 2: URL Parameter (Temporary)
1. Add `?debug=true` to any MXN.CHAT URL
2. Example: `https://mxn.chat/?debug=true`
3. The debug panel will be visible for that session only

### Method 3: Local Storage (Persistent)
1. Open Browser Developer Tools → Application → Local Storage
2. Add key: `mxn_debug_enabled`
3. Set value: `true`
4. Refresh the page

---

## Hiding the Debug Panel

### Method 1: Debug Panel Button
1. Click the "Hide Debug" button in the debug panel
2. The panel will be hidden and the setting saved

### Method 2: Browser Console
```javascript
localStorage.removeItem('mxn_debug_enabled');
location.reload();
```

### Method 3: Clear Local Storage
1. Open Browser Developer Tools → Application → Local Storage
2. Delete the `mxn_debug_enabled` key
3. Refresh the page

---

## Debug Panel Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+D` | Toggle debug panel |
| `Ctrl+Shift+R` | Force refresh all data |
| `Ctrl+Shift+L` | Export debug logs |

#### 5. Account Deletion Test (`testAccountDeletion()`)
**Purpose:** Test the complete account deletion flow including RLS policy validation.
**Usage:**
```javascript
// In browser console (after logging in)
testAccountDeletion()
```
**What it does:**
- Attempts to delete the current user's account
- Validates that all related data (messages, memberships) are cascade deleted
- Checks that auth user is removed
- Provides detailed success/failure logging

**Common Issues:**
- **RLS Policy Missing:** `DELETE policy for users table not found`
- **Service Role Invalid:** `JWT role not service_role`
- **Cascade Delete Blocked:** `Message delete trigger violation`

---

## Troubleshooting

### Debug Panel Not Appearing
- Ensure you're logged in to MXN.CHAT
- Check browser console for JavaScript errors
- Try clearing browser cache and cookies
- Verify localStorage is enabled in browser settings

### Debug Panel Not Saving State
- Check if browser is in incognito/private mode
- Verify localStorage permissions
- Try different browser or device

### Performance Issues with Debug Panel
- The debug panel may impact performance in production
- Consider using it only when needed
- Close the panel when not debugging

### Account Deletion Issues
- **Symptom:** Delete button doesn't work or shows error
- **Check:** Ensure RLS DELETE policy exists for users table
- **Fix:** Apply migration `20251213004000_add_users_delete_policy.sql`
- **Test:** Use `testAccountDeletion()` debug function

---

## Security Considerations

- **Production Use:** Debug panel should be hidden in production environments
- **Sensitive Data:** Debug panel may display user tokens and session data
- **Access Control:** Only enable debug mode when necessary for troubleshooting
- **Cleanup:** Always disable debug mode after use

---

## Support

If you encounter issues with the debug panel:

1. Check this documentation first
2. Try the troubleshooting steps above
3. Contact support with debug logs if needed
4. Include browser type, version, and steps to reproduce

---

*This document is part of the MXN System Documentation (SSOT). Updates should be reflected in all related documentation files.*