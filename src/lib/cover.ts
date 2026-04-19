/**
 * Deterministic gradient "cover" generator.
 *
 * Produces a CSS background (multi-stop gradient) that's always the same
 * for the same input string, so each paper/area/researcher gets a
 * recognisable, editorial-looking cover without real imagery.
 */

const PALETTES: [string, string, string][] = [
  ["#0f766e", "#14b8a6", "#a7f3d0"], // teal
  ["#1e3a8a", "#3b82f6", "#bfdbfe"], // blue
  ["#7c2d12", "#ea580c", "#fed7aa"], // orange
  ["#581c87", "#a855f7", "#e9d5ff"], // purple
  ["#064e3b", "#10b981", "#bbf7d0"], // emerald
  ["#7f1d1d", "#ef4444", "#fecaca"], // red
  ["#78350f", "#f59e0b", "#fde68a"], // amber
  ["#164e63", "#06b6d4", "#a5f3fc"], // cyan
  ["#0b3d2e", "#059669", "#6ee7b7"], // brand-ish green
  ["#3b0764", "#8b5cf6", "#ddd6fe"], // violet
];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type CoverStyle = {
  background: string;
  fg: string; // contrast color for text/icon on cover
  accent: string;
};

export function coverFor(seed: string): CoverStyle {
  const h = hash(seed || "x");
  const palette = PALETTES[h % PALETTES.length]!;
  const [dark, mid, light] = palette;
  const angle = 120 + (h % 90);
  const x = 20 + (h % 40);
  const y = 20 + ((h >> 3) % 50);

  const background = `linear-gradient(${angle}deg, ${dark} 0%, ${mid} 55%, ${light} 100%), radial-gradient(circle at ${x}% ${y}%, ${light}aa, transparent 55%)`;

  return { background, fg: "#ffffff", accent: mid };
}
