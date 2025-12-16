# MXN Supabase Database SSOT

**Document Date:** December 12, 2025
**Status:** Production Active
**Owner:** MagicWRX Development Team

## Purpose
This document is a concise, authoritative Single Source of Truth (SSOT) for MXN's Supabase database schema, RLS policies, triggers, publications, and QA/maintenance guidance. It consolidates the current setup implemented in `supabase-fix-all.sql` and `supabase-debug-signup.sql` and includes recommendations to harden and improve the schema.

**Note about files:**
- `DOCs/MXN/MXN_SUPABASE_SCHEMA.md` contains the SQL reference and complete table definitions.
- `DOCs/MXN/MXN_SUPABASE_DB_SSOT.md` (this file) is the canonical narrative SSOT the team should refer to for policy, migration, design decisions, and action items.
- Maintain both files: SQL as technical reference, SSOT as the human-readable canonical doc.

## Files Reviewed
- `supabase-fix-all.sql` — Consolidated setup and fix script for core schema, triggers, policies, and realtime publication.
- `supabase-debug-signup.sql` — Debugging script that adds a `debug_logs` table and wraps `handle_new_user()` with exception logging.
- `DOCs/MXN/MXN_SUPABASE_SCHEMA.md` — Existing schema SQL overview (legacy/alternate layout).

## High-level Architecture
- Database: Supabase Postgres with RLS (Row Level Security) enforced on all application tables.
- Realtime: Postgres publications (`supabase_realtime`) added for key tables to support Realtime events.
- Auth: Supabase `auth.users` triggers to populate `public.users` via `handle_new_user()` trigger function.

## Entities & Key Columns (Current Implementation)

### Core Tables

- `public.users`
  - `id UUID` (references `auth.users(id)`), `email`, `display_name`, `avatar`, `status`, `last_seen`, `account_type`, timestamps, arrays for `friends` & `invites`.
  - Trigger: `handle_new_user()` populates `public.users`.
  - Policies: SELECT allowed to public (true); insert/update restricted to owner (auth.uid() = id); DELETE allowed for `service_role` (Dec 13, 2025).

- `public.rooms` / (formerly `conversations` in other doc)
  - `id TEXT` primary key, `name`, `description`, `type`, `members UUID[]`, `last_message JSONB`, `last_activity`.
  - Policies: SELECT public (true), INSERT auth required, UPDATE allowed (policy uses USING true — refine required).

- `public.room_members` (join table - implemented Dec 12, 2025)
  - `room_id TEXT`, `user_id UUID`, `role TEXT`, `joined_at TIMESTAMPTZ`.
  - Policies: SELECT for room members, INSERT for room creator/admin, DELETE for admin/self.

- `public.messages`
  - `id UUID`, `room_id`, `author_id`, `author_name`, `author_avatar`, `text`, `type`, `image_url`, `timestamp`, `edited`, `reactions JSONB`.
  - Policies: SELECT public, INSERT/UPDATE requires auth.uid() = author_id.
  - Trigger: `fn_enforce_message_delete_author` ensures only author can delete (updated Dec 13, 2025 to allow `service_role`).

- `public.invitations`
  - `id`, `token`, `sender_id` (references `users(id)` ON DELETE CASCADE), `recipient_email`, `personal_message`, `status`, `expires_at`, `room_id TEXT` (optional).
  - Policies: sender restricted for insert/view; public view by token allowed in policy.

- `public.debug_logs` (debug only - restricted Dec 12, 2025)
  - `id serial`, `message TEXT`, `details JSONB`, `created_at TIMESTAMPTZ`.
  - Restricted to `service_role` only.

- `public.contact_messages` (Added Dec 14, 2025)
  - `id UUID`, `user_id` (optional), `email`, `category`, `subject`, `message`, `status`, `ip_address`, `user_agent`, timestamps.
  - Policies: Public INSERT allowed; SELECT/UPDATE restricted to `service_role` (admins) and user's own messages.

## Planned Schema Extensions (From MXN_FEATURES.md)

### Priority 0 (Critical) - Privacy & Anonymity Core

