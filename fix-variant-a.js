// Read the globals.css file and fix the garbled variant comments
const fs = require('fs');
const path = 'src/app/globals.css';

let content = fs.readFileSync(path, 'utf8');

// Fix the garbled comments in variant-a-clean branch
// The file has "variant-b-dark" in comments and vars declarations when it should be "variant-a-clean"
// Lines 1-2: Google Fonts and CSS VARIABLES comments
content = content.replace(
  '/* â\u0080\u009E\u0080\u009E Google Fonts (variant-b-dark: Deep Navy + Lime) â\u0080\u009E\u0080\u009E */',
  '/* â\u0080\u009E\u0080\u009E Google Fonts (variant-a-clean: Clean Classic, Dark Navy + Lime #84cc16) â\u0080\u009E\u0080\u009E */'
);
content = content.replace(
  '/* â\u0080\u009E\u0080\u009E CSS VARIABLES (variant-b-dark: Deep Navy Dark, Lime Accent #84cc16) â\u0080\u009E\u0080\u009E */',
  '/* â\u0080\u009E\u0080\u009E CSS VARIABLES (variant-a-clean: Deep Navy #0B0E17, Lime Accent #84cc16) â\u0080\u009E\u0080\u009E */'
);

// Fix the comment referencing variant-b-dark for match/connected/hot variables
content = content.replace(
  '/* Match score tiers; lime for variant-b-dark */',
  '/* Match score tiers; lime for variant-a-clean */'
);
content = content.replace(
  '/* Connected button; lime for variant-b-dark */',
  '/* Connected button; lime for variant-a-clean */'
);
content = content.replace(
  '/* Hot / deadline accent */',
  '/* Hot / deadline accent; lime for variant-a-clean */'
);

// Fix the skeleton shimmer comment
content = content.replace(
  '/* â\u0080\u009E\u0080\u009E SKELETON SHIMMER (variant-a-clean: Deep Navy + Lime #84cc16) â\u0080\u009E\u0080\u009E */',
  '/* â\u0080\u009E\u0080\u009E SKELETON SHIMMER (variant-a-clean: Deep Navy + Lime #84cc16) â\u0080\u009E\u0080\u009E */'
);

// Fix onboarding button comment
content = content.replace(
  '/* â\u0080\u009E\u0080\u009E ONBOARDING ORCID BUTTON (variant-a-clean) â\u0080\u009E\u0080\u009E */',
  '/* â\u0080\u009E\u0080\u009E ONBOARDING ORCID BUTTON (variant-a-clean) â\u0080\u009E\u0080\u009E */'
);

// Also fix border-radius: 12 to border-radius: var(--radius)
content = content.replace(
  'border-radius: 12;',
  'border-radius: var(--radius);'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed variant-a-clean globals.css');