import { motion } from "framer-motion";
import { Atom, CheckCircle2, Plug } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";

const quantumResults = [
  { metric: "Binding Affinity MAE", classical: "6.19", quantum: "1.32", status: "Completed" },
  { metric: "Binding Affinity RMSE", classical: "6.56", quantum: "1.68", status: "Completed" },
  { metric: "R² Score", classical: "-8.08", quantum: "0.21", status: "Completed" },
  { metric: "Edge Processing", classical: "Euclidean Distance", quantum: "FidelityQuantumKernel", status: "Integrated" },
  { metric: "Electronic Features", classical: "N/A", quantum: "VQE HOMO-LUMO Gap", status: "Integrated" },
];

const statusConfig: Record<string, { className: string; icon: typeof CheckCircle2 }> = {
  Completed: { className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: CheckCircle2 },
  Integrated: { className: "bg-sky-500/20 text-sky-400 border-sky-500/30", icon: Plug },
};

const QuantumPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <div className="container mx-auto px-4 pt-24 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="mb-2 flex items-center gap-2">
          <Atom className="h-5 w-5 text-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">Quantum Computing</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Quantum-Enhanced Molecular Simulation</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Variational Quantum Eigensolver (VQE) &amp; FidelityQuantumKernel pipeline — completed results
        </p>
      </motion.div>

      <div className="glass-card p-6 mb-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          The <span className="text-accent font-medium">Variational Quantum Eigensolver (VQE)</span> pipeline extracts HOMO-LUMO gap features, while the <span className="text-accent font-medium">FidelityQuantumKernel</span> replaces classical Euclidean distance for edge processing in the molecular graph neural network. Both have been successfully integrated and benchmarked against the classical ML baseline.
        </p>
      </div>

      {/* Results comparison table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="glass-card overflow-x-auto p-4 mb-8">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Quantum vs Classical — Actual Results</h3>
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="px-3 py-2">Metric</th>
                <th className="px-3 py-2">Classical ML</th>
                <th className="px-3 py-2">Hybrid Quantum</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {quantumResults.map((row) => {
                const cfg = statusConfig[row.status] ?? statusConfig.Completed;
                const StatusIcon = cfg.icon;
                return (
                  <tr key={row.metric} className="border-b border-border/20">
                    <td className="px-3 py-2.5 text-foreground font-medium">{row.metric}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{row.classical}</td>
                    <td className="px-3 py-2.5 text-accent font-semibold">{row.quantum}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant="outline" className={`gap-1 text-[10px] ${cfg.className}`}>
                        <StatusIcon className="h-3 w-3" />
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Summary highlight */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="glass-card flex items-start gap-4 p-6">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" />
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Pipeline Complete</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The hybrid quantum approach achieved an MAE of <span className="text-accent font-medium">1.32</span> (vs 6.19 classical) and an R² of <span className="text-accent font-medium">0.21</span> (vs -8.08 classical), demonstrating significant improvement in binding affinity prediction using quantum-enhanced features.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default QuantumPage;
