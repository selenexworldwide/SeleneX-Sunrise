# SeleneX Styling Guidelines

This document outlines the global styling rules and design system for the SeleneX platform to ensure consistency across all pages and components.

## 1. Colors

### Neutral Palette (Primary)
Used for text, backgrounds, and borders to maintain a clean, professional look.
- **Black**: `neutral-950` (#0a0a0a) - Primary Headings
- **Dark Gray**: `neutral-900` (#171717) - Secondary Headings, Active States
- **Medium Gray**: `neutral-600` (#525252) - Body Text
- **Light Gray**: `neutral-400` (#a3a3a3) - Subtitles, Inactive States
- **Off-White**: `neutral-50` (#fafafa) - Light Backgrounds
- **White**: `white` (#ffffff) - Card Backgrounds, Main Canvas

### Brand Palette (Accents)
Used sparingly for calls to action, active states, and visual flair.
- **Primary**: `brand-600` (#7c3aed) - Primary Buttons, Links
- **Secondary**: `brand-500` (#8b5cf6) - Accents, Glows
- **Light**: `brand-50` (#f5f3ff) - Background Tints

## 2. Typography

**Font Family**: `Inter`, sans-serif

### Headings
- **Display**: `text-[44px] sm:text-6xl lg:text-7xl xl:text-8xl`
    - Weight: `font-medium`
    - Tracking: `tracking-tighter`
    - Line Height: `leading-[0.9]`
- **H2**: `text-4xl md:text-6xl`
    - Weight: `font-medium`
    - Tracking: `tracking-tight`
- **H3**: `text-2xl sm:text-3xl sm:text-4xl`
    - Weight: `font-medium`
    - Tracking: `tracking-tighter`

### Body
- **Lead**: `text-lg` or `text-xl`
    - Weight: `font-light` or `font-normal`
- **Standard**: `text-base`
- **Small**: `text-sm` or `text-xs` (Labels, Tags)

## 3. Effects & "Liquid Glass"

The "Liquid Glass" aesthetic is a core part of the SeleneX brand identity.

### Card Styles
- **Background**: `bg-white/60` (Light Mode)
- **Backdrop Blur**: `backdrop-blur-xl` or `backdrop-blur-2xl`
- **Border**: `border border-white/40`
- **Shadow**: `shadow-lg` or `shadow-xl`
- **Hover State**: `hover:bg-white/80 hover:shadow-xl transition-all duration-300`

### Animations
- **Pulse**: `animate-pulse` (Used for "alive" elements like statistics)
- **Glitch**: Custom CSS animation for "Signal Lost" or error states.
- **Float**: Custom CSS animation for hovering elements.
- **Entrance**: Fade-in and slide-up on scroll (handled by Intersection Observer).

## 4. Layout

### Global Container
- **Width**: `w-full` (No max-width constraint on the main wrapper)
- **Padding**: Sections manage their own inner padding.

### Section Spacing
- **Vertical Padding**: `py-20 sm:py-32 sm:py-40` (Generous spacing for breathability)
- **Horizontal Padding**: `px-6 md:px-8` (Standard inner container padding)

### Grid System
- **Standard**: `grid grid-cols-1 lg:grid-cols-2` (Split view)
- **Cards**: `grid grid-cols-1 lg:grid-cols-12` (Complex layouts)

## 5. Components

### Buttons
- **Primary (Waitlist)**:
    - Background: `bg-neutral-900`
    - Text: `text-white`
    - Border: Gradient border (via pseudo-element or container)
    - Effect: Glow on hover
- **Secondary**:
    - Background: `bg-white`
    - Border: `border border-neutral-200`
    - Text: `text-neutral-900`
- **Icon Buttons**:
    - Style: Circular, Glass effect (`bg-white/10 backdrop-blur-md`)

### Badges
- **Style**: Pill shape, rounded-full
- **Padding**: `px-3 py-1` or `px-4 py-1.5`
- **Text**: Uppercase, tracking-widest, small font size (`text-xs` or `text-[10px]`)

### Tabs (Feature Rotator)
- **Container**: `rounded-2xl`
- **Active State**: `bg-white/60 backdrop-blur-md border border-white/40 shadow-sm`
- **Inactive State**: Transparent, `hover:bg-neutral-50`
- **Indicator**: `w-1 rounded-full` (Black for active, Gray for inactive)
