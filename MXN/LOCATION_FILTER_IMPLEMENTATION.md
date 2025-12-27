# LOCATION FILTER TOOL - Complete Implementation Guide

**Package:** `@amazing/location-filter`  
**Version:** 1.0.0  
**Status:** ✅ Core Structure Complete  
**Last Updated:** December 20, 2025

---

## 📋 Overview

The Location Filter Tool enables MXN.CHAT users to filter "thoughts" and "vibes" by geographic proximity while maintaining privacy through hierarchical location sharing (Country → State → County → ZIP).

### Key Features

✅ **Privacy-First Design**: Users control granularity (never store exact coordinates)  
✅ **Hierarchical Filtering**: Cascading selection from broad to specific regions  
✅ **VIBE Aesthetic Integration**: Matches MXN.CHAT's pill dropdown visual style  
✅ **Admin Moderation**: Manage geographic boundaries and blocklists  
✅ **Real-time Updates**: Supabase subscriptions for live filtering  

---

## 🏗️ Architecture

### Package Structure

```
/SHARED/location-filter/
├── package.json              # Package configuration
├── tsconfig.json             # TypeScript config
├── schema.sql                # Supabase database schema
├── README.md                 # Package documentation
└── src/
    ├── index.ts              # Main export
    ├── types/
    │   └── location.ts       # TypeScript interfaces
    ├── lib/
    │   ├── locationData.ts   # Geographic hierarchy (US states, etc.)
    │   ├── privacyLevels.ts  # Privacy level configuration
    │   └── filterUtils.ts    # Filtering logic
    ├── components/
    │   ├── LocationPillDropdown.tsx   # PILL UI (replaces current)
    │   ├── LocationSelector.tsx       # Modal for location selection
    │   └── LocationBadge.tsx          # Display badge for messages
    └── hooks/
        ├── useLocationFilter.ts       # Main filtering hook
        └── useUserLocation.ts         # User location management
```

### Admin Components

```
/ADMIN/src/components/location-manager/
├── LocationManager.tsx        # Main admin dashboard
├── RegionAnalytics.tsx        # Usage statistics
├── LocationModeration.tsx     # Block/unblock regions
├── GeographicHierarchy.tsx    # Manage region tree
├── PrivacySettings.tsx        # Platform-wide defaults
└── README.md                  # Admin documentation
```

---

## 📊 Database Schema

### Tables

#### `user_locations`
Stores user's location preferences with privacy controls.

```sql
CREATE TABLE user_locations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  country TEXT NOT NULL,
  state TEXT,
  county TEXT,
  zip_code TEXT,
  privacy_level TEXT CHECK (privacy_level IN ('country', 'state', 'county', 'zip')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);
```

#### `geographic_regions`
Admin-managed hierarchy of countries, states, counties.

```sql
CREATE TABLE geographic_regions (
  id UUID PRIMARY KEY,
  type TEXT CHECK (type IN ('country', 'state', 'county', 'zip')),
  name TEXT NOT NULL,
  code TEXT,
  parent_id UUID REFERENCES geographic_regions(id),
  is_active BOOLEAN DEFAULT true,
  moderator_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(name, type, parent_id)
);
```

#### `messages` (Enhancement)
Add location tagging to existing messages table.

```sql
ALTER TABLE messages ADD COLUMN location_tag JSONB;

-- Example: { "country": "United States", "state": "Texas", "privacyLevel": "state", "displayName": "Texas" }
```

### Indexes

```sql
CREATE INDEX idx_user_locations_user_id ON user_locations(user_id);
CREATE INDEX idx_messages_location_tag ON messages USING GIN(location_tag);
CREATE INDEX idx_geographic_regions_type ON geographic_regions(type);
```

### RLS Policies

```sql
-- Users can only view/edit their own location
CREATE POLICY "Users can view own location"
  ON user_locations FOR SELECT
  USING (auth.uid() = user_id);

-- All authenticated users can view active regions
CREATE POLICY "Users can view active regions"
  ON geographic_regions FOR SELECT
  USING (auth.role() = 'authenticated' AND is_active = true);
```

