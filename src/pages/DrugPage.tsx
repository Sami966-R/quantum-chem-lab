import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Cpu, Sparkles, Pill } from "lucide-react";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

const pipeline = [
  { icon: Pencil, title: "Molecule Input", desc: "Draw or upload SMILES strings and molecular structures." },
  { icon: Cpu, title: "Quantum Simulation", desc: "Simulate molecular behavior on variational quantum circuits." },
  { icon: Sparkles, title: "AI Screening", desc: "Rank candidates by binding affinity and stability score." },
  { icon: Pill, title: "Drug Candidate", desc: "Output the top compound with confidence and energy metrics." },
];

// Visualizer molecule (10 atoms)
const atoms = [
  { x: 50, y: 50, label: "C" },
  { x: 75, y: 35, label: "O" },
  { x: 100, y: 50, label: "C" },
  { x: 125, y: 35, label: "N" },
  { x: 150, y: 50, label: "C" },
  { x: 100, y: 80, label: "C" },
  { x: 75, y: 95, label: "H" },
  { x: 125, y: 95, label: "H" },
  { x: 50, y: 80, label: "O" },
  { x: 150, y: 80, label: "H" },
];
const bonds: { a: number; b: number; double?: boolean }[] = [
  { a: 0, b: 1 }, { a: 1, b: 2, double: true }, { a: 2, b: 3 }, { a: 3, b: 4 },
  { a: 2, b: 5 }, { a: 5, b: 6 }, { a: 5, b: 7 }, { a: 0, b: 8, double: true }, { a: 4, b: 9 },
];
const colorFor = (l: string) =>
  l === "C" ? "#00d4ff" : l === "O" ? "#ff5577" : l === "N" ? "#7b2ff7" : "#9ca3af";

const Visualizer = () => {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="relative">
      <motion.svg
        viewBox="0 0 200 130"
        className="mx-auto w-full max-w-2xl drop-shadow-[0_0_25px_rgba(0,212,255,0.3)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        {bonds.map((b, i) => {
          const A = atoms[b.a], B = atoms[b.b];
          return (
            <g key={i}>
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#00d4ff" strokeWidth={b.double ? 0.8 : 0.5} opacity="0.7" />
              {b.double && <line x1={A.x + 1.2} y1={A.y + 1.2} x2={B.x + 1.2} y2={B.y + 1.2} stroke="#00d4ff" strokeWidth="0.5" opacity="0.5" />}
            </g>
          );
        })}
        {atoms.map((a, i) => (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
            <circle cx={a.x} cy={a.y} r={hover === i ? 5 : 3.5} fill={colorFor(a.label)}>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x={a.x} y={a.y + 1.3} textAnchor="middle" fontSize="3" fill="#0a0a1a" fontWeight="bold">{a.label}</text>
            {hover === i && (
              <text x={a.x} y={a.y - 8} textAnchor="middle" fontSize="4" fill="#00ff88" fontFamily="monospace">
                {a.label} · atom {i + 1}
              </text>
            )}
          </g>
        ))}
      </motion.svg>
    </div>
  );
};

const DrugPage = () => (
  <div className="relative min-h-screen bg-background text-white">
    <Navigation />

    {/* HERO */}
    <section className="container mx-auto px-4 pt-32 pb-12 text-center">
      <motion.div {...fadeUp}>
        <h1 className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-4xl font-black text-transparent md:text-6xl">
          Quantum Drug Discovery
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300">
          Simulating molecular interactions at quantum scale to identify cancer-fighting compounds.
        </p>
      </motion.div>

      <motion.div {...fadeUp} className="mx-auto mt-10 aspect-square w-full max-w-md">
        <Visualizer />
      </motion.div>
    </section>

    {/* PIPELINE */}
    <section className="container mx-auto px-4 py-16">
      <motion.h2 {...fadeUp} className="mb-12 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl">
        Drug Discovery Pipeline
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {pipeline.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="relative rounded-xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 shadow-[0_0_15px_rgba(0,212,255,0.5)]">
              <s.icon className="h-6 w-6 text-white" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">Step {i + 1}</p>
            <h3 className="mt-1 text-base font-bold text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-gray-300">{s.desc}</p>
            {i < pipeline.length - 1 && (
              <div className="absolute top-1/2 right-0 hidden translate-x-1/2 lg:block">
                <div className="relative h-px w-12 bg-gradient-to-r from-cyan-400 to-purple-500">
                  <motion.div
                    className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00d4ff]"
                    animate={{ left: ["0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>

    {/* VISUALIZER bottom block */}
    <section className="container mx-auto px-4 py-16">
      <motion.div {...fadeUp} className="rounded-2xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-sm">
        <h2 className="mb-2 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-2xl font-bold text-transparent md:text-3xl">
          Molecule Visualizer
        </h2>
        <p className="mb-8 text-center text-sm text-gray-300">Hover any atom to inspect its element symbol.</p>
        <Visualizer />
      </motion.div>
    </section>

    <SiteFooter />
  </div>
);

export default DrugPage;
