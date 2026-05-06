const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');
// Fix Salud Publica color (modernize to warm dark amber)
c = c.replace('"Salud P\u00FAblica": "#ef4444"', '"Salud P\u00FAblica": "#f59e0b"');
// Fix Robótica color (move away from harsh blue-purple)
c = c.replace('"Rob\u00F3tica e IA": "#6366f1"', '"Rob\u00F3tica e IA": "#a78bfa"');
fs.writeFileSync('src/app/page.tsx', c, 'utf8');
console.log('done');
let block = c.slice(c.indexOf('const researcherColors'), c.indexOf('const researcherColors') + 250);
console.log(block);