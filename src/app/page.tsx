﻿"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search, Users, Zap, User, BookOpen,
  Briefcase, Clock, X, Globe,
  ExternalLink, ChevronRight, MessageCircle,
  Send, ArrowLeft, Check, Circle,
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
  { id: 1, title: "Postdoc — IA aplicada a salud", dept: "Biomédica + CS", deadline: "30 Abr", type: "Postdoc", hot: true, desc: "Posición postdoctoral para investigar aplicaciones de machine learning en datos de salud. Requiere doctorado reciente en CS o biomédica." },
  { id: 2, title: "Convocatoria ANID Fondecyt Regular 2026", dept: "Todas las áreas", deadline: "15 May", type: "Fondos", hot: true, desc: "Fondos regulares para proyectos de investigación en todas las áreas. Hasta $300.000 USD por proyecto, duración 4 años." },
  { id: 3, title: "Colaboración EU Horizon — Quantum", dept: "Física Comp.", deadline: "1 Jun", type: "Internacional", hot: false, desc: "Busco colaborador para propuesta EU Horizon sobre computación cuántica aplicada a optimización combinatoria." },
  { id: 4, title: "Tesis Doctoral — NLP Multilingüe", dept: "CS", deadline: "20 May", type: "Doctorado", hot: false, desc: "Búsqueda de estudiante doctoral para investigación en modelos de lenguaje multilingüe para lenguas minoritarias." },
  { id: 5, title: "Research Engineer — Vision Systems", dept: "Robótica e IA", deadline: "10 May", type: "Laboral", hot: true, desc: "Research engineer para desarrollar sistemas de visión por computador en robotics. Salario competitivo + equity." },
  { id: 6, title: "Beca Marie Curie — Climate AI", dept: "Todas las áreas", deadline: "25 Jun", type: "Internacional", hot: false, desc: "Beca postdoctoral europea para proyectos de IA aplicada al cambio climático. Sin restricciones de nacionalidad." },
];

const mockMessages = [
  { orcid: "0000-0002-1234-5678", name: "Dra. Elena Vargas", avatar: "EV", color: "#84cc16", messages: [
    { id: 1, from: "them", text: "Hola! Vi tu perfil y me interesa mucho tu trabajo en sistemas distribuidos. Estamos buscando colaboradores para un proyecto de IoT.", ts: "10:32" },
    { id: 2, from: "me", text: "Hola Elena! Encantado de saludarte. Cuéntame más sobre el proyecto, suena interesante.", ts: "10:35" },
    { id: 3, from: "them", text: "Es un proyecto sobre sensores distribuidos para monitorización ambiental. Usamos LoRa y queríamos explorar machine learning para fusionar datos.", ts: "10:37" },
  ]},
  { orcid: "0000-0003-9876-5432", name: "Dr. Felipe Mora", avatar: "FM", color: "#34d399", messages: [
    { id: 1, from: "them", text: "Hey! Tu perfil de IoT me interesa. Tengo un proyecto de robotics donde podríamos colaborar.", ts: "Ayer" },
  ]},
];

const userProfile = {
  orcid: "0000-0001-2345-6789",
  name: "José Ignacio",
  surname: "Hernández",
  role: "Doctorando",
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

const researcherColors: Record<string, string> = {
  "Ingeniería Biomédica": "#10b981",
  "Ciencias de la Computación": "#3b82f6",
  "Biología Molecular": "#8b5cf6",
  "Física Computacional": "#f59e0b",
  "Salud Pública": "#ef4444",
  "Robótica e IA": "#6366f1",
};

// ─── MATCH BADGE (color-coded pill) ────────────────────────────────────────

function MatchBadge({ score }: { score: number }) {
  const color = score >= 90 ? "#22c55e" : score >= 70 ? "#f59e0b" : "#9ca3af";
  const bg = score >= 90 ? "rgba(34,197,94,0.08)" : score >= 70 ? "rgba(245,158,11,0.08)" : "rgba(156,163,175,0.08)";
  const border = score >= 90 ? "rgba(34,197,94,0.18)" : score >= 70 ? "rgba(245,158,11,0.18)" : "rgba(156,163,175,0.18)";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      fontSize: 10, fontWeight: 700,
      color, background: bg, border: `1px solid ${border}`,
      padding: "2px 7px", borderRadius: 20,
      letterSpacing: "-0.01em",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {score}%
    </span>
  );
}

// ─── SKELETON LOADER ────────────────────────────────────────────────────

