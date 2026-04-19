// fix-encoding-cycle23.js - Encoding fix for all 3 variants
const { execSync } = require('child_process');
const fs = require('fs');

const variants = ['variant-b-dark', 'variant-c-warm'];
const repoPath = 'C:\\Users\\josei\\researchnet';

function fixFile(fullPath) {
  if (!fs.existsSync(fullPath)) { console.log(`  File not found: ${fullPath}`); return; }
  const buf = fs.readFileSync(fullPath);
  let str = buf.toString('utf8');
  
  const replacements = [
    ['tÃ©rmino de bÃºsqueda', 'término de búsqueda'],
    ['Sin mensajes aÃºn', 'Sin mensajes aún'],
    ['MÃ¡s informaciÃ³n', 'Más información'],
    ['Ver mi perfil pÃºblico', 'Ver mi perfil público'],
    ['Salud PÃºblica', 'Salud Pública'],
    ['epidemiologÃ­a', 'epidemiología'],
    ['epidemiolÃ³gicos', 'epidemiológicos'],
    ['MultilingÃ¼e', 'Multilingüe'],
    ['Convocatorias y mÃ¡s', 'Convocatorias y más'],
    ['Ãreas', 'Áreas'],
    ['segÃºn Ã¡reas', 'según áreas'],
    ['Tesis Doctoral -" NLP', 'Tesis Doctoral — NLP'],
    ['investigaciÃ³n', 'investigación'],
    ['ColabolaciÃ³n', 'Colaboración'],
    ['CoColaboraciÃ³n', 'Colaboración'],
  ];

  let fixed = false;
  for (const [bad, good] of replacements) {
    if (str.includes(bad)) {
      str = str.split(bad).join(good);
      console.log(`  FIXED: "${bad.substring(0, 40)}..." → "${good.substring(0, 40)}..."`);
      fixed = true;
    }
  }

  if (fixed) {
    fs.writeFileSync(fullPath, str, 'utf8');
    console.log(`  → Written`);
  } else {
    console.log(`  No mojibake found`);
  }
  return fixed;
}

function fixGlobals(fullPath) {
  if (!fs.existsSync(fullPath)) return;
  const buf = fs.readFileSync(fullPath);
  let str = buf.toString('utf8');
  let fixed = false;
  const reps = [['t墅', 'í']];
  for (const [bad, good] of reps) {
    if (str.includes(bad)) { str = str.split(bad).join(good); fixed = true; }
  }
  if (fixed) { fs.writeFileSync(fullPath, str, 'utf8'); console.log(`  globals.css fixed`); }
}

console.log('=== Encoding fix cycle 23 ===\n');
for (const variant of variants) {
  console.log(`\n[${variant}]`);
  try {
    execSync(`git checkout ${variant}`, { cwd: repoPath, stdio: 'pipe' });
  } catch (e) {
    console.log(`  Checkout failed: ${e.message.substring(0, 80)}`);
    continue;
  }
  const page = repoPath + '\\src\\app\\page.tsx';
  const changed = fixFile(page);
  fixGlobals(repoPath + '\\src\\app\\globals.css');
  if (changed) {
    try {
      execSync(`git add -A && git commit -m "variant: fix encoding mojibake"`, { cwd: repoPath, stdio: 'pipe' });
      console.log(`  Committed`);
    } catch(e2) { console.log(`  Commit failed: ${e2.message.substring(0, 80)}`); }
  }
}
console.log('\n=== Done ===');
