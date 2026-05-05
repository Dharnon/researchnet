const fs = require('fs');
const c = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const idx = c.indexOf('vc-section-heading">Oportunidades');
if (idx === -1) {
  console.log('NOT FOUND oportunidades');
} else {
  console.log('Found at', idx);
  console.log(JSON.stringify(c.slice(idx - 10, idx + 300)));
}