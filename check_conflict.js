const fs = require('fs');

const file = 'C:/Users/josei/researchnet/src/app/globals.css';
let c = fs.readFileSync(file, 'utf8');
const lines = c.split('\n');

console.log('Total lines:', lines.length);
console.log('Line 547:', JSON.stringify(lines[547]));
console.log('Line 548:', JSON.stringify(lines[548]));
console.log('Line 549:', JSON.stringify(lines[549]));
console.log('Line 646:', JSON.stringify(lines[646]));
console.log('Line 647:', JSON.stringify(lines[647]));
console.log('Line 648:', JSON.stringify(lines[648]));