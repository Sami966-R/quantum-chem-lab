import { motion } from "framer-motion";
import { Atom } from "lucide-react";
import Navigation from "@/components/Navigation";

const QuantumPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <div className="container mx-auto px-4 pt-24 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="mb-2 flex items-center gap-2">
          <Atom className="h-5 w-5 text-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">Future Work</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Quantum-Enhanced Molecular Simulation</h1>
        <p className="mt-2 text-sm text-muted-foreground">Future integration of quantum algorithms for molecular energy estimation</p>
      </motion.div>

      <div className="glass-card p-6 mb-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Quantum algorithms for molecular energy estimation — including <span className="text-accent font-medium">Variational Quantum Eigensolver (VQE)</span> and <span className="text-accent font-medium">Quantum Approximate Optimization Algorithm (QAOA)</span> — will be integrated in future work. These methods leverage quantum computing to solve the electronic structure problem more efficiently than classical approaches for certain molecular systems.
        </p>
      </div>

      {/* Placeholder comparison table */}
      <div className="glass-card overflow-x-auto p-4 mb-8">
        <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Quantum vs Classical — Planned Comparison</h3>
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-border/50 text-muted-foreground">
              <th className="px-3 py-2">Metric</th>
              <th className="px-3 py-2">Classical ML</th>
              <th className="px-3 py-2">Quantum (Projected)</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { metric: "Energy MAE (Ha)", classical: "0.42", quantum: "~0.12", status: "Planned" },
              { metric: "Binding Affinity MAE", classical: "0.58", quantum: "~0.18", status: "Planned" },
              { metric: "Parameter Count", classical: "800+", quantum: "~24", status: "Planned" },
              { metric: "Training Time", classical: "Minutes", quantum: "Hours (NISQ)", status: "Planned" },
              { metric: "Scalability", classical: "High", quantum: "Limited (NISQ)", status: "Research" },
            ].map((row) => (
              <tr key={row.metric} className="border-b border-border/20">
                <td className="px-3 py-2 text-foreground">{row.metric}</td>
                <td className="px-3 py-2 text-foreground">{row.classical}</td>
                <td className="px-3 py-2 text-accent">{row.quantum}</td>
                <td className="px-3 py-2">
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] text-primary">{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Space for quantum results */}
      <div className="glass-card flex h-48 items-center justify-center p-6">
        <div className="text-center">
          <Atom className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
          <p className="font-mono text-xs text-muted-foreground">Quantum simulation results will appear here upon integration</p>
        </div>
      </div>
    </div>
  </div>
);

export default QuantumPage;
