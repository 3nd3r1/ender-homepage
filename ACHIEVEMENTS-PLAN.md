# Achievements System - Feature Plan

## Overview

A Discord-style achievements system for the portfolio that tracks user interactions and milestones, storing progress locally and displaying earned achievements in a dedicated page.

## Core Architecture

### 1. Achievement Definition System

**Achievement Types:**
Simple milestone-based achievements that track user interactions and engagement with the portfolio.

**Achievement Structure:**

```typescript
interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string; // Icon component name or emoji
    unlockCondition: AchievementCondition;
    isUnlocked: boolean;
    unlockedAt?: Date;
    progress?: number; // For progressive achievements
    maxProgress?: number;
}

interface AchievementCondition {
    type: string;
    target?: number;
    event?: string;
    metadata?: Record<string, any>;
}
```

### 2. Achievement Tracking System

**Event-Driven Architecture:**

- Custom hook `useAchievements()` for tracking events
- Achievement manager service for checking conditions
- Event dispatcher for decoupled achievement triggering

**Components:**

```
src/lib/achievements/
├── types.ts              # TypeScript definitions
├── definitions.ts        # All achievement definitions
├── manager.ts           # Achievement checking logic
├── storage.ts           # Local storage operations
└── events.ts            # Event system for tracking

src/components/achievements/
├── AchievementToast.tsx     # Unlock notification
├── AchievementCard.tsx      # Individual achievement display
├── AchievementGrid.tsx      # Grid layout for achievements page
└── AchievementProgress.tsx  # Progress bars for partial achievements

src/hooks/
├── useAchievements.ts       # Main achievement hook
├── useAchievementTracker.ts # Event tracking hook
└── useLocalStorage.ts       # Enhanced local storage hook
```

## Proposed Achievements List

- **Theme Switcher** - Switch between light and dark theme
- **Mobile Explorer** - View the site on mobile device
- **Page Turner** - Visit all main pages (Home, Works, Blog)
- **Deep Diver** - Spend more than 5 minutes on the site
- **Work Inspector** - View all portfolio works
- **Blog Reader** - Read at least 3 blog posts
- **First Impression** - First visit to the site
- **Return Visitor** - Visit the site 3 times
- **Regular** - Visit the site 10 times
- **Dedicated Reader** - Read a blog post for more than 2 minutes
- **Portfolio Enthusiast** - View work details on 5+ projects
- **Achievement Hunter** - Visit the achievements page
- **Console Explorer** - Open browser developer console
- **Early Bird** - Visit before 6 AM
- **Night Owl** - Visit after 11 PM
- **Weekend Warrior** - Visit on weekend

## Technical Implementation

### 3. Storage Strategy

**Local Storage Structure:**

```typescript
interface AchievementStore {
    achievements: Record<string, Achievement>;
    events: AchievementEvent[];
    stats: {
        totalVisits: number;
        totalTimeSpent: number;
        firstVisit: Date;
        lastVisit: Date;
    };
    settings: {
        showToasts: boolean;
        soundEnabled: boolean;
    };
}
```

### 4. Event Tracking Integration Points

**Existing Components to Instrument:**

- `ThemeToggle` component - theme switching events
- `Navigation` component - page navigation events
- `WorkCard` components - work viewing events
- Root layout - visit tracking, time measurement
- Blog components - reading engagement

**Custom Events:**

```typescript
// Achievement events to dispatch
"achievement:theme-switch";
"achievement:page-visit";
"achievement:work-view";
"achievement:blog-read";
"achievement:time-milestone";
"achievement:interaction-count";
```

### 5. UI/UX Design

**Achievement Toast Notifications:**

- Non-intrusive slide-in from top-right
- Auto-dismiss after 4 seconds
- Achievement icon, title, and brief description
- Click to view full achievements page

**Achievements Page (`/achievements`):**

- Grid layout with achievement cards
- Search functionality
- Progress indicators for partial achievements
- Statistics overview (total unlocked, completion percentage)

**Achievement Cards:**

- Locked state: Grayed out with hint
- Unlocked state: Full color with unlock date
- Progress bars for incremental achievements

### 6. Performance Considerations

**Optimization Strategies:**

- Lazy load achievement definitions
- Throttle event tracking to prevent spam
- Batch local storage writes
- Memoize achievement calculations
- Virtual scrolling for large achievement lists

**Bundle Size:**

- Tree-shakeable achievement definitions
- Dynamic imports for achievement components
- Minimal dependencies (leverage existing icons)

## Implementation Phases

### Phase 1: Core Infrastructure

1. Set up type definitions and basic architecture
2. Implement local storage management
3. Create achievement manager and event system
4. Add basic achievement definitions

### Phase 2: UI Components

1. Build achievement card components
2. Create toast notification system
3. Implement achievements page layout
4. Add search functionality

### Phase 3: Integration & Tracking

1. Instrument existing components for event tracking
2. Add achievement checks to user interactions
3. Implement progressive achievement tracking
4. Test and refine achievement conditions

### Phase 4: Polish & Enhancement

1. Add animations and micro-interactions
2. Implement achievement sharing (optional)
3. Add sound effects (optional)
4. Performance optimization and testing

## Development Guidelines

### Code Quality Standards

- Follow existing TypeScript patterns
- Maintain component modularity
- Write comprehensive tests for achievement logic
- Document achievement definitions clearly
- Use existing design system (Tailwind classes)

### Integration Requirements

- Minimal impact on existing codebase
- Opt-in functionality (users can disable)
- No external dependencies for core functionality
- Respect user privacy (local-only storage)
- Graceful degradation if localStorage unavailable

### Testing Strategy

- Unit tests for achievement manager logic
- Integration tests for event tracking
- E2E tests for critical achievement flows
- Performance testing for tracking overhead
- Cross-browser compatibility testing

## Future Enhancements

### Potential Extensions

- Achievement sharing via URL
- Seasonal/limited-time achievements
- Achievement statistics and analytics
- Gamification elements (points, levels)
- Achievement import/export functionality
- Social features (compare with friends)

### Data Migration Strategy

- Version local storage schema
- Provide migration utilities for schema changes
- Backup/restore functionality
- Clear data utility for testing

## Security & Privacy Considerations

- All data stored locally (no server tracking)
- No personally identifiable information collected
- User control over data (clear achievements option)
- Respect Do Not Track preferences
- Transparent about what's being tracked

---

This plan provides a comprehensive, modular approach to implementing a Discord-style achievements system that enhances user engagement while maintaining clean architecture and respecting user privacy.
