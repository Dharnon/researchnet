const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
const idx = c.indexOf('network empty state');
if (idx >= 0) console.log(c.substring(idx, idx + 2000));

// Check profile quick action button
const idx2 = c.indexOf('quick-action-btn');
if (idx2 >= 0) console.log('\nquick-action-btn:', c.substring(idx2, idx2 + 300));