const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');
let changed = 0;

function replaceInBuffer(buf, from, to) {
  let i = 0;
  while ((i = buf.indexOf(from, i)) !== -1) {
    buf = Buffer.concat([buf.slice(0, i), to, buf.slice(i + from.length)]);
    i += to.length;
    changed++;
  }
  return buf;
}

// Fix: "Salud Pblica" → "Salud Pública" (7-byte to 8-byte expansion)
// "Pblica" = 50 62 6C 69 63 61 → "Pblica" + insert 75 after 62 = 50 62 75 6C 69 63 61
replaceInBuffer(buf, Buffer.from('Salud Pblica', 'utf8'), Buffer.from('Salud Pública', 'utf8'));

// Fix: "Dr. Andrs Leal" → "Dr. Andrés Leal"
// "Andrs" = 41 6E 64 72 73 → "Andrés" = 41 6E 64 72 C3 A9 73
replaceInBuffer(buf, Buffer.from('Dr. Andrs Leal', 'utf8'), Buffer.from('Dr. Andrés Leal', 'utf8'));

// Fix: "Colaboracin EU" → "Colaboración EU"  
replaceInBuffer(buf, Buffer.from('Colaboracin EU', 'utf8'), Buffer.from('Colaboración EU', 'utf8'));

// Fix: "monitorizacin" → "monitorización"
replaceInBuffer(buf, Buffer.from('monitorizacin', 'utf8'), Buffer.from('monitorización', 'utf8'));

// Fix: "ms sobre" → "más sobre" (inside a message text)
replaceInBuffer(buf, Buffer.from('ms sobre', 'utf8'), Buffer.from('más sobre', 'utf8'));

// Fix: "ver ms" → "ver más" (opportunity CTA)
replaceInBuffer(buf, Buffer.from('ver ms', 'utf8'), Buffer.from('ver más', 'utf8'));

// Fix: "posici" in opportunity desc → "posición"
replaceInBuffer(buf, Buffer.from('posici\n', 'utf8'), Buffer.from('posición\n', 'utf8'));

// Fix: "seales neuronales" → "señales neuronales"
replaceInBuffer(buf, Buffer.from('seales neuronales', 'utf8'), Buffer.from('señales neuronales', 'utf8'));

// Fix: "Ingeniera" in researcher dept → "Ingeniería" 
replaceInBuffer(buf, Buffer.from('Ingeniera Biom', 'utf8'), Buffer.from('Ingeniería Biom', 'utf8'));

// Fix: "Biomdica" → "Biomédica"
replaceInBuffer(buf, Buffer.from('Biomdica', 'utf8'), Buffer.from('Biomédica', 'utf8'));

// Fix: "Computacin" → "Computación" in opportunity 1
replaceInBuffer(buf, Buffer.from('Computacin\n', 'utf8'), Buffer.from('Computación\n', 'utf8'));

// Fix: "queramos" → "queríamos" in message 3
replaceInBuffer(buf, Buffer.from('queramos', 'utf8'), Buffer.from('queríamos', 'utf8'));

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);

// Verify
const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
console.log('=== Verification ===');
console.log('L15:', clines[14].slice(0, 120));
console.log('L17:', clines[16].slice(0, 120));
console.log('L18:', clines[17].slice(0, 120));
console.log('L24:', clines[23].slice(0, 120));
console.log('L25:', clines[24].slice(0, 120));
console.log('L35:', clines[34].slice(0, 120));
console.log('L65:', clines[64]);
console.log('Changed:', changed);

// Check for remaining corruptions
const corruptions = ['Andrs', 'Salud P', 'Colaboracin', 'monitorizacin', 'seales', 'Biomdica', 'Ingeniera', 'Computacin', 'queramos'];
corruptions.forEach(c => {
  if (check.includes(c)) console.log('STILL CORRUPT:', c);
});
console.log('Done!');