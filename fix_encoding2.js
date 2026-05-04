const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');

// Fix specific byte-level corruptions
// pos 924-925 in page.tsx: should be C3 A1 (á) for "Ibáñez", currently C3 A9 (é) due to encoding error
// We scan the whole file for the C3 83 C2 XX pattern (double-encoded) and fix those

let changed = 0;

// Pattern: C3 83 C2 XX → C3 XX (decode double-encoding)
const doubleEncodedMap = {
  0xa9: 0xe9, // C2 A9 → A9 in C3 slot → C3 E9 = é
  0xa1: 0xe1, // C2 A1 → A1 in C3 slot → C3 E1 = á  
  0xad: 0xed, // C2 AD → AD in C3 slot → C3 ED = í
  0xb3: 0xf3, // C2 B3 → B3 in C3 slot → C3 F3 = ó
  0xba: 0xfa, // C2 BA → BA in C3 slot → C3 FA = ú
  0xbc: 0xfc, // C2 BC → BC in C3 slot → C3 FC = ü
  0xb1: 0xf1, // C2 B1 → B1 in C3 slot → C3 F1 = ñ
};

let i = 0;
let result = Buffer.alloc(buf.length);
let j = 0;
while (i < buf.length - 3) {
  if (buf[i] === 0xC3 && buf[i+1] === 0x83 && buf[i+2] === 0xC2) {
    const replacement = doubleEncodedMap[buf[i+3]];
    if (replacement) {
      result[j++] = 0xC3;
      result[j++] = replacement;
      i += 4;
      changed++;
      continue;
    }
  }
  result[j++] = buf[i++];
}
while (i < buf.length) result[j++] = buf[i++];

const fixed = result.slice(0, j);
fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', fixed);

// Verify
const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
console.log('L15:', clines[14].slice(80, 200));
console.log('L16:', clines[15].slice(80, 200));
console.log('L17:', clines[16].slice(80, 200));
console.log('L65:', clines[64]);
console.log('Changed:', changed);