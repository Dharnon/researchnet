const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix the typo in researcherColors: "Salud P" followed by byte 255 followed by "lica"
let idx = c.indexOf('"Salud ');
let s = c.slice(idx, idx + 20);
console.log('Found:', JSON.stringify(s));
console.log('Bytes:', [...s].map(x => x.charCodeAt(0)));

// Check if it's the mojibake version
let hasHigh = [...s].some(x => x.charCodeAt(0) > 127);
console.log('Has high chars:', hasHigh);

// Find "Salud" followed by space, then look for a key that has the corrupted bytes
// In mojibake: ú is encoded as two bytes: 0xC3 0xBA
// "Salud P" + ú(2 bytes) + "lica"
let searchStr = 'Salud P' + '\u00FA' + 'lica';
let found = c.includes(searchStr);
console.log('Has correct string:', found);

// Try replacing: find the researcherColors block
let blockStart = c.indexOf('const researcherColors');
let blockEnd = c.indexOf('};', blockStart) + 2;
let block = c.slice(blockStart, blockEnd);

// Fix the "Salud P" + mojibake
let fixedBlock = block.replace(/Salud P[^"]+/g, 'Salud P\u00FAblica');
if (block !== fixedBlock) {
  let newC = c.slice(0, blockStart) + fixedBlock + c.slice(blockEnd);
  fs.writeFileSync('src/app/page.tsx', newC, 'utf8');
  console.log('Fixed!');
} else {
  console.log('No fix needed (or pattern not found)');
}