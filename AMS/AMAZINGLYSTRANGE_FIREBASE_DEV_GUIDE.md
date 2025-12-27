# Amazingly Strange - Firebase Development Guide

Complete guide for local development using Firebase emulators and the `firebase-dev.sh` helper script.

---

## 🚀 Quick Start (30 seconds)

### Test the Admin Dashboard
```bash
./scripts/firebase-dev.sh test
```

This command will:
- ✅ Start Firebase emulators (Auth, Firestore, Storage, Hosting)
- ✅ Open admin login page in browser
- ✅ Open Firebase Emulator UI
- ✅ Ready to test blog editor with image uploads

**Sign in with ANY Google account** - all authenticated users have admin access in emulator mode.

---

## 📋 Firebase Dev Script Commands

The `firebase-dev.sh` script provides 9 convenient commands for managing Firebase emulators:

### `start` - Start All Emulators
Starts Auth, Firestore, Storage, and Hosting emulators in the background.

```bash
./scripts/firebase-dev.sh start
```

**What it does:**
- Starts all Firebase emulators
- Runs in background (logs to `/tmp/firebase-emulator.log`)
- Shows quick access URLs
- Waits until emulators are ready

**Output:**
```
✓ Firebase Emulators are running!
ℹ Quick Access URLs:
  🌐 Main Site:     http://127.0.0.1:9890/index.html
  📝 Blog:          http://127.0.0.1:9890/pages/blog.html
  🔐 Admin Login:   http://127.0.0.1:9890/admin-access.html
  🎛️  Emulator UI:   http://127.0.0.1:9891
```

---

### `stop` - Stop All Emulators
Stops all running Firebase emulator processes.

```bash
./scripts/firebase-dev.sh stop
```

**What it does:**
- Gracefully stops all Firebase processes
- Cleans up background processes

---

### `restart` - Restart Emulators
Stops and restarts all emulators (useful after code changes).

```bash
./scripts/firebase-dev.sh restart
```

**What it does:**
- Stops running emulators
- Waits 2 seconds
- Starts fresh emulator instances

---

### `test` - Quick Test Environment ⭐ RECOMMENDED
Perfect for testing the admin dashboard! Starts emulators and opens admin page in browser.

```bash
./scripts/firebase-dev.sh test
```

**What it does:**
- Starts emulators (if not running)
- Opens admin login page in browser
- Opens Emulator UI in browser
- Shows all quick access URLs

**Use this when:**
- Testing admin dashboard features
- Testing blog editor
- Verifying Firebase integration
- Quick development setup

---

### `admin` - Setup Admin User
Creates an admin user with custom claims in the emulator.

```bash
./scripts/firebase-dev.sh admin
```

**What it does:**
- Starts emulators (if not running)
- Runs `setup-admin-emulator.js`
- Creates admin user with email/password

**Admin Credentials:**
- Email: `admin@amazinglystrange.com`
- Password: `admin123`

**Note:** In emulator mode, ALL authenticated users have admin access by default (see `firestore.rules` and `admin-dashboard.js`).

---

### `status` - Check Emulator Status
Shows detailed status of all Firebase emulators.

```bash
./scripts/firebase-dev.sh status
```

**Output example:**
```
✓ Firebase Emulators are RUNNING

Port Status:
  ✓ Port 9888 (Auth)
  ✓ Port 9889 (Firestore)
  ✓ Port 9199 (Storage)
  ✓ Port 9890 (Hosting)
  ✓ Port 9891 (Emulator UI)
```

---

### `clean` - Clean All Emulator Data
Stops emulators and removes all emulator data, logs, and cache.

```bash
./scripts/firebase-dev.sh clean
```

**What it does:**
- Stops all emulators
- Removes `.firebase` directory
- Removes log files
- Removes debug logs

**Use this when:**
- Starting fresh testing
- Clearing test data
- Troubleshooting emulator issues

---

### `logs` - View Emulator Logs
Shows recent emulator logs (last 50 lines).

```bash
./scripts/firebase-dev.sh logs
```

**To follow logs in real-time:**
```bash
tail -f /tmp/firebase-emulator.log
```

---

### `ui` - Open Emulator UI
Opens the Firebase Emulator UI in your browser.

```bash
./scripts/firebase-dev.sh ui
```

**Emulator UI provides:**
- Firestore database viewer
- Authentication user management
- Storage file browser
- Real-time data updates

---

### `help` - Show Help
Display all available commands with usage examples.

```bash
./scripts/firebase-dev.sh help
```

---

## 🌐 Key URLs

### Development (Emulator Mode)
| Service | URL |
|---------|-----|
| **Main Site** | http://127.0.0.1:9890/ |
| **Admin Login** | http://127.0.0.1:9890/admin-access.html |
| **Blog Page** | http://127.0.0.1:9890/pages/blog.html |
| **Emulator UI** | http://127.0.0.1:9891/ |
| **Firestore Viewer** | http://127.0.0.1:9891/firestore |
| **Auth Viewer** | http://127.0.0.1:9891/auth |
| **Storage Viewer** | http://127.0.0.1:9891/storage |

