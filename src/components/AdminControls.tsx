import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Sliders } from "lucide-react";

const AdminControls = () => {
  const [datasetSize, setDatasetSize] = useState(5000);
  const [noiseLevel, setNoiseLevel] = useState(0.1);
  const [iterations, setIterations] = useState(100);
  const [quantumDepth, setQuantumDepth] = useState(6);
  const [features, setFeatures] = useState({
    mw: true, logP: true, hba: true, hbd: false, tpsa: true, rotBonds: false,
  });

  const sliders = [
    { label: "Dataset Size", value: datasetSize, set: setDatasetSize, min: 100, max: 10000, step: 100, unit: " samples" },
    { label: "Noise Injection", value: noiseLevel, set: setNoiseLevel, min: 0, max: 1, step: 0.01, unit: "" },
    { label: "Optimization Iterations", value: iterations, set: setIterations, min: 10, max: 500, step: 10, unit: "" },
    { label: "Quantum Circuit Depth", value: quantumDepth, set: setQuantumDepth, min: 1, max: 20, step: 1, unit: " layers" },
  ];

  return (
    <section id="controls" className="section-gradient relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-2 flex items-center gap-2">
            <Settings className="h-5 w-5 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">Section 08</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Research Controls</h2>
          <p className="mt-2 text-sm text-muted-foreground">Lab control panel · Parameter tuning · Feature selection</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sliders */}
          <div className="space-y-4">
            {sliders.map((s) => (
              <div key={s.label} className="glass-card p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{s.label}</span>
                  <span className="font-mono text-sm font-bold text-accent">
                    {typeof s.value === "number" && s.value % 1 !== 0 ? s.value.toFixed(2) : s.value}{s.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.value}
                  onChange={(e) => s.set(parseFloat(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="mt-1 flex justify-between font-mono text-[9px] text-muted-foreground">
                  <span>{s.min}</span>
                  <span>{s.max}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feature toggles */}
          <div className="glass-card p-4">
            <div className="mb-4 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Feature Selection</h4>
            </div>
            <div className="space-y-3">
              {Object.entries(features).map(([key, val]) => (
                <label key={key} className="flex cursor-pointer items-center justify-between rounded-md bg-muted/30 px-3 py-2.5 transition-colors hover:bg-muted/50">
                  <span className="font-mono text-xs text-foreground">
                    {key === "mw" ? "Molecular Weight" : key === "logP" ? "LogP" : key === "hba" ? "H-Bond Acceptors" : key === "hbd" ? "H-Bond Donors" : key === "tpsa" ? "TPSA" : "Rotatable Bonds"}
                  </span>
                  <div
                    onClick={() => setFeatures((f) => ({ ...f, [key]: !f[key as keyof typeof f] }))}
                    className={`h-5 w-9 rounded-full transition-colors ${val ? "bg-accent" : "bg-border"} relative cursor-pointer`}
                  >
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-transform ${val ? "translate-x-4" : "translate-x-0.5"}`} />
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-6 rounded-md border border-border/30 bg-muted/20 p-3">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Active Configuration</div>
              <div className="mt-2 font-mono text-xs text-foreground">
                {datasetSize} samples · {noiseLevel.toFixed(2)} noise · {iterations} iters · depth {quantumDepth} · {Object.values(features).filter(Boolean).length} features
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminControls;
