"use client";

import { ArrowRight } from "lucide-react";
import type { Researcher } from "@/types";
import type { Theme } from "@/lib/theme";
import { ResearcherCard } from "./ResearcherCard";

export function ByAreaRow({
  area,
  researchers,
  count,
  connections,
  onSelectResearcher,
  onConnect,
  onViewAll,
  t,
}: {
  area: string;
  researchers: Researcher[];
  count: number;
  connections: Set<number>;
  onSelectResearcher: (r: Researcher) => void;
  onConnect: (id: number) => void;
  onViewAll: () => void;
  t: Theme;
}) {
  if (researchers.length === 0) return null;
  const visible = researchers.slice(0, 3);

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <h3
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: t.textPrimary,
            letterSpacing: "-0.02em",
          }}
        >
          {area}
        </h3>
        <button
          onClick={onViewAll}
          style={{
            background: "transparent",
            border: "none",
            fontSize: 12,
            fontWeight: 600,
            color: t.textPrimary,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            textDecoration: "underline",
            textDecorationColor: "transparent",
            transition: "text-decoration-color 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.textDecorationColor = t.textPrimary;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.textDecorationColor = "transparent";
          }}
        >
          Ver todos los {count} investigadores <ArrowRight size={12} />
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 14,
        }}
      >
        {visible.map((r) => (
          <ResearcherCard
            key={`${area}-${r.id}`}
            researcher={r}
            onSelect={() => onSelectResearcher(r)}
            onConnect={(e) => {
              e.stopPropagation();
              onConnect(r.id);
            }}
            isConnected={connections.has(r.id)}
            t={t}
          />
        ))}
      </div>
    </section>
  );
}
