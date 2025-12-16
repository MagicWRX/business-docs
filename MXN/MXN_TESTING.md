# MXN.CHAT Testing Framework & Tools (SSOT)

---
## Testing Prompt
Review Current status of MXN_ROADMAP.md, MXN_FEATURES.md, MXN_LIFECYCLE.md, MXN_SUPABASE_DB_SSOT.md, MXN_TREE.md and access proper testing for for scripts, users, and database.

Run Tests and Report.

**RLS Tests**
: A new RLS policy test script was added at `scripts/test_rls.js`. Set the following environment variables to run the script:

**Rollback Tool**
: Rollback SQL migrations are provided under `supabase/migrations/` with timestamps. To apply rollback migration(s) locally, run the helper script:

```bash
# Apply all rollback migrations (requires psql and DATABASE_URL or SUPABASE_DB_URL set)
npm run rollback:migrations

# Apply a single rollback migration (pass filename)
./scripts/rollback_migrations.sh 20251212099000_rollback_add_room_members.sql
```

Notes:
- The rollback helper uses `psql` with `DATABASE_URL` or `SUPABASE_DB_URL` env var; if you prefer, use the `supabase` CLI or the SQL editor to run rollback files.
- Rollbacks are destructive (e.g., dropping `room_members`); create backups before running them, and run tests to validate the rollback.
- After rollbacks, run `scripts/test_rls.js` and `scripts/e2e_lifecycle.js` in a staging environment to verify policies and features.


- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RLS_TEST_PUBLIC_ROOM_ID` (optional, default `general`)
- `RLS_TEST_PRIVATE_ROOM_ID` (optional, default `private_test_room`)
- `RLS_TEST_MEMBER_EMAIL` / `RLS_TEST_MEMBER_PASSWORD`
- `RLS_TEST_NON_MEMBER_EMAIL` / `RLS_TEST_NON_MEMBER_PASSWORD`

Run the script with:

```bash
npm run test:rls
```

Expected outcomes:
- Unauthenticated or non-member cannot read private room messages nor insert; member can.
- Anonymous user can read public room messages.

Note: To run in GitHub Actions, set repository secrets for the test accounts and Supabase keys: `RLS_SUPABASE_URL`, `RLS_SUPABASE_ANON_KEY`, `RLS_TEST_PUBLIC_ROOM_ID`, `RLS_TEST_PRIVATE_ROOM_ID`, `RLS_TEST_MEMBER_EMAIL`, `RLS_TEST_MEMBER_PASSWORD`, `RLS_TEST_NON_MEMBER_EMAIL`, `RLS_TEST_NON_MEMBER_PASSWORD`.

Ensure test accounts are present in your test/staging environment and have the expected membership state before running the RLS tests.

## E2E Invite / Lifecycle tests
- `scripts/e2e_invite_flow.js` — tests invite -> signup -> membership -> message send flow.
- `scripts/e2e_lifecycle.js` — broader lifecycle checks: invite, membership, message CRUD, public/private room read checks.

Run E2E scripts locally:
```
npm run test:e2e:invite
npm run test:e2e:lifecycle
```

CI workflows are provided:
- `.github/workflows/e2e-invite.yml`
- `.github/workflows/e2e-lifecycle.yml`
- `.github/workflows/ci-pr-checks.yml` (orchestrates TypeScript, RLS, and E2E checks on PRs)

Branch protection (recommended)
- To enforce CI gating automatically, use the `scripts/provision_branch_protection.sh` script to set branch protection for `main` and require the following checks:
  - CI PR Checks
  - RLS Policy Tests
  - E2E Invite Flow Tests
  - E2E Lifecycle Tests

Provision example (admin only):
```bash
export GH_REPO="owner/repo"
export GH_TOKEN="<PAT-with-admin>
# Run provisioning script
npm run provision:branch-protection
```

Note: Branch-protection requires a token with admin permission and should be done by a repository admin. If you'd rather not provide a token, you can manually add these checks to branch protection settings in the GitHub UI (Settings -> Branches -> Branch protection rules).



**Document Date:** December 12, 2025
**Last Updated:** December 12, 2025
**Version:** 1.0
**Status:** Active - Core Testing Infrastructure
**Compliance:** AI_STANDARDS.md

---

## 🎯 Purpose

This document serves as the **Single Source of Truth (SSOT)** for all MXN.CHAT testing tools, frameworks, and procedures. It consolidates testing capabilities, eliminates redundant tools, and provides comprehensive safeguards for system operations.

---

## 🏗️ Testing Hierarchy & Architecture

### Communication Structure
```
Topic (Category/Themed Discussion)
├── Room (Group Chat within Topic)
│   └── 1-on-1 (Private Direct Messages)
```

### Testing Levels
1. **Unit Tests** - Individual functions and components
2. **Integration Tests** - API endpoints and database operations
3. **E2E Tests** - Full user workflows and system interactions
4. **Performance Tests** - Load testing and scalability validation

---

## 🛠️ Core Testing Tools (Consolidated)

### 1. Health Check Suite (`scripts/health-check.sh`)
**Status:** ✅ ACTIVE | **Consolidated:** Replaces multiple individual checks
**Purpose:** Comprehensive system validation before testing

**Capabilities:**
- Environment variable validation
- Network connectivity testing
- DNS configuration verification
- Supabase connection validation
- Node.js/npm version checking

**Usage:**
```bash
./scripts/health-check.sh
```

### 2. Development Manager (`scripts/dev-manager.sh`)
**Status:** ✅ ACTIVE | **Consolidated:** Replaces manual npm/dev commands
**Purpose:** Unified development environment management

**Capabilities:**
- Start/stop development server
- Port conflict resolution
- Cache cleaning
- Environment validation
- Process monitoring

**Usage:**
```bash
./scripts/dev-manager.sh [start|stop|restart|check|clean]
```

### 3. End-to-End Test Suite (`scripts/e2e_test.js`)
**Status:** ✅ ACTIVE | **Consolidated:** Primary E2E testing framework
**Purpose:** Automated user workflow validation

**Capabilities:**
- User registration/authentication
- Message sending/receiving
- Room creation and navigation
- Real-time subscription testing
- Error handling validation

**Usage:**
```bash
node scripts/e2e_test.js
```

### 4. Authentication & DNS Validator (`check-auth-dns.sh`)
**Status:** ✅ ACTIVE | **Consolidated:** Auth + DNS validation
**Purpose:** Deep-dive authentication and DNS configuration testing

**Capabilities:**
- OAuth flow validation
- DNS record verification
- Email delivery testing
- SSL certificate validation
- Domain authentication checks

**Usage:**
```bash
./check-auth-dns.sh
```

### 5. System Diagnostic Tool (`scripts/diagnose_system.js`)
**Status:** ✅ ACTIVE | **Consolidated:** Replaces ad-hoc debug scripts
**Purpose:** Deep-dive system diagnostics and integrity checks

**Capabilities:**
- **Inspect Policies:** Checks read accessibility for core tables (anon vs admin).
- **Check Orphans:** Scans `public.users` for records without matching `auth.users` entries (prevents "Profile Conflict" errors).
- **Simulate Message:** Tests message insertion integrity (FK constraints) for a specific user ID.

**Usage:**
```bash
# Check for orphan users
node scripts/diagnose_system.js check-orphans

# Inspect table accessibility
node scripts/diagnose_system.js inspect

# Simulate message send (requires user UUID)
node scripts/diagnose_system.js simulate-msg <user_uuid> [room_id]
```

---

## 🛡️ System Safeguards Implementation

**Invite tests (Room invites)**
- Use `/api/send-invite` with optional `roomId` to create room-scoped invitations.
- Accept invites using `/invite/[token]`. If signed-in, the accept flow will add the user to `room_members` for the `invite.room_id` if present. If not signed in, the invite page redirects to signup with `invite` token and the `AuthForm` will attempt to accept the invite post-signup.


### 1. RLS Policy Violation Protection
**Status:** ✅ IMPLEMENTED | **Location:** ChatContext.tsx, Database Policies

**Safeguards:**
- Pre-insert permission validation
- User authentication verification
- Room membership confirmation
- Policy compliance checking

**Code Implementation:**
```typescript
// Pre-insert validation in sendMessage()
const { data: { user }, error: authError } = await supabase.auth.getUser();
if (!user || authError) {
  throw new Error('Authentication required for message sending');
}

