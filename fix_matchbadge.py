with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old = """// --- MATCH BADGE (variant-b: subtle dark - near-invisible metadata) -----
function MatchBadge({ score }: { score: number }) {
  const isHigh = score >= 90;
  const isMid  = score >= 70 && score < 90;
  const color  = isHigh ? "var(--match-high)" : isMid ? "var(--match-mid)" : "var(--match-low)";
  const bg     = isHigh ? "var(--match-high-bg)" : isMid ? "var(--match-mid-bg)" : "var(--match-low-bg)";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontSize: 10, fontWeight: 600,
      color, background: bg,
      padding: "1px 6px", borderRadius: 20,
      letterSpacing: "0.02em", flexShrink: 0,
      opacity: 0.70,
    }}>
      {score}%
    </span>
  );
}"""

new = """// --- MATCH BADGE (variant-b: subtle dark - refined metadata tier) -----
function MatchBadge({ score }: { score: number }) {
  const isHigh = score >= 90;
  const isMid  = score >= 70 && score < 90;
  const color  = isHigh ? "var(--match-high)" : isMid ? "var(--match-mid)" : "var(--match-low)";
  const bg     = isHigh ? "var(--match-high-bg)" : isMid ? "var(--match-mid-bg)" : "var(--match-low-bg)";
  const border = isHigh ? "var(--match-high-border)" : isMid ? "var(--match-mid-border)" : "var(--match-low-border)";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontSize: 10, fontWeight: 700,
      color, background: bg,
      border: `1px solid ${border}`,
      padding: "1px 6px", borderRadius: 20,
      letterSpacing: "0.02em", flexShrink: 0,
      boxShadow: isHigh ? `0 0 8px ${color}20` : "none",
    }}>
      {score}%
    </span>
  );
}"""

if old in content:
    print('FOUND')
    content = content.replace(old, new, 1)
    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('REPLACED')
else:
    print('NOT FOUND')
    idx = content.find('function MatchBadge')
    if idx >= 0:
        print(repr(content[idx:idx+800]))