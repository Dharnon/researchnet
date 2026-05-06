const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
const idx = c.indexOf('Warm top gradient');
if (idx >= 0) {
  console.log('ResearcherCard at:', idx);
  console.log(c.substring(idx, idx + 3000));
} else {
  // find ResearcherCard
  const idx2 = c.indexOf('function ResearcherCard');
  if (idx2 >= 0) console.log(c.substring(idx2, idx2 + 4000));
}