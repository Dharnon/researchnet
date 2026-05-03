const fs = require('fs');

const file = 'C:/Users/josei/researchnet/src/app/page.tsx';
let c = fs.readFileSync(file, 'utf8');
const lines = c.split('\n');

// Conflict: lines 925-954 (0-based)
// Line 925: <<<<<<< HEAD
// Line 926: =======
// Lines 927-953: incoming changes (better)
// Line 954: >>>>>>> a906501...

// Keep: lines 0..924 (before <<<<<<<) + lines 955..end (after >>>>>>>)
// This keeps the incoming changes since the "after =======" section is better

const result = lines.slice(0, 925).join('\n') + '\n' + lines.slice(955).join('\n');

fs.writeFileSync(file, result);
console.log('done, new total lines:', result.split('\n').length);

if (result.includes('<<<<<<<')) {
  console.log('ERROR: conflicts remain');
  process.exit(1);
} else {
  console.log('Clean - no conflict markers');
}