$data = Get-Content 'C:\Users\josei\researchnet\src\app\page.tsx' -Raw -Encoding UTF8

$data = $data -replace 'tags: \["NLP", "Large Language Models", ".*?tica en IA"\]', 'tags: ["NLP", "Large Language Models", "Ética en IA"]'

$data = $data -replace 'bio: "Trabajo en modelos de lenguaje multiling.*?y los desafío.*?"', 'bio: "Trabajo en modelos de lenguaje multilingüe y los desafíos éticos que plantea la IA generativa."'

$data = $data -replace 'bio: "Desarrollo herramientas computacionales para an.*?sis de variantes gen.*?cas y edici.*?n génica\."', 'bio: "Desarrollo herramientas computacionales para análisis de variantes genéticas y edición génica."'

$data = $data -replace 'name: "Dr\. Andrs Leal"', 'name: "Dr. Andrés Leal"'

$data = $data -replace 'tags: \["Computación Cuntica", "Simulacin", "Algoritmos"\]', 'tags: ["Computación Cuántica", "Simulación", "Algoritmos"]'

$data = $data -replace 'bio: "Diseo algoritmos cun.*?ticos para simulac.*?n de sistemas complejos y optimización combinatoria\."', 'bio: "Diseño algoritmos cuánticos para simulación de sistemas complejos y optimización combinatoria."'

$data = $data -replace 'dept: "Salud Pblica"', 'dept: "Salud Pública"'

$data = $data -replace 'bio: "Aplico modelos predictivos a datos epidemiol.*?gicos para sistemas de alerta temprana\."', 'bio: "Aplico modelos predictivos a datos epidemiológicos para sistemas de alerta temprana."'

$data = $data -replace 'bio: "Desarrollo sistemas de percepcin visual para robots auunomos en entornos no estructurados\."', 'bio: "Desarrollo sistemas de percepción visual para robots autónomos en entornos no estructurados."'

Set-Content -Path 'C:\Users\josei\researchnet\src\app\page.tsx' -Value $data -Encoding UTF8
Write-Host 'Done'