// Buffer-based encoding fixer — handles multi-byte mojibake sequences
const fs = require('fs');
const path = process.argv[2] || 'src/app/page.tsx';

const buf = fs.readFileSync(path);
// Work on the bytes directly to handle multi-byte sequences
let i = 0;
let changed = false;

while (i < buf.length) {
  // Pattern: Ã— (Ã followed by —) -> ×
  // Ã in UTF-8 = C3 97, but double-encoded it shows as C3 C2 97
  // So C3 C2 80 3E = Ã— = ×  (C3 97 = × in UTF-8)
  // Actually C3 97 = ×. The sequence C3 C2 80 3E is: Ã (C3) + ¡ (C2 80) + >
  // Wait C2 80 = ¡ (inverted !), not part of ×. Let me reconsider.
  // × in UTF8 = C3 97. If text has Ã— (C3 97 in LATIN1 = Â×) then in double-encoded...
  // The byte sequence C3 97 already IS × in UTF-8. So this might not be the issue.
  // Let me check the actual bytes for the close button on variant-b
  i++;
}

console.log('Length:', buf.length, 'bytes');
console.log('Hex of first 100 bytes:', buf.slice(0,100).toString('hex'));