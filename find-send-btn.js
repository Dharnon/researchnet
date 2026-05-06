const fs = require('fs');
let c = fs.readFileSync('src/app/globals.css', 'utf8');
const idx = c.indexOf('.send-btn');
if (idx >= 0) {
  console.log('Found .send-btn at', idx);
  console.log(JSON.stringify(c.substring(idx, idx + 600)));
} else {
  console.log('Not found, searching...');
  const patterns = ['send-btn', 'send_btn', 'sendBtn'];
  patterns.forEach(p => {
    const i = c.indexOf(p);
    if (i >= 0) console.log(p, 'at', i);
  });
}