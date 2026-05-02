$content = Get-Content 'C:\Users\josei\researchnet\src\app\globals.css' -Raw
$lines = $content -split "`n"

Write-Output "File has $($lines.Count) lines"

# Check first few lines
Write-Output "=== First 3 lines ==="
$lines[0..2] | ForEach-Object { Write-Output $_ }

# Find accent color
$accentLine = $lines | Where-Object { $_ -match '--accent:' }
Write-Output "=== Accent line ==="
$accentLine | ForEach-Object { Write-Output $_ }

# Find connected state
$connectedLines = $lines | Where-Object { $_ -match 'connected' }
Write-Output "=== Connected lines ==="
$connectedLines | ForEach-Object { Write-Output $_ }

# Find vc-section-heading
$headingLine = $lines | Where-Object { $_ -match 'vc-section-heading' }
Write-Output "=== vc-section-heading line ==="
$headingLine | ForEach-Object { Write-Output $_ }

# Check if Playfair display block exists
if ($content -match '\.vc-section-heading') {
    Write-Output "vc-section-heading CSS found"
}
if ($content -match 'Playfair Display') {
    Write-Output "Playfair Display font found"
}
if ($content -match '\.vc-connect-btn') {
    Write-Output "vc-connect-btn CSS found"
}
if ($content -match 'rgba\(91, 143, 212') {
    Write-Output "SLATE-BLUE RGBA FOUND - needs fixing!"
}
if ($content -match '#5b8fd4') {
    Write-Output "SLATE-BLUE HEX #5b8fd4 FOUND - needs fixing!"
}
if ($content -match '#D97706') {
    Write-Output "AMBER #D97706 found - looks correct"
}