const fs = require('fs');
let c = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
// Find the >> sequence in the file
const pos = c.indexOf('    >>\r\n');
console.log('Found >> at:', pos);
if (pos !== -1) {
  // Replace "    >>\r\n" with "    >\r\n"
  c = c.replace('    >>\r\n', '    >\r\n');
  fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', c);
  console.log('Fixed!');
} else {
  // Try without leading spaces
  const pos2 = c.indexOf('>>\r\n      {/* Warm');
  console.log('Alt >> at:', pos2);
  if (pos2 !== -1) {
    c = c.replace('>>\r\n      {/* Warm', '>\r\n      {/* Warm');
    fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', c);
    console.log('Fixed alt!');
  }
}

// Verify
const c2 = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const lines = c2.split('\n');
console.log('Lines 334-340:', lines.slice(333, 340).map((l,i)=>i+334+': '+JSON.stringify(l)));