$f = Get-Content 'C:\Users\josei\researchnet\src\app\globals.css' -Raw
$idx = $f.IndexOf('[data-theme="dark"] .skeleton-shimmer')
if ($idx -ge 0) {
    Write-Output "FOUND at $idx"
    $f.Substring($idx - 5, 450)
} else {
    Write-Output "NOT FOUND"
    $idx2 = $f.IndexOf('skeleton-shimmer')
    Write-Output "skeleton-shimmer at $idx2"
    $f.Substring([Math]::Max(0, $idx2 - 10), 300)
}
