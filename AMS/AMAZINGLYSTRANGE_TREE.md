# AmazinglyStrange.com Project Tree

## Linux Tree Structure

```
amazinglystrange/
├── .firebaserc
├── .gitignore
├── ADMIN_TESTING_GUIDE.md
├── AMAZINGLYSTRANGE_SHELL.md
├── Clip/
│   └── BRAND_HEADERs.clip
├── SCRIPTS_README.md
├── create-sample-posts.js ❌ (REDUNDANT - replaced by scripts/add-sample-blog-posts.js)
├── docs/
│   ├── ADMIN_COMPLETE_GUIDE.md
│   ├── AMAZINGLYSTRANGE_ADMIN.md
│   ├── AMAZINGLYSTRANGE_FIREBASE.md
│   ├── AMAZINGLYSTRANGE_FIREBASE_DEV_GUIDE.md
│   ├── AMAZINGLYSTRANGE_INDEX.md
│   ├── AMAZINGLYSTRANGE_LAYOUT_MANAGER.md
│   ├── AMAZINGLYSTRANGE_ROADMAP.md
│   ├── AMAZINGLYSTRANGE_SEO_GUIDE.md
│   ├── AMAZINGLYSTRANGE_WEB_STANDARDS.md
│   ├── AMS_AI_PROMPT.md
│   ├── AMS_AND_MonstersReign_SETUP.md
│   ├── AMS_BRAND_HEADER.md
│   ├── AMS_STATIC_BLOG.md
│   ├── AMS_WEB_ROADMAP.md
│   ├── ARTWORK_GALLERY_README.md
│   ├── BRAND_CONTAINER_QUICK_REFERENCE.md
│   ├── BRAND_CONTAINER_SEO_IMPLEMENTATION.md
│   ├── CLEANUP_OBSOLETE_FILES.md
│   ├── DUAL_PATH_MIGRATION_STRATEGY.md
│   ├── DesignIndex.md
│   ├── FONT_SYSTEM_GUIDE.md
│   ├── GAME_CARDS_USAGE.md
│   ├── GAME_PAGE_TEMPLATE.md
│   ├── IMAGE_MANAGER.md
│   ├── POINT_DOMAINS.md
│   ├── PROJECT_STATUS_COMPLETE.md
│   ├── START_HERE.md
│   ├── TECHNICAL_IMPLEMENTATION_GUIDE.md
│   └── archived/
│       ├── ADMIN_IMAGE_UPLOAD_SETUP.md
│       ├── ADMIN_SECURITY_SETUP.md
│       ├── BLOG-ENHANCEMENT-SUMMARY.md
│       ├── BLOG_IMAGE_DISPLAY_FIX.md
│       ├── CURRENT_TEST_RESULTS.md
│       ├── FINAL_STATUS_SUMMARY.md
│       ├── IMAGE_COMPRESSION_GUIDE.md
│       ├── IMAGE_MANAGEMENT_GUIDE.md
│       ├── QUICK_ADMIN_SETUP.md
│       ├── README.md
│       ├── RECAPTCHA-IMPLEMENTATION.md
│       ├── SCRIPT_REVIEW.md
│       ├── TABLE_DEVELOPMENT_GUIDE.md
│       ├── recaptcha-config.md
├── firebase.json
├── firestore-debug.log
├── firestore.indexes.json
├── firestore.rules
├── functions/
│   ├── .gitignore
│   ├── index.js
│   └── package-lock.json
├── index.php
├── node_modules/
├── package-lock.json
├── package.json
├── protected-content/
├── public/
│   ├── .well-known/
│   │   └── assetlinks.json
│   ├── admin-access.html
│   ├── admin.html
│   ├── admin/
│   │   ├── components/
│   │   ├── css/
│   │   │   └── admin.css
│   │   └── js/
│   │       ├── admin-core.js
│   │       ├── blog-manager.js
│   │       ├── brand-header-manager.js
│   │       ├── element-manager.js
│   │       ├── layout-manager.js
│   │       ├── media-manager.js
│   │       └── page-manager.js
│   ├── ads.txt
│   ├── app-ads.txt
│   ├── blog.html
│   ├── css/
│   │   ├── 1-settings/
│   │   │   └── _variables.css
│   │   ├── animations.css
│   │   ├── base.css
│   │   ├── blog.css
│   │   ├── brandimage.css
│   │   ├── carousel.css
│   │   ├── cta-section.css
│   │   ├── dropdown.css
│   │   ├── fonts.css
│   │   ├── footer.css
│   │   ├── gallery-enhanced.css
│   │   ├── gallery.css
│   │   ├── game-cards.css
│   │   ├── global.css
│   │   ├── image-container.css
│   │   ├── image-fade-gallery.css
│   │   ├── layout.css
│   │   ├── navbar.css
│   │   ├── newsletter-accessibility.css
│   │   ├── paragraph.css
│   │   ├── responsive-mobile.css
│   │   ├── section-containers.css
│   │   ├── social-media.css
│   │   ├── style.css
│   │   ├── title-container.css
│   │   ├── typography.css
│   └── images/
│       ├── Amazingly-Strange-Logo.png
│       ├── Amazingly-Strange-SVG-Logo.svg
│       ├── Amazingly-Strange-Web-Header-1080x220.jpg
│       ├── Amazingly-Strange-Web-Header-3840x786.png
│       ├── Monsters-Reign-Web-Banner-Header-1080x220.jpg
│       ├── Monsters-Reign-Web-Header-Banner.jpg
│       ├── Monsters-Reign-Web-Header-Banner.png
│       ├── White-Button-Square-Image.png
│       ├── artwork/
│       │   ├── icons/
│       │   │   ├── 256-Easter-Egg-Monster-Game-Icon-Amazingly-Strange.jpg
│       │   │   ├── 256-Fluffs-Happy-Match-Game-Icon-Amazingly-Strange.jpg
│       │   │   ├── 256-Monster-Dish-Delivery-Game-Icon-Amazingly-Strange.jpg
│       │   │   ├── 256-Monster-Tile-Match-Game-Icon-Amazingly-Strange.jpg
│       │   │   ├── 256-Monster-Traffic-Jam-Game-Icon-Amazingly-Strange.jpg
│       │   │   ├── 256-Monster-Trap-Game-Icon-Amazingly-Strange.jpg
│       │   │   ├── 256-Snake-Bot-Monster-Game-Icon-Amazingly-Strange.jpg
│       │   ├── img-bunzilla-indie-game-artwork.jpg
│       │   ├── img-candy-corn-wall-indie-game-artwork.jpg
│       │   ├── img-dachshund-lagoon-indie-game-artwork.jpg
│       │   ├── img-gullerp-indie-game-artwork.jpg
│       │   ├── img-halloween-desert-candy-indie-game-artwork.jpg
│       │   ├── img-neezler-indie-game-artwork.png
│       │   ├── img-temple-escape-indie-game-artwork.jpg
│       │   └── img_master_grime_soap_boy.png
│       ├── badges/
│       │   ├── Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg
│       │   ├── GetItOnGooglePlay_Badge_Web_color_English.png
│       ├── games/
│       │   ├── candycorncritters/
│       │   │   ├── Candy-Corn-Critters-Game-WIP-01.jpg
│       │   │   └── candy-corn-Kickstarter-Banner-04.jpg
│       │   ├── coffeegrindercasino/
│       │   │   └── 1024x1024.png
│       │   ├── eastereggmonsters/
│       │   │   ├── 1024-Dark-Easter-Egg-Monsters-Logo.png
│       │   │   ├── 512x512-Easter_Egg_Monsters_Icon.png
│       │   │   ├── Easter-Egg-Monsters-Logo.png
│       │   │   └── Moss-Egg-Tile.png
│       │   ├── fluffshappymatch/
│       │   │   ├── Fluffs-Happy-Match-App-Store-Banner.jpg
│       │   │   ├── Fluffs-Happy-Match-Card-Memory.jpg
│       │   │   ├── Fluffs-Happy-Match-Level-Up.jpg
│       │   │   ├── Fluffs-Happy-Match-Play-Game.jpg
│       │   │   └── Fluffs-Happy-Match-Score.jpg
│       │   ├── monsterbubble/
│       │   │   ├── App-Store-Game-1024x500-Banner-Monster-Bubble.png
│       │   │   ├── Bubbles-Icon.png
│       │   │   ├── android-monster-bubble-dangerous-store-screenshot 2.png
│       │   │   └── android-monster-bubble-dangerous-store-screenshot.png
│       │   ├── monsterdishdelivery/
│       │   │   ├── 10-tablet-monster-delivery-designs-screenshot.png
│       │   │   ├── 10-tablet-monster-delivery-new-screenshot.png
│       │   │   ├── 7-tablet-monster-delivery-challenging-screenshot.png
│       │   │   ├── App-Store-Game-1024x500-Banner-Monster-Dish-Delivery.png
│       │   │   └── Monster-Dish-Delivery-Icon.png
│       │   ├── monstertrafficjam/
│       │   │   ├── Monster-Jam-1024x500-Banner.png
│       │   │   ├── Play-7-Inch-Cars-Screenshots-Monster-Jam.png
│       │   │   ├── Play-7-Inch-Cities-Screenshots-Monster-Jam.png
│       │   │   ├── Play-7-Inch-Empty-Screenshots-Monster-Jam.png
│       │   ├── monstertrap/
│       │   │   ├── 256-Monster-Trap.png
│       │   │   ├── 512-Monster-Trap.png
│       │   │   ├── App-Store-Game-1024x500-Banner-Monster-Trap.png
│       │   │   ├── Monster-Trap-Icon-02.PNG
│       │   │   ├── Monster-Trap-Icon-2048.png
│       │   │   ├── Play-10-Tablet-Clear-Screenshots-Monster-Trap.png
│       │   │   ├── Play-7-Tablet-Clear-Screenshots-Monster-Trap.png
│       │   │   └── Play-7-Tablet-Designs-Screenshots-Monster-Trap.png
│       │   ├── murkymeger/
│       │   │   ├── 1242x2208-Murky-Brillant-App-Store-Screenshots.png
│       │   │   ├── 1242x2208-Murky-Colorfull-App-Store-Screenshots.png
│       │   │   ├── 1242x2208-Murky-Connect-App-Store-Screenshots.png
│       │   │   └── 1284x2778-Murky-Matching-App-Store-Screenshots.png
│       │   └── snakebot/
│       │       ├── 1024-Snake-Bot-Monster-Game-Icon-Amazingly-Strange.png
│       │       ├── 8-Bit-Snake-Monster-GP-Store-Banner.png
│       │       ├── 8-Bit-Snake-Monster-Store-Banner.jpg
│       │       ├── 8-Bit-Snake-Monster-Store-Banner.webp
│       │       ├── 8-bit-snake-monster-banner.jpg
│       │       ├── Simple-Snake.png
│       │       └── Snake-Bot-Chomp-GIF.gif
│       ├── headers/
│       │   └── promos/
│       │       ├── Fluffs-PLAY-NOW-460x220.png
│       │       ├── Monsters-Reign-Games-Logo-460x220.png
│       │       ├── Monsters-Reign-Games-Logo.png
│       │       └── README.md
│       ├── image-fade-gallery/
│       │   ├── Amazingly-Strange-Monssters-540-01.webp
│       │   ├── Flubber-540.webp
│       │   ├── Gloorpy-Gloop-540.webp
│       │   └── Observatory-540.webp
│       ├── placeholder.jpg
│       ├── social-media/
│       │   ├── Not Used/
│       │   │   ├── 1164349_circle_instagram_logo_media_network_icon-2.png
│       │   │   ├── 1164349_circle_instagram_logo_media_network_icon.png
│       │   │   ├── instagram-circle-logo-16616.svg
│       │   │   ├── instagram-icon.png
│       │   │   ├── tiktok-icon.svg
│       │   │   ├── youtube-icon.svg
│       │   │   ├── youtube-icons-2x.png
│       │   ├── facebook-icon.png
│       │   ├── instagram-icon.png
│       │   ├── messanger-icon.svg
│       │   ├── pintrest-icon.png
│       │   ├── snapchat-icon.svg
│       │   ├── tiktok-icon.svg
│       │   ├── whatsapp-icon.svg
│       │   └── youtube-icon.svg
│       └── webp/
│           ├── 128-Candy-Corn-Critter-Amazingly-Strange-Indie-Game-Icon.webp
│           ├── 128-Easter-Egg-Monster-Amazingly-Strange-Indie-Game-Icon.webp
│           ├── 128-Monster-Dish-Delivery-Amazingly-Strange-Indie-Game-Icon.webp
│           ├── 128-Monster-Tile-Match-Amazingly-Strange-Indie-Game-Icon.webp
│           ├── 128-Monster-Traffic-Jam-Amazingly-Strange-Indie-Game-Icon.webp
│           ├── 128-Monster-Trap-Amazingly-Strange-Indie-Game-Icon.webp
│           └── 128-Snake-Bot-Monster-Amazingly-Strange-Indie-Game-Icon.webp
│   ├── includes/
│   │   └── font-system.html
│   ├── index.html
│   ├── inserts/
│   │   ├── artwork-gallery.html
│   │   ├── blog-display.html
│   │   ├── blog-preview.html
│   │   ├── brand-container.html
│   │   ├── callout.html
│   │   ├── carousel.html
│   │   ├── character-rotator.html
│   │   ├── cta-section.html
│   │   ├── enhanced-gallery.html
│   │   ├── featured-creators.html
│   │   ├── footer.html
│   │   ├── gallery.html
│   │   ├── games/
│   │   │   ├── easter-egg-monsters.html
│   │   │   ├── fluffs-happy-match.html
│   │   │   ├── monster-dish-delivery.html
│   │   │   ├── monster-traffic-jam.html
│   │   │   ├── monster-trap.html
│   │   ├── header.html
│   │   ├── image-fade-gallery.html
│   │   ├── navbar.html
│   │   ├── newsletter-section.html
│   │   ├── portfolio.html
│   │   ├── qrcode.html
│   │   ├── sample.html
│   │   ├── shopify-bat-pin.html
│   │   ├── shopify-rotator.html
│   │   ├── table-prototypes.html
│   │   └── table-prototypes.html.backup
│   ├── js/
│   │   ├── admin-access.js
│   │   ├── admin-dashboard.js
│   │   ├── analytics-manager.js
│   │   ├── artwork-gallery.js
│   │   ├── blog-display.js
│   │   ├── blog-preview.js
│   │   ├── character-rotator.js
│   │   ├── contact-form.js
│   │   ├── contact-manager.js
│   │   ├── debug/
│   │   │   ├── blog-display-debug.js
│   │   │   ├── blog-preview-debug.js
│   │   │   ├── blog-preview-simple.js
│   │   │   ├── firebasecheck.js
│   │   ├── firebase-config.js
│   │   ├── font-loader.js
│   │   ├── gallery.js
│   │   ├── game-loader.js
│   │   ├── header-sliding-controller.js
│   │   ├── image-fade-gallery.js
│   │   ├── legacy/
│   │   │   ├── admin-blog-viewer.js
│   │   │   ├── authentication-cdn.js
│   │   │   ├── blog-editor.js
│   │   │   ├── blog-firebase.js
│   │   ├── media-manager.js
│   │   ├── page-manager.js
│   │   ├── shopify-bat-pin.js
│   │   ├── shopify-rotator.js
│   │   └── test/
│   ├── pages/
│   │   ├── about.html
│   │   ├── artwork.html
│   │   ├── blog.html
│   │   ├── contact-copy.html
│   │   ├── contact.html
│   │   ├── debug-database.html
│   │   ├── developer-resources.html
│   │   ├── eula.html
│   │   ├── format-example.html
│   │   ├── g0ld3nfrog/
│   │   │   ├── firebasetest.html
│   │   │   ├── yourleaderboard.html
│   │   ├── games.html
│   │   ├── games/
│   │   │   ├── candycorncritters.html
│   │   │   ├── fluffshappymatch.html
│   │   │   ├── monstertilematch.html
│   │   │   ├── murkymerge.html
│   │   │   ├── snakebot.html
│   │   ├── image-converter.html
│   │   ├── image-gallery-demo.html
│   │   ├── image-test.html
│   │   ├── legal.html
│   │   ├── privacy-policy.html
│   │   ├── table-prototypes.html
│   │   ├── terms-of-service.html
│   │   ├── test.html
│   │   ├── user-account.html
│   ├── protected-content/
│   │   ├── admin-access copy.html
│   │   ├── admin-access.html
│   │   ├── admin-layout-test.html
│   │   ├── blog-editor.html
│   │   ├── image-converter.html
│   ├── sitemap.xml
│   ├── robots.txt
│   ├── test-prototypes.html
│   └── test/
│       └── recaptcha-test.html
├── scripts/
│   ├── README.md
│   ├── add-sample-blog-posts.js
│   ├── add-test-blog-post-with-image.js
│   ├── deploy-firestore-rules.js
│   ├── deploy-production.sh
│   ├── firebase-dev.sh
│   ├── firestore-utilities.js
│   ├── serve-local.sh
│   ├── set-admin-claims-direct.js ❌ (POTENTIALLY REDUNDANT)
│   ├── set-admin-claims.js
│   ├── test-image-storage.js
│   └── validate-and-cleanup.sh
├── setup-admin-emulator.js
├── setup-admin.sh
├── setup-recaptcha.sh
├── storage.rules
├── test-admin.js
├── test-blog-emulator.js ❌ (EMPTY FILE)
├── test-modularization.js
└── vY2ruj71HzNMcSG93R2q1mO-ZwHngUpG_sAkLv3gBQBvG0gKUft2L9DPlX9jcLpw
```

