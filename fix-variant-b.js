const fs = require('fs');
const cssPath = "C:\\Users\\josei\\researchnet\\src\\app\\globals.css";
let css = fs.readFileSync(cssPath, 'utf8');

let changes = 0;

// Fix variant-b: researcher-card-b transition + hover transform
const old1 = `  transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.researcher-card-b:hover {\r\n  box-shadow: 0 4px 24px rgba(0,0,0,0.30), 0 14px 48px rgba(0,0,0,0.18), 0 0 0 1px rgba(245,158,11,0.12), 0 0 48px rgba(245,158,11,0.05);\r\n  border-color: rgba(245,158,11,0.28);\r\n  transform: translateY(-2px);\r\n}`;

const fixed1 = `  transition: box-shadow 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.22s, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.researcher-card-b:hover {\r\n  box-shadow: 0 8px 36px rgba(0,0,0,0.40), 0 16px 56px rgba(0,0,0,0.22), 0 0 0 1px rgba(245,158,11,0.18), 0 0 56px rgba(245,158,11,0.08);\r\n  border-color: rgba(245,158,11,0.35);\r\n  transform: translateY(-3px);\r\n}`;

if (css.includes(old1)) {
  css = css.replace(old1, fixed1);
  console.log('Fixed researcher-card-b spring + deeper shadow');
  changes++;
} else {
  console.log('Could not find variant-b researcher-card block');
}

// Fix selection color for dark variant
const oldSel = `::selection { background: var(--accent-dim); color: var(--accent-hover); }`;
const newSel = `::selection { background: rgba(245,158,11,0.25); color: #fbbf24; }`;

if (css.includes(oldSel)) {
  css = css.replace(oldSel, newSel);
  console.log('Fixed selection color for dark variant');
  changes++;
}

// Fix skeleton shimmer for dark bg
const oldShimmer = `  background: linear-gradient(90deg, #1c1917 0%, #292524 40%, #1c1917 60%, #1c1917 100%);`;
if (css.includes(oldShimmer)) {
  css = css.replace(oldShimmer, `  background: linear-gradient(90deg, #1c1917 0%, #2c2825 40%, #1c1917 60%, #1c1917 100%);`);
  console.log('Fixed skeleton shimmer for dark bg');
  changes++;
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log(`Done (${changes} changes) - variant-b globals.css saved`);