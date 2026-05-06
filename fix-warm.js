const fs = require('fs');
const path = 'src/app/globals.css';
let c = fs.readFileSync(path, 'utf8');

// ─────────────────────────────────────────────────────
// FIX 1: Add warm section-heading style to globals.css
// (vc-section-heading already exists in page.tsx via className)
// Add it properly to globals so the skeleton loader picks up warm bg
// ─────────────────────────────────────────────────────

// Fix: Add warm editorial --bg and --surface overrides at root level
// The current root vars are still variant-b dark — add warm editorial override

const warmOverride = `
/* ═══════════════════════════════════════════════
   VARIANT-C: WARM EDITORIAL — overrides above
   Warm stone/amber palette, editorial typography
   ═══════════════════════════════════════════════ */
:root {
  --bg: #0c0a09;
  --bg-secondary: #1c1917;
  --surface: #292524;
  --surface-hover: #1c1917;
  --border: #292524;
  --border-subtle: #1c1917;

  --text-primary: #fef3c7;
  --text-secondary: #d6d3d1;
  --text-tertiary: #78716c;
  --text-muted: #a8a29e;
  --text-subtle: #57534e;

  --accent: #f59e0b;
  --accent-dim: rgba(245,158,11,0.12);
  --accent-hover: #fbbf24;
  --accent-glow: rgba(245,158,11,0.15);
  --accent-border: rgba(245,158,11,0.35);
  --accent-faint: rgba(245,158,11,0.06);

  --open-dot: #f59e0b;
  --open-dot-bg: rgba(245,158,11,0.10);
  --open-dot-border: rgba(245,158,11,0.25);

  --tag-bg: #1c1917;
  --tag-border: #292524;
  --tag-text: #a8a29e;

  --card-bg: #1c1917;
  --card-border: #292524;

  --type-postdoc-bg: rgba(245,158,11,0.12);
  --type-postdoc-text: #f59e0b;

  --type-fondos-bg: rgba(161,98,7,0.15);
  --type-fondos-text: #d97706;

  --type-intl-bg: rgba(217,119,6,0.12);
  --type-intl-text: #d97706;

  --type-phd-bg: rgba(180,83,9,0.12);
  --type-phd-text: #f59e0b;

  --type-becas-bg: rgba(245,158,11,0.12);
  --type-becas-text: #f59e0b;
  --type-laboral-text: #fbbf24;
  --type-laboral-bg: rgba(251,191,36,0.10);

  --match-high: #f59e0b;
  --match-high-bg: rgba(245,158,11,0.12);
  --match-high-border: rgba(245,158,11,0.25);
  --match-mid: #d97706;
  --match-mid-bg: rgba(217,119,6,0.08);
  --match-mid-border: rgba(217,119,6,0.18);
  --match-low: #78716c;
  --match-low-bg: rgba(120,113,108,0.12);
  --match-low-border: rgba(120,113,108,0.20);

  --hot-color: #ef4444;

  --connected-bg: rgba(245,158,11,0.10);
  --connected-color: #92400e;
  --connected-border: rgba(245,158,11,0.30);
  --connected-hover-bg: rgba(245,158,11,0.16);

  --header-bg: rgba(12,10,9,0.90);
  --header-border: rgba(41,37,36,0.80);

  --shadow-card: 0 1px 2px rgba(0,0,0,0.30), 0 4px 16px rgba(0,0,0,0.20), 0 0 0 1px rgba(254,243,199,0.03);
  --shadow-card-hover: 0 8px 32px rgba(0,0,0,0.50), 0 16px 56px rgba(0,0,0,0.30), 0 0 0 1px rgba(245,158,11,0.20);
  --shadow-detail-panel: -12px 0 56px rgba(0,0,0,0.60);
}
`;

// Find the :root { ... } block and replace
const rootStart = c.indexOf(':root {');
const rootEnd = c.indexOf('}', rootStart) + 1;
const oldRoot = c.substring(rootStart, rootEnd);
const newRoot = warmOverride;
c = c.substring(0, rootStart) + newRoot + c.substring(rootEnd);

