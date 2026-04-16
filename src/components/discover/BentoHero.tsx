"use client";

import type { Theme } from "@/lib/theme";
import type { ResearchArea, Opportunity } from "@/types";
import type {
  FeaturedList,
  FounderQuote,
  ResearchProject,
  ResearchHub,
} from "@/lib/mock-data";
import { researchAreas as mockAreas } from "@/lib/mock-data";
import { Avatar } from "@/components/shared/Avatar";
import { coverFor } from "@/lib/cover";
import {
  ChevronRight,
  Flame,
  Users,
  ArrowRight,
  type LucideIcon,
  Brain,
  Cpu,
  Dna,
  Atom,
  Bot,
  Eye,
  Activity,
  Zap,
  Sparkles,
} from "lucide-react";

export function BentoHero({
  lists,
  quotes,
  projects,
  hubs,
  areas,
  opportunity,
  t,
  onOpenOpportunity,
  onOpenArea,
  onOpenGroups,
}: {
  lists: FeaturedList[];
  quotes: FounderQuote[];
  projects: ResearchProject[];
  hubs: ResearchHub[];
  areas: ResearchArea[];
  opportunity?: Opportunity;
  t: Theme;
  onOpenOpportunity?: () => void;
  onOpenArea?: (name: string) => void;
  onOpenGroups?: () => void;
}) {
  const article1 = lists[0];
  const article2 = lists[1] ?? lists[0];
  const founder1 = quotes[0];
  const founder2 = quotes[1] ?? quotes[0];
  const linesSource = areas.length >= 2 ? areas : mockAreas;
  const line1 = linesSource[0];
  const line2 = linesSource[1] ?? linesSource[0];
  const project1 = projects[0];
  const project2 = projects[1] ?? projects[0];
  const project3 = projects[2] ?? projects[0];
  const hub1 = hubs[0];
  const hub2 = hubs[1] ?? hubs[0];

  return (
    <div className="bento-hero">
      <div className="bento-hero-col">
        {article1 && <ArticleHeroCard list={article1} t={t} />}
        <div className="bento-hero-row-2">
          {line1 && (
            <ResearchLineTile
              area={line1}
              t={t}
              onClick={() => onOpenArea?.(line1.name)}
            />
          )}
          {line2 && (
            <ResearchLineTile
              area={line2}
              t={t}
              onClick={() => onOpenArea?.(line2.name)}
            />
          )}
        </div>
        {project1 && <ProjectTile project={project1} t={t} />}
      </div>

      <div className="bento-hero-col">
        {founder1 && <FounderSplitCard q={founder1} t={t} />}
        {opportunity ? (
          <OpportunityTile opportunity={opportunity} t={t} onClick={onOpenOpportunity} />
        ) : (
          project2 && <ProjectTile project={project2} t={t} />
        )}
        {article2 && <ArticleHeroCard list={article2} t={t} grow />}
      </div>

      <div className="bento-hero-col">
        {project3 && <ProjectTile project={project3} t={t} />}
        <div className="bento-hero-row-2">
          {hub1 && <HubTile hub={hub1} t={t} />}
          {hub2 && hub2.id !== hub1?.id && <HubTile hub={hub2} t={t} />}
        </div>
        {founder2 && <FounderSplitCard q={founder2} t={t} grow />}
        <GroupLookingCtaCard t={t} onClick={onOpenGroups} />
      </div>
    </div>
  );
}

function cardBase(t: Theme): React.CSSProperties {
  return {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 16,
    cursor: "pointer",
    transition:
      "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
  };
}

function hoverOn(e: React.MouseEvent, t: Theme) {
  const el = e.currentTarget as HTMLElement;
  el.style.borderColor = `${t.accent}55`;
  el.style.boxShadow = t.shadowHover;
  el.style.transform = "translateY(-2px)";
}
function hoverOff(e: React.MouseEvent, t: Theme) {
  const el = e.currentTarget as HTMLElement;
  el.style.borderColor = t.border;
  el.style.boxShadow = "none";
  el.style.transform = "translateY(0)";
}

