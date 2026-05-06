const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
const lines = c.split('\n');
console.log('Line 1088:', lines[1087]);
console.log('Line 1089:', lines[1088]);
console.log('Line 1090:', lines[1089]);