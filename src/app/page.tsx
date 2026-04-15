"use client";

import { useState, useEffect } from "react";
import {
  Search, Users, Zap, User, BookOpen,
  Briefcase, Clock, X, Sparkles, Globe,
  ExternalLink, ChevronRight,
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const researchers = [
  { id: 1, name: "Dra. Elena Vargas", role: "Profesora Titular", dept: "Ingeniería Biomédica", avatar: "EV", color: "#84cc16", tags: ["Machine Learning", "Neurociencia Computacional", "BCI"], groups: ["NeuroAI Lab"], projects: 4, pubs: 38, open: true, match: 97, bio: "Investigo interfaces cerebro-computadora y modelos de aprendizaje profundo aplicados a señales neuronales." },
  { id: 2, name: "Dr. Marcos Ibáñez", role: "Investigador Senior", dept: "Ciencias de la Computación", avatar: "MI", color: "#60a5fa", tags: ["NLP", "Large Language Models", "Ética en IA"], groups: ["NLP Group"], projects: 6, pubs: 52, open: true, match: 91, bio: "Trabajo en modelos de lenguaje multilingüe y los desafíos éticos que plantea la IA generativa." },
  { id: 3, name: "Dra. Sofía Ríos", role: "Profesora Asociada", dept: "Biología Molecular", avatar: "SR", color: "#f472b6", tags: ["Genómica", "CRISPR", "Bioinformática"], groups: ["GenomicsLab"], projects: 3, pubs: 29, open: false, match: 85, bio: "Desarrollo herramientas computacionales para análisis de variantes genéticas y edición génica." },
  { id: 4, name: "Dr. Andrés Leal", role: "Profesor Asociado", dept: "Física Computacional", avatar: "AL", color: "#c084fc", tags: ["Computación Cuántica", "Simulación", "Algoritmos"], groups: ["QuantumCS"], projects: 5, pubs: 44, open: true, match: 78, bio: "Diseño algoritmos cuánticos para simulación de sistemas complejos y optimización combinatoria." },
  { id: 5, name: "Dra. Carmen Fuentes", role: "Investigadora Posdoctoral", dept: "Salud Pública", avatar: "CF", color: "#fb923c", tags: ["Epidemiología", "Salud Digital", "Machine Learning"], groups: ["DataHealth"], projects: 2, pubs: 17, open: true, match: 73, bio: "Aplico modelos predictivos a datos epidemiológicos para sistemas de alerta temprana." },
  { id: 6, name: "Dr. Felipe Mora", role: "Profesor Titular", dept: "Robótica e IA", avatar: "FM", color: "#34d399", tags: ["Robótica", "Computer Vision", "Deep Learning"], groups: ["RoboticsLab"], projects: 7, pubs: 61, open: false, match: 69, bio: "Desarrollo sistemas de percepción visual para robots autónomos en entornos no estructurados." },
];

const opportunities = [
  { id: 1, title: "Postdoc – IA aplicada a salud", dept: "Biomédica + CS", deadline: "30 Abr", type: "Postdoc", hot: true },
  { id: 2, title: "Convocatoria ANID Fondecyt Regular 2026", dept: "Todas las áreas", deadline: "15 May", type: "Fondos", hot: true },
  { id: 3, title: "Colaboración EU Horizon – Quantum", dept: "Física Comp.", deadline: "1 Jun", type: "Internacional", hot: false },
  { id: 4, title: "Tesis Doctoral – NLP Multilingüe", dept: "CS", deadline: "20 May", type: "Doctorado", hot: false },
  { id: 5, title: "Research Engineer – Vision Systems", dept: "Robótica e IA", deadline: "10 May", type: "Laboral", hot: true },
  { id: 6, title: "Beca Marie Curie – Climate AI", dept: "Todas las áreas", deadline: "25 Jun", type: "Internacional", hot: false },
];

const userProfile = {
  name: "José Ignacio",
  surname: "Hernández",
  role: "Estudiante de Doctorado",
  dept: "Ingeniería de Sistemas",
  avatar: "JH",
  color: "#84cc16",
  tags: ["Sistemas Distribuidos", "IoT", "Machine Learning"],
  groups: ["DistributedSys Lab", "IoT Center"],
  projects: 2,
  pubs: 8,
  bio: "Doctorando enfocado en sistemas distribuidos e IoT. Busco colaboraciones en machine learning aplicado a sensores.",
  open: true,
};

const allDepts = ["Todos", ...new Set(researchers.map((r) => r.dept))];

// ─── AVATAR ───────────────────────────────────────────────────────────────────

function Avatar({ initials, color, size = 44 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 10,
      background: `${color}18`,
      border: `1px solid ${color}30`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: 800, color, flexShrink: 0,
      letterSpacing: "-0.02em",
    }}>
      {initials}
    </div>
  );
}

