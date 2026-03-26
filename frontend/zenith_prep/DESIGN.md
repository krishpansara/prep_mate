# Design System Document: The Editorial Architect

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Mindful Workspace."** 

Moving beyond the generic "SaaS Dashboard" aesthetic, this system treats technical interview preparation as a high-end editorial experience. We reject the "boxed-in" layout of traditional platforms. Instead, we utilize **intentional asymmetry** and **tonal depth** to create a focused, high-cognitive-load environment that feels light and breathable. The goal is to make the user feel like they are working within a premium, physical workspace—where every element has "weight" but nothing feels "heavy."

By leveraging large typographic scales and removing structural lines, we transform a utility tool into a sophisticated digital sanctuary for deep work.

---

## 2. Colors: Tonal Architecture
The palette is rooted in `surface` (#f6fafe) and `on_surface` (#26343d). We treat color not as decoration, but as a way to define space.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Traditional borders create visual "noise" that traps the eye. Instead, boundaries must be defined through background shifts. 
*   *Example:* A sidebar should use `surface_container_low` (#eef4fa) against a main content area of `surface` (#f6fafe). The contrast is felt, not seen.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested, physical layers. 
*   **Base:** `surface` (#f6fafe)
*   **Secondary Content Blocks:** `surface_container` (#e5eff7)
*   **Elevated Focus Areas:** `surface_container_lowest` (#ffffff)
*   **Deep Contrast Sections:** `surface_dim` (#cadde9)

### The "Glass & Gradient" Rule
To elevate the platform's "SaaS-Plus" feel, use **Glassmorphism** for floating elements (like code execution overlays). Apply `surface_container_lowest` at 80% opacity with a `backdrop-blur` of 12px.
For primary CTAs, do not use flat colors. Use a subtle linear gradient from `primary` (#0053db) to `primary_dim` (#0048c1) at a 135-degree angle to provide "soul" and professional polish.

---

## 3. Typography: Authority Through Scale
We pair the technical precision of **Inter** with the editorial character of **Manrope**.

*   **Display & Headlines (Manrope):** These are the "anchors" of the page. Use `display-lg` (3.5rem) with `-0.02em` letter spacing for hero moments. This creates an authoritative, modern feel that commands attention without being "loud."
*   **Body & Labels (Inter):** Inter is the workhorse. Use `body-lg` (1rem) for interview questions to ensure maximum readability.
*   **Code Blocks:** Use a high-quality monospaced font (system default or JetBrains Mono) against `surface_container_highest` (#d5e5ef) to ensure syntax highlighting pops without straining the eyes.

---

## 4. Elevation & Depth: Tonal Layering
We replace shadows and lines with **Tonal Layering**.

*   **The Layering Principle:** Place a `surface_container_lowest` (#ffffff) card on a `surface_container_low` (#eef4fa) section. This creates a soft, natural lift that mimics fine paper stacked on a desk.
*   **Ambient Shadows:** For critical floating states (e.g., a "Run Code" success toast), use a shadow with a 32px blur, 0% spread, and 6% opacity using the `on_surface` (#26343d) color. This mimics natural light rather than a digital "drop shadow."
*   **The "Ghost Border" Fallback:** If a container absolutely requires a border for accessibility (e.g., an input field), use the `outline_variant` token at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components: Light & Airy Primitives

### Buttons
*   **Primary:** Gradient of `primary` to `primary_dim`. Roundedness: `md` (0.375rem). No border.
*   **Secondary:** `primary_container` (#dbe1ff) background with `on_primary_container` (#0048bf) text.
*   **Tertiary:** Transparent background. Use `on_surface_variant` (#52616a) and move to `primary` on hover.

### Input Fields & Code Blocks
*   **Input Fields:** Use `surface_container_lowest` (#ffffff) as the base. Forbid 100% opaque outlines. Use a 2px bottom-accent of `primary` only when the field is focused.
*   **Code Blocks:** Forbid the use of divider lines within code editors. Use `spacing-6` (2rem) as internal padding. Use `secondary_fixed_dim` (#5fedb0) for "Success/Passed" syntax and `error_container` (#fe8983) for "Failed" syntax.

### Cards & Lists
*   **The Rule:** Total prohibition of horizontal divider lines.
*   **Execution:** Separate list items using `spacing-4` (1.4rem) and a subtle background shift to `surface_container_low` on hover.

### Unique Component: The "Focus Progress" Rail
A vertical progress indicator using a 4px wide line. Use `surface_variant` (#d5e5ef) for the track and a `secondary` (#006d4a) gradient for the active progress. This provides a "calm" sense of advancement.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use white space as a structural element. If a section feels crowded, double the spacing value (e.g., move from `spacing-4` to `spacing-8`).
*   **DO** use `secondary` (#006d4a) sparingly for "Success" states to maintain the minimalist calm.
*   **DO** align text-heavy content to a narrow, readable central column (max 680px) to prevent eye fatigue.

### Don’t
*   **DON'T** use pure black (#000000) for text. Use `on_surface` (#26343d) to maintain a soft, premium feel.
*   **DON'T** use standard 4px "card shadows." Use tonal shifts first, and "Ambient Shadows" only when necessary.
*   **DON'T** use high-saturation reds for errors. Use the sophisticated `error` (#9f403d) and `error_container` (#fe8983) tokens to keep the user calm during debugging.