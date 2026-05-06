const fs = require('fs');
const buf = fs.readFileSync('src/app/page.tsx');

// Search for the hex pattern of Salud Publica with ú
// ú in UTF-8 is C3 BA
const search1 = Buffer.from('c3ba', 'hex');
const search2 = Buffer.from('Salud', 'utf8');

// Find all ú occurrences
let s = 0;
console.log('All c3ba (ú) occurrences in file:');
while (true) {
  const i = buf.indexOf(search1, s);
  if (i < 0) break;
  console.log('  byteIdx:', i, 'hex:', buf.slice(Math.max(0,i-10), i+10).toString('hex'));
  s = i + 1;
}
