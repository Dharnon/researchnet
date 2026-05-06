const fs = require('fs');
const c = fs.readFileSync('C:/Users/josei/researchnet/src/app/page.tsx', 'utf8');

// Find opp-card CSS class
const idx = c.indexOf('.opp-card');
if (idx >= 0) console.log('=== opp-card CSS at', idx, '===');
const match = c.match(/\.opp-card\s*\{[\s\S]{0,800}/);
if (match) console.log(match[0]);

// Find card-enter animation
const idx2 = c.indexOf('@keyframes card-enter');
if (idx2 >= 0) console.log('\n=== card-enter at', idx2, '===');
const match2 = c.match(/@keyframes card-enter\s*\{[\s\S]{0,400}/);
if (match2) console.log(match2[0]);

// Find .researcher-card-c styles  
const match3 = c.match(/\.researcher-card-c\s*\{[\s\S]{0,400}/);
if (match3) console.log('\n=== researcher-card-c at', c.indexOf('.researcher-card-c'), '===');
if (match3) console.log(match3[0]);