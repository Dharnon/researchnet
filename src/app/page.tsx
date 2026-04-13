"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search, Users, Zap, Network, BookOpen,
  Briefcase, Clock, ChevronRight, Sparkles, Globe,
  X, Menu,
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const researchers = [
  { id: 1, name: "Dra. Elena Vargas", role: "Profesora Titular", dept: "Ingeniería Biomédica", avatar: "EV", color: "#C8F542", tags: ["Machine Learning", "Neurociencia Computacional", "BCI"], groups: ["NeuroAI Lab", "Biomec"], projects: 4, pubs: 38, open: true, match: 97, bio: "Investigo interfaces cerebro-computadora y modelos de aprendizaje profundo aplicados a señales neuronales.", x: 0.72, y: 0.32 },
  { id: 2, name: "Dr. Marcos Ibáñez", role: "Investigador Senior", dept: "Ciencias de la Computación", avatar: "MI", color: "#42C8F5", tags: ["NLP", "Large Language Models", "Ética en IA"], groups: ["NLP Group", "AI Ethics Hub"], projects: 6, pubs: 52, open: true, match: 91, bio: "Trabajo en modelos de lenguaje multilingüe y los desafíos éticos que plantea la IA generativa.", x: 0.28, y: 0.18 },
  { id: 3, name: "Dra. Sofía Ríos", role: "Profesora Asociada", dept: "Biología Molecular", avatar: "SR", color: "#F5A842", tags: ["Genómica", "CRISPR", "Bioinformática"], groups: ["GenomicsLab"], projects: 3, pubs: 29, open: false, match: 85, bio: "Desarrollo herramientas computacionales para análisis de variantes genéticas y edición génica.", x: 0.82, y: 0.62 },
  { id: 4, name: "Dr. Andrés Leal", role: "Profesor Asociado", dept: "Física Computacional", avatar: "AL", color: "#F542A8", tags: ["Computación Cuántica", "Simulación", "Algoritmos"], groups: ["QuantumCS"], projects: 5, pubs: 44, open: true, match: 78, bio: "Diseño algoritmos cuánticos para simulación de sistemas complejos y optimización combinatoria.", x: 0.12, y: 0.72 },
  { id: 5, name: "Dra. Carmen Fuentes", role: "Investigadora Posdoctoral", dept: "Salud Pública", avatar: "CF", color: "#A842F5", tags: ["Epidemiología", "Salud Digital", "Machine Learning"], groups: ["DataHealth", "NeuroAI Lab"], projects: 2, pubs: 17, open: true, match: 73, bio: "Aplico modelos predictivos a datos epidemiológicos para sistemas de alerta temprana.", x: 0.58, y: 0.78 },
  { id: 6, name: "Dr. Felipe Mora", role: "Profesor Titular", dept: "Robótica e IA", avatar: "FM", color: "#42F5A8", tags: ["Robótica", "Computer Vision", "Deep Learning"], groups: ["RoboticsLab", "NLP Group"], projects: 7, pubs: 61, open: false, match: 69, bio: "Desarrollo sistemas de percepción visual para robots autónomos en entornos no estructurados.", x: 0.42, y: 0.14 },
];

const edges: { source: number; target: number; weight: number }[] = [];
for (let i = 0; i < researchers.length; i++) {
  for (let j = i + 1; j < researchers.length; j++) {
    if (Math.min(researchers[i].match, researchers[j].match) >= 70)
      edges.push({ source: researchers[i].id, target: researchers[j].id, weight: Math.min(researchers[i].match, researchers[j].match) });
  }
}

const opportunities = [
  { id: 1, title: "Postdoc – IA aplicada a salud", dept: "Biomédica + CS", deadline: "30 Abr", type: "Postdoc", hot: true },
  { id: 2, title: "Convocatoria ANID Fondecyt Regular 2026", dept: "Todas las áreas", deadline: "15 May", type: "Fondos", hot: true },
  { id: 3, title: "Colaboración EU Horizon – Quantum", dept: "Física Comp.", deadline: "1 Jun", type: "Internacional", hot: false },
  { id: 4, title: "Tesis Doctoral – NLP Multilingüe", dept: "CS", deadline: "20 May", type: "Doctorado", hot: false },
];

const allDepts = ["Todos", ...new Set(researchers.map((r) => r.dept))];

// ─── STYLES ───────────────────────────────────────────────────────────────────

