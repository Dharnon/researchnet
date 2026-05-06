const fs = require('fs');
let c = fs.readFileSync('src/app/globals.css', 'utf8');
let idx = c.indexOf('[data-theme=');
while (idx > -1) {
  console.log(idx, JSON.stringify(c.slice(idx, idx + 80)));
  idx = c.indexOf('[data-theme=', idx + 1);
  if (idx > 10000) break;
}
