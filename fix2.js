const fs = require('fs');
const f = 'C:\\Users\\josei\\researchnet\\src\\app\\page.tsx';
let c = fs.readFileSync(f, 'utf8');

// 1. Update the empty state background: use var(--bg) which is slightly lighter than var(--card-bg) in dark
// and the inner radial gradient glow
c = c.replace(
  `{connectedResearchers.length === 0 ? (\n            <div style={{\n              textAlign: "center", padding: "80px 32px",\n              background: "var(--surface)",\n              border: "1px solid var(--border)",\n              borderRadius: 20,\n              position: "relative", overflow: "hidden",\n            }}>`,
  `{connectedResearchers.length === 0 ? (\n            <div style={{\n              textAlign: "center", padding: "80px 32px",\n              background: "var(--bg)",\n              border: "1px solid var(--border)",\n              borderRadius: 20,\n              position: "relative", overflow: "hidden",\n            }}>`
);

// 2. Replace the static radial gradient with an animated glow pulse
// The first static glow div stays, but add a pulsing ring behind it
c = c.replace(
  `background: "radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />`,
  `background: "radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 100, height: 100,
                borderRadius: "50%",
                border: "1px solid rgba(132,204,22,0.15)",
                animation: "emptyGlow 2.5s ease-in-out infinite",
                pointerEvents: "none",
              }} />`
);

// 3. Add the glow animation to globals.css (will add to the style tag at top)
// Actually we need to add it to the component inline. Add keyframes via a style tag
// For simplicity, add via a style attribute with CSS-in-JS compatible animation
// Add the keyframe definition before the component (we'll add it in the existing style)
// Let's add a `<style>` tag with keyframes inside the component, before the empty state

// Add keyframes right before the network empty state div
const keyframes = `\n            {/* Glow pulse animation */}
            <style>{"
              @keyframes emptyGlow {
                0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
                50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.15; }
              }
            "}</style>\n            `;

// Insert before the empty state div
const insertMarker = `              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              position: "relative", overflow: "hidden",
            }}>`;
c = c.replace(insertMarker, insertMarker.replace('            }}>`', '            }}>' + keyframes));

// 4. Change title color from var(--text-primary) to var(--text-secondary)
c = c.replace(
  `color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.02em" }}>Tu red est`,
  `color: "var(--text-secondary)", marginBottom: 8, letterSpacing: "-0.02em" }}>Tu red est`
);

// 5. Enhance the CTA button with lime accent shadow and hover
c = c.replace(
  `<button onClick={() => setView("discover")} style={{
                padding: "10px 22px", borderRadius: 10,
                background: "var(--accent)", color: "#fff", border: "none",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
              }}>Descubrir investigadores</button>`,
  `<button onClick={() => setView("discover")} style={{
                padding: "10px 22px", borderRadius: 10,
                background: "var(--accent)", color: "#000", border: "none",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 0 20px var(--accent-glow), 0 2px 8px rgba(0,0,0,0.3)",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(132,204,22,0.25), 0 2px 8px rgba(0,0,0,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 20px var(--accent-glow), 0 2px 8px rgba(0,0,0,0.3)"; }}
              >Descubrir investigadores</button>`
);

fs.writeFileSync(f, c);
console.log('done');