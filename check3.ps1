$content = Get-Content 'C:\Users\josei\researchnet\src\app\globals.css' -Raw

Write-Output "=== ACCENT COLORS ==="
$content -split "`n" | Where-Object { $_ -match '--accent' -and $_ -notmatch 'font|section|empty|heading' } | ForEach-Object { Write-Output $_ }

Write-Output "`n=== OPEN-DOT ==="
$content -split "`n" | Where-Object { $_ -match 'open-dot' } | ForEach-Object { Write-Output $_ }

Write-Output "`n=== CONNECTED ==="
$content -split "`n" | Where-Object { $_ -match '--connected' } | ForEach-Object { Write-Output $_ }

Write-Output "`n=== VARIANT-B SLATE BLUE CHECK ==="
if ($content -match '#5b8fd4') { Write-Output "FOUND: #5b8fd4" } else { Write-Output "OK: no #5b8fd4" }
if ($content -match 'rgba\(91, 143, 212') { Write-Output "FOUND: rgba(91,143,212)" } else { Write-Output "OK: no rgba(91,143,212)" }
if ($content -match '7ba3e0') { Write-Output "FOUND: 7ba3e0" } else { Write-Output "OK: no 7ba3e0" }

Write-Output "`n=== VARIANT-C AMBER CHECK ==="
if ($content -match '#D97706') { Write-Output "OK: #D97706 found" } else { Write-Output "NOTE: #D97706 not found" }
if ($content -match '#c9945a') { Write-Output "OK: #c9945a found (warm amber)" } else { Write-Output "NOTE: #c9945a not found" }
if ($content -match '#f59e0b') { Write-Output "OK: #f59e0b found" } else { Write-Output "NOTE: #f59e0b not found" }

Write-Output "`n=== DARK MODE ACCENT ==="
$darkSection = $content -split 'data-theme="dark"'
if ($darkSection.Count -gt 1) {
    $darkContent = $darkSection[1] -split '}' | Select-Object -First 1
    $darkContent -split "`n" | Where-Object { $_ -match '--accent' } | ForEach-Object { Write-Output $_ }
}

Write-Output "`n=== .vc-connect-btn CSS ==="
if ($content -match '\.vc-connect-btn \{') { 
    Write-Output "vc-connect-btn CSS found"
    $idx = $content.IndexOf('.vc-connect-btn {')
    Write-Output $content.Substring($idx, 300)
} else {
    Write-Output "vc-connect-btn CSS NOT found"
}

Write-Output "`n=== Playfair section heading ==="
if ($content -match '\.vc-section-heading') {
    $idx = $content.IndexOf('.vc-section-heading')
    Write-Output $content.Substring($idx, 200)
}