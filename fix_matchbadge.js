const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf8');
const lines = content.split('\n');

// Find match badge
const matchStart = lines.findIndex(l => l.includes('MATCH BADGE'));
console.log('MatchBadge at line:', matchStart);

// Insert border variable at line matchStart+6 (after bg line, before return)
lines.splice(matchStart + 6, 0, '  const border = isHigh ? "var(--match-high-border)" : isMid ? "var(--match-mid-border)" : "var(--match-low-border)";');
console.log('Inserted border const');

// Replace opacity line with border + boxShadow
// After splice: old line 169 (opacity) is now at 170
const opacityIdx = matchStart + 14; // original 169 - 156 + 1(splice) + 5 = 169+1+? = more direct
console.log('Line at matchStart+14:', JSON.stringify(lines[matchStart + 14]));
console.log('Line at matchStart+15:', JSON.stringify(lines[matchStart + 15]));
console.log('Line at matchStart+16:', JSON.stringify(lines[matchStart + 16]));

// Find it properly
let foundOpacity = false;
for (let i = matchStart; i < lines.length; i++) {
  if (lines[i].includes('opacity: 0.70')) {
    console.log('Found opacity at line:', i, JSON.stringify(lines[i]));
    lines[i] = '      border: `1px solid ${border}`,';
    lines.splice(i + 1, 0, '      boxShadow: isHigh ? `0 0 8px ${color}20` : "none",');
    foundOpacity = true;
    break;
  }
  if (i > matchStart + 20) break;
}

if (!foundOpacity) {
  console.log('ERROR: Could not find opacity line!');
  process.exit(1);
}

// Fix fontWeight 600 -> 700
for (let i = matchStart; i < matchStart + 20; i++) {
  if (lines[i].includes('fontSize: 10, fontWeight: 600')) {
    lines[i] = '      fontSize: 10, fontWeight: 700,';
    break;
  }
}

// Verify
console.log('\nFinal MatchBadge:');
for (let i = matchStart; i <= matchStart + 22; i++) {
  console.log(i + ': ' + lines[i]);
}

const newContent = lines.join('\n');
fs.writeFileSync('src/app/page.tsx', newContent, 'utf8');
console.log('\nWritten OK.');