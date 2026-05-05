const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add stagger to discover cards
content = content.replace(
  '{filteredResearchers.map((r) => (',
  '{filteredResearchers.map((r, i) => ('
);
content = content.replace(
  'key={r.id} className="researcher-card-b"',
  'key={r.id} className="researcher-card-b card-enter" style={{ animationDelay: Math.min(i, 5) * 60 + "ms" }}'
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

// Add className to send button (remove hardcoded inline styles)
content = content.replace(
  'onClick={onSendMessage}\n              style={{\n                width: 40, height: 40, borderRadius: "50%", border: "none",\n                background: "var(--accent)", color: "#000", cursor: "pointer",\n                transition: "all 0.15s", flexShrink: 0,\n              }}',
  'onClick={onSendMessage}\n              className="send-btn"'
);

fs.writeFileSync('src/app/page.tsx', content);
console.log('Done');