"use client";

import { Avatar } from "@/components/shared/Avatar";
import type { Researcher } from "@/types";
import type { Theme } from "@/lib/theme";

export function ResearcherCard({
  researcher,
  onSelect,
  onConnect,
  isConnected,
  t,
}: {
  researcher: Researcher;
  onSelect: () => void;
  onConnect: (e: React.MouseEvent) => void;
  isConnected: boolean;
  t: Theme;
}) {
  const hasAffinity = researcher.matchBreakdown?.hasData ?? true;
  const match = researcher.match;

  return (
    <div
      onClick={onSelect}
      className="card-accent researcher-card"
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: 20,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Avatar seed={researcher.seed} size={52} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {researcher.name} {researcher.surname}
            </span>
            {hasAffinity && <AffinityPill match={match} t={t} />}
          </div>
          <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.3, marginBottom: 1 }}>{researcher.role}</p>
          <p style={{ fontSize: 11, color: t.textTertiary }}>{researcher.dept}</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {researcher.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: t.textSecondary,
              background: t.surfaceHover,
              border: `1px solid ${t.border}`,
              padding: "3px 8px",
              borderRadius: 4,
              letterSpacing: "0.01em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4, borderTop: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ fontSize: 11, color: t.textSecondary }}>
            {researcher.pubs} <span style={{ fontWeight: 600, color: t.textPrimary }}>papers</span>
          </span>
          <span style={{ fontSize: 11, color: t.textSecondary }}>
            {researcher.projects} <span style={{ fontWeight: 600, color: t.textPrimary }}>proyectos</span>
          </span>
        </div>
        {researcher.open && (
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              color: "var(--open-dot)",
              background: "var(--open-dot-bg)",
              border: "1px solid var(--open-dot-border)",
              padding: "2px 7px",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              gap: 4,
              letterSpacing: "0.04em",
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--open-dot)" }} />Disponible
          </span>
        )}
        <button
          onClick={onConnect}
          style={{
            padding: "5px 12px",
            borderRadius: 6,
            border: `1px solid ${isConnected ? t.accent + "40" : t.border}`,
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
            background: "transparent",
            color: isConnected ? t.accent : t.textSecondary,
            transition: "all 0.15s",
          }}
        >
          {isConnected ? "✓ Conectado" : "+ Conectar"}
        </button>
      </div>
    </div>
  );
}

function AffinityPill({ match, t }: { match: number; t: Theme }) {
  const color = match >= 85 ? t.accent : match >= 65 ? t.accent : t.textTertiary;
  const bg = match >= 65 ? t.accentLight : "transparent";
  return (
    <span
      title={`${match}% de afinidad`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 10,
        fontWeight: 700,
        color,
        background: bg,
        border: match >= 65 ? `1px solid ${t.accent}30` : `1px solid ${t.border}`,
        padding: "2px 7px",
        borderRadius: 10,
        letterSpacing: "0.01em",
        flexShrink: 0,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
          opacity: match >= 65 ? 1 : 0.5,
        }}
      />
      {match}%
    </span>
  );
}
