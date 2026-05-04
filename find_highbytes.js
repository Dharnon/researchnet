const fs = require('fs');
const buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');
let s = '';
for (let i = 0; i < buf.length; i++) {
  let b = buf[i];
  if (b >= 128 && b < 256) s += 'pos:' + i + ' byte:' + b.toString(16) + ' ';
}
console.log(s);