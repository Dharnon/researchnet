// Fix variant-a: add bio preview to ResearcherCard, fix text encoding
const fs = require('fs');
const path = 'C:\\Users\\josei\\researchnet\\src\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix encoding issues - text strings in UI
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
content = content.replace(/empezar a descubrir colaboradores/g, 'empezar a descubrir colaboradores');
content = content.replace(/Tu informacin se mantiene privada/g, 'Tu información se mantiene privada');
content = content.replace(/Tu red est.*vac.*a/g, 'Tu red está vacía');
content = content.replace(/contrate para construir tu red de colaboraci.*n/g, 'contráctate para construir tu red de colaboración');
content = content.replace(/auto-completar tu informacin/g, 'auto-completar tu información');
content = content.replace(/l.mite:/g, 'límite:');

// Add bio preview after the avatar section in ResearcherCard
// Find the closing of the avatar div and insert bio preview
const bioPreview = `<p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
        {researcher.bio}
      </p>

      `;

// Insert bio preview before the tags div in the card
const tagDivPattern = /(<div style=\{\{ display: "flex", gap: 5, flexWrap: "wrap", position: "relative" \}\}>)/;
content = content.replace(tagDivPattern, bioPreview + '$1');

fs.writeFileSync(path, content, 'utf8');
console.log('variant-a page.tsx updated');