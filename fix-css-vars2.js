const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace ALL unquoted CSS var() with quoted versions
// Only matches var() NOT preceded by a quote
const before = content.length;
content = content.replace(/(?<!["\'])var\((--[^)]+)\)/g, '"var($1)"');
const after = content.length;

console.log(`Replaced ${(after - before)} chars. Checking remaining unquoted var()...`);

// Check remaining
const remaining = [...content.matchAll(/(?<=:\s*)var\((--[^)]+)\)/g)];
console.log(`${remaining.length} remaining unquoted var() in style contexts`);
if (remaining.length > 0) {
    console.log(remaining.slice(0, 3).map(m => m[0]));
}

fs.writeFileSync(file, content, 'utf8');
console.log('Done');
