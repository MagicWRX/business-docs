---
title: "MXN.CHAT — VIBE LOUNGE (SSOT)"
ssot: true
owner: "brianlindahl"
status: "active"
codeRefs:
  - "Websites/mxn-chat/src/components/ChatInterface.tsx"
  - "Websites/mxn-chat/src/components/RoomSidebar.tsx"
scripts:
  - "scripts/init-rooms.js"
relatedDocs:
  - "MXN_VIBE_CONTROLLER.md"
  - "TOPIC_DISSIPATION_SSOT.md"
lastReviewed: "2026-01-01"
tags:
  - "lounge"
  - "vibe"
  - "ui"
---

# MXN.CHAT — VIBE LOUNGE (SSOT)

**Document Date:** December 31, 2025  \
**Last Updated:** December 31, 2025  \
**Version:** 1.0.0  \
**Status:** Active (Implemented + Evolving)

---

## \🎯 Purpose

This document is the **Single Source of Truth (SSOT)** for the **Vibe Lounge** (a.k.a. **Lounge**) experience in MXN.CHAT.

The Vibe Lounge is the **central hub** where users:
- Choose a **Vibe** (mood) and browse/filter the global set of public **Thoughts** (topics).
- Use the **Location Pill Dropdown** to scope content by privacy-preserving geography.
- Enter a Thought to open the **Floating Thought Window** (chat view).

---

## \🧭 SSOT Alignment (Do Not Duplicate)

This SSOT is Lounge-specific and intentionally references other SSOTs:
- **Index / hierarchy:** [MXN_INDEX.md](MXN_INDEX.md)
- **Technical structure:** [MXN_TREE.md](MXN_TREE.md)
- **Shipped features:** [MXN_CHAT.md](MXN_CHAT.md)
- **Planned features / concepts:** [MXN_FEATURES.md](MXN_FEATURES.md)
- **Roadmap + completion claims:** [MXN_ROADMAP.md](MXN_ROADMAP.md)
- **Vibe ring styling rules:** [MXN_VIBE_CONTROLLER.md](MXN_VIBE_CONTROLLER.md)
- **Location filtering system:** [LOCATION_FILTER_IMPLEMENTATION.md](LOCATION_FILTER_IMPLEMENTATION.md)
- **Thought bubble dissipation:** [TOPIC_DISSIPATION_SSOT.md](TOPIC_DISSIPATION_SSOT.md)

---

## \📚 Terminology (Canonical)

- **Vibe Lounge / Lounge:** The home hub view showing Vibe tabs + Thought bubbles + location controls.
- **Vibe:** A mood label with an associated ring color (see [MXN_VIBE_CONTROLLER.md](MXN_VIBE_CONTROLLER.md)).
- **Thought:** A public topic/room represented as a floating bubble in the Lounge, and as a room entry in the sidebar.
- **Vibe Tabs:** Circular ring buttons across the top-right of the Lounge used to filter Thoughts by vibe.
- **User Status Vibe Indicator:** The filled circle in USER STATUS representing the active alias’s vibe. Default is **MXN blue** and displays **“set”**.
- **Location Pill Dropdown:** The pill UI that scopes/filter content by privacy-first location (Country → State → County → ZIP).

---

## \🧩 UX Structure (SSOT)

### A) Lounge Header

- Title text: **VIBES**
- A **“Sine Wave”** graphic acts as the Lounge’s signature visual.

**Implementation reference:**
- Header + sine wave component usage: `SineWaveSVG`
- Source: `CODE:`Websites/mxn-chat/src/components/ChatInterface.tsx``

### B) Controls Row (Location + Pagination + Vibe Tabs)

**Left controls**
- **Location Pill Dropdown** (privacy-first, user-controlled)
- **Edit Location** button (opens selector)
- A simple **pagination display** (e.g. `1/10`) used as a UI indicator of scroll/pages (implementation-specific)

**Right controls (Vibe Tabs)**
- Six vibe tabs (Relaxed, Excited, Focused, Happy / Focused, Supported, Frustrated / Excited)
- Selecting a vibe filters the visible Thoughts.

**SSOT styling rules**
- Vibe ring behavior and palettes are governed by [MXN_VIBE_CONTROLLER.md](MXN_VIBE_CONTROLLER.md).
- Lounge-specific implementation may vary in ring thickness; keep authoritative styling logic in `MXN_VIBE_CONTROLLER.md`.

**Implementation reference:**
- Location dropdown integration: `LocationPillDropdown`, `LocationSelector`, `useLocationFilter`
- Vibe tab rendering + selection state in: `CODE:`Websites/mxn-chat/src/components/ChatInterface.tsx``

