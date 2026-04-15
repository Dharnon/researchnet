"use client";

import { useState, useEffect } from "react";
import {
  Search, Users, Zap, Network, BookOpen,
  Briefcase, Clock, ChevronRight, X, Menu,
  BookMarked, TrendingUp, Award,
} from "lucide-react";
import Avatarr from "react-nice-avatar";

// â”€â”€â”€ DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const researchers = [
  { id: 1, name: "Dra. Elena Vargas", role: "Profesora Titular", dept: "IngenierÃ­a BiomÃ©dica", tags: ["Machine Learning", "Neurociencia Computacional", "BCI"], groups: ["NeuroAI Lab"], projects: 4, pubs: 38, open: true, match: 97, bio: "Investigo interfaces cerebro-computadora y modelos de aprendizaje profundo aplicados a seÃ±ales neuronales." },
  { id: 2, name: "Dr. Marcos IbÃ¡Ã±ez", role: "Investigador Senior", dept: "Ciencias de la ComputaciÃ³n", tags: ["NLP", "Large Language Models", "Ã‰tica en IA"], groups: ["NLP Group"], projects: 6, pubs: 52, open: true, match: 91, bio: "Trabajo en modelos de lenguaje multilingÃ¼e y los desafÃ­os Ã©ticos que plantea la IA generativa." },
  { id: 3, name: "Dra. SofÃ­a RÃ­os", role: "Profesora Asociada", dept: "BiologÃ­a Molecular", tags: ["GenÃ³mica", "CRISPR", "BioinformÃ¡tica"], groups: ["GenomicsLab"], projects: 3, pubs: 29, open: false, match: 85, bio: "Desarrollo herramientas computacionales para anÃ¡lisis de variantes genÃ©ticas y ediciÃ³n gÃ©nica." },
  { id: 4, name: "Dr. AndrÃ©s Leal", role: "Profesor Asociado", dept: "FÃ­sica Computacional", tags: ["ComputaciÃ³n CuÃ¡ntica", "SimulaciÃ³n", "Algoritmos"], groups: ["QuantumCS"], projects: 5, pubs: 44, open: true, match: 78, bio: "DiseÃ±o algoritmos cuÃ¡nticos para simulaciÃ³n de sistemas complejos y optimizaciÃ³n combinatoria." },
  { id: 5, name: "Dra. Carmen Fuentes", role: "Investigadora Posdoctoral", dept: "Salud PÃºblica", tags: ["EpidemiologÃ­a", "Salud Digital", "Machine Learning"], groups: ["DataHealth"], projects: 2, pubs: 17, open: true, match: 73, bio: "Aplico modelos predictivos a datos epidemiolÃ³gicos para sistemas de alerta temprana." },
  { id: 6, name: "Dr. Felipe Mora", role: "Profesor Titular", dept: "RobÃ³tica e IA", tags: ["RobÃ³tica", "Computer Vision", "Deep Learning"], groups: ["RoboticsLab"], projects: 7, pubs: 61, open: false, match: 69, bio: "Desarrollo sistemas de percepciÃ³n visual para robots autÃ³nomos en entornos no estructurados." },
];

const opportunities = [
  { id: 1, title: "Postdoc â€“ IA aplicada a salud", dept: "BiomÃ©dica + CS", deadline: "30 Abr", type: "Postdoc", hot: true },
  { id: 2, title: "Convocatoria ANID Fondecyt Regular 2026", dept: "Todas las Ã¡reas", deadline: "15 May", type: "Fondos", hot: true },
  { id: 3, title: "ColaboraciÃ³n EU Horizon â€“ Quantum", dept: "FÃ­sica Comp.", deadline: "1 Jun", type: "Internacional", hot: false },
  { id: 4, title: "Tesis Doctoral â€“ NLP MultilingÃ¼e", dept: "CS", deadline: "20 May", type: "Doctorado", hot: false },
  { id: 5, title: "Beca Fulbright â€“ InvestigaciÃ³n en IA", dept: "Ciencias de la ComputaciÃ³n", deadline: "10 Jun", type: "Becas", hot: false },
];

const allDepts = ["Todos", ...new Set(researchers.map((r) => r.dept))];

