const fs = require('fs');
let c = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');

// Fix: filter drop-shadow needs to be in a template literal inside style object
// Currently it's: filter: drop-shadow(0 0 6px ${researcher.color}30),
// Should be: filter: `drop-shadow(0 0 6px ${researcher.color}30)`,
// but since it's inside style={{}} we just need the value to be a JS expression
// The issue: inside style={{}}, "filter: drop-shadow(...)" is a property
// The template literal ${researcher.color}30 works if it's in backticks

const old = `          filter: drop-shadow(0 0 6px \${researcher.color}30),`;
const replacement = `          filter: \`drop-shadow(0 0 6px \${researcher.color}30)\`,`;

const idx = c.indexOf(old);
console.log('Found:', idx);
if (idx !== -1) {
  c = c.replace(old, replacement);
  fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', c);
  console.log('Fixed OK');
} else {
  console.log('NOT FOUND - searching...');
  const pos = c.indexOf('drop-shadow');
  console.log('drop-shadow at:', pos);
  console.log(JSON.stringify(c.slice(pos-30, pos+80)));
}