"use client";

import { Users, ChevronRight } from "lucide-react";
import { Avatar } from "@/components/shared/Avatar";
import type { ResearchGroup } from "@/types";
import type { Theme } from "@/lib/theme";

export function GroupSpotlightCard({ group, t }: { group: ResearchGroup; t: Theme }) {
  return (
    <div
      className="group-card"
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar seed={group.seed} size={44} />
        <div style={{ minWidth: 0 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: t.textSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Grupo de investigación
          </span>
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: t.textPrimary,
              letterSpacing: "-0.015em",
              marginTop: 2,
            }}
          >
            {group.name}
          </h3>
        </div>
      </div>
      <p
        style={{
          fontSize: 13,
          color: t.textSecondary,
          lineHeight: 1.55,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {group.focus}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <span style={{ fontSize: 11, color: t.textTertiary, display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Users size={11} /> {group.members} miembros · {group.dept}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: t.accent, display: "inline-flex", alignItems: "center", gap: 3 }}>
          Ver <ChevronRight size={12} />
        </span>
      </div>
    </div>
  );
}
