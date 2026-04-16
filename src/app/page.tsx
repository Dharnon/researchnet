"use client";

import { useState, useEffect, useRef } from "react";
import AvatarLib, { genConfig } from "react-nice-avatar";
import {
  Search, Users, Zap, User, BookOpen,
  Briefcase, Clock, Globe,
  ExternalLink, ChevronRight, MessageCircle,
  Send, ArrowLeft, Check, Circle, X,
} from "lucide-react";

// â”€â”€â”€ DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const researchers = [
  { id: 1, name: "Elena", surname: "Vargas", role: "Profesora Titular", dept: "IngenierÃ­a BiomÃ©dica", seed: "Elena Vargas", tags: ["Machine Learning", "Neurociencia", "BCI"], groups: ["NeuroAI Lab"], projects: 4, pubs: 38, open: true, match: 97, bio: "Interfaces cerebro-computadora y modelos de aprendizaje profundo aplicados a seÃ±ales neuronales." },
  { id: 2, name: "Marcos", surname: "IbÃ¡Ã±ez", role: "Investigador Senior", dept: "Ciencias de la ComputaciÃ³n", seed: "Marcos IbÃ¡Ã±ez", tags: ["NLP", "LLMs", "Ã‰tica en IA"], groups: ["NLP Group"], projects: 6, pubs: 52, open: true, match: 91, bio: "Modelos de lenguaje multilingÃ¼e y los desafÃ­os Ã©ticos que plantea la IA generativa." },
  { id: 3, name: "SofÃ­a", surname: "RÃ­os", role: "Profesora Asociada", dept: "BiologÃ­a Molecular", seed: "SofÃ­a RÃ­os", tags: ["GenÃ³mica", "CRISPR", "BioinformÃ¡tica"], groups: ["GenomicsLab"], projects: 3, pubs: 29, open: false, match: 85, bio: "Herramientas computacionales para anÃ¡lisis de variantes genÃ©ticas y ediciÃ³n gÃ©nica." },
  { id: 4, name: "AndrÃ©s", surname: "Leal", role: "Profesor Asociado", dept: "FÃ­sica Computacional", seed: "AndrÃ©s Leal", tags: ["ComputaciÃ³n CuÃ¡ntica", "SimulaciÃ³n", "Algoritmos"], groups: ["QuantumCS"], projects: 5, pubs: 44, open: true, match: 78, bio: "Algoritmos cuÃ¡nticos para simulaciÃ³n de sistemas complejos y optimizaciÃ³n combinatoria." },
  { id: 5, name: "Carmen", surname: "Fuentes", role: "Investigadora Posdoctoral", dept: "Salud PÃºblica", seed: "Carmen Fuentes", tags: ["EpidemiologÃ­a", "Salud Digital", "ML"], groups: ["DataHealth"], projects: 2, pubs: 17, open: true, match: 73, bio: "Modelos predictivos a datos epidemiolÃ³gicos para sistemas de alerta temprana." },
  { id: 6, name: "Felipe", surname: "Mora", role: "Profesor Titular", dept: "RobÃ³tica e IA", seed: "Felipe Mora", tags: ["RobÃ³tica", "Computer Vision", "Deep Learning"], groups: ["RoboticsLab"], projects: 7, pubs: 61, open: false, match: 69, bio: "Sistemas de percepciÃ³n visual para robots autÃ³nomos en entornos no estructurados." },
];

const opportunities = [
  { id: 1, title: "Postdoc â€“ IA aplicada a salud", dept: "BiomÃ©dica + CS", deadline: "30 Abr", type: "Postdoc", hot: true, desc: "PosiciÃ³n postdoctoral para investigar aplicaciones de machine learning en datos de salud." },
  { id: 2, title: "Convocatoria ANID Fondecyt 2026", dept: "Todas las Ã¡reas", deadline: "15 May", type: "Fondos", hot: true, desc: "Fondos regulares hasta $300.000 USD, duraciÃ³n 4 aÃ±os." },
  { id: 3, title: "ColaboraciÃ³n EU Horizon â€“ Quantum", dept: "FÃ­sica Comp.", deadline: "1 Jun", type: "Internacional", hot: false, desc: "Busco collaborator para propuesta EU Horizon sobre computaciÃ³n cuÃ¡ntica." },
  { id: 4, title: "Tesis Doctoral â€“ NLP MultilingÃ¼e", dept: "CS", deadline: "20 May", type: "Doctorado", hot: false, desc: "Estudiante doctoral para investigaciÃ³n en modelos de lenguaje multilingÃ¼e." },
  { id: 5, title: "Research Engineer â€“ Vision", dept: "RobÃ³tica e IA", deadline: "10 May", type: "Laboral", hot: true, desc: "Research engineer para sistemas de visiÃ³n por computador." },
  { id: 6, title: "Beca Marie Curie â€“ Climate AI", dept: "Todas las Ã¡reas", deadline: "25 Jun", type: "Internacional", hot: false, desc: "Beca postdoctoral europea para IA aplicada al cambio climÃ¡tico." },
];