### Production
| Service | URL |
|---------|-----|
| **Main Site** | https://amazinglystrange.com |
| **Admin Login** | https://amazinglystrange.com/admin-access.html |
| **Blog Page** | https://amazinglystrange.com/pages/blog.html |

---

## 🔌 Emulator Ports

| Service | Port | URL |
|---------|------|-----|
| **Auth** | 9888 | http://127.0.0.1:9888 |
| **Firestore** | 9889 | http://127.0.0.1:9889 |
| **Storage** | 9199 | http://127.0.0.1:9199 |
| **Hosting** | 9890 | http://127.0.0.1:9890 |
| **Emulator UI** | 9891 | http://127.0.0.1:9891 |

---

## 🧪 Testing Workflows

### 1. Test Admin Dashboard
```bash
./scripts/firebase-dev.sh test
```

**Steps:**
1. Sign in with Google (any account works in emulator)
2. Click "Blog" tab
3. Create a blog post
4. Upload an image (tests compression)
5. Click "Save Blog Post"
6. View in Firestore UI: http://127.0.0.1:9891/firestore
7. Check `blogPosts` collection for your new post
8. Open Storage UI: http://127.0.0.1:9891/storage
9. Browse `blog-images/` folder to see uploaded images

---

### 2. Test Blog Display
```bash
./scripts/firebase-dev.sh start
```

**Steps:**
1. Open http://127.0.0.1:9890/pages/blog.html
2. Should see blog posts from Firestore
3. Click on a post to view details
4. Check image loading and formatting
5. Open http://127.0.0.1:9890/ for homepage preview (top 3 posts)

---

### 3. Fresh Start (Clean Slate)
```bash
./scripts/firebase-dev.sh clean
./scripts/firebase-dev.sh test
```

**Use this when:**
- Starting fresh testing
- Clearing old test data
- Troubleshooting data issues
- Resetting authentication state

---

### 4. Code Changes Workflow
```bash
# After making changes to JavaScript files
./scripts/firebase-dev.sh restart

# After changing Firestore rules
./scripts/firebase-dev.sh restart

# After changing storage rules
./scripts/firebase-dev.sh restart
```

---

## 🐛 Troubleshooting

### Emulators won't start
```bash
# Kill any stuck processes
pkill -f "firebase emulators"

# Clean everything
./scripts/firebase-dev.sh clean

# Start fresh
./scripts/firebase-dev.sh start
```

### Port already in use
```bash
# Check what's using the port
lsof -ti:9890

# Kill the process
kill -9 $(lsof -ti:9890)

# Or kill all common ports
lsof -ti:9890 | xargs kill -9
lsof -ti:9891 | xargs kill -9
lsof -ti:9888 | xargs kill -9
```

### Permission errors in Firestore
- Check browser console for specific error
- Verify you're signed in (`admin-dashboard.js` checks auth)
- In emulator mode, just being authenticated = admin access
- Check `firestore.rules` for the collection you're accessing
- Restart emulators to reload security rules

### Images not uploading
- Check Storage emulator is running: http://127.0.0.1:9891/storage
- Verify `storage.rules` allows writes
- Check browser console for errors
- Check Network tab for failed requests
- Verify file size is under limit (configured in `blog-manager.js`)

### Emulators running but pages not loading
```bash
# Check status
./scripts/firebase-dev.sh status

# View logs for errors
./scripts/firebase-dev.sh logs

# Try accessing Emulator UI directly
open http://127.0.0.1:9891
```

### Authentication issues
- Clear browser cache and cookies
- Sign out and sign back in
- Check Auth emulator UI: http://127.0.0.1:9891/auth
- Verify `firebase-config.js` is loading correctly
- Check browser console for Firebase Auth errors

---

## ⚙️ Configuration Files

### `firebase.json`
Defines emulator ports and hosting rewrites:
```json
{
  "emulators": {
    "auth": { "port": 9888 },
    "firestore": { "port": 9889 },
    "storage": { "port": 9199 },
    "hosting": { "port": 9890 },
    "ui": { "enabled": true, "port": 9891 }
  },
  "hosting": {
    "public": "public",
    "rewrites": [
      {
        "source": "/admin.html",
        "destination": "/admin.html"
      },
      {
        "source": "/admin-access.html",
        "destination": "/admin-access.html"
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

### `firestore.rules`
Security rules with emulator-aware admin detection:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function: Check if user is admin
    // In emulator mode: any authenticated user is admin
    // In production: requires admin custom claim
    function isAdmin() {
      return request.auth != null && 
        (request.auth.token.admin == true || 
         request.auth.token.firebase.sign_in_provider != null);
    }
    
    // Blog posts collection
    match /blogPosts/{postId} {
      allow read: if true;  // Anyone can read
      allow write: if isAdmin();  // Only admins can write
    }
    
    // Other collections...
  }
}
```

---

