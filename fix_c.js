const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\josei\\researchnet';

function run(cmd) {
  return execSync(cmd, { cwd: root, encoding: 'utf8' });
}

const branch = run('git branch --show-current').trim();
console.log('Current branch:', branch);

if (branch !== 'variant-c-warm') {
  console.log('Wrong branch. Expected variant-c-warm, got', branch);
  process.exit(1);
}

// Get correct CSS from origin/variant-c-warm
const correctCSS = execSync('git show origin/variant-c-warm:src/app/globals.css', { cwd: root, encoding: 'utf8' });

// Fix border-radius: 12 -> var(--radius) in .onboard-orcid-btn
let fixed = correctCSS.replace(/border-radius: 12;/g, 'border-radius: var(--radius);');

fs.writeFileSync(path.join(root, 'src/app/globals.css'), fixed, 'utf8');
console.log('Wrote corrected globals.css from origin/variant-c-warm');

// Cleanup stale fix scripts
const stale = ['fix_b.js', 'fix_b.ps1', 'fix_autonomous.js', 'fix-variant-a.js', 'fix-variant-b.js'];
stale.forEach(f => {
  try { if (fs.existsSync(path.join(root, f))) fs.unlinkSync(path.join(root, f)); } catch(e) {}
});

const written = fs.readFileSync(path.join(root, 'src/app/globals.css'), 'utf8');
if (written.includes('border-radius: 12;')) {
  console.log('WARNING: border-radius: 12 still found');
} else {
  console.log('OK: border-radius: 12 removed from variant-c-warm');
}
console.log('Done.');