const fs = require('fs');
let c = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');

const replacements = [
  [
    'vc-section-heading">Oportunidades</h1>\r\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Postdocs, becas, convocatorias y más</p>',
    'style={{ fontFamily: "\'Playfair Display\', Georgia, serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Oportunidades</h1>\r\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Postdocs, becas, convocatorias y más</p'
  ],
  [
    'vc-section-heading">Tu red</h1>\r\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red</p>',
    'style={{ fontFamily: "\'Playfair Display\', Georgia, serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Tu red</h1>\r\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red</p'
  ],
  [
    'vc-section-heading">Tu perfil</h1>\r\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Gestiona tu información de investigador</p>',
    'style={{ fontFamily: "\'Playfair Display\', Georgia, serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Tu perfil</h1>\r\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Gestiona tu información de investigador</p'
  ],
];

let count = 0;
for (const [old, neu] of replacements) {
  if (c.includes(old)) {
    c = c.replace(old, neu);
    count++;
    console.log('Replaced: ' + old.slice(0, 50));
  } else {
    console.log('NOT FOUND: ' + old.slice(0, 50));
  }
}

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', c, 'utf8');
console.log('Done, count:', count);

// Verify
let c2 = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
let remaining = (c2.match(/vc-section-heading/gi) || []).length;
console.log('Remaining vc-section-heading:', remaining);