- `public.vibes`
  - `id UUID PRIMARY KEY`
  - `name TEXT` — vibe name (e.g., "Gaming", "Professional")
  - `user_id UUID REFERENCES users(id)` — owner
  - `color TEXT` — visual identifier (hex color)
  - `alias TEXT UNIQUE` — per-vibe anonymous alias (30-day expiry)
  - `alias_expires_at TIMESTAMPTZ` — alias expiration
  - `access_mode TEXT` — 'green' (open), 'amber' (request), 'red' (closed)
  - `triggers JSONB` — situational triggers/topics
  - `boundaries JSONB` — personal boundaries for this vibe
  - `off_limits JSONB` — hard boundaries
  - `created_at TIMESTAMPTZ`
  - `updated_at TIMESTAMPTZ`
  - RLS: User owns their vibes; others see only public metadata (name, color) if shared in same room

- `public.vibe_room_assignments`
  - `vibe_id UUID REFERENCES vibes(id)`
  - `room_id TEXT REFERENCES rooms(id)`
  - `assigned_at TIMESTAMPTZ`
  - PRIMARY KEY (vibe_id, room_id)
  - RLS: User can assign their vibes to rooms they're members of

- `public.privacy_settings`
  - `user_id UUID PRIMARY KEY REFERENCES users(id)`
  - `profile_visibility TEXT` — 'public', 'friends', 'private'
  - `online_status_visibility BOOLEAN DEFAULT false`
  - `read_receipts_enabled BOOLEAN DEFAULT false`
  - `typing_indicators_enabled BOOLEAN DEFAULT false`
  - `allow_stranger_dms BOOLEAN DEFAULT false`
  - `data_sharing_consent JSONB` — granular consent tracking
  - `auto_delete_messages_days INTEGER DEFAULT 1` — TTL for ephemeral content
  - `updated_at TIMESTAMPTZ`
  - RLS: Owner only

- `public.trust_relationships`
  - `id UUID PRIMARY KEY`
  - `user_id UUID REFERENCES users(id)`
  - `trusted_user_id UUID REFERENCES users(id)`
  - `trust_level TEXT` — 'acquaintance', 'friend', 'trust', 'intimate'
  - `can_share_personal_info BOOLEAN DEFAULT false` — gated by 'trust'/'intimate'
  - `created_at TIMESTAMPTZ`
  - `updated_at TIMESTAMPTZ`
  - UNIQUE(user_id, trusted_user_id)
  - RLS: User can only see/manage their own trust relationships

### Priority 0 (Critical) - Message Security

- `public.message_encryption_metadata`
  - `message_id UUID PRIMARY KEY REFERENCES messages(id) ON DELETE CASCADE`
  - `encrypted BOOLEAN DEFAULT false`
  - `key_version TEXT` — for key rotation
  - `expires_at TIMESTAMPTZ` — for self-destructing messages (24h default)
  - `recipient_keys JSONB` — encrypted keys for each recipient (E2E)
  - RLS: Accessible by message participants only

### Priority 1 (High) - Enhanced Messaging

- `public.message_threads`
  - `id UUID PRIMARY KEY`
  - `parent_message_id UUID REFERENCES messages(id) ON DELETE CASCADE`
  - `reply_message_id UUID REFERENCES messages(id) ON DELETE CASCADE`
  - `created_at TIMESTAMPTZ`
  - UNIQUE(parent_message_id, reply_message_id)
  - RLS: Inherit from messages table

- `public.message_bookmarks`
  - `user_id UUID REFERENCES users(id)`
  - `message_id UUID REFERENCES messages(id) ON DELETE CASCADE`
  - `created_at TIMESTAMPTZ`
  - PRIMARY KEY (user_id, message_id)
  - RLS: User can only see their own bookmarks

- `public.message_edit_history`
  - `id UUID PRIMARY KEY`
  - `message_id UUID REFERENCES messages(id) ON DELETE CASCADE`
  - `previous_text TEXT`
  - `edited_at TIMESTAMPTZ`
  - `edited_by UUID REFERENCES users(id)`
  - RLS: Visible to message participants

### Priority 1 (High) - User Enhancements

- Enhanced `public.users` columns (to be added):
  - `bio TEXT` — about me section
  - `status_message TEXT` — custom status
  - `status_emoji TEXT` — status emoji
  - `custom_avatar_url TEXT` — user-uploaded avatar
  - `profile_banner_url TEXT` — header image
  - `blocked_users UUID[]` — blocked user IDs
  - `muted_users UUID[]` — muted user IDs

### Priority 1 (High) - Room Features

