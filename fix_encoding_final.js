const fs = require('fs');
let buf = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx');
let offset = 0;
let changed = 0;

function applyFix(buf, pos, insertBytes, replaceLen = 0) {
  const actualPos = pos + offset;
  if (replaceLen > 0) {
    buf = Buffer.concat([buf.slice(0, actualPos), insertBytes, buf.slice(actualPos + replaceLen)]);
    offset += insertBytes.length - replaceLen;
  } else {
    buf = Buffer.concat([buf.slice(0, actualPos), insertBytes, buf.slice(actualPos)]);
    offset += insertBytes.length;
  }
  changed++;
  return buf;
}

// Fix 1: "Dr. Andrs Leal" → "Dr. Andrés Leal"
// "Dr. "=4, "Andr"=4, 's'=pos8 → insert é after "Dr. Andr" = pos 1639+8 = 1647
buf = applyFix(buf, 1647, Buffer.from([0xC3, 0xA9]));

// Fix 2: "Salud Pblica" in researcher dept → insert 'u' after 'b' = "Pb" + rest
// "Salud "=6, "Pb"=2 → 'b' at pos 2063+8, insert 'u' after = pos 2063+9
buf = applyFix(buf, 2072, Buffer.from([0x75]));

// Fix 3: "Salud Pblica" in researcherColors → same offset relative to 5974
buf = applyFix(buf, 5983, Buffer.from([0x75]));

// Fix 4: "Colaboracin" → insert ó before 'n'
// "Colaboracin"=11 bytes, 'n' at pos+10=3289
buf = applyFix(buf, 3289, Buffer.from([0xC3, 0xB3]));

// Fix 5: "ms sobre" → insert á after 'm'
// 'm' at pos+0, 's' at pos+1 → insert after 'm' = pos+1
buf = applyFix(buf, 4674, Buffer.from([0xC3, 0xA1]));

// Fix 6: "queramos" → insert í before 'm'
// q=pos0 u=1 e=2 r=3 a=4 m=5 → insert before m = pos+5
buf = applyFix(buf, 4861, Buffer.from([0xC3, 0xAD]));

// Fix 7: "anlisis" → insert á after 'n'
// a=pos0 n=1 l=2 i=3 s=4 i=5 s=6 → insert after n = pos+2
// This fix inserts at 1569+offset(=0)=1569, adding 2 bytes, so offset becomes 2
buf = applyFix(buf, 1569, Buffer.from([0xC3, 0xA1]));
// After: offset=2

// Fix 8: "genticas" → insert é after 'n'  
// g=0 e=1 n=2 t=3 i=4 c=5 a=6 s=7 → insert after n = pos+3 (original), but now offset=2 so actual=1592+2=1594
// Original: g=1589+0, e=1589+1, n=1589+2=1591, t=1592...
// With offset=2: n shifts to 1591+2=1593, so insert at pos+3=1592+2=1594
// My applyFix uses pos+offset where pos is the ORIGINAL pos before ANY changes (1569, 1592, etc.)
// So for fix 8: actualPos = 1592 + offset(=2) = 1594 ← but I pass 1592 as pos
// applyFix(1592, [C3 A9]) → actualPos = 1592+2 = 1594 = correct!
// But wait, original "genticas" has 'n' at 1591 (2 bytes after start)
// After fix 7, "anlisis" now has 2 extra bytes before "genticas"
// So the byte at original 1589 (g) is now at 1589+2 = 1591
// And byte at original 1591 (n) is now at 1591+2 = 1593
// I want to insert AFTER 'n' which is at 1593. But my pos=1592 is the position 
// of the ORIGINAL 'g' (0), plus offset(2) = 1594? 
// applyFix: actualPos = 1592 + offset(=2) = 1594
// But 1592 is where the ORIGINAL 't' was! 't' = buf[1592] = the 't' in "genticas"
// I want to insert AFTER 'n' which is at buf[1593] (originally)
// After fix 7 shift: 'n' is now at 1593. I want to insert at 1594 (after 'n').
// applyFix with pos=1592 gives actualPos = 1592+2 = 1594 ← YES!
// buf[1592] = 't', buf[1593] = 'n' (shifted by 2 from original)
// Inserting at 1594 inserts AFTER 'n' = correct!
buf = applyFix(buf, 1592, Buffer.from([0xC3, 0xA9]));
// After: offset=4