### C) Thought Bubble Field (Plinko-Style)

The Lounge’s main canvas is a contained field where Thoughts appear as **floating ring bubbles**.

**Behavior (canonical):**
- **Filter:** Only show Thoughts that are `public` and `isActive`.
- **Vibe filter:** When a vibe is selected, show only Thoughts whose `room.vibe` matches that vibe.
	- `Relaxed` acts as the current implementation’s “show all” baseline.
- **Enter Thought:** Clicking a Thought bubble sets it as the active room and opens the Floating Thought Window.
- **Bubble size communicates importance:** bubble size scales with member count and decays over time (dissipation).

**Dissipation rules:**
- The authoritative rules are in [TOPIC_DISSIPATION_SSOT.md](TOPIC_DISSIPATION_SSOT.md).
- Lounge uses the $e^{-age/24}$ decay curve with a floor at 60% of base size.

**Implementation reference:**
- Bubble rendering + dissipation: `CODE:`Websites/mxn-chat/src/components/ChatInterface.tsx`` (Thought Bubbles Area)

### D) Floating Thought Window (Chat)

When a Thought is selected, a floating chat window appears:
- **Desktop:** right-side floating panel
- **Mobile:** full-screen overlay

**Header must display:**
- Thought name
- Ring color (based on Thought’s vibe)
- Optional “by <alias>” (creator)
- Member count

**Message list + input behavior:**
- Message list may be scoped by location filter.
- Message input can attach a `locationTag` for privacy-preserving display/filtering.

**Implementation reference:**
- Floating thought window + `MessageList` + `MessageInput` integration: `CODE:`Websites/mxn-chat/src/components/ChatInterface.tsx``

---

## \🔐 Location Filtering (Pill Dropdown) — SSOT

The Lounge uses a **robust, privacy-first location filter** so users can discover local content without exposing precise coordinates.

**Canonical requirements:**
- Hierarchical location: Country → State → County → ZIP
- User controls privacy level; never require exact coordinates
- UI is a **pill dropdown** matching the MXN vibe aesthetic
- Admin tooling exists/expected for moderating regions and defaults

**Authoritative reference:**
- Full spec and schema: [LOCATION_FILTER_IMPLEMENTATION.md](LOCATION_FILTER_IMPLEMENTATION.md)

---

## \🎛️ Alias Vibe + User Status (How Lounge Stays In Sync)

**SSOT requirement:** Each alias has its own **saved Vibe Indicator**, and the UI keeps the displayed User Status Vibe Indicator in sync with the active alias.

**Default behavior:**
- Default vibe is **MXN blue** and shows the word **“set”**.

**Implementation reference:**
- Alias-vibe sync and vibe indicator anchor/picker behavior: `CODE:`Websites/mxn-chat/src/components/ChatInterface.tsx``
- Roadmap requirements context: [MXN_ROADMAP.md](MXN_ROADMAP.md)

---

## \🧱 Ownership Boundaries (What Lives Where)

To prevent “SSOT drift” across docs and code, this is the **ownership split**:

- **Vibe Lounge layout + controls + bubble field + floating chat window:**
	- `CODE:`Websites/mxn-chat/src/components/ChatInterface.tsx``
- **Thought list navigation (sidebar) + per-thought vibe rings:**
	- `CODE:`Websites/mxn-chat/src/components/RoomSidebar.tsx``
- **Vibe ring style rules and palette:**
	- [MXN_VIBE_CONTROLLER.md](MXN_VIBE_CONTROLLER.md)
- **Location filter schema + UI components + admin tooling:**
	- [LOCATION_FILTER_IMPLEMENTATION.md](LOCATION_FILTER_IMPLEMENTATION.md)

---

## \🧪 Acceptance Criteria (Lounge)

- Lounge always renders its background hub view (“VIBES” header + sine wave + controls row) even when no room is selected.
- Vibe Tabs filter Thought bubbles deterministically by vibe.
- Thought bubble sizing follows [TOPIC_DISSIPATION_SSOT.md](TOPIC_DISSIPATION_SSOT.md) (member scaling + time decay with floor).
- Location Pill Dropdown opens selector, updates location, and can clear back to a safe default.
- Selecting a Thought opens the Floating Thought Window and shows vibe-colored ring in the header.

---

## \📝 Notes / Known Drift (Documented, Not Solved Here)

- If ring thickness/stacking differs between implementation and [MXN_VIBE_CONTROLLER.md](MXN_VIBE_CONTROLLER.md), treat it as a **standardization task** (update code or update controller SSOT) — do not silently diverge.

