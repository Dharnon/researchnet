"use client";

import type { ResearchArea } from "@/types";
import type { Theme } from "@/lib/theme";
import {
  Brain,
  Cpu,
  Dna,
  Microscope,
  Atom,
  Bot,
  Eye,
  Activity,
  Scissors,
  Zap,
  Layers,
  Database,
  HeartPulse,
  Scale,
  Target,
  Lock,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const AREA_ICONS: Record<string, LucideIcon> = {
  "Machine Learning": Brain,
  Neurociencia: Activity,
  NLP: Cpu,
  Genómica: Dna,
  "Computación Cuántica": Atom,
  Robótica: Bot,
  "Computer Vision": Eye,
  Epidemiología: HeartPulse,
  CRISPR: Scissors,
  BCI: Zap,
  "Deep Learning": Layers,
  Bioinformática: Database,
  "Salud Digital": HeartPulse,
  "Ética en IA": Scale,
  "Reinforcement Learning": Target,
  Criptografía: Lock,
  Microscopía: Microscope,
};

function iconFor(name: string): LucideIcon {
  return AREA_ICONS[name] ?? Sparkles;
}

export function AreasCloud({
  areas,
  onSelect,
  t,
}: {
  areas: ResearchArea[];
  onSelect: (name: string) => void;
  t: Theme;
}) {
  return (
    <section
      style={{
        borderTop: `1px solid ${t.border}`,
        paddingTop: 40,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: t.textPrimary,
          letterSpacing: "-0.03em",
          fontFamily: "var(--font-playfair), Georgia, serif",
          textAlign: "center",
        }}
      >
        Descubre áreas de investigación
      </h2>
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 900,
        }}
      >
        {areas.map((a) => {
          const Icon = iconFor(a.name);
          return (
            <button
              key={a.name}
              onClick={() => onSelect(a.name)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                color: t.textPrimary,
                cursor: "pointer",
                transition: "border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = t.textPrimary;
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = t.shadowHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = t.border;
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              <Icon size={14} strokeWidth={1.8} />
              {a.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