- `public.pinned_messages`
  - `room_id TEXT REFERENCES rooms(id)`
  - `message_id UUID REFERENCES messages(id) ON DELETE CASCADE`
  - `pinned_by UUID REFERENCES users(id)`
  - `pinned_at TIMESTAMPTZ`
  - PRIMARY KEY (room_id, message_id)
  - RLS: Visible to room members; only admins can pin

- `public.room_moderation_logs`
  - `id UUID PRIMARY KEY`
  - `room_id TEXT REFERENCES rooms(id)`
  - `moderator_id UUID REFERENCES users(id)`
  - `action TEXT` — 'warn', 'mute', 'kick', 'ban'
  - `target_user_id UUID REFERENCES users(id)`
  - `reason TEXT`
  - `created_at TIMESTAMPTZ`
  - `expires_at TIMESTAMPTZ` — for temporary actions
  - RLS: Room moderators and target user can view

### Priority 2 (Medium) - Analytics & Gamification

- `public.user_stats`
  - `user_id UUID PRIMARY KEY REFERENCES users(id)`
  - `total_messages INTEGER DEFAULT 0`
  - `total_reactions_given INTEGER DEFAULT 0`
  - `total_reactions_received INTEGER DEFAULT 0`
  - `rooms_joined INTEGER DEFAULT 0`
  - `friends_count INTEGER DEFAULT 0`
  - `updated_at TIMESTAMPTZ`
  - RLS: Public read, owner update

### Storage Buckets (Supabase Storage)

- `avatars` — user profile images (public read, user upload)
- `banners` — profile header images (public read, user upload)
- `message-attachments` — file uploads in messages (room member read, sender upload)
- `room-icons` — room custom icons (room member read, admin upload)

## Key Functions & Triggers
- `public.handle_new_user()`
  - Triggered `AFTER INSERT ON auth.users`.
  - Inserts/updates a `public.users` row using `raw_user_meta_data` fallback to email.
  - Debug variant logs errors to `public.debug_logs` instead of raising exceptions.

- `on_auth_user_created` — trigger created and attached for the above function.

## Realtime Publication
- `supabase_realtime` publication created if not present and includes public.users, public.rooms, public.messages, public.invitations.

## Policies & Security Review (Summary)
- **Lax SELECT policies:** Several tables have SELECT policies allowing `true` (public). This is likely intentional for public rooms but may leak private-room messages. Proposed fix:  Replace those policies with membership checks for private rooms.
- **Debug logs exposure:** `public.debug_logs` currently made viewable to `anon` and `authenticated` in the debug script. This is a security and PII risk and should be limited to admin-only roles.
- **Members array vs join table:** `rooms.members` is an array (UUID[]). For complex permissions and queries, a `room_members (room_id, user_id, role, joined_at)` join table makes RLS and queries easier and more accurate.
- **Message visibility:** Messages SELECT policy should verify membership in the associated room (or require `room.type = 'public'`). Avoid allowing any user to read any message in case of private rooms.

## Indexing & Performance
- Add an index on `messages (room_id, timestamp)` for ordering and pagination
- Index `rooms (last_activity)` for efficient “recent rooms” ordering
- Add GIN index for frequently queried JSONB columns like `reactions` or `last_message` parts

## Migration & Deployment Guidance
- Always create new migrations under `supabase/migrations` (timestamped SQL files) and keep a central changelog.
- Use `supabase` CLI or migration tooling to apply changes in staged environments first.
- Schedule Structured Backups: `pg_dump` nightly or use Supabase DB backups; test restore strategy periodically.

## Tests & Validation
- Add automated tests for RLS policies (simulate queries using different roles).
- Add CI step to run `scripts/check_db.js` post-deployment to ensure RLS/policies/triggers remain correct.
- E2E tests should validate real-time functionality and message polymorphism.

## Immediate Action Items (High Priority)

### Completed (Dec 12, 2025)
- ✅ Update RLS policies for `messages` and `rooms` to enforce membership-based visibility for private rooms.
- ✅ Restrict `debug_logs` to admin roles and remove public exposure.
- ✅ Add an index on `messages(room_id, timestamp)` and `rooms(last_activity)`.
- ✅ Add `room_members` join table and migrate `rooms.members` to that join table.
- ✅ Update front-end to read membership via `room_members` and stop relying on `rooms.members` array.
- ✅ Add an automated RLS test script (`scripts/test_rls.js`) to validate policies across roles.
- ✅ Add E2E tests for invite flow and lifecycle (`scripts/e2e_invite_flow.js`, `scripts/e2e_lifecycle.js`).
- ✅ Add CI workflows for RLS and E2E testing.
- ✅ Create rollback migrations and helper script.

