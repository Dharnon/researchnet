const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');
c = c.replace(/\uFEFF/g, '');

const oldBlock =
  '      <div className="b-card-top">\r\n' +
  '        <Avatar initials={researcher.avatar} color={researcher.color} size={44} />\r\n' +
  '        <div style={{ flex: 1, minWidth: 0 }}>\r\n' +
  '          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 3 }}>\r\n' +
  '            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>{researcher.name}</span>\r\n' +
  '            <span style={{\r\n' +
  '              fontSize: 10, fontWeight: 700, color: "#65a30d",\r\n' +
  '              background: "rgba(101,163,13,0.08)", padding: "2px 7px", borderRadius: 20, flexShrink: 0,\r\n' +
  '            }}>\r\n' +
  '              {researcher.match}%\r\n' +
  '            </span>\r\n' +
  '          </div>\r\n' +
  '          <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.3 }}>{researcher.role}</p>\r\n' +
  '          <p style={{ fontSize: 10, color: "var(--text-subtle)", marginTop: 1 }}>{researcher.dept}</p>\r\n' +
  '        </div>\r\n' +
  '        {researcher.open && (\r\n' +
  '          <span style={{\r\n' +
  '            display: "inline-flex", alignItems: "center", gap: 4,\r\n' +
  '            fontSize: 9, fontWeight: 700, color: "#65a30d",\r\n' +
  '            background: "rgba(101,163,13,0.08)", padding: "2px 6px", borderRadius: 20,\r\n' +
  '            textTransform: "uppercase", letterSpacing: "0.05em", flexShrink: 0, alignSelf: "flex-start",\r\n' +
  '          }}>\r\n' +
  '            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#65a30d", display: "inline-block" }} />\r\n' +
  '            Open\r\n' +
  '          </span>\r\n' +
  '        )}\r\n' +
  '      </div>\r\n' +
  '      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>';

const newBlock =
  '      <div className="b-card-top">\r\n' +
  '        <Avatar initials={researcher.avatar} color={researcher.color} size={44} />\r\n' +
  '        <div style={{ flex: 1, minWidth: 0 }}>\r\n' +
  '          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, display: "block", marginBottom: 2 }}>{researcher.name}</span>\r\n' +
  '          <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.3 }}>{researcher.role} · {researcher.dept}</p>\r\n' +
  '        </div>\r\n' +
  '      </div>\r\n' +
  '      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>\r\n' +
  '        <span style={{ fontSize: 10, fontWeight: 700, color: "#65a30d", opacity: 0.65, letterSpacing: "-0.02em" }}>{researcher.match}%</span>\r\n' +
  '        {researcher.open && (\r\n' +
  '          <span style={{\r\n' +
  '            display: "inline-flex", alignItems: "center", gap: 3,\r\n' +
  '            fontSize: 8, fontWeight: 700, color: "#4ade80",\r\n' +
  '            background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.18)",\r\n' +
  '            padding: "2px 5px", borderRadius: 20,\r\n' +
  '            textTransform: "uppercase", letterSpacing: "0.06em",\r\n' +
  '          }}>\r\n' +
  '            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#4ade80" }} />\r\n' +
  '            Open\r\n' +
  '          </span>\r\n' +
  '        )}\r\n' +
  '      </div>\r\n' +
  '      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>';

if (c.includes(oldBlock)) {
  c = c.replace(oldBlock, newBlock);
  fs.writeFileSync('src/app/page.tsx', c);
  console.log('Applied! File written.');
} else {
  console.log('Pattern not found.');
}