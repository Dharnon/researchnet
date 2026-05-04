import sys

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix mojibake in opportunities data
fixes = [
    # id 2 - Fondecyt
    ('Todas las Áreas", deadline: "15 May", type: "Fondos", hot: true, desc: "Fondos regulares para proyectos de investigación en todas las Áreas. Hasta $300.000 USD por proyecto, duración 4 aos."',
     'Todas las Áreas", deadline: "15 May", type: "Fondos", hot: true, desc: "Fondos regulares para proyectos de investigación en todas las áreas. Hasta $300.000 USD por proyecto, duración 4 años."'),
    # id 3 - EU Horizon
    ('Colaboracin EU Horizon — Quantum", dept: "Física Comp.", deadline: "1 Jun", type: "Internacional", hot: false, desc: "Busco colaborador para propuesta EU Horizon sobre computacin cuántica aplicada a optimización combinatoria."',
     'Colaboración EU Horizon — Quantum", dept: "Física Comp.", deadline: "1 Jun", type: "Internacional", hot: false, desc: "Busco colaborador para propuesta EU Horizon sobre computación cuántica aplicada a optimización combinatoria."'),
    # id 4 - NLP Doctoral
    ('Tesis Doctoral — NLP Multilingüe", dept: "CS", deadline: "20 May", type: "Doctorado", hot: false, desc: "Busqueda de eestudiante doctoral para investigación en modelos de lenguaje multilinge para lenguas minoritarias."',
     'Tesis Doctoral — NLP Multilingüe", dept: "CS", deadline: "20 May", type: "Doctorado", hot: false, desc: "Búsqueda de estudiante doctoral para investigación en modelos de lenguaje multilingüe para lenguas minoritarias."'),
    # id 5 - Vision Systems
    ('Research Engineer — Vision Systems", dept: "Robótica e IA", deadline: "10 May", type: "Laboral", hot: true, desc: "Research engineer para desarrollar sistemas de visión por computador en robotics. Salario competitivo + equity."',
     'Research Engineer — Vision Systems", dept: "Robótica e IA", deadline: "10 May", type: "Laboral", hot: true, desc: "Research engineer para desarrollar sistemas de visión por computador en robotics. Salario competitivo + equity."'),
    # id 6 - Marie Curie
    ('Beca Marie Curie — Climate AI", dept: "Todas las Áreas", deadline: "25 Jun", type: "Internacional", hot: false, desc: "Beca postdoctoral europea para proyectos de IA aplicada al cambio climático. Sin restricciones de nacionalidad."',
     'Beca Marie Curie — Climate AI", dept: "Todas las Áreas", deadline: "25 Jun", type: "Internacional", hot: false, desc: "Beca postdoctoral europea para proyectos de IA aplicada al cambio climático. Sin restricciones de nacionalidad."'),
    # Profile groups heading
    ('Grupos de investigacin</p>', 'Grupos de investigación</p>'),
    # Button text
    ('Ms informacin</button>', 'Más información</button>'),
]

for old, new in fixes:
    if old in content:
        content = content.replace(old, new)
        print(f"Fixed: {old[:60]}...")
    else:
        print(f"NOT FOUND: {old[:60]}...")

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")