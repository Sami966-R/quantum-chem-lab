import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Atom } from "lucide-react";

const MoleculeCanvas = lazy(() => import("@/components/MoleculeCanvas"));

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Grid overlay */}
      <div className="absolute inset-0 quantum-grid-bg opacity-20" />

      {/* Gradient background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Scan line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-scan-line" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
        {/* Molecule background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
           <Suspense fallback={null}>
             <MoleculeCanvas />
           </Suspense>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-border/50 bg-card/60 backdrop-blur-md glow-primary"
          >
            <Atom className="h-12 w-12 text-accent" />
          </motion.div>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl xl:text-7xl">
            Quanta<span className="text-accent glow-text-accent">Cure</span>
          </h1>

          {/* Subtitle */}
          <p className="mb-3 max-w-2xl font-mono text-sm font-medium tracking-wide text-primary glow-text-primary md:text-base">
            AI-Driven Molecular Analysis for Drug Discovery
          </p>

          <p className="mb-10 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Classical Machine Learning and Quantum-Ready Molecular Evaluation
          </p>

          {/* University */}
          <p className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Bahria University Lahore Campus · Department of Computer Science
          </p>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/overview")}
            className="rounded-md bg-accent px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all glow-accent hover:brightness-110"
          >
            Enter Research Portal
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
