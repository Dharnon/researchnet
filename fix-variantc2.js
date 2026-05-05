const fs = require('fs');
let c = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const lines = c.split('\n');

// Fix line 336 which has >> instead of >
const dupIdx = lines.findIndex((l, i) => l === '    >>');
if (dupIdx !== -1) {
  lines[dupIdx] = '    >';
  fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', lines.join('\n'));
  console.log('Fixed line', dupIdx+1);
}

// Verify
const c2 = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const lines2 = c2.split('\n');
const idx = lines2.findIndex(l => l.includes('className={hovered'));
console.log('className hover found at line:', idx+1);
console.log('Lines 333-340:', lines2.slice(332, 340).map((l,i)=>i+333+': '+JSON.stringify(l)));