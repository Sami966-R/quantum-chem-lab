import { motion } from "framer-motion";
import { Cpu, Sparkles, FlaskConical, Database, Brain, FileText, Dna, Zap, Target, BarChart3 } from "lucide-react";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

// FIXED: Real drug discovery architecture from your actual backend
const stages = [
  {
    icon: Dna,
    title: "SMILES Input",
    desc: "User provides a molecular SMILES string. RDKit parses it into atoms (nodes) and bonds (edges).",
    color: "from-purple-500 to-purple-700",
    glow: "rgba(168,85,247,0.45)",
    detail: "Features: atomic number, degree, charge, hybridisation, aromaticity, H count",
  },
  {
    icon: Database,
    title: "RDKit Featurisation",
    desc: "Atoms become graph nodes with 6 features. Bonds become edges with type, conjugation, ring membership.",
    color: "from-blue-500 to-blue-700",
    glow: "rgba(59,130,246,0.45)",
    detail: "Pre-trained on ChEMBL 36 — 2M+ bioactivity datapoints",
  },
  {
    icon: Cpu,
    title: "GINEConv GNN",
    desc: "5 message-passing layers with hidden dim 256. Each layer aggregates atom and bond features from neighbours.",
    color: "from-cyan-500 to-cyan-700",
    glow: "rgba(0,212,255,0.45)",
    detail: "Architecture: GINEConv → ReLU → Global Mean Pool → FC layers",
  },
  {
    icon: Zap,
    title: "Quantum Augmentation",
    desc: "Simulated HOMO-LUMO gap, molecular polarisability, dipole moment proxies added as extra features.",
    color: "from-teal-500 to-teal-700",
    glow: "rgba(20,184,166,0.45)",
    detail: "Quantum Mode confidence: 94.2% | Hybrid Mode: 93.8% | Classical: 89.5%",
  },
  {
    icon: Target,
    title: "Binding Affinity Prediction",
    desc: "Outputs pKd score (2–12 scale), energy in kcal/mol. Fine-tuned on PDBbind v2013 core set.",
    color: "from-green-500 to-green-700",
    glow: "rgba(0,255,136,0.45)",
    detail: "Higher pKd = stronger binding. Fine-tuned on 2,764 protein-ligand complexes.",
  },
  {
    icon: BarChart3,
    title: "Drug Candidate Report",
    desc: "QED stability score, protein target ID (80+ PDB mappings), virtual screening rank across 147 compounds.",
    color: "from-lime-500 to-lime-700",
    glow: "rgba(163,230,53,0.45)",
    detail: "Top candidate: 2PQ9 (HIV Protease, pKd 11.9) from virtual screening run.",
  },
];

// FIXED: Three real prediction modes from your backend
const modes = [
  {
    title: "Classical Mode",
    confidence: "89.5",
    badge: null,
    color: "border-blue-500/40",
    glow: "rgba(59,130,246,0.3)",
    badgeColor: "bg-blue-500/20 text-blue-300",
    icon: Cpu,
    iconColor: "text-blue-400",
    features: [
      "Standard GIN graph features only",
      "Atom features: atomic number, degree, hybridisation",
      "Aromaticity flag, H count, formal charge",
      "Bond features: type, conjugation, ring membership",
      "Fastest prediction mode",
    ],
  },
  {
    title: "Hybrid Mode",
    confidence: "93.8",
    badge: "Recommended",
    color: "border-cyan-500/40",
    glow: "rgba(0,212,255,0.35)",
    badgeColor: "bg-cyan-500/20 text-cyan-300",
    icon: Zap,
    iconColor: "text-cyan-400",
    features: [
      "Classical GIN features +",
      "Simulated HOMO-LUMO gap approximation",
      "Molecular polarisability estimate",
      "Dipole moment proxy features",
      "Electron density distribution estimates",
    ],
  },
  {
    title: "Quantum Mode",
    confidence: "94.2",
    badge: "Most Advanced",
    color: "border-purple-500/40",
    glow: "rgba(123,47,247,0.35)",
    badgeColor: "bg-purple-500/20 text-purple-300",
    icon: Sparkles,
    iconColor: "text-purple-400",
    features: [
      "Full quantum circuit-inspired augmentation",
      "Hybrid features + variational circuit descriptors",
      "FidelityQuantumKernel VQE Ansatz pipeline",
      "Highest confidence prediction",
      "Note: quantum features are simulated, not real hardware",
    ],
  },
];

