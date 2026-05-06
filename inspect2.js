const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
const idx = c.indexOf('gap: 5, flexShrink: 0');
if (idx >= 0) {
  console.log('gap: 5, flexShrink: 0 at:', idx);
  console.log(JSON.stringify(c.substring(Math.max(0, idx - 20), idx + 300)));
} else {
  console.log('NOT FOUND');
  // Search for nearby
  const idx2 = c.indexOf('gap: 5');
  console.log('gap: 5 at:', idx2);
  if (idx2 >= 0) console.log(JSON.stringify(c.substring(idx2 - 50, idx2 + 200)));
  const idx3 = c.indexOf('NavBar');
  console.log('NavBar at:', idx3);
  if (idx3 >= 0) console.log(JSON.stringify(c.substring(idx3 - 100, idx3 + 200)));
}