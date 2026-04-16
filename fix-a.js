const fs = require('fs');
let content = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');

// Fix double-UTF-8-encoded mojibake -> proper UTF-8
// These come from UTF-8 text decoded as Latin-1 and re-encoded as UTF-8
content = content
  .replace(/\u00C3\u00A1/g, '\u00E1')  // Ã¡ -> á
  .replace(/\u00C3\u00A9/g, '\u00E9')  // Ã© -> é
  .replace(/\u00C3\u00AD/g, '\u00ED')  // Ã­ -> í
  .replace(/\u00C3\u00B3/g, '\u00F3')  // Ã³ -> ó
  .replace(/\u00C3\u00BA/g, '\u00FA')  // Ãº -> ú
  .replace(/\u00C3\u00B1/g, '\u00F1')  // Ã± -> ñ
  .replace(/\u00C3\u0089/g, '\u00C9')  // Ã‰ -> É
  .replace(/\u00C3\u0088/g, '\u00C8')  // Ãˆ -> È
  .replace(/\u00C3\u00A8/g, '\u00E8')  // Ã¨ -> è
  .replace(/\u00C3\u00AC/g, '\u00EC')  // Ã¬ -> ì
  .replace(/\u00C3\u00B2/g, '\u00F2')  // Ã² -> ò
  .replace(/\u00C3\u00B9/g, '\u00F9')  // Ã¹ -> ù
  .replace(/\u00C3\u00A0/g, '\u00E0')  // Ã  -> à
  .replace(/\u00C3\u00A8/g, '\u00E8')  // Ã¨ -> è
  .replace(/\u00C2\u20AC\u201C/g, '\u2013')  // â€" -> –
  .replace(/\u00C2\u20AC\u201D/g, '\u2014')  // â€" -> —
  .replace(/\u00C2\u20AC\u2019/g, '\u2019')  // â€' -> '
  .replace(/\u00C2\u20AC\u201C/g, '\u201C')  // â€" -> "
  .replace(/\u00C2\u20AC\u201D/g, '\u201D')  // â€" -> "
  .replace(/\u00C2\u20AC\u2018/g, '\u2018')  // â€' -> '
  .replace(/\u00C2\u20AC\u2019/g, '\u2019')  // â€' -> '
  .replace(/\u00C2\u20AC\u009C/g, '\u201C')  // â€œ -> "
  .replace(/\u00C2\u20AC\u009D/g, '\u201D')  // â€ž -> "
  .replace(/\u00C2\u20AC\u008C/g, '\u201C')  // â€Œ -> "
  .replace(/\u00C2\u20AC\u008D/g, '\u201D')  // â€� -> "
  .replace(/\u00C2\u201A/g, '\u201A')  // â€še -> ,
  .replace(/\u00C2\u201E/g, '\u201E')  // â€že -> ,
  .replace(/\u00C3\u2014/g, '\u00D7')  // Ã— -> ×
  .replace(/\u00C3\u00A2\u00C2\u201C Connected/g, '\u2713 Conectado')  // âœ" Connected -> ✓ Conectar
  .replace(/\u00C3\u00A2\u00C2\u201C/g, '\u2713 ')  // âœ" -> ✓
  .replace(/\u00C3\u00A2\u00C2\u009C/g, '\u201C')  // â€œ -> "
  .replace(/\u00C3\u00A2\u00C2\u009D/g, '\u201D')  // â€ž -> "
  .replace(/\u00C3\u00A2\u00C2\u20AC/g, '\u2013')  // â€¬ -> –
  .replace(/\u00C3\u00A2\u00C2\u201C/g, '\u2013')  // â€œ -> –
  .replace(/\u00C3\u00A2\u00C2\u201D/g, '\u2014')  // â€ -> —
  .replace(/\u00C3\u0083\u00C2\u00A7/g, '\u00D7')  // Ã— in windows-1252 -> ×
  .replace(/\u00C3\u0083\u00C2\u00A7/g, '\u00D7')  // Ã— -> ×
  // Fix common Spanish mojibake words
  .replace(/a\u00C3\u00BAn/g, 'a\u00FAn')  // aÃºn -> aún
  .replace(/b\u00C3\u00BAsqueda/g, 'b\u00FAsqueda')  // bÃºsqueda -> búsqueda
  .replace(/p\u00C3\u00BAblico/g, 'p\u00FAblico')  // pÃºblico -> público
  .replace(/l\u00C3\u00ADmite/g, 'l\u00EDmite')  // lÃ­mite -> límite
  .replace(/A\u00C3\u00B1/g, 'A\u00F1')  // AÃ± -> Añ
  .replace(/A\u00C3\u008D/g, 'A\u00D1')  // AÃ� -> Á
  // Fix opportunity title en-dashes (em-dash mojibake)
  .replace(/Colaboraci.n EU Horizon .+ Quantum/g, 'Colaboraci\u00F3n EU Horizon \u2013 Quantum')
  .replace(/Research Engineer .+ Vision Systems/g, 'Research Engineer \u2013 Vision Systems')
  .replace(/Postdoc .+ IA aplicada/g, 'Postdoc \u2013 IA aplicada a salud')
  .replace(/Tesis Doctoral .+ NLP/g, 'Tesis Doctoral \u2013 NLP Multiling\u00FCe')
  // Fix Connect button label
  .replace(/"Connect"/g, '"Conectar"')
  .replace(/Connect\u201C/g, 'Conectar')
  // Fix the garbled box-drawing chars in comments
  .replace(/\u2500+\u2500+\u2500+/g, '\u2500'.repeat(3));

fs.writeFileSync('C:/Users/josei/researchnet/src/app/page.tsx', content, 'utf8');
console.log('Done. Length:', content.length);
