"use client";

import { useState, useEffect, useRef } from "react";
import AvatarLib, { genConfig } from "react-nice-avatar";
import {
  Search, Users, Zap, User, BookOpen,
  Briefcase, Clock, Globe,
  ExternalLink, ChevronRight, MessageCircle,
  Send, ArrowLeft, Check, Circle, Menu, X,
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const researchers = [
  { id: 1, name: "Elena Vargas", surname: "Ruiz", role: "Profesora Titular", dept: "Ingeniería Biomédica", seed: "Elena Vargas", tags: ["Machine Learning", "Neurociencia", "BCI"], groups: ["NeuroAI Lab"], projects: 4, pubs: 38, open: true, match: 97, bio: "Interiores cerebro-computadora y modelos de aprendizaje profundo aplicados a señales neuronales." },
  { id: 2, name: "Marcos", surname: "Ibáñez", role: "Investigador Senior", dept: "Ciencias de la Computación", seed: "Marcos Ibáñez", tags: ["NLP", "LLMs", "Ética en IA"], groups: ["NLP Group"], projects: 6, pubs: 52, open: true, match: 91, bio: "Modelos de lenguaje multilingüe y los desafíos éticos que plantea la IA generativa." },
  { id: 3, name: "Sofía", surname: "Ríos", role: "Profesora Asociada", dept: "Biología Molecular", seed: "Sofía Ríos", tags: ["Genómica", "CRISPR", "Bioinformática"], groups: ["GenomicsLab"], projects: 3, pubs: 29, open: false, match: 85, bio: "Herramientas computacionales para análisis de variantes genéticas y edición génica." },
  { id: 4, name: "Andrés", surname: "Leal", role: "Profesor Asociado", dept: "Física Computacional", seed: "Andrés Leal", tags: ["Computación Cuántica", "Simulación", "Algoritmos"], groups: ["QuantumCS"], projects: 5, pubs: 44, open: true, match: 78, bio: "Algoritmos cuánticos para simulación de sistemas complejos y optimización combinatoria." },
  { id: 5, name: "Carmen", surname: "Fuentes", role: "Investigadora Posdoctoral", dept: "Salud Pública", seed: "Carmen Fuentes", tags: ["Epidemiología", "Salud Digital", "ML"], groups: ["DataHealth"], projects: 2, pubs: 17, open: true, match: 73, bio: "Modelos predictivos a datos epidemiológicos para sistemas de alerta temprana." },
  { id: 6, name: "Felipe", surname: "Mora", role: "Profesor Titular", dept: "Robótica e IA", seed: "Felipe Mora", tags: ["Robótica", "Computer Vision", "Deep Learning"], groups: ["RoboticsLab"], projects: 7, pubs: 61, open: false, match: 69, bio: "Sistemas de percepción visual para robots autónomos en entornos no estructurados." },
];

const opportunities = [
  { id: 1, title: "Postdoc – IA aplicada a salud", dept: "Biomédica + CS", deadline: "30 Abr", type: "Postdoc", hot: true, desc: "Posición postdoctoral para investigar aplicaciones de machine learning en datos de salud. Requiere doctorado reciente." },
  { id: 2, title: "Convocatoria ANID Fondecyt 2026", dept: "Todas las áreas", deadline: "15 May", type: "Fondos", hot: true, desc: "Fondos regulares para proyectos de investigación. Hasta $300.000 USD, duración 4 años." },
  { id: 3, title: "Colaboración EU Horizon – Quantum", dept: "Física Comp.", deadline: "1 Jun", type: "Internacional", hot: false, desc: "Busco collaborator para propuesta EU Horizon sobre computación cuántica." },
  { id: 4, title: "Tesis Doctoral – NLP Multilingüe", dept: "CS", deadline: "20 May", type: "Doctorado", hot: false, desc: "Estudiante doctoral para investigación en modelos de lenguaje multilingüe." },
  { id: 5, title: "Research Engineer – Vision", dept: "Robótica e IA", deadline: "10 May", type: "Laboral", hot: true, desc: "Research engineer para sistemas de visión por computador. Salario competitivo." },
  { id: 6, title: "Beca Marie Curie – Climate AI", dept: "Todas las áreas", deadline: "25 Jun", type: "Internacional", hot: false, desc: "Beca postdoctoral europea para IA aplicada al cambio climático." },
];

const mockMessages = [
  { orcid: "0000-0002-1234-5678", name: "Elena Vargas", seed: "Elena Vargas", messages: [
    { id: 1, from: "them", text: "Hola! Vi tu perfil y me interesa mucho tu trabajo en sistemas distribuidos. Estamos buscando collaborators para un proyecto de IoT.", ts: "10:32" },
    { id: 2, from: "me", text: "Hola Elena! Encantado. Cuéntame más sobre el proyecto.", ts: "10:35" },
    { id: 3, from: "them", text: "Es un proyecto sobre sensores distribuidos para monitorización ambiental.", ts: "10:37" },
  ]},
  { orcid: "0000-0003-9876-5432", name: "Felipe Mora", seed: "Felipe Mora", messages: [
    { id: 1, from: "them", text: "Hey! Tu perfil de IoT me interesa. Tengo un proyecto de robotics.", ts: "Ayer" },
  ]},
];

const userProfile = {
  name: "José Ignacio", surname: "Hernández",
  role: "Doctorando", dept: "Ingeniería de Sistemas",
  seed: "José Hernández",
  tags: ["Sistemas Distribuidos", "IoT", "Machine Learning"],
  groups: ["DistributedSys Lab", "IoT Center"],
  projects: 2, pubs: 8,
  bio: "Doctorando enfocado en sistemas distribuidos e IoT. Busco colaboraciones en machine learning aplicado a sensores.",
  open: true,
};

const allDepts = ["Todos", ...new Set(researchers.map((r) => r.dept))];

// ─── NICE AVATAR ─────────────────────────────────────────────────────────────

function Avatar({ seed, size = 80, style = {} }: { seed: string; size?: number; style?: React.CSSProperties }) {
  const [config] = useState(() => genConfig(seed));
  return (
    <div style={{ width: size, height: size, ...style }}>
      <AvatarLib {...config} style={{ width: size, height: size }} />
    </div>
  );
}

// ─── SKELETON ───────────────────────────────────────────────────────────────

function SkeletonLoader() {
  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#e9ecef" }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ width: "40%", height: 14, borderRadius: 4, background: "#e9ecef" }} />
              <div style={{ width: "25%", height: 11, borderRadius: 4, background: "#e9ecef" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────

function DetailPanel({ researcher, onClose, onConnect, isConnected }: {
  researcher: (typeof researchers)[0];
  onClose: () => void;
  onConnect: () => void;
  isConnected: boolean;
}) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, top: 64, background: "rgba(0,0,0,0.5)", zIndex: 39, backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "fixed", top: 64, right: 0, bottom: 0, width: 380,
        background: "#fff", borderLeft: "1px solid #e5e7eb",
        zIndex: 50, display: "flex", flexDirection: "column",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Perfil</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 20, lineHeight: 1, padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflow: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Avatar + name */}
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Avatar seed={researcher.seed} size={72} style={{ borderRadius: "50%", overflow: "hidden", flexShrink: 0 }} />
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", letterSpacing: "-0.02em", marginBottom: 2 }}>{researcher.name} {researcher.surname}</h2>
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 2 }}>{researcher.role}</p>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>{researcher.dept}</p>
              {researcher.open && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6, fontSize: 10, fontWeight: 600, color: "#059669", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "2px 8px", borderRadius: 20 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981" }} />
                  Disponible
                </span>
              )}
            </div>
          </div>

          {/* Match */}
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#059669", letterSpacing: "-0.03em", lineHeight: 1 }}>{researcher.match}%</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}> affinity</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>según áreas y publicaciones</div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Biografía</p>
            <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.7 }}>{researcher.bio}</p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[{ v: researcher.pubs, l: "Publicaciones" }, { v: researcher.projects, l: "Proyectos" }, { v: researcher.groups.length, l: "Grupos" }].map((s) => (
              <div key={s.l} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", marginBottom: 2 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Areas */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Áreas de investigación</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {researcher.tags.map((tag) => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 500, color: "#374151", background: "#f3f4f6", border: "1px solid #e5e7eb", padding: "4px 10px", borderRadius: 20 }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Groups */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Grupos</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {researcher.groups.map((g) => (
                <span key={g} style={{ fontSize: 11, fontWeight: 500, color: "#059669", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "4px 10px", borderRadius: 6 }}>{g}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid #f3f4f6", display: "flex", gap: 8 }}>
          <button onClick={onConnect} style={{
            flex: 1, padding: "10px 16px", borderRadius: 8, border: "none",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: isConnected ? "#ecfdf5" : "#059669",
            color: isConnected ? "#059669" : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            {isConnected ? <><Check size={14} /> Conectado</> : <><Users size={14} /> Conectar</>}
          </button>
          {!isConnected && (
            <button style={{
              flex: 1, padding: "10px 16px", borderRadius: 8,
              border: "1px solid #e5e7eb", fontSize: 13, fontWeight: 600,
              cursor: "pointer", background: "#fff", color: "#374151",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <MessageCircle size={14} /> Mensaje
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ─── OPPORTUNITY MODAL ─────────────────────────────────────────────────────

function OppModal({ opp, onClose }: { opp: (typeof opportunities)[0]; onClose: () => void }) {
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
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "100%", maxWidth: 480, background: "#fff", borderRadius: 16,
        border: "1px solid #e5e7eb", padding: 28, zIndex: 201,
        boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
          <X size={18} />
        </button>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: c.text, background: c.bg, padding: "3px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em" }}>{opp.type}</span>
          {opp.hot && <span style={{ fontSize: 10, fontWeight: 700, color: "#ea580c", background: "#fff7ed", padding: "3px 10px", borderRadius: 20 }}>🔥 Hot</span>}
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", letterSpacing: "-0.02em", marginBottom: 6, lineHeight: 1.3 }}>{opp.title}</h2>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>{opp.dept} · <span style={{ color: "#ea580c", fontWeight: 600 }}>Hasta {opp.deadline}</span></p>
        <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.7, marginBottom: 24 }}>{opp.desc}</p>
        <button style={{
          width: "100%", padding: "12px", borderRadius: 8, border: "none",
          background: "#059669", color: "#fff", fontSize: 13, fontWeight: 600,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <ExternalLink size={14} /> Más información
        </button>
      </div>
    </>
  );
}

// ─── RESEARCHER CARD ─────────────────────────────────────────────────────────

function ResearcherCard({ researcher, onSelect, onConnect, isConnected }: {
  researcher: (typeof researchers)[0];
  onSelect: () => void;
  onConnect: (e: React.MouseEvent) => void;
  isConnected: boolean;
}) {
  return (
    <div onClick={onSelect} style={{
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
      padding: "20px", cursor: "pointer",
      transition: "all 0.18s ease",
      display: "flex", flexDirection: "column", gap: 14,
    }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#d1fae5"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)"; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
    >
      {/* Top row */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Avatar seed={researcher.seed} size={52} style={{ borderRadius: "50%", overflow: "hidden", flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>{researcher.name} {researcher.surname}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#059669", flexShrink: 0 }}>{researcher.match}%</span>
          </div>
          <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.3, marginBottom: 1 }}>{researcher.role}</p>
          <p style={{ fontSize: 11, color: "#9ca3af" }}>{researcher.dept}</p>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {researcher.tags.map((tag) => (
          <span key={tag} style={{ fontSize: 10, fontWeight: 500, color: "#4b5563", background: "#f3f4f6", border: "1px solid #e5e7eb", padding: "3px 8px", borderRadius: 20 }}>{tag}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4, borderTop: "1px solid #f3f4f6" }}>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#6b7280" }}><span style={{ fontWeight: 700, color: "#374151" }}>{researcher.pubs}</span> papers</span>
          <span style={{ fontSize: 12, color: "#6b7280" }}><span style={{ fontWeight: 700, color: "#374151" }}>{researcher.projects}</span> proyectos</span>
        </div>
        {researcher.open && (
          <span style={{ fontSize: 9, fontWeight: 700, color: "#059669", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "2px 7px", borderRadius: 20, display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#10b981" }} />Open
          </span>
        )}
        <button
          onClick={onConnect}
          style={{
            padding: "5px 12px", borderRadius: 6, border: "1px solid",
            fontSize: 11, fontWeight: 600, cursor: "pointer",
            background: isConnected ? "#ecfdf5" : "#fff",
            borderColor: isConnected ? "#a7f3d0" : "#d1d5db",
            color: isConnected ? "#059669" : "#374151",
            transition: "all 0.15s",
          }}
        >
          {isConnected ? "✓ Conectado" : "+ Conectar"}
        </button>
      </div>
    </div>
  );
}

// ─── NETWORK CARD ─────────────────────────────────────────────────────────────

function NetworkCard({ researcher, onDisconnect, onMessage }: {
  researcher: (typeof researchers)[0];
  onDisconnect: () => void;
  onMessage: () => void;
}) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
      padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
      transition: "all 0.15s",
    }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#d1fae5"; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb"; }}
    >
      <Avatar seed={researcher.seed} size={40} style={{ borderRadius: "50%", overflow: "hidden", flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 1 }}>{researcher.name} {researcher.surname}</p>
        <p style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{researcher.role} · {researcher.dept}</p>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#059669", flexShrink: 0 }}>{researcher.match}%</div>
      <button onClick={onMessage} title="Mensaje" style={{
        width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb",
        background: "#fff", color: "#6b7280", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <MessageCircle size={14} />
      </button>
      <button onClick={onDisconnect} title="Desconectar" style={{
        width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb",
        background: "#fff", color: "#9ca3af", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <X size={14} />
      </button>
    </div>
  );
}

// ─── MESSAGES VIEW ───────────────────────────────────────────────────────────

function MessagesView({ conversations, onSelect, onBack, selectedOrcid, messages, onSend, newMessage, setNewMessage }: {
  conversations: (typeof mockMessages);
  onSelect: (orcid: string) => void;
  onBack: () => void;
  selectedOrcid: string | null;
  messages: { id: number; from: string; text: string; ts: string }[];
  onSend: () => void;
  newMessage: string;
  setNewMessage: (v: string) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  const selectedConv = conversations.find((c) => c.orcid === selectedOrcid);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  if (selectedOrcid && selectedConv) {
    return (
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px", display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
        {/* Thread header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #f3f4f6" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", display: "flex" }}>
            <ArrowLeft size={16} />
          </button>
          <Avatar seed={selectedConv.seed} size={36} style={{ borderRadius: "50%", overflow: "hidden" }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{selectedConv.name}</p>
            <p style={{ fontSize: 11, color: "#9ca3af" }}>{messages.length} mensajes</p>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: "flex", justifyContent: msg.from === "me" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "72%", padding: "10px 14px", borderRadius: 16,
                background: msg.from === "me" ? "#059669" : "#f3f4f6",
                color: msg.from === "me" ? "#fff" : "#111827",
                fontSize: 13, lineHeight: 1.5,
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

        {/* Input */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="Escribe un mensaje..."
            style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 24, padding: "10px 16px", color: "#111827", fontSize: 13, outline: "none" }}
          />
          <button onClick={onSend} style={{
            width: 40, height: 40, borderRadius: "50%", border: "none",
            background: "#059669", color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Send size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", letterSpacing: "-0.03em", marginBottom: 4 }}>Mensajes</h1>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>Conversaciones con tus contactos</p>
      {conversations.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 24px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12 }}>
          <MessageCircle size={32} style={{ color: "#d1d5db", marginBottom: 12, display: "block", margin: "0 auto 12px" }} />
          <p style={{ fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Sin mensajes aún</p>
          <p style={{ fontSize: 12, color: "#9ca3af" }}>Conéctate con investigadores para empezar una conversación</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {conversations.map((conv) => (
            <div key={conv.orcid} onClick={() => onSelect(conv.orcid)} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "#fff", border: "1px solid #e5e7eb",
              borderRadius: 12, padding: "14px 16px", cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#d1fae5"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb"; }}
            >
              <Avatar seed={conv.seed} size={44} style={{ borderRadius: "50%", overflow: "hidden", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{conv.name}</p>
                  <span style={{ fontSize: 10, color: "#9ca3af" }}>{conv.messages[conv.messages.length - 1].ts}</span>
                </div>
                <p style={{ fontSize: 12, color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {conv.messages[conv.messages.length - 1].text}
                </p>
              </div>
              {conv.messages.some((m) => m.from === "them") && (
                <Circle size={8} style={{ color: "#059669", flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── NAVIGATION ─────────────────────────────────────────────────────────────

function NavBar({ view, setView, connectedCount, unreadCount }: {
  view: string; setView: (v: string) => void;
  connectedCount: number; unreadCount: number;
}) {
  const items = [
    { key: "discover", icon: <Search size={15} />, label: "Descubrir" },
    { key: "opportunities", icon: <Zap size={15} />, label: "Oportunidades" },
    { key: "network", icon: <Users size={15} />, label: "Red", badge: connectedCount },
    { key: "messages", icon: <MessageCircle size={15} />, label: "Mensajes", badge: unreadCount },
    { key: "profile", icon: <User size={15} />, label: "Perfil" },
  ];

  return (
    <nav style={{
      display: "flex", gap: 2,
      background: "#f3f4f6", borderRadius: 10, padding: 4,
    }}>
      {items.map((item) => (
        <button key={item.key} onClick={() => setView(item.key)} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 14px", borderRadius: 7, border: "none",
          fontSize: 13, fontWeight: 500, cursor: "pointer",
          background: view === item.key ? "#fff" : "transparent",
          color: view === item.key ? "#111827" : "#6b7280",
          transition: "all 0.15s",
          boxShadow: view === item.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
        }}>
          <span style={{ display: "flex", color: view === item.key ? "#059669" : "#9ca3af" }}>{item.icon}</span>
          {item.label}
          {item.badge !== undefined && item.badge > 0 && (
            <span style={{
              background: item.key === "messages" ? "#ef4444" : "#059669",
              color: "#fff", fontSize: 10, fontWeight: 700,
              padding: "1px 6px", borderRadius: 20, minWidth: 18, textAlign: "center",
            }}>{item.badge}</span>
          )}
        </button>
      ))}
    </nav>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<string>("discover");
  const [selectedDept, setSelectedDept] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [connectedIds, setConnectedIds] = useState<number[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [selectedResearcher, setSelectedResearcher] = useState<(typeof researchers)[0] | null>(null);
  const [selectedOpp, setSelectedOpp] = useState<(typeof opportunities)[0] | null>(null);
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [conversations] = useState(mockMessages);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user is logged in via session
    fetch("/api/user")
      .then((r) => r.ok ? r.json() : null)
      .then((user) => {
        if (user) {
          setIsLoggedIn(true);
          setUserData(user);
        } else {
          setShowOnboarding(true);
        }
      })
      .catch(() => setShowOnboarding(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSelectedResearcher(null); setSelectedOpp(null); setSelectedConv(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = researchers.filter((r) => {
    const q = searchQuery.toLowerCase();
    const match = r.name.toLowerCase().includes(q) || r.tags.some((t) => t.toLowerCase().includes(q)) || r.dept.toLowerCase().includes(q);
    return match && (selectedDept === "Todos" || r.dept === selectedDept) && (!onlyOpen || r.open);
  });

  const connectedResearchers = researchers.filter((r) => connectedIds.includes(r.id));
  const unread = conversations.reduce((acc, c) => acc + c.messages.filter((m) => m.from === "them").length, 0);
  const activeMsgs = selectedConv ? (conversations.find((c) => c.orcid === selectedConv)?.messages ?? []) : [];

  const handleSend = () => {
    if (!newMessage.trim() || !selectedConv) return;
    // En una app real, esto haría un POST al backend
    setNewMessage("");
  };

  if (!mounted) return <SkeletonLoader />;

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      {/* HEADER */}
      <header style={{
        background: "#fff", borderBottom: "1px solid #e5e7eb",
        padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky" as const, top: 0, zIndex: 50,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #059669, #10b981)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Users size={16} color="#fff" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#111827", letterSpacing: "-0.04em" }}>ResearchNet</span>
        </div>

        <NavBar view={view} setView={setView} connectedCount={connectedIds.length} unreadCount={unread} />

        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280" }}>
          <Globe size={13} />
          <span>{researchers.filter((r) => r.open).length} abiertos · {researchers.length} investigadores</span>
        </div>
      </header>

      {/* ONBOARDING */}
      {showOnboarding && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }}>
          <div style={{
            background: "#fff", borderRadius: 20, padding: 36, maxWidth: 420, width: "100%",
            textAlign: "center", boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
          }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg, #059669, #10b981)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Users size={24} color="#fff" />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", letterSpacing: "-0.03em", marginBottom: 8 }}>Bienvenido a ResearchNet</h2>
            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 24 }}>Conecta tu perfil ORCID para auto-completar tu información y descubrir investigadores complementarios.</p>
            <button
              onClick={() => { window.location.href = "/api/auth/orcid"; }}
              style={{
                width: "100%", padding: "12px 20px", borderRadius: 8,
                border: "none", background: "#059669", color: "#fff",
                fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 10,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.178 3.872-3.722 0-1.797-.897-3.722-3.903-3.722h-2.266z"/>
              </svg>
              Conectar con ORCID
            </button>
            <button onClick={() => { setShowOnboarding(false); }} style={{ background: "none", border: "none", color: "#9ca3af", fontSize: 12, cursor: "pointer" }}>
              Omitir por ahora
            </button>
          </div>
        </div>
      )}

      {/* DETAIL PANEL */}
      {selectedResearcher && (
        <DetailPanel
          researcher={selectedResearcher}
          onClose={() => setSelectedResearcher(null)}
          onConnect={() => setConnectedIds((p) => p.includes(selectedResearcher.id) ? p.filter((x) => x !== selectedResearcher.id) : [...p, selectedResearcher.id])}
          isConnected={connectedIds.includes(selectedResearcher.id)}
        />
      )}

      {/* OPPORTUNITY MODAL */}
      {selectedOpp && <OppModal opp={selectedOpp} onClose={() => setSelectedOpp(null)} />}

      {/* ─── DISCOVER ─────────────────────────────────────────────────── */}
      {view === "discover" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 60px" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", letterSpacing: "-0.04em", marginBottom: 4 }}>Descubrir investigadores</h1>
            <p style={{ fontSize: 14, color: "#6b7280" }}>Encuentra colaboradores para tu próximo proyecto de investigación</p>
          </div>

          {/* Filter bar */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", flex: 1, minWidth: 200 }}>
              <Search size={14} color="#9ca3af" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar por nombre, área o departamento..." style={{ background: "transparent", border: "none", outline: "none", color: "#111827", fontSize: 13, flex: 1 }} />
            </div>
            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} style={{ appearance: "none", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, color: "#6b7280", fontSize: 13, fontWeight: 500, padding: "8px 12px", cursor: "pointer" }}>
              {allDepts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <button onClick={() => setOnlyOpen((p) => !p)} style={{
              padding: "8px 12px", borderRadius: 8, border: "1px solid",
              fontSize: 12, fontWeight: 500, cursor: "pointer",
              background: onlyOpen ? "#ecfdf5" : "#fff",
              borderColor: onlyOpen ? "#a7f3d0" : "#e5e7eb",
              color: onlyOpen ? "#059669" : "#6b7280",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: onlyOpen ? "#10b981" : "#d1d5db", display: "inline-block" }} />
              Solo disponibles
            </button>
          </div>

          <p style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500, marginBottom: 14 }}>{filtered.length} investigador{filtered.length !== 1 ? "es" : ""}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {filtered.map((r) => (
              <ResearcherCard
                key={r.id} researcher={r}
                onSelect={() => setSelectedResearcher(r)}
                onConnect={(e) => { e.stopPropagation(); setConnectedIds((p) => p.includes(r.id) ? p.filter((x) => x !== r.id) : [...p, r.id]); }}
                isConnected={connectedIds.includes(r.id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 24px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12 }}>
              <Search size={28} style={{ color: "#d1d5db", marginBottom: 12, display: "block", margin: "0 auto 12px" }} />
              <p style={{ fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Sin resultados</p>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>Prueba con otros filtros o términos de búsqueda</p>
            </div>
          )}
        </div>
      )}

      {/* ─── OPPORTUNITIES ─────────────────────────────────────────────── */}
      {view === "opportunities" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 60px" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", letterSpacing: "-0.04em", marginBottom: 4 }}>Oportunidades</h1>
            <p style={{ fontSize: 14, color: "#6b7280" }}>Postdocs, becas, convocatorias y más</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {opportunities.map((opp) => {
              const c: Record<string, { bg: string; text: string }> = { Postdoc: { bg: "#e0f2fe", text: "#0369a1" }, Fondos: { bg: "#dcfce7", text: "#15803d" }, Internacional: { bg: "#f3e8ff", text: "#7c3aed" }, Doctorado: { bg: "#fce7f3", text: "#be185d" }, Laboral: { bg: "#d1fae5", text: "#059669" } };
              const col = c[opp.type] ?? { bg: "#f3f4f6", text: "#374151" };
              return (
                <div key={opp.id} onClick={() => setSelectedOpp(opp)} style={{
                  background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
                  padding: 20, cursor: "pointer", display: "flex", flexDirection: "column", gap: 10,
                  transition: "all 0.18s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#d1fae5"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: col.text, background: col.bg, padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em" }}>{opp.type}</span>
                    {opp.hot && <span style={{ fontSize: 10, fontWeight: 700, color: "#ea580c" }}>🔥 Hot</span>}
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "#111827", lineHeight: 1.4 }}>{opp.title}</h3>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>{opp.dept}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                    <span style={{ fontSize: 12, color: "#ea580c", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={11} />{opp.deadline}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#059669", display: "flex", alignItems: "center", gap: 3 }}>
                      Ver más <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── NETWORK ────────────────────────────────────────────────────── */}
      {view === "network" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 60px" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", letterSpacing: "-0.04em", marginBottom: 4 }}>Tu red</h1>
            <p style={{ fontSize: 14, color: "#6b7280" }}>{connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red</p>
          </div>
          {connectedResearchers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 32px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12 }}>
              <Users size={48} style={{ color: "#d1d5db", marginBottom: 16, display: "block", margin: "0 auto 16px" }} />
              <p style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Tu red está vacía</p>
              <p style={{ fontSize: 13, color: "#9ca3af", maxWidth: 280, margin: "0 auto 24px", lineHeight: 1.6 }}>Explora investigadores y conéctate para construir tu red de colaboración.</p>
              <button onClick={() => setView("discover")} style={{ padding: "10px 22px", borderRadius: 8, background: "#059669", color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Descubrir investigadores</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {connectedResearchers.map((r) => (
                <NetworkCard key={r.id} researcher={r}
                  onDisconnect={() => setConnectedIds((p) => p.filter((x) => x !== r.id))}
                  onMessage={() => { setSelectedConv(`orcid-${r.id}`); setView("messages"); }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── MESSAGES ───────────────────────────────────────────────────── */}
      {view === "messages" && (
        <MessagesView
          conversations={conversations}
          onSelect={(orcid) => setSelectedConv(orcid)}
          onBack={() => setSelectedConv(null)}
          selectedOrcid={selectedConv}
          messages={activeMsgs}
          onSend={handleSend}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      )}

      {/* ─── PROFILE ───────────────────────────────────────────────────── */}
      {view === "profile" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 60px" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", letterSpacing: "-0.04em", marginBottom: 4 }}>Tu perfil</h1>
            <p style={{ fontSize: 14, color: "#6b7280" }}>Gestiona tu información de investigador</p>
          </div>

          {/* Profile card */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 28, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24 }}>
              <Avatar seed={userProfile.seed} size={72} style={{ borderRadius: "50%", overflow: "hidden", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" as const }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", letterSpacing: "-0.03em" }}>{userProfile.name} {userProfile.surname}</h2>
                  {userProfile.open && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#059669", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "2px 8px", borderRadius: 20, display: "flex", alignItems: "center", gap: 3 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981" }} />Disponible
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 2 }}>{userProfile.role}</p>
                <p style={{ fontSize: 12, color: "#9ca3af" }}>{userProfile.dept}</p>
              </div>
              <button style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
                Editar perfil
              </button>
            </div>
            <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.7, marginBottom: 20 }}>{userProfile.bio}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginBottom: 20 }}>
              {userProfile.tags.map((tag) => (
                <span key={tag} style={{ fontSize: 12, fontWeight: 500, color: "#059669", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "4px 12px", borderRadius: 20 }}>{tag}</span>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Grupos de investigación</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                {userProfile.groups.map((g) => (
                  <span key={g} style={{ fontSize: 12, fontWeight: 500, color: "#374151", background: "#f3f4f6", border: "1px solid #e5e7eb", padding: "4px 12px", borderRadius: 6 }}>{g}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
            {[{ v: userProfile.pubs, l: "Publicaciones", icon: <BookOpen size={16} /> }, { v: userProfile.projects, l: "Proyectos", icon: <Briefcase size={16} /> }, { v: connectedIds.length, l: "Conexiones", icon: <Users size={16} /> }].map((s) => (
              <div key={s.l} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ color: "#d1d5db", marginBottom: 8, display: "flex", justifyContent: "center" }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#111827", letterSpacing: "-0.04em", marginBottom: 4 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 14 }}>Acciones rápidas</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[{ label: "Ver mi perfil público", icon: <ExternalLink size={13} /> }, { label: "Invitar a un colega", icon: <Users size={13} /> }, { label: "Exportar mi CV", icon: <BookOpen size={13} /> }].map((a) => (
                <button key={a.label} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 14px", borderRadius: 8,
                  background: "#f9fafb", border: "1px solid #e5e7eb",
                  color: "#374151", fontSize: 13, fontWeight: 500,
                  cursor: "pointer", width: "100%", textAlign: "left",
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#059669" }}>{a.icon}{a.label}</span>
                  <ChevronRight size={13} color="#d1d5db" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
