const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');

console.log('Searching for Salud P');
let idx = c.indexOf('Salud P');
console.log('idx of Salud P:', idx);

let idx2 = c.indexOf('Salud');
console.log('idx of Salud:', idx2);

let idx3 = c.indexOf('Salud');
console.log('idx of Salud from 0:', idx3);

// Try byte-level search
const buf = fs.readFileSync('src/app/page.tsx');
const byteSearch = Buffer.from('Salud P', 'utf8');
const byteIdx = buf.indexOf(byteSearch);
console.log('byteIdx of Salud P:', byteIdx);

const SaludBytes = Buffer.from('Salud', 'utf8');
const SaludByteIdx = buf.indexOf(SaludBytes);
console.log('SaludByteIdx:', SaludByteIdx);
console.log(' Salud bytes:', JSON.stringify(buf.slice(SaludByteIdx, SaludByteIdx + 15)));
console.log('hex:', buf.slice(SaludByteIdx, SaludByteIdx + 15).toString('hex'));
