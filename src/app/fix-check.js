const fs = require('fs');
let c = fs.readFileSync('page.tsx', 'utf8');
const lines = c.split('\n');
const old = lines[372];
console.log('Old line:', JSON.stringify(old));
lines[372] = '          {isConnected ? "\u2713 Connected" : "Connect"}';
console.log('New line:', JSON.stringify(lines[372]));
fs.writeFileSync('page.tsx', lines.join('\n'), 'utf8');
console.log('Done');
