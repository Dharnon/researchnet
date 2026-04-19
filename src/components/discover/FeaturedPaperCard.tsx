"use client";

import { BookOpen } from "lucide-react";
import type { FeaturedPaper } from "@/types";
import type { Theme } from "@/lib/theme";
import { coverFor } from "@/lib/cover";

export function FeaturedPaperCard({
  paper,
  variant = "tall",
  t,
}: {
  paper: FeaturedPaper;
  variant?: "tall" | "compact";
  t: Theme;
}) {
  const href = paper.doi ? `https://doi.org/${paper.doi}` : undefined;
  const cover = coverFor(paper.title + paper.area);
  const isTall = variant === "tall";

  const content = (
    <>
      <div
        style={{
          position: "relative",
          height: isTall ? 220 : 120,
          borderRadius: 12,
          background: cover.background,
          overflow: "hidden",
          marginBottom: isTall ? 18 : 14,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            fontSize: 10,
            fontWeight: 700,
            color: "#fff",
            background: "rgba(0,0,0,0.28)",
            backdropFilter: "blur(6px)",
            padding: "4px 10px",
            borderRadius: 20,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <BookOpen size={10} /> Paper destacado
        </span>
        <span
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            fontSize: 11,
            color: "#fff",
            fontWeight: 600,
            letterSpacing: "0.01em",
            opacity: 0.94,
          }}
        >
          {paper.area}
        </span>
      </div>
      <h3
        style={{
          fontSize: isTall ? 20 : 15,
          fontWeight: 700,
          color: t.textPrimary,
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          marginBottom: 8,
          display: "-webkit-box",
          WebkitLineClamp: isTall ? 3 : 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          fontFamily: "var(--font-playfair), Georgia, serif",
        }}
      >
        {paper.title}
      </h3>
      <div style={{ fontSize: 12, color: t.textTertiary, lineHeight: 1.55 }}>
        {paper.authors[0]}
        {paper.authors.length > 1 ? ` +${paper.authors.length - 1}` : ""} · {paper.journal} · {paper.year}
      </div>
      <div
        style={{
          marginTop: "auto",
          paddingTop: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        {typeof paper.citations === "number" && paper.citations > 0 ? (
          <span style={{ fontSize: 11, color: t.textSecondary, fontWeight: 600 }}>
            {paper.citations} citas
          </span>
        ) : <span />}
        <span
          style={{
            fontSize: 12,
            color: t.accent,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          Leer artículo →
        </span>
      </div>
    </>
  );

  const commonStyle: React.CSSProperties = {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 16,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textDecoration: "none",
    color: "inherit",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={commonStyle}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = `${t.accent}40`;
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = t.shadowHover;
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = t.border;
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        }}
      >
        {content}
      </a>
    );
  }
  return <div style={commonStyle}>{content}</div>;
}
