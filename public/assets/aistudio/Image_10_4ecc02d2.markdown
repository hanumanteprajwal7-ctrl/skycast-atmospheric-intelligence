---
name: SkyCast Atmospheric Intelligence
colors:
  surface: '#0d1322'
  surface-dim: '#0d1322'
  surface-bright: '#33394a'
  surface-container-lowest: '#080e1d'
  surface-container-low: '#151b2b'
  surface-container: '#191f2f'
  surface-container-high: '#242a3a'
  surface-container-highest: '#2f3445'
  on-surface: '#dde2f8'
  on-surface-variant: '#bdc8d1'
  inverse-surface: '#dde2f8'
  inverse-on-surface: '#2a3040'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#7bd0ff'
  primary: '#8ed5ff'
  on-primary: '#00354a'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#00668a'
  secondary: '#93ccff'
  on-secondary: '#003351'
  secondary-container: '#3198dc'
  on-secondary-container: '#002c47'
  tertiary: '#ffc174'
  on-tertiary: '#472a00'
  tertiary-container: '#f59e0b'
  on-tertiary-container: '#613b00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0d1322'
  on-background: '#dde2f8'
  surface-variant: '#2f3445'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 76px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  metric-large:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 60px
    letterSpacing: -0.03em
  metric-large-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  metric-regular:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-regular:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-desktop: 3rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the precision, clarity, and ambient wonder of modern meteorology. It merges high-fidelity atmospheric data visualization with an immersive, dark-sky aesthetic. The visual tone is technical yet ethereal: scientific clarity paired with the calm, luminous depth of midnight skies, twilight auroras, and electric storm fronts.

### Target Audience & Emotional Impact
Designed for weather enthusiasts, outdoor professionals, pilots, urban commuters, and discerning users who demand actionable forecasting wrapped in effortless elegance. The interface evokes composure, hyper-accurate clarity, and ambient immersion—delivering dense environmental data without cognitive fatigue.

### Design Movement: Atmospheric Glassmorphism & Modern Technical Minimalism
The core aesthetic fuses deep midnight surfaces, calibrated frosted glass layers (`backdrop-blur-xl`), ultra-subtle translucent borders (`rgba(255, 255, 255, 0.08)` to `0.12`), and concentrated luminous glows. High-chroma electric cyan and solar amber accents pierce dark oceanic depths, guiding focus to vital shifts in atmospheric pressure, precipitation likelihood, UV index, and wind velocity.

## Colors

The palette is anchored in deep tropospheric midnight blues, balanced by atmospheric slate panels and electric meteorological accents. 

### Structural Neutrals
- **Canvas Base (`#0B1120`)**: The deepest midnight sky, providing infinite contrast for luminous data points.
- **Surface Elevation 1 (`#0F172A`)**: Base panel containers and primary layout modules.
- **Surface Elevation 2 (`#1E293B`)**: Raised metric tiles, elevated drawers, and active glass backdrops.
- **Surface Elevation 3 (`#334155`)**: Sub-card dividers, inactive toggle tracks, and hover states.
- **Text & Atmospheric Grays**:
  - Primary Text: `#F8FAFC` (Pure atmospheric white for instant readability)
  - Secondary Text: `#94A3B8` (Cool tropospheric slate for units, secondary labels, and metadata)
  - Subtle Muted Text: `#64748B` (Tertiary labels, timestamps, and axis lines)

### Kinetic Meteorological Accents
- **Electric Cyan Primary (`#38BDF8`)**: Precipitative indicators, live radar sweeps, dynamic barometric pressure curves, and active navigation nodes.
- **Oceanic Blue Secondary (`#0284C7`)**: Structural interactive focus states, deep-radar rain thresholds, and gradient backings.
- **Solar Amber Tertiary (`#F59E0B`)**: UV radiation alerts, sunrise/sunset highlights, severe heat warnings, and high-priority atmospheric alerts.
- **Severe Storm Violet (`#A855F7`)**: Lightning frequency, extreme air quality indices, and supercell tracking.
- **Air Quality Mint (`#10B981`)**: Optimal humidity, low allergen counts, and favorable wind patterns.

### Border & Translucency Tiers
- **Glass Border Subtle**: `rgba(255, 255, 255, 0.08)`
- **Glass Border Highlight**: `rgba(255, 255, 255, 0.16)`
- **Atmospheric Glow Overlay**: `radial-gradient(ellipse at top, rgba(56, 189, 248, 0.12), transparent 70%)`

