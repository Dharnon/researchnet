const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');
let changed = 0;

// Helper to insert bytes at position
function insertAt(buf, pos, bytes) {
  return Buffer.concat([buf.slice(0, pos), bytes, buf.slice(pos)]);
}
// Helper to replace bytes at position with new content
function replaceAt(buf, pos, oldLen, newBytes) {
  return Buffer.concat([buf.slice(0, pos), newBytes, buf.slice(pos + oldLen)]);
}

// Fix 1: "Salud Pblica" → "Salud Pública" (researcherColors key, 7 chars after "Salud ")
// "Pblica" = 50 62 6c 69 63 61 (6 bytes) → "Pública" = 50 75 62 6c 69 63 61 (7 bytes, insert 'u'=75 after 'P'=62)
let pos = buf.indexOf(Buffer.from('Salud P'));
while (pos !== -1) {
  const chunk = buf.slice(pos + 7, pos + 14);
  if (chunk.toString('utf8').startsWith('blica')) {
    buf = insertAt(buf, pos + 8, Buffer.from([0x75])); // insert 'u'
    changed++;
    break;
  }
  pos = buf.indexOf(Buffer.from('Salud P'), pos + 1);
}

// Fix 2: "tica en IA" tag → "Éctica en IA" or "Ética en IA"
// The tag starts with a corrupted byte before 'tica'  
// Strategy: find ' Models", "' followed by 'tica' and insert É (C3 89) before 'tica'
pos = buf.indexOf(Buffer.from(' Models", "'));
while (pos !== -1) {
  const after = buf.slice(pos + 13, pos + 40).toString('utf8');
  if (after.includes('tica en IA')) {
    // Find exact position of 'tica' 
    const tagStart = pos + 13;
    const ticaIdx = buf.slice(tagStart, tagStart + 50).indexOf(Buffer.from('tica en IA'));
    if (ticaIdx !== -1) {
      const actualPos = tagStart + ticaIdx;
      // Check if byte before 'tica' is 0x74 (t) - if so, it's corrupted
      if (actualPos > 0 && buf[actualPos - 1] === 0x74) {
        // Replace 'tica' (4 bytes starting at actualPos) with 'Ética' (6 bytes: C3 89 74 69 63 61)
        buf = replaceAt(buf, actualPos, 4, Buffer.from([0xC3, 0x89, 0x74, 0x69, 0x63, 0x61]));
        changed++;
        break;
      }
    }
  }
  pos = buf.indexOf(Buffer.from(' Models", "'), pos + 1);
}

// Fix 3: "NLP Multiling" + no "üe" → "NLP Multilingüe" in opportunity 4
pos = buf.indexOf(Buffer.from('NLP Multiling'));
while (pos !== -1) {
  const after = buf.slice(pos + 14, pos + 26).toString('utf8');
  if (!after.startsWith('üe') && after.startsWith('u')) {
    // Insert "üe" after 'g'
    buf = insertAt(buf, pos + 14 + 8, Buffer.from([0xC3, 0xBC, 0x65])); // ü + e
    changed++;
    break;
  }
  if (after.startsWith('üe')) { /* already correct */ break; }
  pos = buf.indexOf(Buffer.from('NLP Multiling'), pos + 1);
}

// Fix 4: "Computación Cuntica" → "Computación Cuántica" (tags in researcher 4)
// "Cuntica" = C3 75 6E 74 69 63 61 (C3 75 = u, but we need "Cu" + "ántica")
// Current: C3 75(nt)ica - actually it's "Cuntica" 
// "Cu" is C3 81? No wait, let me check what's there
pos = buf.indexOf(Buffer.from('Computaci'));
while (pos !== -1) {
  const after = buf.slice(pos, pos + 30).toString('utf8');
  if (after.includes('Cuntica')) {
    const cIdx = after.indexOf('Cuntica');
    const actualPos = pos + cIdx;
    // Replace "Cuntica" (7 bytes: C3 75 6E 74 69 63 61) with "Cuántica" (9 bytes: C3 81 75 61 6E 74 69 63 61)
    buf = replaceAt(buf, actualPos, 7, Buffer.from([0xC3, 0x81, 0x75, 0x61, 0x6E, 0x74, 0x69, 0x63, 0x61]));
    changed++;
    break;
  }
  pos = buf.indexOf(Buffer.from('Computaci'), pos + 1);
}

// Fix 5: "Simulacin" → "Simulación" in same researcher 4's tags  
pos = buf.indexOf(Buffer.from('Simulac'));
while (pos !== -1) {
  const after = buf.slice(pos, pos + 15).toString('utf8');
  if (after.startsWith('Simulacin')) {
    // "Simulacin" = 9 bytes, "Simulación" = 11 bytes (add 'i' accent after 'c')
    // s i m u l a c = 73 69 6D 75 6C 61 63, then 'i' (69) + 'ón' (C3 B3 6E)
    // Actually "Simulación" = "Simulaci" + "ón" = 9 + 3 = 12 bytes? 
    // "Simulación": S i m u l a c i C3 B3 6E = 73 69 6D 75 6C 61 63 69 C3 B3 6E = 11 bytes
    // "Simulacin": s i m u l a c i n = 9 bytes
    // Add: C3 B3 6E after 'n'
    const actualPos = pos + 9; // after 'Simulacin' (= "Simulaci" + "n")
    buf = insertAt(buf, actualPos, Buffer.from([0xC3, 0xB3, 0x6E]));
    changed++;
    break;
  }
  pos = buf.indexOf(Buffer.from('Simulac'), pos + 1);
}

