const fs = require('fs');
let content = fs.readFileSync('src/app/globals.css', 'utf8');
const additions = `/* ─── MESSAGE INPUT ROW (variant-b: flex row) ─── */\n.msg-input-row {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  padding: 16px 20px;\n  border-top: 1px solid var(--border);\n  flex-shrink: 0;\n}\n`;
const marker = '/* ─── SEND BUTTON (variant-b) ─── */';
if (!content.includes('.msg-input-row')) {
  content = content.replace(marker, additions + marker);
  fs.writeFileSync('src/app/globals.css', content);
  console.log('Added msg-input-row');
} else {
  console.log('Already has msg-input-row');
}