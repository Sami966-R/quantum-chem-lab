import { motion } from "framer-motion";
import MoleculeCanvas from "./MoleculeCanvas";
import { Atom, FlaskConical, Cpu, Calendar, GraduationCap, Users } from "lucide-react";

const stats = [
  { icon: Users, label: "Research Team", value: "Muhammad Samiullah, Muhammad Danish Nadeem, Safwaan Saleem" },
  { icon: GraduationCap, label: "Supervisor", value: "Sir Zunnurain Hussain" },
  { icon: Cpu, label: "University", value: "Bahria University Lahore Campus" },
  { icon: Calendar, label: "Timeline", value: "2025–2026" },
  { icon: FlaskConical, label: "Publication Target", value: "Quantum Computation" },
];

const HeroSection = () => (
  <section id="hero" className="relative min-h-screen overflow-hidden hero-gradient pt-20">
    {/* Grid overlay */}
    <div className="absolute inset-0 quantum-grid-bg opacity-30" />

    {/* Scan line effect */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-scan-line" />
    </div>

    <div className="container relative mx-auto flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-8 px-4 lg:flex-row lg:gap-12">
      {/* Left: Text */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 text-center lg:text-left"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5">
          <Atom className="h-4 w-4 text-accent" />
          <span className="font-mono text-xs text-accent">FINAL YEAR PROJECT • 2024–2025</span>
        </div>

        <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl xl:text-6xl">
          Quanta<span className="text-accent glow-text-accent">Cure</span>
        </h1>

        <p className="mb-2 font-mono text-sm font-medium tracking-wide text-primary glow-text-primary md:text-base">
          Leveraging Quantum Algorithms for Novel Drug Discovery
        </p>

        <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Hybrid Quantum-Classical Framework for Molecular Energy Modeling &amp; Binding Affinity Prediction
        </p>

        <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass-card flex items-center gap-2 px-3 py-2"
            >
              <s.icon className="h-4 w-4 text-accent" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="text-xs font-medium text-foreground">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right: 3D molecule */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="aspect-square w-full max-w-md flex-shrink-0 lg:max-w-lg"
      >
        <MoleculeCanvas />
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