function SkeletonLoader() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "24px" }}>
      {/* Header skeleton */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, padding: "0 0 24px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--border)" }} />
          <div style={{ width: 90, height: 14, borderRadius: 4, background: "var(--border)" }} />
        </div>
        <div style={{ width: 280, height: 36, borderRadius: 10, background: "var(--border)" }} />
        <div style={{ width: 60, height: 14, borderRadius: 4, background: "var(--border)" }} />
      </div>
      {/* Cards grid skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--border)" }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ width: "70%", height: 13, borderRadius: 4, background: "var(--border)" }} />
                <div style={{ width: "50%", height: 10, borderRadius: 4, background: "var(--border-subtle)" }} />
                <div style={{ width: "40%", height: 9, borderRadius: 4, background: "var(--border-subtle)" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 64, height: 20, borderRadius: 20, background: "var(--border)" }} />
              <div style={{ width: 80, height: 20, borderRadius: 20, background: "var(--border-subtle)" }} />
              <div style={{ width: 56, height: 20, borderRadius: 20, background: "var(--border)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 4 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 40, height: 10, borderRadius: 4, background: "var(--border-subtle)" }} />
                <div style={{ width: 50, height: 10, borderRadius: 4, background: "var(--border-subtle)" }} />
              </div>
              <div style={{ width: 72, height: 26, borderRadius: 8, background: "var(--border)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AVATAR ───────────────────────────────────────────────────────────────────

function Avatar({ initials, color, size = 44 }: { initials: string; color: string; size?: number }) {
  const s = Math.round(size * 0.32);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle at 35% 35%, ${color}33, ${color}18)`,
      border: `1.5px solid ${color}40`,
      boxShadow: `0 0 0 1px ${color}20, inset 0 1px 2px rgba(255,255,255,0.08)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: s, fontWeight: 700, color,
      flexShrink: 0, letterSpacing: "-0.02em",
      transition: "box-shadow 0.2s ease",
    }}>
      {initials}
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
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, top: 60, background: "rgba(0,0,0,0.5)",
        zIndex: 39, backdropFilter: "blur(4px)",
      }} />
      <div style={{
        position: "fixed", top: 60, right: 0, bottom: 0, width: 340,
        background: "var(--surface)", borderLeft: "1px solid var(--card-border)",
        zIndex: 50, display: "flex", flexDirection: "column",
        boxShadow: "var(--shadow-detail-panel)",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 18px", borderBottom: "1px solid var(--card-border)",
        }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Perfil
          </span>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "var(--text-tertiary)",
            cursor: "pointer", fontSize: 20, lineHeight: 1, padding: "0 4px",
          }}>×</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflow: "auto", padding: "18px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Profile header */}
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <Avatar initials={researcher.avatar} color={researcher.color} size={52} />
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 2 }}>{researcher.name}</h2>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 1 }}>{researcher.role}</p>
              <p style={{ fontSize: 10, color: "var(--text-tertiary)" }}>{researcher.dept}</p>
            </div>
          </div>

          {/* Match score */}
          <div style={{
            borderLeft: "3px solid var(--accent)",
            background: "var(--accent-dim)",
            border: "1px solid var(--accent-glow)",
            borderRadius: 10, padding: "10px 14px",
            display: "flex", flexDirection: "column", gap: 2,
          }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Match Score</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
              <span style={{ fontSize: 30, fontWeight: 900, color: "var(--accent)", letterSpacing: "-0.05em", lineHeight: 1 }}>{researcher.match}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", opacity: 0.6 }}>%</span>
            </div>
            <span style={{ fontSize: 10, color: "var(--accent)", opacity: 0.5 }}>affinity based on shared areas</span>
          </div>

          {/* Bio */}
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{researcher.bio}</p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[{ v: researcher.pubs, l: "papers" }, { v: researcher.projects, l: "projects" }, { v: researcher.groups.length, l: "groups" }].map((s) => (
              <div key={s.l} style={{
                background: "var(--surface-hover)", border: "1px solid var(--card-border)",
                borderRadius: 8, padding: "8px 6px", textAlign: "center",
              }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 2 }}>{s.v}</div>
                <div style={{ fontSize: 9, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Groups */}
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Grupos</p>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {researcher.groups.map((g) => (
                <span key={g} style={{
                  fontSize: 10, fontWeight: 600, color: researcher.color,
                  background: `${researcher.color}10`, padding: "3px 8px", borderRadius: 6,
                }}>{g}</span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Áreas</p>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {researcher.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: 10, color: "var(--tag-text)", background: "var(--tag-bg)",
                  border: "1px solid var(--tag-border)", padding: "3px 8px", borderRadius: 20,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 18px", borderTop: "1px solid var(--card-border)", display: "flex", gap: 8 }}>
          <button
            onClick={onConnect}
            style={{
              flex: 1, padding: "10px", borderRadius: 9, border: "none",
              fontSize: 12, fontWeight: 700, cursor: "pointer",
              background: isConnected ? "var(--accent-dim)" : researcher.color,
              color: isConnected ? "#22c55e" : "#000",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              transition: "all 0.15s",
            }}
          >
            {isConnected ? <><Check size={13} /> Conectado</> : "Conectar"}
          </button>
          {!isConnected && (
            <button
              onClick={() => onConnect()}
              style={{
                flex: 1, padding: "10px", borderRadius: 9, border: "1px solid var(--card-border)",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                background: "var(--surface)", color: "var(--text-secondary)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                transition: "all 0.15s",
              }}
            >
              <MessageCircle size={13} /> Mensaje
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ─── OPPORTUNITY DETAIL MODAL ────────────────────────────────────────────────

function OppDetailModal({ opp, onClose }: { opp: (typeof opportunities)[0]; onClose: () => void }) {
  const typeColors: Record<string, string> = { Postdoc: "#60a5fa", Fondos: "var(--accent)", Internacional: "#c084fc", Doctorado: "#f472b6", Laboral: "#34d399" };
  const color = typeColors[opp.type] ?? "#6b7280";
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 200, backdropFilter: "blur(6px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "100%", maxWidth: 480, background: "var(--surface)",
        border: "1px solid var(--card-border)", borderRadius: 20, padding: 28, zIndex: 201,
        boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "none", border: "none",
          color: "var(--text-tertiary)", cursor: "pointer", fontSize: 18,
        }}>×</button>
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: color, background: `${color}15`, padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em" }}>{opp.type}</span>
          {opp.hot && <span style={{ fontSize: 10, fontWeight: 700, color: "#fb923c", display: "flex", alignItems: "center", gap: 3 }}><Zap size={9} />Hot</span>}
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1.3 }}>{opp.title}</h2>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>{opp.dept} · Fecha ímite: <span style={{ color: "#fb923c", fontWeight: 700 }}>{opp.deadline}</span></p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20 }}>{opp.desc}</p>
        <button style={{
          width: "100%", padding: "12px", borderRadius: 10, border: "none",
          background: color, color: "#000", fontSize: 13, fontWeight: 700,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <ExternalLink size={13} /> ás información
        </button>
      </div>
    </>
  );
}

// ─── RESEARCHER CARD (click opens detail) ───────────────────────────────────

function ResearcherCard({ researcher, onSelect, onConnect, isConnected }: {
  researcher: (typeof researchers)[0];
  onSelect: () => void;
  onConnect: (e: React.MouseEvent) => void;
  isConnected: boolean;
}) {
  return (
    <div
      className="b-card"
      onClick={onSelect}
    >
      <div className="b-card-top">
        <Avatar initials={researcher.avatar} color={researcher.color} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, display: "block", marginBottom: 2 }}>{researcher.name}</span>
          <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.3 }}>{researcher.role}— {researcher.dept}</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <MatchBadge score={researcher.match} />
        {researcher.open && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 3,
            fontSize: 8, fontWeight: 700, color: "#4ade80",
            background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.18)",
            padding: "2px 5px", borderRadius: 20,
            textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#4ade80" }} />
            Open
          </span>
        )}
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {researcher.tags.slice(0, 3).map((tag) => (
          <span key={tag} style={{
            fontSize: 10, fontWeight: 600, color: "var(--tag-text)",
            background: "var(--tag-bg)", border: "1px solid var(--tag-border)",
            padding: "3px 8px", borderRadius: 20,
          }}>{tag}</span>
        ))}
      </div>
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
          onClick={onConnect}
          className={`b-connect-btn ${isConnected ? "connected" : ""}`}
          style={{ "--btn-color": researcher.color } as React.CSSProperties}
        >
          {isConnected ? <><Check size={13} /> Conectado</> : "Conectar"}
        </button>
      </div>
    </div>
  );
}

