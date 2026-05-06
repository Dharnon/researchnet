const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');

// Check for item.label in NavBar
const idx = c.indexOf('function NavBar');
const navBarSection = c.substring(idx, idx + 2500);
console.log('NavBar section length:', navBarSection.length);
// Check if label is in the button
if (navBarSection.includes('{item.label}')) {
  console.log('YES: item.label IS in NavBar');
} else {
  console.log('NO: item.label is NOT in NavBar - labels are missing!');
}
// Also check if we have hover state
if (navBarSection.includes('hoveredItem')) {
  console.log('YES: has hoveredItem state');
} else {
  console.log('NO: no hoveredItem state');
}
console.log('\n--- First 500 chars of NavBar return ---');
console.log(navBarSection.substring(navBarSection.indexOf('return ('), navBarSection.indexOf('return (') + 500));