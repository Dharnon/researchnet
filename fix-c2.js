const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix 1: Wrap ResearcherCard in discover grid with card-enter + stagger
// Pattern: {filteredResearchers.map((r, i) => (\n                <ResearcherCard\n                  key={r.id}
// Replace with wrapper div
const rcardPattern = `{filteredResearchers.map((r, i) => (
                <ResearcherCard
                  key={r.id}`;
const rcardReplacement = `{filteredResearchers.map((r, i) => (
                <div key={r.id} className="card-enter" style={{ animationDelay: Math.min(i, 5) * 60 + 'ms' }}>
                  <ResearcherCard
                    key={r.id}`;
if (content.includes(rcardPattern)) {
  content = content.replace(rcardPattern, rcardReplacement);
  // Add closing </div> after the last prop of ResearcherCard
  content = content.replace(
    'isConnected={connectedIds.includes(r.id)}\n                />',
    'isConnected={connectedIds.includes(r.id)}\n                  />\n                </div>'
  );
  console.log('Fixed ResearcherCard wrapper');
} else {
  console.log('Pattern not found for ResearcherCard');
}

// Fix 2: Add card-enter to opportunity cards
const oppPattern = `              {opportunities.map((opp, i) => {
                <div
                  key={opp.id}
                  className="opp-card"
                  style={{ animationDelay: Math.min(i, 5) * 60 + 'ms' }}`;
if (!content.includes('opp-card card-enter')) {
  content = content.replace(
    'key={opp.id} className="opp-card"',
    'key={opp.id} className="opp-card card-enter"'
  );
  console.log('Fixed opp-card');
} else {
  console.log('opp-card already has card-enter');
}

// Fix 3: Add send-btn class to send button in MessagesView
content = content.replace(
  'onClick={onSendMessage}\n              style={{\n                width: 40, height: 40, borderRadius: "50%", border: "none",\n                background: "var(--accent)", color: "#000", cursor: "pointer",\n                transition: "all 0.15s", flexShrink: 0,\n              }}',
  'onClick={onSendMessage}\n              className="send-btn"'
);
console.log('Fixed send button');

fs.writeFileSync('src/app/page.tsx', content);
console.log('Done');