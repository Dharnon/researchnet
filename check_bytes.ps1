$buf = [System.IO.File]::ReadAllBytes("$PWD\src\app\page.tsx")
$searchStr = "Dr. Andrs Leal"
$enc = [System.Text.Encoding]::UTF8
$searchBytes = $enc.GetBytes($searchStr)
$pos = -1
for ($i = 0; $i -lt $buf.Length - $searchBytes.Length; $i++) {
  $match = $true
  for ($j = 0; $j -lt $searchBytes.Length; $j++) {
    if ($buf[$i+$j] -ne $searchBytes[$j]) { $match = $false; break }
  }
  if ($match) { $pos = $i; break }
}
if ($pos -ge 0) {
  Write-Host "Found at pos $pos"
  $slice = $buf[$pos..($pos+$searchBytes.Length+5)]
  Write-Host "Hex: " + ($slice | ForEach-Object { $_.ToString('x2') }) -join ' '
  Write-Host "Text: " + ($enc.GetString($slice))
} else {
  Write-Host "Not found"
}