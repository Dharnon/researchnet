$content = Get-Content 'C:\Users\josei\researchnet\src\app\globals.css' -Raw

# Search for any variant-b or variant-a references
if ($content -match 'variant-b') {
    $lines = $content -split "`n"
    $variantBLines = $lines | Where-Object { $_ -match 'variant-b' }
    Write-Output "=== VARIANT-B REFERENCES ==="
    $variantBLines | ForEach-Object { Write-Output "Line $($lines.IndexOf($_)): $_" }
}

# Check if DARK MODE section exists
if ($content -match '\[data-theme="dark"\]') {
    $idx = $content.IndexOf('[data-theme="dark"]')
    Write-Output "`n=== DARK MODE EXISTS ==="
    Write-Output $content.Substring($idx, 600)
} else {
    Write-Output "`n=== NO DARK MODE SECTION ==="
}

# Check all connected definitions
Write-Output "`n=== ALL CONNECTED VAR DEFINITIONS ==="
$connectedDefs = $content -split "`n" | Where-Object { $_ -match 'connected' -and $_ -match '^\s*--' }
$connectedDefs | ForEach-Object { Write-Output $_ }

# Check open-dot definition
Write-Output "`n=== ALL OPEN-DOT VAR DEFINITIONS ==="
$openDotDefs = $content -split "`n" | Where-Object { $_ -match 'open-dot' -and $_ -match '^\s*--' }
$openDotDefs | ForEach-Object { Write-Output $_ }

# Check if warm dark root has --font-serif defined
Write-Output "`n=== ROOT FONT-SERIF ==="
$fontSerifLines = $content -split "`n" | Where-Object { $_ -match 'font-serif' }
$fontSerifLines | ForEach-Object { Write-Output $_ }

# Check for --accent in root (not light/dark mode)
$rootAccentLines = $content -split "`n" | Where-Object { $_ -match '--accent' }
Write-Output "`n=== ALL --accent DEFINITIONS (all sections) ==="
$rootAccentLines | ForEach-Object { Write-Output $_ }