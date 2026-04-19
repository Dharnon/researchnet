"use client";

import { Clock, Sparkles } from "lucide-react";
import type { Theme } from "@/lib/theme";

export type SortMode = "newest" | "affinity";

export function SortFilterBar({
  sort,
  onSortChange,
  departments,
  dept,
  onDeptChange,
  openOnly,
  onOpenOnlyChange,
  resultsCount,
  t,
}: {
  sort: SortMode;
  onSortChange: (s: SortMode) => void;
  departments: string[];
  dept: string;
  onDeptChange: (d: string) => void;
  openOnly: boolean;
  onOpenOnlyChange: (v: boolean) => void;
  resultsCount?: number;
  t: Theme;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap",
        padding: "14px 16px",
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        marginBottom: 18,
      }}
    >
      <div
        role="tablist"
        aria-label="Ordenar por"
        style={{
          display: "inline-flex",
          background: t.surfaceHover,
          border: `1px solid ${t.border}`,
          borderRadius: 999,
          padding: 3,
          gap: 2,
        }}
      >
        <SortPill
          active={sort === "newest"}
          onClick={() => onSortChange("newest")}
          icon={<Clock size={12} />}
          label="Recientes"
          t={t}
        />
        <SortPill
          active={sort === "affinity"}
          onClick={() => onSortChange("affinity")}
          icon={<Sparkles size={12} />}
          label="Afinidad"
          t={t}
        />
      </div>

      <select
        value={dept}
        onChange={(e) => onDeptChange(e.target.value)}
        style={{
          padding: "7px 10px",
          border: `1px solid ${t.border}`,
          borderRadius: 8,
          background: t.surface,
          color: t.textPrimary,
          fontSize: 12,
          fontWeight: 500,
          cursor: "pointer",
          outline: "none",
        }}
      >
        {departments.map((d) => (
          <option key={d} value={d}>
            {d === "Todos" ? "Todos los deptos" : d}
          </option>
        ))}
      </select>

      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          color: openOnly ? t.accent : t.textSecondary,
          cursor: "pointer",
          padding: "6px 10px",
          background: openOnly ? t.accentLight : "transparent",
          border: `1px solid ${openOnly ? `${t.accent}40` : t.border}`,
          borderRadius: 8,
          fontWeight: 600,
          userSelect: "none",
        }}
      >
        <input
          type="checkbox"
          checked={openOnly}
          onChange={(e) => onOpenOnlyChange(e.target.checked)}
          style={{ accentColor: t.accent, margin: 0 }}
        />
        Solo disponibles
      </label>

      {typeof resultsCount === "number" && (
        <span style={{ fontSize: 12, color: t.textTertiary, marginLeft: "auto" }}>
          {resultsCount} {resultsCount === 1 ? "resultado" : "resultados"}
        </span>
      )}
    </div>
  );
}

function SortPill({
  active,
  onClick,
  icon,
  label,
  t,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  t: Theme;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "6px 12px",
        background: active ? t.surface : "transparent",
        color: active ? t.textPrimary : t.textSecondary,
        border: "none",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: active ? t.shadowCard : "none",
        transition: "background 0.15s ease, color 0.15s ease",
      }}
    >
      {icon}
      {label}
    </button>
  );
}
