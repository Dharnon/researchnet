const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');

function insertAfter(buf, searchStr, targetOffset, insertBytes) {
  let pos = buf.indexOf(Buffer.from(searchStr, 'utf8'));
  if (pos === -1) return buf;
  const actualPos = pos + targetOffset;
  return Buffer.concat([buf.slice(0, actualPos), insertBytes, buf.slice(actualPos)]);
}
function replaceBytes(buf, searchStr, targetOffset, oldLen, insertBytes) {
  let pos = buf.indexOf(Buffer.from(searchStr, 'utf8'));
  if (pos === -1) return buf;
  const actualPos = pos + targetOffset;
  return Buffer.concat([buf.slice(0, actualPos), insertBytes, buf.slice(actualPos + oldLen)]);
}

// Fix "Salud Pblica" → "Salud Pública" (insert 'u' after 'b' = offset 9 from start of "Salud P")
buf = insertAfter(buf, 'Salud Pblica', 9, Buffer.from([0x75]));
buf = insertAfter(buf, 'Salud Pblica', 9, Buffer.from([0x75]));

// Fix "monitorizacin" → "monitorización" (insert í after 'c'=offset 11, before 'i')
buf = insertAfter(buf, 'monitorizacin', 11, Buffer.from([0xC3, 0xAD]));

// Fix "queramos" → "queríamos" (insert í before 'm'=offset 5)
buf = insertAfter(buf, 'queramos', 5, Buffer.from([0xC3, 0xAD]));

// Fix remaining: Dr. Andrs Leal, Colaboracin, ms sobre, anlisis, genticas, edicin, 
// Diseo, cunticos, epidemiolgicos, percepcin, auunomos
buf = insertAfter(buf, 'Dr. Andrs Leal', 8, Buffer.from([0xC3, 0xA9]));
buf = insertAfter(buf, 'Colaboracin', 10, Buffer.from([0xC3, 0xB3]));
buf = insertAfter(buf, 'ms sobre', 1, Buffer.from([0xC3, 0xA1]));
buf = insertAfter(buf, 'anlisis', 2, Buffer.from([0xC3, 0xA1]));
buf = insertAfter(buf, 'genticas', 3, Buffer.from([0xC3, 0xA9]));
buf = insertAfter(buf, 'edicin', 5, Buffer.from([0xC3, 0xB3]));
buf = replaceBytes(buf, 'Diseo', 5, 1, Buffer.from([0xC3, 0xB3]));
buf = insertAfter(buf, 'cunticos', 3, Buffer.from([0xC3, 0xA1]));
buf = insertAfter(buf, 'epidemiolgicos', 9, Buffer.from([0xC3, 0xB3]));
buf = replaceBytes(buf, 'percepcin', 6, 3, Buffer.from([0xC3, 0xB3, 0x63, 0x69, 0x6E]));
buf = replaceBytes(buf, 'auunomos', 1, 1, Buffer.from([0x74, 0xC3, 0xB3]));

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);

const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
console.log('L17 (Andrés):', clines[16].slice(0, 100));
console.log('L18 (Salud):', clines[17].slice(0, 100));
console.log('L25 (Colaboración):', clines[24].slice(0, 100));
console.log('L35 (monitoriz):', clines[34].slice(0, 120));
console.log('L34 (queramos):', clines[33].slice(0, 120));
console.log('L65 (researcherColors):', clines[64]);

const remaining = ['Andrs','Salud P','Colaboracin','monitorizacin','anlisis','genticas','edicin','Diseo ','cunticos','epidemiolgicos','percepcin','auunomos','queramos'];
const stillCorrupt = remaining.filter(c => check.includes(c));
if (stillCorrupt.length === 0) console.log('\nAll clean!');
else console.log('\nStill:', stillCorrupt);