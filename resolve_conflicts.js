const fs = require('fs');

const file = 'C:/Users/josei/researchnet/src/app/globals.css';
let c = fs.readFileSync(file, 'utf8');
const lines = c.split('\n');

console.log('Total lines:', lines.length);
// Line indices (0-based):
// 547: <<<<<<< HEAD
// 548: =======
// 649: >>>>>>> a906501...
// We want: lines[0..546] + lines[649..end] (skip lines 547-648)

const result = lines.slice(0, 547).join('\n') + '\n' + lines.slice(649).join('\n');

fs.writeFileSync(file, result);
const newLines = result.split('\n');
console.log('done, new total lines:', newLines.length);

if (result.includes('<<<<<<<')) {
  console.log('ERROR: conflicts remain');
  process.exit(1);
} else {
  console.log('Clean - no conflict markers');
}