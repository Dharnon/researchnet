const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');
let changed = 0;

function replaceBytes(buf, search, replace) {
  let idx = buf.indexOf(search);
  if (idx === -1) return buf;
  const before = buf.slice(0, idx);
  const after = buf.slice(idx + search.length);
  changed++;
  return Buffer.concat([before, replace, after]);
}

// Fix "Salud Pblica" (6 bytes after "Salud ") → "Salud Pública" (8 bytes)
buf = replaceBytes(buf, Buffer.from('Salud P', 'utf8'), Buffer.from('Salud P', 'utf8'));
// Need to find the specific occurrence in researcherColors object
// "Salud Pblica" = S a l u d   P b l i c a
// We need "Salud Pública" = S a l u d   P u b l i c a  
// Pattern: find "Salud P" then check if followed by "blica"
let idx = 0;
while ((idx = buf.indexOf(Buffer.from('Salud P', 'utf8'), idx)) !== -1) {
  const afterP = buf.slice(idx + 7, idx + 14); // 7 = len("Salud P")
  const afterPStr = afterP.toString('utf8');
  if (afterPStr.startsWith('blica')) {
    // This is "Salud Pblica" - replace "b" with "bl"
    const before = buf.slice(0, idx + 8); // up to and including "b"
    const rest = buf.slice(idx + 9);       // after "b"
    buf = Buffer.concat([before, Buffer.from('l', 'utf8'), rest]);
    changed++;
    break;
  }
  idx += 7;
}

// Fix "olica en IA" tag → "ética en IA"  
// Current corrupt: starts with byte that makes "olica" (no E initial char)
// "ética" = C3 A9 74 69 63 61  (UTF-8: é t i c a)
// Current shows as "olica" - the 'E' got corrupted
// We need to find the tag array context: "Large Language Models", "....tica en IA"
// The corrupted form would be "....[corrupt]tica en IA"  
// Let's search for the pattern: comma followed by space, then the corrupt start
idx = 0;
while ((idx = buf.indexOf(Buffer.from(' Models", "'), idx)) !== -1) {
  const after = buf.slice(idx + 13, idx + 28).toString('utf8'); // 13 = len(' Models", "')
  if (after.includes('tica en IA')) {
    // Found it - the string is already "tica en IA" (missing the E/é)
    // Insert "É" before "tica"
    const before = buf.slice(0, idx + 13); // up to opening quote of tag
    const rest = buf.slice(idx + 13);
    buf = Buffer.concat([before, Buffer.from([0xC3, 0x89]), rest]); // É = C3 89
    changed++;
    break;
  }
  idx += 13;
}

// Fix "multiling" → "multilingüe" (in opportunity title "NLP Multilingüe")
// "multilingüe" = m u l t i l i n g C3 BC 65  (ü = C3 BC, e = 65)
// Current shows "multiling" - missing the last part
idx = 0;
while ((idx = buf.indexOf(Buffer.from('NLP Multiling', 'utf8'), idx)) !== -1) {
  const after = buf.slice(idx + 14, idx + 26).toString('utf8'); // 14 = len('NLP Multiling')
  if (after.startsWith('ue')) {
    // Already correct
    idx += 14;
    continue;
  }
  if (after.length < 2 || after[0] !== 'u' || after[1] !== 'e') {
    // Corrupt - insert "üe" 
    const before = buf.slice(0, idx + 14 + 8); // up to and including 'g' of 'ling'
    const rest = buf.slice(idx + 14 + 8);
    buf = Buffer.concat([before, Buffer.from([0xC3, 0xBC, 0x65]), rest]); // ü + e
    changed++;
    break;
  }
  idx += 14;
}

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);

// Verify
const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
console.log('L15:', clines[14].slice(75, 215));
console.log('L17:', clines[16].slice(75, 215));
console.log('L26:', clines[25].slice(50, 100));
console.log('L65:', clines[64]);
console.log('Changed:', changed);