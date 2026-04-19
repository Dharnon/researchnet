$b = [System.IO.File]::ReadAllBytes("C:\Users\josei\researchnet\src\app\page.tsx")
$c3 = @($b | Where-Object { $PSItem -eq 0xC3 }).Count
$c2 = @($b | Where-Object { $PSItem -eq 0xC2 }).Count
$ad = @($b | Where-Object { $PSItem -eq 0xAD }).Count
Write-Host "C3=$c3 C2=$c2 AD=$ad"

# Print context around C2 positions
$positions = @()
$idx = 0
foreach ($byte in $b) {
    if ($byte -eq 0xC2) { $positions += $idx }
    $idx++
}
Write-Host "C2 positions: $($positions -join ', ')"

foreach ($pos in $positions) {
    $ctx = ""
    for ($i = [Math]::Max(0, $pos-5); $i -lt [Math]::Min($b.Length, $pos+8); $i++) {
        if ($i -eq $pos) { $ctx += ">>>" }
        $ctx += [char]$b[$i] + "($($b[$i])) "
    }
    Write-Host "  pos $pos : $ctx"
}