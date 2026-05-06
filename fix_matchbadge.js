const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf8');
const lines = content.split('\n');

const matchStart = lines.findIndex(l => l.includes('MATCH BADGE'));
console.log('MatchBadge starts at line:', matchStart);

// Insert border variable after bg line (matchStart+5)
lines.splice(matchStart + 6, 0, '  const border = isHigh ? "var(--match-high-border)" : isMid ? "var(--match-mid-border)" : "var(--match-low-border)";');

// Replace the letterSpacing line (matchStart+12) to add border and boxShadow
// letterSpacing is at matchStart+12 (lines 144+12=156)
const letterSpacingIdx = matchStart + 12;
console.log('letterSpacing at:', letterSpacingIdx, JSON.stringify(lines[letterSpacingIdx]));
lines[letterSpacingIdx] = '      border: `1px solid ${border}`,';
lines.splice(letterSpacingIdx + 1, 0, '      boxShadow: isHigh ? `0 0 6px ${color}20` : "none",');

// Verify
console.log('\nResult:');
for (let i = matchStart; i <= matchStart + 22; i++) {
  console.log(i + ': ' + lines[i]);
}

const newContent = lines.join('\n');
fs.writeFileSync('src/app/page.tsx', newContent, 'utf8');
console.log('\nDone.');