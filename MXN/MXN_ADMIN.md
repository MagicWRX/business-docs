# MXN.CHAT Admin & Testing Guide

## Single Source of Truth (SSOT) for Administration

### 1. Admin Accounts
Admin accounts have special privileges in the system:
- **Access**: Can access all private rooms.
- **Management**: Can delete any message or room.
- **Monetization**: Bypass some limits (like alias counts).
- **Testing**: Can create unlimited aliases for testing.

#### Designated Admin Email
The primary admin email is: `magicwrxstudio@gmail.com`

### 2. Tester Accounts
We use a set of standardized tester accounts for QA. These accounts are identified by email aliases of the main admin email.

**Email Pattern**: All tester emails forward to `magicwrxstudio@gmail.com`. The actual signup email for each tester is `magicwrxstudio+[alias]@gmail.com` (where [alias] is the tester's primary alias in lowercase).

**Note**: When sending test emails (e.g., invites, notifications), use subjects like "Admin Alias - [Alias Name]" (e.g., "Admin Alias - Mosu") to identify the specific tester account.

| Tester ID | Email | Role | Special Rules | Alias | Testing Scenarios |
|-----------|-------|------|---------------|-------|-------------------|
| Admin | `magicwrxstudio@gmail.com` | **Super Admin** | Aliases never expire. Unlimited slots. | Godzilla | Admin privileges, unlimited aliases, RLS bypass, message/room deletion, full system control |
| Tester 01 | `magicwrxstudio@gmail.com` | Premium User | Purchased $2.99: Reserve 7 aliases (annual). | Shodai | Create multiple aliases, purchase $2.99 tier, login/logout cycles, alias switching |
| Tester 02 | `magicwrxstudio@gmail.com` | Standard User | 30-day expiry. | Gyakushū | Standard user flow, 30-day expiration testing, alias auto-deletion after inactivity |
| Tester 03 | `magicwrxstudio@gmail.com` | Standard User | Purchased $1.99: Single alias keep (never expires). | Mosu | Purchase $1.99 tier, single alias reservation, test never-expire logic |
| Tester 04 | `magicwrxstudio@gmail.com` | Standard User | Purchased $3.99: 3 aliases (30-day resets) + 7 annual. | Dai Senso | Purchase $3.99 tier, mixed expiry logic, create additional aliases, test reset behavior |
| Tester 05 | `magicwrxstudio@gmail.com` | Standard User | Purchased $4.99: 3 aliases (30-day resets) + 14 annual. | San Daikaiju | Purchase $4.99 tier, create 14+ aliases, test slot limits, login/logout |
| Tester 06 | `magicwrxstudio@gmail.com` | Standard User | Purchased $8.99: 28 alias annual reservations. | Ebirah | Purchase $8.99 tier (max tier), create 28 aliases, test maximum slot usage |
| Tester 07 | `magicwrxstudio@gmail.com` | Standard User | 1 minute expiry. | Gaira | Rapid expiration testing, alias auto-delete after 1 minute inactivity |
| Tester 08 | `magicwrxstudio@gmail.com` | Standard User | 8 hours expiry. | Soshingeki | Medium expiration testing, alias auto-delete after 8 hours inactivity |
| Tester 09 | `magicwrxstudio@gmail.com` | Standard User | 30-day expiry. | Hedorah | Standard 30-day expiration, test long-term inactivity cleanup |
| Tester 10 | `magicwrxstudio@gmail.com` | Standard User | Account deletion testing. | Gigan | Create account, create aliases, delete account, verify data cleanup |
| Tester 11 | `magicwrxstudio@gmail.com` | Standard User | Login/logout stress testing. | Megaro | Repeated login/logout cycles, session management, token refresh testing |
| Tester 12 | `magicwrxstudio@gmail.com` | Standard User | RLS member access. | Meka | RLS testing - member access to private rooms, message read/write permissions |
| Tester 13 | `magicwrxstudio@gmail.com` | Standard User | RLS non-member restrictions. | Brian | RLS testing - non-member restrictions, blocked access to private rooms |
| Tester 14 | `magicwrxstudio@gmail.com` | Standard User | E2E invite & lifecycle testing. | Brian Lindahl | E2E flow: invite -> signup -> membership -> message CRUD -> room access -> account deletion |


### 3. Setup Instructions

#### A. Database Setup
Run the `supabase/seeds/admin_setup.sql` script in your Supabase SQL Editor. This script will:
1.  Promote `magicwrxstudio@gmail.com` to `admin`.
2.  Set `magicwrxstudio+tester1@gmail.com` to `premium`.
3.  Ensure aliases for Admin and Tester 1 do not expire.

#### B. Creating Testers
Since we cannot programmatically create Auth users with passwords via SQL (for security), you must:
1.  Go to the App (localhost:3000).
2.  Sign up manually with `magicwrxstudio+tester1@gmail.com`, etc.
3.  **After signup**, run the `admin_setup.sql` script again to apply permissions.

### 4. Maintenance Scripts

**Reset Testers**:
To wipe all tester data (messages, rooms) but keep the accounts:
```sql
-- Run in Supabase SQL Editor
DELETE FROM messages WHERE author_id IN (SELECT id FROM users WHERE email LIKE 'magicwrxstudio%');
DELETE FROM rooms WHERE created_by IN (SELECT id FROM users WHERE email LIKE 'magicwrxstudio%');
```

**Force Expiry Check**:
To test the 30-day expiry logic:
```sql
UPDATE aliases SET expires_at = NOW() - INTERVAL '1 day' WHERE user_id = [TESTER_UUID];
```
