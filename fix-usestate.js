const fs = require('fs');
let c = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');

// Find ResearcherCard and add useState after the function signature closing
// Looking for: isConnected: boolean;\r\n}) {\r\n  \r\n  return (
const old = `isConnected: boolean;\r\n}) {\r\n  \r\n  return (`;
const replacement = `isConnected: boolean;\r\n}) {\r\n  const [hovered, setHovered] = useState(false);\r\n  return (`;

const idx = c.indexOf(old);
console.log('Found:', idx);
if (idx !== -1) {
  c = c.replace(old, replacement);
  fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', c);
  console.log('Fixed OK');
} else {
  // Try without the whitespace
  const old2 = `isConnected: boolean;\r\n}) {\r\n  return (`;
  const idx2 = c.indexOf(old2);
  console.log('Without whitespace, found:', idx2);
  if (idx2 !== -1) {
    c = c.replace(old2, replacement);
    fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', c);
    console.log('Fixed OK (variant 2)');
  }
}