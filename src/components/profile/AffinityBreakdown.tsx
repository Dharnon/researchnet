"use client";

import { Check, Circle } from "lucide-react";
import type { Theme } from "@/lib/theme";
import type { MatchBreakdown } from "@/types";

export function AffinityBreakdown({
  score,
  breakdown,
  t,
}: {
  score: number;
  breakdown?: MatchBreakdown;
  t: Theme;
}) {
  const hasData = breakdown?.hasData ?? true;
  const sharedSkills = breakdown?.sharedSkills ?? [];
  const sameDept = breakdown?.sameDept ?? false;
  const sharedPapers = breakdown?.sharedPaperTopics ?? 0;

  if (!hasData) {
    return (
      <div
        style={{
          background: t.surfaceHover,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 800, color: t.textTertiary }}>—</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: t.textPrimary }}>Afinidad indisponible</div>
          <div style={{ fontSize: 11, color: t.textTertiary }}>Completa tu perfil con áreas para calcularla</div>
        </div>
      </div>
    );
  }

  const items = [
    {
      ok: sharedSkills.length > 0,
      label:
        sharedSkills.length > 0
          ? `${sharedSkills.length} ${sharedSkills.length === 1 ? "área en común" : "áreas en común"}`
          : "Sin áreas en común",
      detail: sharedSkills.slice(0, 3).join(" · "),
    },
    { ok: sameDept, label: sameDept ? "Mismo departamento" : "Departamento distinto" },
    {
      ok: sharedPapers > 0,
      label:
        sharedPapers > 0
          ? `${sharedPapers} ${sharedPapers === 1 ? "paper" : "papers"} en temas relacionados`
          : "Sin papers relacionados",
    },
  ];

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${t.accentLight}, ${t.surfaceHover})`,
        border: `1px solid ${t.accent}25`,
        borderRadius: 14,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span
          style={{
            fontSize: 34,
            fontWeight: 800,
            color: t.accent,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {score}
          <span style={{ fontSize: 16, fontWeight: 700 }}>%</span>
        </span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.01em" }}>Afinidad</div>
          <div style={{ fontSize: 11, color: t.textSecondary }}>según áreas, depto y papers</div>
        </div>
      </div>

      <div
        aria-hidden
        style={{
          height: 4,
          borderRadius: 999,
          background: `${t.accent}20`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${score}%`,
            height: "100%",
            background: t.accent,
            borderRadius: 999,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            {item.ok ? (
              <Check size={12} style={{ color: t.accent, flexShrink: 0 }} />
            ) : (
              <Circle size={12} style={{ color: t.textTertiary, flexShrink: 0 }} />
            )}
            <span style={{ color: item.ok ? t.textPrimary : t.textTertiary, fontWeight: item.ok ? 600 : 500 }}>{item.label}</span>
            {item.detail && item.ok && <span style={{ color: t.textSecondary, fontSize: 11 }}>· {item.detail}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
