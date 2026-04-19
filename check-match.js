const fs = require('fs');
const c = fs.readFileSync('src/app/page.tsx', 'utf8');
const lines = c.split('\n');
lines.forEach((l,i) => { if(l.includes('match') && l.includes('fontSize')) console.log(i+1, l.trim().substring(0,80)); });
