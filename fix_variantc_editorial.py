content = open(r'C:\Users\josei\researchnet\src\app\page.tsx', 'r', encoding='utf-8').read()

replacements = [
    ('<h1 className="vc-section-heading">Oportunidades</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Postdocs, becas, convocatorias y ms</p>',
     '<h1 style={{ fontFamily: "\'Playfair Display\', Georgia, serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Oportunidades</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Postdocs, becas, convocatorias y más</p>'),
    ('<h1 className="vc-section-heading">Tu red</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red</p>',
     '<h1 style={{ fontFamily: "\'Playfair Display\', Georgia, serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Tu red</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red</p>'),
    ('<h1 className="vc-section-heading">Tu perfil</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Gestiona tu información de investigador</p>',
     '<h1 style={{ fontFamily: "\'Playfair Display\', Georgia, serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 5 }}>Tu perfil</h1>\n            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Gestiona tu información de investigador</p>'),
]

for old, new in replacements:
    if old in content:
        content = content.replace(old, new, 1)
        print(f'Replaced: {old[:60]}...')
    else:
        print(f'NOT FOUND: {old[:60]}...')

open(r'C:\Users\josei\researchnet\src\app\page.tsx', 'w', encoding='utf-8').write(content)
print("Done")