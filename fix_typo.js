const fs = require('fs');
let c = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');

const OLD = 'className="style={{ fontFamily:';
const repl = 'style={{ fontFamily:';
if (c.includes(OLD)) {
  c = c.split(OLD).join(repl);
  console.log('Fixed className= typo');
} else {
  console.log('Not found:', JSON.stringify(OLD));
}

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', c, 'utf8');