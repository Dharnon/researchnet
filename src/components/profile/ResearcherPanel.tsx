"use client";

import { useEffect, useState } from "react";
import { Check, MessageCircle, Users, X, ArrowUpRight, BookOpen, Briefcase, Building2 } from "lucide-react";
import { Avatar } from "@/components/shared/Avatar";
import { AffinityBreakdown } from "./AffinityBreakdown";
import { PublicationsList, type PublicationEntry } from "./PublicationsList";
import type { Theme } from "@/lib/theme";
import type { Researcher } from "@/types";

type EnrichedProfile = {
  publications?: PublicationEntry[];
  skills?: string[];
  affiliation?: string | null;
};

export function ResearcherPanel({
  researcher,
  onClose,
  onConnect,
  onMessage,
  onOpenFull,
  isConnected,
  t,
}: {
  researcher: Researcher;
  onClose: () => void;
  onConnect: () => void;
  onMessage?: () => void;
  onOpenFull?: () => void;
  isConnected: boolean;
  t: Theme;
}) {
  const [enriched, setEnriched] = useState<EnrichedProfile | null>(null);
  const [loadingEnriched, setLoadingEnriched] = useState(false);

  useEffect(() => {
    const orcid = researcher.orcid;
    if (!orcid) return;
    let cancelled = false;
    setLoadingEnriched(true);
    fetch(`/api/orcid/profile/${encodeURIComponent(orcid)}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setEnriched({
          publications: data.publications ?? [],
          skills: data.skills ?? [],
          affiliation: data.affiliation ?? null,
        });
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLoadingEnriched(false);
      });
    return () => {
      cancelled = true;
    };
  }, [researcher.orcid]);

  const publications = enriched?.publications ?? [];
  const skills = enriched?.skills?.length ? enriched.skills : researcher.tags;
  const affiliation = enriched?.affiliation ?? researcher.affiliation ?? null;
  const pubsCount = publications.length > 0 ? publications.length : researcher.pubs;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          top: 64,
          background: "rgba(0,0,0,0.55)",
          zIndex: 39,
          backdropFilter: "blur(6px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 64,
          right: 0,
          bottom: 0,
          width: 420,
          maxWidth: "100vw",
          background: t.surface,
          borderLeft: `1px solid ${t.border}`,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          boxShadow: t.shadowHover,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: t.textSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Perfil · vista rápida
          </span>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: t.textTertiary,
              padding: 4,
              display: "flex",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Avatar seed={researcher.seed} size={64} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: t.textPrimary,
                  letterSpacing: "-0.02em",
                  marginBottom: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {researcher.name} {researcher.surname}
              </h2>
              <p style={{ fontSize: 12, color: t.textSecondary, marginBottom: 2 }}>{researcher.role}</p>
              <p style={{ fontSize: 11, color: t.textTertiary }}>{researcher.dept}</p>
              {researcher.open && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 6,
                    fontSize: 10,
                    fontWeight: 600,
                    color: "var(--open-color)",
                    background: "var(--open-bg)",
                    border: "1px solid var(--open-border)",
                    padding: "2px 8px",
                    borderRadius: 20,
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--open-dot)" }} />
                  Disponible para colaborar
                </span>
              )}
            </div>
          </div>

          <AffinityBreakdown score={researcher.match} breakdown={researcher.matchBreakdown} t={t} />

          {researcher.bio && (
            <Section title="Biografía" t={t}>
              <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.65 }}>{researcher.bio}</p>
            </Section>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            <Stat icon={<BookOpen size={14} />} value={pubsCount} label="Publicaciones" t={t} />
            <Stat icon={<Briefcase size={14} />} value={researcher.projects} label="Proyectos" t={t} />
            <Stat icon={<Building2 size={14} />} value={researcher.groups.length} label="Grupos" t={t} />
          </div>

          {affiliation && (
            <Section title="Afiliación" t={t}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  color: t.textPrimary,
                  background: t.surfaceHover,
                  border: `1px solid ${t.border}`,
                  padding: "6px 10px",
                  borderRadius: 8,
                }}
              >
                <Building2 size={12} style={{ color: t.textTertiary }} />
                {affiliation}
              </div>
            </Section>
          )}

          <Section title="Áreas de investigación" t={t}>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {skills.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: t.textSecondary,
                    background: t.surfaceHover,
                    border: `1px solid ${t.border}`,
                    padding: "4px 10px",
                    borderRadius: 20,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Section>

          {researcher.groups.length > 0 && (
            <Section title="Grupos" t={t}>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {researcher.groups.map((g) => (
                  <span
                    key={g}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: t.accent,
                      background: t.accentLight,
                      border: `1px solid ${t.accent}25`,
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </Section>
          )}

          <Section
            title={publications.length > 0 ? "Publicaciones recientes" : "Publicaciones"}
            t={t}
          >
            {loadingEnriched && publications.length === 0 ? (
              <p style={{ fontSize: 12, color: t.textTertiary }}>Cargando publicaciones…</p>
            ) : (
              <PublicationsList publications={publications} limit={3} t={t} />
            )}
          </Section>
        </div>

        <div
          style={{
            padding: "14px 20px",
            borderTop: `1px solid ${t.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            background: t.surface,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onConnect}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 8,
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                background: isConnected ? t.accentLight : t.accent,
                color: isConnected ? t.accent : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              {isConnected ? (
                <>
                  <Check size={14} /> Conectado
                </>
              ) : (
                <>
                  <Users size={14} /> Conectar
                </>
              )}
            </button>
            <button
              onClick={onMessage}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 8,
                border: `1px solid ${t.border}`,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                background: t.surface,
                color: t.textPrimary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <MessageCircle size={14} /> Mensaje
            </button>
          </div>
          {onOpenFull && (
            <button
              onClick={onOpenFull}
              style={{
                padding: "9px 14px",
                borderRadius: 8,
                border: `1px dashed ${t.border}`,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                background: "transparent",
                color: t.textSecondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "color 0.15s ease, border-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = t.accent;
                (e.currentTarget as HTMLButtonElement).style.borderColor = `${t.accent}60`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = t.textSecondary;
                (e.currentTarget as HTMLButtonElement).style.borderColor = t.border;
              }}
            >
              Ver perfil completo <ArrowUpRight size={13} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function Section({ title, children, t }: { title: string; children: React.ReactNode; t: Theme }) {
  return (
    <div>
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: t.textSecondary,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function Stat({ icon, value, label, t }: { icon: React.ReactNode; value: number; label: string; t: Theme }) {
  return (
    <div
      style={{
        background: t.surfaceHover,
        border: `1px solid ${t.border}`,
        borderRadius: 10,
        padding: "12px 8px",
        textAlign: "center",
      }}
    >
      <div style={{ color: t.textTertiary, marginBottom: 6, display: "flex", justifyContent: "center" }}>{icon}</div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: t.textPrimary,
          letterSpacing: "-0.03em",
          marginBottom: 2,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 10, color: t.textTertiary, fontWeight: 500 }}>{label}</div>
    </div>
  );
}
