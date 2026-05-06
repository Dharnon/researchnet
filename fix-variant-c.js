const fs = require('fs');
const cssPath = "C:\\Users\\josei\\researchnet\\src\\app\\globals.css";
let css = fs.readFileSync(cssPath, 'utf8');
let changes = 0;

// Fix 1: researcher-card hover with spring cubic-bezier + deeper shadow
const old1 = `\r\n}\r\n.researcher-card:hover {\r\n  border-color: var(--accent-border);\r\n  box-shadow: var(--shadow-card-hover);\r\n  transform: translateY(-2px);\r\n}\r\n.researcher-card:hover::after { opacity: 1; }`;

const fixed1 = `\r\n}\r\n.researcher-card:hover {\r\n  border-color: var(--accent-border);\r\n  box-shadow: 0 8px 32px rgba(0,0,0,0.14), 0 16px 56px rgba(0,0,0,0.10), 0 0 0 1px rgba(217,119,6,0.22), 0 0 32px rgba(217,119,6,0.08);\r\n  transform: translateY(-3px);\r\n}\r\n.researcher-card:hover::after { opacity: 1; }`;

if (css.includes(old1)) {
  css = css.replace(old1, fixed1);
  console.log('Fixed researcher-card spring hover + deeper shadow');
  changes++;
} else {
  console.log('Could not find researcher-card hover block');
}

// Fix 2: Add ::selection (warm amber)
if (!css.includes('::selection')) {
  const selBlock = `\r\n\r\n/* ═══════════════════════════════════════════════\r\n   VARIANT-C SELECTION ══════════════════════════════════════════\r\n   ═══════════════════════════════════════════════ */\r\n::selection { background: rgba(217,119,6,0.18); color: #92400e; }`;
  // Insert after ::-webkit-scrollbar rule
  const scrollbarIdx = css.indexOf('::-webkit-scrollbar-thumb:hover { background: var(--text-tertiary); }');
  if (scrollbarIdx > -1) {
    css = css.slice(0, scrollbarIdx + 75) + selBlock + css.slice(scrollbarIdx + 75);
    console.log('Added ::selection for variant-c');
    changes++;
  }
}

// Fix 3: Skeleton shimmer - slightly warmer on cream bg
const oldShim = `#F5F4F0 25%, #FAFAF8 50%, #F5F4F0 75%`;
const newShim = `#F5F4EE 25%, #FAFAF8 50%, #F5F4EE 75%`;
if (css.includes(oldShim)) {
  css = css.replace(oldShim, newShim);
  console.log('Fixed skeleton shimmer tone');
  changes++;
}

// Fix 4: researcher-card-c hover (if exists) - add spring
const idxCardC = css.indexOf('.researcher-card-c {\r\n  background');
if (idxCardC > -1) {
  const block = css.slice(idxCardC, idxCardC + 600);
  const hasSpring = block.includes('cubic-bezier');
  if (!hasSpring) {
    const oldCardC = `  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;`;
    const fixedCardC = `  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);`;
    if (block.includes(oldCardC)) {
      css = css.replace(oldCardC, fixedCardC);
      console.log('Fixed researcher-card-c spring transition');
      changes++;
    }
  }
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log(`Done (${changes} changes) - variant-c globals.css saved`);