const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');

// Fix C3 83 C2 XX double-encoding: C3 XX
// Original UTF-8 bytes were read as Latin-1 (giving chars Ã with code C3 and something with code XX)
// Those Latin-1 chars were re-encoded to UTF-8 as C3 83 (for Ã) and C2 XX (for the accented char)
// To fix: C3 83 C2 XX → C3 XX  (drop the C3 83 middle part and fix the second byte)

const fixMap = {
  0xa9: 0xe9, // C2 A9 → C3 E9 (é)
  0xa1: 0xe1, // C2 A1 → C3 E1 (á)
  0xad: 0xed, // C2 AD → C3 ED (í)
  0xb3: 0xf3, // C2 B3 → C3 F3 (ó)
  0xba: 0xfa, // C2 BA → C3 FA (ú)
  0xbc: 0xfc, // C2 BC → C3 FC (ü)
  0xb1: 0xf1, // C2 B1 → C3 F1 (ñ)
};

let i = 0;
let changed = 0;
while (i < buf.length - 3) {
  if (buf[i] === 0xC3 && buf[i+1] === 0x83 && buf[i+2] === 0xC2) {
    const secondByte = buf[i+3];
    const replacement = fixMap[secondByte];
    if (replacement !== undefined) {
      // Replace C3 83 C2 XX with C3 [replacement] (drop 3 bytes, keep 1 new byte)
      const before = buf.slice(0, i);
      const after = buf.slice(i + 4);
      buf = Buffer.concat([before, Buffer.from([0xC3, replacement]), after]);
      changed++;
      continue;
    }
  }
  i++;
}

// Fix pos 924-925: C3 A9 (é) should be C3 A1 (á) for Ibáñez
// Find the context: search for ...Ib[CORRUPT]nez...
let ibanezIdx = buf.indexOf(Buffer.from('Ib'));  
while (ibanezIdx !== -1) {
  if (buf[ibanezIdx+2] === 0xC3 && buf[ibanezIdx+3] === 0xA9 && 
      buf[ibanezIdx+4] === 0x6E && buf[ibanezIdx+5] === 0x65 && buf[ibanezIdx+6] === 0x7A) {
    // This is the corrupted Ibáñez: Ib + C3 A9 + nez → should be Ib + C3 A1 + nez
    buf[ibanezIdx+3] = 0xA1; // é → á
    changed++;
    break;
  }
  ibanezIdx = buf.indexOf(Buffer.from('Ib'), ibanezIdx + 1);
}

// Fix "Salud Pblica" → "Salud Pública" in researcherColors
let salIndex = buf.indexOf(Buffer.from('Salud P'));
while (salIndex !== -1) {
  if (buf[salIndex+7] === 0x62 && buf[salIndex+8] === 0x6C && buf[salIndex+9] === 0x69 &&
      buf[salIndex+10] === 0x63 && buf[salIndex+11] === 0x61) {
    // Found "Pblica" - change 'b' (0x62) to 'bl'
    // We need to insert 'l' (0x6C) after 'b' and shift everything
    const before = buf.slice(0, salIndex + 8); // up to and including 'b'
    const after = buf.slice(salIndex + 8);
    buf = Buffer.concat([before, Buffer.from([0x6C]), after]); // insert 'l'
    changed++;
    break;
  }
  salIndex = buf.indexOf(Buffer.from('Salud P'), salIndex + 1);
}

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);

// Verify
const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
console.log('L15 (tag):', clines[14].slice(80, 210));
console.log('L16 (bio):', clines[15].slice(80, 200));
console.log('L17 (bio):', clines[16].slice(80, 200));
console.log('L65 (dept):', clines[64]);
console.log('Total changed:', changed);