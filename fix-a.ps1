# Fix UTF-8 double encoding mojibake in variant-a-clean page.tsx
$content = Get-Content "C:\Users\josei\researchnet\src\app\page.tsx" -Raw -Encoding UTF8

# Fix opportunity titles (en-dash/em-dash mojibake)
$content = $content -replace "Colaboraci`u00C3`u00B3n EU Horizon `u00C2`u20AC`u201C Quantum", "Colaboración EU Horizon – Quantum"
$content = $content -replace "Research Engineer `u00C2`u20AC`u201C Vision Systems", "Research Engineer – Vision Systems"
# Fix en-dash in description
$content = $content -replace "Postdoc `u00E2`u20AC`u201C IA aplicada a salud", "Postdoc – IA aplicada a salud"
$content = $content -replace "Tesis Doctoral `u00E2`u20AC`u201C NLP", "Tesis Doctoral – NLP"

# Fix remaining common mojibake
$content = $content -replace "a`u00C3`u00BAn", "aún"
$content = $content -replace "b`u00C3`u00BAsqueda", "búsqueda"
$content = $content -replace "p`u00C3`u00BAblico", "público"
$content = $content -replace "l`u00C3`u00ADmite", "límite"
$content = $content -replace "A`u00C3`u00B1 Fecha", "Añ – Fecha"

# Fix × close button (was Ã—)
$content = $content -replace "Ã—", "×"

# Fix check icon in connected button
$content = $content -replace "âœ" + [char]0x201C" Connected", "✓ Conectado"
$content = $content -replace "âœ" + [char]0x201C" Connected", "✓ Conectado"
$content = $content -replace "`u00E2`u009C`u0093 Conectado", "✓ Conectado"
$content = $content -replace "âœ" + " Connected", "✓ Conectado"

# Fix "Connect" → "Conectar" in b-connect-btn
$content = $content -replace '"Connect"', '"Conectar"'
$content = $content -replace '"âœ" + " Connected"', '"✓ Conectado"'

Set-Content "C:\Users\josei\researchnet\src\app\page.tsx" -Value $content -Encoding UTF8
Write-Output "Done"
