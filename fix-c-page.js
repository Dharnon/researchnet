const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add stagger to discover cards
content = content.replace(
  '{filteredResearchers.map((r) => (',
  '{filteredResearchers.map((r, i) => ('
);
content = content.replace(
  'key={r.id} className="researcher-card-c"',
  'key={r.id} className="researcher-card-c card-enter" style={{ animationDelay: Math.min(i, 5) * 60 + "ms" }}'
);

// Add stagger to opportunity cards
content = content.replace(
  '{opportunities.map((opp) => {',
  '{opportunities.map((opp, i) => {'
);
content = content.replace(
  'key={opp.id} className="opp-card"',
  'key={opp.id} className="opp-card card-enter" style={{ animationDelay: Math.min(i, 5) * 60 + "ms" }}'
);

// Add className to send button
content = content.replace(
  'onClick={onSendMessage}\n              style={{\n                width: 40, height: 40, borderRadius: "50%", border: "none",\n                background: "var(--accent)", color: "#000", cursor: "pointer",\n                transition: "all 0.15s", flexShrink: 0,\n              }}',
  'onClick={onSendMessage}\n              className="send-btn"'
);

// Wrap search input with search-input-wrap div
content = content.replace(
  '<div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10,\n              display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", flex: 1, minWidth: 200 }}>\n                <Search size={13} color="var(--text-subtle)" />\n                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar por nombre, Área o departamento..." style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 13, flex: 1, width: "100%" }} />\n              </div>',
  '<div className="search-input-wrap">\n                <Search size={13} color="var(--text-subtle)" />\n                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar por nombre, Área o departamento..." style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 13, flex: 1 }} />\n              </div>'
);

fs.writeFileSync('src/app/page.tsx', content);
console.log('Done');