const mockMessages = [
  { orcid: "0000-0002-1234-5678", name: "Elena Vargas", seed: "Elena Vargas", messages: [
    { id: 1, from: "them", text: "Hola! Vi tu perfil y me interesa tu trabajo en sistemas distribuidos.", ts: "10:32" },
    { id: 2, from: "me", text: "Hola Elena! Encantado. CuÃ©ntame mÃ¡s.", ts: "10:35" },
    { id: 3, from: "them", text: "Es sobre sensores distribuidos para monitorizaciÃ³n ambiental.", ts: "10:37" },
  ]},
  { orcid: "0000-0003-9876-5432", name: "Felipe Mora", seed: "Felipe Mora", messages: [
    { id: 1, from: "them", text: "Hey! Tu perfil de IoT me interesa. Tengo un proyecto de robotics.", ts: "Ayer" },
  ]},
];

const userProfile = {
  name: "JosÃ© Ignacio", surname: "HernÃ¡ndez",
  role: "Doctorando", dept: "IngenierÃ­a de Sistemas",
  seed: "JosÃ© HernÃ¡ndez",
  tags: ["Sistemas Distribuidos", "IoT", "Machine Learning"],
  groups: ["DistributedSys Lab", "IoT Center"],
  projects: 2, pubs: 8,
  bio: "Doctorando enfocado en sistemas distribuidos e IoT. Busco colaboraciones.",
  open: true,
};

const allDepts = ["Todos", ...new Set(researchers.map((r) => r.dept))];

// â”€â”€â”€ THEME COLORS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const light = {
  bg: "#f8fafc",
  surface: "#ffffff",
  surfaceHover: "#f9fafb",
  border: "#e4e7eb",
  textPrimary: "#0f172a",
  textSecondary: "#64748b",
  textTertiary: "#94a3b8",
  accent: "#059669",
  accentLight: "#d1fae5",
  orange: "#ea580c",
  headerBg: "rgba(255,255,255,0.92)",
  headerText: "#0f172a",
  navBg: "#f1f5f9",
  navItemBg: "#ffffff",
  navItemColor: "#64748b",
  shadowCard: "0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
  shadowHover: "0 8px 32px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)",
};

const dark = {
  bg: "#0c0c0e",
  surface: "#141416",
  surfaceHover: "#1c1c20",
  border: "#242428",
  textPrimary: "#ededef",
  textSecondary: "#8b8b96",
  textTertiary: "#45454d",
  accent: "#5b8fd4",
  accentLight: "rgba(91,143,212,0.10)",
  orange: "#fb923c",
  headerBg: "rgba(12,12,14,0.97)",
  headerText: "#ededef",
  navBg: "#0c0c0e",
  navItemBg: "#1c1c20",
  navItemColor: "#6b6b78",
  shadowCard: "0 0 0 1px #242428",
  shadowHover: "0 0 0 1px #303038, 0 8px 40px rgba(0,0,0,0.55)",
};

// â”€â”€â”€ AVATAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function Avatar({ seed, size = 52 }: { seed: string; size?: number }) {
  const [config] = useState(() => genConfig(seed));
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
      <AvatarLib {...config} style={{ width: size, height: size }} />
    </div>
  );
}

