// Fix: Add missing quotes around CSS var() values in JSX inline styles
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(file, 'utf8');

// Find all JSX style={{ ... }} blocks and fix unquoted var() values
// Strategy: in style objects, ALL var() values must be strings
// We do targeted replacements for common patterns

// Fix 1: background: var(X) -> background: "var(X)"
content = content.replace(/background:\s*var\((--[^,\s\}]+)\)/g, 'background: "var($1)"');

// Fix 2: color: var(X) -> color: "var(X)"
content = content.replace(/color:\s*var\((--[^,\s\}]+)\)/g, 'color: "var($1)"');

// Fix 3: borderColor: var(X) -> borderColor: "var(X)"
content = content.replace(/borderColor:\s*var\((--[^,\s\}]+)\)/g, 'borderColor: "var($1)"');

// Fix 4: border: var(X) -> border: "var(X)"
content = content.replace(/border:\s*var\((--[^,\s\}]+)\)/g, 'border: "var($1)"');

// Fix 5: any CSS property followed by bare var()
content = content.replace(/:\s*var\((--[^,\s\}]+)\)([,}])/g, ': "var($1)"$2');

// Fix 6: var(X) followed by comma or }} without closing quote
content = content.replace(/var\((--[^"]+?)\)([,}])/g, '"var($1)"$2');

// Fix 7: maxWidth/width/height as bare numbers in style objects (ok as-is)
// But some might need string form: maxWidth: 1200 -> maxWidth: "1200" (also valid in JSX)

// Fix 8: specific broken patterns from the script run
content = content.replace(/background: var\(--bg\),/g, 'background: "var(--bg)",');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed. Checking for remaining bare var()...');

// Count remaining unquoted var() in style contexts
const remaining = content.match(/(?<=:\s*)var\((--[^)]+)\)/g);
if (remaining) {
    console.log('Still unquoted:', remaining.length, 'occurrences');
    console.log(remaining.slice(0, 5));
} else {
    console.log('All CSS vars properly quoted!');
}
