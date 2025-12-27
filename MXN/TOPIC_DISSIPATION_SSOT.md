# Topic Dissipation Rules (SSOT)

## Overview
Topics (chat room bubbles) in MXN.CHAT implement a time-based dissipation system where new topics start larger and gradually shrink over time, reflecting the ephemeral nature of the platform.

## Dissipation Rules

### Time-Based Size Reduction
- **Duration**: Topics shrink over 24 hours (matching message auto-delete timeframe)
- **Minimum Size**: Topics never shrink below 60% of their calculated size
- **Decay Curve**: Exponential decay using the formula: `dissipationFactor = max(0.6, exp(-ageInHours / 24))`

### Size Calculation Formula
```
finalBubbleSize = baseSize × userScaleFactor × dissipationFactor

Where:
- baseSize = 80px (minimum bubble size)
- userScaleFactor = max(1, min(10, userCount + 1)) (scales with member count)
- dissipationFactor = max(0.6, exp(-ageInHours / 24)) (time-based decay)
- ageInHours = max(0, (now - createdAt) / hours) (prevents negative age)
```

### Safety Mechanisms
- **Invalid Date Handling**: Fallback to current time if `createdAt` is invalid
- **Future Date Protection**: Age clamped to 0 to prevent exponential growth
- **Finite Number Check**: `bubbleSize` validated to be finite and non-NaN
- **Minimum Size Guarantee**: Fallback to 60% of base size if calculation fails

### User Count Scaling (Existing)
- 0 users: 1x scale (80px base)
- 1-9 users: 2x-10x scale (160px-800px, before dissipation)
- 10+ users: 10x scale (800px, before dissipation) maximum

### Ordering & Vertical Priority (NEW + POPULAR at Top)
- Topics are ranked so **new** and **popular** topics naturally occupy the **top** region.
- As topics age (or remain unpopular), their rank drops and they are biased lower, which visually “pushes” them down over time.
- Popularity is based on member count; newness decays over ~24 hours.

### Implementation Details
- **Age Calculation**: Based on `room.createdAt` timestamp
- **Real-time Updates**: Size recalculates on each render
- **Text Scaling**: Font sizes scale proportionally with bubble size
- **Visual Continuity**: Smooth transitions maintain UX during size changes

## Business Logic Rationale
- **Ephemeral Design**: Aligns with platform's 24h message/3-day room expiry
- **User Engagement**: Larger new topics attract attention, encourage participation
- **Visual Hierarchy**: Size indicates both popularity (users) and freshness (age)
- **Performance**: Exponential decay provides smooth, predictable scaling

## Code Location
- **File**: `src/components/ChatInterface.tsx`
- **Function**: Bubble size calculation in topic rendering loop
- **Dependencies**: `room.createdAt` timestamp from ChatRoom interface

## Testing Considerations
- Verify new topics start at full calculated size
- Confirm gradual shrinking over 24-hour period
- Ensure minimum size threshold prevents invisibility
- Test with various user counts and creation times