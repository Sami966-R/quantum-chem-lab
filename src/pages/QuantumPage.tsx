import { motion } from "framer-motion";
import { Cpu, Sparkles, FlaskConical, Database, Brain, FileText, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

const stages = [
  { icon: AlertCircle, title: "Problem Statement", desc: "Cancer diagnosis suffers from delay and inaccuracy.", color: "from-purple-500 to-purple-700", glow: "rgba(168,85,247,0.45)" },
  { icon: Database, title: "Data Pipeline", desc: "Medical imaging, genomics, ChEMBL & PDBbind records.", color: "from-blue-500 to-blue-700", glow: "rgba(59,130,246,0.45)" },
  { icon: Cpu, title: "Quantum Model", desc: "Variational quantum circuits with VQE features.", color: "from-cyan-500 to-cyan-700", glow: "rgba(0,212,255,0.45)" },
  { icon: Brain, title: "AI Processing", desc: "GIN-based pattern recognition and anomaly detection.", color: "from-teal-500 to-teal-700", glow: "rgba(20,184,166,0.45)" },
  { icon: FileText, title: "Clinical Output", desc: "Diagnosis report with confidence percentage.", color: "from-green-500 to-green-700", glow: "rgba(0,255,136,0.45)" },
];

const concepts = [
  {
    title: "Superposition",
    desc: "A qubit can be 0 and 1 simultaneously, exploring many states in parallel.",
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
    desc: "Two particles share a state — measuring one instantly determines the other.",
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
    desc: "Particles pass through energy barriers classical physics forbids.",
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

    {/* HERO */}
    <section className="container mx-auto px-4 pt-32 pb-12">
      <motion.div {...fadeUp} className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-300">Quantum Computing</span>
        </div>
        <h1 className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-4xl font-black text-transparent md:text-6xl">
          Quantum Meets Medicine
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300">
          Harnessing quantum superposition and entanglement to revolutionize cancer diagnostics.
        </p>
      </motion.div>

      {/* hero diagram */}
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
          <circle cx="100" cy="100" r="20" fill="#1a0a2e" stroke="#7b2ff7" />
          <circle cx="300" cy="100" r="28" fill="#0a1a2e" stroke="#00d4ff" strokeWidth="2" />
          <circle cx="500" cy="100" r="20" fill="#0a2e1a" stroke="#00ff88" />
          <text x="100" y="160" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="monospace">Quantum Circuit</text>
          <text x="300" y="160" textAnchor="middle" fill="#00d4ff" fontSize="12" fontFamily="monospace" fontWeight="bold">QuantaCure AI</text>
          <text x="500" y="160" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="monospace">Drug Molecule</text>
        </svg>
      </motion.div>
    </section>

    {/* FYP architecture */}
    <section className="container mx-auto px-4 py-16">
      <motion.h2 {...fadeUp} className="mb-12 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl">
        Complete Project Architecture
      </motion.h2>

      <div className="relative grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        {stages.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="group relative flex flex-col rounded-xl border border-cyan-500/20 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400"
            style={{ boxShadow: `0 0 0 0 ${s.glow}` }}
            whileHover={{ boxShadow: `0 0 30px ${s.glow}` }}
          >
            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${s.color}`}>
              <s.icon className="h-6 w-6 text-white" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">Stage {i + 1}</p>
            <h3 className="mt-1 text-base font-bold text-white">{s.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-300">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CONCEPTS */}
    <section className="container mx-auto px-4 py-16">
      <motion.h2 {...fadeUp} className="mb-12 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl">
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

    <SiteFooter />
  </div>
);

export default QuantumPage;
