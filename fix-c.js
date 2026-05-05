const fs = require('fs');
let content = fs.readFileSync('src/app/globals.css', 'utf8');

const marker = '/* ─── SKELETON CARD (variant-c-warm: amber shimmer) ─── */';

const additions = `/* ─── CARD ENTER ANIMATION (variant-c: stagger entrance) ─── */\n@keyframes card-enter {\n  from { opacity: 0; transform: translateY(16px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n.card-enter {\n  animation: card-enter 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n\n/* ─── TOAST NOTIFICATIONS (variant-c) ─── */\n.toast {\n  position: fixed;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  animation: toast-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes toast-in {\n  from { opacity: 0; transform: translateY(12px) scale(0.96); }\n  to { opacity: 1; transform: translateY(0) scale(1); }\n}\n@keyframes toast-out {\n  from { opacity: 1; transform: translateY(0) scale(1); }\n  to { opacity: 0; transform: translateY(8px) scale(0.97); }\n}\n.toast.leaving { animation: toast-out 0.3s ease forwards; }\n.toast-icon {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: var(--accent);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n\n/* ─── SEARCH INPUT WRAP (variant-c: focus-within ring) ─── */\n.search-input-wrap {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 10px;\n  padding: 8px 12px;\n  flex: 1;\n  transition: border-color 0.18s, box-shadow 0.18s;\n}\n.search-input-wrap:focus-within {\n  border-color: var(--accent);\n  box-shadow: 0 0 0 3px rgba(217,119,6,0.12);\n}\n\n/* ─── MESSAGE INPUT ROW (variant-c: flex row) ─── */\n.msg-input-row {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  padding: 16px 20px;\n  border-top: 1px solid var(--border);\n  flex-shrink: 0;\n}\n\n/* ─── SEND BUTTON (variant-c) ─── */\n.send-btn {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: none;\n  background: var(--accent);\n  color: #000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.15s;\n  flex-shrink: 0;\n}\n.send-btn:hover { background: var(--accent-hover); box-shadow: 0 2px 8px rgba(217,119,6,0.25); }\n.send-btn:active { transform: scale(0.96); }\n\n`;

if (!content.includes('.card-enter')) {
  content = content.replace(marker, additions + marker);
  fs.writeFileSync('src/app/globals.css', content);
  console.log('Added CSS to variant-c globals.css');
} else {
  console.log('Already has card-enter');
}