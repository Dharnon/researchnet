"use client";

import { Avatar } from "@/components/shared/Avatar";
import type { Researcher } from "@/types";
import type { Theme } from "@/lib/theme";
import { coverFor } from "@/lib/cover";

export function FeaturedResearcherCard({
  researcher,
  quote,
  onSelect,
  t,
}: {
  researcher: Researcher;
  quote: string;
  onSelect: () => void;
  t: Theme;
}) {
  const cover = coverFor(researcher.seed);

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      className="card-accent"
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${t.accent}40`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.shadowHover;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = t.border;
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "14px 16px",
          background: cover.background,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ borderRadius: "50%", border: "3px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
          <Avatar seed={researcher.seed} size={52} />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              opacity: 0.9,
              display: "block",
              marginBottom: 2,
            }}
          >
            Desde el investigador
          </span>
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.015em",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {researcher.name} {researcher.surname}
          </p>
        </div>
      </div>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <p
          style={{
            fontSize: 13,
            color: t.textSecondary,
            lineHeight: 1.55,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          “{quote}”
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: "auto" }}>
          {researcher.tags.slice(0, 3).map((tag) => (
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
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
