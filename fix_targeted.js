const fs = require('fs');
const buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');

// Target corrupted sequences:
// pos 924-925: C3 C3 → should be C3 A9 (é) for Computación
// pos 932-933: C3 C3 → should be C3 B1 (ñ) for Computación
// pos 1079: C3 A9 is correct (é), checking pos 1080-1082: E2 80 B0 is correct (°)

// Actually let's use a string-based approach: locate and fix specific corrupted lines
const s = buf.toString('utf8');
const lines = s.split('\n');

// Fix researcher id=2 bio
lines[14] = lines[14].replace('lenguaje multilingüe y los desafíos éticos que plantea la IA generativa',
  'lenguaje multilingüe y los desafíos éticos que plantea la IA generativa');
// Ensure correct encoding
lines[14] = lines[14].replace(/bio: "Trabajo en modelos de lenguaje.*?"/,
  'bio: "Trabajo en modelos de lenguaje multilingüe y los desafíos éticos que plantea la IA generativa."');

// Fix researcher id=3 bio
lines[15] = lines[15].replace(/bio: "Desarrollo herramientas computacionales.*?"/,
  'bio: "Desarrollo herramientas computacionales para análisis de variantes genéticas y edición génica."');

// Fix researcher id=4 name
lines[16] = lines[16].replace('name: "Dr. Andrés Leal"', 'name: "Dr. Andrés Leal"');

// Fix researcher id=5 dept
lines[17] = lines[17].replace('dept: "Salud Pública"', 'dept: "Salud Pública"');
lines[18] = lines[18].replace('bio: "Aplico modelos predictivos a datos epidemiológicos para sistemas de alerta temprana."',
  'bio: "Aplico modelos predictivos a datos epidemiológicos para sistemas de alerta temprana."');

// Fix researcher id=6 bio
lines[19] = lines[19].replace('bio: "Desarrollo sistemas de percepción visual para robots autónomos en entornos no estructurados."',
  'bio: "Desarrollo sistemas de percepción visual para robots autónomos en entornos no estructurados."');

// Fix researcherColors - "Salud Pblica"
lines[64] = lines[64].replace('"Salud Pblica"', '"Salud Pública"');

const result = lines.join('\n');
fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', result, 'utf8');

// Verify
const verify = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const vlines = verify.split('\n');
console.log('Line 15:', vlines[14].slice(80, 200));
console.log('Line 16:', vlines[15].slice(80, 200));
console.log('Line 65:', vlines[64]);
console.log('Check multiling:', vlines.some(l => l.includes('multiling')));
console.log('Check Salud Pb:', vlines.some(l => l.includes('Salud Pb')));