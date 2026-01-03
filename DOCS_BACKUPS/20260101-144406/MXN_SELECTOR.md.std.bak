---
title: "MXN Selector (SSOT)"
ssot: true
owner: "brianlindahl"
status: "active"
codeRefs:
  - "SHARED/selector/src"
relatedDocs:
  - "MXN_CHAT.md"
  - "MXN_VIBE_CONTROLLER.md"
lastReviewed: "2026-01-01"
tags:
  - "selector"
  - "ui"
---

# MXN Selector (SSOT)

**Document Date:** December 31, 2025  
**Last Updated:** December 31, 2025  
**Version:** 1.1.0 (Settings Sync + Terminology Clarification)  
**Status:** Active

---

## 🎯 Purpose

This document is the **Single Source of Truth (SSOT)** for **Selectors** in MXN.CHAT — discrete-choice UI tools where a user selects one value from a defined set.

This includes the canonical “Vibe Selector” pattern (USER STATUS vibe indicator + ring picker), and documents how current Settings surfaces use selector-like controls.

---

## 📚 Canonical Definitions (Selectors vs Controllers vs Indicators vs Tabs)

These words frequently drift. Use these definitions consistently across docs and UI:

- **Indicator**: Shows state (may be interactive, but doesn’t have to be).
- **Selector**: Lets the user choose **one** value from a discrete option set.
  - Typical structure: **Indicator Button** → opens **Picker Overlay** anchored to the button.
- **Controller**: Adjusts a value that is not “one-of-many” (toggle, slider, incremental, etc.).
- **Tab**: A navigation/filter affordance that switches view or filters content.

Shape vocabulary:
- **Circle**: Filled interior.
- **Ring**: Outline with transparent interior.
- **Bubble**: A ring-rendered circle used as an interactive Thought in the Lounge.
- **Pill**: Rounded-rectangle chip/button.

Canonical term map lives in [MXN_CHAT.md](MXN_CHAT.md) (Terminology SSOT).

This document defines the technical foundation for the **Selector** tool: a compact **Indicator Button** that both **shows a current value** and **opens a picker** anchored precisely over itself.

In mxn-chat, the first production-grade instance is the **Vibe Indicator** inside **USER STATUS** (the “ring picker / ring stack”).

The Selector is intended to become a reusable UI primitive for: vibe, presence, mode, theme, and other “small button → choose one” experiences.

## Terminology (use this language consistently)

- **Selector**: the full tool (button + overlay picker + interaction + persistence).
- **Vibe Selector**: the Selector configured for vibe values.
- **Indicator / Vibe Indicator**: the **button surface** that displays the current selection.
- **Picker / Overlay**: the floating UI that contains the options.
- **Option Stack (Stack Mode)**: vertical stacked options (rings) centered on the indicator.
- **Carousel (Gallery Mode)**: horizontal sliding options with a larger center item (gallery-like).

Practical rule: the “Indicator” is not a separate component anymore — it is the Selector’s button state.

---

## ✅ Current Settings & Selector Inventory (mxn-chat)

This section reflects what is currently implemented in the codebase (not aspirational).

### 1) Vibe Selector (Alias Vibe)

**What it controls:** the active alias’s saved vibe (discrete set of 6 vibes).

**Where it appears:**
- USER STATUS (desktop sidebar + mobile top bar)
- “Adjust Your Vibe” modal (Settings)

**Canonical parts:**
- **Indicator**: the visible vibe ring/circle in USER STATUS
- **Picker**: the ring stack overlay anchored to the indicator

**Persistence:** updates `aliases.vibe` via context (`updateAliasVibe`).

**Code references:**
- `../../Websites/mxn-chat/src/components/ChatInterface.tsx` (USER STATUS vibe indicator + anchored picker)
- `../../Websites/mxn-chat/src/components/UserSettingsModal.tsx` (Adjust Your Vibe modal)

### 2) Alias Selector (Active Alias)

**What it controls:** which alias is active.

**Where it appears:**
- “Adjust Your Vibe” modal lists aliases and allows switching.

**Behavior:** switch active alias via context (`switchAlias`).

