const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');
let changed = 0;

// Fix 1: "Andrs" in researcher name → "Andrés" (insert C3 A9 = é after 's')
// "Andrs Leal": A=41 n=6E d=64 r=72 s=73 L=4C
// insert é (C3 A9) after the 's' (position after 7 bytes: "Dr. And")
const drAndrs = buf.indexOf(Buffer.from('Dr. Andrs'));
if (drAndrs !== -1) {
  // Insert after "Dr. Andr" = "Dr. " (4) + "Andr" (4) = 8 bytes
  buf = Buffer.concat([buf.slice(0, drAndrs + 8), Buffer.from([0xC3, 0xA9]), buf.slice(drAndrs + 8)]);
  changed++;
}

// Fix 2: "Salud Pblica" → "Salud Pública" (insert 'u' = 0x75 after 'b' in "Pblica")
let idx = buf.indexOf(Buffer.from('Salud P'));
while (idx !== -1) {
  // Check if this is "Pblica" (not already "Pblica")
  const rest = buf.slice(idx + 7, idx + 14).toString('utf8');
  if (rest.startsWith('blica')) {
    // insert 'u' (0x75) after 'b' (byte at idx+8)
    buf = Buffer.concat([buf.slice(0, idx + 9), Buffer.from([0x75]), buf.slice(idx + 9)]);
    changed++;
    break;
  }
  idx = buf.indexOf(Buffer.from('Salud P'), idx + 7);
}

// Fix 3: Second "Salud Pblica" in researcherColors object
idx = buf.indexOf(Buffer.from('Salud P'));
while (idx !== -1) {
  const rest = buf.slice(idx + 7, idx + 14).toString('utf8');
  if (rest.startsWith('blica')) {
    buf = Buffer.concat([buf.slice(0, idx + 9), Buffer.from([0x75]), buf.slice(idx + 9)]);
    changed++;
    break;
  }
  idx = buf.indexOf(Buffer.from('Salud P'), idx + 7);
}

// Fix 4: "Colaboracin" → "Colaboración" in opportunity 3 title
// C o l a b o r a c i n: insert ó (C3 B3) before final 'n' (which is at pos len-1)
// "Colaboracin" = 11 bytes, ends at byte 10 = 'n'
// Insert C3 B3 before that 'n'
const colaborIdx = buf.indexOf(Buffer.from('Colaboracin'));
if (colaborIdx !== -1) {
  // replace 'n' at colaborIdx + 10 with ó+n (C3 B3 6E) - effectively insert before
  buf = Buffer.concat([buf.slice(0, colaborIdx + 10), Buffer.from([0xC3, 0xB3, 0x6E]), buf.slice(colaborIdx + 11)]);
  changed++;
}

// Fix 5: "monitorizacin" → "monitorización" in message text
const monIdx = buf.indexOf(Buffer.from('monitorizacin'));
if (monIdx !== -1) {
  // "monitorizacin" = 13 bytes, 'n' at pos 12
  buf = Buffer.concat([buf.slice(0, monIdx + 12), Buffer.from([0xC3, 0xB3, 0x6E]), buf.slice(monIdx + 13)]);
  changed++;
}

// Fix 6: "Cu" ... "ms sobre" → "Cu" ... "más sobre"
let cuIdx = buf.indexOf(Buffer.from('Cu'));
while (cuIdx !== -1) {
  const chunk = buf.slice(cuIdx, cuIdx + 40).toString('utf8');
  const msIdx = chunk.indexOf('ms sobre');
  if (msIdx !== -1) {
    // Replace 'ms' (2 bytes: 0x6D 0x73) with 'más' (3 bytes: 0x6D 0xC3 0xA1 0x73)... wait, that's 4 bytes
    // "más" = m + á + s = 6D C3 A1 73 = 4 bytes
    // But we want to keep 'm' and change 's' to 'ás' = á + s
    // So replace "ms" (6D 73) with "más" (6D C3 A1 73) = insert C3 A1 between them
    const actualMsPos = cuIdx + msIdx;
    buf = Buffer.concat([buf.slice(0, actualMsPos + 1), Buffer.from([0xC3, 0xA1]), buf.slice(actualMsPos + 1)]);
    changed++;
    break;
  }
  cuIdx = buf.indexOf(Buffer.from('Cu'), cuIdx + 1);
}

