$f = [IO.File]::ReadAllText((Resolve-Path 'C:\Users\josei\researchnet\src\app\page.tsx').Path, [Text.Encoding]::UTF8)

# 1. Remove useState for hovered
$f = $f -replace '  const \[hovered, setHovered\] = useState\(false\);', '  '

# 2. Replace the outer div opening of ResearcherCard
$old = @'
    <div
      onClick={onSelect}
      className="card-accent researcher-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--card-bg)",
        border: `1px solid ${hovered ? "var(--accent-border)" : "var(--card-border)"}`,
        borderRadius: 16,
        padding: "20px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        boxShadow: hovered
          ? "0 6px 20px rgba(0,0,0,0.09), 0 2px 6px rgba(0,0,0,0.05), 0 0 0 1px var(--accent-border)"
          : "0 1px 2px rgba(0,0,0,0.04), 0 2px 12px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gradient shine */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 80,
        background: "linear-gradient(180deg, var(--accent-faint) 0%, transparent 100%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.22s ease",
        pointerEvents: "none",
        borderRadius: "16px 16px 0 0",
      }} />
      {/* Left accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: 3, height: "100%",
        background: "linear-gradient(180deg, var(--accent), var(--accent-hover))",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.22s ease",
        borderRadius: "16px 0 0 16px",
        pointerEvents: "none",
      }} />
'@

$new = @'
    <div
      onClick={onSelect}
      className="b-card"
      data-connected={isConnected}
    >
'@

$f = $f -replace [regex]::Escape($old), $new

# 3. Fix avatar filter to use CSS approach - remove hovered reference
$f = $f -replace 'filter: hovered \? `drop-shadow\(0 0 6px \$\{researcher\.color\}30\)` : "none"', 'filter: drop-shadow(0 0 6px ${researcher.color}30)'

# 4. Fix button to use b-connect-btn class + data-connected
$oldBtn = '        <button
          onClick={(e) => { e.stopPropagation(); onConnect(e); }}
          style={{
            padding: "6px 14px",
            borderRadius: 9,
            border: `1px solid ${isConnected ? "var(--connected-border)" : hovered ? "var(--accent-border)" : "var(--accent-faint)"}`,
            fontSize: 11, fontWeight: 700,
            cursor: "pointer",
            background: isConnected ? "var(--connected-bg)" : hovered ? "var(--accent)" : "transparent",
            color: isConnected ? "var(--connected-color)" : hovered ? "#000" : "var(--accent)",
            display: "flex", alignItems: "center", gap: 4,
            transition: "all 0.18s ease",
            letterSpacing: "0.01em",
            boxShadow: !isConnected && hovered ? "0 2px 10px var(--accent-glow)" : "none",
          }}
        >
          {isConnected ? <><Check size={12} /> Conectado</> : "Conectar"}
        </button>'

$newBtn = '        <button
          onClick={(e) => { e.stopPropagation(); onConnect(e); }}
          className={`b-connect-btn${isConnected ? " connected" : ""}`}
        >
          {isConnected ? <><Check size={12} /> Conectado</> : "Conectar"}
        </button>'

$f = $f -replace [regex]::Escape($oldBtn), $newBtn

# 5. Fix search input onFocus/onBlur - replace i.parentElement!.style manipulation with CSS class
$oldSearch = @'
              onFocus={(e) => { const i = e.currentTarget as HTMLInputElement; i.parentElement!.style.borderColor = "var(--accent)"; i.parentElement!.style.boxShadow = "0 0 0 3px var(--accent-glow)"; }}
              onBlur={(e) => { const i = e.currentTarget as HTMLInputElement; i.parentElement!.style.borderColor = "var(--border)"; i.parentElement!.style.boxShadow = "none"; }}
'@

$newSearch = @'
              className="search-input"
'@

$f = $f -replace [regex]::Escape($oldSearch), $newSearch

# 6. Also need to add class to the outer search wrapper div (find it by its style)
# The search input wrapper has: background: "var(--surface)", border: "1px solid var(--border)", ...
# Let me find it and add className="search-wrap"
$oldWrap = '<div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", flex: 1, minWidth: 200 }}>'
$newWrap = '<div className="search-wrap" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", flex: 1, minWidth: 200 }}>'
$f = $f -replace [regex]::Escape($oldWrap), $newWrap

[IO.File]::WriteAllText((Resolve-Path 'C:\Users\josei\researchnet\src\app\page.tsx').Path, $f, [Text.Encoding]::UTF8)
Write-Host "Done!"
