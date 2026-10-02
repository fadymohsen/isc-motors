# Design

## Visual Theme

Dark, sharp, editorial-automotive. Near-black ground, single red accent used with intent (Committed strategy — red carries roughly 15-25% of visual weight via large numerals, rules, CTAs — not Restrained, not Drenched). Zero border-radius throughout, matching the source Framer project's own component styles. Photography (rendered from the Exhibitor Booklet PDF) is treated as the primary texture; UI chrome stays quiet so photos read as premium editorial imagery, not stock.

## Color

Extracted verbatim from the connected Framer project's `ColorStyles`:

| Role | Value | Usage |
|---|---|---|
| Dark (ground) | `rgb(26, 26, 26)` → tint toward brand hue in OKLCH when refining | Page background |
| Dark 2 (surface) | `rgb(36, 36, 36)` | Card/panel surfaces, raised above ground |
| Red (accent) | `rgb(255, 15, 16)` | CTAs, numerals, active states, tag labels — the one committed color |
| White | `rgb(255, 255, 255)` | Headings, primary text |
| Body (dark bg) | `rgba(255, 255, 255, 0.8)` | Body copy on dark surfaces |
| Body (white bg) | `rgb(85, 85, 85)` | Body copy on light surfaces (rare — light sections only) |
| Stroke light | `rgba(255, 255, 255, 0.14)` | Hairline borders, grid dividers |
| Stroke dark | `rgba(30, 30, 30, 0.2)` | Hairlines on light surfaces |

Strategy: **Committed**. Red is not a sprinkle — it's the signature, but it never floods a surface (no all-red sections). Reserve pure/near-pure red fills for small high-intent targets (primary buttons, tag chips); everywhere else it's a line, a numeral, or a 1px rule.

Template-match pass (Rentco): the site is now near-monochrome like the template. `#ff0f10` lives in the logo ("Ji") and large moments only; buttons are white with a dark `»` square; section bands alternate `#1a1a1a`, pure black (partners, about) and grain-textured `#232323` (programme, CTA, footer). Small red text uses `red-text` (`#ff5c5d`, 5.7:1). Muted text never drops below `white/50` on large type or `white/60` on small type.

Motifs taken from the template: floating centered nav bar with hamburger menu, 100svh hero with hairline guides and white nodes, halftone dot band behind the About intro, glass panel centered on full-bleed package cards, stair-stepped numbered boxes, film grain, `[BRACKET]` tags, staggered 4-up news grid. Content width is 1800px with 60px side padding to match the template at 1920.

## Typography

| Style | Font | Size | Line-height | Letter-spacing | Transform |
|---|---|---|---|---|---|
| Heading 1 Large | Bebas Neue | 220px | 0.8em | -0.03em | uppercase |
| Heading 1 Small | Bebas Neue | 140px | 0.8em | -0.03em | uppercase |
| Heading 2 Extra | Bebas Neue | 100px | 0.8em | -0.03em | uppercase |
| Heading 2 Large | Bebas Neue | 80px | 0.8em | -0.03em | uppercase |
| Heading 2 Medium | Bebas Neue | 64px | 0.8em | -0.03em | uppercase |
| Heading 2 Small | Bebas Neue | 48px | 1em | -0.03em | uppercase |
| Heading 3 | Bebas Neue | 40px | 1em | -0.03em | none |
| Heading 4 | Bebas Neue | 32px | 0.8em | -0.03em | none |
| Heading 5 | Bebas Neue | 24px | 1em | -0.03em | none |
| Heading 6 | Bebas Neue | 20px | 0.8em | -0.03em | none |
| Button | Geist Mono 500 | 16px | 1em | 0px | uppercase |
| Body | Geist Mono regular | 16px | 1.6em | 0px | uppercase |
| Highlight | Geist Mono 500 | 16px | 1em | 0px | uppercase |

Display headings always Bebas Neue, always tight letter-spacing (-0.03em), condensed/tall proportions doing the heavy lifting — avoid adding weight variation since the font only ships one weight. Body/UI text is Geist Mono. Implemented sentence-case for paragraphs; uppercase only for labels, tags, nav and buttons (source system is uppercase by default; apply selectively — full-paragraph uppercase mono hurts long-form readability; reserve strict uppercase for labels/buttons/short body, consider sentence-case mono for long blog paragraphs during refinement).

## Spacing & Layout

- Max content width: 1200px (`max-w-container`).
- Sharp corners everywhere: `border-radius: 0` is a hard rule, not a default — do not introduce rounded corners anywhere, including images/avatars.
- Section rhythm: generous vertical padding (80-112px desktop) between major sections, hairline (`Stroke light`) dividers instead of shadows or card elevation.
- Grids use 1px hairline gaps with background-color bleeding through (`gap-px bg-stroke` pattern) rather than individual card shadows — this is the source system's signature grid treatment, keep it.

## Components (source inventory, for reference when extending)

From the connected Framer project: Primary Button, Secondary Button, Tag, Stats, Menu (incl. Hamburger), Logo, Header, Dropdown, How-It-Works Card, Testimonial + Testimonial Card, Card Number, Why-Choose-Us Card, Fleet Image/Title/Tab, FAQ + Single FAQ, Footer, Blog Card, Car Card, Feature Item, Feature List, Social Icons, Load More.

Not yet built on this project: FAQ accordion, testimonials, dropdown/menu beyond mobile hamburger. These are candidates for the next craft pass if the booklet content supports them (e.g. FAQ from exhibitor terms, testimonials — none exist in the source PDF, so only add if genuinely sourced, never fabricated).

## Motion

Dial: MOTION 3. All scroll animation runs through `ScrollEffects` (one rAF-throttled scroll listener, one IntersectionObserver) and data attributes, so components stay server-rendered: `data-reveal` (up, mask, wipe, line-x, line-y, pop, squares), `data-count`, `data-progress` (sets `--p/--x/--e/--c`), `data-parallax`, `data-scrub`, `data-spot`. The `js` class is set before first paint so nothing flashes, and every effect has a `prefers-reduced-motion` fallback that shows the final state. Packages use sticky stacked cards driven by `--e` (entering) and `--c` (covered by the next card).

Older notes below still apply: ease-out only, animate transform/opacity/clip-path only.

Ease-out only (no bounce/elastic). Current implementation: `transition-colors duration-150` on links/buttons, `duration-300` on image hover-scale, `max-height` transition on mobile menu. Keep motion confined to color/opacity/transform — never animate layout-triggering properties (width/height/padding) outside the explicitly-contained mobile menu case.
