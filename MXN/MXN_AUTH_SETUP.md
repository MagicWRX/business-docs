# MXN.CHAT Production Authentication Setup

To finalize the professional look and feel of MXN.CHAT, you need to configure Supabase to use your custom domain and email service. These settings must be changed in the Supabase Dashboard.

## 0. ✅ Rename Supabase Project (Optional)

Your current project name appears as a generic ID. You can rename it to something more professional like "MXN Chat Communication Tool".

### Step-by-Step:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your current project
3. Click the **Project Settings** gear icon (bottom of left column)
4. Go to **General** → **Project Details**
5. Change **Project Name** to: `MXN Chat Communication Tool`
6. Click **Save**

**Note:** This only changes the display name - the internal database name remains the same and cannot be changed after creation.

---

## 1. ✅ Fix Email Verification (Send from mxn.chat)

Currently, emails are sent via Supabase's default service (`noreply@supabase.co`), which often goes to spam and looks unprofessional. You need to configure **Custom SMTP** using your Resend account.

### Step-by-Step Configuration:

1.  **Verify Domain & Get Credentials:**
    *   **Verify Domain:**
        *   Go to [Resend Domains](https://resend.com/domains)
        *   Ensure `mxn.chat` is listed and status is **Verified**.
        *   If not, click **Add Domain**, enter `mxn.chat`, and add the provided DNS records (TXT, MX, CNAME) to your DNS provider (Vercel).
        *   *Note: You cannot send from `admin@mxn.chat` until the domain is verified.*
    *   **Get API Key:**
        *   Go to [Resend API Keys](https://resend.com/api-keys)
        *   Create a new key named `MXN Chat Production` (Full Access).
        *   Copy the key (starts with `re_`).

2.  **Configure Supabase SMTP:**
    *   Go to [Supabase Dashboard](https://supabase.com/dashboard) -> Select Project `mxn-chat`
    *   Navigate to **Authentication** -> **Settings** -> **SMTP Settings**
    *   Toggle **"Enable Custom SMTP"** to **ON**
    *   Fill in the details:
        *   **Sender Email:** `admin@mxn.chat` (Must match your verified domain in Resend)
        *   **Sender Name:** `MXN Chat`
        *   **Host:** `smtp.resend.com`
        *   **Port:** `465`
        *   **Username:** `resend`
        *   **Password:** `[PASTE YOUR RESEND API KEY HERE]`
        *   **Minimum Interval:** `60` (seconds)
    *   Click **Save**

    *Note: You do NOT need to use the Resend SDK code snippet for Auth emails. Supabase handles the sending automatically using these SMTP settings.*

3.  **Customize Email Templates:**
    *   In **Authentication** -> **Email Templates**:
    *   **Confirm Signup:** Change Subject to `Welcome to MXN.CHAT! Please verify your email`
    *   **Reset Password:** Change Subject to `Reset your MXN.CHAT password`
    *   Ensure the templates use your branding.

---

## 2. ✅ Fix Google OAuth URL (Custom Domain)

When users sign in with Google, they see `https://opcsbfwqazyzsskuuooz.supabase.co`. To change this to `auth.mxn.chat`, you need a **Custom Domain**.

### Requirements:
*   Supabase Pro Plan ($25/mo) is required for Custom Domains.
*   Access to your DNS provider (Vercel/GoDaddy/Namecheap).

### Step-by-Step Configuration:

1.  **Enable Custom Domain in Supabase:**
    *   Go to **Settings** -> **General** -> **Custom Domain**
    *   Enter `auth.mxn.chat`
    *   Follow the instructions to add the `CNAME` record in your DNS provider.

2.  **Update Google Cloud Console:**
    *   Go to [Google Cloud Console](https://console.cloud.google.com/)
    *   Select your project
    *   Go to **APIs & Services** -> **Credentials**
    *   Edit your **OAuth 2.0 Client ID**
    *   Add `https://auth.mxn.chat/auth/v1/callback` to **Authorized redirect URIs**
    *   Click **Save**

3.  **Update Supabase Auth Settings:**
    *   In Supabase Dashboard -> **Authentication** -> **URL Configuration**
    *   Set **Site URL** to `https://mxn.chat`
    *   Add `https://mxn.chat/**` to **Redirect URLs**

### 💡 Free Alternative (Proxy)
If you don't want to upgrade to Supabase Pro, you can't change the underlying URL, but you can make it less noticeable:

#### Step-by-Step Google Consent Screen Setup:
1. **Go to Google Cloud Console:**
   * Visit [Google Cloud Console](https://console.cloud.google.com/)
   * Select your project (the one connected to MXN Chat)

2. **Navigate to OAuth Consent Screen:**
   * Click the **hamburger menu** (≡) in the top left
   * Go to **"APIs & Services"** → **"OAuth consent screen"**
   * If you see "OAuth consent screen" directly, click it

3. **Edit the Consent Screen:**
   * Click **"EDIT APP"** if you have an existing screen
   * **App name:** Set to `MXN Chat`
   * **User support email:** Set to your email (e.g., `admin@mxn.chat`)
   * **App logo:** Click "UPLOAD" and upload your MXN Chat logo (PNG format, square, at least 128x128px)
   * **Application home page:** `https://mxn.chat`
   * **Application privacy policy link:** `https://mxn.chat/privacy` (create this page later)
   * **Application terms of service link:** `https://mxn.chat/terms` (create this page later)

4. **Save Changes:**
   * Click **"SAVE AND CONTINUE"** through all steps
   * Click **"BACK TO DASHBOARD"** when done

**Result:** Users will now see "Sign in to continue to MXN Chat" with your logo instead of just the Supabase URL.

---

## 3. ✅ Verify Setup

1.  **Test Signup:** Create a new account with a real email. You should receive an email from `admin@mxn.chat`.
2.  **Test Google Login:** The consent screen should show your logo and app name.

