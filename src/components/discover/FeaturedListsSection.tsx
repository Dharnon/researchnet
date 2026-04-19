"use client";

import type { Theme } from "@/lib/theme";
import type { FeaturedList } from "@/lib/mock-data";
import { coverFor } from "@/lib/cover";
import { ChevronRight } from "lucide-react";

export function FeaturedListsSection({ lists, t }: { lists: FeaturedList[]; t: Theme }) {
  return (
    <section style={{ borderTop: `1px solid ${t.border}`, paddingTop: 40 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: t.textPrimary,
            letterSpacing: "-0.03em",
            fontFamily: "var(--font-playfair), Georgia, serif",
          }}
        >
          Lecturas destacadas
        </h2>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: t.textPrimary,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            textDecoration: "none",
          }}
        >
          Más lecturas <ChevronRight size={12} />
        </a>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {lists.map((l) => (
          <ListCard key={l.id} list={l} t={t} />
        ))}
      </div>
    </section>
  );
}

function ListCard({ list, t }: { list: FeaturedList; t: Theme }) {
  const cover = coverFor(list.title);
  return (
    <article
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${t.accent}40`;
        (e.currentTarget as HTMLElement).style.boxShadow = t.shadowHover;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = t.border;
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          height: 160,
          borderRadius: 10,
          background: cover.background,
          marginBottom: 14,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            fontSize: 10,
            fontWeight: 700,
            color: "#fff",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(6px)",
            padding: "4px 10px",
            borderRadius: 20,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {list.area}
        </span>
      </div>
      <h3
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: t.textPrimary,
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
          marginBottom: 8,
          fontFamily: "var(--font-playfair), Georgia, serif",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {list.title}
      </h3>
      <p
        style={{
          fontSize: 12,
          color: t.textSecondary,
          lineHeight: 1.55,
          marginBottom: 14,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {list.excerpt}
      </p>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 12,
        }}
      >
        <span style={{ color: t.textTertiary, fontWeight: 500 }}>
          {list.author} · {list.readTime}
        </span>
        <span
          style={{
            color: t.textPrimary,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          Leer <ChevronRight size={12} />
        </span>
      </div>
    </article>
  );
}