// ─── RESEARCHER CARD ───────────────────────────────────────────────────────────

function ResearcherCard({ researcher, onConnect, isConnected }: {
  researcher: (typeof researchers)[0];
  onConnect: (id: number) => void;
  isConnected: boolean;
}) {
  return (
    <div style={{
      background: "var(--card-bg)",
      border: "1px solid var(--card-border)",
      borderRadius: 14,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      transition: "all 0.2s ease",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = `${researcher.color}40`;
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${researcher.color}08`;
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--card-border)";
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
    }}
    >
      {/* Glow accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${researcher.color}30, transparent)`,
      }} />

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Avatar initials={researcher.avatar} color={researcher.color} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>{researcher.name}</span>
            {researcher.open && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontSize: 9, fontWeight: 700, color: "var(--accent)", background: `${researcher.color}12`,
                padding: "2px 6px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                Open
              </span>
            )}
          </div>
          <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.3 }}>{researcher.role}</p>
          <p style={{ fontSize: 10, color: "var(--text-subtle)", marginTop: 1 }}>{researcher.dept}</p>
        </div>
        {/* Match score — small, unobtrusive metadata */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", lineHeight: 1 }}>{researcher.match}%</div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {researcher.tags.slice(0, 3).map((tag) => (
          <span key={tag} style={{
            fontSize: 10, fontWeight: 600, color: "var(--text-muted)",
            background: "var(--tag-bg)", border: "1px solid var(--tag-border)",
            padding: "3px 8px", borderRadius: 20,
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>
            <span style={{ fontWeight: 700, color: "var(--text-muted)" }}>{researcher.pubs}</span> papers
          </span>
          <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>
            <span style={{ fontWeight: 700, color: "var(--text-muted)" }}>{researcher.projects}</span> projects
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onConnect(researcher.id); }}
          style={{
            padding: "5px 12px", borderRadius: 8, border: "none",
            fontSize: 11, fontWeight: 700, cursor: "pointer",
            background: isConnected ? `${researcher.color}15` : researcher.color,
            color: isConnected ? researcher.color : "#000",
            transition: "all 0.15s",
          }}
        >
          {isConnected ? "Connected" : "Connect"}
        </button>
      </div>
    </div>
  );
}

// ─── OPPORTUNITY CARD ─────────────────────────────────────────────────────────

function OpportunityCard({ opp }: { opp: (typeof opportunities)[0] }) {
  const typeColors: Record<string, string> = {
    Postdoc: "#60a5fa",
    Fondos: "#84cc16",
    Internacional: "#c084fc",
    Doctorado: "#f472b6",
    Laboral: "#34d399",
  };
  const color = typeColors[opp.type] ?? "#6b7280";

  return (
    <div style={{
      background: "var(--card-bg)",
      border: "1px solid var(--card-border)",
      borderRadius: 14,
      padding: 18,
      transition: "all 0.2s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = `${color}40`;
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--card-border)";
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
    }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{
          fontSize: 9, fontWeight: 800, color: color, background: `${color}15`,
          padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em",
        }}>
          {opp.type}
        </span>
        {opp.hot && (
          <span style={{ fontSize: 10, fontWeight: 700, color: "#fb923c" }}>🔥 Hot</span>
        )}
      </div>
      <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6, lineHeight: 1.3 }}>{opp.title}</h3>
      <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 12 }}>{opp.dept}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "#fb923c", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
          <Clock size={10} />{opp.deadline}
        </span>
        <button style={{
          display: "flex", alignItems: "center", gap: 4,
          background: "none", border: "none", color: "var(--text-muted)",
          fontSize: 11, fontWeight: 600, cursor: "pointer", padding: "4px 0",
        }}>
          Ver más <ChevronRight size={10} />
        </button>
      </div>
    </div>
  );
}

