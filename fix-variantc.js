const fs = require('fs');

// === VARIANT-C: CSS class-based card hover ===

let css = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\globals.css', 'utf8');
const newCSS = `
/* -- RESEARCHER CARD variant-c: CSS class hover (amber warm) -- */
.researcher-card-c {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 22px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
  font-family: 'DM Sans', system-ui, sans-serif;
  box-shadow: 0 1px 3px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.03);
  transition: border-color 0.24s ease, box-shadow 0.24s ease, transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.researcher-card-c::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 80px;
  background: linear-gradient(180deg, var(--accent-faint) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.24s ease;
  pointer-events: none;
  border-radius: 16px 16px 0 0;
}
.researcher-card-c::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px; height: 100%;
  background: linear-gradient(180deg, var(--accent), var(--accent-hover));
  opacity: 0;
  transition: opacity 0.24s ease;
  border-radius: 16px 0 0 16px;
  pointer-events: none;
}
.researcher-card-c.is-hovered {
  border-color: var(--accent-border);
  box-shadow: 0 4px 16px rgba(0,0,0,0.35), 0 12px 40px rgba(0,0,0,0.20), 0 0 0 1px var(--accent-border), 0 0 20px var(--accent-glow);
  transform: translateY(-3px);
}
.researcher-card-c.is-hovered::before { opacity: 1; }
.researcher-card-c.is-hovered::after { opacity: 1; }
`;
if (!css.includes('.researcher-card-c')) {
  fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\globals.css', css + newCSS);
  console.log('CSS added');
} else {
  console.log('CSS already has .researcher-card-c');
}

// Fix page.tsx
let c = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const lines = c.split('\n');

// Find the div with className="card-accent" in ResearcherCard
// It's at line 335
const startIdx = c.indexOf('    <div\r\n      onClick={onSelect}\r');
const endIdx = c.indexOf('    >\r', c.indexOf('    <div\r\n      onClick={onSelect}\r')) + 4;

const oldBlock = c.substring(startIdx, endIdx);
console.log('Found block at:', startIdx, 'len:', oldBlock.length);
console.log('First 80:', JSON.stringify(oldBlock.slice(0, 80)));

const newBlock = `    <div\r
      onClick={onSelect}\r
      onMouseEnter={() => setHovered(true)}\r
      onMouseLeave={() => setHovered(false)}\r
      className={hovered ? "researcher-card-c is-hovered" : "researcher-card-c"}\r
    >`;

c = c.replace(oldBlock, newBlock);
fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', c);
console.log('Done, new file length:', c.length);

// Fix line that has stray > from replacement
const c2 = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const lines2 = c2.split('\n');
// Find the duplicate > line around where we expect
const dupIdx = lines2.findIndex((l, i) => l === '    >' && lines2[i+1] === '    >');
if (dupIdx !== -1) {
  console.log('Found duplicate > at line', dupIdx+1);
  lines2[dupIdx] = '    >'; // keep one, remove the duplicate
  // Actually lines2[dupIdx+1] should be removed
  const finalContent = lines2.join('\r\n').replace('    >\r\n    >', '    >');
  fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', finalContent);
  console.log('Duplicate fixed');
} else {
  console.log('No duplicate > found');
}

// Verify
const c3 = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const lines3 = c3.split('\n');
const idx = lines3.findIndex(l => l.includes('researcher-card-c'));
console.log('researcher-card-c found at line:', idx+1);
console.log('Lines around:', lines3.slice(idx-1, idx+4).map((l,i)=>i+idx+': '+l.trim()));