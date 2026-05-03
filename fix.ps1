$f = "C:\Users\josei\researchnet\src\app\globals.css"
$c = Get-Content $f -Raw
$old = "0 0 0 1px rgba(91,143,212,0.20),
    0 8px 40px rgba(0,0,0,0.65),
    0 0 16px rgba(91,143,212,0.08),
    inset 0 0 20px rgba(113,114,154,0.04);"
$new = "0 0 0 1px rgba(91,143,212,0.15),
    0 8px 40px rgba(0,0,0,0.60),
    0 0 12px rgba(91,143,212,0.06),
    inset 0 0 20px rgba(113,114,154,0.04);"
$c = $c -replace [regex]::Escape($old), $new
[System.IO.File]::WriteAllText($f, $c, [System.Text.Encoding]::UTF8)
Write-Host "Done"