# Design System Strategy: The Analog Terminal

## 1. Overview & Creative North Star
**Creative North Star: "The Tactile Terminal"**

This design system rejects the polished, sterile "Modern Web" in favor of an intentional, lo-fi digital brutalism. We are not just building an interface; we are simulating an 8-bit hardware experience. The system breaks the "template" look through **Rigid Block Nesting** and **Intentional Chromatic Aberration.** 

Rather than using standard shadows and rounded corners to imply depth, we use high-contrast color blocks and "Negative Space Carving." The goal is to make the user feel like they are operating a high-end, vintage military computer or a forgotten arcade diagnostic tool. Everything is sharp, mono-spaced, and unapologetically mechanical.

## 2. Colors & Surface Architecture
The palette is driven by high-saturation "phosphor" tones against a deep, void-like background (`#0e0e0e`). 

*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for structural sectioning. Instead, boundaries are defined by the **Step-Tone Method**. Use `surface_container_low` for the main canvas and `surface_container_highest` for active interactive zones.
*   **Surface Hierarchy & Nesting:** Treat the UI as a "Chassis."
    *   **Base Layer:** `surface` (#0e0e0e).
    *   **Interactive Panels:** `surface_container` (#191a1a).
    *   **Active "In-Focus" Blocks:** `surface_variant` (#262626).
*   **The "CRT Glow" Rule:** To move beyond flat pixel art, use subtle inner glows on primary containers. Apply a `primary` (#ffdd7c) box-shadow with a `0px` blur and a `2px` spread to create a "double-pixel" border effect, simulating the light bleed of a CRT monitor.
*   **Signature Textures:** Incorporate a global CSS overlay of scanlines (linear-gradient of `on_surface` at 3% opacity). Use a `tertiary` (#ffaa78) to `tertiary_container` (#f69a62) gradient for high-value CTAs to simulate the "heat" of an overdriven monitor.

## 3. Typography: The Monospaced Editorial
We utilize `spaceGrotesk`—a font that bridges the gap between technical monospacing and editorial clarity.

*   **Display & Headline:** Use `display-lg` (3.5rem) for hero moments. To achieve the "Premium Retro" look, use `text-transform: uppercase` and `letter-spacing: -0.05rem`. This creates a dense, authoritative block of text.
*   **Body:** `body-md` (0.875rem) is the workhorse. It must remain strictly aligned to a character-grid.
*   **Labels:** Use `label-sm` (0.6875rem) in `primary` (#ffdd7c) for all metadata. This mimics the small-print technical specs found on vintage hardware.
*   **Hierarchy Note:** Contrast is your primary tool. A `display-sm` headline in `primary` should be immediately followed by `body-sm` in `on_surface_variant` to create a "Data Sheet" aesthetic.

## 4. Elevation & Depth: Tonal Layering
Traditional elevation (Z-axis) is replaced by **Luminance Layering.**

*   **The Layering Principle:** To "lift" an element, do not use a shadow. Move it one step up the surface scale. A card sitting on `surface_container_low` should be colored `surface_container_high`. 
*   **The "Ghost Border" Fallback:** If a container requires a physical edge (e.g., a modal), use the `outline_variant` (#484848) at 20% opacity. This creates a "dead pixel" edge that defines the space without breaking the lo-fi immersion.
*   **Phosphor Persistence:** For "floating" elements like tooltips, use a backdrop-blur of `4px` combined with a `primary_container` (#fecb00) background at 10% opacity. This simulates the "ghosting" effect of old phosphorus screens.

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#ffdd7c) background, `on_primary` text. **Shape:** Strictly 0px radius. **State:** On hover, shift to `primary_dim` and add a 2px offset "drop-block" in `on_primary_fixed`.
*   **Secondary:** No background. `outline` (#767575) 2px solid border. Text in `on_surface`.
*   **Tertiary:** Text only in `secondary` (#9af6b8). Use a `_` underscore prefix (e.g., `_BACK`).

### Input Fields
*   **Style:** `surface_container_lowest` background. 
*   **Indicator:** Instead of a blinking cursor, use a solid block of `primary` color that spans the width of the current character.
*   **Error State:** Border-bottom 2px in `error` (#ff7351) only. No full-box glow.

### Cards & Lists
*   **Rule:** No dividers. Use `spacing.4` (0.9rem) of vertical "void space" between items.
*   **Selection:** A selected list item should change its background to `surface_container_highest` and change the text color to `secondary` (#9af6b8).

### Progress Bars (Bespoke Component)
*   **Style:** A series of discrete blocks rather than a smooth fill. Each block represents 10%. Use `secondary` for "Healthy/Complete" and `primary` for "Processing."

## 6. Do's and Don'ts

### Do:
*   **DO** use strict 0px border radii for everything.
*   **DO** align all elements to a rigid grid. If an element is 1px off, it breaks the "pixel" illusion.
*   **DO** use `tertiary` (#ffaa78) sparingly for "Warning" or "System Alert" contexts.
*   **DO** embrace asymmetry. A sidebar can be significantly heavier than the main content area to mimic specialized terminal layouts.

### Don't:
*   **DON'T** use soft transitions. Use `0ms` or `50ms` for hover states. It should feel "instant" like a hardware switch.
*   **DON'T** use icons with curves. Use blocky, pixelated SVGs or simple ASCII characters (e.g., `[+]`, `[x]`, `->`).
*   **DON'T** use standard grey shadows. If a shadow is needed for a pop-over, it must be a solid, 100% opaque offset block of `surface_container_lowest`.
*   **DON'T** use 1px lines to separate content; use the color shifts between `surface_container` tiers.