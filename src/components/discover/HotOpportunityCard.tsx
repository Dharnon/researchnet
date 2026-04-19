"use client";

import { Clock, Flame, ChevronRight } from "lucide-react";
import type { Opportunity } from "@/types";
import type { Theme } from "@/lib/theme";

export function HotOpportunityCard({
  opportunity,
  onSelect,
  t,
}: {
  opportunity: Opportunity;
  onSelect: () => void;
  t: Theme;
}) {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      style={{
        background: `linear-gradient(145deg, ${t.orange}15, ${t.surface})`,
        border: `1px solid ${t.orange}30`,
        borderRadius: 16,
        padding: 16,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        height: "100%",
        transition: "border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${t.orange}60`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.shadowHover;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${t.orange}30`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 10,
            fontWeight: 700,
            color: t.orange,
            background: `${t.orange}20`,
            padding: "3px 8px",
            borderRadius: 20,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <Flame size={10} /> Oportunidad hot
        </span>
        <span style={{ fontSize: 11, color: t.textTertiary }}>· {opportunity.type}</span>
      </div>
      <h3
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: t.textPrimary,
          lineHeight: 1.35,
          letterSpacing: "-0.015em",
        }}
      >
        {opportunity.title}
      </h3>
      <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.55 }}>{opportunity.dept}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <span
          style={{
            fontSize: 12,
            color: t.orange,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Clock size={11} /> Hasta {opportunity.deadline}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: t.accent, display: "inline-flex", alignItems: "center", gap: 3 }}>
          Ver <ChevronRight size={12} />
        </span>
      </div>
    </div>
  );
}
