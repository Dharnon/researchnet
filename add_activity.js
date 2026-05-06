const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf8');
const lines = content.split('\n');

// Find Acciones rapidas line
const arIdx = lines.findIndex(l => l.includes('Acciones rápidas'));
console.log('Acciones rapidas at:', arIdx);

// Activity section to insert (proper JSX, no comments inside JSX)
const activity = [
  '          {/* Research Activity */}',
  '          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px", marginBottom: 16 }}>',
  '            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>Nivel de actividad</p>',
  '            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>',
  '              <div style={{ flex: 1, height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>',
  '                <div style={{ width: "72%", height: "100%", background: "linear-gradient(90deg, var(--accent), var(--accent-hover))", borderRadius: 3, boxShadow: "0 0 8px var(--accent-glow)" }} />',
  '              </div>',
  '              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", minWidth: 28 }}>72%</span>',
  '            </div>',
  '            <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 8 }}>8 publicaciones · 2 proyectos · 0 colaboraciones activas este mes</p>',
  '          </div>',
];

// Insert before Acciones rapidas
lines.splice(arIdx, 0, ...activity);

// Verify around insertion
console.log('\nVerification (lines', arIdx-2, 'to', arIdx+15,'):');
for (let i = arIdx-2; i <= arIdx+14; i++) {
  console.log(i + ': ' + lines[i]);
}

const newContent = lines.join('\n');
fs.writeFileSync('src/app/page.tsx', newContent, 'utf8');
console.log('\nDone. Total lines:', lines.length);