// â”€â”€â”€ SKELETON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function SkeletonLoader({ t }: { t: typeof light }) {
  return (
    <div style={{ background: t.bg, minHeight: "100vh", padding: 40 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "center" }}>
          <div className="skeleton-shimmer" style={{ width: 52, height: 52, borderRadius: "50%" }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton-shimmer" style={{ width: "40%", height: 14, borderRadius: 4, marginBottom: 6 }} />
            <div className="skeleton-shimmer-dim" style={{ width: "25%", height: 11, borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// â”€â”€â”€ DETAIL PANEL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function DetailPanel({ researcher, onClose, onConnect, isConnected, t }: {
  researcher: (typeof researchers)[0];
  onClose: () => void;
  onConnect: () => void;
  isConnected: boolean;
  t: typeof light;
}) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, top: 64, background: "rgba(0,0,0,0.55)", zIndex: 39, backdropFilter: "blur(6px)" }} />
      <div style={{
        position: "fixed", top: 64, right: 0, bottom: 0, width: 380,
        background: t.surface, borderLeft: `1px solid ${t.border}`,
        zIndex: 50, display: "flex", flexDirection: "column",
        boxShadow: t.shadowHover,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${t.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em" }}>Perfil</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: t.textTertiary, fontSize: 20, lineHeight: 1, padding: 4 }}>Ã—</button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Avatar seed={researcher.seed} size={72} />
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.02em", marginBottom: 2 }}>{researcher.name} {researcher.surname}</h2>
              <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 2 }}>{researcher.role}</p>
              <p style={{ fontSize: 12, color: t.textTertiary }}>{researcher.dept}</p>
              {researcher.open && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6, fontSize: 10, fontWeight: 600, color: "var(--open-color)", background: "var(--open-bg)", border: "1px solid var(--open-border)", padding: "2px 8px", borderRadius: 20 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--open-dot)" }} />Disponible
                </span>
              )}
            </div>
          </div>
          <div style={{ background: t.surfaceHover, border: `1px solid ${t.border}`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: t.accent, letterSpacing: "-0.03em", lineHeight: 1 }}>{researcher.match}%</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: t.textPrimary }}> affinity</div>
              <div style={{ fontSize: 11, color: t.textTertiary }}>segÃºn Ã¡reas y publicaciones</div>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>BiografÃ­a</p>
            <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.7 }}>{researcher.bio}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[{ v: researcher.pubs, l: "Publicaciones" }, { v: researcher.projects, l: "Proyectos" }, { v: researcher.groups.length, l: "Grupos" }].map((s) => (
              <div key={s.l} style={{ background: t.surfaceHover, border: `1px solid ${t.border}`, borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: t.textPrimary, letterSpacing: "-0.03em", marginBottom: 2 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: t.textTertiary, fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Ãreas</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {researcher.tags.map((tag) => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 500, color: t.textSecondary, background: t.surfaceHover, border: `1px solid ${t.border}`, padding: "4px 10px", borderRadius: 20 }}>{tag}</span>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Grupos</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {researcher.groups.map((g) => (
                <span key={g} style={{ fontSize: 11, fontWeight: 500, color: t.accent, background: t.accentLight, border: `1px solid ${t.accent}25`, padding: "4px 10px", borderRadius: 6 }}>{g}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: "16px 20px", borderTop: `1px solid ${t.border}`, display: "flex", gap: 8 }}>
          <button onClick={onConnect} style={{
            flex: 1, padding: "10px 16px", borderRadius: 8, border: "none",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: isConnected ? t.accentLight : t.accent,
            color: isConnected ? t.accent : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            {isConnected ? <><Check size={14} /> Conectado</> : <><Users size={14} /> Conectar</>}
          </button>
          {!isConnected && (
            <button style={{ flex: 1, padding: "10px 16px", borderRadius: 8, border: `1px solid ${t.border}`, fontSize: 13, fontWeight: 600, cursor: "pointer", background: t.surface, color: t.textPrimary, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <MessageCircle size={14} /> Mensaje
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// â”€â”€â”€ OPPORTUNITY MODAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function OppModal({ opp, onClose, t }: { opp: (typeof opportunities)[0]; onClose: () => void; t: typeof light }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Postdoc: { bg: "#e0f2fe", text: "#0369a1" },
    Fondos: { bg: "#dcfce7", text: "#15803d" },
    Internacional: { bg: "#f3e8ff", text: "#7c3aed" },
    Doctorado: { bg: "#fce7f3", text: "#be185d" },
    Laboral: { bg: "#d1fae5", text: "#059669" },
  };
  const c = colors[opp.type] ?? { bg: "#f3f4f6", text: "#374151" };
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 200, backdropFilter: "blur(6px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "100%", maxWidth: 480, background: t.surface, borderRadius: 16,
        border: `1px solid ${t.border}`, padding: 28, zIndex: 201,
        boxShadow: t.shadowHover,
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: t.textTertiary }}>
          <X size={18} />
        </button>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: c.text, background: c.bg, padding: "3px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em" }}>{opp.type}</span>
          {opp.hot && <span style={{ fontSize: 10, fontWeight: 700, color: t.orange, background: `${t.orange}18`, padding: "3px 10px", borderRadius: 20 }}>ðŸ”¥ Hot</span>}
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.02em", marginBottom: 6, lineHeight: 1.3 }}>{opp.title}</h2>
        <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 16 }}>{opp.dept} Â· <span style={{ color: "#ea580c", fontWeight: 600 }}>Hasta {opp.deadline}</span></p>
        <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.7, marginBottom: 24 }}>{opp.desc}</p>
        <button style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: t.accent, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <ExternalLink size={14} /> MÃ¡s informaciÃ³n
        </button>
      </div>
    </>
  );
}

