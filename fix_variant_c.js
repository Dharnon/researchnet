const fs = require('fs');
const path = 'C:/Users/josei/researchnet/src/app/globals.css';
let buf = fs.readFileSync(path);

// Fix 1: .vc-card:hover border-color
const t1 = Buffer.from('.vc-card:hover {\r\n  box-shadow: 0 8px 28px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px var(--accent-border);\r\n  border-color: rgba(201,148,90,0.40);\r\n  transform: translateY(-2px);\r\n}');
const r1 = Buffer.from('.vc-card:hover {\r\n  box-shadow: var(--shadow-card-hover);\r\n  border-color: var(--accent-border);\r\n  transform: translateY(-2px);\r\n}');
const p1 = buf.indexOf(t1);
let off = 0;
if (p1 >= 0) {
  buf = Buffer.concat([buf.slice(0, p1), r1, buf.slice(p1 + t1.length)]);
  off = r1.length - t1.length;  // should be -102
  console.log('1. OK .vc-card:hover, off =', off);
  console.log('   Original pos1:', p1, '-> new pos after fix1:', p1);
  console.log('   Original .researcher-card:hover pos (13588) -> after fix1:', 13588 + off);
  console.log('   Verifying in buffer (p1+off):', buf.indexOf(Buffer.from('.researcher-card:hover {')));
} else { console.log('1. FAIL'); process.exit(1); }

// Fix 2: .researcher-card:hover border + scale
const t2 = Buffer.from('.researcher-card:hover {\r\n  box-shadow: var(--shadow-card-hover);\r\n  border-color: rgba(201, 148, 90, 0.28);\r\n  transform: translateY(-2px) scale(1.005);\r\n}');
const r2 = Buffer.from('.researcher-card:hover {\r\n  box-shadow: var(--shadow-card-hover);\r\n  border-color: var(--accent-border);\r\n  transform: translateY(-2px);\r\n}');
// Search in new buffer
let p2 = buf.indexOf(t2);
console.log('2. .researcher-card:hover pos in new buffer:', p2, '(expected', 13588 + off, ')');
if (p2 >= 0) {
  buf = Buffer.concat([buf.slice(0, p2), r2, buf.slice(p2 + t2.length)]);
  console.log('2. OK .researcher-card:hover replaced at', p2);
} else { console.log('2. FAIL — searching for partial...'); }

fs.writeFileSync(path, buf);

// Final verify
const c = fs.readFileSync(path, 'utf8');
console.log('\nFinal verify .researcher-card area:');
const idx = c.indexOf('.researcher-card:hover');
if (idx >= 0) {
  const lineNum = c.slice(0, idx).split('\n').length;
  const lines = c.split('\n');
  console.log('At line', lineNum + ':');
  lines.slice(Math.max(0, lineNum - 1), lineNum + 6).forEach((l, i) => console.log(Math.max(0, lineNum - 1) + i + ':', l));
}
console.log('\nNew length:', buf.length);