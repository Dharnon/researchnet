const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src', 'app', 'page.tsx');
let c = fs.readFileSync(p, 'utf8');

// Fix duplicate {item.icon} in NavBar (variant-c)
const search = `<span>{item.label}</span>
          {item.icon}
          {item.badge !== undefined && item.badge > 0 && (`;

const fix = `<span>{item.label}</span>
          {item.badge !== undefined && item.badge > 0 && (`;

if (c.includes(search)) {
  c = c.replace(search, fix);
  console.log('Fixed!');
} else {
  console.log('Pattern not found');
}

fs.writeFileSync(p, c, 'utf8');
console.log('Saved');