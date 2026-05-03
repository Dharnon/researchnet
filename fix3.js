const fs = require('fs');
const f = 'C:\\Users\\josei\\researchnet\\src\\app\\page.tsx';
let c = fs.readFileSync(f, 'utf8');

const btnStart = c.indexOf('<button onClick={() => setView("discover")}');
if (btnStart === -1) {
  console.log('button not found');
  process.exit(1);
}
const btnEnd = c.indexOf('</button>', btnStart);
const btnEndFull = btnEnd + '</button>'.length;

const oldBtn = c.substring(btnStart, btnEndFull);
console.log('found button, old:');
console.log(JSON.stringify(oldBtn));

const newBtn = `<button
                onClick={() => setView("discover")}
                style={{
                  padding: "10px 22px", borderRadius: 10,
                  background: "var(--accent)", color: "#000", border: "none",
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 0 20px rgba(132,204,22,0.18), 0 2px 8px rgba(0,0,0,0.3)",
                  transition: "all 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(132,204,22,0.28), 0 2px 8px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(132,204,22,0.18), 0 2px 8px rgba(0,0,0,0.3)";
                }}
              >Descubrir investigadores</button>`;

c = c.substring(0, btnStart) + newBtn + c.substring(btnEndFull);
fs.writeFileSync(f, c);
console.log('done');