// â”€â”€â”€ RESEARCHER CARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ResearcherCard({ researcher, onSelect, onConnect, isConnected, t }: {
  researcher: (typeof researchers)[0];
  onSelect: () => void;
  onConnect: (e: React.MouseEvent) => void;
  isConnected: boolean;
  t: typeof light;
}) {
  return (
    <div onClick={onSelect} className="card-accent researcher-card" style={{
      background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14,
      padding: 20, cursor: "pointer",
      display: "flex", flexDirection: "column", gap: 14,
    }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Avatar seed={researcher.seed} size={52} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary, lineHeight: 1.2 }}>{researcher.name} {researcher.surname}</span>
            <span style={{ fontSize: 11, fontWeight: 500, color: t.textTertiary, flexShrink: 0, letterSpacing: "0.01em", opacity: 0.8 }}>{researcher.match}%</span>
          </div>
          <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.3, marginBottom: 1 }}>{researcher.role}</p>
          <p style={{ fontSize: 11, color: t.textTertiary }}>{researcher.dept}</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {researcher.tags.map((tag) => (
          <span key={tag} style={{ fontSize: 10, fontWeight: 500, color: t.textSecondary, background: t.surfaceHover, border: `1px solid ${t.border}`, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.01em" }}>{tag}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4, borderTop: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ fontSize: 11, color: t.textSecondary }}>{researcher.pubs} <span style={{ fontWeight: 600, color: t.textPrimary }}>papers</span></span>
          <span style={{ fontSize: 11, color: t.textSecondary }}>{researcher.projects} <span style={{ fontWeight: 600, color: t.textPrimary }}>proyectos</span></span>
        </div>
        {researcher.open && (
          <span style={{ fontSize: 9, fontWeight: 600, color: "var(--open-dot)", background: "var(--open-dot-bg)", border: "1px solid var(--open-dot-border)", padding: "2px 7px", borderRadius: 4, display: "flex", alignItems: "center", gap: 4, letterSpacing: "0.04em" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--open-dot)" }} />Disponible
          </span>
        )}
        <button onClick={onConnect} style={{
          padding: "5px 12px", borderRadius: 6, border: `1px solid ${isConnected ? t.accent + "40" : t.border}`,
          fontSize: 11, fontWeight: 600, cursor: "pointer",
          background: "transparent",
          color: isConnected ? t.accent : t.textSecondary,
          transition: "all 0.15s",
        }}>
          {isConnected ? "âœ“ Conectado" : "+ Conectar"}
        </button>
      </div>
    </div>
  );
}

// â”€â”€â”€ NETWORK CARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function NetworkCard({ researcher, onDisconnect, onMessage, t }: {
  researcher: (typeof researchers)[0];
  onDisconnect: () => void;
  onMessage: () => void;
  t: typeof light;
}) {
  return (
    <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, transition: "border-color 0.15s ease" }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = t.accent + "35"; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = t.border; }}
    >
      <Avatar seed={researcher.seed} size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, marginBottom: 1 }}>{researcher.name} {researcher.surname}</p>
        <p style={{ fontSize: 11, color: t.textTertiary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{researcher.role} Â· {researcher.dept}</p>
      </div>
      <span style={{ fontSize: 11, fontWeight: 500, color: t.textTertiary, opacity: 0.65, flexShrink: 0 }}>{researcher.match}%</span>
      <button onClick={onMessage} title="Mensaje" style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${t.border}`, background: t.surface, color: t.textSecondary, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
        <MessageCircle size={14} />
      </button>
      <button onClick={onDisconnect} title="Desconectar" style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.textTertiary, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
        <X size={14} />
      </button>
    </div>
  );
}

// â”€â”€â”€ MESSAGES VIEW â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function MessagesView({ conversations, onSelect, onBack, selectedOrcid, messages, onSend, newMessage, setNewMessage, t }: {
  conversations: (typeof mockMessages);
  onSelect: (orcid: string) => void;
  onBack: () => void;
  selectedOrcid: string | null;
  messages: { id: number; from: string; text: string; ts: string }[];
  onSend: () => void;
  newMessage: string;
  setNewMessage: (v: string) => void;
  t: typeof light;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  const selectedConv = conversations.find((c) => c.orcid === selectedOrcid);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  if (selectedOrcid && selectedConv) {
    return (
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px", display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${t.border}` }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: t.textSecondary, display: "flex" }}><ArrowLeft size={16} /></button>
          <Avatar seed={selectedConv.seed} size={36} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: t.textPrimary }}>{selectedConv.name}</p>
            <p style={{ fontSize: 11, color: t.textTertiary }}>{messages.length} mensajes</p>
          </div>
        </div>
        <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: "flex", justifyContent: msg.from === "me" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "72%", padding: "10px 14px", borderRadius: 16,
                background: msg.from === "me" ? t.accentLight : t.surfaceHover,
                color: msg.from === "me" ? t.textPrimary : t.textPrimary,
                fontSize: 13, lineHeight: 1.5,
                border: msg.from === "me" ? `1px solid ${t.accent}20` : "1px solid transparent",
                borderBottomRightRadius: msg.from === "me" ? "4px" : "16px",
                borderBottomLeftRadius: msg.from === "me" ? "16px" : "4px",
              }}>
                {msg.text}
                <div style={{ fontSize: 9, opacity: 0.6, marginTop: 3, textAlign: "right" }}>{msg.ts}</div>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSend()} placeholder="Escribe un mensaje..." style={{ flex: 1, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 24, padding: "10px 16px", color: t.textPrimary, fontSize: 13, outline: "none", transition: "border-color 0.15s, box-shadow 0.15s" }}
          onFocus={(e) => { const i = e.currentTarget as HTMLInputElement; i.style.borderColor = t.accent + "60"; i.style.boxShadow = `0 0 0 3px ${t.accent}15`; }}
          onBlur={(e) => { const i = e.currentTarget as HTMLInputElement; i.style.borderColor = t.border; i.style.boxShadow = "none"; }}
          />
          <button onClick={onSend} style={{ width: 40, height: 40, borderRadius: "50%", border: `1px solid ${t.accent}50`, background: `${t.accent}12`, color: t.accent, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
            onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = t.accent; b.style.color = "#fff"; b.style.borderColor = t.accent; }}
            onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = `${t.accent}12`; b.style.color = t.accent; b.style.borderColor = `${t.accent}50`; }}>
            <Send size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.03em", marginBottom: 4 }}>Mensajes</h1>
      <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 24 }}>Conversaciones con tus contactos</p>
      {conversations.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 24px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12 }}>
          <MessageCircle size={32} style={{ color: t.textTertiary, marginBottom: 12, display: "block", margin: "0 auto 12px" }} />
          <p style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, marginBottom: 4 }}>Sin mensajes aÃºn</p>
          <p style={{ fontSize: 12, color: t.textTertiary }}>ConÃ©ctate con investigadores para empezar</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {conversations.map((conv) => (
            <div key={conv.orcid} onClick={() => onSelect(conv.orcid)} style={{ display: "flex", alignItems: "center", gap: 12, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", transition: "border-color 0.15s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = t.accent + "35"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = t.border; }}
            >
              <Avatar seed={conv.seed} size={44} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary }}>{conv.name}</p>
                  <span style={{ fontSize: 10, color: t.textTertiary }}>{conv.messages[conv.messages.length - 1].ts}</span>
                </div>
                <p style={{ fontSize: 12, color: t.textSecondary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{conv.messages[conv.messages.length - 1].text}</p>
              </div>
              {conv.messages.some((m) => m.from === "them") && <Circle size={8} style={{ color: t.accent, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ NAV â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function NavBar({ view, setView, connectedCount, unreadCount, t }: {
  view: string; setView: (v: string) => void;
  connectedCount: number; unreadCount: number; t: typeof light;
}) {
  const items = [
    { key: "discover", icon: <Search size={15} />, label: "Descubrir" },
    { key: "opportunities", icon: <Zap size={15} />, label: "Oportunidades" },
    { key: "network", icon: <Users size={15} />, label: "Red", badge: connectedCount },
    { key: "messages", icon: <MessageCircle size={15} />, label: "Mensajes", badge: unreadCount },
    { key: "profile", icon: <User size={15} />, label: "Perfil" },
  ];

  return (
    <nav style={{ display: "flex", gap: 2, background: t.navBg, borderRadius: 10, padding: 4 }}>
      {items.map((item) => (
        <button key={item.key} onClick={() => setView(item.key)} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, border: "none",
          fontSize: 13, fontWeight: 500, cursor: "pointer",
          background: view === item.key ? t.navItemBg : "transparent",
          color: view === item.key ? t.textPrimary : t.navItemColor,
          transition: "background 0.15s, color 0.15s",
          position: "relative",
        }}>
          {view === item.key && (
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, borderRadius: 2, background: t.accent }} />
          )}
          <span style={{ display: "flex", color: view === item.key ? t.accent : t.textTertiary }}>{item.icon}</span>
          {item.label}
          {item.badge !== undefined && item.badge > 0 && (
            <span style={{ background: item.key === "messages" ? "#ef4444" : t.accent + "25", color: item.key === "messages" ? "#fff" : t.accent, fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 20, minWidth: 18, textAlign: "center" }}>{item.badge}</span>
          )}
        </button>
      ))}
    </nav>
  );
}

// â”€â”€â”€ THEME TOGGLE ICON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  const isDark = theme === "dark";
  return (
    <button onClick={onToggle} style={{
      padding: "6px 10px", borderRadius: 8,
      border: "1px solid var(--border)", background: "var(--surface)",
      color: "var(--text-secondary)", fontSize: 12, fontWeight: 600,
      cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
      flexShrink: 0,
      transition: "border-color 0.15s, background 0.15s, color 0.15s",
    }}
    onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = isDark ? "#303038" : "#cbd5e1"; b.style.background = "var(--surface-hover)"; }}
    onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--border)"; b.style.background = "var(--surface)"; }}
    >
      <div style={{ transition: "transform 0.4s ease", transform: theme === "dark" ? "rotate(180deg) scale(1.15)" : "rotate(0deg) scale(1)" }}>
        {theme === "light" ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        )}
      </div>
    </button>
  );
}

