# CELICA OS Design Guidelines

## Design Approach
**Reference-Based:** Inspired by elyraos.xyz with retro 8-bit pixel aesthetic, combining nostalgic gaming UI with modern web interactions.

## Core Design Principles

### 1. Typography
- **Primary Font:** Press Start 2P (Google Fonts) for all text - authentic 8-bit pixel font
- **Hierarchy:**
  - Hero Title: text-4xl md:text-6xl (large pixel text)
  - Section Headers: text-2xl md:text-3xl
  - Body Text: text-xs md:text-sm (pixel fonts need smaller sizes for readability)
  - Labels/Stats: text-[10px] md:text-xs uppercase
- **Line Height:** leading-relaxed (1.625) for pixel font readability

### 2. Spacing System
**Tailwind Units:** Consistently use 4, 8, 12, 16, 24 units
- Component padding: p-4 to p-8
- Section spacing: py-12 md:py-24
- Card gaps: gap-4 md:gap-8
- Button padding: px-6 py-3

### 3. Layout Structure

**Loading Screen (Initial State):**
- Full viewport (h-screen) centered layout
- Small logo (w-24 h-24) centered above progress bar
- Progress bar: w-64 h-4 with pixelated border (border-4)
- Percentage counter below bar
- Smooth fade-out transition to main content

**Hero Section:**
- Full viewport height (min-h-screen)
- Background: Landscape image (provided) as full-width background
- Content overlay: Centered flex column
- Logo: w-32 h-32 md:w-48 md:h-48 pixelated style
- Title "CELICA OS" with glitch/pixel effect
- CTA buttons with blur backdrop (backdrop-blur-md bg-white/10)
- Pixel art borders (image-rendering: pixelated)

**Profile Section:**
- Two-column grid (grid-cols-1 lg:grid-cols-2)
- Left: Character image in pixelated frame
- Right: Stats and info cards
- Stats display: Grid of 3 columns for Age/Height/Weight
- Personality traits: Flex wrap of pill-shaped badges
- Topics: Grid layout with icon + label cards

**Network Monitoring Cards:**
- Grid: grid-cols-1 md:grid-cols-2 gap-6
- Each card: Pixelated border (border-4), rounded corners (rounded-none - keep sharp pixels)
- Card structure: Logo + Name + Token + Stats in vertical stack
- Stats row: Flex justify-between for label-value pairs

**MCP Tools Section:**
- Vertical stack of expandable cards
- Each card: Closed state shows title + version + status badge
- Expanded state: Shows tools list with bullet points and pricing
- Accordion-style interaction

### 4. Component Library

**Buttons:**
- Base: px-6 py-3 border-4 uppercase text-xs tracking-wider
- Primary CTA: Red background, white text, thick pixel border
- Secondary: White background, red text, red border
- Hover: transform scale-105, shadow-lg (8-bit box shadow), slight color shift
- Active: scale-95, deeper shadow

**Cards:**
- Border: border-4 with sharp corners (rounded-none)
- Padding: p-6 md:p-8
- Hover: translate-y-[-8px], enhanced border glow effect, scale-[1.02]
- Shadow: Custom pixelated shadow using box-shadow with stepped values

**Badges/Pills:**
- Small labels: px-3 py-1 border-2 text-[10px] uppercase
- Status indicators: Inline-flex with dot + label
- Personality traits: Rounded pixel style (rounded-sm with border)

**Social Links:**
- Icon size: w-8 h-8 md:w-10 h-10
- Border: border-2 pixel style
- Layout: Horizontal flex gap-4
- Hover: Rotate slightly (rotate-6), scale-110, enhanced border

**Progress Bar:**
- Container: h-4 border-4 with pixel aesthetic
- Fill: Animated width transition, pixelated edges
- Percentage: Monospace pixel font above/below bar

### 5. Interactions & Animations

**Loading Animation:**
- Progress: Linear 0-100% over 2-3 seconds
- Number counter: Incremental animation synchronized with bar
- Logo: Subtle pixel glitch effect during load
- Exit: Fade + slide up transition

**Scroll Animations:**
- Sections: Fade-in with slight translate-y on viewport enter
- Cards: Stagger animation (delay each by 100ms)
- Keep animations subtle - retro games had limited animation

**Hover States (Critical):**
- Buttons: 3px lift, enhanced shadow, color intensify
- Cards: 8px lift, border glow (using box-shadow), scale 1.02
- Social icons: Rotate 6deg, scale 1.1, background shift
- All transitions: duration-200 with cubic-bezier easing for pixel-perfect feel

**Click/Active States:**
- Scale down to 0.95
- Deeper inset shadow
- Brief color flash

### 6. Image Integration

**Hero Background:**
- Full-width landscape image (provided)
- image-rendering: pixelated for authentic 8-bit look
- Overlay gradient for text readability (if needed: bg-gradient-to-b from-transparent to-black/40)

**Character Logo:**
- Small version (favicon): 32x32px
- Loading screen: 96x96px
- Profile section: 256x256px or larger
- All with pixelated rendering

**Pixel Art Treatment:**
- CSS: image-rendering: pixelated; image-rendering: crisp-edges;
- Prevent smoothing/anti-aliasing on all pixel graphics

### 7. Responsive Behavior

**Breakpoints:**
- Mobile: Base styles (single column layouts)
- Tablet: md: (768px) - 2 column grids
- Desktop: lg: (1024px) - Full multi-column layouts

**Mobile Adaptations:**
- Stack all grid layouts vertically
- Reduce text sizes (use responsive text-xs md:text-sm)
- Smaller spacing (py-8 md:py-16)
- Touch-friendly button sizes (min h-12)
- Hide decorative pixel borders on very small screens if needed

### 8. Accessibility
- Maintain WCAG AA contrast ratios (red/white should be tested)
- Focus states: Thick pixel border outline (outline-4)
- Keyboard navigation: Clear focus indicators with pixel aesthetic
- Screen reader labels for all interactive elements
- Alt text for all images with descriptive pixel art context

### 9. Unique 8-Bit Elements
- Pixelated dividers between sections (border-t-4 with pixel pattern)
- Scanline effect overlay (optional subtle CSS animation)
- CRT screen curvature effect on main container (very subtle)
- Pixel-perfect alignment on grid (everything snaps to 4px/8px grid)
- Monospace number displays for stats/prices
- Glitch text effect on hover for headers (brief keyframe animation)