const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf8');

// The actual block uses CRLF and 12-space indentation before <span
const oldBlock = '            <span style={{\r\n              fontSize: 10, fontWeight: 700, color: "#D97706",\r\n              background: "rgba(217,119,6,0.08)", padding: "2px 7px", borderRadius: 20, flexShrink: 0,\r\n            }}>\r\n              {researcher.match}%\r\n            </span>';
const newBlock = '            <MatchBadge score={researcher.match} />';

if (content.includes(oldBlock)) {
  const newContent = content.split(oldBlock).join(newBlock);
  fs.writeFileSync('src/app/page.tsx', newContent, 'utf8');
  console.log('SUCCESS: MatchBadge replaced in ResearcherCard');
} else {
  console.log('Pattern not found');
  // Show hex of what we're looking for vs what's there
  const searchBytes = Buffer.from(oldBlock, 'utf8');
  const fileBytes = Buffer.from(content, 'utf8');
  const idx = fileBytes.indexOf(searchBytes);
  console.log('Direct byte search found:', idx >= 0);
}
