"use client";

import { ExternalLink } from "lucide-react";
import type { Theme } from "@/lib/theme";

export type PublicationEntry = {
  id?: number | string;
  doi?: string | null;
  title: string;
  year?: number | null;
  journal?: string | null;
  citations?: number | null;
};

export function PublicationsList({
  publications,
  limit,
  t,
}: {
  publications: PublicationEntry[];
  limit?: number;
  t: Theme;
}) {
  const items = limit ? publications.slice(0, limit) : publications;

  if (items.length === 0) {
    return (
      <p style={{ fontSize: 12, color: t.textTertiary, fontStyle: "italic" }}>Sin publicaciones registradas.</p>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((p, i) => {
        const href = p.doi ? (p.doi.startsWith("http") ? p.doi : `https://doi.org/${p.doi}`) : null;
        const inner = (
          <>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: t.textPrimary,
                lineHeight: 1.4,
                marginBottom: 4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {p.title}
            </p>
            <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 11, color: t.textTertiary, flexWrap: "wrap" }}>
              {p.journal && <span style={{ fontStyle: "italic" }}>{p.journal}</span>}
              {p.year && (
                <>
                  <span>·</span>
                  <span>{p.year}</span>
                </>
              )}
              {typeof p.citations === "number" && p.citations > 0 && (
                <>
                  <span>·</span>
                  <span>{p.citations} citas</span>
                </>
              )}
              {href && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: t.accent, marginLeft: "auto" }}>
                  <ExternalLink size={10} /> DOI
                </span>
              )}
            </div>
          </>
        );
        const commonStyle: React.CSSProperties = {
          display: "block",
          padding: "10px 12px",
          borderRadius: 8,
          border: `1px solid ${t.border}`,
          background: t.surface,
          textDecoration: "none",
          transition: "border-color 0.15s ease, background 0.15s ease",
        };
        return (
          <li key={p.id ?? p.doi ?? i}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={commonStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${t.accent}40`;
                  (e.currentTarget as HTMLAnchorElement).style.background = t.surfaceHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = t.border;
                  (e.currentTarget as HTMLAnchorElement).style.background = t.surface;
                }}
              >
                {inner}
              </a>
            ) : (
              <div style={commonStyle}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
