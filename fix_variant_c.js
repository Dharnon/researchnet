const fs = require("fs");
let content = fs.readFileSync("src/app/page.tsx", "utf8");

// Fix mojibake in researcher data
const fixes = [
  ["Dr. Marcos Ib��ez", "Dr. Marcos Ibáñez"],
  ["Ciencias de la Computaci�n", "Ciencias de la Computación"],
  ["Lenguaje multiling�e", "Lenguaje multilingüe"],
  ["desaf�os �ticos", "desafíos éticos"],
  ["Dr. Andrs Leal", "Dr. Andrés Leal"],
  ["F�sica Computacional", "Física Computacional"],
  ["Computaci�n Cu�ntica", "Computación Cuántica"],
  ["Simulaci�n", "Simulación"],
  ["Dise�o algoritmos cu�nticos", "Diseño algoritmos cuánticos"],
  ["simulaci�n", "simulación"],
  ["optimizaci�n", "optimización"],
  ["Dra. Carmen Fuentes", "Dra. Carmen Fuentes"],
  ["Salud Pblica", "Salud Pública"],
  ["epidemiolgicos", "epidemiológicos"],
  ["percepcin", "percepción"],
  ["auunomos", "autónomos"],
  ["Biom�dica", "Biomédica"],
  ["biomdica", "biomédica"],
  ["b�squeda", "búsqueda"],
  ["investigaci�n", "investigación"],
  ["multilinge", "multilingüe"],
  ["Postdoc - IA", "Postdoc — IA"],
  ["Tesis Doctoral - NLP", "Tesis Doctoral — NLP"],
  ["computacin", "computación"],
  ["Hot", "Hot"],
  ["Ms información", "Más información"],
  ["Fecha lmite", "Fecha límite"],
];

let changed = 0;
for (const [bad, good] of fixes) {
  if (content.includes(bad)) {
    content = content.split(bad).join(good);
    changed++;
  }
}

fs.writeFileSync("src/app/page.tsx", content, "utf8");
console.log(`Fixed ${changed} mojibake instances`);
