Here is a cleaned, structured, professional version of your MXN User Life Cycle.
I kept all your rules, clarified language, removed contradictions, and organized everything into a logical flow engineers can use.

⸻

✅ MXN — User Life Cycle (Cleaned & Organized)

1. Account Creation
	1.	User signs up using email or magic link (Supabase Auth); optional privacy-preserving verification (CAPTCHA, WebAuthn, payment attestation) can be used to prevent bots without requiring real-world identity disclosure.
	2.	User creates their main MXN account.
	3.	User may delete this account at any time.
	4.	After deletion, they receive a confirmation email stating account closure and permanent data removal.

⸻

2. Alias Creation & Management

Each account can manage their identity using Aliases:

2.1 Aliases
	•	User automatically picks an alias during first login; aliases are required and anonymous — real names or personal photos are never required or displayed.
	•	Up to 7 free aliases included.
	•	Users may purchase additional aliases through Stripe.
	•	Users may optionally reserve an alias for 1 year (paid, “Vibe-Store Alias”).

2.2 Alias Features

Each alias includes:
	•	Alias name
	•	Optional 128×128 profile image (stored in Supabase) — must not be a real photo; abstract avatars encouraged
	•	Individual Vibe Settings
	•	Individual Boundaries / Triggers
	•	Individual topic preferences

2.3 Alias Expiration
	•	Free aliases expire 14 days after last use.
	•	After expiration, the alias name becomes available for anyone.

⸻

3. Vibe Setup

Each alias has its own Vibe Configuration, containing:

3.1 Vibe Words

Users choose from an extensive list (e.g., Calm, Open, No Cussing, No Politics, Encouragement Only, Frustrated, Lonely, etc.).

3.2 User-Generated Vibe Words
	•	Users can create custom vibe words to fine-tune mood or interaction boundaries.

3.3 Access Levels

Each Vibe has an access mode:
	•	Green (Open) → Anyone compatible may join
	•	Amber (Selective) → Boundary/mood mismatch prevents entry
	•	Red-ish (Restricted) → Only trusted/family/intimate may join

⸻

4. Trust & Relationship System

Users classify each other using a 5-tier trust hierarchy:
	1.	Individual (default)
	2.	Acquaintance
	3.	Friend
	4.	Trusted
	5.	Intimate (spouse, partner, siblings, children)

4.1 Capabilities Based on Trust
	•	Certain boundaries are waived for trusted/intimate connections.
	•	Sensitive information like phone numbers/emails cannot be shared by default.
	•	If both users upgrade each other to Trusted or Intimate, messaging may allow personal info.

4.2 Invite System
	•	Users can send invitations to connect.
	•	Users may adjust relationship status after acceptance.

⸻

5. Thoughts


5.1 Thought Sharing
	•	Users can share thought rooms inside their Vibe.
	•	Thoughts may relate to interests (e.g., Cowboy Movies, Football, American History, News, etc.).
	•	Each thought inherits:
	•	The alias’s vibe settings
	•	The alias’s boundaries
	•	The alias’s triggers

5.2 Thought Ownership
	•	Only the creator can delete a thought.
	•	Thought auto-deletes 24 hours after last activity.

⸻

6. Messaging & Interaction

6.1 Message Rules

Users may:
	•	Write text
	•	Send images
	•	Delete their own messages
	•	Topic creators may delete any message in their topic

6.2 Auto-Deletion
	•	Messages auto-delete 24 hours after last interaction.
	•	Conversations dissolve if no participants remain.

6.3 Safety Enforcement

Forbidden content:
	•	Phone numbers
	•	Emails
	•	External contact info
	•	Hateful or violent language (based on boundaries)

MXN automatically detects and blocks sharing unless both users have upgraded each other to Trusted or Intimate.

⸻

7. Purchases

7.1 Additional Aliases
	•	Users may buy more than 7 aliases via Stripe.

7.2 Alias Reservations (Annual Alias)
	•	Users may pay to reserve one or more aliases for 1 year ($2.99 each).

⸻

8. Logout & Session Handling
	•	User may manually log out at any time.
	•	Automatic logout occurs after 8 hours of inactivity.

⸻

✅ Final Summary — MXN User Life Cycle

The complete user journey:
	1.	Sign Up
	2.	Create or Select Alias
	3.	Configure Vibe + Boundaries + Triggers
	4.	Set Relationship Levels with Others
	5.	Join or Host Topics Inside Vibes
	6.	Chat / Share Images (with safety rules)
	7.	Auto-Expiration of Messages, Topics, and Aliases
	8.	Optional Purchases (aliases + reservations)
	9.	Logout or Full Account Deletion

⸻

Want me to convert this into a:

✔ Product Requirements Document (PRD)
✔ Supabase database schema
✔ Full UX flow chart
✔ Mermaid/Markdown architecture diagram
✔ Onboarding script or UI copy

Just tell me which format you want next.

---

## E2E Test Coverage
We added automated end-to-end tests that validate the core lifecycle flows described above:
- `scripts/e2e_invite_flow.js`: Validates invite -> signup -> membership -> message send/read for private rooms (token-based invites).
- `scripts/e2e_lifecycle.js`: Validates lifecycle flows including invite acceptances, message CRUD permissions, public/private room visibility, and membership enforcement.
- Tests are runnable locally with environment variables or via GitHub Actions: `.github/workflows/e2e-invite.yml` and `.github/workflows/e2e-lifecycle.yml`.

Run locally:

```bash
npm ci
# RLS tests
npm run test:rls
# Invite E2E test
npm run test:e2e:invite
# Full lifecycle E2E
npm run test:e2e:lifecycle
```

For CI, add the required secrets to repository settings: `E2E_SUPABASE_URL`, `E2E_SUPABASE_ANON_KEY`, `E2E_SUPABASE_SERVICE_ROLE_KEY`.
