const fs = require('fs');
const cssPath = "C:\\Users\\josei\\researchnet\\src\\app\\globals.css";
let css = fs.readFileSync(cssPath, 'utf8');

const old = `  transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.researcher-card-a::before {\r\n  content: '';\r\n  position: absolute;\r\n  top: 0; left: 0; right: 0;\r\n  height: 2px;\r\n  background: linear-gradient(90deg, var(--accent), var(--accent-hover));\r\n  opacity: 0;\r\n  transition: opacity 0.22s;\r\n}\r\n.researcher-card-a:hover {\r\n  box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06);\r\n  border-color: #D1D5DB;\r\n  transform: translateY(-2px);\r\n}\r\n.researcher-card-a:hover::before { opacity: 1; }`;

const fixed = `  transition: box-shadow 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.22s, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.researcher-card-a::before {\r\n  content: '';\r\n  position: absolute;\r\n  top: 0; left: 0; right: 0;\r\n  height: 2.5px;\r\n  background: linear-gradient(90deg, var(--accent) 0%, var(--accent-hover) 100%);\r\n  opacity: 0;\r\n  transition: opacity 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94);\r\n}\r\n.researcher-card-a:hover {\r\n  box-shadow: 0 8px 32px rgba(0,0,0,0.11), 0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.07);\r\n  border-color: #d1d5db;\r\n  transform: translateY(-3px);\r\n}\r\n.researcher-card-a:hover::before { opacity: 1; }`;

if (css.includes(old)) {
  css = css.replace(old, fixed);
  console.log('Fixed researcher-card-a transitions + shadow + selection');
} else {
  console.log('Could not find exact block');
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Done');