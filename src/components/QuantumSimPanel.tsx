import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Atom, Zap, Activity, Gauge } from "lucide-react";

const generateConvergence = (noise: number) =>
  Array.from({ length: 30 }, (_, i) => ({
    iter: i + 1,
    energy: -75.5 + 8 * Math.exp(-i * 0.15) + (Math.random() - 0.5) * noise * 2,
    exact: -75.5,
  }));

const QuantumSimPanel = () => {
  const [molecule, setMolecule] = useState("H₂O");
  const [noise, setNoise] = useState(0.1);
  const [running, setRunning] = useState(false);
  const [data, setData] = useState(generateConvergence(0.1));
  const [activeAlg, setActiveAlg] = useState<"vqe" | "qaoa">("vqe");

  useEffect(() => {
    setData(generateConvergence(noise));
  }, [noise]);

  const handleRun = () => {
    setRunning(true);
    setData([]);
    const full = generateConvergence(noise);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= full.length) {
        clearInterval(interval);
        setRunning(false);
        return;
      }
      setData((prev) => [...prev, full[i]]);
      i++;
    }, 100);
  };

  const molecules = ["H₂", "H₂O", "LiH", "BeH₂", "CH₄"];

  return (
    <section id="quantum" className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-2 flex items-center gap-2">
            <Atom className="h-5 w-5 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">Section 03</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Quantum Algorithm Simulation</h2>
          <p className="mt-2 text-sm text-muted-foreground">VQE & QAOA modules · Real-time convergence · NISQ noise modeling</p>
        </motion.div>

        {/* Algorithm tabs */}
        <div className="mb-6 flex gap-2">
          {(["vqe", "qaoa"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveAlg(t)}
              className={`rounded-md px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                activeAlg === t ? "bg-accent text-accent-foreground glow-accent" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "vqe" ? "VQE Module" : "QAOA Module"}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Controls */}
          <div className="space-y-4">
            <div className="glass-card p-4">
              <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Molecule Selection</h4>
              <div className="flex flex-wrap gap-2">
                {molecules.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMolecule(m)}
                    className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                      molecule === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-4">
              <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">NISQ Noise Level</h4>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={noise}
                onChange={(e) => setNoise(parseFloat(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>Ideal (0.0)</span>
                <span className="text-accent">{noise.toFixed(2)}</span>
                <span>Noisy (1.0)</span>
              </div>
            </div>

            <div className="glass-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">Circuit Depth</span>
                <span className="font-mono text-sm text-foreground">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">Gate Count</span>
                <span className="font-mono text-sm text-foreground">48</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">Parameters</span>
                <span className="font-mono text-sm text-foreground">24</span>
              </div>
            </div>

            <button
              onClick={handleRun}
              disabled={running}
              className="w-full rounded-md bg-accent py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-accent-foreground transition-all glow-accent hover:brightness-110 disabled:opacity-50"
            >
              {running ? (
                <span className="flex items-center justify-center gap-2">
                  <Activity className="h-4 w-4 animate-pulse" /> Running...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Zap className="h-4 w-4" /> Run Simulation
                </span>
              )}
            </button>
          </div>

          {/* Convergence chart */}
          <div className="glass-card p-4 lg:col-span-2">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {activeAlg === "vqe" ? "VQE Energy Convergence" : "QAOA Cost Optimization"} — {molecule}
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                <XAxis dataKey="iter" tick={{ fill: "#7a7a85", fontSize: 10 }} label={{ value: "Iteration", position: "insideBottom", offset: -5, fill: "#7a7a85", fontSize: 10 }} />
                <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} label={{ value: "Energy (Ha)", angle: -90, position: "insideLeft", fill: "#7a7a85", fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
                <Line type="monotone" dataKey="exact" stroke="#FF6B00" strokeDasharray="5 5" dot={false} strokeWidth={1} name="Exact" />
                <Line type="monotone" dataKey="energy" stroke="#5B2C83" strokeWidth={2} dot={false} name="VQE Energy" />
              </LineChart>
            </ResponsiveContainer>

            {/* Results */}
            {data.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-md bg-muted/50 p-3 text-center">
                  <div className="font-mono text-lg font-bold text-glow-success">{data.length > 0 ? data[data.length - 1].energy.toFixed(4) : "—"}</div>
                  <div className="font-mono text-[10px] uppercase text-muted-foreground">Ground State (Ha)</div>
                </div>
                <div className="rounded-md bg-muted/50 p-3 text-center">
                  <div className="font-mono text-lg font-bold text-accent">{data.length > 0 ? Math.abs(data[data.length - 1].energy - (-75.5)).toFixed(4) : "—"}</div>
                  <div className="font-mono text-[10px] uppercase text-muted-foreground">Error (Ha)</div>
                </div>
                <div className="rounded-md bg-muted/50 p-3 text-center">
                  <div className="font-mono text-lg font-bold text-foreground">{data.length}</div>
                  <div className="font-mono text-[10px] uppercase text-muted-foreground">Iterations</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuantumSimPanel;
