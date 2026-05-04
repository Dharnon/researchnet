const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');
let changed = 0;

// Known double-encoding patterns in this file:
// é (U+00E9 = C3 A9 in UTF-8) got double-encoded:
// Original C3 A9 → misread via Latin-1 → C3 83 C2 A9 → displayed as é‰
// Pattern: C3 83 C2 A9 = "é‰" (mojibake for é)
// Pattern: C3 83 C2 AD = "í‰" (mojibake for í)  
// Pattern: C3 83 C2 B3 = "ó³" (mojibake for ó)
// Pattern: C3 83 C2 A1 = "á¡" (mojibake for á)
// Pattern: C3 83 C2 BA = "úº" (mojibake for ú)

const fixes = [
  { from: Buffer.from([0xC3, 0x83, 0xC2, 0xA9]), to: Buffer.from([0xC3, 0xA9]) }, // é
  { from: Buffer.from([0xC3, 0x83, 0xC2, 0xAD]), to: Buffer.from([0xC3, 0xAD]) }, // í
  { from: Buffer.from([0xC3, 0x83, 0xC2, 0xB3]), to: Buffer.from([0xC3, 0xB3]) }, // ó
  { from: Buffer.from([0xC3, 0x83, 0xC2, 0xA1]), to: Buffer.from([0xC3, 0xA1]) }, // á
  { from: Buffer.from([0xC3, 0x83, 0xC2, 0xBA]), to: Buffer.from([0xC3, 0xBA]) }, // ú
  { from: Buffer.from([0xC3, 0x83, 0xC2, 0xBC]), to: Buffer.from([0xC3, 0xBC]) }, // ü
  // Also fix direct byte corruption (single C3 XX where wrong XX):
  // pos 924-925: C3 A9 should be C3 A1 for á in Ibáñez
  { from: Buffer.from([0xC3, 0xA9]), to: Buffer.from([0xC3, 0xA1]) }, // fix: é→á
];

for (const fix of fixes) {
  let i = 0;
  while ((i = buf.indexOf(fix.from, i)) !== -1) {
    const before = buf.slice(i, i + fix.from.length).toString('hex');
    buf[i] = fix.to[0];
    buf[i+1] = fix.to[1];
    if (fix.from.length > 2) {
      // Shift remaining bytes left
      const rest = buf.slice(i + fix.from.length);
      buf = Buffer.concat([buf.slice(0, i + 2), rest]);
    }
    changed++;
    i += 2;
  }
}

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);
console.log('Fixed', changed, 'occurrences');