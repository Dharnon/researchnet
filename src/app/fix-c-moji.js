const fs = require('fs');
const c = fs.readFileSync('page.tsx', 'utf8');

// Find remaining unusual chars (not basic ASCII/Latin)
const unusual = [];
for (const ch of c) {
  const code = ch.charCodeAt(0);
  if (code > 127 && !unusual.includes(ch)) {
    unusual.push(ch);
  }
}
console.log('All unusual chars:', JSON.stringify(unusual));

// The remaining â and € are in comments (box drawing chars in UTF-8 mojibake)
// Let's check specifically:
const lines = c.split('\n');
for (const line of lines) {
  if (line.includes('\u00e2\u20ac') || line.includes('\u00e2\u0080')) {
    console.log('Line with mojibake:', JSON.stringify(line.substring(0, 80)));
  }
}
