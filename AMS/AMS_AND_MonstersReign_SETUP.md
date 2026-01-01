Absolutely — here’s a clean, developer-friendly Markdown document you can drop right into your repo (e.g. CODE:`../../../../docs/firebase-hosting-setup.md`).

It summarizes exactly what you’ve done and includes explanations, DNS info, and deploy commands — written as a clear internal reference.

⸻

🧩 Firebase Hosting Setup (Amazingly Strange + Monsters Reign)

📁 Project Overview

This Firebase configuration hosts two connected domains under a single project:

Domain	Target	Purpose
amazinglystrange.com	amazingly-strange	Main parent site for all content.
monstersreign.com	monstersreign	Secondary site pointing to /pages/games.html, but keeps its own URL.

Both domains share the same public directory (/public) and Firebase project.

⸻

⚙️ DNS Configuration (Squarespace → Firebase)

Host	Type	Value
@	A	199.36.158.100
www	CNAME	ghs.googlehosted.com
@	TXT	hosting-site=amazingly-strange

💡 These records point Squarespace’s domain management to Firebase Hosting (Google infrastructure).
You can confirm your setup at Firebase Console → Hosting → Custom Domains.

⸻

🧱 firebase.json (Final Configuration)

{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "hosting": [
    {
      "target": "amazingly-strange",
      "public": "public",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**",
        "*.sh",
        "*.php",
        "scripts/**",
        "test-*.js",
        "setup-*.sh",
        "start-server.sh"
      ],
      "redirects": [
        {
          "source": "/games",
          "destination": "https://www.amazinglystrange.com/pages/games.html",
          "type": 301
        }
      ],
      "rewrites": [
        { "source": "**", "destination": "/index.html" }
      ]
    },
    {
      "target": "monstersreign",
      "public": "public",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**",
        "*.sh",
        "*.php",
        "scripts/**",
        "test-*.js",
        "setup-*.sh",
        "start-server.sh"
      ],
      "rewrites": [
        { "source": "/**", "destination": "/pages/games.html" }
      ]
    }
  ],
  "emulators": {
    "auth": { "host": "127.0.0.1", "port": 9888 },
    "firestore": { "host": "127.0.0.1", "port": 9889 },
    "hosting": { "host": "127.0.0.1", "port": 9890 },
    "ui": { "enabled": true, "host": "127.0.0.1", "port": 9891 },
    "hub": { "host": "127.0.0.1", "port": 9892 },
    "singleProjectMode": true
  }
}


⸻

🧭 Target Bindings

Before deploying, make sure both hosting targets are linked to your Firebase site:

firebase target:apply hosting amazingly-strange amazingly-strange
firebase target:apply hosting monstersreign amazingly-strange


⸻

🚀 Deployment Commands

Deploy both sites:

firebase deploy --only hosting

Deploy only Monsters Reign:

firebase deploy --only hosting:monstersreign


⸻

✅ Result

Domain	Behavior
amazinglystrange.com	Standard main site with /games redirecting to /pages/games.html.
monstersreign.com	Loads /pages/games.html directly and keeps its domain name in the address bar.
Local testing	Use firebase emulators:start (Ports 9888–9892).


⸻

🧰 Notes & Best Practices
	•	Keep both domains within the same Firebase project to share SSL and analytics.
	•	Avoid external forwarding — Firebase Hosting handles redirects natively.
	•	Use 301 redirects only for SEO-friendly permanent moves.
	•	You can add additional domains (e.g. monsterreign.com, monstersreign.net) by mapping them to the same Firebase target and DNS A/CNAME records.

⸻

Would you like me to make a second version of this markdown that’s styled for public docs or your GitHub README (more polished and audience-facing, less technical)?