# Fix mojibake encoding in page.tsx
$content = Get-Content "src/app/page.tsx" -Raw -Encoding UTF8

# Fix researcher data - names and departments
$fixes = @{
    "role: `"Investigador Senior`", dept: `"Ciencias de la Computaci`n`"" = 'role: "Investigador Senior", dept: "Ciencias de la Computación"'
    "role: `"Profesora Asociada`", dept: `"Biolog`a Molecular`"" = 'role: "Profesora Asociada", dept: "Biología Molecular"'
    "role: `"Profesor Asociado`", dept: `"F`sica Computacional`"" = 'role: "Profesor Asociado", dept: "Física Computacional"'
    "dept: `"Salud P`blica`"" = 'dept: "Salud Pública"'
    "dept: `"Rob`tica e IA`"" = 'dept: "Robótica e IA"'
    "dept: `"Biom`dica + CS`"" = 'dept: "Biomédica + CS"'
    'dept: "Todas las Areas"' = 'dept: "Todas las Áreas"'
    "dept: `"F`sica Comp.`"" = 'dept: "Física Comp."'
    'title: "Tesis Doctoral - NLP Multiling`e"' = 'title: "Tesis Doctoral - NLP Multilingüe"'
    "orcid: `"0000-0002-1234-5678`", name: `"Dra. Elena Vargas`"" = 'orcid: "0000-0002-1234-5678", name: "Dra. Elena Vargas"'
    "text: `"Hola Elena! Encantado de saludarte. Cu`ntame ms sobre el proyecto, suena interesante.`"" = 'text: "Hola Elena! Encantado de saludarte. Cuéntame más sobre el proyecto, suena interesante."'
    "text: `"Es un proyecto sobre sensores distribuidos para monitorizacin ambiental. No usamos LoRa y queramos explorar machine learning para fusionar datos.`"" = 'text: "Es un proyecto sobre sensores distribuidos para monitorización ambiental. No usamos LoRa y queríamos explorar machine learning para fusionar datos."'
    "orcid: `"0000-0003-9876-5432`", name: `"Dr. Felipe Mora`"" = 'orcid: "0000-0003-9876-5432", name: "Dr. Felipe Mora"'
    "text: `"Hey! Tu perfil de IoT me interesa. Tengo un proyecto de robotics donde podramos colaborar.`"" = 'text: "Hey! Tu perfil de IoT me interesa. Tengo un proyecto de robotics donde podríamos colaborar."'
}

foreach ($key in $fixes.Keys) {
    $content = $content -replace [regex]::Escape($key), $fixes[$key]
}

# Fix direct mojibake patterns
$content = $content -replace 'C`\''entame', 'Cuéntame'
$content = $content -replace 'ms sobre', 'más sobre'
$content = $content -replace 'monitorizcin', 'monitorización'
$content = $content -replace 'queramos', 'queríamos'
$content = $content -replace 'podramos', 'podríamos'
$content = $content -replace 'Areas', 'Áreas'
$content = $content -replace '\bM\s+informaci\`on', 'Más información'
$content = $content -replace 'M\`as informaci\`on', 'Más información'
$content = $content -replace 'C\'\''entate', 'Conéctate'
$content = $content -replace 'Empieza', 'empieza'
$content = $content -replace 'pr\'oxi', 'próxi'
$content = $content -replace 'becas, convocatorias y ms', 'becas, convocatorias y más'
$content = $content -replace 'Abiertos a colaboraci\`on', 'Abiertos a colaboración'
$content = $content -replace 'informaci\'on de investigador', 'información de investigador'
$content = $content -replace 'lmite', 'límite'
$content = $content -replace 'Ver m\'as', 'Ver más'
$content = $content -replace 'p\'ublico', 'público'
$content = $content -replace 'Invitar a investigador', 'Invitar a investigador'

Set-Content -Path "src/app/page.tsx" -Value $content -Encoding UTF8
Write-Host "Done"
