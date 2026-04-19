"use client";

import { ChevronRight } from "lucide-react";
import type { ResearchArea } from "@/types";
import type { Theme } from "@/lib/theme";
import { coverFor } from "@/lib/cover";

export function AreaSpotlightCard({
  area,
  onSelect,
  variant = "cover",
  t,
}: {
  area: ResearchArea;
  onSelect: () => void;
  variant?: "cover" | "compact";
  t: Theme;
}) {
  const cover = coverFor(area.name);

  if (variant === "compact") {
    return (
      <button
        onClick={onSelect}
        style={{
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 16,
          padding: 16,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          height: "100%",
          textAlign: "left",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = `${t.accent}40`;
          (e.currentTarget as HTMLButtonElement).style.boxShadow = t.shadowHover;
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = t.border;
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: cover.background,
            }}
          />
          <ChevronRight size={14} color={t.textTertiary} />
        </div>
        <div style={{ marginTop: "auto" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.015em" }}>
            {area.name}
          </h3>
          <p style={{ fontSize: 12, color: t.textTertiary, marginTop: 2 }}>
            {area.count} investigadores
          </p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onSelect}
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: 16,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        height: "100%",
        textAlign: "left",
        overflow: "hidden",
        transition: "border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = `${t.accent}40`;
        (e.currentTarget as HTMLButtonElement).style.boxShadow = t.shadowHover;
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = t.border;
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          height: 96,
          borderRadius: 10,
          background: cover.background,
          marginBottom: 14,
        }}
      />
      <h3 style={{ fontSize: 16, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.02em" }}>
        {area.name}
      </h3>
      <p style={{ fontSize: 12, color: t.textSecondary, marginTop: 4 }}>
        {area.count} investigadores<br />activos ahora
      </p>
      <span
        style={{
          marginTop: "auto",
          paddingTop: 12,
          fontSize: 12,
          fontWeight: 600,
          color: t.accent,
          display: "inline-flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        Ver investigadores <ChevronRight size={12} />
      </span>
    </button>
  );
}
