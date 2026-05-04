const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');
let changed = 0;

// This file has multiple encoding problems. We need to:
// 1. Find the byte sequences that represent the corrupted strings
// 2. Replace them with correct bytes

// The corruption: "Colaboracin" has bytes that DON'T include C3 when displaying
// Let's check what bytes "Colaboracin" (without correct accented chars) actually are

// Strategy: search for the string with known correct bytes
// In the file, "Colaboracin" appears as 11 ASCII bytes: 43 6F 6C 61 62 6F 72 61 63 69 6E
// To fix to "Colaboración": 43 6F 6C 61 62 6F 72 61 C3 B3 63 69 6E = insert C3 B3 before byte 11 (n)

function findAll(buf, search) {
  let pos = 0;
  let results = [];
  while ((pos = buf.indexOf(search, pos)) !== -1) {
    results.push(pos);
    pos++;
  }
  return results;
}

// Fix 1: "Dr. Andrs Leal" - ASCII bytes for "Dr. Andrs Leal"
// A n d r s = 41 6E 64 72 73 -> needs é inserted = C3 A9
const andrsPos = buf.indexOf(Buffer.from('Dr. Andrs Leal'));
console.log('Andrs Leal pos:', andrsPos, 'bytes:', andrsPos >= 0 ? buf.slice(andrsPos, andrsPos+16).toString('hex') : 'N/A');
// "Andrs Leal" = 41 6E 64 72 73 20 4C 65 61 6C = 10 bytes
// "Andrés Leal" = 41 6E 64 72 C3 A9 73 20 4C 65 61 6C = 11 bytes

// Fix 2: "Salud Pblica" = 53 61 6C 75 64 20 50 62 6C 69 63 61 (12 bytes)
// "Salud Pública" = 53 61 6C 75 64 20 50 75 62 6C 69 63 61 (13 bytes)
// Insert 75 ('u') after 'P' (0x50 at pos+7)
const saludPPos = buf.indexOf(Buffer.from('Salud P'));
console.log('Salud P first pos:', saludPPos);
// Find the one in researcherColors (not researcher dept)
// The researcher dept is at position ~"dept: "Salud P"
// researcherColors is at ~"Salud Pblica": "#ef4444"
// Both start with same prefix, second one is after position 6000+
const saludP2 = buf.indexOf(Buffer.from('Salud P'), saludPPos + 100);
console.log('Salud P second pos:', saludP2);

// Fix 3: "Colaboracin" (ASCII only) -> needs C3 B3 inserted after "Colaboraci"
const colabPos = buf.indexOf(Buffer.from('Colaboracin'));
console.log('Colaboracin pos:', colabPos, 'hex:', colabPos >= 0 ? buf.slice(colabPos, colabPos+14).toString('hex') : 'N/A');

// Fix 4: "monitorizacin" 
const monPos = buf.indexOf(Buffer.from('monitorizacin'));
console.log('monitorizacin pos:', monPos, 'hex:', monPos >= 0 ? buf.slice(monPos, monPos+16).toString('hex') : 'N/A');

// Fix 5: "ms sobre" 
const msPos = buf.indexOf(Buffer.from('ms sobre'));
console.log('ms sobre pos:', msPos, 'hex:', msPos >= 0 ? buf.slice(msPos, msPos+10).toString('hex') : 'N/A');

// Fix 6: "ver ms"
const verMsPos = buf.indexOf(Buffer.from('ver ms'));
console.log('ver ms pos:', verMsPos);

// Fix 7: "seales"
const seanPos = buf.indexOf(Buffer.from('seales'));
console.log('seales pos:', seanPos, 'hex:', seanPos >= 0 ? buf.slice(seanPos, seanPos+10).toString('hex') : 'N/A');

// Fix 8: "Ingeniera"
const ingPos = buf.indexOf(Buffer.from('Ingeniera'));
console.log('Ingeniera pos:', ingPos, 'hex:', ingPos >= 0 ? buf.slice(ingPos, ingPos+12).toString('hex') : 'N/A');

// Fix 9: "Biomdica"
const biomPos = buf.indexOf(Buffer.from('Biomdica'));
console.log('Biomdica pos:', biomPos, 'hex:', biomPos >= 0 ? buf.slice(biomPos, biomPos+10).toString('hex') : 'N/A');

// Fix 10: "Computacin"
const compPos = buf.indexOf(Buffer.from('Computacin'));
console.log('Computacin pos:', compPos, 'hex:', compPos >= 0 ? buf.slice(compPos, compPos+12).toString('hex') : 'N/A');

// Fix 11: "queramos"
const querPos = buf.indexOf(Buffer.from('queramos'));
console.log('queramos pos:', querPos, 'hex:', querPos >= 0 ? buf.slice(querPos, querPos+10).toString('hex') : 'N/A');

// Fix 12: "posici" (in opportunity description, followed by \n)
const posiciPos = buf.indexOf(Buffer.from('posici\n'));
console.log('posici\\n pos:', posiciPos, 'hex:', posiciPos >= 0 ? buf.slice(posiciPos, posiciPos+10).toString('hex') : 'N/A');

// Fix 13: "anlisis" -> "análisis"
const analPos = buf.indexOf(Buffer.from('anlisis'));
console.log('anlisis pos:', analPos);

// Fix 14: "genticas" -> "genéticas"  
const genePos = buf.indexOf(Buffer.from('genticas'));
console.log('genticas pos:', genePos);

// Fix 15: "edicin" -> "edición"
const edicPos = buf.indexOf(Buffer.from('edicin'));
console.log('edicin pos:', edicPos);

// Fix 16: "Diseo" -> "Diseño" (insert ó after first 5 chars)
const disePos = buf.indexOf(Buffer.from('Diseo'));
console.log('Diseo pos:', disePos, 'hex:', disePos >= 0 ? buf.slice(disePos, disePos+7).toString('hex') : 'N/A');

// Fix 17: "cunticos" or "cun" in that context -> "cuánticos"
const cunPos = buf.indexOf(Buffer.from('cun'));
console.log('cun pos:', cunPos);

// Fix 18: "epidemiolgicos" -> "epidemiológicos"
const epiPos = buf.indexOf(Buffer.from('epidemiolgicos'));
console.log('epidemiolgicos pos:', epiPos);

// Fix 19: "percepcin" -> "percepción"
const percPos = buf.indexOf(Buffer.from('percepcin'));
console.log('percepcin pos:', percPos);

// Fix 20: "auunomos" -> "autónomos"
const auuPos = buf.indexOf(Buffer.from('auunomos'));
console.log('auunomos pos:', auuPos);