**Code reference:**
- `../../Websites/mxn-chat/src/components/UserSettingsModal.tsx`

### 3) Location Selector (Pill Dropdown + Selector Modal)

**What it controls:** privacy-preserving geographic scope (Country → State → County → ZIP).

**UI shape:**
- **Pill dropdown** shows current location scope and opens selection.
- **Selector modal** edits location and privacy level.

**Code references:**
- `../../Websites/mxn-chat/src/components/ChatInterface.tsx`
- Implemented via `@amazing/location-filter` (see [LOCATION_FILTER_IMPLEMENTATION.md](LOCATION_FILTER_IMPLEMENTATION.md))

### 4) Profile Picture Selector (Avatar / Gradient)

**What it controls:** profile picture selection / gradient selection (multi-choice + edit). This is a selector-style modal, but it’s not the same anchored “indicator → picker” primitive.

**Code reference:**
- `../../Websites/mxn-chat/src/components/ProfilePictureSelector.tsx`

### 5) Notification Settings (Controllers)

These are **controllers** (toggles), not selectors:
- Push Notifications enable/disable
- Sound on/off
- Show previews on/off
- Do Not Disturb on/off

**Code reference:**
- `../../Websites/mxn-chat/src/components/NotificationSettings.tsx`

---

## Goals

- **Single Source of Truth (SSOT)**: one authoritative implementation per Selector instance.
- **Precise anchoring**: picker renders exactly on the indicator center.
- **Responsive-safe**: works when desktop + mobile variants both exist in the DOM.
- **Interaction model**:
  - Hover-open (mouse)
  - Click-open (manual mode)
  - Drag/slide selection (pointer)
  - Auto-close when leaving button + picker (hover mode)
- **Persistence**: commits to the correct owner scope (for vibes: active alias `aliases.vibe`).

## Reference + Sandbox

Production reference:
- mxn-chat: `ChatInterface.tsx` → `renderUserStatus()` (SSOT) and `renderUserVibeRing()`.

Sandbox reference (for rapid iteration):
- SHARED package: `/Users/brianlindahl/Development/Business/SHARED/selector`
- Hub route: `http://localhost:3000/selector`

The sandbox exists so we can evolve the Selector behavior independently of mxn-chat UI complexity.

## Host Integration Requirement (Tailwind / Styling)

The sandbox implementation uses Tailwind utility classes (e.g., `h-8 w-8`).

If the host app (Hub, Admin, etc.) uses Tailwind, it must include the selector package in its Tailwind `content` globs so those classes are generated.

Example (Hub): include `../selector/src/**/*` (and/or `../selector/dist/**/*`) in `tailwind.config`.

If you do not use Tailwind, you must provide equivalent CSS for sizing/positioning.

## Architecture (what makes it “precise” and stable)

### 1) SSOT Rendering

Selectors must not be duplicated across the UI tree.

If multiple components independently render the same Selector, you get:
- Competing state
- Conflicting refs
- Multiple overlays
- Non-deterministic hover/close behavior

### 2) Portal Overlay (why the picker must be portaled)

Even when an overlay uses `position: fixed`, it can be visually offset if any ancestor introduces a new positioning/transform context.

**Foundation rule**: render the Picker via `createPortal(..., document.body)`.

This makes `fixed` positioning truly viewport-based.

### 3) Anchor Computation (center-of-button)

Anchoring uses the indicator button’s bounding rectangle:

- `rect = button.getBoundingClientRect()`
- `anchor.x = rect.left + rect.width / 2`
- `anchor.y = rect.top + rect.height / 2`

Picker container style:

- `left: ${anchor.x}px`
- `top: ${anchor.y}px`
- `transform: translate(-50%, -50%)`

Result: the Picker is centered exactly over the Indicator.

### 4) Responsive Pitfall (the reason you saw top-left)

In many Next/Tailwind layouts, you render both desktop and mobile variants at once, and hide one with CSS:

- Desktop: `hidden md:flex ...`
- Mobile: `md:hidden ...`

Both elements exist in the DOM. If they share a single React ref, the ref may attach to the hidden element.

