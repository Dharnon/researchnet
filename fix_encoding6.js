const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');
let changed = 0;

// Fix 1: "Andrs Leal" → "Andrés Leal" (line 17)
// "Andrs" = 41 6E 64 72 73 = 5 bytes, "Andrés" = 41 6E 64 72 C3 A9 73 = 6 bytes
// Insert C3 A9 after 's'
let idx = buf.indexOf(Buffer.from('Andrs Leal'));
if (idx !== -1) {
  buf = Buffer.concat([buf.slice(0, idx + 5), Buffer.from([0xC3, 0xA9]), buf.slice(idx + 5)]);
  changed++;
}

// Fix 2: "Salud Pblica" → "Salud Pública" in researcher id=5 dept (line 18)
// "Salud " = 7 bytes (S a l u d space), then "Pblica" = 6 bytes
// "Pública" = 7 bytes: P u b l i c a
// Insert 'u' (0x75) after 'b' (0x62) in "Pblica"
idx = 0;
while ((idx = buf.indexOf(Buffer.from('Salud P', 'utf8'), idx)) !== -1) {
  const afterP = buf.slice(idx + 7, idx + 14);
  if (afterP.toString('utf8').startsWith('blica')) {
    buf = Buffer.concat([buf.slice(0, idx + 9), Buffer.from([0x75]), buf.slice(idx + 9)]);
    changed++;
    break;
  }
  idx += 7;
}

// Fix 3: "Salud Pblica" → "Salud Pública" in researcherColors (line 65)
// Same pattern
idx = 0;
while ((idx = buf.indexOf(Buffer.from('Salud P', 'utf8'), idx)) !== -1) {
  const afterP = buf.slice(idx + 7, idx + 14);
  if (afterP.toString('utf8').startsWith('blica')) {
    buf = Buffer.concat([buf.slice(0, idx + 9), Buffer.from([0x75]), buf.slice(idx + 9)]);
    changed++;
    break;
  }
  idx += 7;
}

// Fix 4: "Colaboracin EU Horizon" → "Colaboración EU Horizon" in opportunity title (line 25)
// "Colaboracin" = C o l a b o r a c i n = 11 bytes
// "Colaboración" = C o l a b o r a C3 B3 63 69 6E = 12 bytes
// Replace final 'n' (0x6E) at end with ó (C3 B3) + n (0x6E) = add one byte
idx = buf.indexOf(Buffer.from('Colaboracin'));
while (idx !== -1) {
  // Replace last 'n' of "Colaboracin" with 'ón'
  // "Colaboracin" = positions: C(0) o(1) l(2) a(3) b(4) o(5) r(6) a(7) c(8) i(9) n(10)
  // Replace n with ó+n = C3 B3 6E
  buf = Buffer.concat([buf.slice(0, idx + 10), Buffer.from([0xC3, 0xB3, 0x6E]), buf.slice(idx + 11)]);
  changed++;
  break;
}

// Fix 5: "monitorizacin" in message text → "monitorización" 
// "monitorizacin" = m o n i t o r i z a c i n = 13 bytes
// "monitorización" = m o n i t o r i z a C3 B3 63 69 6E = 14 bytes
// 'c' at pos 11, 'i' at 12, 'n' at 13. 'n' = pos 13 → replace with ó + n = C3 B3 6E
idx = buf.indexOf(Buffer.from('monitorizacin'));
while (idx !== -1) {
  buf = Buffer.concat([buf.slice(0, idx + 12), Buffer.from([0xC3, 0xB3, 0x6E]), buf.slice(idx + 13)]);
  changed++;
  break;
}

// Fix 6: "Cuéntame ms sobre" → "Cuéntame más sobre" in message
// "ms" = 6D 73, "más" = 6D C3 A1 73 (m + á + s)
idx = buf.indexOf(Buffer.from('Cu'));
while (idx !== -1) {
  const chunk = buf.slice(idx, idx + 30).toString('utf8');
  if (chunk.startsWith('Cu') && chunk.includes('ms sobre')) {
    const msIdx = chunk.indexOf('ms');
    const actualPos = idx + msIdx;
    // Replace 'ms' (0x6D 0x73) with 'm' + 'ás' (0x6D C3 A1 0x73)
    buf = Buffer.concat([buf.slice(0, actualPos), Buffer.from([0x6D, 0xC3, 0xA1, 0x73]), buf.slice(actualPos + 2)]);
    changed++;
    break;
  }
  idx = buf.indexOf(Buffer.from('Cu'), idx + 1);
}

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);

// Verify
const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
console.log('L17:', clines[16].slice(0, 120));
console.log('L18:', clines[17].slice(0, 120));
console.log('L26:', clines[25].slice(0, 120));
console.log('L35:', clines[34].slice(0, 120));
console.log('L65:', clines[64]);
console.log('L35 full:', clines[34]);
console.log('Changed:', changed);