// Room access validation
const { data: room } = await supabase
  .from('rooms')
  .select('type, members')
  .eq('id', roomId)
  .single();

if (room.type !== 'public' && !room.members.includes(user.id)) {
  throw new Error('User not authorized for this room');
}
```

### 2. Authentication Issues Protection
**Status:** ✅ IMPLEMENTED | **Location:** ChatContext.tsx, Auth Middleware

**Safeguards:**
- Session validation before operations
- Automatic token refresh
- Auth state monitoring
- Graceful degradation on auth failure

**Code Implementation:**
```typescript
// Auth state monitoring
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || !session) {
      // Clear sensitive data
      dispatch({ type: 'SET_USER', payload: null });
      dispatch({ type: 'SET_ROOMS', payload: [] });
      // Redirect to login
    }
  });
}, []);
```

### 3. Room Membership Protection
**Status:** ✅ IMPLEMENTED | **Location:** ChatContext.tsx, Room Management

**Safeguards:**
- Automatic user addition to accessible rooms
- Membership validation before operations
- Room permission inheritance
- Membership cleanup on user deletion

**Code Implementation:**
```typescript
// Auto-add user to public rooms on login
const addUserToPublicRooms = async (userId: string) => {
  const { data: publicRooms } = await supabase
    .from('rooms')
    .select('id, members')
    .eq('type', 'public');

  for (const room of publicRooms || []) {
    if (!room.members.includes(userId)) {
      await supabase
        .from('rooms')
        .update({ members: [...room.members, userId] })
        .eq('id', room.id);
    }
  }
};
```

### 4. Schema/Network Issues Protection
**Status:** ✅ IMPLEMENTED | **Location:** Error Handling, Network Layer

**Safeguards:**
- Comprehensive error logging
- Network retry logic
- Schema validation
- Connection health monitoring

**Code Implementation:**
```typescript
// Enhanced error handling with retry logic
const executeWithRetry = async (operation: () => Promise<any>, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);

      if (attempt === maxRetries) throw error;

      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
};
```

---

## 🔧 Operation-Specific Safeguards

### Message Operations

#### Creating Messages
**Pre-conditions:**
- User authenticated and session valid
- User has permission for target room
- Message content meets requirements
- Rate limiting not exceeded

**Validation Code:**
```typescript
const validateMessageCreation = (user: User, roomId: string, content: string) => {
  if (!user?.id) throw new Error('Authentication required');
  if (!roomId) throw new Error('Room selection required');
  if (!content?.trim()) throw new Error('Message content required');
  if (content.length > 2000) throw new Error('Message too long');

  // Rate limiting check (implement as needed)
  // const recentMessages = await checkRateLimit(user.id);
};
```

#### Deleting Messages
**Pre-conditions:**
- User owns the message OR has admin privileges
- Message exists and is not already deleted
- Within deletion time window (if applicable)

**Validation Code:**
```typescript
const validateMessageDeletion = async (user: User, messageId: string) => {
  const { data: message } = await supabase
    .from('messages')
    .select('author_id, created_at')
    .eq('id', messageId)
    .single();

  if (!message) throw new Error('Message not found');

  const isOwner = message.author_id === user.id;
  const isAdmin = user.accountType === 'admin';
  const withinTimeLimit = Date.now() - new Date(message.created_at).getTime() < 10 * 60 * 1000; // 10 minutes

  if (!isOwner && !isAdmin) throw new Error('Unauthorized to delete message');
  if (!isOwner && !withinTimeLimit) throw new Error('Deletion time limit exceeded');
};
```

### Account Operations

#### Creating Accounts
**Pre-conditions:**
- Email not already registered
- Valid email format
- Password meets requirements
- Not rate limited

**Validation Code:**
```typescript
const validateAccountCreation = async (email: string, password: string) => {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error('Invalid email format');

  // Check existing user
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) throw new Error('Email already registered');

  // Password validation
  if (password.length < 8) throw new Error('Password too short');
};
```

#### Deleting Accounts
**Pre-conditions:**
- User authenticated
- Account ownership confirmed
- No pending operations
- Data cleanup possible

**Validation Code:**
```typescript
const validateAccountDeletion = async (user: User, confirmationText: string) => {
  if (!user?.id) throw new Error('Authentication required');

  // Require typing account name for confirmation
  if (confirmationText !== user.displayName) {
    throw new Error('Confirmation text does not match account name');
  }

  // Check for pending operations (implement as needed)
  // const pendingOps = await checkPendingOperations(user.id);
  // if (pendingOps.length > 0) throw new Error('Cannot delete account with pending operations');
};
```

### Topic/Room Operations

#### Creating Topics/Rooms
**Pre-conditions:**
- User authenticated
- Valid name and description
- No duplicate names
- User has creation permissions

**Validation Code:**
```typescript
const validateRoomCreation = async (user: User, name: string, type: string) => {
  if (!user?.id) throw new Error('Authentication required');
  if (!name?.trim()) throw new Error('Room name required');
  if (name.length > 50) throw new Error('Room name too long');

  // Check for duplicate names
  const { data: existingRoom } = await supabase
    .from('rooms')
    .select('id')
    .eq('name', name.trim())
    .single();

  if (existingRoom) throw new Error('Room name already exists');

  // Permission check (implement role-based logic)
  if (type === 'private' && user.accountType !== 'premium') {
    throw new Error('Premium account required for private rooms');
  }
};
```

#### Deleting Topics/Rooms
**Pre-conditions:**
- User is room owner/admin
- Room is empty or user confirms deletion
- No active operations in room

**Validation Code:**
```typescript
const validateRoomDeletion = async (user: User, roomId: string, confirmText: string) => {
  const { data: room } = await supabase
    .from('rooms')
    .select('name, created_by, members')
    .eq('id', roomId)
    .single();

  if (!room) throw new Error('Room not found');

  const isOwner = room.created_by === user.id;
  const isAdmin = user.accountType === 'admin';

  if (!isOwner && !isAdmin) throw new Error('Unauthorized to delete room');

  // Require typing room name for confirmation
  if (confirmText !== room.name) {
    throw new Error('Confirmation text does not match room name');
  }

  // Check if room has active members (optional warning)
  if (room.members.length > 1) {
    console.warn(`Room ${room.name} has ${room.members.length} members`);
  }
};
```

---

## 🧪 Testing Procedures

### Automated Test Execution
```bash
# Full test suite
npm run test:all

