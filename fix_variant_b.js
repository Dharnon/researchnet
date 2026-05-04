// Fix variant-b: add bio preview to ResearcherCard, fix encoding in UI text
const fs = require('fs');
const path = 'C:\\Users\\josei\\researchnet\\src\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix encoding issues in UI text strings
content = content.replace(/Sin mensajes an/g, 'Sin mensajes aún');
content = content.replace(/Conctate con investigadores y empieza una conversacin/g, 'Conéctate con investigadores y empieza una conversación');
content = content.replace(/Ver ms <ChevronRight/g, 'Ver más <ChevronRight');
content = content.replace(/Ms informacin/g, 'Más información');
content = content.replace(/informacin de investigador/g, 'información de investigador');
content = content.replace(/Abiertos a colaboracin/g, 'Abiertos a colaboración');
content = content.replace(/Acciones rpidas/g, 'Acciones rápidas');
content = content.replace(/Ver mi perfil pblico/g, 'Ver mi perfil público');
content = content.replace(/Invitar a un colega/g, 'Invitar a un colega');
content = content.replace(/Exportar mi CV/g, 'Exportar mi CV');
content = content.replace(/Tu informacin se mantiene privada/g, 'Tu información se mantiene privada');
content = content.replace(/auto-completar tu informacin/g, 'auto-completar tu información');
content = content.replace(/l.mite:/g, 'límite:');

// Bio preview to insert before tags div in ResearcherCard
const bioPreview = `<p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
        {researcher.bio}
      </p>

      `;

// Insert bio preview before tags div in the card
const tagDivPattern = /(<div style=\{\{ display: "flex", gap: 5, flexWrap: "wrap", position: "relative" \}\}>)/;
content = content.replace(tagDivPattern, bioPreview + '$1');

fs.writeFileSync(path, content, 'utf8');
console.log('variant-b page.tsx updated');