## Script Analysis

### Root Level Scripts

#### `setup-admin-emulator.js`
**Purpose:** Sets up admin user in Firebase emulators for testing
**Key Variables:**
- `admin`: Firebase Admin SDK instance
- `auth`: Firebase Auth instance
- `db`: Firestore instance
**Key Functions:**
- `setupAdminUser()`: Creates admin user with custom claims
- `verifyAdminSetup()`: Checks admin configuration
**Dependencies:** firebase-admin, firebase
**Status:** ✅ ACTIVE - Used by firebase-dev.sh

#### `setup-admin.sh`
**Purpose:** Comprehensive admin dashboard setup script
**Key Variables:**
- `FIREBASE_CONFIG`: Firebase project configuration
- `ADMIN_EMAIL`: Admin user email
**Key Functions:**
- `create_admin_user()`: Sets up admin authentication
- `deploy_rules()`: Deploys Firestore and Storage rules
- `setup_indexes()`: Creates Firestore indexes
**Dependencies:** firebase-tools, bash utilities
**Status:** ✅ ACTIVE - Referenced in documentation

#### `setup-recaptcha.sh`
**Purpose:** Configures Google reCAPTCHA v3 for contact forms
**Key Variables:**
- `site_key`: reCAPTCHA site key from Google
- `secret_key`: reCAPTCHA secret key (server-side)
**Key Functions:**
- `update_site_key()`: Updates site key in HTML files
- `create_backup()`: Creates backup before modifications
- `validate_site_key()`: Validates reCAPTCHA key format
**Dependencies:** bash utilities, sed for file editing
**Status:** ✅ ACTIVE - Used for contact form security

