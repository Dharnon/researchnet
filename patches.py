# -*- coding: utf-8 -*-
import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    t = f.read()

# ── 1. Network empty state redesign ──────────────────────────────────────────
old_empty = '''connectedResearchers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 32px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16 }}>
              <div style={{ width: 72, height: 72, borderRadius: 20, background: t.surfaceHover, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="11" cy="18" r="5" stroke={t.textTertiary} strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
                  <circle cx="26" cy="9" r="4" stroke={t.textTertiary} strokeWidth="1.2" fill="none" strokeDasharray="3 2" opacity="0.5"/>
                  <circle cx="26" cy="27" r="4" stroke={t.textTertiary} strokeWidth="1.2" fill="none" strokeDasharray="3 2" opacity="0.5"/>
                  <path d="M15.5 16.5 L22.5 11" stroke={t.textTertiary} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.3"/>
                  <path d="M15.5 19.5 L22.5 25" stroke={t.textTertiary} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.3"/>
                </svg>
              </div>
              <p style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, marginBottom: 8 }}>Tu red est\u00e1 vac\u00eda</p>
              <p style={{ fontSize: 13, color: t.textSecondary, maxWidth: 280, margin: "0 auto 28px", lineHeight: 1.6 }}>Explora investigadores y con\u00e9ctate para construir tu red de colaboraci\u00f3n.</p>
              <button onClick={() => setView("discover")} style={{ padding: "10px 22px", borderRadius: 8, background: t.accent, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.01em" }}>Descubrir investigadores</button>
            </div>'''

new_empty = '''connectedResearchers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 32px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16 }}>
              <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Glowing ring backdrop */}
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, " + t.accent + "18 0%, transparent 70%)" }} />
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ position: "relative", zIndex: 1 }}>
                  {/* Outer dashed ring */}
                  <circle cx="36" cy="36" r="30" stroke={t.accent} strokeWidth="1" strokeDasharray="4 3" fill="none" opacity="0.2"/>
                  {/* Central node */}
                  <circle cx="36" cy="36" r="8" fill={t.surfaceHover} stroke={t.accent} strokeWidth="1.5"/>
                  <circle cx="36" cy="36" r="3.5" fill={t.accent} opacity="0.85"/>
                  {/* Satellite nodes */}
                  <circle cx="36" cy="12" r="4.5" fill={t.surfaceHover} stroke={t.border} strokeWidth="1.5"/>
                  <circle cx="36" cy="12" r="1.8" fill={t.accent} opacity="0.5"/>
                  <circle cx="56" cy="22" r="4" fill={t.surfaceHover} stroke={t.border} strokeWidth="1.2"/>
                  <circle cx="56" cy="22" r="1.5" fill={t.accent} opacity="0.35"/>
                  <circle cx="56" cy="50" r="4" fill={t.surfaceHover} stroke={t.border} strokeWidth="1.2"/>
                  <circle cx="56" cy="50" r="1.5" fill={t.accent} opacity="0.35"/>
                  <circle cx="36" cy="60" r="4.5" fill={t.surfaceHover} stroke={t.border} strokeWidth="1.5"/>
                  <circle cx="36" cy="60" r="1.8" fill={t.accent} opacity="0.5"/>
                  <circle cx="16" cy="50" r="4" fill={t.surfaceHover} stroke={t.border} strokeWidth="1.2"/>
                  <circle cx="16" cy="50" r="1.5" fill={t.accent} opacity="0.35"/>
                  <circle cx="16" cy="22" r="4" fill={t.surfaceHover} stroke={t.border} strokeWidth="1.2"/>
                  <circle cx="16" cy="22" r="1.5" fill={t.accent} opacity="0.35"/>
                  {/* Connection lines */}
                  <line x1="36" y1="28" x2="36" y2="16.5" stroke={t.accent} strokeWidth="1" strokeDasharray="3 2" opacity="0.55"/>
                  <line x1="43" y1="32" x2="52" y2="25" stroke={t.accent} strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
                  <line x1="43" y1="40" x2="52" y2="47" stroke={t.accent} strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
                  <line x1="36" y1="44" x2="36" y2="55.5" stroke={t.accent} strokeWidth="1" strokeDasharray="3 2" opacity="0.55"/>
                  <line x1="29" y1="40" x2="20" y2="47" stroke={t.accent} strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
                  <line x1="29" y1="32" x2="20" y2="25" stroke={t.accent} strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
                </svg>
              </div>
              <p style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, marginBottom: 8 }}>Tu red est\u00e1 vac\u00eda</p>
              <p style={{ fontSize: 13, color: t.textSecondary, maxWidth: 280, margin: "0 auto 28px", lineHeight: 1.6 }}>Explora investigadores y con\u00e9ctate para construir tu red de colaboraci\u00f3n.</p>
              <button
                onClick={() => setView("discover")}
                style={{ padding: "10px 22px", borderRadius: 8, background: t.accent, color: "#000", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.01em", transition: "box-shadow 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 20px " + t.accent + "55"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
              >Explorar investigadores</button>
            </div>'''

if old_empty in t:
    t = t.replace(old_empty, new_empty)
    print('Replaced empty state')
else:
    print('OLD EMPTY NOT FOUND')

# ── 2. Conversation list item upgrade ────────────────────────────────────────
old_conv = '''conversations.map((conv) => (
            <div key={conv.orcid} onClick={() => onSelectConversation(conv.orcid)} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "var(--card-bg)", border: "1px solid var(--card-border)",
              borderRadius: 14, padding: "14px 16px", cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${conv.color}30`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--card-border)"; }}
            >
              <Avatar initials={conv.avatar} color={conv.color} size={44} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{conv.name}</p>
                  <span style={{ fontSize: 10, color: "var(--text-tertiary)" }}>{conv.messages[conv.messages.length - 1].ts}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {conv.messages[conv.messages.length - 1].text}
                </p>
              </div>
              {conv.messages.filter((m) => m.from === "them").length > 0 && (
                <Circle size={8} style={{ color: "var(--accent)", flexShrink: 0 }} />
              )}
            </div>
          ))}'''

new_conv = '''conversations.map((conv) => {
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
          })}'''

if old_conv in t:
    t = t.replace(old_conv, new_conv)
    print('Replaced conversations.map')
else:
    print('OLD CONV NOT FOUND')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(t)
print('Done, length:', len(t))
