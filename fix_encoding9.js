const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');
let changed = 0;

function insert(buf, pos, bytes) {
  return Buffer.concat([buf.slice(0, pos), bytes, buf.slice(pos)]);
}
function replace(buf, pos, oldLen, bytes) {
  return Buffer.concat([buf.slice(0, pos), bytes, buf.slice(pos + oldLen)]);
}

// Fix 1: pos 1639 - "Dr. Andrs Leal" → "Dr. Andrés Leal" (insert C3 A9 after byte 8+4=12, i.e. after "Dr. Andr")
// "Dr. Andr" = 8 (Dr. ) + 4 (Andr) = 12 bytes, then 's' at 12
buf = insert(buf, 1647, Buffer.from([0xC3, 0xA9])); // insert é after "Dr. Andr"
changed++;

// Fix 2: pos 2063 - "Salud Pblica" in researcher dept → "Salud Pública" 
// "Salud " = 6 bytes (S=0,a=1,l=2,u=3,d=4, =5), "P" at 6, "blica" at 7-12
// Insert 'u' (75) after "P" (at pos 9, after 7 bytes of "Salud " + 2 bytes of "Pb")
// Actually: "Salud " = 6 bytes (pos 2063+0 to 2063+5), then "P" at 2063+6, then "blica" at 2063+7 to 2063+12
// Insert 'u' after 'b' = pos 2063 + 9 (7 + 2 bytes "Pb")
buf = insert(buf, 2072, Buffer.from([0x75])); // insert 'u' after 'b'
changed++;

// Fix 3: pos 5974 - "Salud Pblica" in researcherColors → "Salud Pública"
buf = insert(buf, 5983, Buffer.from([0x75]));
changed++;

// Fix 4: pos 3279 - "Colaboracin" → "Colaboración"
// "Colaboracin" = 11 bytes, 'n' at pos 3279+10
// Insert C3 B3 (ó) before the final 'n'
buf = insert(buf, 3289, Buffer.from([0xC3, 0xB3])); // insert ó before 'n'
changed++;

// Fix 5: pos 4673 - "ms sobre" → "más sobre" 
// "ms sobre" = "ms" (2 bytes: 6D 73) at pos 4673,4674, then " sobre" 
// Insert C3 A1 (á) after 'm' = at pos 4674
buf = insert(buf, 4674, Buffer.from([0xC3, 0xA1])); // insert á after 'm'
changed++;

// Fix 6: pos 4856 - "queramos" → "queríamos"
// "queramos" = q u e r a m o s (8 bytes), should be "queríamos" = q u e r í a m o s
// Insert C3 AD (í) before 'm' (which is at pos 4856+5)
// Actually: q=0,u=1,e=2,r=3,a=4,m=5,o=6,s=7 → insert í before m
buf = insert(buf, 4861, Buffer.from([0xC3, 0xAD])); // insert í before 'm'
changed++;

// Fix 7: pos 1568 - "anlisis" → "análisis"
// "anlisis" = a n l i s i s (7 bytes) → "análisis" = a n á l i s i s
// Insert C3 A1 (á) after 'n' (at pos 1)
buf = insert(buf, 1569, Buffer.from([0xC3, 0xA1]));
changed++;

// Fix 8: pos 1589 - "genticas" → "genéticas"
// "genticas" = g e n t i c a s (8 bytes) → "genéticas" = g e n é t i c a s
// Insert C3 A9 (é) after 'n' (at pos 2)  
buf = insert(buf, 1592, Buffer.from([0xC3, 0xA9]));
changed++;

// Fix 9: pos 1600 - "edicin" → "edición"
// "edicin" = e d i c i n (6 bytes) → "edición" = e d i c i ó n (7 bytes)
// Insert C3 B3 (ó) before 'n'
buf = insert(buf, 1605, Buffer.from([0xC3, 0xB3]));
changed++;

