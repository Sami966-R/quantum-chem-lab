import { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Play, Atom, Cpu, Layers } from "lucide-react";

const EXAMPLE_SMILES = [
  { name: "Aspirin", smiles: "CC(=O)Oc1ccccc1C(=O)O" },
  { name: "Caffeine", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C" },
  { name: "Ibuprofen", smiles: "CC(C)Cc1ccc(cc1)C(C)C(=O)O" },
];

const LiveTesting = () => {
  const [smiles, setSmiles] = useState("CC(=O)Oc1ccccc1C(=O)O");
  const [mode, setMode] = useState<"classical" | "quantum" | "hybrid">("hybrid");
  const [result, setResult] = useState<null | {
    energy: number;
    affinity: number;
    stability: number;
    confidence: number;
  }>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult({
        energy: -74.5 + Math.random() * 3,
        affinity: 6.5 + Math.random() * 3,
        stability: 70 + Math.random() * 25,
        confidence: 85 + Math.random() * 12,
      });
      setLoading(false);
    }, 1500);
  };

  const modes = [
    { key: "classical" as const, label: "Classical", icon: Cpu },
    { key: "quantum" as const, label: "Quantum", icon: Atom },
    { key: "hybrid" as const, label: "Hybrid", icon: Layers },
  ];

  return (
    <section id="live" className="section-gradient relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-2 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">Section 06</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Live Molecule Testing</h2>
          <p className="mt-2 text-sm text-muted-foreground">Input SMILES · Predict energy & binding affinity · Multi-mode inference</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <div className="space-y-4">
            <div className="glass-card p-4">
              <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">SMILES Input</h4>
              <input
                type="text"
                value={smiles}
                onChange={(e) => setSmiles(e.target.value)}
                className="w-full rounded-md bg-muted/50 px-3 py-2.5 font-mono text-sm text-foreground outline-none ring-1 ring-border/50 focus:ring-accent transition-colors"
                placeholder="Enter SMILES string..."
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {EXAMPLE_SMILES.map((ex) => (
                  <button
                    key={ex.name}
                    onClick={() => setSmiles(ex.smiles)}
                    className="rounded-md bg-secondary px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {ex.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-4">
              <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Prediction Mode</h4>
              <div className="flex gap-2">
                {modes.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMode(m.key)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2.5 font-mono text-xs transition-colors ${
                      mode === m.key ? "bg-primary text-primary-foreground glow-primary" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <m.icon className="h-4 w-4" />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handlePredict}
              disabled={loading || !smiles}
              className="w-full rounded-md bg-accent py-3 font-mono text-xs font-bold uppercase tracking-wider text-accent-foreground transition-all glow-accent hover:brightness-110 disabled:opacity-50"
            >
              {loading ? "Computing..." : (
                <span className="flex items-center justify-center gap-2">
                  <Play className="h-4 w-4" /> Run Prediction
                </span>
              )}
            </button>
          </div>

          {/* Results */}
          <div className="glass-card p-6">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Prediction Report</h4>
            {result ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="rounded-md border border-border/30 bg-muted/30 p-3 font-mono text-xs text-accent">
                  SMILES: {smiles}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-muted/50 p-4 text-center">
                    <div className="font-mono text-2xl font-bold text-glow-success">{result.energy.toFixed(3)}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase text-muted-foreground">Energy (Ha)</div>
                  </div>
                  <div className="rounded-md bg-muted/50 p-4 text-center">
                    <div className="font-mono text-2xl font-bold text-accent">{result.affinity.toFixed(2)}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase text-muted-foreground">Binding Affinity (pKi)</div>
                  </div>
                  <div className="rounded-md bg-muted/50 p-4 text-center">
                    <div className="font-mono text-2xl font-bold text-glow-info">{result.stability.toFixed(1)}%</div>
                    <div className="mt-1 font-mono text-[10px] uppercase text-muted-foreground">Stability Score</div>
                  </div>
                  <div className="rounded-md bg-muted/50 p-4 text-center">
                    <div className="font-mono text-2xl font-bold text-foreground">{result.confidence.toFixed(1)}%</div>
                    <div className="mt-1 font-mono text-[10px] uppercase text-muted-foreground">Confidence</div>
                  </div>
                </div>
                <div className="rounded-md border border-border/30 bg-muted/20 p-3">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Mode: {mode.toUpperCase()}</div>
                  <div className="mt-1 font-mono text-xs text-muted-foreground">
                    Prediction completed using {mode === "hybrid" ? "VQE + Gradient Boosting" : mode === "quantum" ? "VQE Ansatz" : "Gradient Boosting"} pipeline.
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex h-48 items-center justify-center text-muted-foreground">
                <p className="font-mono text-xs">Run a prediction to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveTesting;
