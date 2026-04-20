const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix 1: em-dash + left curly quote -> em-dash + space in opportunity titles
// bytes: 0xe2 0x80 0x94 (em-dash) followed by 0xe2 0x80 0x9c (left curly quote)
const bad = Buffer.from([0xe2, 0x80, 0x94, 0xe2, 0x80, 0x9c]);
const good = Buffer.from([0xe2, 0x80, 0x94, 0x20]);
let result = Buffer.from(content, 'utf8');
let count = 0;
while (true) {
  const idx = result.indexOf(bad);
  if (idx < 0) break;
  result = Buffer.concat([result.slice(0, idx), good, result.slice(idx + bad.length)]);
  count++;
}
console.log(`Fixed ${count} em-dash+quote sequences`);
content = result.toString('utf8');

// Fix 2: Broken Áreas (A + nbsp + reas or A  reas)
content = content.replace(/\u00c1\u00a0reas|\u00c1  reas/g, '\u00c1reas');

// Fix 3: Avatar borderRadius: 10 -> "50%"
content = content.replace(
  /width: size, height: size, borderRadius: 10,/g,
  'width: size, height: size, borderRadius: "50%",'
);

// Fix 4: Detail panel groups hardcoded amber -> CSS var
content = content.replace(
  /color: "#D97706",\n(\s+)background: "rgba\(217,119,6,0\.08\)",/g,
  'color: "var(--accent)",\n$1background: "var(--accent-dim)",'
);

// Fix 5: Connected button mojibake
content = content.replace(/\u00e2\u2020\u2020 Connected/g, '\u2713 Conectado');
content = content.replace(/\u00e2\u201e Connected/g, '\u2713 Conectado');

// Fix 6: Messages empty state
content = content.replace(/Sin mensajes a\u00fann/g, 'Sin mensajes a\u00fan');
content = content.replace(/con\u00ef\u00bf\u00bdctate/g, 'con\u00e9ctate');

// Fix 7: Profile 'Abiertos a colaboracion' 
content = content.replace(/Abiertos a colaboraci.n$/gm, 'Abiertos a colaboraci\u00f3n');

// Fix 8: Network empty state
content = content.replace(/Tu red est\u00e1 vac\u00eda/g, 'Tu red est\u00e1 vac\u00eda');
content = content.replace(/con\u00e9ctate/g, 'con\u00e9ctate');

fs.writeFileSync('src/app/page.tsx', content);
console.log('All fixes applied');
