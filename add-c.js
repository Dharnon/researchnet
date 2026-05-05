const fs = require('fs');
let c = fs.readFileSync('src/app/globals.css', 'utf8');
const additions = `

/* ─── CARD ENTER ANIMATION (variant-c: stagger entrance) ─── */
@keyframes card-enter {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.card-enter {
  animation: card-enter 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ─── TOAST NOTIFICATIONS (variant-c) ─── */
.toast {
  position: fixed;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: toast-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes toast-in {
  from { opacity: 0; transform: translateY(12px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes toast-out {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(8px) scale(0.97); }
}
.toast.leaving { animation: toast-out 0.3s ease forwards; }
.toast-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ─── SEARCH INPUT WRAP (variant-c: focus-within ring) ─── */
.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 12px;
  flex: 1;
  transition: border-color 0.18s, box-shadow 0.18s;
}
.search-input-wrap:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(217,119,6,0.12);
}

/* ─── MESSAGE INPUT ROW (variant-c: flex row) ─── */
.msg-input-row {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}

/* ─── SEND BUTTON (variant-c) ─── */
.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--accent);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}
.send-btn:hover { background: var(--accent-hover); box-shadow: 0 2px 8px rgba(217,119,6,0.25); }
.send-btn:active { transform: scale(0.96); }
`;
if (!c.includes('.card-enter')) {
  c = c + additions;
  fs.writeFileSync('src/app/globals.css', c);
  console.log('Done - added CSS');
} else {
  console.log('Already has card-enter');
}