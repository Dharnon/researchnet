// Comprehensive encoding fixer for ResearchNet
// Handles double-UTF-8 encoding artifacts: Ã©→é, â€"→—, etc.

const fs = require('fs');
const path = process.argv[2] || 'src/app/page.tsx';

let content = fs.readFileSync(path, 'utf8');

const fixes = [
  // Double-encoded Spanish accents (most common)
  [/Ã¡/g, 'á'], [/Ã©/g, 'é'], [/Ã­/g, 'í'], [/Ã³/g, 'ó'],
  [/Ãº/g, 'ú'], [/Ã±/g, 'ñ'],
  [/ÃŒ/g, 'Í'], [/Ã‰/g, 'É'], [/Ã“/g, 'Ó'], [/Ãš/g, 'Ú'],
  [/ã©/g, 'é'], [/ã¡/g, 'á'], [/ã³/g, 'ó'], [/ã±/g, 'ñ'],
  // Em-dash mojibake
  [/â€/g, '—'], [/â€"/g, '—'], [/â€"/g, '—'],
  // Middle dot
  [/Â·/g, '·'],
  // Close button × (appears as Ã— in Latin1-view)
  [/Ã—/g, '×'],
  // Specific phrases
  [/Nousamos/g, 'Usamos'],
  [/collaborators/g, 'colaboradores'],
  [/collaborator/g, 'colaborador'],
  // Curly quotes
  [/\u201c/g, '"'], [/\u201d/g, '"'],
  // researcherColors map key
  [/"Salud PÃºblica":/g, '"Salud Pública":'],
];

let count = 0;
for (const [pattern, replacement] of fixes) {
  const before = content;
  content = content.replace(pattern, replacement);
  if (content !== before) count++;
}

fs.writeFileSync(path, content, 'utf8');

// Final verification
const checks = [
  'Ingeniería', 'Biomédica', 'Ibáñez', 'Ríos', 'Andrés',
  'Física', 'Salud Pública', 'Robótica',
  'José Ignacio', 'Hernández',
  '—', '×', '·',
];
const missing = checks.filter(c => !content.includes(c));
if (missing.length) {
  console.log(`Applied ${count} fixes. MISSING: ${missing.join(', ')}`);
} else {
  console.log(`Applied ${count} fixes. All checks pass ✅`);
}