// ─────────────────────────────────────────────────────
// FIX 2: Skeleton shimmer — warm editorial colors
// ─────────────────────────────────────────────────────
c = c.replace(
  '/* \u250c\u2500 SKELETON SHIMMER (variant-c: Warm Editorial) \u250c\u2500\u2510\u250c\u2500 */\r\n@keyframes shimmer {\r\n  0% { background-position: -400px 0; }\r\n  100% { background-position: 400px 0; }\r\n}\r\n.skeleton-shimmer {\r\n  background: linear-gradient(90deg, #1c1917 25%, #292524 50%, #1c1917 75%);\r\n  background-size: 800px 100%;\r\n  animation: shimmer 1.8s ease-in-out infinite;\r\n}\r\n.skeleton-shimmer-dim {\r\n  background: linear-gradient(90deg, #161412 25%, #1c1917 50%, #161412 75%);\r\n  background-size: 800px 100%;\r\n  animation: shimmer 2.2s ease-in-out infinite;\r\n}',
  '/* \u250c\u2500 SKELETON SHIMMER (variant-c: Warm Editorial) \u250c\u2500\u2510\u250c\u2500 */\r\n@keyframes shimmer {\r\n  0% { background-position: -400px 0; }\r\n  100% { background-position: 400px 0; }\r\n}\r\n.skeleton-shimmer {\r\n  background: linear-gradient(90deg, #292524 25%, #1c1917 50%, #292524 75%);\r\n  background-size: 800px 100%;\r\n  animation: shimmer 1.8s ease-in-out infinite;\r\n}\r\n.skeleton-shimmer-dim {\r\n  background: linear-gradient(90deg, #1c1917 25%, #161412 50%, #1c1917 75%);\r\n  background-size: 800px 100%;\r\n  animation: shimmer 2.2s ease-in-out infinite;\r\n}'
);

// ─────────────────────────────────────────────────────
// FIX 3: NavBar button hover — warm amber not neutral white
// Replace rgba(255,255,255,0.30) and rgba(255,255,255,0.75) with warm tones
// ─────────────────────────────────────────────────────
c = c.replace(
  'color: isActive ? "var(--accent)" : isHovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.30)"',
  'color: isActive ? "var(--accent)" : isHovered ? "var(--accent-hover)" : "rgba(245,158,11,0.45)"'
);
c = c.replace(
  'background: isActive ? "var(--accent-dim)" : isHovered ? "rgba(255,255,255,0.06)" : "transparent"',
  'background: isActive ? "var(--accent-dim)" : isHovered ? "rgba(245,158,11,0.08)" : "transparent"'
);

// ─────────────────────────────────────────────────────
// FIX 4: Opportunity type badge — use proper var() instead of inline hex opacity
// Replace inline `${color}18` with warm amber-tinted CSS variable classes
// ─────────────────────────────────────────────────────

// Update the opp-card hover to use warm amber border
c = c.replace(
  'border-color: var(--accent-border);',
  'border-color: var(--accent-border);\r\n  background: var(--card-bg);'
);

// Update the section heading class to be more prominent
// Add a dedicated vc-section-heading in CSS (not just in page.tsx)
const vcSectionHeadingCSS = `
/* ═══════════════════════════════════════════════
   VARIANT-C SECTION HEADINGS
   ═══════════════════════════════════════════════ */
.vc-section-heading {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: 4px;
}
`;

// Insert after ::selection
const selectionIdx = c.indexOf('::selection');
const afterSelection = c.indexOf('}', selectionIdx) + 1;
c = c.substring(0, afterSelection) + vcSectionHeadingCSS + c.substring(afterSelection);

fs.writeFileSync(path, c, 'utf8');
console.log('Warm editorial CSS fixes applied, total chars:', c.length);