const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/globals.css', 'utf8');
const lines = c.split('\n');
// Find all class definitions
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('.opp-card') || line.startsWith('.card-enter') || line.startsWith('.researcher-card') || line.startsWith('.network-card') || line.startsWith('.conv-item')) {
    console.log('Line', i+1, ':', line);
    if (line.endsWith('{')) {
      // Print next few lines
      for (let j = i+1; j < Math.min(i+10, lines.length); j++) {
        console.log(' ', j+1, ':', lines[j].trim());
      }
    }
  }
}
console.log('\nTotal lines:', lines.length);