### `firebase-config.js`
Auto-detects emulators on localhost:
```javascript
// Auto-detect emulator mode
if (window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1') {
  console.log('🔧 Running in EMULATOR mode');
  connectAuthEmulator(auth, 'http://127.0.0.1:9888');
  connectFirestoreEmulator(db, '127.0.0.1', 9889);
  connectStorageEmulator(storage, '127.0.0.1', 9199);
} else {
  console.log('🚀 Running in PRODUCTION mode');
}
```

---

## 🔄 Emulator vs Production

### Emulator Mode (Development)
- **URL:** `http://127.0.0.1:9890`
- **Auth:** ANY authenticated Google user has admin access
- **Data:** Stored locally, cleared on restart
- **Security Rules:** Modified to allow dev access
- **Auto-detected by:** `firebase-config.js` checks for `localhost`
- **Storage:** Local file system simulation
- **No costs:** Free, unlimited testing

### Production Mode
- **URL:** `https://amazinglystrange.com`
- **Auth:** Requires `admin: true` custom claim
- **Data:** Stored in Firebase Cloud Firestore
- **Security Rules:** Full security enforcement
- **Custom Claims:** Must be set via Firebase Admin SDK
- **Storage:** Firebase Cloud Storage
- **Costs:** Based on usage

---

## 📂 Project Structure

```
amazinglystrange/
├── public/
│   ├── index.html              # Main homepage
│   ├── admin.html              # Admin dashboard
│   ├── admin-access.html       # Admin login page
│   ├── pages/
│   │   ├── blog.html           # Blog listing page
│   │   ├── about.html          # About page
│   │   ├── games.html          # Games listing page
│   │   ├── games/              # Individual game pages
│   │   │   ├── fluffshappymatch.html
│   │   │   ├── snakebot.html
│   │   │   ├── candycorncritters.html
│   │   │   ├── monstertilematch.html
│   │   │   ├── murkymerge.html
│   │   │   └── ...             # Other game pages
│   │   └── ...                 # Other pages
│   ├── js/
│   │   ├── firebase-config.js  # Auto-detects emulators
│   │   ├── admin-dashboard.js  # Dashboard controller
│   │   ├── blog-manager.js     # Blog CRUD + image upload
│   │   ├── blog-preview.js     # Homepage blog preview
│   │   ├── blog-display.js     # Blog page display
│   │   ├── page-manager.js     # Page management
│   │   └── media-manager.js    # Media library
│   ├── inserts/
│   │   ├── navbar.html         # Navigation (all pages)
│   │   ├── footer.html         # Footer (all pages)
│   │   └── brand-container.html # Header banner
│   └── css/
│       └── ...                 # Stylesheets
├── scripts/
│   ├── firebase-dev.sh         # Firebase emulator helper ⭐
│   └── serve-local.sh          # Simple HTTP server
├── docs/
│   ├── AMAZINGLYSTRANGE_FIREBASE_DEV_GUIDE.md  # This file
│   ├── AMAZINGLYSTRANGE_ADMIN.md               # Admin docs
│   └── ADMIN_TESTING_GUIDE.md                  # Testing guide
├── firebase.json               # Firebase config + rewrites
├── firestore.rules            # Database security rules
├── storage.rules              # Storage security rules
└── setup-admin-emulator.js    # Admin user setup script
```

---

## 🎯 Quick Reference

### Common Commands
```bash
# Start emulators
./scripts/firebase-dev.sh start

# Test admin dashboard (recommended!)
./scripts/firebase-dev.sh test

# Check status
./scripts/firebase-dev.sh status

# Stop emulators
./scripts/firebase-dev.sh stop

# Clean restart
./scripts/firebase-dev.sh clean
./scripts/firebase-dev.sh start

# View logs
./scripts/firebase-dev.sh logs

# Open Emulator UI
./scripts/firebase-dev.sh ui
```

### Alternative: Local HTTP Server (No Firebase)
```bash
# Start simple HTTP server
./scripts/serve-local.sh

# Custom port
PORT=5500 ./scripts/serve-local.sh
```

---

## 📚 Related Documentation

- **[AMAZINGLYSTRANGE_ADMIN.md](./AMAZINGLYSTRANGE_ADMIN.md)** - Complete admin dashboard documentation
- **[ADMIN_TESTING_GUIDE.md](../ADMIN_TESTING_GUIDE.md)** - Testing procedures and checklists
- **[SCRIPTS_README.md](../SCRIPTS_README.md)** - All scripts reference guide
- **[AMS_AI_PROMPT.md](./AMS_AI_PROMPT.md)** - AI development prompt template

---

## 🚀 Next Steps

1. **Start testing:** `./scripts/firebase-dev.sh test`
2. **Create content:** Test the blog editor with images
3. **Explore Emulator UI:** Browse Firestore and Storage data
4. **Test authentication:** Sign in/out with different accounts
5. **Review code:** Check `public/js/` for implementation details
6. **Deploy:** When ready, deploy to production with `firebase deploy`

---

**Happy coding!** 🎮✨

*Last updated: October 30, 2025*
