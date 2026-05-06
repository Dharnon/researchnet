const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
// Get the exact nav bar section
const idx = c.indexOf('rgba(255,255,255,0.06)" : "transparent"');
if (idx >= 0) console.log(JSON.stringify(c.substring(idx - 200, idx + 300)));