const css = {
  root: { fontFamily: "'DM Sans', system-ui, sans-serif", background: "#08080E", minHeight: "100vh", color: "#ECEBE8" },
  header: { borderBottom: "1px solid #13131c", padding: "0 16px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky" as const, top: 0, background: "#08080FEE", backdropFilter: "blur(16px)", zIndex: 50 },
  logo: { width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #C8F542, #8b8cf5)" },
  title: { fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color: "#ECEBE8", letterSpacing: "-0.03em" },
  badge: { background: "#C8F542", color: "#000", fontSize: 9, fontWeight: 800, padding: "1px 5px", borderRadius: 4, minWidth: 16, textAlign: "center" as const },
  searchWrap: { background: "#0c0c14", border: "1px solid #1a1a28", borderRadius: 8, display: "flex", alignItems: "center", gap: 7, padding: "6px 10px", flex: 1, minWidth: 100 },
  select: { appearance: "none" as const, background: "#0c0c14", border: "1px solid #1a1a28", borderRadius: 8, color: "#5a5a6a", fontSize: 11, fontWeight: 500, padding: "5px 22px 5px 9px", cursor: "pointer" as const },
  tag: { fontSize: 9, fontWeight: 700, color: "#5a5a6a", background: "#13131e", padding: "2px 7px", borderRadius: 4, textTransform: "uppercase" as const, letterSpacing: "0.04em" },
  card: { background: "#09090F", border: "1px solid #14141e", borderRadius: 10, overflow: "hidden" },
  row: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", cursor: "pointer" as const, borderBottom: "1px solid #13131e" },
};

// ─── GRAPH VIEW ────────────────────────────────────────────────────────────────

function GraphView({ onSelect, selectedId, connectedIds }: {
  onSelect: (r: (typeof researchers)[0]) => void;
  selectedId: number | null;
  connectedIds: number[];
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [pos, setPos] = useState<Record<number, { x: number; y: number }>>({});
  const frameRef = useRef(0);

  useEffect(() => {
    const init = () => {
      const w = svgRef.current?.clientWidth || 400;
      const h = svgRef.current?.clientHeight || 300;
      const p: Record<number, { x: number; y: number }> = {};
      researchers.forEach((r) => { p[r.id] = { x: r.x * (w - 160) + 80, y: r.y * (h - 160) + 80 }; });
      setPos(p);
    };
    init();
    const ro = new ResizeObserver(init);
    if (svgRef.current) ro.observe(svgRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let raf: number;
    const w = svgRef.current?.clientWidth || 400;
    const h = svgRef.current?.clientHeight || 300;
    const animate = () => {
      frameRef.current++;
      setPos((prev) => {
        const next = { ...prev };
        for (const r of researchers) {
          const target = { x: r.x * (w - 160) + 80, y: r.y * (h - 160) + 80 };
          const cur = next[r.id] || target;
          const dx = (target.x - cur.x) * 0.05 + (Math.random() - 0.5) * 0.4;
          const dy = (target.y - cur.y) * 0.05 + (Math.random() - 0.5) * 0.4;
          next[r.id] = { x: cur.x + dx, y: cur.y + dy };
        }
        return next;
      });
      if (frameRef.current < 80) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg ref={svgRef} style={{ width: "100%", height: "100%", overflow: "visible", touchAction: "manipulation", display: "block" }}>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {edges.map((e) => {
        const s = researchers.find((r) => r.id === e.source)!;
        const t = researchers.find((r) => r.id === e.target)!;
        const sp = pos[s.id]; const tp = pos[t.id];
        if (!sp || !tp) return null;
        const sel = selectedId === s.id || selectedId === t.id;
        const conn = connectedIds.includes(s.id) || connectedIds.includes(t.id);
        return <line key={`${e.source}-${e.target}`} x1={sp.x} y1={sp.y} x2={tp.x} y2={tp.y} stroke={sel || conn ? "#3a3a5a" : "#1a1a2a"} strokeWidth={sel || conn ? 1.5 : 0.5} strokeDasharray={e.weight < 80 ? "5 5" : undefined} opacity={sel || conn ? 0.7 : 0.2} />;
      })}
      {researchers.map((r) => {
        const p = pos[r.id];
        if (!p) return null;
        const sel = selectedId === r.id;
        const conn = connectedIds.includes(r.id);
        const hover = hoveredId === r.id;
        const rad = sel || hover ? 20 : 17;
        return (
          <g key={r.id} transform={`translate(${p.x},${p.y})`} onPointerDown={(e) => { e.preventDefault(); onSelect(r); }} onPointerEnter={() => setHoveredId(r.id)} onPointerLeave={() => setHoveredId(null)}>
            {sel && <circle r={25} fill="none" stroke={r.color} strokeWidth="1.5" opacity="0.35" filter="url(#glow)" />}
            <circle r={rad} fill={sel ? `${r.color}25` : "#0e0e18"} stroke={conn ? r.color : sel ? r.color : "#2a2a3a"} strokeWidth={sel ? 2 : conn ? 1.5 : 1} />
            <text textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={800} fill={r.color} style={{ pointerEvents: "none", userSelect: "none" }}>{r.avatar}</text>
            <text y={28} textAnchor="middle" fontSize={8} fill={sel || hover ? "#888" : "#3a3a4a"} style={{ pointerEvents: "none", userSelect: "none" }}>{r.name.split(" ").slice(1).join(" ")}</text>
            {r.open && <circle cx={12} cy={-12} r={4} fill="#00D9A5" stroke="#0e0e18" strokeWidth={2} />}
            {hover && <g transform="translate(-14,-42)"><rect width={28} height={16} rx={5} fill={r.color} /><text textAnchor="middle" dominantBaseline="central" fontSize={9} fontWeight={800} fill="#000">{r.match}%</text></g>}
          </g>
        );
      })}
    </svg>
  );
}

// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────

function DetailPanel({ researcher, onClose, onConnect, isConnected, isMobile }: {
  researcher: (typeof researchers)[0];
  onClose: () => void;
  onConnect: (id: number) => void;
  isConnected: boolean;
  isMobile: boolean;
}) {
  return (
    <div style={{
      background: "#09090F", border: isMobile ? "none" : "1px solid #1a1a28",
      borderRadius: isMobile ? "20px 20px 0 0" : 0,
      display: "flex", flexDirection: "column", overflow: "hidden", height: "100%",
    }}>
      <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #1a1a28", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#3a3a4a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Researcher</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#3a3a4a", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: "0 4px" }}>×</button>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "14px 16px" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 50, height: 50, borderRadius: 11, background: `${researcher.color}20`, border: `1px solid ${researcher.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: researcher.color, flexShrink: 0 }}>{researcher.avatar}</div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#ECEBE8", marginBottom: 2 }}>{researcher.name}</h3>
            <p style={{ fontSize: 11, color: "#555", lineHeight: 1.4 }}>{researcher.role}<br />{researcher.dept}</p>
          </div>
        </div>
        <div style={{ background: `${researcher.color}0d`, border: `1px solid ${researcher.color}25`, borderRadius: 9, padding: "8px 12px", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: researcher.color, lineHeight: 1, letterSpacing: "-0.04em" }}>{researcher.match}<span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>%</span></div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#4a4a5a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 1 }}>affinity</div>
            <div style={{ fontSize: 10, color: "#333" }}>match</div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: "#5a5a6a", lineHeight: 1.6, marginBottom: 12 }}>{researcher.bio}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, marginBottom: 12 }}>
          {[{ v: researcher.pubs, l: "papers" }, { v: researcher.projects, l: "projects" }, { v: researcher.groups.length, l: "groups" }].map((s) => (
            <div key={s.l} style={{ background: "#0e0e18", border: "1px solid #1a1a28", borderRadius: 7, padding: "7px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#ECEBE8", marginBottom: 1 }}>{s.v}</div>
              <div style={{ fontSize: 8, color: "#444", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#333", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>Groups</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {researcher.groups.map((g) => <span key={g} style={{ fontSize: 10, fontWeight: 600, color: researcher.color, background: `${researcher.color}10`, padding: "2px 7px", borderRadius: 4 }}>{g}</span>)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#333", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>Areas</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {researcher.tags.map((tag) => <span key={tag} style={{ fontSize: 10, color: "#555", background: "#0e0e18", border: "1px solid #1a1a28", padding: "2px 7px", borderRadius: 4 }}>{tag}</span>)}
          </div>
        </div>
      </div>
      <div style={{ padding: "12px 14px", borderTop: "1px solid #1a1a28" }}>
        <button onClick={() => onConnect(researcher.id)} style={{ width: "100%", padding: "10px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", background: isConnected ? "#00D9A515" : researcher.color, color: isConnected ? "#00D9A5" : "#000", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          {isConnected ? "✓ Connected" : "Connect"}
        </button>
      </div>
    </div>
  );
}

// ─── LIST ROW ─────────────────────────────────────────────────────────────────

function ResearcherRow({ researcher, onConnect, isConnected }: {
  researcher: (typeof researchers)[0];
  onConnect: (id: number) => void;
  isConnected: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div onClick={() => setExpanded((p) => !p)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", cursor: "pointer", borderBottom: "1px solid #13131e" }}>
        <div style={{ width: 42, height: 42, borderRadius: 9, background: `${researcher.color}15`, border: `1px solid ${researcher.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: researcher.color, flexShrink: 0 }}>{researcher.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 1, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#ECEBE8" }}>{researcher.name}</span>
            {researcher.open && <span style={{ fontSize: 8, fontWeight: 700, color: "#00D9A5", background: "#00D9A512", padding: "1px 5px", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>● Abiertos</span>}
          </div>
          <p style={{ fontSize: 10, color: "#444", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{researcher.role} · {researcher.dept}</p>
        </div>
        <div style={{ fontSize: 18, fontWeight: 900, color: researcher.match >= 85 ? "#00D9A5" : researcher.match >= 70 ? "#8b8cf5" : "#3a3a4a", lineHeight: 1, letterSpacing: "-0.03em", flexShrink: 0 }}>{researcher.match}<span style={{ fontSize: 10, fontWeight: 600, color: "#2a2a3a" }}>%</span></div>
      </div>
      {expanded && (
        <div style={{ padding: "0 14px 12px 70px" }}>
          <p style={{ fontSize: 11, color: "#555", lineHeight: 1.6, marginBottom: 10 }}>{researcher.bio}</p>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
            {researcher.groups.map((g) => <span key={g} style={{ fontSize: 9, fontWeight: 600, color: researcher.color, background: `${researcher.color}10`, padding: "2px 7px", borderRadius: 4 }}>{g}</span>)}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, color: "#444" }}><span style={{ fontWeight: 700, color: "#777" }}>{researcher.pubs}</span> papers · <span style={{ fontWeight: 700, color: "#777" }}>{researcher.projects}</span> projects</span>
            <button onClick={(e) => { e.stopPropagation(); onConnect(researcher.id); }} style={{ marginLeft: "auto", padding: "6px 12px", borderRadius: 7, border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer", background: isConnected ? "#00D9A515" : researcher.color, color: isConnected ? "#00D9A5" : "#000" }}>
              {isConnected ? "✓ Conectado" : "Conectar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function NavBar({ view, setView, connectedCount, isMobile }: {
  view: string;
  setView: (v: string) => void;
  connectedCount: number;
  isMobile: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    { key: "graph", icon: <Network size={isMobile ? 16 : 12} />, label: "Graph" },
    { key: "discover", icon: <Search size={isMobile ? 16 : 12} />, label: "Discover" },
    { key: "opportunities", icon: <Zap size={isMobile ? 16 : 12} />, label: "Opportunities" },
    { key: "network", icon: <Users size={isMobile ? 16 : 12} />, label: "Network", badge: connectedCount },
  ];

  if (isMobile) {
    const active = items.find((i) => i.key === view);
    return (
      <div style={{ position: "relative" }}>
        <button onClick={() => setMenuOpen((p) => !p)} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 10px", borderRadius: 8,
          background: menuOpen ? "#141420" : "#0c0c14",
          border: "1px solid #1a1a28",
          color: "#ECEBE8", fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          <span style={{ color: "#C8F542" }}>{active?.icon}</span>
          {active?.label}
          <ChevronRight size={12} color="#555" style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }} />
        </button>
        {menuOpen && (
          <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 4, background: "#0c0c14", border: "1px solid #1a1a28", borderRadius: 10, padding: 4, minWidth: 150, zIndex: 100 }}>
            {items.map((item) => (
              <button key={item.key} onClick={() => { setView(item.key); setMenuOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 9,
                width: "100%", padding: "10px 12px", borderRadius: 7,
                border: "none", background: view === item.key ? "#141420" : "transparent",
                color: view === item.key ? "#ECEBE8" : "#5a5a6a",
                fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "left",
              }}>
                <span style={{ color: view === item.key ? "#C8F542" : "#444" }}>{item.icon}</span>
                {item.label}
                {item.badge !== undefined && item.badge > 0 && <span style={{ marginLeft: "auto", background: "#C8F542", color: "#000", fontSize: 9, fontWeight: 800, padding: "1px 5px", borderRadius: 4 }}>{item.badge}</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 2, background: "#0c0c14", border: "1px solid #1a1a28", borderRadius: 10, padding: 3 }}>
      {items.map((item) => (
        <button key={item.key} onClick={() => setView(item.key)} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 12px", borderRadius: 7, border: "none",
          fontSize: 12, fontWeight: 600, cursor: "pointer",
          background: view === item.key ? "#141420" : "transparent",
          color: view === item.key ? "#ECEBE8" : "#4a4a5a",
          transition: "all 0.12s",
        }}>
          {item.icon}
          {item.label}
          {item.badge !== undefined && item.badge > 0 && <span style={{ background: "#C8F542", color: "#000", fontSize: 9, fontWeight: 800, padding: "1px 5px", borderRadius: 4, minWidth: 16, textAlign: "center" }}>{item.badge}</span>}
        </button>
      ))}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<"graph" | "discover" | "opportunities" | "network">("graph");
  const [selectedDept, setSelectedDept] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [selectedResearcher, setSelectedResearcher] = useState<(typeof researchers)[0] | null>(null);
  const [connectedIds, setConnectedIds] = useState<number[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [viewMode, setViewMode] = useState<"graph" | "list">("graph");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(false), 4500);
    return () => clearTimeout(t);
  }, []);

  const filteredResearchers = researchers.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) || r.dept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = selectedDept === "Todos" || r.dept === selectedDept;
    const matchOpen = !onlyOpen || r.open;
    return matchSearch && matchDept && matchOpen;
  });

  const connectedResearchers = researchers.filter((r) => connectedIds.includes(r.id));

  if (!mounted) return (
    <div style={{ background: "#08080E", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#3a3a4a", fontSize: 14 }}>Loading...</div>
    </div>
  );

  return (
    <div style={css.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #08080E; }
        ::-webkit-scrollbar-thumb { background: #1e1e2e; border-radius: 2px; }
        input::placeholder { color: #3a3a4a; }
        button { touch-action: manipulation; }
      `}</style>

      {/* HEADER */}
      <header style={css.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={css.logo} />
          <span style={css.title}>ResearchNet</span>
        </div>
        <NavBar view={view} setView={setView} connectedCount={connectedIds.length} isMobile={isMobile} />
        <div style={{ fontSize: 11, color: "#3a3a4a", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
          <Globe size={11} />{researchers.length}
        </div>
      </header>

      {/* WELCOME */}
      {showWelcome && (
        <div style={{ background: "linear-gradient(90deg, #0f0f1a, #13131e)", borderBottom: "1px solid #1a1a28", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={12} color="#C8F542" />
            <span style={{ fontSize: 11, color: "#5a5a6a" }}>
              <span style={{ color: "#C8F542", fontWeight: 700 }}>{researchers.filter((r) => r.open).length} researchers</span>
              {" open · "}
              <span style={{ color: "#ECEBE8", fontWeight: 600 }}>{opportunities.filter((o) => o.hot).length} hot ops</span>
            </span>
          </div>
          <button onClick={() => setShowWelcome(false)} style={{ background: "none", border: "none", color: "#3a3a4a", cursor: "pointer", fontSize: 16, padding: 2 }}>×</button>
        </div>
      )}

      {/* GRAPH / DISCOVER */}
      {(view === "graph" || view === "discover") && (
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: isMobile ? "auto" : "calc(100vh - 56px)" }}>
          {/* CONTENT */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
            {/* FILTER BAR */}
            <div style={{ padding: "8px 12px 0", display: "flex", gap: 6, alignItems: "center", flexWrap: isMobile ? "wrap" : "nowrap" as const }}>
              <div style={css.searchWrap}>
                <Search size={11} color="#3a3a4a" />
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." style={{ background: "transparent", border: "none", outline: "none", color: "#C0BFB8", fontSize: 12, flex: 1, width: "100%" }} />
              </div>
              <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} style={css.select}>
                {allDepts.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <button onClick={() => setOnlyOpen((p) => !p)} style={{
                background: onlyOpen ? "#00D9A515" : "#0c0c14",
                border: `1px solid ${onlyOpen ? "#00D9A535" : "#1a1a28"}`,
                borderRadius: 8, color: onlyOpen ? "#00D9A5" : "#4a4a5a",
                fontSize: 11, fontWeight: 500, padding: "5px 9px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
              }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: onlyOpen ? "#00D9A5" : "#333" }} />Open
              </button>
              {view === "discover" && (
                <div style={{ display: "flex", background: "#0c0c14", border: "1px solid #1a1a28", borderRadius: 8, padding: 3, marginLeft: "auto" }}>
                  {([["graph", <Network size={11} />], ["list", <ChevronRight size={11} />]] as const).map(([mode, icon]) => (
                    <button key={mode} onClick={() => setViewMode(mode as "graph" | "list")} style={{
                      display: "flex", alignItems: "center", gap: 4, padding: "4px 9px",
                      borderRadius: 6, border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer",
                      background: viewMode === mode ? "#141420" : "transparent",
                      color: viewMode === mode ? "#ECEBE8" : "#444",
                    }}>
                      {icon}{mode === "graph" ? "Graph" : "List"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* GRAPH / LIST */}
            <div style={{ flex: 1, overflow: "hidden", position: "relative", minHeight: isMobile ? 300 : 0 }}>
              {viewMode === "graph" ? (
                <div style={{ position: "absolute", inset: 8 }}>
                  <GraphView onSelect={setSelectedResearcher} selectedId={selectedResearcher?.id ?? null} connectedIds={connectedIds} />
                </div>
              ) : (
                <div style={{ overflow: "auto", height: "100%", padding: "6px 0" }}>
                  <div style={{ ...css.card, margin: "0 8px" }}>
                    {filteredResearchers.length === 0 ? (
                      <div style={{ padding: "30px 16px", textAlign: "center", color: "#333", fontSize: 12 }}>No results</div>
                    ) : (
                      filteredResearchers.map((r) => (
                        <ResearcherRow key={r.id} researcher={r} onConnect={(id) => setConnectedIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id])} isConnected={connectedIds.includes(r.id)} />
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DETAIL PANEL */}
          {selectedResearcher && (
            <div style={{
              width: isMobile ? "100%" : 300, flexShrink: 0,
              ...(isMobile ? { position: "fixed", bottom: 0, left: 0, right: 0, height: "70vh", zIndex: 200, boxShadow: "0 -4px 40px rgba(0,0,0,0.8)" } : { borderLeft: "1px solid #1a1a28" }),
            }}>
              <DetailPanel researcher={selectedResearcher} onClose={() => setSelectedResearcher(null)} onConnect={(id) => setConnectedIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id])} isConnected={connectedIds.includes(selectedResearcher.id)} isMobile={isMobile} />
            </div>
          )}
        </div>
      )}

      {/* OPPORTUNITIES */}
      {view === "opportunities" && (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(250px, 1fr))", gap: 10 }}>
            {opportunities.map((opp) => (
              <div key={opp.id} style={{ background: "#0c0c14", border: "1px solid #1a1a28", borderRadius: 11, padding: 16 }}>
                <div style={{ display: "flex", gap: 5, marginBottom: 8, flexWrap: "wrap" as const }}>
                  <span style={css.tag}>{opp.type}</span>
                  {opp.hot && <span style={{ fontSize: 9, fontWeight: 700, color: "#ff6b6b", background: "#ff6b6b10", padding: "2px 7px", borderRadius: 4 }}>🔥 Hot</span>}
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#ECEBE8", marginBottom: 7, lineHeight: 1.3 }}>{opp.title}</h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 6 }}>
                  <span style={{ fontSize: 10, color: "#444" }}>{opp.dept}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#ff9f43", fontWeight: 600 }}><Clock size={9} />{opp.deadline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NETWORK */}
      {view === "network" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px" }}>
          {connectedResearchers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "#0c0c14", border: "1px solid #14141e", borderRadius: 13 }}>
              <Network size={32} style={{ marginBottom: 14, opacity: 0.12, color: "#C8F542" }} />
              <p style={{ fontSize: 14, fontWeight: 700, color: "#2e2e3a", marginBottom: 5 }}>Tu red está vacía</p>
              <p style={{ fontSize: 11, color: "#222228" }}>Conecta con investigadores para construir tu red</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 10, color: "#3a3a4a", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {connectedResearchers.length} investigador{connectedResearchers.length !== 1 ? "es" : ""} en tu red
              </p>
              <div style={css.card}>
                {connectedResearchers.map((r) => (
                  <ResearcherRow key={r.id} researcher={r} onConnect={(id) => setConnectedIds((p) => p.filter((x) => x !== id))} isConnected={true} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* MOBILE OVERLAY */}
      {isMobile && selectedResearcher && (
        <div onClick={() => setSelectedResearcher(null)} style={{ position: "fixed", inset: 0, top: 56, background: "rgba(0,0,0,0.5)", zIndex: 199 }} />
      )}
    </div>
  );
}