Hidden elements often report a zero-sized rect → the anchor becomes wrong (commonly near top-left).

**Foundation rule**:
- Maintain per-variant refs (e.g., `desktopRef` and `mobileRef`).
- When anchoring, select the **visible** element:
  - `el.getClientRects().length > 0`
  - `rect.width > 0 && rect.height > 0`

### 5) Rules of Hooks (critical for stability)

Do not put `useEffect`/`useLayoutEffect` inside helper render functions.

**Foundation rule**:
- All Selector lifecycle hooks (anchor tracking, hover-close timers, scroll/resize listeners) live at the component level.

### 6) Anchor Tracking Lifecycle

While the Picker is open, keep the anchor updated:

- Use `useLayoutEffect` (pre-paint) to avoid visual “jump”.
- Listen to:
  - `scroll` with capture (`true`) so nested scrollers are handled
  - `resize`
- If the rect is temporarily unmeasurable (0×0), retry with `requestAnimationFrame`.

## Interaction Models (two variants)

### A) Stack Mode (“Ring Stack / Ring Picker”)

This is the current vibe selection behavior:

- The options are stacked vertically at the indicator center.
- Pointer movement up/down shifts the stack and biases selection.

Conceptually:

- `dy = clientY - anchorY`
- `steps = round(dy / STEP)`
- `nextIndex = clamp(currentIndex + steps)`

This gives a controllable “self-scrolling” selection feel.

### B) Carousel Mode (Gallery-style evolution)

This is the pattern you described from dynamic image galleries:

- Items slide left/right when toggling.
- Center item is largest.
- Adjacent previous/next are ~10% smaller.
- All other items are ~80% of the center (and typically lower opacity).

This is a strong evolution path for Selector because it is:
- Visually intuitive
- Compact
- Easy to control with left/right toggles and/or drag

In the SHARED sandbox, this is represented as “carousel mode”.

### C) Switch Mode (Letter Stack)

Switch Mode is a Selector variant where:

- The **Indicator** is a single **capital letter button**.
- The letters above/below are **lowercase**.
- Lowercase letters remain hidden until the Indicator is hovered/opened.
- Sliding up/down on the Indicator changes which letter becomes the capital button.

Example visual model:

```
a
b
c
D
e
f
g
```

Behavior rule:

- Slide **up**: `D` becomes `d`, and `C` becomes the new capital Indicator.
- Slide **down**: `D` becomes `d`, and `E` becomes the new capital Indicator.

This mode is designed for “tight” value switching where the current selection must be readable at a glance and navigation is naturally up/down.

### D) Switch Snap Mode (Elegant / Elastic Snap)

Switch Snap Mode works **exactly like Switch Mode** for interaction (slide through letters, commit only on release or click), but with visual refinements:

- The **Indicator button is larger** (roughly 2×).
- The option letters are **spaced further apart** vertically.
- **Snap-to-center feel**: when you slide past the halfway point to a neighbor, that letter smoothly snaps into the center position (but does NOT commit yet).
- The letter sizing follows a strict ladder:
  - Center: **100%**
  - Immediate neighbor above/below: **75%**
  - Next letters out: **50%**
- Motion should feel **elastic** on snap (short easing), without adding extra UI chrome.

**Key distinction from Switch Mode**: Only the visual presentation changes (size, spacing, elastic transitions). The interaction model remains identical - you slide to preview letters, and commit on release/click.

## Persistence (per alias)

Selectors should update UI immediately (optimistic), then persist.

For Vibe Selector:
- Resolve active alias id
- Persist via context method (e.g., `updateAliasVibe(activeAliasId, nextVibe)`)

## Proposed API (clear contract for future selectors)

Even if the implementation differs per product, keep the conceptual API stable:

- `options: { id, label, ringColor? }[]`
- `valueId: string`
- `onChange(nextId)`
- `mode: 'stack' | 'carousel' | 'switch' | 'switch-snap'`
- `anchorRef(s)` (single ref, or multi-ref when responsive variants exist)

This contract is what makes the Selector a reusable “button tool”.
