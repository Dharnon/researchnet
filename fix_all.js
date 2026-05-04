const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');
let changed = 0;

function applyFix(buf, pos, insertBytes, replaceLen = 0) {
  if (replaceLen > 0) {
    buf = Buffer.concat([buf.slice(0, pos), insertBytes, buf.slice(pos + replaceLen)]);
    changed += replaceLen > 0 ? 1 : 1;
  } else {
    buf = Buffer.concat([buf.slice(0, pos), insertBytes, buf.slice(pos)]);
  }
  return buf;
}

// Fix 1: "Dr. Andrs Leal" → "Dr. Andrés Leal" (pos 1639)
// "Dr. " = 4 bytes, "Andr" = 4 bytes, then 's'
// Insert é (C3 A9) at pos 1639+8 = 1647 (after "Dr. Andr")
buf = applyFix(buf, 1647, Buffer.from([0xC3, 0xA9]));
// After: "Dr. Andrés Leal"

// Fix 2: "Salud Pblica" researcher dept (pos 2063)
// "Salud " = 6 bytes, then "Pb" = 2 bytes, then "lica"
// Insert 'u' (75) at pos 2063+9 = 2072 (after 'b')
buf = applyFix(buf, 2072, Buffer.from([0x75]));
// After: "Salud Pública"

// Fix 3: "Salud Pblica" researcherColors (pos 5974)
// Insert 'u' (75) at pos 5974+9 = 5983
buf = applyFix(buf, 5983, Buffer.from([0x75]));
// After: "Salud Pública"

// Fix 4: "Colaboracin" → "Colaboración" (pos 3279)
// "Colaboracin" = 11 bytes, ends with 'n' at pos 3279+10 = 3289
// Insert ó (C3 B3) before 'n'
buf = applyFix(buf, 3289, Buffer.from([0xC3, 0xB3]));
// After: "Colaboración"

// Fix 5: "ms sobre" → "más sobre" (pos 4673)
// "ms" = 2 bytes, 'm' at pos 4673, 's' at 4674
// Insert á (C3 A1) after 'm' = at pos 4674
buf = applyFix(buf, 4674, Buffer.from([0xC3, 0xA1]));
// After: "más sobre"

// Fix 6: "queramos" → "queríamos" (pos 4856)
// q u e r a m o s (8 bytes: 4856-4863)
// 'm' at pos 4861 (pos+5)
// Insert í (C3 AD) before 'm' = at pos 4861
buf = applyFix(buf, 4861, Buffer.from([0xC3, 0xAD]));
// After: "queríamos"

// Fix 7: "anlisis" → "análisis" (pos 1568)
// a n l i s i s (7 bytes: 1568-1574)
// 'n' at 1569 (pos+1)
// Insert á (C3 A1) after 'n' = at pos 1570
buf = applyFix(buf, 1569, Buffer.from([0xC3, 0xA1]));
// After: "análisis"

// Fix 8: "genticas" → "genéticas" (pos 1589)
// g e n t i c a s (8 bytes: 1589-1596)
// 'n' at 1591 (pos+2)
// Insert é (C3 A9) after 'n' = at pos 1592
buf = applyFix(buf, 1592, Buffer.from([0xC3, 0xA9]));
// After: "genéticas"

// Fix 9: "edicin" → "edición" (pos 1600)
// e d i c i n (6 bytes: 1600-1605)
// 'n' at 1605 (pos+5)
// Insert ó (C3 B3) before 'n' = at pos 1605
buf = applyFix(buf, 1605, Buffer.from([0xC3, 0xB3]));
// After: "edición"

// Fix 10: "Diseo" → "Diseño" (pos 1880)
// D i s e o = 4 bytes ('o' at 1884)
// Replace 'o' with ó (C3 B3) = 1 byte with 2 bytes
buf = applyFix(buf, 1884, Buffer.from([0xC3, 0xB3]), 1);
// After: "Diseño"

// Fix 11: "cunticos" → "cuánticos" (pos 1897)
// c u n t i c o s (8 bytes: 1897-1904)
// 'u' at 1898 (pos+1), 'n' at 1899
// Insert á (C3 A1) after 'u' = at pos 1899
buf = applyFix(buf, 1899, Buffer.from([0xC3, 0xA1]));
// After: "cuánticos"

// Fix 12: "epidemiolgicos" → "epidemiológicos" (pos 2284)
// e p i d e m i o l g i c o s (14 bytes: 2284-2297)
// 'l' at 2292 (pos+8), 'g' at 2293 (pos+9)
// Insert ó (C3 B3) before 'g' = at pos 2293
buf = applyFix(buf, 2293, Buffer.from([0xC3, 0xB3]));
// After: "epidemiológicos"

// Fix 13: "percepcin" → "percepción" (pos 2614)
// p e r c e p c i n (9 bytes: 2614-2622)
// 'c' at 2620 (pos+6), 'i' at 2621, 'n' at 2622
// Replace "cin" (2614+6 to 2614+9 = 2620-2622) with "ción" (C3 B3 63 69 6E = 5 bytes)
// C3 B3 63 69 6E replaces 63 69 6E
buf = applyFix(buf, 2619, Buffer.from([0xC3, 0xB3, 0x63, 0x69, 0x6E]), 3);
// After: "percepción"

// Fix 14: "auunomos" → "autónomos" (pos 2643)
// a u u n o m o s (8 bytes: 2643-2650)
// 'u' at 2644 (pos+1), 'u' at 2645 (pos+2)
// Replace 'u' (at pos 2644) with 'tó' = 74 C3 B3 (3 bytes: t + ó)
// This expands the string by 2 bytes (3 ins, 1 rep)
buf = applyFix(buf, 2644, Buffer.from([0x74, 0xC3, 0xB3]), 1);
// After: "autónomos" = a u t ó n o m o s = 61 75 74 C3 B3 6E 6F 6D 6F 73 ✓

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);

// Verify
const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
console.log('=== Verification ===');
console.log('L17 (Andrés):', clines[16].slice(0, 100));
console.log('L18 (Salud):', clines[17].slice(0, 100));
console.log('L19 (genética/edición):', clines[18].slice(0, 100));
console.log('L25 (Colaboración):', clines[24].slice(0, 100));
console.log('L33 (queramos):', clines[32].slice(0, 120));
console.log('L34 (ms sobre):', clines[33].slice(0, 120));
console.log('L65 (researcherColors):', clines[64]);

const remaining = ['Andrs', 'Salud P', 'Colaboracin', 'monitorizacin', 'anlisis', 'genticas', 'edicin', 'Diseo ', 'cunticos', 'epidemiolgicos', 'percepcin', 'auunomos', 'queramos'];
const stillCorrupt = remaining.filter(c => check.includes(c));
if (stillCorrupt.length === 0) {
  console.log('\n✓ All 14 corruptions fixed!');
} else {
  console.log('\nStill corrupt:', stillCorrupt);
}