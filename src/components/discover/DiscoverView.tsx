"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Theme } from "@/lib/theme";
import type { Opportunity, Researcher, ResearchArea } from "@/types";
import { ResearcherCard } from "./ResearcherCard";
import { BentoHero } from "./BentoHero";
import { SortFilterBar, type SortMode } from "./SortFilterBar";
import { ByAreaRow } from "./ByAreaRow";
import { AreasCloud } from "./AreasCloud";
import { FeaturedPaperCard } from "./FeaturedPaperCard";
import { HotOpportunityCard } from "./HotOpportunityCard";
import { GroupSpotlightCard } from "./GroupSpotlightCard";
import {
  featuredPapers,
  researchGroups,
  featuredLists,
  founderQuotes,
  researchProjects,
  researchHubs,
} from "@/lib/mock-data";
import { FeaturedListsSection } from "./FeaturedListsSection";
import { FromResearchersSection } from "./FromResearchersSection";
import { FinalCtaSection } from "./FinalCtaSection";

type Tab = "all" | "researchers" | "papers" | "opportunities" | "groups" | "areas";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "Todo" },
  { id: "researchers", label: "Investigadores" },
  { id: "papers", label: "Papers" },
  { id: "opportunities", label: "Oportunidades" },
  { id: "groups", label: "Grupos" },
  { id: "areas", label: "Áreas" },
];

type ByAreaGroup = { area: string; researchers: Researcher[]; count: number };

