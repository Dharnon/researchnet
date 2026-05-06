// Fix A: Avatar component upgrade
const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// Fix: Avatar glow is now per-hover state (clean)
const oldAvatar = `function Avatar({ initials, color, size = 44 }: { initials: string; color: string; size?: number }) {
  const [hovered, setHovered] = useState(false);
  const s = Math.round(size * 0.34);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: size, height: size, borderRadius: "50%",
        background: \`radial-gradient(circle at 35% 35%, \${color}ee, \${color}55 45%, \${color}18)\`,
        border: \`1.5px solid \${color}50\`,
        boxShadow: \`0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 1px rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.4)\${hovered ? \`, 0 0 12px \${color}30\` : ""}\`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: s, fontWeight: 800, color,
        flexShrink: 0, letterSpacing: "-0.03em",
        transition: "box-shadow 0.22s ease, transform 0.22s ease",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        cursor: "default",
      }}>
      {initials}
    </div>
  );
}`;

const newAvatar = `function Avatar({ initials, color, size = 44 }: { initials: string; color: string; size?: number }) {
  const [hovered, setHovered] = useState(false);
  const s = Math.round(size * 0.34);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: size, height: size, borderRadius: "50%",
        background: \`linear-gradient(135deg, \${color}22 0%, \${color}08 100%)\`,
        border: \`1.5px solid \${hovered ? color + "a0" : color + "38"}\`,
        boxShadow: hovered
          ? \`0 0 0 1px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.45), 0 0 16px \${color}20, inset 0 1px 0 rgba(255,255,255,0.07)\`
          : \`0 0 0 1px rgba(255,255,255,0.04), 0 1px 3px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)\`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: s, fontWeight: 800, color,
        flexShrink: 0, letterSpacing: "-0.03em",
        transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
        transform: hovered ? "scale(1.06)" : "scale(1)",
        cursor: "default",
      }}>
      {initials}
    </div>
  );
}`;

if (content.includes('radial-gradient(circle at 35% 35%, ${color}ee')) {
  content = content.replace(oldAvatar, newAvatar);
  console.log('Avatar fixed');
} else {
  console.log('Avatar already updated or pattern not found');
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Done');