---

## 🎨 UI/UX Integration

### Current PILL DROPDOWN (ChatInterface.tsx)

**Location:** [ChatInterface.tsx](../../../mxn-chat/src/components/ChatInterface.tsx#L381-L402)

**Current Code:**
```tsx
{/* Location Pills */}
<div className="flex flex-wrap items-center gap-2">
  {[locationFilter.region, locationFilter.country, locationFilter.state, locationFilter.county].map((loc, i) => (
    <button
      key={i}
      className="px-3 py-1 rounded-full bg-black/30 border border-purple-500 text-xs text-purple-300 hover:border-purple-400 hover:text-purple-200 hover:bg-purple-900/20 transition-all flex items-center gap-1 group"
    >
      {loc}
      <ChevronDown className="w-3 h-3 text-purple-400 group-hover:text-purple-300 transition-colors" />
    </button>
  ))}
</div>
```

### Enhanced PILL DROPDOWN (With Location Filter)

```tsx
import { LocationPillDropdown, useLocationFilter } from '@amazing/location-filter';
import { supabase } from '@/lib/supabase';

// In ChatInterface component:
const { userLocation, updateLocation, filterMessages } = useLocationFilter(
  supabase,
  state.currentUser?.id
);

// Replace current pills with:
<LocationPillDropdown
  location={userLocation || { country: 'United States', privacyLevel: 'country' }}
  vibeColor={currentVibeData.solidBg}
  onLocationChange={(field, value) => {
    // Open LocationSelector modal
    setShowLocationSelector(true);
  }}
/>
```

### LocationSelector Modal

```tsx
const [showLocationSelector, setShowLocationSelector] = useState(false);

<LocationSelector
  isOpen={showLocationSelector}
  onClose={() => setShowLocationSelector(false)}
  onSelect={async (location) => {
    await updateLocation(location);
    setShowLocationSelector(false);
  }}
  defaultPrivacyLevel="state"
  initialLocation={userLocation}
/>
```

---

## 🔐 Privacy Model

### User Control Levels

| Privacy Level | What's Shared | Display Example | Visibility Radius |
|---------------|---------------|-----------------|-------------------|
| **Country** | Country only | "United States" | National |
| **State** (Recommended) | Country + State | "Texas" | State-wide |
| **County** | Country + State + County | "Travis County" | County-wide |
| **ZIP** | Country + State + ZIP | "78701" | Local |

### Filtering Logic

```typescript
// User in Texas with state-level privacy
// Sees messages from:
// ✅ Other Texas users (state match)
// ✅ United States users (country-wide if enabled)
// ❌ California users (different state)

const filteredMessages = filterMessages(messages, {
  matchLevel: 'state',     // User's privacy level
  includeParent: true      // Show broader locations too
});
```

### Anonymous Display

```tsx
// User posts with county-level privacy
// Message displays: "💭 Thought from Texas" (not "Travis County")

<LocationBadge
  locationTag={{
    country: 'United States',
    state: 'Texas',
    county: 'Travis County',
    privacyLevel: 'county'
  }}
  compact={true}
/>
// Renders: "📍 Texas"
```

---

## 🚀 Implementation Steps

### Phase 1: Setup & Schema ✅

1. ✅ Create `/SHARED/location-filter/` package
2. ✅ Define TypeScript interfaces
3. ✅ Write Supabase schema (`schema.sql`)
4. ✅ Seed US states and counties

**Run Migration:**
```bash
cd /Users/brianlindahl/Development/Business/Websites/mxn-chat
supabase db push
# Apply: /SHARED/location-filter/schema.sql
```

### Phase 2: Components ✅

1. ✅ Build `LocationPillDropdown` (matches VIBE aesthetic)
2. ✅ Build `LocationSelector` modal with cascading dropdowns
3. ✅ Build `LocationBadge` for message display
4. ✅ Implement `useLocationFilter` hook

**Build Package:**
```bash
cd /SHARED/location-filter
npm install
npm run build
```

### Phase 3: Integration (TODO)

1. ⏳ Install package in MXN.CHAT:
   ```bash
   cd /Users/brianlindahl/Development/Business/Websites/mxn-chat
   npm install file:../../SHARED/location-filter
   ```

2. ⏳ Update [ChatInterface.tsx](../../../mxn-chat/src/components/ChatInterface.tsx):
   ```tsx
   // Replace lines 381-402 with LocationPillDropdown
   import { LocationPillDropdown } from '@amazing/location-filter';
   ```

3. ⏳ Add location tagging to message creation:
   ```tsx
   // In MessageInput.tsx or ChatContext.tsx
   import { createLocationTag } from '@amazing/location-filter';

   const handleSendMessage = async (text: string) => {
     const locationTag = userLocation 
       ? createLocationTag(userLocation) 
       : null;

     await supabase.from('messages').insert({
       text,
       location_tag: locationTag,
       // ... other fields
     });
   };
   ```

4. ⏳ Filter messages by location in ChatContext:
   ```tsx
   const { filterMessages } = useLocationFilter(supabase, userId);

   // In message subscription:
   const filteredMessages = filterMessages(messages, {
     matchLevel: userLocation?.privacyLevel || 'state',
     includeParent: true
   });
   ```

### Phase 4: Admin Dashboard ✅

1. ✅ Create ADMIN components (`/ADMIN/src/components/location-manager/`)
2. ✅ Build analytics view
3. ✅ Build moderation tools
4. ✅ Build privacy settings

**Run ADMIN:**
```bash
cd /Users/brianlindahl/Development/Business/ADMIN
npm run dev
# Navigate to: http://localhost:3005/location-manager
```

### Phase 5: Testing & Deployment (TODO)

1. ⏳ Test user location selection flow
2. ⏳ Test message filtering by location
3. ⏳ Test admin moderation (block/unblock regions)
4. ⏳ Deploy schema to production Supabase
5. ⏳ Deploy MXN.CHAT with location filter

---

## 📚 Usage Examples

### Basic Setup (MXN.CHAT)

```tsx
import { 
  useLocationFilter, 
  LocationPillDropdown, 
  LocationSelector 
} from '@amazing/location-filter';
import { supabase } from '@/lib/supabase';

function ChatInterface() {
  const { state } = useChat();
  const { 
    userLocation, 
    updateLocation, 
    filterMessages 
  } = useLocationFilter(supabase, state.currentUser?.id);

  const [showSelector, setShowSelector] = useState(false);

  return (
    <>
      <LocationPillDropdown
        location={userLocation || { country: 'United States', privacyLevel: 'country' }}
        vibeColor="#c084fc"
        onLocationChange={() => setShowSelector(true)}
      />

      <LocationSelector
        isOpen={showSelector}
        onClose={() => setShowSelector(false)}
        onSelect={updateLocation}
        defaultPrivacyLevel="state"
      />
    </>
  );
}
```

### Filter Messages

```tsx
// Get user's location
const { userLocation } = useLocationFilter(supabase, userId);

// Filter thoughts by location
const localThoughts = filterMessages(allThoughts, {
  matchLevel: 'state',     // Match at state level
  includeParent: true,     // Include country-wide thoughts
  strictMatch: false       // Allow broader matches
});

// Result: User in Texas sees:
// ✅ Thoughts from Texas
// ✅ Thoughts from United States (if includeParent: true)
// ❌ Thoughts from California
```

### Display Location Badge

```tsx
import { LocationBadge } from '@amazing/location-filter';

<div className="message">
  <LocationBadge
    locationTag={message.location_tag}
    compact={true}
    showPrivacyLevel={false}
  />
  <p>{message.text}</p>
</div>

// Renders: "📍 Texas" + message text
```

---

## 🛠️ Admin Features

### Analytics Dashboard

View location-based usage:
- Total users by region
- Message counts per location
- Average engagement metrics
- Filter by country/state/county

### Moderation Tools

- Search and filter regions
- Block/unblock problematic locations
- View report counts
- Add moderator notes

### Geographic Hierarchy

- Tree view of countries → states → counties
- Add/edit/remove regions
- Expand/collapse hierarchy

### Privacy Settings

Platform-wide configuration:
- Default privacy level (recommended: state)
- Allow ZIP code sharing
- Enable country-wide filtering
- Require location for posting
- Location badge display settings

---

## 🔄 Migration Checklist

### Pre-Migration

- [ ] Backup existing MXN.CHAT database
- [ ] Test schema in development Supabase instance
- [ ] Build location-filter package
- [ ] Review existing pill dropdown code

### Migration Steps

1. [ ] Apply `schema.sql` to Supabase
2. [ ] Run seed data (US states)
3. [ ] Install package in MXN.CHAT
4. [ ] Replace pill dropdown in ChatInterface.tsx
5. [ ] Add location tagging to message creation
6. [ ] Update message filtering logic
7. [ ] Test on staging environment
8. [ ] Deploy to production

### Post-Migration

- [ ] Monitor Supabase logs for errors
- [ ] Check RLS policies are working
- [ ] Verify location filtering accuracy
- [ ] Gather user feedback
- [ ] Add more countries/regions as needed

---

## 📖 API Reference

### useLocationFilter Hook

```typescript
const {
  userLocation,      // Current user's location
  updateLocation,    // Update user location
  clearLocation,     // Remove user location
  filterMessages,    // Filter messages by location
  isLoading,         // Loading state
  error              // Error state
} = useLocationFilter(supabase, userId);
```

### LocationPillDropdown Component

```typescript
<LocationPillDropdown
  location={{
    country: 'United States',
    state: 'Texas',
    county: 'Travis County',
    zipCode: '78701'
  }}
  vibeColor="#c084fc"              // Matches current VIBE
  onLocationChange={(field, value) => {}}
  onClearFilter={(field) => {}}
/>
```

### LocationSelector Component

```typescript
<LocationSelector
  isOpen={true}
  onClose={() => {}}
  onSelect={(location) => {}}
  defaultPrivacyLevel="state"
  initialLocation={userLocation}
/>
```

---

## 🎯 Next Steps

### Immediate (This Week)

1. Run Supabase migration in MXN.CHAT dev environment
2. Build location-filter package
3. Test LocationSelector modal standalone
4. Replace pill dropdown in ChatInterface.tsx

### Short-Term (Next 2 Weeks)

1. Add location tagging to new messages
2. Implement message filtering
3. Test with real users
4. Deploy to staging

### Long-Term (Next Month)

1. Add more countries (Canada, UK, Mexico)
2. County-level data for all US states
3. Advanced filtering (distance-based)
4. Location-based analytics for admin

---

## 🐛 Troubleshooting

### Issue: Location pills not showing
- **Solution**: Verify user_locations table has data for user
- **Check**: `SELECT * FROM user_locations WHERE user_id = 'xxx';`

### Issue: Messages not filtering by location
- **Solution**: Ensure location_tag column exists on messages
- **Check**: `ALTER TABLE messages ADD COLUMN location_tag JSONB;`

### Issue: Admin can't block regions
- **Solution**: Verify admin user has is_admin = true
- **Check**: RLS policies on geographic_regions table

### Issue: Package import errors
- **Solution**: Rebuild package and reinstall
```bash
cd /SHARED/location-filter
npm run build
cd ../../mxn-chat
npm install file:../../SHARED/location-filter
```

---

## 📞 Support

For questions or issues:
- Review: [SHARED/location-filter/README.md](../../../SHARED/location-filter/README.md)
- Check: [ADMIN location-manager README](../../../ADMIN/src/components/location-manager/README.md)
- Contact: MagicWRX Studio Team

---

**Status:** ✅ Core structure complete, ready for integration  
**Version:** 1.0.0  
**Last Updated:** December 20, 2025
