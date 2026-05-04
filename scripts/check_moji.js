const fs = require('fs');
const c = fs.readFileSync('src/app/page.tsx', 'utf8');

// Check researcher data for mojibake - line 15-17
const lines = c.split('\n');
[14, 15, 16, 17, 18].forEach(i => {
  console.log('Line ' + (i+1) + ':', lines[i].slice(0, 80));
});

// Check mock messages
const msgStart = c.indexOf('orcid: "0000-0002-1234-5678"');
if (msgStart >= 0) {
  const snippet = c.slice(msgStart, msgStart+600);
  const bad = [...snippet].filter(ch => {
    const code = ch.charCodeAt(0);
    return code > 127 && code < 256 && !'áéíóúñüÁÉÍÓÚÑÜ'.includes(ch) && ch !== '\n' && ch !== '\r';
  });
  if (bad.length) {
    console.log('Bad Latin chars in messages:', bad.map(ch => ch + ' U+' + ch.charCodeAt(0).toString(16).toUpperCase()));
  } else {
    console.log('Messages section: OK (no bad Latin chars)');
  }
  console.log('Messages snippet:', JSON.stringify(snippet.slice(0, 200)));
}