### In Progress (Phase 1.6 - Vibe System)
- [ ] Run staging migrations (`npx supabase db push --linked`).
- [ ] Validate RLS and E2E tests in staging environment.
- [ ] Create `vibes` table migration with alias system.
- [ ] Create `vibe_room_assignments` join table.
- [ ] Create `privacy_settings` table for user privacy controls.
- [ ] Create `trust_relationships` table for trust-gated sharing.
- [ ] Add `message_encryption_metadata` table for E2E encryption and TTL.
- [ ] Enhance `users` table with bio, status, profile customization columns.
- [ ] Create `message_threads` table for reply threading.
- [ ] Create `message_bookmarks` table.
- [ ] Create `pinned_messages` table for room announcements.
- [ ] Update RLS policies for all new tables.
- [ ] Create Supabase Storage buckets (avatars, banners, message-attachments, room-icons).
- [ ] Add indexes for new tables (vibes, privacy_settings, trust_relationships).
- [ ] Update frontend to support vibe system and privacy controls.

## Suggested Improvements (Mid-Term)

### Phase 1.6-1.8 Features (Vibe System & Privacy)
- ✅ Add `room_moderation_logs` table for moderation actions (planned above).
- Add ephemeral message cleanup job (cron) for messages past TTL.
- Implement privacy-preserving moderation evidence storage.
- Add automated safety enforcement (block phone/email/handles unless trust-gated).
- Implement vibe access modes (Green/Amber/Red) with RLS.
- Add alias expiration handling (30-day auto-renewal or expiry).

### Phase 2+ Features (Monetization & Growth)
- Add `subscriptions` table for premium tiers.
- Add `billing_profiles` table (isolated from aliases for anonymity).
- Add `user_stats` table for gamification and analytics.
- Add `achievements` or `badges` table for user engagement.
- Add `referral_codes` table for growth tracking.
- Add `feature_flags` table for A/B testing and gradual rollout.
- Normalize `reactions` into dedicated table if custom emoji packs added.
- Add `voice_messages` and `video_messages` metadata tables.
- Add `polls` and `surveys` tables for engagement features.

### Performance & Scale
- Implement database partitioning for messages table (by timestamp).
- Add read replicas for analytics queries.
- Implement message archival strategy (move old messages to cold storage).
- Add Postgres logical replication for disaster recovery.
- Implement connection pooling optimization (PgBouncer).

### Compliance & Security
- Add GDPR data export automation.
- Add data retention policy enforcement (auto-delete after configured period).
- Implement audit logging for all admin/moderation actions.
- Add anomaly detection triggers (unusual activity patterns).
- Implement rate limiting at database level (pg_stat_statements analysis).

## Ownership & Lifecycle
- DB Schema Owner: `db-admin@magicwrx.com` (replace with actual owner)
- Update this SSOT with each migration — PR with schema changes must include updates here.
- Schedule monthly review for RLS and table changes.

## Useful Scripts & Locations
- Primary setup/fix script: `supabase-fix-all.sql`
- Sign-up debugging: `supabase-debug-signup.sql`
- Migration directory: `supabase/migrations/`
- E2E and DB checks: `scripts/check_db.js`, `scripts/e2e_test.js`

---

## Change Log (Applied Dec 12, 2025)
- Updated RLS policies on `public.rooms` and `public.messages` to enforce membership-based visibility (see migration `20251212001000_update_rls_policies_messages_rooms.sql`).
- Added `public.room_members` join table migration (see `20251212000000_add_room_members.sql`) and created supporting indexes/policies.
- Restricted `public.debug_logs` to `service_role` only and removed public grants (see `20251212002000_restrict_debug_logs.sql`).
- Added `room_id` to `invitations` and updated send-invite to optionally include a room (see `20251212003000_add_room_id_to_invitations.sql`).
- Added performance indexes (messages, rooms, users, invitations) and publication update to include `public.room_members`.

---

If you'd like, I can:
- Add an RLS policy template and example queries.
- Start implementing `room_members` migration and adjust RLS policies.
- Harden `debug_logs` and create an admin-only view for debug access.

