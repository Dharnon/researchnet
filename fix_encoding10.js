const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');

// Track cumulative offset as we apply fixes
let offset = 0;

function applyFix(buf, pos, insertBytes, replaceLen = 0) {
  pos += offset;
  if (replaceLen > 0) {
    buf = Buffer.concat([buf.slice(0, pos), insertBytes, buf.slice(pos + replaceLen)]);
    offset += insertBytes.length - replaceLen;
  } else {
    buf = Buffer.concat([buf.slice(0, pos), insertBytes, buf.slice(pos)]);
    offset += insertBytes.length;
  }
  return buf;
}

// Fix 1: pos 1639+offset → "Dr. Andrs Leal" → insert é (C3 A9) after "Dr. Andr" (8+4=12 bytes in)
// Before: Dr. Andrs Leal" → after é inserted: Dr. Andrés Leal"
applyFix(buf, 1647, Buffer.from([0xC3, 0xA9]));

// Fix 2: pos 2063 → "Salud Pblica" in researcher dept → insert 'u' after 'b' (pos+9=2072)
// "Salud "=6 + "Pb"=2 = 8 → 'b' at 8, insert after 'b' = pos+9
applyFix(buf, 2072, Buffer.from([0x75]));

// Fix 3: pos 5974 → "Salud Pblica" in researcherColors → same
applyFix(buf, 5983, Buffer.from([0x75]));

// Fix 4: pos 3279 → "Colaboracin" → insert ó (C3 B3) before final 'n' (at pos+10=3289)
applyFix(buf, 3289, Buffer.from([0xC3, 0xB3]));

// Fix 5: pos 4673 → "ms sobre" → insert á (C3 A1) after 'm' (pos+1=4674)
applyFix(buf, 4674, Buffer.from([0xC3, 0xA1]));

// Fix 6: pos 4856 → "queramos" → insert í (C3 AD) before 'm' (at pos+5=4861)
applyFix(buf, 4861, Buffer.from([0xC3, 0xAD]));

// Fix 7: pos 1568 → "anlisis" → insert á (C3 A1) after 'n' (pos+2=1570)
applyFix(buf, 1569, Buffer.from([0xC3, 0xA1]));

// Fix 8: pos 1589 → "genticas" → insert é (C3 A9) after 'n' (pos+2=1591)  
applyFix(buf, 1592, Buffer.from([0xC3, 0xA9]));

// Fix 9: pos 1600 → "edicin" → insert ó (C3 B3) before 'n' (pos+5=1605)
applyFix(buf, 1605, Buffer.from([0xC3, 0xB3]));

// Fix 10: pos 1880 → "Diseo" → replace 'o' (0x6F) with ó (C3 B3) (replaceLen=1, insert 2)
applyFix(buf, 1884, Buffer.from([0xC3, 0xB3]), 1);

// Fix 11: pos 1897 → "cunticos" → insert á (C3 A1) after 'u' (pos+2=1899)
applyFix(buf, 1899, Buffer.from([0xC3, 0xA1]));

// Fix 12: pos 2284 → "epidemiolgicos" → insert ó (C3 B3) before 'g' (pos+9=2293)
applyFix(buf, 2293, Buffer.from([0xC3, 0xB3]));

// Fix 13: pos 2614 → "percepcin" → replace "cin" (3 bytes) with "ción" (5 bytes: C3 B3 63 69 6E)
applyFix(buf, 2619, Buffer.from([0xC3, 0xB3, 0x63, 0x69, 0x6E]), 3);

// Fix 14: pos 2643 → "auunomos" → replace 'u' (at pos+1) with 'tó' = t(74) + ó(C3 B3) (replaceLen=1, insert 2)
applyFix(buf, 2644, Buffer.from([0x74, 0xC3, 0xB3]), 1);

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);

// Verify
const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
console.log('=== Verification ===');
console.log('L17 (Andrés):', clines[16].slice(0, 90));
console.log('L18 (Salud):', clines[17].slice(0, 90));
console.log('L19 (genética):', clines[18].slice(0, 90));
console.log('L25 (Colaboración):', clines[24].slice(0, 90));
console.log('L33 (queramos):', clines[32].slice(0, 120));
console.log('L34 (monitoriz):', clines[33].slice(0, 120));
console.log('L65 (researcherColors):', clines[64]);
console.log('Total fix operations:', offset);

// Check remaining corruptions
const remaining = ['Andrs', 'Salud P', 'Colaboracin', 'monitorizacin', 'anlisis', 'genticas', 'edicin', 'Diseo ', 'cunticos', 'epidemiolgicos', 'percepcin', 'auunomos', 'queramos'];
remaining.forEach(c => {
  if (check.includes(c)) console.log('STILL CORRUPT:', c);
});
if (!remaining.some(c => check.includes(c))) console.log('All known corruptions fixed!');