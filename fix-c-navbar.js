// Fix: Remove duplicate icon rendering in NavBar (variant-c)
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src', 'app', 'page.tsx');
let c = fs.readFileSync(p, 'utf8');

// Fix: Remove the duplicate {item.icon} that appears after <span>{item.label}</span>
const bad = `{item.icon}
          <span>{item.label}</span>
          {item.icon}`;

const good = `{item.icon}
          <span>{item.label}</span>`;

if (c.includes(bad)) {
  c = c.replace(bad, good);
  console.log('Fixed duplicate icon in NavBar');
} else {
  console.log('Pattern not found');
}

fs.writeFileSync(p, c, 'utf8');
console.log('Done');