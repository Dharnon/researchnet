const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');

function findAndReplace(buf, searchStr, replacement) {
  const search = Buffer.from(searchStr, 'utf8');
  let pos = 0;
  while ((pos = buf.indexOf(search, pos)) !== -1) {
    const before = buf.slice(0, pos);
    const after = buf.slice(pos + search.length);
    buf = Buffer.concat([before, replacement, after]);
    pos += replacement.length;
  }
  return buf;
}

function findAndInsertAfter(buf, searchStr, targetOffset, insertBytes) {
  const search = Buffer.from(searchStr, 'utf8');
  let pos = buf.indexOf(search);
  if (pos === -1) return buf;
  const actualPos = pos + targetOffset;
  return Buffer.concat([buf.slice(0, actualPos), insertBytes, buf.slice(actualPos)]);
}

function findAndReplaceAt(buf, searchStr, targetOffset, oldLen, insertBytes) {
  const search = Buffer.from(searchStr, 'utf8');
  let pos = buf.indexOf(search);
  if (pos === -1) return buf;
  const actualPos = pos + targetOffset;
  return Buffer.concat([buf.slice(0, actualPos), insertBytes, buf.slice(actualPos + oldLen)]);
}

// Fix 1: "Dr. Andrs Leal" → "Dr. Andrés Leal"
// "Dr. " + "Andr" = 8 bytes, 's' = byte 8 → insert é after "Dr. Andr"
buf = findAndInsertAfter(buf, 'Dr. Andrs Leal', 8, Buffer.from([0xC3, 0xA9]));

// Fix 2: "Salud Pblica" → "Salud Pública" (both occurrences)
buf = findAndInsertAfter(buf, 'Salud Pblica', 9, Buffer.from([0x75]));
buf = findAndInsertAfter(buf, 'Salud Pblica', 9, Buffer.from([0x75]));

// Fix 3: "Colaboracin" → "Colaboración"
// "Colaboraci" = 10 bytes, 'n' at byte 10 → insert ó before 'n'
buf = findAndInsertAfter(buf, 'Colaboracin', 10, Buffer.from([0xC3, 0xB3]));

// Fix 4: "ms sobre" → "más sobre"
// "m" = 1 byte → insert á after 'm'
buf = findAndInsertAfter(buf, 'ms sobre', 1, Buffer.from([0xC3, 0xA1]));

// Fix 5: "queramos" → "queríamos"
// "quera" = 5 bytes, 'm' = byte 5 → insert í before 'm'  
buf = findAndInsertAfter(buf, 'queramos', 5, Buffer.from([0xC3, 0xAD]));

// Fix 6: "anlisis" → "análisis"
// "an" = 2 bytes, 'l' = byte 2 → insert á after 'n'
buf = findAndInsertAfter(buf, 'anlisis', 2, Buffer.from([0xC3, 0xA1]));

// Fix 7: "genticas" → "genéticas"
// "gen" = 3 bytes, 't' = byte 3 → insert é after 'n' (= byte 2 in "gen")
// Actually: "gen" + "t"... so 'n' = byte 2, 't' = byte 3. Insert after 'n' = offset 3
buf = findAndInsertAfter(buf, 'genticas', 3, Buffer.from([0xC3, 0xA9]));

// Fix 8: "edicin" → "edición"
// "edici" = 5 bytes, 'n' = byte 5 → insert ó before 'n'
buf = findAndInsertAfter(buf, 'edicin', 5, Buffer.from([0xC3, 0xB3]));

// Fix 9: "Diseo" → "Diseño"  
// Replace 'o' (1 byte) with ó (2 bytes: C3 B3)
buf = findAndReplaceAt(buf, 'Diseo', 5, 1, Buffer.from([0xC3, 0xB3]));

// Fix 10: "cunticos" → "cuánticos"
// "cu" = 2 bytes, 'n' = byte 2 → insert á after 'u' = offset 3
buf = findAndInsertAfter(buf, 'cunticos', 3, Buffer.from([0xC3, 0xA1]));

// Fix 11: "epidemiolgicos" → "epidemiológicos"
// "epidemiol" = 9 bytes, 'g' = byte 9 → insert ó before 'g'
buf = findAndInsertAfter(buf, 'epidemiolgicos', 9, Buffer.from([0xC3, 0xB3]));

// Fix 12: "percepcin" → "percepción"
// Replace "cin" (3 bytes: c=0,i=1,n=2) with "ción" (5 bytes: C3 B3 63 69 6E)
// At offset 6 (after "percepc"), replace bytes 6,7,8 = 'c','i','n' with "ción"
buf = findAndReplaceAt(buf, 'percepcin', 6, 3, Buffer.from([0xC3, 0xB3, 0x63, 0x69, 0x6E]));

// Fix 13: "auunomos" → "autónomos"
// Replace 'u' at offset 1 with "tó" (3 bytes: 74 C3 B3)
buf = findAndReplaceAt(buf, 'auunomos', 1, 1, Buffer.from([0x74, 0xC3, 0xB3]));

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);

// Verify
const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
console.log('=== Verification ===');
console.log('L17 (Andrés):', clines[16].slice(0, 100));
console.log('L18 (Salud):', clines[17].slice(0, 100));
console.log('L19 (bio):', clines[18].slice(0, 100));
console.log('L25 (Colaboración):', clines[24].slice(0, 100));
console.log('L33 (queramos):', clines[32].slice(0, 120));
console.log('L34 (ms sobre):', clines[33].slice(0, 120));
console.log('L65 (researcherColors):', clines[64]);

const remaining = ['Andrs', 'Salud P', 'Colaboracin', 'monitorizacin', 'anlisis', 'genticas', 'edicin', 'Diseo ', 'cunticos', 'epidemiolgicos', 'percepcin', 'auunomos', 'queramos'];
const stillCorrupt = remaining.filter(c => check.includes(c));
if (stillCorrupt.length === 0) console.log('\nAll 13 corruptions fixed!');
else console.log('\nStill corrupt:', stillCorrupt);