// Fix 9: "edicin" → insert ó before 'n'
// e=0 d=1 i=2 c=3 i=4 n=5 → insert before 'n' = pos+6
// Original 'e' was at 1600. After offset=4, e is at 1604.
// Original 'n' was at 1605. After offset=4, n is at 1609.
// Insert at pos+6 = 1600+6 = 1606. With offset=4: actualPos = 1606+4 = 1610.
// buf[1610] should be 'n' (original 1605, now shifted by 4 = 1609+1=1610)... 
// Wait: original n=1605, shifted by 4 = 1609. So n is at buf[1609].
// I want to insert BEFORE n = at buf[1609]. But my result is at 1610 = AFTER n!
// I should use pos+5 = 1605 (insert before n at pos+5)... no wait:
// original n was at pos+5 (0-indexed). After fix 9, n shifts by 2 more.
// actual n position = 1605 + offset_befix9 (4) = 1609
// I want to insert at 1609 (before n).
// pos = 1600, so pos+5 = 1605. applyFix → actual = 1605 + 4 = 1609 ← YES!
// But I passed pos=1600 and then applyFix uses pos + offset_current
// The "pos" in applyFix call is the position relative to ORIGINAL file (before any fixes)
// For fix 9: pos = 1600 (original 'e'). applyFix: actual = 1600 + 4 = 1604
// Wait, I pass 1605 as the "pos" parameter for inserting before 'n'? No I pass 1605.
// applyFix(1605, [C3 B3], replaceLen=0) → actualPos = 1605 + 4 = 1609
// buf[1609] = 'n' (shifted by 4 from original position 1605)
// So inserting at 1609 inserts BEFORE 'n' (since 'n' is at 1609)?
// No, inserting at position X means inserting BEFORE the byte currently at X.
// If n is at 1609, inserting at 1609 inserts BEFORE n → correct!
buf = applyFix(buf, 1605, Buffer.from([0xC3, 0xB3]));
// After: offset=6

// Fix 10: "Diseo" → replace 'o' with ó (1→2 bytes)
// Original: "Diseo" starts at 1880, 'o' at 1884
// After fix 9, offset=6. 'o' shifts to 1884+6=1890.
// applyFix(1884, [C3 B3], 1) → actualPos = 1884+6=1890
// Replace buf[1890] ('o') with C3 B3 → "Diseño"
// offset += 2-1 = 1, new offset=7
buf = applyFix(buf, 1884, Buffer.from([0xC3, 0xB3]), 1);
// After: offset=7

// Fix 11: "cunticos" → insert á after 'u'
// c=0 u=1 n=2 t=3 i=4 c=5 o=6 s=7, original c at 1897
// Insert after 'u' = pos+2 = 1899
// After fix 10, offset=7. 'c' shifts to 1897+7=1904. 'u' at 1905.
// applyFix(1899, [C3 A1]) → actual = 1899+7 = 1906
// buf[1906] = 'u' (shifted by 7) → insert C3 A1 AFTER 'u' at 1906+1 = 1907
// Hmm, I want to insert AFTER 'u'. With pos=1899 (the 'c' original pos), I get:
// actualPos = 1899 + 7 = 1906 → this is where 'u' is (originally at 1898, shifted by 7)
// Inserting at 1906 inserts BEFORE 'u'. I want AFTER.
// I should use pos+2 = 1899+2 = 1901. applyFix → actual = 1901+7 = 1908 = AFTER 'u' ✓
buf = applyFix(buf, 1901, Buffer.from([0xC3, 0xA1]));
// After: offset=9

// Fix 12: "epidemiolgicos" → insert ó before 'g'
// e=0 p=1 i=2 d=3 e=4 m=5 i=6 o=7 l=8 g=9 i=10 c=11 o=12 s=13, original e at 2284
// Insert before 'g' = pos+9 = 2293
// After offset=9. 'e' shifts to 2284+9=2293. 'g' at 2293+9=2302.
// applyFix(2293, [C3 B3]) → actual = 2293+9 = 2302 → BEFORE 'g' (since 'g' at 2302) ✓
buf = applyFix(buf, 2293, Buffer.from([0xC3, 0xB3]));
// After: offset=11

