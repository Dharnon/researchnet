const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');
// Find opp-card rendering block
const idx = c.indexOf('className="opp-card card-enter"');
if (idx >= 0) {
  console.log(JSON.stringify(c.substring(idx - 50, idx + 800)));
} else {
  // Try without card-enter
  const i = c.indexOf('"opp-card"');
  console.log('Without card-enter:', i >= 0 ? JSON.stringify(c.substring(i, i + 600)) : 'not found');
}