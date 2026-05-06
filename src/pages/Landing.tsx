import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Upload, Cpu, FileCheck, Atom, Brain, FlaskConical, ArrowRight } from "lucide-react";
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

const stats = [
  { value: 94, suffix: "%", label: "Detection Accuracy" },
  { value: 500, suffix: "+", label: "Compounds Analyzed" },
  { value: 3, suffix: "x", label: "Faster Than Traditional" },
  { value: 12, suffix: "ms", label: "Quantum Processing Time" },
];

const steps = [
  { icon: Upload, title: "Input Patient Data", desc: "Upload molecular structures, genomics, and imaging data into the platform." },
  { icon: Cpu, title: "Quantum AI Analysis", desc: "Hybrid quantum circuits process features through variational neural networks." },
  { icon: FileCheck, title: "Diagnosis Report", desc: "Get a confidence-scored cancer detection report in milliseconds." },
];

const tech = [
  { icon: Atom, title: "Quantum Computing", desc: "VQE & FidelityQuantumKernel power molecular feature extraction.", back: "Variational circuits explore exponentially large state spaces classical machines cannot reach." },
  { icon: Brain, title: "Deep Learning", desc: "Graph neural networks learn from millions of molecular graphs.", back: "GIN architecture captures atom-bond topology to predict binding affinity with high precision." },
  { icon: FlaskConical, title: "Drug Simulation", desc: "Real-time docking against ChEMBL and PDBbind targets.", back: "Hybrid screening ranks candidates by stability score, energy, and confidence." },
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
        {inView ? <CountUp end={s.value} duration={2} suffix={s.suffix} /> : `0${s.suffix}`}
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

      {/* HERO */}
      <section className="relative flex min-h-screen items-center px-4 pt-24">
        <div className="container mx-auto grid items-center gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-5xl font-black leading-tight tracking-tight text-transparent md:text-6xl xl:text-7xl">
              The Future of Cancer Detection is Quantum
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-300">
              Quanta Cure combines quantum computing with AI to detect cancer faster, smarter, and earlier than ever before.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/overview")}
                className="rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all hover:shadow-[0_0_40px_rgba(123,47,247,0.6)]"
              >
                Explore the Science
              </button>
              <button
                onClick={() => navigate("/molecule-testing")}
                className="rounded-md border border-cyan-400/50 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-cyan-300 transition-all hover:bg-cyan-500/10"
              >
                View Demo
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

      {/* STATS */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.h2 {...fadeUp} className="mb-10 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl">
            By the Numbers
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => <StatCard key={s.label} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.h2 {...fadeUp} className="mb-12 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl">
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

      {/* TECHNOLOGY (3D flip) */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <motion.h2 {...fadeUp} className="mb-12 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl">
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

      <SiteFooter />
    </div>
  );
};

export default Landing;