function ArticleHeroCard({
  list,
  t,
  grow = false,
}: {
  list: FeaturedList;
  t: Theme;
  grow?: boolean;
}) {
  const cover = coverFor(list.title);
  return (
    <article
      style={{
        ...cardBase(t),
        padding: 16,
        display: "flex",
        flexDirection: "column",
        ...(grow ? { flex: "1 1 auto" } : {}),
      }}
      onMouseEnter={(e) => hoverOn(e, t)}
      onMouseLeave={(e) => hoverOff(e, t)}
    >
      <div
        style={{
          ...(grow
            ? { flex: "1 1 150px", minHeight: 150 }
            : { height: 150 }),
          borderRadius: 10,
          background: cover.background,
          marginBottom: 12,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            fontSize: 9,
            fontWeight: 700,
            color: "#fff",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(6px)",
            padding: "4px 10px",
            borderRadius: 20,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {list.area}
        </span>
      </div>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: t.textPrimary,
          letterSpacing: "-0.02em",
          lineHeight: 1.22,
          marginBottom: 14,
          fontFamily: "var(--font-playfair), Georgia, serif",
        }}
      >
        {list.title}
      </h3>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 12,
        }}
      >
        <span style={{ color: t.textTertiary, fontWeight: 500 }}>{list.author}</span>
        <span
          style={{
            color: t.textPrimary,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          Leer artículo <ChevronRight size={12} />
        </span>
      </div>
    </article>
  );
}

const LINE_ICONS: Record<string, LucideIcon> = {
  "Machine Learning": Brain,
  Neurociencia: Activity,
  NLP: Cpu,
  Genómica: Dna,
  "Computación Cuántica": Atom,
  Robótica: Bot,
  "Computer Vision": Eye,
  BCI: Zap,
};

function ResearchLineTile({
  area,
  t,
  onClick,
}: {
  area: ResearchArea;
  t: Theme;
  onClick?: () => void;
}) {
  const Icon = LINE_ICONS[area.name] ?? Sparkles;
  return (
    <button
      onClick={onClick}
      style={{
        ...cardBase(t),
        padding: 16,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        position: "relative",
        aspectRatio: "1 / 1",
        width: "100%",
      }}
      onMouseEnter={(e) => hoverOn(e, t)}
      onMouseLeave={(e) => hoverOff(e, t)}
    >
      <ChevronRight
        size={14}
        color={t.textTertiary}
        style={{ position: "absolute", top: 14, right: 14 }}
      />
      <Icon size={44} strokeWidth={1.5} color={t.textPrimary} />
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.01em" }}>
          {area.name}
        </p>
        <p style={{ fontSize: 12, color: t.textTertiary, marginTop: 2 }}>
          {area.count} investigadores
        </p>
      </div>
    </button>
  );
}

