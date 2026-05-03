const fs = require('fs');

const file = 'C:/Users/josei/researchnet/src/app/page.tsx';
let c = fs.readFileSync(file, 'utf8');
const lines = c.split('\n');

console.log('Total lines:', lines.length);
console.log('Line 924:', JSON.stringify(lines[924]));
console.log('Line 925:', JSON.stringify(lines[925]));
console.log('Line 954:', JSON.stringify(lines[954]));
console.log('Line 955:', JSON.stringify(lines[955]));