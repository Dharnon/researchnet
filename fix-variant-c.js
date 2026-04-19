// fix-variant-c.js — Fix variant-c-warm: add MatchBadge + replace hardcoded colors
const fs = require('fs');

// Read as buffer to get exact bytes
const buf = fs.readFileSync('src/app/page.tsx');
const content = buf.toString('utf8');

// 1. Find DETAIL PANEL comment using byte search
// The comment "// â€€â€€â€€ DETAIL PANEL" is at byte offset 261+ (DATA comment is at 261)
const searchBytes = Buffer.from([
  0x2f, 0x2f, 0x20, 0xc3, 0xa2, 0xe2, 0x80, 0x9d, 0xe2, 0x82, 0xac,
  0xc3, 0xa2, 0xe2, 0x80, 0x9d, 0xe2, 0x82, 0xac,
  0xc3, 0xa2, 0xe2, 0x80, 0x9d, 0xe2, 0x82, 0xac,
  0x20
]);
const idx = buf.indexOf(searchBytes);
if (idx < 0) {
  console.log('DETAIL PANEL marker not found by bytes');
  // Fallback: search by string
  const fallbackIdx = content.indexOf('// \u00e2\u201d\u20ac\u00e2\u201d\u20ac\u00e2\u201d\u20ac DETAIL PANEL');
  if (fallbackIdx < 0) {
    console.log('Fallback also not found');
    process.exit(1);
  }
  console.log('Found via fallback at', fallbackIdx);
}

const matchBadgeFn = `
// ─── MATCH BADGE (warm: green ≥90, amber ≥70, gray <70) ─────────────────────
function MatchBadge({ score }: { score: number }) {
  const color = score >= 90 ? "#22c55e" : score >= 70 ? "#D97706" : "#9ca3af";
  const bg = score >= 90 ? "rgba(34,197,94,0.08)" : score >= 70 ? "rgba(217,119,6,0.08)" : "rgba(156,163,175,0.08)";
  const border = score >= 90 ? "rgba(34,197,94,0.18)" : score >= 70 ? "rgba(217,119,6,0.18)" : "rgba(156,163,175,0.18)";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      fontSize: 10, fontWeight: 700,
      color, background: bg, border: \`1px solid \${border}\`,
      padding: "2px 7px", borderRadius: 20,
      letterSpacing: "-0.01em", flexShrink: 0,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {score}%
    </span>
  );
}
`;

// Read as UTF-8 for text manipulation
let newContent = content;

// Find DETAIL PANEL position
const dpIdx = content.indexOf('// \u00e2\u201d\u20ac\u00e2\u201d\u20ac\u00e2\u201d\u20ac DETAIL PANEL');
if (dpIdx < 0) {
  console.log('Could not find DETAIL PANEL marker');
  process.exit(1);
}
console.log('DETAIL PANEL marker found at char offset:', dpIdx);

newContent = content.substring(0, dpIdx) + matchBadgeFn + content.substring(dpIdx);
console.log('MatchBadge function inserted');

// 2. Replace hardcoded match display in ResearcherCard with MatchBadge
// The card has: {researcher.match}% on its own line inside a span block
const oldMatchBlock = `            <span style={{
              fontSize: 10, fontWeight: 700, color: "#D97706",
              background: "rgba(217,119,6,0.08)", padding: "2px 7px", borderRadius: 20, flexShrink: 0,
            }}>
              {researcher.match}%
            </span>`;
const newMatchBlock = '            <MatchBadge score={researcher.match} />';
if (newContent.includes(oldMatchBlock)) {
  newContent = newContent.split(oldMatchBlock).join(newMatchBlock);
  console.log('Replaced ResearcherCard match span with MatchBadge');
} else {
  console.log('Match span multiline NOT found');
  // Try compact version
  const alt = oldMatchBlock.replace(/\r?\n\s*/g, ' ');
  if (newContent.includes(alt)) {
    newContent = newContent.split(alt).join(newMatchBlock);
    console.log('Replaced with compact version');
  }
}

// 3. Fix typeColors in OppDetailModal: Fondos #84cc16 -> var(--accent)
const oldTypeColors = 'const typeColors: Record<string, string> = { Postdoc: "#60a5fa", Fondos: "#84cc16", Internacional: "#c084fc", Doctorado: "#f472b6", Laboral: "#34d399" };';
const newTypeColors = 'const typeColors: Record<string, string> = { Postdoc: "#60a5fa", Fondos: "var(--accent)", Internacional: "#c084fc", Doctorado: "#f472b6", Laboral: "#34d399" };';
let count = 0;
while (newContent.includes(oldTypeColors)) {
  newContent = newContent.split(oldTypeColors).join(newTypeColors);
  count++;
}
if (count > 0) console.log(`Fixed typeColors in ${count} location(s)`);

fs.writeFileSync('src/app/page.tsx', newContent, 'utf8');
console.log('Done — written');