## Typography

The typography architecture balances the sculpted, contemporary geometry of **Plus Jakarta Sans** for large meteorological readings and headlines with the clinical, optical precision of **Inter** for data tables, sensor logs, and textual conditions.

### Scaling & Structural Hierarchy
- **Primary Measurements & Hero Temperatures**: Utilizes `metric-large` and `display-hero` with tight negative tracking (`-0.03em` to `-0.04em`) to establish visual gravity on temperature displays.
- **Section Headers & Metric Identifiers**: Utilize `headline-sm` and `label-caps` in uppercase with expanded kerning (`0.08em`) to mimic aerospace instrument clusters.
- **Tabular Data Support**: All numeric temperatures, wind speeds, humidity percentages, and coordinates must render with OpenType tabular figures (`tnum`) enabled to prevent layout jitter during live sensor streaming.

## Layout & Spacing

The dashboard implements a 12-column adaptive fluid grid engineered for dense, multi-pane atmospheric dashboards.

### Breakpoints & Layout Philosophy
- **Mobile (< 768px)**: 4-column layout. Dynamic stacked card hierarchy with a primary horizontal snap-carousel for the 24-hour hourly forecast. Outer margins contract to `1rem` (`margin-mobile`), and component gutters tighten to `0.75rem`.
- **Tablet (768px – 1199px)**: 8-column layout. Side-by-side hero condition split with radar snapshot modules.
- **Desktop (≥ 1200px)**: 12-column fixed-fluid frame with maximum canvas constraint of `1440px`. Margin fixed at `3rem`. Standard 3-column dashboard arrangement:
  - **Left Rail (3 cols)**: Search, multi-city selector, current conditions, air quality gauge.
  - **Center Stage (6 cols)**: Interactive meteorological live radar, precipitation graph, 7-day extended matrix.
  - **Right Rail (3 cols)**: Atmospheric sensor telemetry (UV index, wind compass, dew point, pressure trend, sunrise/sunset arc).

### Spacing Tokens
Internal card rhythm follows an 8-point base grid:
- `space-xs` (4px): Micro-spacing between icon and unit label.
- `space-sm` (8px): Distance between metric value and indicator chips.
- `space-md` (16px): Standard inner card padding and element gaps.
- `space-lg` (24px): Padding for master condition cards and container group gaps.
- `space-xl` (40px): Section dividers and hero view vertical spacing.

## Elevation & Depth

Visual hierarchy does not rely on opaque dropshadows. Instead, depth is rendered through progressive luminous translucency, glassmorphic backdrop blurs, and soft atmospheric light blooms.

### Elevation Tiers
1. **Tier 0 (Stratosphere Canvas)**: Pure `#0B1120` backdrop supplemented with ambient radial glows:
   - Primary upper aura: `radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.08) 0%, transparent 65%)`
   - Daylight / Heat aura: `radial-gradient(circle at 100% 10%, rgba(245, 158, 11, 0.06) 0%, transparent 50%)`
2. **Tier 1 (Atmospheric Base Glass)**: Standard data card.
   - Background: `rgba(15, 23, 42, 0.65)`
   - Backdrop Filter: `blur(16px) saturate(180%)`
   - Border: `1px solid rgba(255, 255, 255, 0.08)`
   - Shadow: `0 4px 20px -2px rgba(0, 0, 0, 0.35)`
3. **Tier 2 (Elevated Telemetry Module)**: Interactive cards, hovered tiles, and alert notifications.
   - Background: `rgba(30, 41, 59, 0.75)`
   - Backdrop Filter: `blur(20px) saturate(190%)`
   - Border: `1px solid rgba(56, 189, 248, 0.25)`
   - Shadow: `0 12px 32px -4px rgba(2, 6, 23, 0.6), 0 0 16px -2px rgba(56, 189, 248, 0.15)`
4. **Tier 3 (Floating Overlays & Modals)**: City switcher sheets, radar layer selectors, tooltips.
   - Background: `rgba(15, 23, 42, 0.90)`
   - Backdrop Filter: `blur(28px) saturate(200%)`
   - Border: `1px solid rgba(255, 255, 255, 0.16)`
   - Shadow: `0 24px 48px -8px rgba(0, 0, 0, 0.8), 0 0 24px 0 rgba(56, 189, 248, 0.2)`

