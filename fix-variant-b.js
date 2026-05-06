const fs = require('fs');
let c = fs.readFileSync('src/app/globals.css', 'utf8');

const old = '.send-btn:disabled { opacity: 0.5; cursor: not-allowed; }';
const neu = '.send-btn:active { transform: scale(0.95); }\r\n.send-btn:disabled { opacity: 0.5; cursor: not-allowed; }';

if (c.includes(old)) {
  c = c.replace(old, neu);
  fs.writeFileSync('src/app/globals.css', c, 'utf8');
  console.log('Replaced OK');
} else {
  console.log('NOT FOUND');
  const idx = c.indexOf('.send-btn:disabled');
  if (idx >= 0) console.log(JSON.stringify(c.substring(idx - 10, idx + 80)));
}