#### `test-admin.js`
**Purpose:** Tests admin dashboard setup and file existence
**Key Variables:**
- `requiredFiles`: Array of required admin files
- `allFilesExist`: Boolean flag for validation
**Key Functions:**
- File existence checking
- Basic validation reporting
**Dependencies:** Node.js fs module
**Status:** ✅ ACTIVE - Used for setup verification

#### `test-blog-emulator.js`
**Purpose:** (Empty file - no functionality)
**Status:** ❌ UNUSED - Empty file, safe to delete

#### `test-modularization.js`
**Purpose:** Tests admin interface modularization and file structure
**Key Variables:**
- `modularFiles`: Array of expected modular files
- `syntaxErrors`: Counter for JavaScript syntax issues
**Key Functions:**
- `checkFileExistence()`: Validates file presence
- `validateSyntax()`: Basic syntax checking
**Dependencies:** Node.js fs module
**Status:** ✅ ACTIVE - Used for development validation

#### `create-sample-posts.js` ❌ REDUNDANT
**Purpose:** Creates sample blog posts (replaced by scripts/add-sample-blog-posts.js)
**Status:** ❌ REDUNDANT - Safe to delete, replaced by scripts/add-sample-blog-posts.js

### Scripts Directory

#### `scripts/add-sample-blog-posts.js`
**Purpose:** Populates blog with sample content for testing
**Key Variables:**
- `samplePosts`: Array of blog post objects
- `admin`: Firebase Admin SDK
- `db`: Firestore database instance
**Key Functions:**
- `addSamplePosts()`: Main function to add posts
- Post data generation with timestamps
**Dependencies:** firebase-admin
**Status:** ✅ ACTIVE - Used for blog testing