// Fix 6: researcher 4 bio "Diseo algoritmos cun" → "Diseño algoritmos cuán" and "simulacin" → "simulación"
pos = buf.indexOf(Buffer.from('Diseo'));
while (pos !== -1) {
  // "Diseo" should be "Diseño" = D i s e C3 B3 6F = 6 bytes (instead of 5)
  buf = replaceAt(buf, pos + 4, 1, Buffer.from([0xC3, 0xB3]));
  changed++;
  pos = buf.indexOf(Buffer.from('Diseo'), pos + 1);
}

pos = buf.indexOf(Buffer.from('cun'));
while (pos !== -1) {
  const after = buf.slice(pos, pos + 12).toString('utf8');
  if (after.startsWith('cunticos') || after.startsWith('cunticos')) {
    // "cun" = 3 bytes, "cuán" = 4 bytes (C3 BA = ú)
    buf = replaceAt(buf, pos, 3, Buffer.from([0xC3, 0xBA]));
    changed++;
  }
  pos = buf.indexOf(Buffer.from('cun'), pos + 1);
}

pos = buf.indexOf(Buffer.from('simulacin'));
while (pos !== -1) {
  // "simulacin" = 10 bytes, "simulación" = 12 bytes
  // Insert C3 B3 6E after 'n'
  buf = replaceAt(buf, pos + 9, 0, Buffer.from([0xC3, 0xB3, 0x6E]));
  changed++;
  pos = buf.indexOf(Buffer.from('simulacin'), pos + 1);
}

// Fix 7: researcher 3 bio "anlisis de variantes genticas y edicin génica" 
// "anlisis" → "análisis" (add C3 A1 after 'n')
pos = buf.indexOf(Buffer.from('anlisis'));
while (pos !== -1) {
  buf = replaceAt(buf, pos + 2, 0, Buffer.from([0xC3, 0xA1])); // insert á after 'n'
  changed++;
  pos = buf.indexOf(Buffer.from('anlisis'), pos + 1);
}

pos = buf.indexOf(Buffer.from('genticas'));
while (pos !== -1) {
  buf = replaceAt(buf, pos + 6, 0, Buffer.from([0xC3, 0xA9])); // insert é after 'g' → "genéticas" 
  changed++;
  pos = buf.indexOf(Buffer.from('genticas'), pos + 1);
}

pos = buf.indexOf(Buffer.from('edicin'));
while (pos !== -1) {
  // "edicin" = 7 bytes, "edición" = 8 bytes (add C3 B3 after 'n')
  buf = replaceAt(buf, pos + 6, 0, Buffer.from([0xC3, 0xB3])); // insert ó
  changed++;
  pos = buf.indexOf(Buffer.from('edicin'), pos + 1);
}

// Fix 8: researcher 5 bio "epidemiolgicos" → "epidemiológicos"
pos = buf.indexOf(Buffer.from('epidemiolgicos'));
while (pos !== -1) {
  // "epidemiolgicos" = e p i d e m i o l g i c o s (13 bytes)
  // "epidemiológicos" = e p i d e m i o l C3 B3 g i c o s (14 bytes) - insert ó after 'l'
  buf = replaceAt(buf, pos + 10, 0, Buffer.from([0xC3, 0xB3])); // insert ó after 'l'
  changed++;
  pos = buf.indexOf(Buffer.from('epidemiolgicos'), pos + 1);
}

// Fix 9: researcher 6 bio "percepcin" → "percepción"
pos = buf.indexOf(Buffer.from('percepcin'));
while (pos !== -1) {
  // "percepcin" = p e r c e p c i n (9 bytes), "percepción" = p e r c e p C3 B3 63 69 6E (11 bytes)
  // Replace 'pcin' with 'pC3 B3 63 69 6E' = p + ó + c + i + n
  buf = replaceAt(buf, pos + 6, 3, Buffer.from([0xC3, 0xB3, 0x63, 0x69, 0x6E]));
  changed++;
  pos = buf.indexOf(Buffer.from('percepcin'), pos + 1);
}

// Fix 10: researcher 6 bio "auunomos" → "autónomos" 
pos = buf.indexOf(Buffer.from('auunomos'));
while (pos !== -1) {
  // "auunomos" = a u u n o m o s (8 bytes), "autónomos" = a u t C3 B3 n o m o s (10 bytes)
  // "auu" → "aut" (add 't'), then insert ó after 't'
  buf = replaceAt(buf, pos + 2, 1, Buffer.from([0x74, 0xC3, 0xB3])); // 't' + ó
  changed++;
  pos = buf.indexOf(Buffer.from('auunomos'), pos + 1);
}

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);

// Verify
const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
console.log('L15:', clines[14].slice(75, 220));
console.log('L16:', clines[15].slice(75, 220));
console.log('L17:', clines[16].slice(75, 220));
console.log('L18:', clines[17].slice(75, 220));
console.log('L19:', clines[18].slice(75, 220));
console.log('L20:', clines[19].slice(75, 220));
console.log('L26:', clines[25].slice(45, 110));
console.log('L65:', clines[64]);
console.log('Changed:', changed);