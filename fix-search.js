const fs = require('fs');
let c = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');

// Fix the search input wrap — replace inline parent-manipulation with CSS class
const oldBlock = `<div className="search-wrap" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", flex: 1, minWidth: 200 }}>\r
              <Search size={13} color="var(--text-subtle)" />\r
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar por nombre, Área o departamento..." style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 13, flex: 1, width: "100%" }}\r
              onFocus={(e) => { const i = e.currentTarget as HTMLInputElement; i.parentElement!.style.borderColor = "var(--accent)"; i.parentElement!.style.boxShadow = "0 0 0 3px var(--accent-glow)"; }}\r
              onBlur={(e) => { const i = e.currentTarget as HTMLInputElement; i.parentElement!.style.borderColor = "var(--border)"; i.parentElement!.style.boxShadow = "none"; }}\r
              />\r
            </div>`;

const newBlock = `<div className="search-input-wrap">\r
              <Search size={13} color="var(--text-subtle)" />\r
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar por nombre, Área o departamento..." style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 13, flex: 1, width: "100%" }}\r
              />\r
            </div>`;

const idx = c.indexOf(oldBlock);
console.log('Found:', idx);
if (idx !== -1) {
  c = c.replace(oldBlock, newBlock);
  fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', c);
  console.log('Replaced OK');
} else {
  console.log('NOT FOUND');
  const pos = c.indexOf('search-wrap');
  console.log(JSON.stringify(c.slice(pos, pos+500)));
}