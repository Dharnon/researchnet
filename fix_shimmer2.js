const fs = require('fs');
let c = fs.readFileSync('src/app/globals.css', 'utf8');

const oldBlock = `[data-theme="dark"] .skeleton-shimmer {
  background: linear-gradient(90deg, var(--border) 25%, var(--accent-faint) 50%, var(--border) 75%);
  background-size: 800px 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

/* ├óΓÇ¥Γé¼├óΓÇ¥Γé¼ ONBOARDING ORCID BUTTON (variant-c-warm: amber) ├óΓÇ¥Γé¼├óΓÇ¥Γé¼ */`;

const newBlock = `/* ═══════════════════ DARK SKELETON SHIMMER (variant-b-dark: very dark #0c0a09) ═══════════════════ */
[data-theme="dark"] .skeleton-shimmer {
  background: linear-gradient(90deg, #0c0a09 25%, #1c1917 50%, #0c0a09 75%);
  background-size: 800px 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

[data-theme="dark"] .skeleton-shimmer-dim {
  background: linear-gradient(90deg, #090807 25%, #141210 50%, #090807 75%);
  background-size: 800px 100%;
  animation: shimmer 1.4s ease-in-out infinite 0.2s;
}

/* ├óΓÇ¥Γé¼├óΓÇ¥Γé¼ ONBOARDING ORCID BUTTON (variant-b-dark) ├óΓÇ¥Γé¼├óΓÇ¥Γé¼ */`;

if (!c.includes(oldBlock)) {
  console.log('OLD BLOCK NOT FOUND');
  process.exit(1);
}

fs.writeFileSync('src/app/globals.css', c.replace(oldBlock, newBlock));
console.log('done');