// Fix 7: "ver ms" → "ver más" in opportunity card CTA
idx = buf.indexOf(Buffer.from('ver ms'));
while (idx !== -1) {
  // Replace 'ms' (6D 73) with 'más' (insert C3 A1 after 'm')
  buf = Buffer.concat([buf.slice(0, idx + 1), Buffer.from([0xC3, 0xA1]), buf.slice(idx + 1)]);
  changed++;
  idx = buf.indexOf(Buffer.from('ver ms'), idx + 1);
}

// Fix 8: "posici" in opportunity 1 description → "posición"
const posiciIdx = buf.indexOf(Buffer.from('posici'));
if (posiciIdx !== -1) {
  // "posici" ends with 'i', next is 'ón' (C3 B3 6E) = ó + n
  // "posici" = p o s i c i = 6 bytes, then typically space or something
  // "posición" = p o s i c i C3 B3 6E = 6 + 3 = 9 bytes
  // Replace nothing, just insert ó+n after 'i'
  buf = Buffer.concat([buf.slice(0, posiciIdx + 6), Buffer.from([0xC3, 0xB3, 0x6E]), buf.slice(posiciIdx + 6)]);
  changed++;
}

// Fix 9: "Biomdica" → "Biomédica" (Ingeniería Biomédica)
// "Biomdica" = B i o m d i c a = 8 bytes, missing é after 'm'
// "Biomédica" = B i o m C3 A9 d i c a = 10 bytes
// Insert é (C3 A9) after 'm'
let biomIdx = buf.indexOf(Buffer.from('Biomdica'));
while (biomIdx !== -1) {
  buf = Buffer.concat([buf.slice(0, biomIdx + 5), Buffer.from([0xC3, 0xA9]), buf.slice(biomIdx + 5)]);
  changed++;
  biomIdx = buf.indexOf(Buffer.from('Biomdica'), biomIdx + 1);
}

// Fix 10: "seales neuronales" → "señales neuronales" in researcher 1 bio
let seanIdx = buf.indexOf(Buffer.from('seales'));
while (seanIdx !== -1) {
  // "seales" = s e a l e s (6 bytes), insert ñ after 'a'
  // Actually "seales" should be "señales" = s e C3 B1 a l e s (8 bytes)
  // s=73 e=65 a=61 l=6C e=65 s=73
  // "se" = 73 65, then ñ = C3 B1, then "ales" = 61 6C 65 73
  buf = Buffer.concat([buf.slice(0, seanIdx + 2), Buffer.from([0xC3, 0xB1]), buf.slice(seanIdx + 2)]);
  changed++;
  seanIdx = buf.indexOf(Buffer.from('seales'), seanIdx + 1);
}

// Fix 11: "Ingeniera" → "Ingeniería" in researcher 1 dept
// "Ingeniera" has the encoding problem. "Ingeniería" = I n g e n i e r í a
// Actually "Ingeniera" = 49 6E 67 65 6E 69 65 72 61 (9 bytes, missing é)
// Wait - the issue is "Ingeniera" where the 'é' is corrupted
// "Ingeniería" = n g e n i e r = the 'é' is between 'e' and 'r'
let ingIdx = buf.indexOf(Buffer.from('Ingeniera'));
while (ingIdx !== -1) {
  // "Ingeniera" = I n g e n i e r a (9 bytes)
  // "Ingeniería" = I n g e n i e r C3 AD a (10 bytes)  
  // 'r' is at byte index 7 (0-indexed), 'a' at 8
  // Insert í (C3 AD) after 'r'
  buf = Buffer.concat([buf.slice(0, ingIdx + 8), Buffer.from([0xC3, 0xAD]), buf.slice(ingIdx + 8)]);
  changed++;
  ingIdx = buf.indexOf(Buffer.from('Ingeniera'), ingIdx + 1);
}

// Fix 12: "Computacin" → "Computación" in opportunity 1
let compIdx = buf.indexOf(Buffer.from('Computacin'));
while (compIdx !== -1) {
  // "Computacin" = C o m p u t a c i n (10 bytes), insert ó before final 'n'
  buf = Buffer.concat([buf.slice(0, compIdx + 9), Buffer.from([0xC3, 0xB3, 0x6E]), buf.slice(compIdx + 10)]);
  changed++;
  compIdx = buf.indexOf(Buffer.from('Computacin'), compIdx + 1);
}

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);

// Verify
const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
[15,17,18,24,26,27,35,65].forEach(i => console.log(`L${i+1}:`, clines[i].slice(0, 130)));
console.log('Total changed:', changed);