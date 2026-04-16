"use client";

import type { Theme } from "@/lib/theme";
import type { FounderQuote } from "@/lib/mock-data";
import { Avatar } from "@/components/shared/Avatar";
import { coverFor } from "@/lib/cover";
import { ChevronRight } from "lucide-react";

export function FromResearchersSection({
  quotes,
  t,
}: {
  quotes: FounderQuote[];
  t: Theme;
}) {
  if (quotes.length === 0) return null;

  const big1 = quotes[0];
  const big2 = quotes[1];
  const mid = quotes.slice(2, 4);

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
          Desde los investigadores
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
          Más entrevistas <ChevronRight size={12} />
        </a>
      </div>

      <div
        className="from-researchers-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        {big1 && <FounderBigCard q={big1} t={t} />}
        {mid.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {mid.map((q) => (
              <FounderMiniCard key={q.id} q={q} t={t} />
            ))}
          </div>
        )}
        {big2 && <FounderBigCard q={big2} t={t} />}
      </div>
    </section>
  );
}

function FounderBigCard({ q, t }: { q: FounderQuote; t: Theme }) {
  const cover = coverFor(q.seed);
  return (
    <article
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        overflow: "hidden",
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
          position: "relative",
          height: 220,
          background: cover.background,
          display: "flex",
          alignItems: "flex-end",
          padding: 16,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontSize: 10,
            fontWeight: 700,
            color: "#fff",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(6px)",
            padding: "4px 10px",
            borderRadius: 20,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {q.kicker ?? "Desde el investigador"}
        </div>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ borderRadius: "50%", border: "3px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.25)" }}>
            <Avatar seed={q.seed} size={56} />
          </div>
          <div style={{ color: "#fff", minWidth: 0 }}>
            <p style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.015em" }}>
              {q.name} {q.surname}
            </p>
            <p style={{ fontSize: 11, opacity: 0.85 }}>{q.role}</p>
          </div>
        </div>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <p
          style={{
            fontSize: 15,
            color: t.textPrimary,
            lineHeight: 1.45,
            letterSpacing: "-0.01em",
            fontFamily: "var(--font-playfair), Georgia, serif",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          “{q.quote}”
        </p>
        <span style={{ fontSize: 12, color: t.textTertiary, marginTop: "auto" }}>{q.affiliation}</span>
      </div>
    </article>
  );
}

function FounderMiniCard({ q, t }: { q: FounderQuote; t: Theme }) {
  const cover = coverFor(q.seed);
  return (
    <article
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: 14,
        display: "flex",
        gap: 12,
        cursor: "pointer",
        flex: 1,
        alignItems: "stretch",
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
          flexShrink: 0,
          width: 80,
          borderRadius: 10,
          background: cover.background,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 6,
        }}
      >
        <div style={{ borderRadius: "50%", border: "2px solid #fff" }}>
          <Avatar seed={q.seed} size={48} />
        </div>
      </div>
      <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: t.textTertiary,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {q.kicker ?? "Desde el investigador"}
        </span>
        <h4
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: t.textPrimary,
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {q.name} {q.surname} | {q.quote.split(" ").slice(0, 6).join(" ")}…
        </h4>
        <p
          style={{
            fontSize: 12,
            color: t.textSecondary,
            lineHeight: 1.45,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {q.quote}
        </p>
      </div>
    </article>
  );
}
