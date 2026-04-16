$f = Get-Content 'C:\Users\josei\researchnet\src\app\page.tsx' -Raw

# Add amber to light theme
$f = $f -replace '(bg: "#f8fafc",\s*surface: "#ffffff",)', '$1  amber: "#c8873a",'

# Nav active indicator: use amber for the active tab bottom bar
$f = $f -replace 'background: t\.accent \}\} \/>', 'background: "#c8873a" }} />'

# In NavBar active indicator: change from t.accent to warm amber
# The active indicator uses: background: t.accent  
# Change to: background: theme === "dark" ? t.accent : "#c8873a"
$f = $f -replace '(position: "absolute", bottom: 0, left: "50%", transform: "translateX\(-50%\)", width: 20, height: 2, borderRadius: 2,) background: t\.accent \}\)', '$1 background: theme === "dark" ? t.accent : "#c8873a" }}'

# amber on hover for Nav items too
$f = $f -replace '(color: view === item\.key \? t\.accent : t\.textTertiary \}\s*>)', 'color: view === item.key ? (theme === "light" ? "#c8873a" : t.accent) : t.textTertiary }}'

[System.IO.File]::WriteAllText('C:\Users\josei\researchnet\src\app\page.tsx', $f, [System.Text.Encoding]::UTF8)
Write-Output "Done nav"