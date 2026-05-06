const fs = require('fs');
const buf = fs.readFileSync('src/app/page.tsx');

// Researcher colors map has "Salud Pblica" (missing ú)
// The correct hex for "Salud P\u00fablica" would be:
// Salud = 53616c7564 20 50
// \u00fa = c3 ba  
// blica = 62 6c 69 63 61
// ": " = 22 3a 20
// "#ef4444" = 22 23 65 66 34 34 34 34 22

// Let's look at bytes 6070-6110
console.log('Around researcherColors Salud:');
console.log('6070-6095 hex:', buf.slice(6070, 6095).toString('hex'));
console.log('6070-6095 chars:', buf.slice(6070, 6095).toString('utf8'));

// The key difference: byteIdx 2138-2139 is C3 BA (ú), byteIdx 6082 is 62 ('b')
// So at byteIdx 6082, we have 'b' but we need 'ú' before 'b'
// "Salud Pblica" → "Salud Pública"
// Current hex at 6075: 53616c75642050626c696361
// Desired hex:     53616c75642050c3ba626c696361

// We need to insert C3 BA at position 6082 (before the 'b' at 6082)
// And shift everything after

const newFile = Buffer.concat([
  buf.slice(0, 6082),
  Buffer.from([0xC3, 0xBA]),
  buf.slice(6082)
]);
fs.writeFileSync('src/app/page.tsx', newFile);
console.log('done - added ú before blic');