// Quantum concepts with corrected SVGs
const concepts = [
  {
    title: "Superposition",
    desc: "A qubit can be 0 and 1 simultaneously, exploring many molecular states in parallel.",
    svg: (
      <svg viewBox="0 0 100 100" className="h-24 w-24">
        <circle cx="50" cy="50" r="35" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
        <ellipse cx="50" cy="50" rx="35" ry="12" fill="none" stroke="#7b2ff7" strokeWidth="1" />
        <circle cx="50" cy="50" r="4" fill="#00d4ff">
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>
        <line x1="50" y1="15" x2="50" y2="85" stroke="#00d4ff" strokeWidth="0.6" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Entanglement",
    desc: "Two particles share a quantum state — correlations used to encode molecular feature relationships.",
    svg: (
      <svg viewBox="0 0 100 100" className="h-24 w-24">
        <circle cx="30" cy="50" r="8" fill="#00d4ff">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="50" r="8" fill="#7b2ff7">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M30 50 Q50 20 70 50 Q50 80 30 50" fill="none" stroke="#00ff88" strokeWidth="0.8" opacity="0.7" />
      </svg>
    ),
  },
  {
    title: "Quantum Tunneling",
    desc: "Particles pass through energy barriers — analogous to molecules finding binding conformations.",
    svg: (
      <svg viewBox="0 0 100 100" className="h-24 w-24">
        <rect x="45" y="20" width="10" height="60" fill="#7b2ff7" opacity="0.4" />
        <path d="M10 50 Q30 30 50 50 Q70 70 90 50" fill="none" stroke="#00d4ff" strokeWidth="1.5">
          <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="3s" repeatCount="indefinite" />
        </path>
        <circle cx="20" cy="48" r="3" fill="#00ff88" />
        <circle cx="80" cy="52" r="3" fill="#00ff88" />
      </svg>
    ),
  },
];

const QuantumPage = () => (
  <div className="relative min-h-screen bg-background text-white">
    <Navigation />

    {/* ── HERO (FIXED: drug discovery, not cancer) ── */}
    <section className="container mx-auto px-4 pt-32 pb-12">
      <motion.div {...fadeUp} className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-300">Quantum Drug Discovery</span>
        </div>
        <h1 className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-4xl font-black text-transparent md:text-6xl">
          Quantum Meets Drug Discovery
        </h1>
        {/* FIXED subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300">
          Simulating quantum-mechanical molecular behaviour to predict binding affinity at
          unprecedented accuracy — from SMILES string to ranked drug candidate in milliseconds.
        </p>
      </motion.div>

      {/* Hero node diagram */}
      <motion.div {...fadeUp} className="mt-12">
        <svg viewBox="0 0 600 200" className="mx-auto w-full max-w-3xl">
          <defs>
            <radialGradient id="pNode"><stop offset="0%" stopColor="#7b2ff7" /><stop offset="100%" stopColor="#7b2ff7" stopOpacity="0" /></radialGradient>
            <radialGradient id="cNode"><stop offset="0%" stopColor="#00d4ff" /><stop offset="100%" stopColor="#00d4ff" stopOpacity="0" /></radialGradient>
            <radialGradient id="gNode"><stop offset="0%" stopColor="#00ff88" /><stop offset="100%" stopColor="#00ff88" stopOpacity="0" /></radialGradient>
          </defs>
          <line x1="120" y1="100" x2="280" y2="100" stroke="#7b2ff7" strokeWidth="1" />
          <line x1="320" y1="100" x2="480" y2="100" stroke="#00ff88" strokeWidth="1" />
          <circle r="3" fill="#00d4ff">
            <animateMotion dur="3s" repeatCount="indefinite" path="M120 100 L280 100" />
          </circle>
          <circle r="3" fill="#00d4ff">
            <animateMotion dur="3s" repeatCount="indefinite" path="M320 100 L480 100" />
          </circle>
          <circle cx="100" cy="100" r="50" fill="url(#pNode)" />
          <circle cx="300" cy="100" r="60" fill="url(#cNode)" />
          <circle cx="500" cy="100" r="50" fill="url(#gNode)" />
          <circle cx="100" cy="100" r="20" fill="#1a0a2e" stroke="#7b2ff7" strokeWidth="1.5" />
          <circle cx="300" cy="100" r="28" fill="#0a1a2e" stroke="#00d4ff" strokeWidth="2" />
          <circle cx="500" cy="100" r="20" fill="#0a2e1a" stroke="#00ff88" strokeWidth="1.5" />
          {/* FIXED node labels */}
          <text x="100" y="155" textAnchor="middle" fill="#9ca3af" fontSize="10" fontFamily="monospace">Quantum Circuit</text>
          <text x="300" y="158" textAnchor="middle" fill="#00d4ff" fontSize="11" fontFamily="monospace" fontWeight="bold">QuantaCure GIN</text>
          <text x="500" y="155" textAnchor="middle" fill="#9ca3af" fontSize="10" fontFamily="monospace">Drug Candidate</text>
        </svg>
      </motion.div>
    </section>

    {/* ── FULL ARCHITECTURE SHOWCASE (FIXED: real pipeline) ── */}
    <section className="container mx-auto px-4 py-16">
      <motion.div {...fadeUp} className="text-center mb-12">
        <h2 className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          System Architecture
        </h2>
        <p className="mt-3 text-sm text-gray-400">How QuantaCure works end to end — from molecule input to drug candidate output</p>
      </motion.div>

      <div className="relative grid gap-6 md:grid-cols-3 lg:grid-cols-6">
        {stages.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group relative flex flex-col rounded-xl border border-cyan-500/20 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400"
            whileHover={{ boxShadow: `0 0 30px ${s.glow}` }}
          >
            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} shadow-lg`}>
              <s.icon className="h-6 w-6 text-white" />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-cyan-300">Stage {i + 1}</p>
            <h3 className="mt-1 text-sm font-bold text-white">{s.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-300">{s.desc}</p>
            <p className="mt-3 text-[10px] leading-relaxed text-cyan-400/70 border-t border-white/10 pt-3">{s.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Connecting arrow row below on desktop */}
      <div className="hidden lg:flex justify-between px-6 mt-4 max-w-full">
        {stages.slice(0, 5).map((_, i) => (
          <div key={i} className="flex-1 flex items-center justify-end pr-3">
            <div className="relative h-px w-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30">
              <motion.div
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d4ff]"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── PREDICTION MODES (FIXED: real 3 modes with correct confidence scores) ── */}
    <section className="container mx-auto px-4 py-16">
      <motion.div {...fadeUp} className="text-center mb-12">
        <h2 className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Three Prediction Modes
        </h2>
        <p className="mt-3 text-sm text-gray-400">Select the mode in the Molecule Lab — each adds more quantum features</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {modes.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className={`relative rounded-xl border ${m.color} bg-white/5 p-6 backdrop-blur-sm transition-all duration-300`}
            whileHover={{ boxShadow: `0 0 35px ${m.glow}`, scale: 1.02 }}
          >
            {m.badge && (
              <span className={`absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${m.badgeColor}`}>
                {m.badge}
              </span>
            )}
            <m.icon className={`mb-4 h-10 w-10 ${m.iconColor}`} />
            <h3 className="text-xl font-bold text-white">{m.title}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-black text-transparent">
                {m.confidence}%
              </span>
              <span className="text-xs text-gray-400">confidence</span>
            </div>
            <ul className="mt-4 space-y-2">
              {m.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-gray-300">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── QUANTUM CONCEPTS ── */}
    <section className="container mx-auto px-4 py-16">
      <motion.h2
        {...fadeUp}
        className="mb-12 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
      >
        Core Quantum Concepts
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-3">
        {concepts.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="flex flex-col items-center rounded-xl border border-cyan-500/20 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]"
          >
            {c.svg}
            <h3 className="mt-4 text-lg font-bold text-white">{c.title}</h3>
            <p className="mt-2 text-sm text-gray-300">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── KNOWN LIMITATIONS (academic honesty) ── */}
    <section className="container mx-auto px-4 py-16">
      <motion.div
        {...fadeUp}
        className="mx-auto max-w-2xl rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-8 backdrop-blur-sm"
      >
        <h3 className="mb-4 text-lg font-bold text-yellow-300">Known Limitations</h3>
        <ul className="space-y-3">
          {[
            "Quantum features are simulated — not run on real quantum hardware (acknowledged in FYP report)",
            "Protein classification for novel molecules uses rule-based heuristics",
            "Model fine-tuned on PDBbind v2013 — not the latest version",
            "Virtual screening covers 147 compounds from the core set",
          ].map((l) => (
            <li key={l} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
              {l}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>

    <SiteFooter />
  </div>
);

export default QuantumPage;