// â”€â”€â”€ AVATAR CONFIG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const avatarShemes = [
  { id: "EV", bg: "#e8d5b7", face: "#8b6f47", hair: "#4a3728" },
  { id: "MI", bg: "#d5e8e8", face: "#6b8b8b", hair: "#2d3a3a" },
  { id: "SR", bg: "#e8d5d5", face: "#a07070", hair: "#6b3a3a" },
  { id: "AL", bg: "#d5dce8", face: "#7080a0", hair: "#2d3040" },
  { id: "CF", bg: "#e8e0d5", face: "#908070", hair: "#5a4030" },
  { id: "FM", bg: "#dce8d5", face: "#708b60", hair: "#304020" },
];

function getAvatarScheme(id: number) {
  return avatarShemes[id - 1] || avatarShemes[0];
}

// â”€â”€â”€ RESEARCHER CARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
            shape="rounded"
            bgColor={scheme.bg} faceColor={scheme.face} hairColor={scheme.hair}
          />
          {researcher.open && <span className="collab-dot" />}
        </div>
        <div className="r-card-header">
          <div className="r-card-header-row">
            <h3 className="r-name">{researcher.name}</h3>
            <span className="r-match-chip">{researcher.match}%</span>
          </div>
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

// â”€â”€â”€ RESEARCHER ROW (compact) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
        shape="rounded"
        bgColor={scheme.bg} faceColor={scheme.face} hairColor={scheme.hair}
      />
      <div className="r-row-info">
        <div className="r-row-top">
          <span className="r-row-name">{researcher.name}</span>
          {researcher.open && <span className="r-open-badge-sm"><span className="r-open-dot" />Abierto</span>}
        </div>
        <span className="r-row-sub">{researcher.role} Â· {researcher.dept}</span>
      </div>
      <div className="r-row-right">
        <span className="r-row-match">{researcher.match}%</span>
        <button className={`r-connect-btn-sm ${isConnected ? "connected" : ""}`} onClick={() => onConnect(researcher.id)}>
          {isConnected ? "âœ“" : "+"}
        </button>
      </div>
    </div>
  );
}

// â”€â”€â”€ OPPORTUNITY CARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
        {opp.hot && <span className="opp-hot">ðŸ”¥ Hot</span>}
      </div>
      <h3 className="opp-title">{opp.title}</h3>
      <p className="opp-dept">{opp.dept}</p>
      <div className="opp-footer">
        <span className="opp-deadline">
          <Clock size={10} /> {opp.deadline}
        </span>
        <button className="opp-cta">Ver mÃ¡s</button>
      </div>
    </div>
  );
}

// â”€â”€â”€ DETAIL PANEL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
        <button onClick={onClose} className="detail-close">Ã—</button>
      </div>
      <div className="detail-body">
        <div className="detail-profile">
          <Avatarr
            id={researcher.id.toString()}
            shape="rounded"
            bgColor={scheme.bg} faceColor={scheme.face} hairColor={scheme.hair}
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
          <p className="detail-section-title">Ãreas</p>
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
          {isConnected ? "âœ“ Conectado" : "Conectar"}
        </button>
      </div>
    </div>
  );
}

// â”€â”€â”€ NAV â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function NavBar({ view, setView, connectedCount, isMobile }: {
  view: "discover" | "opportunities" | "network" | "profile";
  setView: (v: "discover" | "opportunities" | "network" | "profile") => void;
  connectedCount: number;
  isMobile: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    { key: "discover", icon: <Search size={isMobile ? 16 : 13} />, label: "Discover" },
    { key: "opportunities", icon: <Zap size={isMobile ? 16 : 13} />, label: "Opportunities" },
    { key: "network", icon: <Users size={isMobile ? 16 : 13} />, label: "Network", badge: connectedCount },
    { key: "profile", icon: <BookMarked size={isMobile ? 16 : 13} />, label: "Profile" },
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
                onClick={() => { setView(item.key as any); setMenuOpen(false); }}
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
          onClick={() => setView(item.key as any)}
        >
          {item.icon}
          {item.label}
          {item.badge !== undefined && item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
        </button>
      ))}
    </nav>
  );
}