#### `scripts/add-test-blog-post-with-image.js`
**Purpose:** Creates test blog post with image upload
**Key Variables:**
- `testPost`: Blog post data object
- `imagePath`: Path to test image file
**Key Functions:**
- `uploadImage()`: Handles image upload to Storage
- `createPost()`: Creates blog post with image reference
**Dependencies:** firebase-admin, fs
**Status:** ✅ ACTIVE - Used for image upload testing

#### `scripts/deploy-firestore-rules.js`
**Purpose:** Deploys Firestore security rules and indexes
**Key Variables:**
- `rulesPath`: Path to firestore.rules file
- `indexesPath`: Path to firestore.indexes.json
**Key Functions:**
- `deployRules()`: Deploys security rules
- `deployIndexes()`: Deploys database indexes
**Dependencies:** firebase-tools
**Status:** ✅ ACTIVE - Used in deployment process

#### `scripts/deploy-production.sh`
**Purpose:** Production deployment with pre-deployment checks
**Key Variables:**
- `FILES_TO_CHECK`: Array of critical files to validate
- `PROJECT`: Firebase project ID
**Key Functions:**
- `check_files()`: Validates file existence
- `validate_syntax()`: Checks JavaScript syntax
- `deploy()`: Executes Firebase deployment
**Dependencies:** firebase-tools, bash utilities
**Status:** ✅ ACTIVE - Production deployment script

