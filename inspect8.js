const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');

// Find the line with {item.icon} and get the surrounding context
const lines = c.split('\n');
let foundLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('{item.icon}')) {
    foundLine = i;
    console.log('Found {item.icon} at line', i+1);
    for (let j = Math.max(0, i-2); j < Math.min(lines.length, i+15); j++) {
      console.log(`  ${j+1}: ${lines[j]}`);
    }
    break;
  }
}

// Also check if there's any item.label anywhere
let labelFound = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('item.label')) {
    console.log('item.label at line', i+1, ':', lines[i].trim());
    labelFound = true;
  }
}
if (!labelFound) console.log('NO item.label found in the entire file');