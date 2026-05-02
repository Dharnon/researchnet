const fs = require('fs');

const { readFileSync, writeFileSync } = require('fs');

let content = readFileSync('src/app/page.tsx', 'utf8').toString();
const changes = [];

// 1. Fix skeleton loader avatar — remove hardcoded gradient div, use skeleton-shimmer
const old1 = '<div style={{ width: 44, height: 44, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, rgba(201,148,90,0.12), rgba(201,148,90,0.04))", border: "1.5px solid var(--border)" }} />';
const new1 = '<div className="skeleton-shimmer" style={{ width: 44, height: 44, borderRadius: "50%" }} />';
if (content.includes(old1)) {
  content = content.replace(old1, new1);
  changes.push('skeleton-avatar: FIXED');
} else {
  changes.push('skeleton-avatar: NOT FOUND - may already be fixed');
}

// 2. Opportunity card hover: translateY(-3px) -> -2px
let count3 = (content.match(/translateY\(-3px\)/g) || []).length;
content = content.replace(/translateY\(-3px\)/g, 'translateY(-2px)');
changes.push(`opp-card-hover: ${count3} replacements`);

// 3. NetworkCard hover — upgrade borderColor-only hover to include refined box-shadow
// This variant-c uses accent-border amber color; add a subtle amber glow
const old3 = 'onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent-border)"; }}\n    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--card-border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}';
const new3 = 'onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent-border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 1px var(--accent-border), 0 4px 16px rgba(0,0,0,0.3)"; }}\n    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--card-border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}';
if (content.includes(old3)) {
  content = content.replace(old3, new3);
  changes.push('networkcard-shadow: FIXED');
} else {
  changes.push('networkcard-shadow: NOT FOUND');
}

console.log('Changes:', changes);

writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Done.');