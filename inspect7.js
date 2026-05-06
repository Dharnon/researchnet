const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
const idx = c.indexOf('{item.icon}');
console.log('{item.icon} at:', idx);
console.log(JSON.stringify(c.substring(idx - 10, idx + 250)));
console.log('\n\n--- NavBar full return section ---');
const navStart = c.indexOf('return (');
const navSection = c.substring(navStart, navStart + 2000);
console.log(navSection);