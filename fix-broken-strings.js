const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(file, 'utf8');

// Fix broken strings where var() was inserted inside a string literal
// Pattern: "text "var(X)"" -> "text var(X)"
// This happens when a string like "1px solid " already existed and var() was inserted
content = content.replace(/"var\(--([^"]+)\)"",/g, '"var(--$1)",');
content = content.replace(/"var\(--([^"]+)\)""/g, '"var(--$1)"');
content = content.replace(/,"var\(--([^"]+)\)"",/g, ',"var(--$1)",');
content = content.replace(/,"var\(--([^"]+)\)"}/g, ',"var(--$1)"}');

// Fix double quotes where var() was inserted: ""var(--X)"" -> "var(--X)"
content = content.replace(/""var\(--([^"]+)\)""/g, '"var(--$1)"');
content = content.replace(/""var\(--([^"]+)\)",/g, '"var(--$1)",');

// General: "text more "var(X) -> "text more var(X)
content = content.replace(/"var\(--([^"]+)\)" $/g, '"var(--$1)" ');

// Fix border specifically: "1px solid var(--border)" -> "1px solid var(--border)"
content = content.replace(/"1px solid var\(--([^)]+)\)"",/g, '"1px solid var(--$1)",');
content = content.replace(/"1px solid var\(--([^)]+)\)}/g, '"1px solid var(--$1)"}');

// Fix boxShadow, etc where similar patterns exist
// Pattern: "string"var(--X) -> "string var(--X)"
content = content.replace(/([a-z]): "([^"]+)"var\(--/g, '$1: "$2var(--');
content = content.replace(/var\(--([^)]+)\)""/g, 'var(--$1)"');

// Check for remaining patterns
const badPatterns = content.match(/'[^']*var\(--[^)]+\)"[^']*'/g);
if (badPatterns) {
    console.log('Potentially bad patterns:', badPatterns.slice(0, 5));
}

fs.writeFileSync(file, content, 'utf8');
console.log('Done. Checking build...');
