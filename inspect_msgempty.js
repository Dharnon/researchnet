const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
// Find Sin mensajes aún section
const idx = c.indexOf('Sin mensajes aún');
console.log(JSON.stringify(c.substring(idx - 400, idx + 600)));