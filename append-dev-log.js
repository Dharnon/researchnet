const fs = require('fs');
const path = 'C:\\obsidian-vault\\proyectos\\researchnet-dev-log.md';
const c = fs.readFileSync(path, 'utf8');
const entry = `
## Ciclo 75 — 2026-05-06 13:15 (Autónomo)

### variant-a (variant-a-clean: a436aa0)
- Refined Avatar: replaced radial-gradient with cleaner linear-gradient(135deg)
- Cleaner shadow stack with inset highlight for depth
- Build: ✅ PASS
- Push: ✅ origin/variant-a-clean (a436aa0)

### variant-b (variant-b-dark: b041970)
- Refined Avatar glow for dark mode depth
- Removed duplicate .icon-btn.active CSS rule (double background property)
- Enhanced card hover: subtle border-color transition
- Build: ✅ PASS
- Push: ✅ origin/variant-b-dark (b041970)

### variant-c (variant-c-warm: 5d90669)
- Fixed duplicate {item.icon} render bug in NavBar (icon appeared twice per nav item)
- Cleaned CSS structure — removed orphaned properties
- Build: ✅ PASS
- Push: ✅ origin/variant-c-warm (5d90669)

### Notes
All 3 variants building cleanly. Avatar components now use consistent linear-gradient across all variants. NavBar rendering bug fixed in variant-c. CSS duplicate rules removed in variant-b.
`;
fs.writeFileSync(path, c + entry, 'utf8');
console.log('Appended to dev log');