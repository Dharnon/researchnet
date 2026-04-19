const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf8');
const idx = content.indexOf('fontSize: 10, fontWeight: 700, color: "#D97706"');
if (idx < 0) { console.log('not found'); process.exit(1); }

// Show exact characters
const before = content.substring(idx - 10, idx + 200);
console.log('Content repr:', JSON.stringify(before));
