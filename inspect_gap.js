const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
// Check gap in opp grid
const idx = c.indexOf('repeat(auto-fill, minmax(280px, 1fr))');
console.log('opp grid gap:', JSON.stringify(c.substring(idx - 50, idx + 150)));
// Check profile view
const idx2 = c.indexOf('quick-action-btn');
if (idx2 >= 0) console.log('\nprofile actions:', JSON.stringify(c.substring(idx2 - 100, idx2 + 300)));