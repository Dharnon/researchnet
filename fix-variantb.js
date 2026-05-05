const fs = require('fs');
let c = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const lines = c.split('\n');

// Fix line 329 — currently ">    >" but should just be ">"
// The replacement left a stray > from the original block
// Line 329 is: "    >\r>\r"
lines[328] = '    >';  // fix line 329 (0-indexed: 328)
const newContent = lines.join('\n');
fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', newContent);
console.log('Fixed line 329');
// Verify
const c2 = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const lines2 = c2.split('\n');
console.log('Lines 326-332:', lines2.slice(325, 332).map((l, i) => i + 326 + ': ' + JSON.stringify(l)));