#### `scripts/firebase-dev.sh`
**Purpose:** Firebase emulator management and development helper
**Key Variables:**
- `EMULATOR_PORTS`: Port configuration for emulators
- `EMULATOR_UI_URL`: Emulator UI access URL
**Key Functions:**
- `cmd_start()`: Starts all Firebase emulators
- `cmd_stop()`: Stops running emulators
- `cmd_admin()`: Sets up admin user
- `cmd_test()`: Quick test environment setup
**Dependencies:** firebase-tools, bash utilities
**Status:** ✅ ACTIVE - Primary development tool

#### `scripts/firestore-utilities.js`
**Purpose:** Firestore database utilities and maintenance
**Key Variables:**
- `db`: Firestore database instance
- `collectionName`: Target collection name
**Key Functions:**
- `backupCollection()`: Creates collection backup
- `restoreCollection()`: Restores from backup
- `clearCollection()`: Removes all documents
**Dependencies:** firebase-admin
**Status:** ✅ ACTIVE - Database maintenance

#### `scripts/serve-local.sh`
**Purpose:** Local development server setup
**Key Variables:**
- `PORT`: Server port number
- `HOST`: Server host address
**Key Functions:**
- `start_server()`: Starts local HTTP server
- `check_dependencies()`: Validates required tools
**Dependencies:** Python/http-server, bash utilities
**Status:** ✅ ACTIVE - Local development

