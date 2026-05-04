const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');

function applyFix(buf, pos, insertBytes, replaceLen = 0) {
  if (replaceLen > 0) {
    return Buffer.concat([buf.slice(0, pos), insertBytes, buf.slice(pos + replaceLen)]);
  } else {
    return Buffer.concat([buf.slice(0, pos), insertBytes, buf.slice(pos)]);
  }
}

// Verify we have the original positions (check from scratch)
const search = (str) => { const p = buf.indexOf(Buffer.from(str, 'utf8')); console.log(str, '->', p, p >= 0 ? buf.slice(p, p+str.length).toString('hex') : ''); return p; };
search('Dr. Andrs Leal');
search('Salud P');
search('Colaboracin');
search('ms sobre');
search('queramos');
search('anlisis');
search('genticas');
search('edicin');
search('Diseo');
search('cun');
search('epidemiolgicos');
search('percepcin');
search('auunomos');