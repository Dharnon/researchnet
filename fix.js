const fs = require('fs');
const f = 'C:\\Users\\josei\\researchnet\\src\\app\\globals.css';
let c = fs.readFileSync(f, 'utf8');

// Look for the exact pattern and replace it
const regex = /0 0 0 1px rgba\(91,143,212,0\.20\),\s+0 8px 40px rgba\(0,0,0,0\.65\),\s+0 0 16px rgba\(91,143,212,0\.08\),\s+inset 0 0 20px rgba\(113,114,154,0\.04\);/;

if (regex.test(c)) {
  console.log('found via regex, replacing...');
  c = c.replace(regex, `0 0 0 1px rgba(91,143,212,0.15),
    0 8px 40px rgba(0,0,0,0.60),
    0 0 12px rgba(91,143,212,0.06),
    inset 0 0 20px rgba(113,114,154,0.04);`);
  fs.writeFileSync(f, c);
  console.log('done');
} else {
  console.log('not found via regex');
}