$buf = [System.IO.File]::ReadAllBytes('C:\Users\josei\researchnet\src\app\page.tsx')
$latin1 = [System.Text.Encoding]::GetEncoding('iso-8859-1')
$utf8 = [System.Text.Encoding]::UTF8
$latin1bytes = $buf
$correct = $utf8.GetString($latin1bytes)
[System.IO.File]::WriteAllText('C:\Users\josei\researchnet\src\app\page.tsx', $correct, $utf8)
Write-Host "Fixed bytes: $($buf.Length)"