// Fix 13: "percepcin" → replace "cin" with "ción"
// p=0 e=1 r=2 c=3 e=4 p=5 c=6 i=7 n=8, original p at 2614
// Replace 'c' at pos+6=2620 (3 bytes) with 5 bytes
// After offset=11. 'p' shifts to 2614+11=2625. 'c' at 2625+6=2631.
// applyFix(2619, [C3 B3 63 69 6E], 3) → actual = 2619+11 = 2630
// buf[2630] = original byte at 2619 = 'c' (of "cin", originally at 2619+1=2620)
// Wait: 2619 = 'c' position (pos of 'c' relative to original). 
// But in my script, I was using pos = 2614+6 = 2620. Let me check:
// I called applyFix(buf, 2619, ...). 
// If I pass 2620: applyFix → actual = 2620+11 = 2631
// buf[2631] = 'c' (originally at 2621, shifted by 11 = 2632... no.)
// Let me reconsider: the 3 bytes at original 2619,2620,2621 = 'c','i','n'
// After shift of 11: at 2630,2631,2632
// applyFix(2619, newBytes, 3) → actual = 2619+11 = 2630
// Insert newBytes BEFORE the 3 bytes at 2630-2632, then delete those 3
// Wait, applyFix replaces bytes at actualPos with newBytes, then keeps buf.slice(actualPos+replaceLen).
// So buf[2630..2632] = 'cin' = 3 bytes. Replaced with C3 B3 63 69 6E = 5 bytes.
// Insert BEFORE 'cin', replacing 'cin'. Correct!
// So I should pass pos=2619 (the 'c' of "cin", originally).
buf = applyFix(buf, 2619, Buffer.from([0xC3, 0xB3, 0x63, 0x69, 0x6E]), 3);
// After: offset += 5-3 = 13, new offset = 13+11=24... wait offset was 11, +=2, now offset=13

// Fix 14: "auunomos" → replace 'u' with 'tó'
// a=0 u=1 u=2 n=3 o=4 m=5 o=6 s=7, original a at 2643
// Replace 'u' at pos+1=2644 with "tó" (t=74, ó=C3 B3) = 3 bytes
// After offset=13. 'a' at 2643+13=2656. 'u' at 2656+1=2657.
// applyFix(2644, [74, C3 B3], 1) → actual = 2644+13 = 2657
// buf[2657] = 'u' (shifted from original 2644)  
// Replace with t(74) + ó(C3 B3) → 3 bytes for 1
// New string: a u t ó n o m o s → "autónomos" ✓
buf = applyFix(buf, 2644, Buffer.from([0x74, 0xC3, 0xB3]), 1);
// After: offset += 3-1 = 15, new offset = 13+15=... wait I'm double-counting.
// offset was 13 after fix 13. applyFix adds (3-1)=2 to offset. offset=15 now.

fs.writeFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', buf);

// Verify
const check = fs.readFileSync('C:\\Users\\josei\\researchnet\\src\\app\\page.tsx', 'utf8');
const clines = check.split('\n');
console.log('=== Verification ===');
console.log('L17 (Andrés):', clines[16].slice(0, 100));
console.log('L18 (Salud):', clines[17].slice(0, 100));
console.log('L19 (bio):', clines[18].slice(0, 100));
console.log('L25 (Colaboración):', clines[24].slice(0, 100));
console.log('L33 (queramos):', clines[32].slice(0, 120));
console.log('L34 (ms sobre):', clines[33].slice(0, 120));
console.log('L65 (researcherColors):', clines[64]);
console.log('Fixes applied:', changed);

const remaining = ['Andrs', 'Salud P', 'Colaboracin', 'monitorizacin', 'anlisis', 'genticas', 'edicin', 'Diseo ', 'cunticos', 'epidemiolgicos', 'percepcin', 'auunomos', 'queramos'];
const stillCorrupt = remaining.filter(c => check.includes(c));
if (stillCorrupt.length === 0) console.log('All clean!');
else console.log('Still:', stillCorrupt);