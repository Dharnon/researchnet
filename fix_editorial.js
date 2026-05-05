const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');

const replacements = [
  ['<h1 className="vc-section-heading">Oportunidades</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Postdocs, becas, convocatorias y ms</p>',
   '<h1 style={{ fontFamily: "\'Playfair Display\', Georgia, serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Oportunidades</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Postdocs, becas, convocatorias y más</p>'],
  ['<h1 className="vc-section-heading">Tu red</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red</p>',
   '<h1 style={{ fontFamily: "\'Playfair Display\', Georgia, serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Tu red</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red</p>'],
  ['<h1 className="vc-section-heading">Tu perfil</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Gestiona tu información de investigador</p>',
   '<h1 style={{ fontFamily: "\'Playfair Display\', Georgia, serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Tu perfil</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Gestiona tu información de investigador</p>'],
];

let count = 0;
for (const [old, neu] of replacements) {
  if (content.includes(old)) {
    console.log('Replacing: ' + old.slice(0, 60));
    count++;
  } else {
    console.log('NOT FOUND: ' + old.slice(0, 60));
  }
}

const result = content
  .replace('<h1 className="vc-section-heading">Oportunidades</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Postdocs, becas, convocatorias y ms</p>',
           '<h1 style={{ fontFamily: "\'Playfair Display\', Georgia, serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Oportunidades</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Postdocs, becas, convocatorias y más</p>')
  .replace('<h1 className="vc-section-heading">Tu red</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red</p>',
           '<h1 style={{ fontFamily: "\'Playfair Display\', Georgia, serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Tu red</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red</p>')
  .replace('<h1 className="vc-section-heading">Tu perfil</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Gestiona tu información de investigador</p>',
           '<h1 style={{ fontFamily: "\'Playfair Display\', Georgia, serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Tu perfil</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Gestiona tu información de investigador</p>');

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', result, 'utf8');
console.log('Done, wrote file');