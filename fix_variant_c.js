// Fix variant-c: fix encoding in UI text strings (bio preview already exists)
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

fs.writeFileSync(path, content, 'utf8');
console.log('variant-c page.tsx updated');