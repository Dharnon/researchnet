const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');
const before = content.length;

// Fix 1: Remove Playfair Display from h1 headings
content = content.replace(/<h1 style=\{\{ fontFamily: "'Playfair Display', Georgia, serif"/g,
  '<h1 style={{ fontFamily: "DM Sans, system-ui, sans-serif"');

// Fix 2: Remove Source Serif 4 from message bubbles
content = content.replace(/fontFamily: "'Source Serif 4', Georgia, serif"/g,
  'fontFamily: "inherit"');

// Fix 3: Remove Source Serif 4 from main div (color/text props)
content = content.replace(
  /fontFamily: "'Source Serif 4', Georgia, serif" \}/g,
  'fontFamily: "inherit" }'
);

console.log('Before:', before, 'After:', content.length, 'Removed:', before - content.length);
fs.writeFileSync('src/app/page.tsx', content);
console.log('Done');