# Individual test categories
npm run test:unit      # Unit tests
npm run test:integration # API/DB tests
npm run test:e2e       # End-to-end tests
npm run test:performance # Load tests
# RLS policy tests
npm run test:rls
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Message sending in public rooms
- [ ] Message sending in private rooms
- [ ] Room creation and deletion
- [ ] User account management
- [ ] Real-time message updates
- [ ] Error handling and recovery

### Performance Testing
- Concurrent user simulation
- Message throughput testing
- Database query performance
- Network latency validation

---

## 📊 Testing Metrics & Monitoring

### Success Criteria
- **Unit Tests:** >90% coverage
- **Integration Tests:** All API endpoints tested
- **E2E Tests:** All user workflows functional
- **Performance:** <2s response time under normal load

### Monitoring Tools
- Real-time error tracking
- Performance dashboards
- Automated alerting
- Test result archiving

---

## 🔄 Continuous Integration

### Pre-deployment Checks
```bash
# Automated CI pipeline
./scripts/ci-check.sh    # Code quality and security
./scripts/test-all.sh    # Full test suite
./scripts/health-check.sh # System validation
```

### Deployment Safeguards
- Automated rollback on test failures
- Gradual rollout with feature flags
- Performance monitoring post-deployment
- User feedback collection

---

## 📝 Future Testing Enhancements

### Planned Improvements
- [ ] Visual regression testing
- [ ] Accessibility testing suite
- [ ] Mobile device testing
- [ ] Cross-browser compatibility
- [ ] Load testing with 1000+ concurrent users
- [ ] Automated security vulnerability scanning

### Tool Consolidation Opportunities
- [ ] Merge similar validation functions
- [ ] Standardize error handling patterns
- [ ] Create reusable testing utilities
- [ ] Implement testing best practices library</content>
<parameter name="filePath">/Users/brianlindahl/Development/Business/DOCs/MXN/MXN_TESTING.md