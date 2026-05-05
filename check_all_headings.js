const fs = require('fs');
const c = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const matches = [];
let idx = 0;
while ((idx = c.indexOf('vc-section-heading', idx)) !== -1) {
  matches.push(JSON.stringify(c.slice(idx, idx + 80)));
  idx += 'vc-section-heading'.length;
}
console.log('Found', matches.length);
matches.forEach(m => console.log(m));