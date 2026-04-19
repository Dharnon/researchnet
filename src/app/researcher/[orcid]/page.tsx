"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  Building2,
  Check,
  ExternalLink,
  MessageCircle,
  Users,
} from "lucide-react";
import { Avatar } from "@/components/shared/Avatar";
import { AffinityBreakdown } from "@/components/profile/AffinityBreakdown";
import { PublicationsList, type PublicationEntry } from "@/components/profile/PublicationsList";
import { computeAffinity } from "@/lib/affinity";
import { light, dark, type Theme } from "@/lib/theme";
import type { MatchBreakdown } from "@/types";

type ResearcherProfile = {
  orcid: string;
  name: string;
  role: string | null;
  department: string | null;
  bio: string | null;
  affiliation: string | null;
  openToCollab: boolean | null;
  email: string | null;
  createdAt?: string | null;
  publications: PublicationEntry[];
  skills: string[];
};

type SessionUser = {
  orcid: string;
  name: string;
  department?: string | null;
  skills?: string[];
};

export default function ResearcherFullPage({ params }: { params: Promise<{ orcid: string }> }) {
  const { orcid } = use(params);
  const [profile, setProfile] = useState<ResearcherProfile | null>(null);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"overview" | "publications" | "network" | "collab">("overview");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const stored = document.documentElement.dataset.theme;
    if (stored === "dark" || stored === "light") setTheme(stored);
  }, []);
  const t: Theme = theme === "dark" ? dark : light;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([
      fetch(`/api/orcid/profile/${encodeURIComponent(orcid)}`, { cache: "no-store" }).then((r) => {
        if (!r.ok) throw new Error(`Profile not found`);
        return r.json();
      }),
      fetch(`/api/user`, { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([profileData, userData]) => {
        if (cancelled) return;
        setProfile({
          orcid: profileData.orcid,
          name: profileData.name,
          role: profileData.role,
          department: profileData.department,
          bio: profileData.bio,
          affiliation: profileData.affiliation,
          openToCollab: profileData.openToCollab,
          email: profileData.email,
          createdAt: profileData.createdAt,
          publications: profileData.publications ?? [],
          skills: profileData.skills ?? [],
        });
        if (userData) {
          setSessionUser({
            orcid: userData.orcid,
            name: userData.name,
            department: userData.department,
            skills: userData.skills ?? [],
          });
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e.message ?? "Error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orcid]);

  const affinity = useMemo<{ score: number; breakdown: MatchBreakdown }>(() => {
    if (!profile) return { score: 0, breakdown: { sharedSkills: [], sameDept: false, sharedPaperTopics: 0, hasData: false } };
    const b = computeAffinity(
      sessionUser?.skills ?? [],
      profile.skills,
      sessionUser?.department,
      profile.department,
      0,
    );
    return {
      score: b.score,
      breakdown: {
        sharedSkills: b.sharedSkills,
        sameDept: b.sameDept,
        sharedPaperTopics: b.sharedPaperTopics,
        hasData: b.hasData,
      },
    };
  }, [profile, sessionUser]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", color: t.textSecondary, fontSize: 14 }}>
        Cargando perfil…
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div style={{ minHeight: "100vh", background: t.bg, padding: 40, color: t.textPrimary }}>
        <Link href="/" style={{ color: t.accent, fontSize: 13 }}>← Volver</Link>
        <div style={{ marginTop: 40, maxWidth: 520, padding: 40, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, textAlign: "center" }}>
          <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Perfil no encontrado</p>
          <p style={{ fontSize: 13, color: t.textSecondary }}>
            No pudimos cargar el perfil de <code style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>{orcid}</code>.
          </p>
        </div>
      </div>
    );
  }

  const name = profile.name || "Investigador";
  const seed = name;
  const tabs = [
    { id: "overview" as const, label: "Perfil" },
    { id: "publications" as const, label: `Publicaciones (${profile.publications.length})` },
    { id: "network" as const, label: "Red" },
    { id: "collab" as const, label: "Colaboraciones" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.textPrimary }}>
      <div
        style={{
          background: `linear-gradient(180deg, ${t.surface}, ${t.bg})`,
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 0" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: t.textSecondary,
              textDecoration: "none",
              marginBottom: 20,
            }}
          >
            <ArrowLeft size={14} /> Volver al Discover
          </Link>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 24 }}>
            <Avatar seed={seed} size={120} />
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                <h1
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    letterSpacing: "-0.035em",
                    color: t.textPrimary,
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  {name}
                </h1>
                {profile.openToCollab && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 11,
                      fontWeight: 700,
                      color: t.accent,
                      background: t.accentLight,
                      border: `1px solid ${t.accent}35`,
                      padding: "3px 10px",
                      borderRadius: 20,
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.accent }} />
                    Disponible para colaborar
                  </span>
                )}
              </div>
              {profile.role && <p style={{ fontSize: 14, color: t.textSecondary, marginBottom: 2 }}>{profile.role}</p>}
              {profile.department && <p style={{ fontSize: 13, color: t.textTertiary, marginBottom: 8 }}>{profile.department}</p>}
              {profile.affiliation && (
                <p style={{ fontSize: 12, color: t.textTertiary, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                  <Building2 size={12} /> {profile.affiliation}
                </p>
              )}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                <button
                  onClick={() => setConnected((c) => !c)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 10,
                    border: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    background: connected ? t.accentLight : t.accent,
                    color: connected ? t.accent : "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {connected ? (
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
                  style={{
                    padding: "10px 18px",
                    borderRadius: 10,
                    border: `1px solid ${t.border}`,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    background: t.surface,
                    color: t.textPrimary,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <MessageCircle size={14} /> Mensaje
                </button>
                <a
                  href={`https://orcid.org/${profile.orcid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 18px",
                    borderRadius: 10,
                    border: `1px solid ${t.border}`,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    background: t.surface,
                    color: t.textSecondary,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <ExternalLink size={13} /> ORCID
                </a>
              </div>
            </div>
            <div style={{ width: 260, flexShrink: 0 }}>
              <AffinityBreakdown score={affinity.score} breakdown={affinity.breakdown} t={t} />
            </div>
          </div>

          <nav style={{ display: "flex", gap: 2, borderBottom: `1px solid ${t.border}`, marginBottom: -1 }}>
            {tabs.map((tb) => {
              const active = tab === tb.id;
              return (
                <button
                  key={tb.id}
                  onClick={() => setTab(tb.id)}
                  style={{
                    padding: "12px 16px",
                    border: "none",
                    background: "transparent",
                    fontSize: 13,
                    fontWeight: 600,
                    color: active ? t.textPrimary : t.textTertiary,
                    cursor: "pointer",
                    borderBottom: active ? `2px solid ${t.accent}` : "2px solid transparent",
                    transition: "color 0.15s ease, border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLButtonElement).style.color = t.textSecondary;
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLButtonElement).style.color = t.textTertiary;
                  }}
                >
                  {tb.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" }}>
        {tab === "overview" && <OverviewTab profile={profile} affinity={affinity} t={t} />}
        {tab === "publications" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.02em" }}>
              Publicaciones ({profile.publications.length})
            </h2>
            <PublicationsList publications={profile.publications} t={t} />
          </div>
        )}
        {tab === "network" && (
          <EmptyTab
            t={t}
            title="Red de colaboración"
            desc="Próximamente: verás las conexiones comunes y la red de co-autoría de este investigador."
          />
        )}
        {tab === "collab" && (
          <EmptyTab
            t={t}
            title="Colaboraciones activas"
            desc="Próximamente: proyectos en curso, convocatorias abiertas y grupos a los que pertenece."
          />
        )}
      </div>
    </div>
  );
}

function OverviewTab({
  profile,
  affinity,
  t,
}: {
  profile: ResearcherProfile;
  affinity: { score: number; breakdown: MatchBreakdown };
  t: Theme;
}) {
  const topPubs = profile.publications.slice(0, 5);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {profile.bio && (
          <Card t={t} title="Biografía">
            <p style={{ fontSize: 14, color: t.textSecondary, lineHeight: 1.75 }}>{profile.bio}</p>
          </Card>
        )}
        {profile.skills.length > 0 && (
          <Card t={t} title="Áreas de investigación">
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {profile.skills.map((s) => {
                const isShared = affinity.breakdown.sharedSkills.includes(s);
                return (
                  <span
                    key={s}
                    style={{
                      fontSize: 12,
                      fontWeight: isShared ? 700 : 500,
                      color: isShared ? t.accent : t.textSecondary,
                      background: isShared ? t.accentLight : t.surfaceHover,
                      border: `1px solid ${isShared ? `${t.accent}40` : t.border}`,
                      padding: "5px 12px",
                      borderRadius: 20,
                    }}
                  >
                    {s}
                  </span>
                );
              })}
            </div>
          </Card>
        )}
        <Card t={t} title="Publicaciones recientes">
          {topPubs.length > 0 ? (
            <PublicationsList publications={topPubs} t={t} />
          ) : (
            <p style={{ fontSize: 13, color: t.textTertiary }}>Sin publicaciones registradas aún.</p>
          )}
        </Card>
      </div>
      <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card t={t} title="Actividad">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <StatLine icon={<BookOpen size={14} />} label="Publicaciones" value={profile.publications.length} t={t} />
            <StatLine icon={<Briefcase size={14} />} label="Proyectos" value={0} t={t} />
            <StatLine
              icon={<Building2 size={14} />}
              label="Depto"
              value={profile.department ?? "—"}
              t={t}
            />
          </div>
        </Card>
      </aside>
    </div>
  );
}

function Card({ title, children, t }: { title: string; children: React.ReactNode; t: Theme }) {
  return (
    <section
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: 20,
        boxShadow: t.shadowCard,
      }}
    >
      <h3
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: t.textSecondary,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 14,
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

function StatLine({
  icon,
  label,
  value,
  t,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  t: Theme;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: t.surfaceHover,
          border: `1px solid ${t.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: t.textTertiary,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1, fontSize: 12, color: t.textSecondary }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: t.textPrimary }}>{value}</span>
    </div>
  );
}

function EmptyTab({ title, desc, t }: { title: string; desc: string; t: Theme }) {
  return (
    <div
      style={{
        padding: "80px 40px",
        textAlign: "center",
        background: t.surface,
        border: `1px dashed ${t.border}`,
        borderRadius: 14,
      }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 700, color: t.textPrimary, marginBottom: 8 }}>{title}</h2>
      <p style={{ fontSize: 13, color: t.textSecondary, maxWidth: 420, margin: "0 auto" }}>{desc}</p>
    </div>
  );
}
