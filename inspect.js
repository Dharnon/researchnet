const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
const targets = [
  'display: "flex", gap: 2',
  'gap: 2, background',
  'var(--bg-secondary)',
  'border: view === item.key',
  'flexShrink: 0,',
  'item.icon);\\n          {item.icon'
];
for (const t of targets) {
  const idx = c.indexOf(t);
  console.log(`'${t}' => ${idx}`);
  if (idx >= 0) console.log('  CONTEXT:', JSON.stringify(c.substring(Math.max(0,idx-30), idx+80)));
}