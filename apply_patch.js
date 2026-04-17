var fs = require('fs');
var t = fs.readFileSync('src/app/page.tsx', 'utf8');

// Read the saved exact sections
var emptySection = fs.readFileSync('empty_section.txt', 'utf8');
var convSection = fs.readFileSync('conv_section.txt', 'utf8');

// ── 1. Network empty state redesign ──────────────────────────────────────────
var newEmpty = `\
{connectedResearchers.length === 0 ? (
            <div className="empty-state">
              {/*
                Radial glow + sophisticated network SVG illustration
              */}
              <div className="empty-state-glow" />
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ display: "block", position: "relative", zIndex: 1 }}>
                {/* Outer dashed ring */}
                <circle cx="40" cy="40" r="34" stroke="#84cc16" strokeWidth="1" strokeDasharray="4 3" fill="none" opacity="0.18"/>
                {/* Central node */}
                <circle cx="40" cy="40" r="9" fill="#18181b" stroke="#84cc16" strokeWidth="1.5"/>
                <circle cx="40" cy="40" r="4" fill="#84cc16" opacity="0.85"/>
                {/* Satellite nodes */}
                <circle cx="40" cy="16" r="5" fill="#18181b" stroke="#27272a" strokeWidth="1.5"/>
                <circle cx="40" cy="16" r="2" fill="#84cc16" opacity="0.5"/>
                <circle cx="62" cy="27" r="4.5" fill="#18181b" stroke="#27272a" strokeWidth="1.2"/>
                <circle cx="62" cy="27" r="1.8" fill="#84cc16" opacity="0.35"/>
                <circle cx="62" cy="53" r="4.5" fill="#18181b" stroke="#27272a" strokeWidth="1.2"/>
                <circle cx="62" cy="53" r="1.8" fill="#84cc16" opacity="0.35"/>
                <circle cx="40" cy="64" r="5" fill="#18181b" stroke="#27272a" strokeWidth="1.5"/>
                <circle cx="40" cy="64" r="2" fill="#84cc16" opacity="0.5"/>
                <circle cx="18" cy="53" r="4.5" fill="#18181b" stroke="#27272a" strokeWidth="1.2"/>
                <circle cx="18" cy="53" r="1.8" fill="#84cc16" opacity="0.35"/>
                <circle cx="18" cy="27" r="4.5" fill="#18181b" stroke="#27272a" strokeWidth="1.2"/>
                <circle cx="18" cy="27" r="1.8" fill="#84cc16" opacity="0.35"/>
                {/* Connection lines */}
                <line x1="40" y1="31" x2="40" y2="21" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
                <line x1="48" y1="35" x2="58" y2="29" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
                <line x1="48" y1="45" x2="58" y2="51" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
                <line x1="40" y1="49" x2="40" y2="59" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
                <line x1="32" y1="45" x2="22" y2="51" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
                <line x1="32" y1="35" x2="22" y2="29" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
              </svg>
              <p className="empty-title">Tu red est\u00e1 vac\u00eda</p>
              <p className="empty-sub">Explora investigadores y con\u00e9ctate para construir tu red de colaboraci\u00f3n.</p>
              <button onClick={() => setView("discover")} className="empty-cta-btn">
                Explorar investigadores
              </button>
            </div>`;

if (t.includes(emptySection)) {
    t = t.replace(emptySection, newEmpty);
    console.log('Replaced empty state');
} else {
    console.log('EMPTY SECTION NOT FOUND');
}

// ── 2. Conversation list item upgrade ────────────────────────────────────────
var newConv = `\
conversations.map((conv) => {
            const lastMsg = conv.messages[conv.messages.length - 1];
            const hasUnread = conv.messages.some((m) => m.from === "them");
            return (
              <div key={conv.orcid} onClick={() => onSelectConversation(conv.orcid)} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "var(--card-bg)", border: "1px solid var(--card-border)",
                borderRadius: 14, padding: "14px 16px", cursor: "pointer",
                transition: "all 0.15s",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={(e) => { const r = e.currentTarget as HTMLDivElement; r.style.borderColor = conv.color + "30"; r.style.filter = "brightness(1.06)"; }}
              onMouseLeave={(e) => { const r = e.currentTarget as HTMLDivElement; r.style.borderColor = "var(--card-border)"; r.style.filter = "brightness(1)"; }}
              >
                {hasUnread && (
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: conv.color, borderRadius: "14px 0 0 14px" }} />
                )}
                <Avatar initials={conv.avatar} color={conv.color} size={44} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <p style={{ fontSize: 14, fontWeight: hasUnread ? 800 : 600, color: "var(--text-primary)" }}>{conv.name}</p>
                    <span style={{ fontSize: 10, color: "var(--text-tertiary)", fontWeight: 400, letterSpacing: "0.01em" }}>{lastMsg.ts}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {lastMsg.text}
                  </p>
                </div>
                {hasUnread && <Circle size={8} style={{ color: "var(--accent)", flexShrink: 0 }} />}
              </div>
            );
          })`;

if (t.includes(convSection)) {
    t = t.replace(convSection, newConv);
    console.log('Replaced conversations.map');
} else {
    console.log('CONV SECTION NOT FOUND');
}

fs.writeFileSync('src/app/page.tsx', t);
console.log('Done, length:', t.length);