function ProjectTile({ project, t }: { project: ResearchProject; t: Theme }) {
  const cover = coverFor(project.seed);
  return (
    <article
      style={{
        ...cardBase(t),
        padding: 16,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
      onMouseEnter={(e) => hoverOn(e, t)}
      onMouseLeave={(e) => hoverOff(e, t)}
    >
      <div
        style={{
          flexShrink: 0,
          width: 48,
          height: 48,
          borderRadius: 10,
          background: cover.background,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {project.initial}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: t.textPrimary,
            letterSpacing: "-0.01em",
            marginBottom: 2,
          }}
        >
          {project.name}
        </p>
        <p
          style={{
            fontSize: 12,
            color: t.textSecondary,
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.tagline}
        </p>
      </div>
    </article>
  );
}

function HubTile({ hub, t }: { hub: ResearchHub; t: Theme }) {
  const cover = coverFor(hub.seed);
  return (
    <article
      style={{
        ...cardBase(t),
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        aspectRatio: "1 / 1",
        width: "100%",
      }}
      onMouseEnter={(e) => hoverOn(e, t)}
      onMouseLeave={(e) => hoverOff(e, t)}
    >
      <div
        style={{
          flex: "1 1 0",
          borderRadius: 8,
          background: cover.background,
          minHeight: 0,
        }}
      />
      <div style={{ padding: "0 2px 2px" }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: t.textPrimary,
            letterSpacing: "-0.01em",
          }}
        >
          {hub.name}
        </p>
        <p
          style={{
            fontSize: 10,
            color: t.textTertiary,
            marginTop: 2,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {hub.count} {hub.blurb}
        </p>
      </div>
    </article>
  );
}

function FounderSplitCard({
  q,
  t,
  grow = false,
}: {
  q: FounderQuote;
  t: Theme;
  grow?: boolean;
}) {
  return (
    <article
      style={{
        ...cardBase(t),
        padding: 14,
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        ...(grow ? { flex: "1 1 auto" } : {}),
      }}
      onMouseEnter={(e) => hoverOn(e, t)}
      onMouseLeave={(e) => hoverOff(e, t)}
    >
      <div style={{ flexShrink: 0 }}>
        <Avatar seed={q.seed} size={80} />
      </div>
      <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <span
          style={{
            fontSize: 10,
            color: t.textTertiary,
            letterSpacing: "0.04em",
          }}
        >
          {q.kicker ?? "Desde el investigador"}
        </span>
        <h4
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: t.textPrimary,
            letterSpacing: "-0.015em",
            lineHeight: 1.2,
            fontFamily: "var(--font-playfair), Georgia, serif",
          }}
        >
          {q.name} {q.surname} |{" "}
          <span style={{ fontWeight: 600 }}>
            {q.quote.split(" ").slice(0, 4).join(" ")}…
          </span>
        </h4>
        <p
          style={{
            fontSize: 12,
            color: t.textSecondary,
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 3,
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

function OpportunityTile({
  opportunity,
  t,
  onClick,
}: {
  opportunity: Opportunity;
  t: Theme;
  onClick?: () => void;
}) {
  return (
    <article
      onClick={onClick}
      style={{
        ...cardBase(t),
        padding: 16,
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
      }}
      onMouseEnter={(e) => hoverOn(e, t)}
      onMouseLeave={(e) => hoverOff(e, t)}
    >
      <div
        style={{
          flexShrink: 0,
          width: 48,
          height: 48,
          borderRadius: 10,
          background: `${t.orange}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: t.orange,
        }}
      >
        <Flame size={22} strokeWidth={1.8} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: t.textPrimary,
            letterSpacing: "-0.01em",
            marginBottom: 2,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {opportunity.title}
        </p>
        <p
          style={{
            fontSize: 12,
            color: t.textSecondary,
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {opportunity.dept} · deadline {opportunity.deadline}
        </p>
      </div>
    </article>
  );
}

function GroupLookingCtaCard({ t, onClick }: { t: Theme; onClick?: () => void }) {
  return (
    <article
      onClick={onClick}
      style={{
        ...cardBase(t),
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
      onMouseEnter={(e) => hoverOn(e, t)}
      onMouseLeave={(e) => hoverOff(e, t)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: `${t.accent}18`,
            color: t.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Users size={18} strokeWidth={1.8} />
        </div>
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: t.textPrimary,
            letterSpacing: "-0.01em",
          }}
        >
          ¿Buscando grupo de investigación?
        </p>
      </div>
      <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.5 }}>
        Explora más de 40 grupos activos filtrados por área, tamaño y apertura a colaboración.
      </p>
      <span
        style={{
          marginTop: 4,
          fontSize: 12,
          fontWeight: 600,
          color: t.accent,
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        Ver grupos <ArrowRight size={12} />
      </span>
    </article>
  );
}
