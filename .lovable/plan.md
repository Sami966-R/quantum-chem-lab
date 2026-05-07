## 1. ParticleBackground — Hexagonal Molecule Network

The existing `src/components/ParticleBackground.tsx` is already a canvas-based hex network in orange (#f97316) / purple (#7b2ff7) on #0a0a1a with double rings, slow drift, connection lines, and pulsing glow. I'll **rewrite it cleanly** to lock in the spec (≈45 hexagons, double-ring stroke, radial purple ambient, line connections under 200px, sparks, fixed `position: fixed`, `z-index: 0`, `pointer-events: none`) so it precisely matches the requested behavior.

## 2. Global Accent Recolor → Orange / Purple / Cyan

Apply consistent token replacements across all pages and components. **No layout, copy, animation timing, or component structure changes.**

### Replacement rules (mechanical)

| From | To |
|---|---|
| `from-purple-400 via-cyan-400 to-green-400` (gradient text) | `from-orange-400 via-purple-400 to-cyan-400` |
| `from-cyan-400 to-purple-500` / `from-cyan-400 to-purple-400` (gradient text) | `from-orange-400 via-purple-400 to-cyan-400` |
| `border-cyan-500/20` | `border-orange-500/20` |
| `hover:border-cyan-400` | `hover:border-orange-400` |
| `hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]` and similar cyan glows on hover | `hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]` |
| `border-l-4 border-cyan-400` (TeamPage quote block) | `border-l-4 border-orange-400` |

### Files to update

- `src/components/Navigation.tsx` — nav border, logo gradient, active link color, underline, mobile menu border
- `src/components/SiteFooter.tsx` — footer divider + brand gradient
- `src/components/QuantaCureChat.tsx` — gradient border ring + header accents (keep cyan for "AI Online" status pill)
- `src/components/GlowCursor.tsx` — cursor ring/dot accent
- `src/components/FloatingMolecule.tsx` — drop-shadow glow color
- `src/pages/Landing.tsx` — gradient headings, step cards, flip cards, CTA buttons, glow shadows
- `src/pages/QuantumPage.tsx` — gradient headings, stage cards, timeline accents, badges
- `src/pages/TeamPage.tsx` — gradient headings, member cards, milestone timeline, tech grid, quote block
- `src/pages/DrugPage.tsx` — gradient heading, pipeline cards, image glow
- `src/pages/MoleculeTestingPage.tsx` — gradient heading

### Out of scope (will NOT touch)

- `src/index.css` design tokens, `tailwind.config.ts`
- Chart colors (Recharts), data-driven status colors (green online indicator, destructive red)
- Three.js / `MoleculeCanvas`, business logic, API code
- Any copy, layout, spacing, animation duration, or component structure

### Verification

- Visual check: preview each major route (`/`, `/quantum`, `/team`, `/drug`, `/molecule-testing`) for consistent orange→purple→cyan gradient and orange-tinted card borders/glows.
- Confirm hex network renders behind all content with no interaction blocking.