#### `scripts/set-admin-claims-direct.js`
**Purpose:** Direct admin claims management (potentially redundant)
**Status:** ⚠️ POTENTIALLY REDUNDANT - May be replaced by set-admin-claims.js

#### `scripts/set-admin-claims.js`
**Purpose:** Comprehensive admin user claims management
**Key Variables:**
- `admin`: Firebase Admin SDK
- `auth`: Firebase Auth instance
**Key Functions:**
- `addAdmin()`: Grants admin privileges
- `removeAdmin()`: Revokes admin privileges
- `listAdmins()`: Lists current admins
- `verifyAdmin()`: Checks admin status
**Dependencies:** firebase-admin
**Status:** ✅ ACTIVE - Admin user management

#### `scripts/test-image-storage.js`
**Purpose:** Tests Firebase Storage image upload functionality
**Key Variables:**
- `storage`: Firebase Storage instance
- `testImagePath`: Path to test image
**Key Functions:**
- `uploadTestImage()`: Uploads test image
- `verifyUpload()`: Validates successful upload
- `cleanupTest()`: Removes test files
**Dependencies:** firebase-admin
**Status:** ✅ ACTIVE - Storage testing

#### `scripts/validate-and-cleanup.sh`
**Purpose:** Project validation and cleanup script
**Key Variables:**
- `PROJECT_ROOT`: Project root directory
- `EXCLUDE_PATTERNS`: Files to exclude from cleanup
**Key Functions:**
- `validate_structure()`: Checks project structure
- `cleanup_temp()`: Removes temporary files
- `validate_deps()`: Checks dependencies
**Dependencies:** bash utilities, find, grep
**Status:** ✅ ACTIVE - Project maintenance

