import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Upload, Cpu, FileCheck, Atom, Brain, FlaskConical, ArrowRight, Database, Layers } from "lucide-react";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import FloatingMolecule from "@/components/FloatingMolecule";

const MoleculeCanvas = lazy(() => import("@/components/MoleculeCanvas"));

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

// FIXED: Real stats from your actual backend/model
const stats = [
  { value: 2, suffix: "M+", label: "ChEMBL Bioactivity Datapoints" },
  { value: 2764, suffix: "", label: "PDBbind Protein-Ligand Complexes" },
  { value: 94, suffix: ".2%", label: "Quantum Mode Confidence" },
  { value: 3, suffix: "", label: "Prediction Modes" },
];

// FIXED: Correct drug discovery steps
const steps = [
  {
    icon: Upload,
    title: "Input SMILES",
    desc: "Enter any molecular SMILES string — our system parses it instantly using RDKit into an atom-bond graph.",
  },
  {
    icon: Cpu,
    title: "GIN Model Processes",
    desc: "5-layer GINEConv graph neural network reads atom and bond features, running Classical, Hybrid, or Quantum mode.",
  },
  {
    icon: FileCheck,
    title: "Get pKd + Stability",
    desc: "Receive binding affinity (pKd), energy score, QED stability, protein target, and virtual screening rank.",
  },
];

// FIXED: Correct tech — no cancer, no wrong descriptions
const tech = [
  {
    icon: Atom,
    title: "Quantum Simulation",
    desc: "Simulated HOMO-LUMO gap, polarisability, and dipole moment augment classical GNN features.",
    back: "Quantum mode adds circuit-inspired feature augmentation on top of Hybrid mode for highest-confidence binding predictions.",
  },
  {
    icon: Brain,
    title: "Graph Neural Network",
    desc: "GINEConv architecture captures atom-bond topology across 5 message-passing layers.",
    back: "Pre-trained on ChEMBL 36 (2M datapoints), fine-tuned on PDBbind v2013 (2,764 complexes) for precise pKd output.",
  },
  {
    icon: FlaskConical,
    title: "Virtual Screening",
    desc: "Batch screen 147+ compounds against protein targets, ranked by predicted binding affinity.",
    back: "Results sorted by pKd score with stability labels. Top candidate: 2PQ9 (HIV Protease, pKd 11.9) from our screening run.",
  },
];

// FIXED: Correct tech stack + datasets separated
const techStack = [
  { name: "PyTorch Geometric", role: "GINEConv GNN layers" },
  { name: "RDKit", role: "SMILES → molecular graph" },
  { name: "FastAPI", role: "REST API backend" },
  { name: "React + Vite", role: "Frontend UI" },
  { name: "Python", role: "ML pipeline core" },
  { name: "Framer Motion", role: "UI animations" },
];

const datasets = [
  {
    name: "ChEMBL 36",
    stat: "2M+",
    statLabel: "Bioactivity Datapoints",
    desc: "Used for pre-training the GIN model on large-scale drug-protein interaction data.",
    glow: "rgba(123,47,247,0.4)",
    border: "border-purple-500/40",
  },
  {
    name: "PDBbind v2013",
    stat: "2,764",
    statLabel: "Protein-Ligand Complexes",
    desc: "Used for fine-tuning on experimentally measured binding affinities between proteins and drug molecules.",
    glow: "rgba(0,212,255,0.4)",
    border: "border-cyan-500/40",
  },
];

