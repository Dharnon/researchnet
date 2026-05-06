const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
const idx = c.indexOf('view === "opportunities"');
if (idx >= 0) {
  console.log('opp view at:', idx);
  console.log(c.substring(idx, idx + 1500));
} else {
  console.log('NOT FOUND');
}