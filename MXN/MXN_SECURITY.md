# MXN Security Guide — Keys, Secrets, and Best Practices

**Document Date:** December 10, 2025 23:40 CST  
**Last Updated:** December 10, 2025  
**Version:** 2.0.0  
**Status:** Active  
**Next Review:** January 10, 2026

---

## Purpose
-------
Consolidated operational guidance for MXN (mxn-chat / MagicWRX): key management, local developer ergonomics, CI/E2E practices, and a short playbook for pausing email delivery and using a temporary test contact while the production email flow is disabled.

Goals
- Keep secrets out of the repository
- Use publishable keys only in the browser
- Use service/secret keys only server-side and in CI (encrypted)
- Rotate keys and signing secrets regularly
- Provide safe procedures for running E2E tests and for temporarily pausing email delivery

Scope
- This file merges CI setup guidance and developer security notes into a single reference for MXN team members. It intentionally avoids duplication and focuses on actionable steps.

Developer Environment & SSH (macOS)
----------------------------------
- Ensure an SSH key exists at `~/.ssh/id_ed25519` (or your preferred key).
- Add to `~/.ssh/config` to cache keys in the macOS Keychain:

```text
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  AddKeysToAgent yes
  UseKeychain yes
```

- Start the agent and add the key (enter passphrase once):

```bash
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
# or
ssh-add -K ~/.ssh/id_ed25519
```

- After the one-time passphrase entry, pushes and fetches will not prompt repeatedly.

Local environment & secrets
---------------------------
- Never commit `.env.local` or files that contain secret keys.
- Keep `NEXT_PUBLIC_*` values public-only; keep service keys server-side.
- `.env.local` and `.env.*.local` are in `.gitignore`.

CI / GitHub Actions & Vercel
----------------------------
- Required CI secrets (store in GitHub → Settings → Secrets → Actions):
  - `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-side only)

- Vercel: set these as Environment Variables per-environment (Production/Preview/Development). Do not expose the `SUPABASE_SERVICE_ROLE_KEY` client-side.

- CI best practice: use a dedicated Supabase test project for CI/E2E to avoid running admin-level tests on production data. Use `workflow_dispatch` to run manual smoke tests rather than running them on every PR.

Key Types & Where To Use Them
-----------------------------
- Publishable (client): `NEXT_PUBLIC_SUPABASE_ANON_KEY` — safe for the browser.
- Secret / Service role (server): `SUPABASE_SERVICE_ROLE_KEY` — full privileges; never expose to client.
- JWT signing secret: `SUPABASE_JWT_SECRET` — store and rotate in secret manager.
- Third-Party API Keys (server): `BREVO_API_KEY`, `BREVO_AI_API_KEY` — never prefix with `NEXT_PUBLIC_`. Use only in API routes or server components.

Key Rotation (recommended cadence: 90 days)
-------------------------------------------
1. Generate the new key in Supabase Dashboard → Settings → API (or via admin API).
2. Update secrets in Vercel / GitHub / CI (do not remove old key yet).
3. Deploy and test (use Preview deployments).
4. Remove old key after validation.

Emergency Key Revoke Playbook
-----------------------------
1. Revoke/rotate the compromised key in Supabase Dashboard.
2. Update env vars in Vercel / CI with new key.
3. Deploy critical services with new key.
4. Rotate downstream dependencies if needed.
5. Perform post-mortem and update access controls.

Running E2E Tests Safely
------------------------
- The repo contains `scripts/e2e_test.js` for smoke tests (it uses a service role key). Store the test project's service role key in CI secrets and use `workflow_dispatch` to trigger it.
- Recommended CI workflow skeleton (use manual dispatch):

```yaml
name: e2e
on:
  workflow_dispatch:

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install
        run: npm ci
      - name: Run E2E script
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
        run: node scripts/e2e_test.js
```

Serverless Functions & Service Keys
----------------------------------
- If server functions require admin privileges, set `SUPABASE_SERVICE_ROLE_KEY` in the host's environment (Vercel, Functions). Never expose it in client code.

Access Controls & Audit
-----------------------
- Enable 2FA for provider accounts (Vercel, GitHub, Supabase).
- Limit access to secrets and audit key changes.

Pause SMTP / Temporary Email Testing Plan
----------------------------------------
This section documents a safe, reversible way to pause production email delivery in Supabase while you research free alternatives (Resend, SendGrid free tier, Mailgun, etc.) and continue testing user flows.

1) Pause SMTP in Supabase (manual steps):
   - Sign in to Supabase → Project → Authentication → Settings → Email.
   - Remove or disable the SMTP provider credentials (or toggle "Disable email" if available).
   - Save settings.

2) Change the application contact/test address (temporary):
  - Use `magicwrxstudio@gmail.com` as the primary fallback contact for testing while email delivery is paused.
  - Set the environment variable `TEST_FALLBACK_EMAIL=magicwrxstudio@gmail.com` in development and CI for clarity. The invite API will include this address as the `reply-to` so replies from users will go to the Gmail inbox.
  - Update any server-side code or templates to include a clear note: "Email delivery is paused — test copies are sent to magicwrxstudio@gmail.com".

3) Test invitations & transactional messages without SMTP:
   - The app will continue to create `invitations` rows in the DB.
   - We also capture test deliveries in a repository-local outbox so developers can inspect what would have been sent.

4) Re-enable SMTP once you've chosen and configured a free provider and verified DNS (SPF/DKIM).

Notes on free alternatives
--------------------------
- Resend offers developer-friendly templates; SendGrid and Mailgun have free tiers (with limitations). Evaluate deliverability and DKIM/SPF requirements before choosing.

Chat & Account Communication (priority)
--------------------------------------
The top functional priority is ensuring communication between accounts: users must be able to see and share messages in chat rooms. Use these developer checks to validate chat flows quickly:

1. Create two test users (or use the E2E test script to create temporary users).
2. Sign in as User A and send a message in the `default-general` room.
3. Sign in as User B (another browser or incognito) and confirm the message appears in realtime.
4. Test message sharing / copy functionality and ensure attachments are visible (if used).

If realtime updates are not showing:
- Confirm the Supabase Realtime/Realtime server is enabled for your project.
- Confirm RLS policies permit SELECT/INSERT for the user/session role used by the client.

Quick Chat Smoke Test (manual):
1. Open two browsers (or browser + incognito).
2. Sign in as different users.
3. Navigate to the same room and verify send/receive latency is acceptable.

Operational Notes
-----------------
- Add `SUPABASE_SERVICE_ROLE_KEY` to CI as a secret only for test projects.
- `.env.local` is listed in `.gitignore` for local secrets.
- Rotate keys periodically and audit who can change them.

Checklist
---------
- [ ] `.env.local` is in `.gitignore` (done)
- [ ] Service/secret keys stored in Vercel / GitHub Secrets
- [ ] Use test Supabase project for CI E2E runs where possible
- [ ] Rotate service role and JWT secrets regularly
- [ ] Only run admin-level scripts manually or in protected CI workflows
- [ ] Audit and monitor secret usage

If you'd like, I can:
- Add or update the GitHub Actions workflow in `.github/workflows/e2e.yml` and help wire secrets into GitHub for a test project.
- Add a small "developer outbox" API so team members can inspect pending invites while SMTP is paused.

End of MXN_SECURITY.md
