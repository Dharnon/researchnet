const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
const idx = c.indexOf('Sin mensajes aún');
if (idx >= 0) console.log(JSON.stringify(c.substring(idx - 200, idx + 400)));

// Check no hardcoded white/gray in nav bar
const idx2 = c.indexOf('rgba(255,255,255');
console.log('\nHardcoded white in page.tsx at:');
let pos = c.indexOf('rgba(255,255,255');
while (pos >= 0) { console.log(' ', pos, JSON.stringify(c.substring(pos, pos + 60))); pos = c.indexOf('rgba(255,255,255', pos + 1); }