## Shapes

The design system adopts **Level 2 (Rounded)** shape geometry, pairing soft organic contours with precise technical corners to echo smoothed radar curves and streamlined aerodynamic flow.

### Geometry Specifications
- **Dashboard Metric Cards & Containers**: Standardized to `rounded-lg` (16px / `1rem`). Large hero weather displays scale to `rounded-xl` (24px / `1.5rem`).
- **Interactive Badges, Severity Tags & Filter Chips**: Strictly pill-shaped (`border-radius: 9999px`) to maintain immediate visual distinction from data cards.
- **Form Inputs & Action Buttons**: Set to `rounded-lg` (12px to 16px) for comfortable touch targets and ergonomic alignment.
- **Progress Meters & Gauge Tracks**: Fully rounded pill capsules with internal glowing neon fills.

## Components

### 1. Meteorological Metric Cards
- **Base Style**: `rgba(15, 23, 42, 0.65)` glass fill, `16px` border radius, `1px solid rgba(255, 255, 255, 0.08)`.
- **Header**: Top row with uppercase label (`label-caps`), muted icon (`rgba(148, 163, 184, 0.8)`), and contextual status indicator.
- **Value Area**: Heavy numeric readout (`metric-regular`) paired with superscript measurement unit.
- **Footer**: Dynamic micro-sparkline or comparative indicator (e.g., "+3° from yesterday" with arrow badge).

### 2. Buttons & Action Triggers
- **Primary Action (Radar Play, Search Submit)**: Gradient background (`linear-gradient(135deg, #38BDF8, #0284C7)`), `color: #0B1120`, font weight 600. Glowing aura on hover: `box-shadow: 0 0 20px rgba(56, 189, 248, 0.4)`. Active state compresses slightly (`transform: scale(0.98)`).
- **Secondary / Glass Button**: Translucent slate (`rgba(30, 41, 59, 0.7)`), `1px solid rgba(255, 255, 255, 0.1)`, `color: #F8FAFC`. Hover brings border highlight to `rgba(56, 189, 248, 0.5)`.
- **Icon Utility Button**: Circular or `12px` rounded square, `40x40px`, backdrop blurred, used for layer toggling, units toggle (°C / °F), and location pinning.

### 3. Pill Badges & Condition Chips
- **Live Status Chip**: Pill-shaped (`border-radius: 9999px`), `padding: 4px 10px`, typography `label-caps`. Features an active pulsing dot (e.g., green for good air quality, cyan for active rain, amber for solar storm).
- **Severe Weather Alert Pill**: Amber/Red translucent fill (`rgba(245, 158, 11, 0.15)`), border `1px solid rgba(245, 158, 11, 0.4)`, text `#FCD34D`, with subtle breathing animation.

### 4. Hourly Forecast Scroller (Horizontal Carousel)
- **Item Container**: `64px` wide, vertical layout, `12px` padding, smooth glass surface.
- **Current Hour Active**: Highlighted with `border: 1px solid #38BDF8`, subtle cyan gradient fill, and elevated text glow.
- **Metrics Hierarchy**: Time at top (`body-sm`), weather icon in center (`24px`), precipitation chance bar (`label-caps` in `#38BDF8`), and temperature at bottom (`headline-sm`).

### 5. Input Fields & Location Search
- **Container**: `rgba(15, 23, 42, 0.8)` background, `height: 48px`, border `1px solid rgba(255, 255, 255, 0.12)`, `rounded-lg` (12px).
- **Interior**: Leading magnifying icon in `#94A3B8`, text input in `#F8FAFC`, trailing GPS geolocate button.
- **Focus State**: Border shifts smoothly to `#38BDF8`, surrounded by an atmospheric glow ring `box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15)`.

### 6. Interactive Circular Gauges (UV, Wind Compass, Humidity)
- **Track**: `rgba(51, 65, 85, 0.4)` circular SVG background track.
- **Progress Fill**: Gradient stroke (`#38BDF8` to `#F59E0B` based on threshold) with rounded end caps and glow filter.
- **Center Hub**: Bold numeric value centered with secondary descriptive tag underneath (e.g., "Moderate", "14 km/h NNE").