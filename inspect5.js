const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
const idx = c.indexOf('label: "Discover"');
if (idx >= 0) {
  console.log('Found at:', idx);
  console.log(JSON.stringify(c.substring(idx - 100, idx + 2500)));
} else {
  console.log('NOT FOUND');
  // search for NavBar items
  const idx2 = c.indexOf('key: "discover"');
  if (idx2 >= 0) console.log('key discover at:', idx2, JSON.stringify(c.substring(idx2 - 50, idx2 + 100)));
}