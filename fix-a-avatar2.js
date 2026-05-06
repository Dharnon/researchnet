const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix 1: "bbackground" -> "background"
c = c.replace('bbackground: `linear-gradient', 'background: `linear-gradient');

// Fix 2: "border:`" orphan line
c = c.replace("        border:`,\r\n        border:", "        border:");

fs.writeFileSync('src/app/page.tsx', c, 'utf8');

// Verify
const idx = c.indexOf('function Avatar');
console.log(c.substring(idx, idx + 600));