// ─── NETWORK CARD ─────────────────────────────────────────────────────────────

function NetworkCard({ researcher, onDisconnect }: {
  researcher: (typeof researchers)[0];
  onDisconnect: (id: number) => void;
}) {
  return (
    <div style={{
      background: "var(--card-bg)",
      border: "1px solid var(--card-border)",
      borderRadius: 14,
      padding: 16,
      display: "flex",
      alignItems: "center",
      gap: 12,
      transition: "all 0.2s ease",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = `${researcher.color}30`;
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--card-border)";
    }}
    >
      <Avatar initials={researcher.avatar} color={researcher.color} size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 1 }}>{researcher.name}</p>
        <p style={{ fontSize: 10, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{researcher.role}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: researcher.color, lineHeight: 1 }}>{researcher.match}%</div>
        </div>
        <button
          onClick={() => onDisconnect(researcher.id)}
          style={{
            width: 28, height: 28, borderRadius: 8, border: "1px solid var(--card-border)",
            background: "transparent", color: "var(--text-muted)",
            fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s",
          }}
          title="Desconectar"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// ─── ONBOARDING MODAL ─────────────────────────────────────────────────────────

function OnboardingModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div style={{
        background: "#111111",
        border: "1px solid #222222",
        borderRadius: 20,
        padding: 36,
        maxWidth: 420,
        width: "100%",
        textAlign: "center",
        boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
      }}>
        {/* Logo mark */}
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: "linear-gradient(135deg, #84cc16, #65a30d)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          boxShadow: "0 0 40px #84cc1630",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="12" r="3" fill="#000" opacity="0.9"/>
            <circle cx="16" cy="7" r="2.5" fill="#000" opacity="0.7"/>
            <circle cx="16" cy="17" r="2.5" fill="#000" opacity="0.7"/>
            <line x1="11" y1="12" x2="14" y2="7.8" stroke="#000" strokeWidth="1.5" opacity="0.6"/>
            <line x1="11" y1="12" x2="14" y2="16.2" stroke="#000" strokeWidth="1.5" opacity="0.6"/>
          </svg>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.03em" }}>
          Bienvenido a ResearchNet
        </h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 28 }}>
          Conecta tu perfil ORCID para auto-completar tu información y empezar a descubrir colaboradores.
        </p>

        <button style={{
          width: "100%", padding: "13px 20px", borderRadius: 12,
          border: "1px solid #84cc1640",
          background: "#84cc16", color: "#000",
          fontSize: 13, fontWeight: 800, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          marginBottom: 10,
          transition: "all 0.15s",
          letterSpacing: "-0.01em",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#9ae034")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#84cc16")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.178 3.872-3.722 0-1.797-.897-3.722-3.903-3.722h-2.266z"/>
          </svg>
          Conectar con ORCID
        </button>

        <button
          onClick={onClose}
          style={{
            background: "none", border: "none", color: "var(--text-subtle)",
            fontSize: 12, cursor: "pointer", fontWeight: 500,
          }}
        >
          Omitir por ahora
        </button>

        <p style={{ fontSize: 10, color: "var(--text-subtle)", marginTop: 20, lineHeight: 1.5 }}>
          ORCID es un identificador persistente para investigadores. Tu información se mantiene privada.
        </p>
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function NavBar({ view, setView, connectedCount }: {
  view: string;
  setView: (v: string) => void;
  connectedCount: number;
}) {
  const items = [
    { key: "discover", icon: <Search size={14} />, label: "Discover" },
    { key: "opportunities", icon: <Zap size={14} />, label: "Opportunities" },
    { key: "network", icon: <Users size={14} />, label: "Network", badge: connectedCount },
    { key: "profile", icon: <User size={14} />, label: "Profile" },
  ];

  return (
    <div style={{
      display: "flex", gap: 2, background: "#0f0f0f",
      border: "1px solid #1e1e1e",
      borderRadius: 12, padding: 4,
    }}>
      {items.map((item) => (
        <button key={item.key} onClick={() => setView(item.key)} style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "7px 14px", borderRadius: 8, border: "none",
          fontSize: 12, fontWeight: 600, cursor: "pointer",
          background: view === item.key ? "#1a1a1a" : "transparent",
          color: view === item.key ? "var(--text-primary)" : "var(--text-subtle)",
          transition: "all 0.15s",
          position: "relative",
        }}>
          <span style={{ color: view === item.key ? "var(--accent)" : "var(--text-subtle)", display: "flex" }}>
            {item.icon}
          </span>
          {item.label}
          {item.badge !== undefined && item.badge > 0 && (
            <span style={{
              background: "var(--accent)", color: "#000",
              fontSize: 9, fontWeight: 800, padding: "1px 5px", borderRadius: 20,
              minWidth: 16, textAlign: "center",
            }}>
              {item.badge}
            </span>
          )}
          {view === item.key && (
            <div style={{
              position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)",
              width: 20, height: 2, borderRadius: 2,
              background: "var(--accent)",
            }} />
          )}
        </button>
      ))}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<string>("discover");
  const [selectedDept, setSelectedDept] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [connectedIds, setConnectedIds] = useState<number[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    <div style={{ background: "#09090b", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#333", fontSize: 14 }}>Loading...</div>
    </div>
  );

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text-primary)" }}>

      {/* HEADER */}
      <header style={{
        borderBottom: "1px solid var(--card-border)",
        padding: "0 24px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky" as const,
        top: 0,
        background: "rgba(9,9,11,0.92)",
        backdropFilter: "blur(20px)",
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "linear-gradient(135deg, #84cc16, #65a30d)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px #84cc1625",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="8" cy="12" r="3" fill="#000" opacity="0.9"/>
              <circle cx="16" cy="7" r="2.5" fill="#000" opacity="0.7"/>
              <circle cx="16" cy="17" r="2.5" fill="#000" opacity="0.7"/>
              <line x1="11" y1="12" x2="14" y2="7.8" stroke="#000" strokeWidth="1.5" opacity="0.6"/>
              <line x1="11" y1="12" x2="14" y2="16.2" stroke="#000" strokeWidth="1.5" opacity="0.6"/>
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.04em" }}>
            ResearchNet
          </span>
        </div>

        <NavBar view={view} setView={setView} connectedCount={connectedIds.length} />

        {/* Stats pill */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "#111111", border: "1px solid #1e1e1e",
          borderRadius: 20, padding: "5px 12px",
        }}>
          <Globe size={11} color="var(--text-subtle)" />
          <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>
            {researchers.filter((r) => r.open).length} <span style={{ color: "var(--accent)" }}>open</span> · {researchers.length} researchers
          </span>
        </div>
      </header>

      {/* ONBOARDING */}
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}

      {/* ─── DISCOVER VIEW ─────────────────────────────────────────────── */}
      {view === "discover" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
          {/* Page header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.04em", marginBottom: 4 }}>
              Descubrir investigadores
            </h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Encuentra colaboradores para tu próximo proyecto de investigación
            </p>
          </div>

          {/* Filter bar */}
          <div style={{
            display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" as const,
            marginBottom: 24,
          }}>
            {/* Search */}
            <div style={{
              background: "#111111", border: "1px solid #1e1e1e",
              borderRadius: 10, display: "flex", alignItems: "center", gap: 8,
              padding: "8px 12px", flex: 1, minWidth: 200,
            }}>
              <Search size={13} color="var(--text-subtle)" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, área o departamento..."
                style={{
                  background: "transparent", border: "none", outline: "none",
                  color: "var(--text-primary)", fontSize: 13, flex: 1, width: "100%",
                }}
              />
            </div>

            {/* Dept filter */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              style={{
                appearance: "none" as const,
                background: "#111111", border: "1px solid #1e1e1e",
                borderRadius: 10, color: "var(--text-muted)",
                fontSize: 12, fontWeight: 600, padding: "8px 12px",
                cursor: "pointer" as const,
              }}
            >
              {allDepts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>

            {/* Open toggle */}
            <button
              onClick={() => setOnlyOpen((p) => !p)}
              style={{
                background: onlyOpen ? `${"var(--accent)"}15` : "#111111",
                border: `1px solid ${onlyOpen ? "#84cc1640" : "#1e1e1e"}`,
                borderRadius: 10, color: onlyOpen ? "var(--accent)" : "var(--text-muted)",
                fontSize: 12, fontWeight: 600, padding: "8px 12px",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: onlyOpen ? "var(--accent)" : "#333",
                display: "inline-block",
              }} />
              Solo abiertos
            </button>
          </div>

          {/* Results count */}
          <p style={{ fontSize: 12, color: "var(--text-subtle)", marginBottom: 14, fontWeight: 500 }}>
            {filteredResearchers.length} investigador{filteredResearchers.length !== 1 ? "es" : ""} encontrado{filteredResearchers.length !== 1 ? "s" : ""}
          </p>

          {/* Card grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 14,
          }}>
            {filteredResearchers.map((r) => (
              <ResearcherCard
                key={r.id}
                researcher={r}
                onConnect={(id) => setConnectedIds((p) =>
                  p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
                )}
                isConnected={connectedIds.includes(r.id)}
              />
            ))}
          </div>

          {filteredResearchers.length === 0 && (
            <div style={{
              textAlign: "center", padding: "60px 20px",
              background: "#111111", border: "1px solid #1e1e1e",
              borderRadius: 16,
            }}>
              <Search size={28} style={{ color: "#222", marginBottom: 12 }} />
              <p style={{ fontSize: 14, fontWeight: 700, color: "#2a2a2a", marginBottom: 4 }}>Sin resultados</p>
              <p style={{ fontSize: 12, color: "#1e1e1e" }}>Prueba con otros filtros o términos de búsqueda</p>
            </div>
          )}
        </div>
      )}

      {/* ─── OPPORTUNITIES VIEW ─────────────────────────────────────────── */}
      {view === "opportunities" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.04em", marginBottom: 4 }}>
              Oportunidades
            </h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Postdocs, becas, convocatorias y más
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 14,
          }}>
            {opportunities.map((opp) => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </div>
        </div>
      )}

      {/* ─── NETWORK VIEW ───────────────────────────────────────────────── */}
      {view === "network" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.04em", marginBottom: 4 }}>
              Tu red
            </h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Los investigadores con los que te has conectado
            </p>
          </div>

          {connectedResearchers.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "80px 32px",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: 16,
            }}>
              <div style={{ marginBottom: 20 }}>
                {/* Premium network icon — 3 nodes with subtle lime glow */}
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ margin: "0 auto" }}>
                  <circle cx="16" cy="26" r="9" stroke="var(--text-tertiary)" strokeWidth="1.5" fill="none" opacity="0.5"/>
                  <circle cx="36" cy="14" r="7" stroke="var(--text-tertiary)" strokeWidth="1.5" fill="none" opacity="0.4"/>
                  <circle cx="36" cy="38" r="7" stroke="var(--text-tertiary)" strokeWidth="1.5" fill="none" opacity="0.4"/>
                  <line x1="25" y1="23" x2="29" y2="16" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6"/>
                  <line x1="25" y1="29" x2="29" y2="36" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6"/>
                  {/* Center dot */}
                  <circle cx="16" cy="26" r="3" fill="var(--accent)" opacity="0.8"/>
                  <circle cx="36" cy="14" r="2" fill="var(--accent)" opacity="0.5"/>
                  <circle cx="36" cy="38" r="2" fill="var(--accent)" opacity="0.5"/>
                </svg>
              </div>
              <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                Tu red está vacía
              </p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24, lineHeight: 1.6, maxWidth: 260, margin: "0 auto 24px" }}>
                Explora investigadores y conéctate para construir tu red de colaboración.
              </p>
              <button
                onClick={() => setView("discover")}
                style={{
                  padding: "10px 22px",
                  borderRadius: 9,
                  background: "var(--accent)",
                  color: "#000",
                  border: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                Descubrir investigadores
              </button>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 12, color: "var(--text-subtle)", marginBottom: 14, fontWeight: 500 }}>
                {connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {connectedResearchers.map((r) => (
                  <NetworkCard
                    key={r.id}
                    researcher={r}
                    onDisconnect={(id) => setConnectedIds((p) => p.filter((x) => x !== id))}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ─── PROFILE VIEW ─────────────────────────────────────────────── */}
      {view === "profile" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.04em", marginBottom: 4 }}>
              Tu perfil
            </h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Gestiona tu información de investigador
            </p>
          </div>

          {/* Profile card */}
          <div style={{
            background: "#111111",
            border: "1px solid #1e1e1e",
            borderRadius: 18,
            padding: 28,
            marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24 }}>
              <Avatar initials={userProfile.avatar} color={userProfile.color} size={64} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                    {userProfile.name} {userProfile.surname}
                  </h2>
                  {userProfile.open && (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontSize: 9, fontWeight: 700, color: "var(--accent)",
                      background: `${userProfile.color}12`, padding: "3px 8px",
                      borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em",
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                      Abiertos a colaboración
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 2 }}>{userProfile.role}</p>
                <p style={{ fontSize: 12, color: "var(--text-subtle)" }}>{userProfile.dept}</p>
              </div>
              <button style={{
                padding: "8px 16px", borderRadius: 10,
                border: "1px solid #222222",
                background: "transparent", color: "var(--text-muted)",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}>
                Editar perfil
              </button>
            </div>

            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 20 }}>
              {userProfile.bio}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginBottom: 20 }}>
              {userProfile.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: 11, fontWeight: 600, color: "var(--accent)",
                  background: "#84cc1612", border: "1px solid #84cc1630",
                  padding: "4px 10px", borderRadius: 20,
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Groups */}
            <div style={{ marginBottom: 8 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                Grupos de investigación
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                {userProfile.groups.map((g) => (
                  <span key={g} style={{
                    fontSize: 11, fontWeight: 600, color: "var(--text-muted)",
                    background: "#1a1a1a", border: "1px solid #222222",
                    padding: "4px 10px", borderRadius: 8,
                  }}>
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 16,
          }}>
            {[
              { value: userProfile.pubs, label: "Publicaciones", icon: <BookOpen size={16} /> },
              { value: userProfile.projects, label: "Proyectos", icon: <Briefcase size={16} /> },
              { value: connectedIds.length, label: "Conexiones", icon: <Users size={16} /> },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: "#111111", border: "1px solid #1e1e1e",
                borderRadius: 14, padding: "20px 16px", textAlign: "center",
              }}>
                <div style={{ color: "var(--text-subtle)", marginBottom: 8, display: "flex", justifyContent: "center" }}>
                  {stat.icon}
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-subtle)", fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{
            background: "#111111", border: "1px solid #1e1e1e",
            borderRadius: 14, padding: 20,
          }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14, letterSpacing: "-0.01em" }}>
              Acciones rápidas
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Ver mi perfil público", icon: <ExternalLink size={13} /> },
                { label: "Invitar a un colega", icon: <Users size={13} /> },
                { label: "Exportar mi CV", icon: <BookOpen size={13} /> },
              ].map((action) => (
                <button key={action.label} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 14px", borderRadius: 10,
                  background: "#141414", border: "1px solid #1e1e1e",
                  color: "var(--text-muted)", fontSize: 12, fontWeight: 600,
                  cursor: "pointer", textAlign: "left", width: "100%",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#84cc1640";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#1e1e1e";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "var(--accent)" }}>{action.icon}</span>
                    {action.label}
                  </span>
                  <ChevronRight size={12} color="#333" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
