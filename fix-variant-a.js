const fs = require('fs');
let c = fs.readFileSync('src/app/globals.css', 'utf8');

const oldBlock = `.skeleton-shimmer {
  background: linear-gradient(90deg, #f0f0ee 25%, #e6e6e4 50%, #f0f0ee 75%);
  background-size: 800px 100%;
  animation: shimmer 1.4s infinite;
}
.skeleton-shimmer-dim {
  background: linear-gradient(90deg, #f5f5f3 25%, #ededeb 50%, #f5f5f3 75%);
  background-size: 800px 100%;
  animation: shimmer 1.6s infinite;
}`;

const newBlock = `.skeleton-shimmer {
  background: linear-gradient(90deg, #f5f7f0 0%, #e8edda 35%, #f0f5e8 60%, #f5f7f0 100%);
  background-size: 1200px 100%;
  animation: shimmer 1.6s ease-in-out infinite;
}
.skeleton-shimmer-dim {
  background: linear-gradient(90deg, #fafaf6 0%, #f0f3e8 35%, #f5f8ee 60%, #fafaf6 100%);
  background-size: 1200px 100%;
  animation: shimmer 1.8s ease-in-out infinite;
}`;

if (c.includes(oldBlock)) {
  c = c.replace(oldBlock, newBlock);
  fs.writeFileSync('src/app/globals.css', c, 'utf8');
  console.log('Replaced OK');
} else {
  // Try with CRLF
  const oldBlockCrLf = oldBlock.replace(/\n/g, '\r\n');
  const newBlockCrLf = newBlock.replace(/\n/g, '\r\n');
  if (c.includes(oldBlockCrLf)) {
    c = c.replace(oldBlockCrLf, newBlockCrLf);
    fs.writeFileSync('src/app/globals.css', c, 'utf8');
    console.log('Replaced OK (CRLF)');
  } else {
    console.log('NOT FOUND - checking diff');
    const idx = c.indexOf('.skeleton-shimmer');
    console.log(JSON.stringify(c.substring(idx, idx + oldBlock.length + 100)));
  }
}