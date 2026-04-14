"use client";

import { useState, useEffect } from "react";
import {
  Search, Users, Zap, BookMarked, BookOpen,
  Clock, ChevronRight, X,
} from "lucide-react";
import Avatarr, { genConfig } from "react-nice-avatar";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const researchers = [
  { id: 1, name: "Dra. Elena Vargas", role: "Profesora Titular", dept: "Ingeniería Biomédica", tags: ["Machine Learning", "Neurociencia Computacional", "BCI"], groups: ["NeuroAI Lab"], projects: 4, pubs: 38, open: true, match: 97, bio: "Investigo interfaces cerebro-computadora y modelos de aprendizaje profundo aplicados a señales neuronales." },
  { id: 2, name: "Dr. Marcos Ibáñez", role: "Investigador Senior", dept: "Ciencias de la Computación", tags: ["NLP", "Large Language Models", "Ética en IA"], groups: ["NLP Group"], projects: 6, pubs: 52, open: true, match: 91, bio: "Trabajo en modelos de lenguaje multilingüe y los desafíos éticos que plantea la IA generativa." },
  { id: 3, name: "Dra. Sofía Ríos", role: "Profesora Asociada", dept: "Biología Molecular", tags: ["Genómica", "CRISPR", "Bioinformática"], groups: ["GenomicsLab"], projects: 3, pubs: 29, open: false, match: 85, bio: "Desarrollo herramientas computacionales para análisis de variantes genéticas y edición génica." },
  { id: 4, name: "Dr. Andrés Leal", role: "Profesor Asociado", dept: "Física Computacional", tags: ["Computación Cuántica", "Simulación", "Algoritmos"], groups: ["QuantumCS"], projects: 5, pubs: 44, open: true, match: 78, bio: "Diseño algoritmos cuánticos para simulación de sistemas complejos y optimización combinatoria." },
  { id: 5, name: "Dra. Carmen Fuentes", role: "Investigadora Posdoctoral", dept: "Salud Pública", tags: ["Epidemiología", "Salud Digital", "Machine Learning"], groups: ["DataHealth"], projects: 2, pubs: 17, open: true, match: 73, bio: "Aplico modelos predictivos a datos epidemiológicos para sistemas de alerta temprana." },
  { id: 6, name: "Dr. Felipe Mora", role: "Profesor Titular", dept: "Robótica e IA", tags: ["Robótica", "Computer Vision", "Deep Learning"], groups: ["RoboticsLab"], projects: 7, pubs: 61, open: false, match: 69, bio: "Desarrollo sistemas de percepción visual para robots autónomos en entornos no estructurados." },
];

const opportunities = [
  { id: 1, title: "Postdoc – IA aplicada a salud", dept: "Biomédica + CS", deadline: "30 Abr", type: "Postdoc", hot: true },
  { id: 2, title: "Convocatoria ANID Fondecyt Regular 2026", dept: "Todas las áreas", deadline: "15 May", type: "Fondos", hot: true },
  { id: 3, title: "Colaboración EU Horizon – Quantum", dept: "Física Comp.", deadline: "1 Jun", type: "Internacional", hot: false },
  { id: 4, title: "Tesis Doctoral – NLP Multilingüe", dept: "CS", deadline: "20 May", type: "Doctorado", hot: false },
  { id: 5, title: "Beca Fulbright – Investigación en IA", dept: "Ciencias de la Computación", deadline: "10 Jun", type: "Becas", hot: false },
];

const allDepts = ["Todos", ...new Set(researchers.map((r) => r.dept))];

// ─── AVATAR SCHEME ───────────────────────────────────────────────────────────

const avatarSchemes = [
  { bg: "#e8d5b7", face: "#8b6f47", hair: "#4a3728" },
  { bg: "#d5e8e8", face: "#6b8b8b", hair: "#2d3a3a" },
  { bg: "#e8d5d5", face: "#a07070", hair: "#6b3a3a" },
  { bg: "#d5dce8", face: "#7080a0", hair: "#2d3040" },
  { bg: "#e8e0d5", face: "#908070", hair: "#5a4030" },
  { bg: "#dce8d5", face: "#708b60", hair: "#304020" },
];

