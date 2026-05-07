import fs from 'fs';
const c = fs.readFileSync('src/app/page.tsx', 'utf8');
const old = '<h1 style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Descubrir investigadores</h1>';
const rep = '<div style={{ marginBottom: 24 }}><h1 className="vc-section-heading">Descubrir investigadores</h1></div>';
if (c.includes(old)) {
  fs.writeFileSync('src/app/page.tsx', c.replace(old, rep), 'utf8');
  console.log('OK');
} else {
  console.log('NOT FOUND');
  process.exit(1);
}