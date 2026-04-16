"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import type { Theme } from "@/lib/theme";

export function CtaCard({
  title,
  description,
  cta,
  onAction,
  t,
}: {
  title: string;
  description: string;
  cta: string;
  onAction?: () => void;
  t: Theme;
}) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${t.accent}, ${t.accent}dd)`,
        border: "none",
        borderRadius: 16,
        padding: 18,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        height: "100%",
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: "rgba(255,255,255,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Sparkles size={15} />
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>{title}</h3>
      <p style={{ fontSize: 13, lineHeight: 1.55, opacity: 0.92, flex: 1 }}>{description}</p>
      <button
        onClick={onAction}
        style={{
          marginTop: "auto",
          padding: "9px 14px",
          background: "#fff",
          color: t.accent,
          borderRadius: 8,
          border: "none",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          alignSelf: "flex-start",
        }}
      >
        {cta} <ArrowRight size={12} />
      </button>
    </div>
  );
}
