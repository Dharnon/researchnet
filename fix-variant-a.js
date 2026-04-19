// fix-variant-a.js — Replace hardcoded #84cc16 in detail panel with var(--accent)
const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf8');
let newContent = content;

// Fix typeColors: replace Fondos #84cc16 with var(--accent)
const oldTC = 'const typeColors: Record<string, string> = { Postdoc: "#60a5fa", Fondos: "#84cc16", Internacional: "#c084fc", Doctorado: "#f472b6", Laboral: "#34d399" };';
const newTC = 'const typeColors: Record<string, string> = { Postdoc: "#60a5fa", Fondos: "var(--accent)", Internacional: "#c084fc", Doctorado: "#f472b6", Laboral: "#34d399" };';
let tcCount = 0;
while (newContent.includes(oldTC)) {
  newContent = newContent.split(oldTC).join(newTC);
  tcCount++;
}
console.log(`typeColors fixed in ${tcCount} location(s)`);

// Fix DetailPanel match section - find it by searching for the specific block
// Match block: lines with hardcoded #84cc16 in the match score div
const dpMatchStart = newContent.indexOf('borderLeft: "3px solid #84cc16"');
if (dpMatchStart >= 0) {
  newContent = newContent.split('borderLeft: "3px solid #84cc16"').join('borderLeft: "3px solid var(--accent)"');
  console.log('borderLeft fixed');
}
const dpBgStart = newContent.indexOf('background: "#84cc160a"');
if (dpBgStart >= 0) {
  newContent = newContent.split('background: "#84cc160a"').join('background: "var(--accent-dim)"');
  console.log('background fixed');
}
const dpBorderStart = newContent.indexOf('border: "1px solid #84cc1620"');
if (dpBorderStart >= 0) {
  newContent = newContent.split('border: "1px solid #84cc1620"').join('border: "1px solid var(--accent-glow)"');
  console.log('border fixed');
}

// Fix match score text label
const oldLabel = 'color: "#84cc16", textTransform: "uppercase", letterSpacing: "0.08em"';
const newLabel = 'color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em"';
const labelIdx = newContent.indexOf(oldLabel);
if (labelIdx >= 0) {
  newContent = newContent.split(oldLabel).join(newLabel);
  console.log('label color fixed');
}

// Fix large match number
const oldMatchNum = '<span style={{ fontSize: 30, fontWeight: 900, color: "#84cc16", letterSpacing: "-0.05em", lineHeight: 1 }}>{researcher.match}</span>';
const newMatchNum = '<span style={{ fontSize: 30, fontWeight: 900, color: "var(--accent)", letterSpacing: "-0.05em", lineHeight: 1 }}>{researcher.match}</span>';
const matchNumIdx = newContent.indexOf(oldMatchNum);
if (matchNumIdx >= 0) {
  newContent = newContent.split(oldMatchNum).join(newMatchNum);
  console.log('Large match number fixed');
}

// Fix % after large match
const oldPct = '<span style={{ fontSize: 12, fontWeight: 600, color: "#84cc16", opacity: 0.6 }}>%</span>';
const newPct = '<span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", opacity: 0.6 }}>%</span>';
const pctIdx = newContent.indexOf(oldPct);
if (pctIdx >= 0) {
  newContent = newContent.split(oldPct).join(newPct);
  console.log('Match % fixed');
}

// Fix "affinity" subtitle
const oldAffinity = '<span style={{ fontSize: 10, color: "#84cc16", opacity: 0.5 }}>affinity based on shared areas</span>';
const newAffinity = '<span style={{ fontSize: 10, color: "var(--accent)", opacity: 0.5 }}>affinity based on shared areas</span>';
const affinityIdx = newContent.indexOf(oldAffinity);
if (affinityIdx >= 0) {
  newContent = newContent.split(oldAffinity).join(newAffinity);
  console.log('Affinity subtitle fixed');
}

fs.writeFileSync('src/app/page.tsx', newContent, 'utf8');
console.log('Done');
