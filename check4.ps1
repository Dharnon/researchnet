$content = Get-Content 'C:\Users\josei\researchnet\src\app\globals.css' -Raw

# Find all --connected-color and --connected-bg and --connected-border definitions
$connectedDefs = $content -split "`n" | Where-Object { $_ -match 'connected' -and $_ -match '^\s*--connected' }
Write-Output "=== CONNECTED VAR DEFINITIONS ==="
$connectedDefs | ForEach-Object { Write-Output $_ }

# Find dark mode section
if ($content -match '\[data-theme="dark"\]') {
    $idx = $content.IndexOf('[data-theme="dark"]')
    Write-Output "`n=== DARK MODE SECTION (first 800 chars) ==="
    Write-Output $content.Substring($idx, 800)
} else {
    Write-Output "`nNo [data-theme=""dark""] section found"
}

# Find light mode section
if ($content -match '\[data-theme="light"\]') {
    $idx = $content.IndexOf('[data-theme="light"]')
    Write-Output "`n=== LIGHT MODE SECTION (first 600 chars) ==="
    Write-Output $content.Substring($idx, 600)
} else {
    Write-Output "`nNo [data-theme=""light""] section found"
}