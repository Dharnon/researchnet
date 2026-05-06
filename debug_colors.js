const fs = require('fs');
const buf = fs.readFileSync('src/app/page.tsx');

// Find "Salud Púública" (double ú added by fix_salud) in researcherColors and fix it
// Also fix #ef4444 → #f59e0b and #6366f1 → #a78bfa

// First, find the "Salud Púública" in researcherColors area (around byte 6075)
// Search for "Salud P" + extra ú: 53616c75642050 c3ba c3ba 626c696361
const doubleU = Buffer.from('53616c75642050c3bac3ba626c696361', 'hex');
const singleU = Buffer.from('53616c75642050c3ba626c696361', 'hex');

const idxDouble = buf.indexOf(doubleU);
const idxSingle = buf.indexOf(singleU);
console.log('idxDouble (double ú):', idxDouble);
console.log('idxSingle (single ú):', idxSingle);

// Fix #ef4444 → #f59e0b (only in researcherColors, not all occurrences)
const ef4444 = Buffer.from('ef4444', 'hex');
let efIdx = buf.indexOf(ef4444);
console.log('ef4444 first idx:', efIdx);
efIdx = buf.indexOf(ef4444, efIdx + 1);
console.log('ef4444 second idx:', efIdx);

// Fix #6366f1 → #a78bfa
const f161 = Buffer.from('6366f1', 'hex');
let fIdx = buf.indexOf(f161);
console.log('6366f1 first idx:', fIdx);
fIdx = buf.indexOf(f161, fIdx + 1);
console.log('6366f1 second idx:', fIdx);

// Print context around each
if (efIdx >= 0) console.log('ef4444 context:', buf.slice(efIdx - 5, efIdx + 10).toString('utf8'));
if (fIdx >= 0) console.log('6366f1 context:', buf.slice(fIdx - 5, fIdx + 10).toString('utf8'));
