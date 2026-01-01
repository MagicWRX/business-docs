---
title: "MXN VIBE CONTROLLER (SSOT)"
ssot: true
owner: "brianlindahl"
status: "active"
codeRefs:
  - "Websites/mxn-chat/src/components/ChatInterface.tsx"
relatedDocs:
  - "MXN_LOUNGE.md"
  - "MXN_SELECTOR.md"
lastReviewed: "2026-01-01"
tags:
  - "vibe"
  - "styling"
---

# MXN VIBE CONTROLLER (SSOT)

This document serves as the Single Source of Truth (SSOT) for the visual design and behavior of "Vibes" within the MXN.CHAT interface.

## Core Design Philosophy
- **Transparency**: No solid backgrounds. All elements float on the interface.
- **Rings**: Visual definition is provided by CSS `box-shadow` rings, not CSS `border`.
- **Color Matching**: Text and Rings always match the specific Vibe's defined color (`solidBg`).

## Vibe Definitions
Each Vibe has a specific color palette defined in the configuration.
- **Relaxed**: Green (`#4ade80`)
- **Excited**: Purple (`#c084fc`)
- **Focused**: Orange (`#fb923c`)
- **Happy / Focused**: Yellow (`#facc15`)
- **Supported**: Pink (`#f472b6`)
- **Frustrated / Excited**: Fuchsia (`#e879f9`)

## Component Styling Rules

### 1. VIBE TABS (Navigation)
The circular buttons used to select the current vibe.

**Base State (Unselected):**
- **Background**: `transparent`
- **Text Color**: Vibe Color (`solidBg`)
- **Ring**: 1px Ring
  - Implementation: `box-shadow: 0 0 0 1px [VibeColor]`
  - Opacity: 40% (or adjusted for visibility)

**Selected State:**
- **Background**: `transparent`
- **Text Color**: Vibe Color (`solidBg`)
- **Rings**: Double Ring Effect
  - Inner Ring: 1px (Base definition)
  - Outer Ring: 3px (Selection indicator)
  - Implementation: `box-shadow: 0 0 0 1px [VibeColor], 0 0 0 4px [VibeColor-with-opacity]`
  *(Note: To achieve a 3px "gap" or "band" outside the 1px ring, the second shadow spread must be larger. If we want a 3px ring *total*, it's just 3px. If we want a 1px ring AND a separate 3px ring, we stack them.)*

**Standard Implementation (Approved):**
```css
/* Base */
box-shadow: 0 0 0 1px rgba(r,g,b, 0.4);

/* Selected */
box-shadow: 0 0 0 1px rgba(r,g,b, 1), 0 0 0 4px rgba(r,g,b, 0.3);
```
*Interpretation of "Selected ring set to 3px": This likely means a 3px wide ring. If it sits outside the 1px ring, the total spread is 1px + 3px = 4px.*

### 2. VIBE BUBBLES (Thoughts)
The floating bubbles representing chat rooms.

**Base State:**
- **Background**: `transparent`
- **Text Color**: Vibe Color (`solidBg`)
- **Ring**: 1px Ring
  - Implementation: `box-shadow: 0 0 0 1px [VibeColor]`
  - Opacity: 40%

**Hover/Active State:**
- **Ring**: Thicker or glowing ring matching the Vibe Tab selection style if applicable.

## Code Implementation Reference

### Vibe Tabs (React/Tailwind)
```tsx
style={{ 
  color: vibe.solidBg,
  backgroundColor: 'transparent',
  // Base Ring (Always present or replaced by selected state)
  boxShadow: currentVibe === vibe.name 
    ? `0 0 0 1px ${vibe.solidBg}, 0 0 0 4px ${vibe.solidBg}4D` // Selected: 1px solid + 3px glow (total 4px spread)
    : `0 0 0 1px ${vibe.solidBg}66` // Unselected: 1px subtle
}}
```

### Vibe Bubbles (React/Tailwind)
```tsx
style={{
  // ... size and animation props ...
  backgroundColor: 'transparent',
  boxShadow: `0 0 0 1px ${vibeColor.solidBg}66` // Base 1px ring
}}
```