### Firebase Functions

#### `functions/index.js`
**Purpose:** Firebase Cloud Function for domain-based routing
**Key Variables:**
- `publicDir`: Path to public directory
- `app`: Express application instance
**Key Functions:**
- Domain routing based on hostname
- Static asset serving
- SPA fallback handling
**Dependencies:** firebase-functions, express, node:path
**Status:** ✅ ACTIVE - Domain routing

### Admin JavaScript Modules

#### `public/admin/js/admin-core.js`
**Purpose:** Core admin interface functionality and tab management
**Key Variables:**
- `tabTitles`: Mapping of tab names to display titles
- `sidebar`: Admin sidebar element reference
**Key Functions:**
- `showTab()`: Tab switching logic
- `toggleSidebar()`: Sidebar collapse/expand
- `showAlert()`: Alert notification system
**Dependencies:** None (vanilla JS)
**Status:** ✅ ACTIVE - Loaded by admin.html

#### `public/admin/js/blog-manager.js`
**Purpose:** Complete blog post management system
**Key Variables:**
- `currentUser`: Current authenticated user
- `currentPostId`: ID of post being edited
- `isSaving`: Save operation state flag
**Key Functions:**
- `saveBlogPost()`: Creates/updates blog posts
- `loadBlogPosts()`: Loads and displays posts
- `setupAuthListener()`: Authentication state monitoring
- `uploadBlogImage()`: Image upload with compression
- `showBlogLibraryMode()`: Opens media picker for image selection
- `showBlogUploadMode()`: Toggles to upload form
**Dependencies:** `firebase-config.js`, `media-manager.js` (via window.openMediaSelector)
**Status:** ✅ ACTIVE - Loaded by admin.html
**Dependencies:** Firebase SDK (auth, firestore, storage)
**Status:** ✅ ACTIVE - Loaded by admin.html