function getAvatarScheme(id: number) {
  return avatarSchemes[(id - 1) % avatarSchemes.length];
}

// ─── RESEARCHER CARD ───────────────────────────────────────────────────────────

function ResearcherCard({ researcher, onConnect, isConnected, onSelect }: {
  researcher: (typeof researchers)[0];
  onConnect: (id: number) => void;
  isConnected: boolean;
  onSelect: (r: (typeof researchers)[0]) => void;
}) {
  const scheme = getAvatarScheme(researcher.id);
  return (
    <div className="r-card" onClick={() => onSelect(researcher)}>
      <div className="r-card-top">
        <div className="r-avatar-wrap">
          <Avatarr
            id={researcher.id.toString()}
            style={{ width: "3.5rem", height: "3.5rem" }}
            shape="circle"
            {...genConfig({ sex: researcher.id % 2 === 0 ? "woman" : "man", bgColor: scheme.bg, faceColor: scheme.face, hairColor: scheme.hair, hatStyle: "none", glassesStyle: "none" })}
          />
          {researcher.open && <span className="collab-dot" />}
        </div>
        <div className="r-card-header">
          <h3 className="r-name">{researcher.name}</h3>
          <p className="r-role">{researcher.role}</p>
          <p className="r-dept">{researcher.dept}</p>
        </div>
      </div>

      <div className="r-tags">
        {researcher.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="r-tag">{tag}</span>
        ))}
      </div>

      <div className="r-card-footer">
        <div className="r-match">
          <span className="r-match-num">{researcher.match}</span>
          <span className="r-match-pct">%</span>
        </div>
        {researcher.open && (
          <span className="r-open-badge">
            <span className="r-open-dot" />Abierto
          </span>
        )}
        <button
          className={`r-connect-btn ${isConnected ? "connected" : ""}`}
          onClick={(e) => { e.stopPropagation(); onConnect(researcher.id); }}
        >
          {isConnected ? "Conectado" : "Conectar"}
        </button>
      </div>
    </div>
  );
}

// ─── RESEARCHER ROW (compact, for network view) ───────────────────────────────

function ResearcherRow({ researcher, onConnect, isConnected }: {
  researcher: (typeof researchers)[0];
  onConnect: (id: number) => void;
  isConnected: boolean;
}) {
  const scheme = getAvatarScheme(researcher.id);
  return (
    <div className="r-row">
      <Avatarr
        id={researcher.id.toString()}
        shape="circle"
        style={{ width: "2.4rem", height: "2.4rem" }}
        {...genConfig({ sex: researcher.id % 2 === 0 ? "woman" : "man", bgColor: scheme.bg, faceColor: scheme.face, hairColor: scheme.hair, hatStyle: "none", glassesStyle: "none" })}
      />
      <div className="r-row-info">
        <div className="r-row-top">
          <span className="r-row-name">{researcher.name}</span>
          {researcher.open && <span className="r-open-badge-sm"><span className="r-open-dot" />Abierto</span>}
        </div>
        <span className="r-row-sub">{researcher.role} · {researcher.dept}</span>
      </div>
      <div className="r-row-right">
        <span className="r-row-match">{researcher.match}%</span>
        <button className={`r-connect-btn-sm ${isConnected ? "connected" : ""}`} onClick={() => onConnect(researcher.id)}>
          {isConnected ? "✓" : "+"}
        </button>
      </div>
    </div>
  );
}

// ─── OPPORTUNITY CARD ─────────────────────────────────────────────────────────

function OppCard({ opp }: { opp: (typeof opportunities)[0] }) {
  const typeColors: Record<string, string> = {
    Postdoc: "type-postdoc",
    Fondos: "type-fondos",
    Internacional: "type-intl",
    Doctorado: "type-phd",
    Becas: "type-becas",
  };
  return (
    <div className="opp-card">
      <div className="opp-top">
        <span className={`opp-type ${typeColors[opp.type] || ""}`}>{opp.type}</span>
        {opp.hot && <span className="opp-hot">🔥 Hot</span>}
      </div>
      <h3 className="opp-title">{opp.title}</h3>
      <p className="opp-dept">{opp.dept}</p>
      <div className="opp-footer">
        <span className="opp-deadline">
          <Clock size={10} /> {opp.deadline}
        </span>
        <button className="opp-cta">Ver más</button>
      </div>
    </div>
  );
}

// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────

function DetailPanel({ researcher, onClose, onConnect, isConnected }: {
  researcher: (typeof researchers)[0];
  onClose: () => void;
  onConnect: (id: number) => void;
  isConnected: boolean;
}) {
  const scheme = getAvatarScheme(researcher.id);
  return (
    <div className="detail-panel">
      <div className="detail-header">
        <span className="detail-label">Researcher</span>
        <button onClick={onClose} className="detail-close">×</button>
      </div>
      <div className="detail-body">
        <div className="detail-profile">
          <Avatarr
            id={researcher.id.toString()}
            shape="circle"
            style={{ width: "4rem", height: "4rem" }}
            {...genConfig({ sex: researcher.id % 2 === 0 ? "woman" : "man", bgColor: scheme.bg, faceColor: scheme.face, hairColor: scheme.hair, hatStyle: "none", glassesStyle: "none" })}
          />
          <div>
            <h3 className="detail-name">{researcher.name}</h3>
            <p className="detail-role">{researcher.role}</p>
            <p className="detail-dept">{researcher.dept}</p>
          </div>
        </div>

        <div className="detail-match-box">
          <span className="detail-match-num">{researcher.match}%</span>
          <span className="detail-match-label">affinity match</span>
        </div>

        <p className="detail-bio">{researcher.bio}</p>

        <div className="detail-stats">
          <div className="detail-stat">
            <span className="detail-stat-num">{researcher.pubs}</span>
            <span className="detail-stat-label">papers</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-num">{researcher.projects}</span>
            <span className="detail-stat-label">projects</span>
          </div>
          <div className="detail-stat">
            <span className="detail-stat-num">{researcher.groups.length}</span>
            <span className="detail-stat-label">groups</span>
          </div>
        </div>

        <div className="detail-section">
          <p className="detail-section-title">Grupos</p>
          <div className="detail-groups">
            {researcher.groups.map((g) => <span key={g} className="detail-group-tag">{g}</span>)}
          </div>
        </div>

        <div className="detail-section">
          <p className="detail-section-title">Áreas</p>
          <div className="detail-tags">
            {researcher.tags.map((tag) => <span key={tag} className="r-tag">{tag}</span>)}
          </div>
        </div>
      </div>
      <div className="detail-footer">
        <button
          className={`detail-connect-btn ${isConnected ? "connected" : ""}`}
          onClick={() => onConnect(researcher.id)}
        >
          {isConnected ? "✓ Conectado" : "Conectar"}
        </button>
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function NavBar({ view, setView, connectedCount, isMobile }: {
  view: "discover" | "opportunities" | "network" | "profile";
  setView: (v: "discover" | "opportunities" | "network" | "profile") => void;
  connectedCount: number;
  isMobile: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    { key: "discover", icon: <span className="nav-icon-wrap"><Search size={isMobile ? 16 : 13} /></span>, label: "Discover" },
    { key: "opportunities", icon: <span className="nav-icon-wrap"><Zap size={isMobile ? 16 : 13} /></span>, label: "Opportunities" },
    { key: "network", icon: <span className="nav-icon-wrap"><Users size={isMobile ? 16 : 13} /></span>, label: "Network", badge: connectedCount },
    { key: "profile", icon: <span className="nav-icon-wrap"><BookMarked size={isMobile ? 16 : 13} /></span>, label: "Profile" },
  ];

  if (isMobile) {
    const active = items.find((i) => i.key === view);
    return (
      <div className="nav-mobile-wrap">
        <button className="nav-mobile-trigger" onClick={() => setMenuOpen((p) => !p)}>
          <span className="nav-mobile-active-icon">{active?.icon}</span>
          {active?.label}
          <ChevronRight size={12} className={`nav-chevron ${menuOpen ? "open" : ""}`} />
        </button>
        {menuOpen && (
          <div className="nav-mobile-dropdown">
            {items.map((item) => (
              <button
                key={item.key}
                className={`nav-mobile-item ${view === item.key ? "active" : ""}`}
                onClick={() => { setView(item.key as "discover" | "opportunities" | "network" | "profile"); setMenuOpen(false); }}
              >
                {item.icon}
                {item.label}
                {item.badge !== undefined && item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <nav className="nav-bar">
      {items.map((item) => (
        <button
          key={item.key}
          className={`nav-item ${view === item.key ? "active" : ""}`}
          onClick={() => setView(item.key as "discover" | "opportunities" | "network" | "profile")}
        >
          {item.icon}
          {item.label}
          {item.badge !== undefined && item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
        </button>
      ))}
    </nav>
  );
}

// ─── ONBOARDING MODAL ─────────────────────────────────────────────────────────

function OnboardingModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-icon-wrap">
          <BookOpen size={22} strokeWidth={1.8} />
        </div>
        <h2 className="modal-title">Conecta tu perfil ORCID</h2>
        <p className="modal-desc">
          Vincula tu ORCID para auto-completar tu perfil con publicaciones, grupos de investigación y colaboraciones existentes.
        </p>
        <div className="modal-benefits">
          {["Autocompletado de publicaciones", "Coincidencia con tu red existente", "Perfil verificado en minutos"].map((b) => (
            <div key={b} className="modal-benefit">
              <span className="modal-check">✓</span> {b}
            </div>
          ))}
        </div>
        <button className="modal-cta" onClick={onClose}>
          Conectar con ORCID
        </button>
        <button className="modal-skip" onClick={onClose}>Omitir por ahora</button>
      </div>
    </div>
  );
}

// ─── PROFILE VIEW ─────────────────────────────────────────────────────────────

function ProfileView() {
  return (
    <div className="profile-view">
      <div className="profile-hero">
        <Avatarr id="me" shape="circle" style={{ width: "5rem", height: "5rem" }} {...genConfig({ sex: "man", bgColor: "#e8d5b7", faceColor: "#8b6f47", hairColor: "#4a3728", hatStyle: "none", glassesStyle: "none" })} />
        <div className="profile-info">
          <h2 className="profile-name">Dr. José Ignacio</h2>
          <p className="profile-role">Investigador · Universidad de Chile</p>
          <p className="profile-dept">Ciencias de la Computación</p>
        </div>
        <button className="profile-edit-btn">Editar perfil</button>
      </div>

      <div className="profile-stats">
        {[
          { num: 12, label: "publicaciones" },
          { num: 3, label: "proyectos activos" },
          { num: 8, label: "colaboradores" },
          { num: 4, label: "grupos" },
        ].map((s) => (
          <div key={s.label} className="profile-stat">
            <span className="profile-stat-num">{s.num}</span>
            <span className="profile-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="profile-section">
        <p className="profile-section-title">Áreas de investigación</p>
        <div className="profile-tags">
          {["Machine Learning", "Sistemas Distribuidos", "Data Science"].map((t) => (
            <span key={t} className="r-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <p className="profile-section-title">Grupos</p>
        <div className="profile-groups">
          {["Distributed Systems Lab", "DataEng CHILE", "ML Research Group"].map((g) => (
            <div key={g} className="profile-group-item">
              <span className="profile-group-dot" />
              {g}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<"discover" | "opportunities" | "network" | "profile">("discover");
  const [selectedDept, setSelectedDept] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [selectedResearcher, setSelectedResearcher] = useState<(typeof researchers)[0] | null>(null);
  const [connectedIds, setConnectedIds] = useState<number[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filteredResearchers = researchers.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.dept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = selectedDept === "Todos" || r.dept === selectedDept;
    const matchOpen = !onlyOpen || r.open;
    return matchSearch && matchDept && matchOpen;
  });

  const connectedResearchers = researchers.filter((r) => connectedIds.includes(r.id));

  if (!mounted) return (
    <div className="app-loading">
      <div className="loading-text">ResearchNet</div>
    </div>
  );

  return (
    <div className="app-root">
      {/* HEADER */}
      <header className="app-header">
        <div className="header-left">
          <div className="header-logo">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="10" fill="#d97706" opacity="0.15"/>
              <circle cx="11" cy="11" r="6" fill="#d97706" opacity="0.3"/>
              <circle cx="11" cy="11" r="3" fill="#d97706"/>
            </svg>
          </div>
          <span className="header-title">ResearchNet</span>
        </div>
        <NavBar view={view} setView={setView} connectedCount={connectedIds.length} isMobile={isMobile} />
        <div className="header-right">
          <span className="header-count">{researchers.length} researchers</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="app-main">

        {/* DISCOVER */}
        {view === "discover" && (
          <div className="discover-view">
            <div className="discover-intro">
              <h1 className="discover-heading">Descubre colaboradores</h1>
              <p className="discover-sub">Encuentra investigadores complementarios en tu universidad y más allá.</p>
            </div>

            <div className="filter-bar">
              <div className="search-wrap">
                <Search size={13} className="search-icon" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nombre, área, departamento..."
                  className="search-input"
                />
              </div>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="dept-select"
              >
                {allDepts.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <button
                className={`filter-open-btn ${onlyOpen ? "active" : ""}`}
                onClick={() => setOnlyOpen((p) => !p)}
              >
                <span className="filter-open-dot" />
                Solo abiertos
              </button>
            </div>

            <p className="results-count">
              {filteredResearchers.length} investigador{filteredResearchers.length !== 1 ? "es" : ""} encontrado{filteredResearchers.length !== 1 ? "s" : ""}
            </p>

            <div className="r-grid">
              {filteredResearchers.length === 0 ? (
                <div className="empty-state">
                  <Search size={32} />
                  <p>No hay resultados para tu búsqueda.</p>
                </div>
              ) : (
                filteredResearchers.map((r) => (
                  <ResearcherCard
                    key={r.id}
                    researcher={r}
                    onConnect={(id) => setConnectedIds((p) =>
                      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
                    )}
                    isConnected={connectedIds.includes(r.id)}
                    onSelect={setSelectedResearcher}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* OPPORTUNITIES */}
        {view === "opportunities" && (
          <div className="opportunities-view">
            <div className="discover-intro">
              <h1 className="discover-heading">Oportunidades</h1>
              <p className="discover-sub">Postdocs, becas, fondos y colaboraciones internacionales.</p>
            </div>
            <div className="opp-grid">
              {opportunities.map((opp) => <OppCard key={opp.id} opp={opp} />)}
            </div>
          </div>
        )}

        {/* NETWORK */}
        {view === "network" && (
          <div className="network-view">
            <div className="discover-intro">
              <h1 className="discover-heading">Tu red</h1>
              <p className="discover-sub">Los investigadores con los que te has conectado.</p>
            </div>
            {connectedResearchers.length === 0 ? (
              <div className="empty-state">
                <Users size={36} />
                <p className="empty-title">Tu red está vacía</p>
                <p className="empty-sub">Conecta con investigadores para construir tu red de colaboración.</p>
              </div>
            ) : (
              <>
                <p className="results-count">
                  {connectedResearchers.length} colaborador{connectedResearchers.length !== 1 ? "es" : ""}
                </p>
                <div className="r-list">
                  {connectedResearchers.map((r) => (
                    <ResearcherRow
                      key={r.id}
                      researcher={r}
                      onConnect={(id) => setConnectedIds((p) => p.filter((x) => x !== id))}
                      isConnected={true}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* PROFILE */}
        {view === "profile" && (
          <div className="profile-view-wrap">
            <ProfileView />
          </div>
        )}

      </main>

      {/* DETAIL PANEL */}
      {selectedResearcher && (
        <>
          {!isMobile && (
            <div className="detail-panel-wrap" onClick={() => setSelectedResearcher(null)} />
          )}
          <div className={`detail-panel-container ${isMobile ? "mobile" : ""}`}>
            <DetailPanel
              researcher={selectedResearcher}
              onClose={() => setSelectedResearcher(null)}
              onConnect={(id) => setConnectedIds((p) =>
                p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
              )}
              isConnected={connectedIds.includes(selectedResearcher.id)}
            />
          </div>
        </>
      )}

      {/* MOBILE BACKDROP */}
      {isMobile && selectedResearcher && (
        <div className="mobile-backdrop" onClick={() => setSelectedResearcher(null)} />
      )}

      {/* ONBOARDING */}
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
    </div>
  );
}
