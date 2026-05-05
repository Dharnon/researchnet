const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// CRLF aware: find isConnected line and insert </div> after the /> that follows
const idx = content.indexOf('isConnected={connectedIds.includes(r.id)}');
if (idx === -1) { console.log('Not found'); process.exit(0); }

// Find the /> that comes after this line (within ~100 chars)
const slice = content.slice(idx, idx + 200);
const closeIdx = slice.indexOf('/>');
const absCloseIdx = idx + closeIdx;

// Insert </div>\n              after the />
const before = content.slice(0, absCloseIdx + 2);
const after = content.slice(absCloseIdx + 2);
content = before + '\n                </div>' + after;

fs.writeFileSync('src/app/page.tsx', content);
console.log('Done, inserted at', absCloseIdx);

// Verify
const c2 = fs.readFileSync('src/app/page.tsx', 'utf8');
const verify = c2.indexOf('</div>\n                ))}');
console.log('Verify found at:', verify);