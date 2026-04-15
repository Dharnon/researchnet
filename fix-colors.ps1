$content = Get-Content 'C:\Users\josei\researchnet\src\app\page.tsx' -Raw -Encoding UTF8

# Find all unquoted var() occurrences and wrap them
# Pattern: var( not preceded by a quote
$content = $content -replace '(?<!["\'])var\(--', '"var(--'
# Close the string: if var() is followed by , or }} without a closing quote, add one
$content = $content -replace '(var\(--[^"]+?)([,}])', '$1"$2'

$content | Set-Content 'C:\Users\josei\researchnet\src\app\page.tsx' -NoNewline -Encoding UTF8
Write-Host 'Done. Checking for remaining unquoted vars...'
$unquoted = [regex]::Matches($content, '(?<!["\'])var\(--')
Write-Host "Found $($unquoted.Count) unquoted var() occurrences"
