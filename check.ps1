$content = Get-Content 'C:\Users\josei\researchnet\src\app\globals.css' -Raw
if ($content -match 'WARM EDITORIAL') {
    Write-Output 'Warm Editorial found in globals.css'
} else {
    Write-Output 'Warm Editorial NOT found in globals.css'
}
if ($content -match 'variant-b') {
    Write-Output 'variant-b found in globals.css'
}
if ($content -match '5b8fd4') {
    Write-Output '5b8fd4 found in globals.css'
}
if ($content -match '91, 143, 212') {
    Write-Output 'slate-blue rgba(91, 143, 212) found in globals.css'
}