const StatCard = ({ s, i }: { s: typeof stats[0]; i: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.15 }}
      className="group rounded-xl border border-cyan-500/20 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]"
    >
      <div className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
        {inView ? <CountUp end={s.value} duration={2} suffix={s.suffix} separator="," /> : `0${s.suffix}`}
      </div>
      <p className="mt-2 text-xs uppercase tracking-widest text-gray-400">{s.label}</p>
    </motion.div>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-white">
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center px-4 pt-24">
        <div className="container mx-auto grid items-center gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* FIXED headline */}
            <h1 className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-5xl font-black leading-tight tracking-tight text-transparent md:text-6xl xl:text-7xl">
              Discover Tomorrow's Drugs with Quantum AI
            </h1>
            {/* FIXED subtext */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-300">
              QuantaCure uses Graph Neural Networks and quantum-mechanical simulation to predict
              molecular binding affinity and accelerate drug discovery — from SMILES input to
              ranked drug candidates in milliseconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/molecule-testing")}
                className="rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all hover:shadow-[0_0_40px_rgba(123,47,247,0.6)]"
              >
                Run a Prediction
              </button>
              <button
                onClick={() => navigate("/quantum")}
                className="rounded-md border border-cyan-400/50 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-cyan-300 transition-all hover:bg-cyan-500/10"
              >
                Explore the Science
              </button>
            </div>
          </motion.div>

          <div className="relative aspect-square max-w-md justify-self-center">
            <div className="absolute inset-0">
              <FloatingMolecule className="h-full w-full" />
            </div>
            <div className="absolute inset-0 opacity-60">
              <Suspense fallback={null}>
                <MoleculeCanvas />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS (real numbers) ── */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.h2
            {...fadeUp}
            className="mb-10 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
          >
            By the Numbers
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => <StatCard key={s.label} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (drug discovery, not cancer) ── */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.h2
            {...fadeUp}
            className="mb-12 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
          >
            How It Works
          </motion.h2>
          <div className="relative grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative rounded-xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 shadow-[0_0_20px_rgba(0,212,255,0.5)]">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-cyan-400">Step {i + 1}</p>
                <h3 className="mb-2 text-lg font-bold text-white">{s.title}</h3>
                <p className="text-sm text-gray-300">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="absolute top-1/2 right-0 hidden translate-x-1/2 md:block">
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
        </div>
      </section>

      {/* ── TECHNOLOGY (3D flip, correct descriptions) ── */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.h2
            {...fadeUp}
            className="mb-12 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
          >
            Our Technology
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-3">
            {tech.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group h-64 [perspective:1000px]"
              >
                <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-cyan-500/20 bg-white/5 p-6 text-center backdrop-blur-sm [backface-visibility:hidden]">
                    <t.icon className="mb-4 h-12 w-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,212,255,0.7)]" />
                    <h3 className="mb-2 text-lg font-bold text-white">{t.title}</h3>
                    <p className="text-sm text-gray-300">{t.desc}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-purple-500/40 bg-gradient-to-br from-purple-900/40 to-cyan-900/40 p-6 text-center backdrop-blur-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="text-sm leading-relaxed text-gray-200">{t.back}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate("/quantum")}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all hover:shadow-[0_0_40px_rgba(123,47,247,0.6)]"
            >
              Explore the Quantum Layer <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── TECH STACK (tools only, no datasets) ── */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.h2
            {...fadeUp}
            className="mb-12 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
          >
            Built With
          </motion.h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-xl border border-cyan-500/20 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:-translate-y-1"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30">
                  <Layers className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATASETS (separate from tech stack) ── */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.h2
            {...fadeUp}
            className="mb-4 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
          >
            Training Data
          </motion.h2>
          <motion.p {...fadeUp} className="mb-12 text-center text-sm text-gray-400">
            These are datasets — not tools. They were used to train and fine-tune the GIN model.
          </motion.p>
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            {datasets.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className={`rounded-xl border ${d.border} bg-white/5 p-8 backdrop-blur-sm transition-all duration-300`}
                whileHover={{ boxShadow: `0 0 40px ${d.glow}` }}
              >
                <div className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-5xl font-black text-transparent">
                  <CountUp end={parseInt(d.stat.replace(/\D/g, "")) || 2} duration={2} suffix={d.stat.replace(/[0-9,]/g, "")} separator="," />
                </div>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">{d.statLabel}</p>
                <h3 className="mt-4 text-xl font-bold text-white">{d.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{d.desc}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Database className="h-4 w-4 text-cyan-400" />
                  <span className="font-mono text-xs text-cyan-400">Dataset</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Landing;
