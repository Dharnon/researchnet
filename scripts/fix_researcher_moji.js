const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');

const fixes = [
  // id 2 - Ética → tica
  ['"tica en IA"]', '"Ética en IA"]'],
  // id 3 - bio mojibake
  ['anlisis de variantes genticas y edicin génica', 'análisis de variantes genéticas y edición génica'],
  // id 4 - tags and bio
  ['"Computación Cuntica", "Simulacin", "Algoritmos"]', '"Computación Cuántica", "Simulación", "Algoritmos"]'],
  ['"Diseo algoritmos cunéticos para simulacin', '"Diseño algoritmos cuánticos para simulación'],
  // id 5 - dept and bio
  ['dept: "Salud Pblica"', 'dept: "Salud Pública"'],
  ['epidemiolgicos', 'epidemiológicos'],
  // id 6 - bio
  ['percepcin visual para robots auunomos', 'percepción visual para robots autónomos'],
  // Profile surname
  ['surname: "Hernnandez"', 'surname: "Hernández"'],
  // Any remaining common issues
  ['"disponible",', '"Disponible",'],
];

let count = 0;
for (const [old, neu] of fixes) {
  if (c.includes(old)) {
    c = c.replace(old, neu);
    count++;
    console.log('OK:', old.slice(0, 60));
  } else {
    console.log('MISS:', old.slice(0, 60));
  }
}

fs.writeFileSync('src/app/page.tsx', c, 'utf8');
console.log('\n' + count + ' fixes applied');