// ─── NETWORK CARD (with message button) ─────────────────────────────────────

function NetworkCard({ researcher, onDisconnect, onMessage }: {
  researcher: (typeof researchers)[0];
  onDisconnect: () => void;
  onMessage: () => void;
}) {
  return (
    <div style={{
      background: "var(--card-bg)", border: "1px solid var(--card-border)",
      borderRadius: 14, padding: 16, display: "flex", alignItems: "center",
      gap: 12, transition: "all 0.18s",
    }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${researcher.color}30`; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--card-border)"; }}
    >
      <Avatar initials={researcher.avatar} color={researcher.color} size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 1 }}>{researcher.name}</p>
        <p style={{ fontSize: 10, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{researcher.role}</p>
      </div>
      <button
        onClick={onMessage}
        title="Enviar mensaje"
        style={{
          width: 30, height: 30, borderRadius: 8, border: "1px solid var(--card-border)",
          background: "var(--surface)", color: "var(--text-tertiary)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(132,204,22,0.35)"; (e.currentTarget as HTMLButtonElement).style.color = "#84cc16"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-tertiary)"; }}
      >
        <MessageCircle size={13} />
      </button>
      <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 500, flexShrink: 0 }}>{researcher.match}%</span>
      <button
        onClick={onDisconnect}
        title="Desconectar"
        style={{
          width: 28, height: 28, borderRadius: 8, border: "1px solid var(--border)",
          background: "transparent", color: "var(--text-tertiary)",
          fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s", flexShrink: 0,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.4)"; (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-tertiary)"; }}
      >
        ×
      </button>
    </div>
  );
}

// ─── MESSAGES VIEW ───────────────────────────────────────────────────────────

function MessagesView({ conversations, onSelectConversation, onBack, selectedOrcid, messages, onSendMessage, newMessage, setNewMessage }: {
  conversations: (typeof mockMessages);
  onSelectConversation: (orcid: string) => void;
  onBack: () => void;
  selectedOrcid: string | null;
  messages: { id: number; from: string; text: string; ts: string }[];
  onSendMessage: () => void;
  newMessage: string;
  setNewMessage: (v: string) => void;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const selectedConv = conversations.find((c) => c.orcid === selectedOrcid);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  if (selectedOrcid && selectedConv) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px", display: "flex", flexDirection: "column", height: "calc(100vh - 60px)" }}>
        {/* Thread header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <ArrowLeft size={16} />
          </button>
          <Avatar initials={selectedConv.avatar} color={selectedConv.color} size={36} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{selectedConv.name}</p>
            <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{messages.length} mensajes</p>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{
              display: "flex", justifyContent: msg.from === "me" ? "flex-end" : "flex-start",
            }}>
              <div style={{
                maxWidth: "70%", padding: "10px 14px", borderRadius: 16,
                background: msg.from === "me" ? "var(--accent)" : "var(--surface)",
                color: msg.from === "me" ? "#000" : "var(--text-primary)",
                fontSize: 13, lineHeight: 1.5,
                borderBottomRightRadius: msg.from === "me" ? "4px" : "16px",
                borderBottomLeftRadius: msg.from === "me" ? "16px" : "4px",
              }}>
                {msg.text}
                <div style={{ fontSize: 9, opacity: 0.5, marginTop: 3, textAlign: "right" }}>{msg.ts}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
            placeholder="Escribe un mensaje..."
            style={{
              flex: 1, background: "var(--surface)", border: "1px solid var(--card-border)",
              borderRadius: 24, padding: "10px 16px", color: "var(--text-primary)",
              fontSize: 13, outline: "none",
              transition: "border-color 0.15s, box-shadow 0.15s",
            }}
            onFocus={(e) => { const i = e.currentTarget as HTMLInputElement; i.style.borderColor = "var(--accent)"; i.style.boxShadow = "0 0 0 3px var(--accent-glow)"; }}
            onBlur={(e) => { const i = e.currentTarget as HTMLInputElement; i.style.borderColor = "var(--card-border)"; i.style.boxShadow = "none"; }}
          />
          <button
            onClick={onSendMessage}
            style={{
              width: 40, height: 40, borderRadius: "50%", border: "none",
              background: "var(--accent)", color: "#000", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s", flexShrink: 0,
            }}
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.025em", marginBottom: 5 }}>Mensajes</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Conversaciones con tus contactos</p>
      </div>

      {conversations.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "60px 24px", background: "var(--card-bg)",
          border: "1px solid var(--card-border)", borderRadius: 16,
        }}>
          <MessageCircle size={32} style={{ color: "var(--text-tertiary)", marginBottom: 12, display: "block", margin: "0 auto 12px" }} />
          <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Sin mensajes aún</p>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Conéctate con investigadores y empieza una conversación</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {conversations.map((conv) => (
            <div key={conv.orcid} onClick={() => onSelectConversation(conv.orcid)} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "var(--card-bg)", border: "1px solid var(--card-border)",
              borderRadius: 14, padding: "14px 16px", cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { const r = e.currentTarget as HTMLDivElement; r.style.borderColor = conv.color + "30"; r.style.filter = "brightness(1.06)"; }}
            onMouseLeave={(e) => { const r = e.currentTarget as HTMLDivElement; r.style.borderColor = "var(--card-border)"; r.style.filter = "brightness(1)"; }}
            >
              <Avatar initials={conv.avatar} color={conv.color} size={44} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{conv.name}</p>
                  <span style={{ fontSize: 10, color: "var(--text-tertiary)" }}>{conv.messages[conv.messages.length - 1].ts}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {conv.messages[conv.messages.length - 1].text}
                </p>
              </div>
              {conv.messages.filter((m) => m.from === "them").length > 0 && (
                <Circle size={8} style={{ color: "var(--accent)", flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function NavBar({ view, setView, connectedCount, unreadMessages }: {
  view: string;
  setView: (v: string) => void;
  connectedCount: number;
  unreadMessages: number;
}) {
  const items = [
    { key: "discover", icon: <Search size={14} />, label: "Discover" },
    { key: "opportunities", icon: <Zap size={14} />, label: "Opportunities" },
    { key: "network", icon: <Users size={14} />, label: "Network", badge: connectedCount },
    { key: "messages", icon: <MessageCircle size={14} />, label: "Messages", badge: unreadMessages },
    { key: "profile", icon: <User size={14} />, label: "Profile" },
  ];

  return (
    <div style={{
      display: "flex", gap: 2, background: "var(--bg-secondary)",
      border: "1px solid var(--border)", borderRadius: 12, padding: 4,
    }}>
      {items.map((item) => (
        <button key={item.key} onClick={() => setView(item.key)} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 16px", borderRadius: 8, border: "none",
          fontSize: 12, fontWeight: 600, cursor: "pointer",
          background: view === item.key ? "var(--accent-dim)" : "transparent",
          color: view === item.key ? "var(--text-primary)" : "var(--text-subtle)",
          transition: "all 0.15s", position: "relative", whiteSpace: "nowrap",
        }}>
          <span style={{ color: view === item.key ? "var(--accent)" : "var(--text-subtle)", display: "flex" }}>
            {item.icon}
          </span>
          {item.label}
          {item.badge !== undefined && item.badge > 0 && (
            <span style={{
              background: item.key === "messages" ? "#ef4444" : "var(--accent)",
              color: "#000", fontSize: 9, fontWeight: 800, padding: "1px 5px",
              borderRadius: 20, minWidth: 16, textAlign: "center",
            }}>
              {item.badge}
            </span>
          )}
          {view === item.key && (
            <div style={{
              position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)",
              width: 20, height: 2, borderRadius: 2, background: "var(--accent)",
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
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedResearcher, setSelectedResearcher] = useState<(typeof researchers)[0] | null>(null);
  const [selectedOpp, setSelectedOpp] = useState<(typeof opportunities)[0] | null>(null);
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(mockMessages);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const skipped = localStorage.getItem("rn_onboarding_skipped");
    if (!skipped) setShowOnboarding(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedResearcher(null);
        setSelectedOpp(null);
        setSelectedConv(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredResearchers = researchers.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) || r.dept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = selectedDept === "Todos" || r.dept === selectedDept;
    const matchOpen = !onlyOpen || r.open;
    return matchSearch && matchDept && matchOpen;
  });

  const connectedResearchers = researchers.filter((r) => connectedIds.includes(r.id));
  const unreadMessages = conversations.reduce((acc, c) => acc + c.messages.filter((m) => m.from === "them").length, 0);
  const activeMessages = selectedConv ? (conversations.find((c) => c.orcid === selectedConv)?.messages ?? []) : [];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConv) return;
    setConversations((prev) => prev.map((c) => c.orcid === selectedConv ? {
      ...c, messages: [...c.messages, { id: Date.now(), from: "me", text: newMessage, ts: "Ahora" }]
    } : c));
    setNewMessage("");
  };

  if (!mounted) return <SkeletonLoader />;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text-primary)" }}>

      {/* HEADER */}
      <header className="app-header" style={{
        borderBottom: "1px solid var(--card-border)", padding: "0 24px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky" as const, top: 0, background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)", zIndex: 50,
      }}>
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
          <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.04em" }}>ResearchNet</span>
        </div>
        <NavBar view={view} setView={setView} connectedCount={connectedIds.length} unreadMessages={unreadMessages} />
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "5px 12px" }}>
          <Globe size={11} color="var(--text-subtle)" />
          <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>
            {researchers.filter((r) => r.open).length} <span style={{ color: "var(--accent)" }}>open</span> · {researchers.length} researchers
          </span>
        </div>
      </header>

      {/* ONBOARDING */}
      {showOnboarding && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)", display: "flex", alignItems: "center",
          justifyContent: "center", padding: 20,
        }}>
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20,
            padding: 36, maxWidth: 420, width: "100%", textAlign: "center",
            boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: "linear-gradient(135deg, #84cc16, #65a30d)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", boxShadow: "0 0 40px #84cc1630",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="8" cy="12" r="3" fill="#000" opacity="0.9"/>
                <circle cx="16" cy="7" r="2.5" fill="#000" opacity="0.7"/>
                <circle cx="16" cy="17" r="2.5" fill="#000" opacity="0.7"/>
                <line x1="11" y1="12" x2="14" y2="7.8" stroke="#000" strokeWidth="1.5" opacity="0.6"/>
                <line x1="11" y1="12" x2="14" y2="16.2" stroke="#000" strokeWidth="1.5" opacity="0.6"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.03em" }}>Bienvenido a ResearchNet</h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 28 }}>Conecta tu perfil ORCID para auto-completar tu información y empezar a descubrir colaboradores.</p>
            <button
              onClick={() => { setShowOnboarding(false); localStorage.setItem("rn_onboarding_skipped", "1"); }}
              style={{
                width: "100%", padding: "13px 20px", borderRadius: 12,
                border: "1px solid #84cc1640", background: "#84cc16", color: "#000",
                fontSize: 13, fontWeight: 800, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                marginBottom: 10,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.178 3.872-3.722 0-1.797-.897-3.722-3.903-3.722h-2.266z"/>
              </svg>
              Conectar con ORCID
            </button>
            <button
              onClick={() => { setShowOnboarding(false); localStorage.setItem("rn_onboarding_skipped", "1"); }}
              style={{ background: "none", border: "none", color: "var(--text-subtle)", fontSize: 12, cursor: "pointer", fontWeight: 500 }}
            >
              Omitir por ahora
            </button>
            <p style={{ fontSize: 10, color: "var(--text-subtle)", marginTop: 20, lineHeight: 1.5 }}>ORCID es un identificador persistente. Tu información se mantiene privada.</p>
          </div>
        </div>
      )}

      {/* DETAIL PANEL */}
      {selectedResearcher && (
        <DetailPanel
          researcher={selectedResearcher}
          onClose={() => setSelectedResearcher(null)}
          onConnect={() => {
            setConnectedIds((p) => p.includes(selectedResearcher.id) ? p.filter((x) => x !== selectedResearcher.id) : [...p, selectedResearcher.id]);
            if (!connectedIds.includes(selectedResearcher.id)) {
              setConversations((prev) => {
                if (prev.find((c) => c.orcid === `orcid-${selectedResearcher.id}`)) return prev;
                return [...prev, { orcid: `orcid-${selectedResearcher.id}`, name: selectedResearcher.name, avatar: selectedResearcher.avatar, color: selectedResearcher.color, messages: [] }];
              });
            }
          }}
          isConnected={connectedIds.includes(selectedResearcher.id)}
        />
      )}

      {/* OPPORTUNITY MODAL */}
      {selectedOpp && <OppDetailModal opp={selectedOpp} onClose={() => setSelectedOpp(null)} />}

      {/* ─── DISCOVER VIEW ─────────────────────────────────────────────── */}
      {view === "discover" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.025em", marginBottom: 5 }}>Descubrir investigadores</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Encuentra colaboradores para tu próximo proyecto</p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" as const, marginBottom: 24 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", flex: 1, minWidth: 200 }}>
              <Search size={13} color="var(--text-subtle)" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar por nombre, área o departamento..." style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 13, flex: 1, width: "100%" }} />
            </div>
            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} style={{ appearance: "none" as const, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-muted)", fontSize: 12, fontWeight: 600, padding: "8px 12px", cursor: "pointer" as const }}>
              {allDepts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <button onClick={() => setOnlyOpen((p) => !p)} style={{
              background: onlyOpen ? "rgba(101,163,13,0.08)" : "var(--surface)",
              border: `1px solid ${onlyOpen ? "#84cc1640" : "var(--border)"}`,
              borderRadius: 10, color: onlyOpen ? "var(--accent)" : "var(--text-muted)",
              fontSize: 12, fontWeight: 600, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: onlyOpen ? "var(--accent)" : "var(--text-tertiary)", display: "inline-block" }} />
              Solo abiertos
            </button>
          </div>
          <p style={{ fontSize: 12, color: "var(--text-subtle)", marginBottom: 14, fontWeight: 500 }}>
            {filteredResearchers.length} investigador{filteredResearchers.length !== 1 ? "es" : ""}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {filteredResearchers.map((r) => (
              <ResearcherCard
                key={r.id}
                researcher={r}
                onSelect={() => setSelectedResearcher(r)}
                onConnect={(e) => { e.stopPropagation(); setConnectedIds((p) => p.includes(r.id) ? p.filter((x) => x !== r.id) : [...p, r.id]); }}
                isConnected={connectedIds.includes(r.id)}
              />
            ))}
          </div>
          {filteredResearchers.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16 }}>
              <Search size={32} style={{ color: "var(--text-tertiary)", marginBottom: 14, display: "block", margin: "0 auto 14px" }} />
              <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>Sin resultados</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 260, margin: "0 auto" }}>Prueba con otros filtros o término de búsqueda</p>
            </div>
          )}
        </div>
      )}

      {/* ─── OPPORTUNITIES VIEW ─────────────────────────────────────────── */}
      {view === "opportunities" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.025em", marginBottom: 5 }}>Oportunidades</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Postdocs, becas, convocatorias y más</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {opportunities.map((opp) => {
              const typeColors: Record<string, string> = { Postdoc: "#60a5fa", Fondos: "var(--accent)", Internacional: "#c084fc", Doctorado: "#f472b6", Laboral: "#34d399" };
              const color = typeColors[opp.type] ?? "#6b7280";
              return (
                <div key={opp.id} onClick={() => setSelectedOpp(opp)} style={{
                  background: "var(--card-bg)", border: "1px solid var(--card-border)",
                  borderRadius: 14, padding: 18, cursor: "pointer",
                  transition: "all 0.2s ease", display: "flex", flexDirection: "column", gap: 9,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${color}40`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.10), 0 0 0 1px ${color}20`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--card-border)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: color, background: `${color}15`, padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em" }}>{opp.type}</span>
                    {opp.hot && <span style={{ display: "flex", alignItems: "center" }}><Zap size={10} color="#fb923c" /></span>}
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4, letterSpacing: "-0.01em" }}>{opp.title}</h3>
                  <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{opp.dept}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 4 }}>
                    <span style={{ fontSize: 11, color: "#fb923c", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={10} />{opp.deadline}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", display: "flex", alignItems: "center", gap: 3 }}>
                      Ver más <ChevronRight size={10} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── NETWORK VIEW ───────────────────────────────────────────────── */}
      {view === "network" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.025em", marginBottom: 5 }}>Tu red</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red</p>
          </div>
          {connectedResearchers.length === 0 ? (
            <div className="empty-state">
              {/*
                Radial glow + sophisticated network SVG illustration
              */}
              <div className="empty-state-glow" />
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ display: "block", position: "relative", zIndex: 1 }}>
                {/* Outer dashed ring */}
                <circle cx="40" cy="40" r="34" stroke="#84cc16" strokeWidth="1" strokeDasharray="4 3" fill="none" opacity="0.18"/>
                {/* Central node */}
                <circle cx="40" cy="40" r="9" fill="#18181b" stroke="#84cc16" strokeWidth="1.5"/>
                <circle cx="40" cy="40" r="4" fill="#84cc16" opacity="0.85"/>
                {/* Satellite nodes */}
                <circle cx="40" cy="16" r="5" fill="#18181b" stroke="#27272a" strokeWidth="1.5"/>
                <circle cx="40" cy="16" r="2" fill="#84cc16" opacity="0.5"/>
                <circle cx="62" cy="27" r="4.5" fill="#18181b" stroke="#27272a" strokeWidth="1.2"/>
                <circle cx="62" cy="27" r="1.8" fill="#84cc16" opacity="0.35"/>
                <circle cx="62" cy="53" r="4.5" fill="#18181b" stroke="#27272a" strokeWidth="1.2"/>
                <circle cx="62" cy="53" r="1.8" fill="#84cc16" opacity="0.35"/>
                <circle cx="40" cy="64" r="5" fill="#18181b" stroke="#27272a" strokeWidth="1.5"/>
                <circle cx="40" cy="64" r="2" fill="#84cc16" opacity="0.5"/>
                <circle cx="18" cy="53" r="4.5" fill="#18181b" stroke="#27272a" strokeWidth="1.2"/>
                <circle cx="18" cy="53" r="1.8" fill="#84cc16" opacity="0.35"/>
                <circle cx="18" cy="27" r="4.5" fill="#18181b" stroke="#27272a" strokeWidth="1.2"/>
                <circle cx="18" cy="27" r="1.8" fill="#84cc16" opacity="0.35"/>
                {/* Connection lines */}
                <line x1="40" y1="31" x2="40" y2="21" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
                <line x1="48" y1="35" x2="58" y2="29" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
                <line x1="48" y1="45" x2="58" y2="51" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
                <line x1="40" y1="49" x2="40" y2="59" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
                <line x1="32" y1="45" x2="22" y2="51" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
                <line x1="32" y1="35" x2="22" y2="29" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
              </svg>
              <p className="empty-title">Tu red está vacía</p>
              <p className="empty-sub">Explora investigadores y conéctate para construir tu red de colaboración.</p>
              <button onClick={() => setView("discover")} className="empty-cta-btn">
                Explorar investigadores
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {connectedResearchers.map((r) => (
                <NetworkCard
                  key={r.id}
                  researcher={r}
                  onDisconnect={() => setConnectedIds((p) => p.filter((x) => x !== r.id))}
                  onMessage={() => {
                    setSelectedConv(`orcid-${r.id}`);
                    setView("messages");
                    if (!conversations.find((c) => c.orcid === `orcid-${r.id}`)) {
                      setConversations((prev) => [...prev, { orcid: `orcid-${r.id}`, name: r.name, avatar: r.avatar, color: r.color, messages: [] }]);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── MESSAGES VIEW ───────────────────────────────────────────────── */}
      {view === "messages" && (
        <MessagesView
          conversations={conversations}
          onSelectConversation={(orcid) => setSelectedConv(orcid)}
          onBack={() => setSelectedConv(null)}
          selectedOrcid={selectedConv}
          messages={activeMessages}
          onSendMessage={handleSendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      )}

      {/* ─── PROFILE VIEW ─────────────────────────────────────────────── */}
      {view === "profile" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.025em", marginBottom: 5 }}>Tu perfil</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Gestiona tu información de investigador</p>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, padding: 28, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24 }}>
              <Avatar initials={userProfile.avatar} color={userProfile.color} size={64} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" as const }}>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>{userProfile.name} {userProfile.surname}</h2>
                  {userProfile.open && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 9, fontWeight: 700, color: "var(--accent)", background: `${userProfile.color}12`, padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                      Abiertos a colaboración
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 2 }}>{userProfile.role}</p>
                <p style={{ fontSize: 12, color: "var(--text-subtle)" }}>{userProfile.dept}</p>
              </div>
              <button style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid var(--border)", background: "transparent", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>
                Editar perfil
              </button>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 20 }}>{userProfile.bio}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginBottom: 20 }}>
              {userProfile.tags.map((tag) => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", background: "var(--surface-hover)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 20 }}>{tag}</span>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Grupos de investigación</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                {userProfile.groups.map((g) => (
                  <span key={g} style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", background: "var(--surface-hover)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 8 }}>{g}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
            {[{ value: userProfile.pubs, label: "Publicaciones", icon: <BookOpen size={16} /> }, { value: userProfile.projects, label: "Proyectos", icon: <Briefcase size={16} /> }, { value: connectedIds.length, label: "Conexiones", icon: <Users size={16} /> }].map((stat) => (
              <div key={stat.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ color: "var(--text-subtle)", marginBottom: 8, display: "flex", justifyContent: "center" }}>{stat.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: "var(--text-subtle)", fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14, letterSpacing: "-0.01em" }}>Acciones rápidas</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ label: "Ver mi perfil úblico", icon: <ExternalLink size={13} /> }, { label: "Invitar a un colega", icon: <Users size={13} /> }, { label: "Exportar mi CV", icon: <BookOpen size={13} /> }].map((action) => (
                <button key={action.label} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 14px", borderRadius: 10, background: "var(--surface-hover)",
                  border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 12, fontWeight: 600,
                  cursor: "pointer", textAlign: "left", width: "100%",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#84cc1640"; (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"; }}
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