// Fix 10: pos 1880 - "Diseo" → "Diseño"
// "Diseo" = D i s e o (5 bytes) → "Diseño" = D i s e ó (6 bytes, ó = C3 B3)
// Replace final 'o' (0x6F at pos 1880+4) with ó (C3 B3) 
buf = replace(buf, 1884, 1, Buffer.from([0xC3, 0xB3]));
changed++;

// Fix 11: pos 1897 - "cun" → "cuán" in "cunticos"
// "cunticos" = c u n t i c o s (8 bytes)
// Should be "cuánticos" = c u á n t i c o s = insert á (C3 A1) after 'u' (at pos 1)
// Also need to fix "cunticos" → "cuánticos"
// c=0 u=1 n=2 t=3 i=4 c=5 o=6 s=7
// Insert C3 A1 after 'u' at pos 2
buf = insert(buf, 1899, Buffer.from([0xC3, 0xA1])); // insert á after 'u'
changed++;

// Fix 12: pos 2284 - "epidemiolgicos" → "epidemiológicos"
// "epidemiolgicos" = e p i d e m i o l g i c o s (14 bytes)
// "epidemiológicos" = e p i d e m i o l ó g i c o s (15 bytes) - insert ó after 'l' (at pos 9)
// e=0 p=1 i=2 d=3 e=4 m=5 i=6 o=7 l=8 g=9 i=10 c=11 o=12 s=13
// Insert ó before 'g' (at pos 9)
buf = insert(buf, 2293, Buffer.from([0xC3, 0xB3])); // insert ó before 'g'
changed++;

// Fix 13: pos 2614 - "percepcin" → "percepción"
// "percepcin" = p e r c e p c i n (9 bytes)
// "percepción" = p e r c e p c i ó n (10 bytes) - but we need p e r c e p C3 B3 63 69 6E
// Replace last 3 bytes: 63 69 6E (cin) with C3 B3 63 69 6E (ción)
buf = replace(buf, 2619, 3, Buffer.from([0xC3, 0xB3, 0x63, 0x69, 0x6E])); 
changed++;

// Fix 14: pos 2643 - "auunomos" → "autónomos"
// "auunomos" = a u u n o m o s (8 bytes)
// "autónomos" = a u t ó n o m o s (10 bytes)
// "auu" → "aut" = change 'u' (0x75) at pos 2643+1 to 't' (0x74) and insert ó after it
// Actually: a=0 u=1 u=2 n=3 o=4 m=5 o=6 s=7
// Replace "u" (at pos 1) with "ut" = 75 → 74 74 (both t's? no...)
// Let me do: replace "auun" (4 bytes: 61 75 75 6E) with "autó" (4 bytes: 61 75 74 C3 B3)
// a=61 u=75 n=6E, but we want t=74 and ó=C3 B3
buf = replace(buf, 2644, 1, Buffer.from([0x74, 0xC3, 0xB3])); // replace 'u' with 'tó'
// Now we have "autnomos" - need to insert 'ó' before 'n'... wait no:
// "autónomos": a u t ó n o m o s = 61 75 74 C3 B3 6E 6F 6D 6F 73
// After our fix, we have: 61 75 74 C3 B3 6E 6F 6D 6F 73 = "autónomos" ✓
changed++;

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);

// Verify
const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
console.log('=== Verification ===');
console.log('L17 (Andrés):', clines[16].slice(0, 90));
console.log('L18 (Salud):', clines[17].slice(0, 90));
console.log('L24 (Colaboración):', clines[23].slice(0, 90));
console.log('L33 (queramos):', clines[32].slice(0, 120));
console.log('L34 (monitoriz):', clines[33].slice(0, 120));
console.log('L65 (researcherColors):', clines[64]);
console.log('Changed:', changed);

// Check remaining corruptions
const remaining = ['Andrs', 'Salud P', 'Colaboracin', 'monitorizacin', 'anlisis', 'genticas', 'edicin', 'Diseo ', 'cunticos', 'epidemiolgicos', 'percepcin', 'auunomos', 'queramos'];
remaining.forEach(c => {
  if (check.includes(c)) console.log('STILL:', c, 'at', check.indexOf(c));
});