#### `public/admin/js/page-manager.js`
**Purpose:** Page content management
**Key Variables:**
- `currentPage`: Currently edited page
- `pageData`: Page content data
**Key Functions:**
- `loadPage()`: Loads page content
- `savePage()`: Saves page changes
- `previewPage()`: Page preview functionality
**Dependencies:** Firebase Firestore
**Status:** ✅ ACTIVE - Loaded by admin.html

#### `public/admin/js/media-manager.js`
**Purpose:** Media library management
**Key Variables:**
- `mediaFiles`: Array of media files
- `uploadQueue`: Files queued for upload
**Key Functions:**
- `uploadMedia()`: File upload handling
- `displayMedia()`: Media gallery display
- `deleteMedia()`: Media file removal
**Dependencies:** Firebase Storage
**Status:** ✅ ACTIVE - Loaded by admin.html

#### `public/admin/js/brand-header-manager.js`
**Purpose:** Brand header customization
**Key Variables:**
- `brandSettings`: Brand configuration object
- `headerElements`: Header DOM elements
**Key Functions:**
- `updateBrandHeader()`: Header customization
- `saveBrandSettings()`: Settings persistence
- `previewChanges()`: Live preview
**Dependencies:** Firebase Firestore
**Status:** ✅ ACTIVE - Loaded by admin.html

#### `public/admin/js/layout-manager.js`
**Purpose:** Layout and element management
**Key Variables:**
- `layoutConfig`: Layout configuration
- `elements`: Array of layout elements
**Key Functions:**
- `addElement()`: Adds layout elements
- `moveElement()`: Element positioning
- `configureLayout()`: Layout settings
**Dependencies:** Firebase Firestore
**Status:** ✅ ACTIVE - Loaded by admin.html

#### `public/admin/js/element-manager.js`
**Purpose:** Individual element configuration
**Key Variables:**
- `elementTypes`: Available element types
- `elementConfig`: Element configuration data
**Key Functions:**
- `createElement()`: Element creation
- `editElement()`: Element editing
- `deleteElement()`: Element removal
**Dependencies:** Firebase Firestore
**Status:** ✅ ACTIVE - Loaded by admin.html

### Client-Side JavaScript

#### `public/js/firebase-config.js`
**Purpose:** Centralized Firebase configuration and initialization
**Key Variables:**
- `firebaseConfig`: Firebase project configuration
- `auth`: Firebase Auth instance
- `db`: Firestore instance
- `storage`: Firebase Storage instance
**Key Functions:**
- Emulator connection (development)
- Analytics initialization (production)
**Dependencies:** Firebase SDK
**Status:** ✅ ACTIVE - Imported by multiple modules

## Scripts Marked for Deletion

1. **`create-sample-posts.js`** - Redundant, replaced by `scripts/add-sample-blog-posts.js`
2. **`test-blog-emulator.js`** - Empty file with no functionality
3. **`scripts/set-admin-claims-direct.js`** - Potentially redundant with `set-admin-claims.js` (needs verification)

## Recommendations

1. **Delete redundant files** listed above after confirming no external references
2. **Consolidate admin scripts** - Consider moving root-level scripts to `scripts/` directory for better organization
3. **Add script documentation** - Update `SCRIPTS_README.md` with current script inventory
4. **Implement script testing** - Add automated testing for critical scripts
5. **Version control** - Tag script versions for deployment rollback capability</content>
<parameter name="filePath">/Users/brianlindahl/Development/Hosting/amazinglystrange/docs/AMAZINGLYSTRANGE_TREE.md