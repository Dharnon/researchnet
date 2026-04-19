"use client";

import type { Theme } from "@/lib/theme";

export function FinalCtaSection({
  t,
  onAction,
}: {
  t: Theme;
  onAction?: () => void;
}) {
  return (
    <section
      style={{
        borderTop: `1px solid ${t.border}`,
        paddingTop: 56,
        paddingBottom: 24,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <h2
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: t.textPrimary,
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          maxWidth: 680,
          fontFamily: "var(--font-playfair), Georgia, serif",
        }}
      >
        Hay muchos investigadores y oportunidades increíbles,
        <br />
        pero solo unos pocos encajan perfecto contigo.
      </h2>
      <p style={{ fontSize: 15, color: t.textSecondary, margin: 0 }}>
        Te ayudamos a encontrar los correctos.
      </p>
      <button
        onClick={onAction}
        style={{
          marginTop: 8,
          padding: "12px 28px",
          borderRadius: 999,
          border: "none",
          background: t.textPrimary,
          color: t.surface,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          transition: "transform 0.15s ease, opacity 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          (e.currentTarget as HTMLElement).style.opacity = "0.92";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.opacity = "1";
        }}
      >
        Encuentra tu próxima colaboración
      </button>
    </section>
  );
}
