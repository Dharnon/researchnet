const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');
// Check all hardcoded colors
const lines = c.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('color="#') || lines[i].includes('color="#3') || lines[i].includes('color="#ef4444')) {
    console.log('Line', i+1, ':', lines[i].trim());
  }
}
console.log('\n--- Skeleton check ---');
const idx = c.indexOf('function SkeletonLoader');
if (idx >= 0) console.log(c.substring(idx, idx + 1500));