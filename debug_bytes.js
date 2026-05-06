const fs = require('fs');
const buf = fs.readFileSync('src/app/page.tsx');

// Find the line with "Salud Pblica" in researcherColors
const target = Buffer.from('Salud P', 'utf8');
let byteIdx = buf.indexOf(target);
console.log('First Salud P byteIdx:', byteIdx);

// Walk through all Salud hits in bytes
let s = 0;
while (true) {
  const i = buf.indexOf(Buffer.from('Salud', 'utf8'), s);
  if (i < 0 || i > buf.length) break;
  console.log('byteIdx:', i, 'hex:', buf.slice(i, i + 15).toString('hex'));
  s = i + 1;
}
