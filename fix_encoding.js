const fs = require('fs');
const { spawnSync } = require('child_process');

// Get the clean UTF-8 content from git
const result = spawnSync('git', ['show', 'HEAD:src/app/page.tsx'], {
  encoding: 'buffer',
  maxBuffer: 20 * 1024 * 1024
});

const buf = Buffer.from(result.stdout);
console.log('Git output length:', buf.length);
let bad = 0;
for (let i = 0; i < buf.length; i++) if (buf[i] >= 0x80 && buf[i] < 0xC0) bad++;
console.log('Bad bytes in git output:', bad);

// Write the file BINARY (no encoding)
const fd = fs.openSync('C:/Users/josei/researchnet/src/app/page.tsx', 'w+');
fs.writeSync(fd, buf);
fs.closeSync(fd);

// Verify
const verify = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx');
let bad2 = 0;
for (let i = 0; i < verify.length; i++) if (verify[i] >= 0x80 && verify[i] < 0xC0) bad2++;
console.log('After write - bad bytes:', bad2, 'length:', verify.length);

if (bad2 === 0) {
  console.log('SUCCESS - file is clean UTF-8');
} else {
  console.log('FAILED - still bad bytes');
  // Show the bad positions
  for (let i = 0; i < verify.length; i++) {
    if (verify[i] >= 0x80 && verify[i] < 0xC0) {
      const start = Math.max(0, i - 20);
      console.log(`Bad at ${i}: context = ${verify.slice(start, i + 20).toString('latin1')}`);
    }
  }
}