export function DiscoverView({
  connectedIds,
  onConnect,
  onSelectResearcher,
  onSelectOpportunity,
  t,
  opportunities,
}: {
  connectedIds: number[];
  onConnect: (id: number) => void;
  onSelectResearcher: (r: Researcher) => void;
  onSelectOpportunity: (o: Opportunity) => void;
  t: Theme;
  opportunities: Opportunity[];
}) {
  const [tab, setTab] = useState<Tab>("all");
  const [sort, setSort] = useState<SortMode>("affinity");
  const [dept, setDept] = useState("Todos");
  const [openOnly, setOpenOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState<string | null>(null);

  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [byArea, setByArea] = useState<ByAreaGroup[]>([]);
  const [areas, setAreas] = useState<ResearchArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      fetch("/api/discover/by-area", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/discover/areas", { cache: "no-store" }).then((r) => r.json()),
    ])
      .then(([ba, ar]) => {
        if (cancelled) return;
        setByArea(ba.groups ?? []);
        setAreas(ar.areas ?? []);
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    params.set("sort", sort);
    if (dept !== "Todos") params.set("dept", dept);
    if (openOnly) params.set("open", "true");
    if (query) params.set("q", query);
    if (areaFilter) params.set("area", areaFilter);
    params.set("limit", "60");
    fetch(`/api/discover/researchers?${params.toString()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setResearchers(data.results ?? []);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [sort, dept, openOnly, query, areaFilter]);

  const connectionsSet = useMemo(() => new Set(connectedIds), [connectedIds]);

  const allDepts = useMemo(() => {
    const set = new Set<string>();
    for (const r of researchers) set.add(r.dept);
    for (const g of byArea) for (const r of g.researchers) set.add(r.dept);
    return ["Todos", ...[...set].sort()];
  }, [researchers, byArea]);

  const handleSelectArea = useCallback(
    (name: string) => {
      setAreaFilter(name);
      setTab("researchers");
    },
    [],
  );

  const handleConnectStop = useCallback(
    (id: number) => (e: React.MouseEvent) => {
      e.stopPropagation();
      onConnect(id);
    },
    [onConnect],
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px", display: "flex", flexDirection: "column", gap: 32 }}>
      <header style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: t.textPrimary,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            fontFamily: "var(--font-playfair), Georgia, serif",
          }}
        >
          Descubre
        </h1>
        <p style={{ fontSize: 15, color: t.textSecondary, maxWidth: 560, lineHeight: 1.55, margin: 0 }}>
          Investigadores, papers, convocatorias y grupos seleccionados para ti.
          Ordenados por afinidad con tu perfil.
        </p>

        <nav
          style={{
            marginTop: 10,
            display: "inline-flex",
            gap: 4,
            padding: 6,
            background: t.navBg,
            border: `1px solid ${t.border}`,
            borderRadius: 999,
            overflowX: "auto",
            maxWidth: "100%",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {TABS.map((tb) => {
            const active = tab === tb.id;
            return (
              <button
                key={tb.id}
                onClick={() => {
                  setTab(tb.id);
                  if (tb.id !== "researchers") setAreaFilter(null);
                }}
                style={{
                  padding: "9px 20px",
                  border: "none",
                  borderRadius: 999,
                  background: active ? t.textPrimary : "transparent",
                  fontSize: 13,
                  fontWeight: 600,
                  color: active ? t.bg : t.textSecondary,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {tb.label}
              </button>
            );
          })}
        </nav>
      </header>

      <div
        style={{
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 14,
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: t.shadowCard,
          maxWidth: 640,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Search size={16} color={t.textTertiary} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca por nombre, área, departamento o keyword…"
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            flex: 1,
            color: t.textPrimary,
            fontSize: 14,
            padding: "8px 2px",
          }}
        />
      </div>

      {tab === "all" && (
        <AllTab
          byArea={byArea}
          areas={areas}
          opportunities={opportunities}
          connectionsSet={connectionsSet}
          onSelectResearcher={onSelectResearcher}
          onSelectOpportunity={onSelectOpportunity}
          onSelectArea={handleSelectArea}
          onOpenGroups={() => setTab("groups")}
          onConnect={onConnect}
          loading={loading}
          t={t}
        />
      )}

      {tab === "researchers" && (
        <ResearchersTab
          researchers={researchers}
          sort={sort}
          setSort={setSort}
          departments={allDepts}
          dept={dept}
          setDept={setDept}
          openOnly={openOnly}
          setOpenOnly={setOpenOnly}
          areaFilter={areaFilter}
          clearAreaFilter={() => setAreaFilter(null)}
          connectionsSet={connectionsSet}
          onSelectResearcher={onSelectResearcher}
          onConnectStop={handleConnectStop}
          t={t}
        />
      )}

      {tab === "papers" && <PapersTab t={t} />}
      {tab === "opportunities" && <OpportunitiesTab opportunities={opportunities} onSelect={onSelectOpportunity} t={t} />}
      {tab === "groups" && <GroupsTab t={t} />}
      {tab === "areas" && <AreasCloud areas={areas} onSelect={handleSelectArea} t={t} />}
    </div>
  );
}

function AllTab({
  byArea,
  areas,
  opportunities,
  connectionsSet,
  onSelectResearcher,
  onSelectOpportunity,
  onSelectArea,
  onOpenGroups,
  onConnect,
  loading,
  t,
}: {
  byArea: ByAreaGroup[];
  areas: ResearchArea[];
  opportunities: Opportunity[];
  connectionsSet: Set<number>;
  onSelectResearcher: (r: Researcher) => void;
  onSelectOpportunity: (o: Opportunity) => void;
  onSelectArea: (name: string) => void;
  onOpenGroups: () => void;
  onConnect: (id: number) => void;
  loading: boolean;
  t: Theme;
}) {
  const hotOpportunity = opportunities.find((o) => o.hot) ?? opportunities[0];
  if (loading && byArea.length === 0 && areas.length === 0) {
    return (
      <div style={{ padding: 60, textAlign: "center", color: t.textTertiary, fontSize: 13 }}>
        Cargando descubrimientos…
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
      <BentoHero
        lists={featuredLists}
        quotes={founderQuotes}
        projects={researchProjects}
        hubs={researchHubs}
        areas={areas}
        opportunity={hotOpportunity}
        t={t}
        onOpenOpportunity={hotOpportunity ? () => onSelectOpportunity(hotOpportunity) : undefined}
        onOpenArea={onSelectArea}
        onOpenGroups={onOpenGroups}
      />
      {byArea.length > 0 && (
        <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 40 }}>
          <div style={{ marginBottom: 22 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: t.textPrimary,
                letterSpacing: "-0.03em",
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              Encuentra investigadores
            </h2>
            <p style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>
              Explora investigadores agrupados por su área principal.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {byArea.slice(0, 4).map((group) => (
              <ByAreaRow
                key={group.area}
                area={group.area}
                count={group.count}
                researchers={group.researchers}
                connections={connectionsSet}
                onSelectResearcher={onSelectResearcher}
                onConnect={onConnect}
                onViewAll={() => onSelectArea(group.area)}
                t={t}
              />
            ))}
          </div>
        </div>
      )}
      {areas.length > 0 && <AreasCloud areas={areas.slice(0, 20)} onSelect={onSelectArea} t={t} />}
      <FeaturedListsSection lists={featuredLists} t={t} />
      <FromResearchersSection quotes={founderQuotes} t={t} />
      <FinalCtaSection t={t} />
    </div>
  );
}

function ResearchersTab({
  researchers,
  sort,
  setSort,
  departments,
  dept,
  setDept,
  openOnly,
  setOpenOnly,
  areaFilter,
  clearAreaFilter,
  connectionsSet,
  onSelectResearcher,
  onConnectStop,
  t,
}: {
  researchers: Researcher[];
  sort: SortMode;
  setSort: (s: SortMode) => void;
  departments: string[];
  dept: string;
  setDept: (d: string) => void;
  openOnly: boolean;
  setOpenOnly: (v: boolean) => void;
  areaFilter: string | null;
  clearAreaFilter: () => void;
  connectionsSet: Set<number>;
  onSelectResearcher: (r: Researcher) => void;
  onConnectStop: (id: number) => (e: React.MouseEvent) => void;
  t: Theme;
}) {
  return (
    <div>
      {areaFilter && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 10px 6px 12px",
            background: t.accentLight,
            border: `1px solid ${t.accent}30`,
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            color: t.accent,
            marginBottom: 12,
          }}
        >
          Filtrando por área: {areaFilter}
          <button
            onClick={clearAreaFilter}
            aria-label="Quitar filtro de área"
            style={{ background: "transparent", border: "none", cursor: "pointer", color: t.accent, fontSize: 14, lineHeight: 1, padding: 2 }}
          >
            ×
          </button>
        </div>
      )}
      <SortFilterBar
        sort={sort}
        onSortChange={setSort}
        departments={departments}
        dept={dept}
        onDeptChange={setDept}
        openOnly={openOnly}
        onOpenOnlyChange={setOpenOnly}
        resultsCount={researchers.length}
        t={t}
      />
      {researchers.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 24px",
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 14,
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, marginBottom: 4 }}>Sin resultados</p>
          <p style={{ fontSize: 12, color: t.textTertiary }}>Ajusta los filtros o prueba otro término.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {researchers.map((r) => (
            <ResearcherCard
              key={r.id}
              researcher={r}
              onSelect={() => onSelectResearcher(r)}
              onConnect={onConnectStop(r.id)}
              isConnected={connectionsSet.has(r.id)}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PapersTab({ t }: { t: Theme }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
      {featuredPapers.map((p) => (
        <FeaturedPaperCard key={p.id} paper={p} t={t} />
      ))}
    </div>
  );
}

function OpportunitiesTab({
  opportunities,
  onSelect,
  t,
}: {
  opportunities: Opportunity[];
  onSelect: (o: Opportunity) => void;
  t: Theme;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
      {opportunities.map((o) => (
        <HotOpportunityCard key={o.id} opportunity={o} onSelect={() => onSelect(o)} t={t} />
      ))}
    </div>
  );
}

function GroupsTab({ t }: { t: Theme }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
      {researchGroups.map((g) => (
        <GroupSpotlightCard key={g.name} group={g} t={t} />
      ))}
    </div>
  );
}
