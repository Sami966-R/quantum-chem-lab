import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Atom, CheckCircle2, FlaskConical, Loader2, Trophy, ShieldCheck, ShieldAlert } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL || "https://dentoid-afflictively-maia.ngrok-free.dev";
const HEADERS = { "ngrok-skip-browser-warning": "true" };

interface ScreeningResult {
  rank: number;
  pdb_id: string;
  protein_type: string;
  predicted_pkd: number;
  stability: string;
}

interface ScreeningData {
  top_candidate: { pdb_id: string; pkd: number; stability: string };
  results: ScreeningResult[];
}

const ResultsDisplay = ({ screening }: { screening: ScreeningData }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5">
      <div className="flex items-center gap-3 mb-3">
        <Trophy className="h-5 w-5 text-emerald-400" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">Top Candidate</span>
      </div>
      <div className="flex items-center gap-6">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">PDB ID</p>
          <p className="font-mono text-lg font-bold text-foreground">{screening.top_candidate.pdb_id}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Predicted pKd</p>
          <p className="font-mono text-lg font-bold text-accent">{screening.top_candidate.pkd}</p>
        </div>
        <Badge variant="outline" className="gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          <ShieldCheck className="h-3 w-3" />
          {screening.top_candidate.stability}
        </Badge>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left font-mono text-xs">
        <thead>
          <tr className="border-b border-border/50 text-muted-foreground">
            <th className="px-3 py-2">Rank</th>
            <th className="px-3 py-2">PDB ID</th>
            <th className="px-3 py-2">Protein Type</th>
            <th className="px-3 py-2">Predicted pKd</th>
            <th className="px-3 py-2">Stability</th>
          </tr>
        </thead>
        <tbody>
          {screening.results.map((r) => {
            const isStable = r.stability?.toLowerCase() === "stable";
            return (
              <tr key={r.rank} className="border-b border-border/20">
                <td className="px-3 py-2.5 text-muted-foreground">{r.rank}</td>
                <td className="px-3 py-2.5 text-foreground font-medium">{r.pdb_id}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{r.protein_type}</td>
                <td className="px-3 py-2.5 text-accent font-semibold">{r.predicted_pkd}</td>
                <td className="px-3 py-2.5">
                  <Badge
                    variant="outline"
                    className={`gap-1 text-[10px] ${
                      isStable
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}
                  >
                    {isStable ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                    {r.stability}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </motion.div>
);

const QuantumPage = () => {
  const [comparisonData, setComparisonData] = useState<ScreeningData | null>(null);
  const [comparisonLoading, setComparisonLoading] = useState(true);
  const [comparisonError, setComparisonError] = useState<string | null>(null);

  const [screening, setScreening] = useState<ScreeningData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/quantum-dashboard/virtual-screening`, { headers: HEADERS });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setComparisonData(await res.json());
      } catch (e: any) {
        setComparisonError(e.message || "Failed to fetch");
      } finally {
        setComparisonLoading(false);
      }
    })();
  }, []);

  const runPrediction = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/quantum-dashboard/virtual-screening`, { headers: HEADERS });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setScreening(await res.json());
    } catch (e: any) {
      setError(e.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
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
            Classical ML vs Hybrid Quantum Model Performance — live virtual screening results
          </p>
        </motion.div>

        <div className="glass-card p-6 mb-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            The <span className="text-accent font-medium">Variational Quantum Eigensolver (VQE)</span> pipeline extracts HOMO-LUMO gap features, while the <span className="text-accent font-medium">FidelityQuantumKernel</span> replaces classical Euclidean distance for edge processing in the molecular graph neural network.
          </p>
        </div>

        {/* Live Comparison Data (replaces static table) */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="glass-card p-6 mb-8">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Virtual Screening — Live Results</h3>
            {comparisonLoading && (
              <div className="flex items-center justify-center py-8 gap-2 text-muted-foreground text-sm">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading screening data…
              </div>
            )}
            {comparisonError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs text-destructive font-mono">
                {comparisonError}
              </div>
            )}
            {comparisonData && !comparisonLoading && <ResultsDisplay screening={comparisonData} />}
          </div>
        </motion.div>

        {/* Summary highlight */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="glass-card flex items-start gap-4 p-6 mb-8">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" />
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Pipeline Complete</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The hybrid quantum approach demonstrates successful integration of VQE and FidelityQuantumKernel features into the molecular GNN, enabling quantum-enhanced virtual screening of protein-ligand complexes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Virtual Screening Demo */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FlaskConical className="h-4 w-4 text-accent" />
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Virtual Screening Demo</h3>
                </div>
                <p className="text-xs text-muted-foreground">Run the quantum-enhanced virtual screening pipeline on PDBbind candidates</p>
              </div>
              <Button onClick={runPrediction} disabled={loading} className="font-mono text-xs uppercase tracking-wider" size="sm">
                {loading ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Running...</> : "Run Prediction"}
              </Button>
            </div>

            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs text-destructive font-mono">
                {error}
              </div>
            )}

            {screening && !loading && <ResultsDisplay screening={screening} />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuantumPage;