// â”€â”€â”€ ONBOARDING MODAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function OnboardingModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>Ã—</button>
        <div className="modal-icon">â¬¡</div>
        <h2 className="modal-title">Conecta tu perfil ORCID</h2>
        <p className="modal-desc">
          Vincula tu ORCID para auto-completar tu perfil con publicaciones, grupos de investigaciÃ³n y colaboraciones existentes.
        </p>
        <div className="modal-benefits">
          {["Autocompletado de publicaciones", "Coincidencia con tu red existente", "Perfil verificado en minutos"].map((b) => (
            <div key={b} className="modal-benefit">
              <span className="modal-check">âœ“</span> {b}
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

// â”€â”€â”€ PROFILE VIEW â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ProfileView({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="profile-view">
      <div className="profile-hero">
        <Avatarr id="me" shape="rounded"  />
        <div className="profile-info">
          <h2 className="profile-name">Dr. JosÃ© Ignacio</h2>
          <p className="profile-role">Investigador Â· Universidad de Chile</p>
          <p className="profile-dept">Ciencias de la ComputaciÃ³n</p>
        </div>
        <button className="profile-edit-btn" onClick={onEdit}>Editar perfil</button>
      </div>

      <div className="profile-stats">
        <div className="profile-stat">
          <span className="profile-stat-num">12</span>
          <span className="profile-stat-label">publicaciones</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat-num">3</span>
          <span className="profile-stat-label">proyectos activos</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat-num">8</span>
          <span className="profile-stat-label">colaboradores</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat-num">4</span>
          <span className="profile-stat-label">grupos</span>
        </div>
      </div>

      <div className="profile-section">
        <h3 className="profile-section-title">Areas de investigaciÃ³n</h3>
        <div className="profile-tags">
          {["Machine Learning", "Sistemas Distribuidos", "Data Science"].map((t) => (
            <span key={t} className="r-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h3 className="profile-section-title">Grupos</h3>
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

// â”€â”€â”€ MAIN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
              <circle cx="11" cy="11" r="10" fill="#84cc16" opacity="0.15"/>
              <circle cx="11" cy="11" r="6" fill="#84cc16" opacity="0.3"/>
              <circle cx="11" cy="11" r="3" fill="#84cc16"/>
            </svg>
          </div>
          <span className="header-title">ResearchNet</span>
        </div>
        <NavBar view={view} setView={setView} connectedCount={connectedIds.length} isMobile={isMobile} />
        <div className="header-right">
          <span className="header-count">{researchers.length} researchers</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="app-main">

        {/* â”€â”€ DISCOVER â”€â”€ */}
        {view === "discover" && (
          <div className="discover-view">
            <div className="discover-intro">
              <h1 className="discover-heading">Descubre colaboradores</h1>
              <p className="discover-sub">Encuentra investigadores complementarios en tu universidad y mÃ¡s allÃ¡.</p>
            </div>

            {/* Filter bar */}
            <div className="filter-bar">
              <div className="search-wrap">
                <Search size={13} className="search-icon" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nombre, Ã¡rea, departamento..."
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

            {/* Results count */}
            <p className="results-count">
              {filteredResearchers.length} investigador{filteredResearchers.length !== 1 ? "es" : ""} encontrado{filteredResearchers.length !== 1 ? "s" : ""}
            </p>

            {/* Cards grid */}
            <div className="r-grid">
              {filteredResearchers.length === 0 ? (
                <div className="empty-state">
                  <Search size={32} />
                  <p>No hay resultados para tu bÃºsqueda.</p>
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

        {/* â”€â”€ OPPORTUNITIES â”€â”€ */}
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

        {/* â”€â”€ NETWORK â”€â”€ */}
        {view === "network" && (
          <div className="network-view">
            <div className="discover-intro">
              <h1 className="discover-heading">Tu red</h1>
              <p className="discover-sub">Los investigadores con los que te has conectado.</p>
            </div>
            {connectedResearchers.length === 0 ? (
              <div className="empty-state">
                <Network size={36} />
                <p className="empty-title">Tu red estÃ¡ vacÃ­a</p>
                <p className="empty-sub">Conecta con investigadores para construir tu red de colaboraciÃ³n.</p>
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

        {/* â”€â”€ PROFILE â”€â”€ */}
        {view === "profile" && (
          <div className="profile-view-wrap">
            <ProfileView onEdit={() => {}} />
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
