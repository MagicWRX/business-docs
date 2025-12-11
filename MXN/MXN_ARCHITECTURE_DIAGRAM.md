MXN_ARCHITECTURE_DIAGRAM.md

Date: 2025-12-06 06:15 (-06:00)

🖥 MXN.CHAT & MagicWRX — Visual Architecture Diagram (Top-Down)

This diagram shows the top-down architecture of MXN.CHAT (flagship) and MagicWRX framework, including all required accounts and integrations under the MagicWRXStudio Google account.

⸻

1. Accounts Needed (Centralized under MagicWRXStudio)
	•	Google Gmail Account: MagicWRXStudio@gmail.com
	•	Vercel Account: Deploy all frontends (MXN.CHAT, MagicWRX)
	•	Supabase Accounts: 2 Projects (mxn-chat-db, magicwrx-db)
	•	Stripe Account: One Business Account (MXN + MagicWRX payments)
	•	Google Analytics / GA4 Account: Tracking for both apps
	•	Google Ads Account: Monetization for free-tier users
	•	OpenAI / AI Provider Account: AI content & moderation
	•	Optional Developer Tools: GitHub / GitLab repository accounts

⸻

2. Top-Down Architecture (Mermaid Style Diagram)

flowchart TD
    %% Frontend Layer
    Vercel["Vercel Frontends"]
    Vercel -->|API Calls| API["API / Backend Layer"]

    %% API Layer
    API -->|Auth / Rate-Limiting| Auth["Supabase Auth Controller"]
    API -->|DB Queries| MXN_DB["Supabase Project A: mxn-chat-db"]
    API -->|DB Queries| MagicWRX_DB["Supabase Project B: magicwrx-db"]
    API -->|Stripe Webhooks| Stripe["Stripe Business Account"]
    API -->|Analytics Event| GA["Google Analytics / GA4"]
    API -->|Ads Serving| GoogleAds["Google Ads Account"]
    API -->|AI Requests| AI["OpenAI / AI Services"]

    %% Frontend to Users
    Vercel --> Users["End Users"]

    %% Optional CI/CD
    GitHub["GitHub / GitLab"] --> Vercel

    %% Notes
    note1["All accounts are managed under MagicWRXStudio Gmail"]
    note1 -.-> Vercel
    note1 -.-> Supabase
    note1 -.-> Stripe
    note1 -.-> GA
    note1 -.-> GoogleAds
    note1 -.-> AI


⸻

3. Description of Flow
	1.	User Interaction: Users access MXN.CHAT or MagicWRX frontends hosted on Vercel.
	2.	API Layer: Edge functions / serverless routes handle authentication, API requests, and business logic.
	3.	Supabase Databases:
	•	mxn-chat-db: Auth, profiles, messages, ephemeral attachments
	•	magicwrx-db: Sites, pages, products, analytics, quotas
	4.	Payments: Stripe processes all transactions, including subscriptions and in-app purchases.
	5.	Analytics & Ads: GA4 tracks events, Google Ads delivers subtle monetization banners.
	6.	AI Services: Optional AI endpoints for content generation, moderation, and analytics summaries.
	7.	CI/CD: GitHub repositories connect to Vercel for automated deployments.

⸻

4. Key Notes
	•	MXN.CHAT is the flagship product but all accounts are centralized under the MagicWRXStudio Google account.
	•	Supabase free-tier limits are respected by splitting MXN and MagicWRX databases into two separate projects.
	•	All communication between frontends, APIs, and databases uses secure tokens and RLS policies.
	•	Ads and AI integrations are optional and can be enabled via feature flags per environment.

⸻

End of document.