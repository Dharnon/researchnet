$f = Get-Content 'C:\Users\josei\researchnet\src\app\page.tsx' -Raw

# 1. Discover heading - serif for h1
$f = $f -replace 'fontSize: 24, fontWeight: 700, color: t\.textPrimary, letterSpacing: "-0\.04em", marginBottom: 4 \}>Descubrir',
                 'fontSize: 26, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.04em", marginBottom: 4, fontFamily: "var(--font-playfair)" }>Descubrir'

# 2. Opportunities heading - serif
$f = $f -replace '<h1 style=\{{ fontSize: 24, fontWeight: 700, color: t\.textPrimary, letterSpacing: "-0\.04em", marginBottom: 4 \}>Oportunidades',
                 '<h1 style={{ fontSize: 26, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.04em", marginBottom: 4, fontFamily: "var(--font-playfair)" }}>Oportunidades'

# 3. Network heading - serif
$f = $f -replace '<h1 style=\{{ fontSize: 24, fontWeight: 700, color: t\.textPrimary, letterSpacing: "-0\.04em", marginBottom: 4 \}>Tu red',
                 '<h1 style={{ fontSize: 26, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.04em", marginBottom: 4, fontFamily: "var(--font-playfair)" }}>Tu red'

# 4. Profile heading - serif
$f = $f -replace '<h1 style=\{{ fontSize: 24, fontWeight: 700, color: t\.textPrimary, letterSpacing: "-0\.04em", marginBottom: 4 \}>Tu perfil',
                 '<h1 style={{ fontSize: 26, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.04em", marginBottom: 4, fontFamily: "var(--font-playfair)" }}>Tu perfil'

# 5. Detail panel name - serif
$f = $f -replace '<h2 style=\{{ fontSize: 18, fontWeight: 700, color: t\.textPrimary, letterSpacing: "-0\.02em", marginBottom: 2 \}>\{researcher\.name\}',
                 '<h2 style={{ fontSize: 18, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.02em", marginBottom: 2, fontFamily: "var(--font-playfair)" }}>{researcher.name}'

# 6. Opportunity card title - serif
$f = $f -replace '<h3 style=\{{ fontSize: 14, fontWeight: 600, color: t\.textPrimary, lineHeight: 1\.4 \}>\{opp\.title\}',
                 '<h3 style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, lineHeight: 1.4, fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>{opp.title}'

# 7. Nav bar active indicator - amber accent only on active tab
# Already uses accent color, no change needed

# 8. Opportunity cards warm cream bg
$f = $f -replace 'background: t\.surface, border: `1px solid \$\{t\.border\}`, borderRadius: 14, padding: 20, cursor: "pointer", display: "flex", flexDirection: "column", gap: 10',
                 'background: "#fefcf9", border: `1px solid #e8dcc8`, borderRadius: 14, padding: 20, cursor: "pointer", display: "flex", flexDirection: "column", gap: 10'

# 9. Opp hover change
$f = $f -replace 'el\.style\.borderColor = t\.accent \+ "35"; el\.style\.boxShadow = t\.shadowHover; ',
                 'el.style.borderColor = "#c8a96e" + "55"; el.style.boxShadow = "0 8px 32px rgba(139,105,20,0.12), 0 0 0 1px rgba(139,105,20,0.10)"; '

# 10. Remove orange deadline from opp cards in favor of warm amber
$f = $f -replace '<span style=\{{ fontSize: 12, color: "#ea580c", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 \}}><Clock',
                 '<span style={{ fontSize: 12, color: "#92400e", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Clock'

# 11. Empty network state SVG - editorial academic style
$f = $f -replace '<svg width="36" height="36" viewBox="0 0 36 36" fill="none">\s*<circle cx="11" cy="18" r="5" stroke=\{t\.textTertiary\} strokeWidth="1\.5" fill="none" strokeDasharray="3 2"/>\s*<circle cx="26" cy="9" r="4" stroke=\{t\.textTertiary\} strokeWidth="1\.2" fill="none" strokeDasharray="3 2" opacity="0\.5"/>\s*<circle cx="26" cy="27" r="4" stroke=\{t\.textTertiary\} strokeWidth="1\.2" fill="none" strokeDasharray="3 2" opacity="0\.5"/>\s*<path d="M15\.5 16\.5 L22\.5 11" stroke=\{t\.textTertiary\} strokeWidth="1\.2" strokeDasharray="3 2" opacity="0\.3"/>\s*<path d="M15\.5 19\.5 L22\.5 25" stroke=\{t\.textTertiary\} strokeWidth="1\.2" strokeDasharray="3 2" opacity="0\.3"/>\s*</svg>',
                 '<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="12" r="5" stroke="#b8956e" strokeWidth="1.2" fill="none" strokeDasharray="4 2.5"/><circle cx="9" cy="26" r="4" stroke="#b8956e" strokeWidth="1" fill="none" strokeDasharray="4 2.5" opacity="0.6"/><circle cx="27" cy="26" r="4" stroke="#b8956e" strokeWidth="1" fill="none" strokeDasharray="4 2.5" opacity="0.6"/><path d="M13.5 14.5 L23.5 23" stroke="#b8956e" strokeWidth="1" strokeDasharray="4 2.5" opacity="0.4"/><path d="M22.5 14.5 L12.5 23" stroke="#b8956e" strokeWidth="1" strokeDasharray="4 2.5" opacity="0.4"/></svg>'

# 12. "Tu red está vacía" text
$f = $f -replace '<p style=\{{ fontSize: 16, fontWeight: 600, color: t\.textPrimary, marginBottom: 8 \}>Tu red está vacía</p>',
                 '<p style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, marginBottom: 8, fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>Tu red está vacía</p>'

[System.IO.File]::WriteAllText('C:\Users\josei\researchnet\src\app\page.tsx', $f, [System.Text.Encoding]::UTF8)
Write-Output "Done"