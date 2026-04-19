// fix-matchbadge.js
const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf8');

// The match badge span spans lines 348-353
const oldBlock = `<span style={{
              fontSize: 10, fontWeight: 700, color: "#D97706",
              background: "rgba(217,119,6,0.08)", padding: "2px 7px", borderRadius: 20, flexShrink: 0,
            }}>
              {researcher.match}%
            </span>`;

const newBlock = '<MatchBadge score={researcher.match} />';

if (content.includes(oldBlock)) {
  const newContent = content.split(oldBlock).join(newBlock);
  fs.writeFileSync('src/app/page.tsx', newContent, 'utf8');
  console.log('SUCCESS: MatchBadge replaced');
} else {
  console.log('Pattern not found - checking with JSON');
  const idx = content.indexOf('fontSize: 10, fontWeight: 700, color: "#D97706"');
  if (idx >= 0) {
    console.log('Found at:', idx);
    console.log('Context:', content.substring(idx-10, idx+200));
  } else {
    console.log('Not found at all');
  }
}
