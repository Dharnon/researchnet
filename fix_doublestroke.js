const fs = require('fs');
const buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');
let changed = 0;

// Known double-encoding corruption patterns:
// Original UTF-8: C3 A9 (é), C3 A0 (à), C3 AD (í), C3 B3 (ó)
// After Latin-1 misread + re-UTF-8: C3 83, C3 80, C3 8D, C3 93
// Original UTF-8: C3 BA (ú) → misread C3 9A (but 9A isn't common)
// Original: C3 BC (ü) → misread C3 9C

const fixes = [
  { from: Buffer.from([0xC3, 0x83]), to: Buffer.from([0xC3, 0xA9]) }, // é
  { from: Buffer.from([0xC3, 0x82]), to: Buffer.from([0xC3, 0xA0]) }, // à
  { from: Buffer.from([0xC3, 0x8D]), to: Buffer.from([0xC3, 0xAD]) }, // í
  { from: Buffer.from([0xC3, 0x93]), to: Buffer.from([0xC3, 0xB3]) }, // ó
  { from: Buffer.from([0xC3, 0x9A]), to: Buffer.from([0xC3, 0xBA]) }, // ú
  { from: Buffer.from([0xC3, 0x9C]), to: Buffer.from([0xC3, 0xBC]) }, // ü
];

for (const fix of fixes) {
  let i = 0;
  while ((i = buf.indexOf(fix.from, i)) !== -1) {
    buf[i] = fix.to[0];
    buf[i+1] = fix.to[1];
    changed++;
    i += 2;
  }
}

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);
console.log('Fixed', changed, 'bytes');