// â”€â”€â”€ MAIN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function App() {
  const [view, setView] = useState("discover");
  const [selectedDept, setSelectedDept] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [connectedIds, setConnectedIds] = useState<number[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedResearcher, setSelectedResearcher] = useState<(typeof researchers)[0] | null>(null);
  const [selectedOpp, setSelectedOpp] = useState<(typeof opportunities)[0] | null>(null);
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [conversations] = useState(mockMessages);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const t = theme === "dark" ? dark : light;

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && localStorage.getItem("rn_onboarding_done")) setShowOnboarding(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSelectedResearcher(null); setSelectedOpp(null); setSelectedConv(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = researchers.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (r.name.toLowerCase().includes(q) || r.tags.some((tag) => tag.toLowerCase().includes(q)) || r.dept.toLowerCase().includes(q))
      && (selectedDept === "Todos" || r.dept === selectedDept)
      && (!onlyOpen || r.open);
  });

  const connectedResearchers = researchers.filter((r) => connectedIds.includes(r.id));
  const unread = conversations.reduce((acc, c) => acc + c.messages.filter((m) => m.from === "them").length, 0);
  const activeMsgs = selectedConv ? (conversations.find((c) => c.orcid === selectedConv)?.messages ?? []) : [];

  if (!mounted) return <SkeletonLoader t={t} />;

  return (
    <div style={{ background: t.bg, minHeight: "100vh", color: t.textPrimary }}>

      {/* HEADER */}
      <header style={{
        background: t.headerBg, borderBottom: `1px solid ${t.border}`,
        padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
        boxShadow: t.shadowCard,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${t.accent}, ${t.accent}cc)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Users size={16} color="#fff" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, color: t.headerText, letterSpacing: "-0.04em" }}>ResearchNet</span>
        </div>
        <NavBar view={view} setView={setView} connectedCount={connectedIds.length} unreadCount={unread} t={t} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: t.textSecondary }}>
            <Globe size={13} />
            <span>{researchers.filter((r) => r.open).length} abiertos Â· {researchers.length} investigadores</span>
          </div>
          <ThemeToggle theme={theme} onToggle={() => setTheme((v) => v === "light" ? "dark" : "light")} />
        </div>
      </header>

      {/* ONBOARDING */}
      {showOnboarding && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.60)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: t.surface, borderRadius: 20, padding: 36, maxWidth: 420, width: "100%", textAlign: "center", boxShadow: t.shadowHover }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${t.accent}, ${t.accent}cc)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Users size={24} color="#fff" />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.03em", marginBottom: 8 }}>Bienvenido a ResearchNet</h2>
            <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.6, marginBottom: 24 }}>Conecta tu perfil ORCID para auto-completar tu informaciÃ³n y descubrir investigadores complementarios.</p>
            <button onClick={() => { window.location.href = "/api/auth/orcid"; }} style={{ width: "100%", padding: "12px 20px", borderRadius: 8, border: "none", background: t.accent, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.178 3.872-3.722 0-1.797-.897-3.722-3.903-3.722h-2.266z"/></svg>
              Conectar con ORCID
            </button>
            <button onClick={() => { setShowOnboarding(false); localStorage.setItem("rn_onboarding_done", "1"); }} style={{ background: "none", border: "none", color: t.textTertiary, fontSize: 12, cursor: "pointer" }}>Omitir por ahora</button>
          </div>
        </div>
      )}

      {/* DETAIL PANEL */}
      {selectedResearcher && (
        <DetailPanel researcher={selectedResearcher} onClose={() => setSelectedResearcher(null)}
          onConnect={() => setConnectedIds((p) => p.includes(selectedResearcher.id) ? p.filter((x) => x !== selectedResearcher.id) : [...p, selectedResearcher.id])}
          isConnected={connectedIds.includes(selectedResearcher.id)} t={t} />
      )}

      {/* OPPORTUNITY MODAL */}
      {selectedOpp && <OppModal opp={selectedOpp} onClose={() => setSelectedOpp(null)} t={t} />}

      {/* â”€â”€ DISCOVER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {view === "discover" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 60px" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.04em", marginBottom: 4 }}>Descubrir investigadores</h1>
            <p style={{ fontSize: 14, color: t.textSecondary }}>Encuentra colaboradores para tu prÃ³ximo proyecto</p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", flex: 1, minWidth: 200 }}>
              <Search size={14} color={t.textTertiary} />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar por nombre, Ã¡rea o departamento..." style={{ background: "transparent", border: "none", outline: "none", color: t.textPrimary, fontSize: 13, flex: 1 }} />
            </div>
            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} style={{ appearance: "none", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, color: t.textSecondary, fontSize: 13, fontWeight: 500, padding: "8px 12px", cursor: "pointer" }}>
              {allDepts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <button onClick={() => setOnlyOpen((p) => !p)} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${onlyOpen ? t.accent : t.border}`, fontSize: 12, fontWeight: 500, cursor: "pointer", background: onlyOpen ? t.accentLight : "transparent", color: onlyOpen ? t.accent : t.textSecondary, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: onlyOpen ? t.accent : t.textTertiary, display: "inline-block" }} />
              Solo disponibles
            </button>
          </div>
          <p style={{ fontSize: 12, color: t.textTertiary, fontWeight: 500, marginBottom: 14 }}>{filtered.length} investigador{filtered.length !== 1 ? "es" : ""}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {filtered.map((r) => (
              <ResearcherCard key={r.id} researcher={r} onSelect={() => setSelectedResearcher(r)}
                onConnect={(e) => { e.stopPropagation(); setConnectedIds((p) => p.includes(r.id) ? p.filter((x) => x !== r.id) : [...p, r.id]); }}
                isConnected={connectedIds.includes(r.id)} t={t} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 24px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: t.surfaceHover, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Search size={24} style={{ color: t.textTertiary }} />
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, marginBottom: 4 }}>Sin resultados</p>
              <p style={{ fontSize: 12, color: t.textTertiary }}>Prueba con otros filtros o cambia el tÃ©rmino de bÃºsqueda</p>
            </div>
          )}
        </div>
      )}

      {/* â”€â”€ OPPORTUNITIES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {view === "opportunities" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 60px" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.04em", marginBottom: 4 }}>Oportunidades</h1>
            <p style={{ fontSize: 14, color: t.textSecondary }}>Postdocs, becas, convocatorias y mÃ¡s</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {opportunities.map((opp) => {
              const c: Record<string, { bg: string; text: string }> = { Postdoc: { bg: "#e0f2fe", text: "#0369a1" }, Fondos: { bg: "#dcfce7", text: "#15803d" }, Internacional: { bg: "#f3e8ff", text: "#7c3aed" }, Doctorado: { bg: "#fce7f3", text: "#be185d" }, Laboral: { bg: "#d1fae5", text: "#059669" } };
              const col = c[opp.type] ?? { bg: "#f3f4f6", text: "#374151" };
              return (
                <div key={opp.id} onClick={() => setSelectedOpp(opp)} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 20, cursor: "pointer", display: "flex", flexDirection: "column", gap: 10, transition: "border-color 0.15s ease, box-shadow 0.15s ease" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = t.accent + "35"; el.style.boxShadow = t.shadowHover; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = t.border; el.style.boxShadow = t.shadowCard; }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: col.text, background: col.bg, padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em" }}>{opp.type}</span>
                    {opp.hot && <span style={{ fontSize: 10, fontWeight: 700, color: "#ea580c" }}>ðŸ”¥</span>}
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, lineHeight: 1.4 }}>{opp.title}</h3>
                  <p style={{ fontSize: 12, color: t.textTertiary }}>{opp.dept}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                    <span style={{ fontSize: 12, color: "#ea580c", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} />{opp.deadline}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: t.accent, display: "flex", alignItems: "center", gap: 3 }}>Ver mÃ¡s <ChevronRight size={12} /></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* â”€â”€ NETWORK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {view === "network" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 60px" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.04em", marginBottom: 4 }}>Tu red</h1>
            <p style={{ fontSize: 14, color: t.textSecondary }}>{connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red</p>
          </div>
          {connectedResearchers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 32px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16 }}>
              <div style={{ width: 72, height: 72, borderRadius: 20, background: t.surfaceHover, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="11" cy="18" r="5" stroke={t.textTertiary} strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
                  <circle cx="26" cy="9" r="4" stroke={t.textTertiary} strokeWidth="1.2" fill="none" strokeDasharray="3 2" opacity="0.5"/>
                  <circle cx="26" cy="27" r="4" stroke={t.textTertiary} strokeWidth="1.2" fill="none" strokeDasharray="3 2" opacity="0.5"/>
                  <path d="M15.5 16.5 L22.5 11" stroke={t.textTertiary} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.3"/>
                  <path d="M15.5 19.5 L22.5 25" stroke={t.textTertiary} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.3"/>
                </svg>
              </div>
              <p style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, marginBottom: 8 }}>Tu red estÃ¡ vacÃ­a</p>
              <p style={{ fontSize: 13, color: t.textSecondary, maxWidth: 280, margin: "0 auto 28px", lineHeight: 1.6 }}>Explora investigadores y conÃ©ctate para construir tu red de colaboraciÃ³n.</p>
              <button onClick={() => setView("discover")} style={{ padding: "10px 22px", borderRadius: 8, background: t.accent, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.01em" }}>Descubrir investigadores</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {connectedResearchers.map((r) => (
                <NetworkCard key={r.id} researcher={r} t={t}
                  onDisconnect={() => setConnectedIds((p) => p.filter((x) => x !== r.id))}
                  onMessage={() => { setSelectedConv("orcid-" + r.id); setView("messages"); }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* â”€â”€ MESSAGES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {view === "messages" && (
        <MessagesView conversations={conversations} onSelect={(orcid) => setSelectedConv(orcid)} onBack={() => setSelectedConv(null)}
          selectedOrcid={selectedConv} messages={activeMsgs} onSend={() => { if (newMessage.trim() && selectedConv) setNewMessage(""); }}
          newMessage={newMessage} setNewMessage={setNewMessage} t={t} />
      )}

      {/* â”€â”€ PROFILE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {view === "profile" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 60px" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.04em", marginBottom: 4 }}>Tu perfil</h1>
            <p style={{ fontSize: 14, color: t.textSecondary }}>Gestiona tu informaciÃ³n de investigador</p>
          </div>
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 28, marginBottom: 16, boxShadow: t.shadowCard }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24 }}>
              <Avatar seed={userProfile.seed} size={72} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                  <h2 style={{ fontSize: 22, fontWeight: 600, color: t.textPrimary, letterSpacing: "-0.02em", fontFamily: "var(--font-playfair), Georgia, serif" }}>{userProfile.name} {userProfile.surname}</h2>
                  {userProfile.open && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: t.accent, background: t.accentLight, border: `1px solid ${t.accent}40`, padding: "2px 8px", borderRadius: 20, display: "flex", alignItems: "center", gap: 3 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.accent }} />Disponible
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 2 }}>{userProfile.role}</p>
                <p style={{ fontSize: 12, color: t.textTertiary }}>{userProfile.dept}</p>
              </div>
              <button style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>Editar perfil</button>
            </div>
            <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.7, marginBottom: 20 }}>{userProfile.bio}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              {userProfile.tags.map((tag) => (
                <span key={tag} style={{ fontSize: 12, fontWeight: 500, color: t.accent, background: t.accentLight, border: `1px solid ${t.accent}30`, padding: "4px 12px", borderRadius: 20 }}>{tag}</span>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Grupos de investigaciÃ³n</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {userProfile.groups.map((g) => (
                  <span key={g} style={{ fontSize: 12, fontWeight: 500, color: t.textSecondary, background: t.surfaceHover, border: `1px solid ${t.border}`, padding: "4px 12px", borderRadius: 6 }}>{g}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
            {[{ v: userProfile.pubs, l: "Publicaciones", icon: <BookOpen size={16} /> }, { v: userProfile.projects, l: "Proyectos", icon: <Briefcase size={16} /> }, { v: connectedIds.length, l: "Conexiones", icon: <Users size={16} /> }].map((s) => (
              <div key={s.l} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: "20px 16px", textAlign: "center", boxShadow: t.shadowCard }}>
                <div style={{ color: t.textTertiary, marginBottom: 8, display: "flex", justifyContent: "center" }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: t.textPrimary, letterSpacing: "-0.04em", marginBottom: 4 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: t.textTertiary, fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: 20, boxShadow: t.shadowCard }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: t.textPrimary, marginBottom: 14 }}>Acciones rÃ¡pidas</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[{ label: "Ver mi perfil pÃºblico", icon: <ExternalLink size={13} /> }, { label: "Invitar a un colega", icon: <Users size={13} /> }, { label: "Exportar mi CV", icon: <BookOpen size={13} /> }].map((a) => (
                <button key={a.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 8, background: t.surfaceHover, border: `1px solid ${t.border}`, color: t.textSecondary, fontSize: 13, fontWeight: 500, cursor: "pointer", width: "100%", textAlign: "left", transition: "border-color 0.15s ease, color 0.15s ease" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = t.accent + "35"; el.style.color = t.textPrimary; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = t.border; el.style.color = t.textSecondary; }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8, color: t.accent }}>{a.icon}{a.label}</span>
                  <ChevronRight size={13} color={t.textTertiary} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
