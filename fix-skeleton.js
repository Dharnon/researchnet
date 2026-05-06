const fs = require('fs');
const path = 'src/app/globals.css';
let c = fs.readFileSync(path, 'utf8');

// Find the skeleton block using the animation property
const startMarker = 'SKELETON SHIMMER (variant-b-dark';
const endSearch = 'ONBOARDING ORCID BUTTON';

const startIdx = c.indexOf(startMarker);
const endIdx = c.indexOf(endSearch);

if (startIdx === -1) { console.log('start not found'); process.exit(1); }
if (endIdx === -1) { console.log('end not found'); process.exit(1); }

// Get block from 5 chars before start to end of block
const blockStart = startIdx - 5;
const blockEnd = endIdx;
const block = c.substring(blockStart, blockEnd);

console.log('Block start:', JSON.stringify(block.slice(0, 80)));
console.log('Block end:', JSON.stringify(block.slice(-60)));

// Replace variants
let newBlock = block
  .replace(/variant-b-dark: Near-black \+ Lime #84cc16/g, 'variant-c: Warm Editorial')
  .replace(/#18181b 25%, #27272a 50%, #1e1e23 75%/g, '#1c1917 25%, #292524 50%, #1c1917 75%')
  .replace(/#111114 25%, #18181b 50%, #111114 75%/g, '#161412 25%, #1c1917 50%, #161412 75%')
  .replace(/animation: shimmer 1\.4s infinite;/g, 'animation: shimmer 1.8s ease-in-out infinite;')
  .replace(/animation: shimmer 1\.6s infinite;/g, 'animation: shimmer 2.2s ease-in-out infinite;');

const newContent = c.substring(0, blockStart) + newBlock + c.substring(blockEnd);
fs.writeFileSync(path, newContent, 'utf8');
console.log('Done - written', newContent.length, 'chars');