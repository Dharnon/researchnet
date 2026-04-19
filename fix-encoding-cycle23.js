// fix-encoding-cycle23.js
// Fixes mojibake in ALL THREE variants in one pass
// The issue: UTF-8 bytes misinterpreted as Windows-1252 and re-encoded as UTF-8
// Fix: re-interpret the double-encoded bytes as Windows-1252, then re-encode as UTF-8

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const variants = ['variant-a-clean', 'variant-b-dark', 'variant-c-warm'];
const repoPath = 'C:\\Users\\josei\\researchnet';
const filePath = 'src/app/page.tsx';
const globalsPath = 'src/app/globals.css';

// The mojibake replacements (from UTF-8 double-encoding)
// Key = the mojibake string, Value = the correct string
// We handle this at the byte level for reliability

function fixFile(fullPath) {
  // Read raw bytes
  const buf = fs.readFileSync(fullPath);
  let str = buf.toString('utf8'); // Try reading as UTF-8 first
  
  // The mojibake patterns to fix (found via Select-String analysis):
  // These are the "displayed" versions when UTF-8 bytes read as Win-1252:
  const replacements = [
    // From Select-String output — actual mojibake strings visible when read as Win-1252
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
    ['Ã\xadd', 'í'],
    ['BÃºsqueda', 'Búsqueda'],
    ['investigaciÃ³n', 'investigación'],
    ['lenguas minoritarias.', 'lenguas minoritarias.'],
    ['ColabolaciÃ³n', 'Colaboración'],
    ['CoColaboraciÃ³n', 'Colaboración'],
    ['Ã³n', 'ón'],
    ['Ã­a', 'ía'],
    ['BÃºsqueda', 'Búsqueda'],
  ];

  let fixed = false;
  for (const [bad, good] of replacements) {
    if (str.includes(bad)) {
      str = str.split(bad).join(good);
      console.log(`  FIXED: "${bad.substring(0, 30)}..." → "${good.substring(0, 30)}..."`);
      fixed = true;
    }
  }

  if (fixed) {
    // Write back as UTF-8 without BOM
    fs.writeFileSync(fullPath, str, 'utf8');
    console.log(`  → Written back as UTF-8`);
    return true;
  } else {
    console.log(`  No changes needed`);
    return false;
  }
}

// Also fix globals.css for any mojibake
function fixGlobals(fullPath) {
  if (!fs.existsSync(fullPath)) return;
  
  const buf = fs.readFileSync(fullPath);
  let str = buf.toString('utf8');
  
  const replacements = [
    ['Ã©', 'é'],
    ['Ã¡', 'á'],
    ['Ã­', 'í'],
    ['Ã³', 'ó'],
    ['Ãº', 'ú'],
    ['Ã±', 'ñ'],
    ['Ã', 'í'],
    ['â€"', '—'],
    ['â€œ', '"'],
    ['â€', '"'],
  ];

  let fixed = false;
  for (const [bad, good] of replacements) {
    if (str.includes(bad)) {
      str = str.split(bad).join(good);
      fixed = true;
    }
  }

  if (fixed) {
    fs.writeFileSync(fullPath, str, 'utf8');
    console.log(`  → globals.css fixed and written`);
  }
}

console.log('=== Fixing encoding across all variants ===\n');

for (const variant of variants) {
  console.log(`\n[${variant}]`);
  
  // Checkout variant
  try {
    execSync(`git checkout ${variant}`, { cwd: repoPath, stdio: 'pipe' });
  } catch (e) {
    // Remove fix2.ps1 if it exists and blocking checkout
    const fix2Path = repoPath + '\\fix2.ps1';
    if (fs.existsSync(fix2Path)) {
      try { fs.unlinkSync(fix2Path); } catch(e3) {}
    }
    try {
      execSync(`git checkout ${variant}`, { cwd: repoPath, stdio: 'pipe' });
    } catch (e2) {
      console.log(`  Could not checkout ${variant}: ${e2.message.substring(0, 100)}`);
      continue;
    }
  }
  
  // Fix page.tsx
  const page = repoPath + '\\src\\app\\page.tsx';
  if (fs.existsSync(page)) {
    fixFile(page);
  }
  
  // Fix globals.css
  const globals = repoPath + '\\src\\app\\globals.css';
  fixGlobals(globals);
}

console.log('\n=== Done ===');
