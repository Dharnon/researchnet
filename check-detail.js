const fs = require('fs');
const c = fs.readFileSync('src/app/page.tsx', 'utf8');
const lines = c.split('\n');
for(let i=200; i<225; i++) console.log(i+1, lines[i]);
