const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');

console.log('Before researcherColors:', JSON.stringify(c.slice(c.indexOf('"Salud'), c.indexOf('"Salud') + 30)));

// Fix researcherColors map
c = c.replace('"Salud P\u00fablica": "#ef4444"', '"Salud P\u00fablica": "#f59e0b"');
c = c.replace('"Rob\u00f3tica e IA": "#6366f1"', '"Rob\u00f3tica e IA": "#a78bfa"');

console.log('After researcherColors:', JSON.stringify(c.slice(c.indexOf('"Salud'), c.indexOf('"Salud') + 30)));

fs.writeFileSync('src/app/page.tsx', c);
console.log('done');
