const fs = require('fs');
let c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');

// Fix mojibake patterns from UTF-8 double encoding
c = c.replace(/Ã­/g, 'í');
c = c.replace(/Ã©/g, 'é');
c = c.replace(/Ã¡/g, 'á');
c = c.replace(/Ã³/g, 'ó');
c = c.replace(/Ã±/g, 'ñ');
c = c.replace(/Ã¼/g, 'ü');
c = c.replace(/Ã‰/g, 'É');
c = c.replace(/Ã“/g, 'Ó');
c = c.replace(/Ãš/g, 'Ú');
c = c.replace(/â€"/g, '—');
c = c.replace(/â€"/g, '"');
c = c.replace(/â€"/g, '"');
c = c.replace(/â€¢/g, '–');
c = c.replace(/BiomAcdica/g, 'Biomédica');
c = c.replace(/IngenierAa/g, 'Ingeniería');
c = c.replace(/IngenierA-a/g, 'Ingeniería');
c = c.replace(/FAsica/g, 'Física');
c = c.replace(/RobA3tica/g, 'Robótica');
c = c.replace(/PA-blica/g, 'Pública');
c = c.replace(/CuA"/g, 'Cuá');
c = c.replace(/CuAntica/g, 'Cuántica');
c = c.replace(/genA©ticas/g, 'genéticas');
c = c.replace(/ediciA3n/g, 'edición');
c = c.replace(/gA©nica/g, 'génica');
c = c.replace(/PA¡squeda/g, 'Búsqueda');
c = c.replace(/BAs/g, 'Bú');
c = c.replace(/Areas/g, 'Áreas');
c = c.replace(/aA±os/g, 'años');
c = c.replace(/duraciA3n/g, 'duración');
c = c.replace(/CuAcntame/g, 'Cuéntame');
c = c.replace(/MA¡s/g, 'Más');
c = c.replace(/conAcctate/g, 'Conéctate');
c = c.replace(/ConAcctate/g, 'Conéctate');
c = c.replace(/prA3ximo/g, 'próximo');
c = c.replace(/sA3lo/g, 'sólo');
c = c.replace(/dA­a/g, 'día');
c = c.replace(/A%ti/g, 'Éti');
c = c.replace(/A3/g, 'ó');
c = c.replace(/A[g]/g, 'á');

fs.writeFileSync('C:/Users/josei/researchnet/src/app/page.tsx', c, 'utf8');
console.log('done. Checking remaining...');

// Check for remaining mojibake patterns  
const lines = c.split('\n');
const problems = [];
lines.forEach((l, i) => {
  if (/A[A-Za-z]|[a-z]A[a-z]/.test(l)) {
    problems.push(`${i+1}: ${l.trim().substring(0,80)}`);
  }
});
console.log('potential lines:', problems.length);
problems.slice(0, 10).forEach(p => console.log(p));