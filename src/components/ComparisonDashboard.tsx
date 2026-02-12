import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ErrorBar,
} from "recharts";
import { GitCompare, ToggleRight } from "lucide-react";

const errorComparison = [
  { metric: "Energy MAE", classical: 0.42, quantum_ideal: 0.12, quantum_nisq: 0.28 },
  { metric: "Binding MAE", classical: 0.58, quantum_ideal: 0.18, quantum_nisq: 0.35 },
  { metric: "Stability RMSE", classical: 0.65, quantum_ideal: 0.22, quantum_nisq: 0.41 },
];

const scalability = Array.from({ length: 8 }, (_, i) => ({
  qubits: (i + 2) * 2,
  classical: 0.5 + i * 0.3 + i * i * 0.05,
  quantum: 0.3 + i * 0.15 + Math.random() * 0.1,
}));

const noiseImpact = Array.from({ length: 10 }, (_, i) => ({
  noise: (i * 0.1).toFixed(1),
  accuracy: 97 - i * i * 0.8 - Math.random() * 2,
  errorLow: 95 - i * i * 0.8 - 3,
  errorHigh: 99 - i * i * 0.8 + 1,
}));

const paramEfficiency = [
  { name: "RF", params: 500, accuracy: 89 },
  { name: "SVM", params: 200, accuracy: 86 },
  { name: "GB", params: 800, accuracy: 91 },
  { name: "NN", params: 12000, accuracy: 90 },
  { name: "VQE", params: 24, accuracy: 93 },
  { name: "QAOA", params: 16, accuracy: 91 },
];

const ComparisonDashboard = () => {
  const [noisy, setNoisy] = useState(false);

  return (
    <section id="comparison" className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-2 flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">Section 05</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Quantum vs Classical Comparison</h2>
          <p className="mt-2 text-sm text-muted-foreground">Performance analytics · Noise impact · Scalability</p>
        </motion.div>

        {/* Toggle */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => setNoisy(false)}
            className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${!noisy ? "bg-glow-success/20 text-glow-success" : "text-muted-foreground"}`}
          >
            Ideal Quantum
          </button>
          <button onClick={() => setNoisy(!noisy)} className="text-muted-foreground">
            <ToggleRight className={`h-6 w-6 transition-colors ${noisy ? "text-accent" : "text-muted-foreground"}`} />
          </button>
          <button
            onClick={() => setNoisy(true)}
            className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${noisy ? "bg-accent/20 text-accent" : "text-muted-foreground"}`}
          >
            NISQ Noisy
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Error comparison */}
          <div className="glass-card p-4">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Error Comparison (MAE / RMSE)</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={errorComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                <XAxis dataKey="metric" tick={{ fill: "#7a7a85", fontSize: 9 }} />
                <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
                <Bar dataKey="classical" fill="#7a7a85" name="Classical" radius={[3, 3, 0, 0]} />
                <Bar dataKey={noisy ? "quantum_nisq" : "quantum_ideal"} fill="#FF6B00" name="Quantum" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Scalability */}
          <div className="glass-card p-4">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Scalability (Time vs Qubits/Features)</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={scalability}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                <XAxis dataKey="qubits" tick={{ fill: "#7a7a85", fontSize: 10 }} />
                <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
                <Line type="monotone" dataKey="classical" stroke="#7a7a85" strokeWidth={2} dot={false} name="Classical" />
                <Line type="monotone" dataKey="quantum" stroke="#5B2C83" strokeWidth={2} dot={false} name="Quantum" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Noise impact */}
          <div className="glass-card p-4">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Accuracy Under Noise</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={noiseImpact}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                <XAxis dataKey="noise" tick={{ fill: "#7a7a85", fontSize: 10 }} label={{ value: "Noise Level", position: "insideBottom", offset: -5, fill: "#7a7a85", fontSize: 10 }} />
                <YAxis domain={[60, 100]} tick={{ fill: "#7a7a85", fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
                <Line type="monotone" dataKey="accuracy" stroke="#FF6B00" strokeWidth={2} dot={{ fill: "#FF6B00", r: 3 }} name="Quantum Accuracy" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Parameter efficiency */}
          <div className="glass-card p-4">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Parameter Efficiency</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={paramEfficiency} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                <XAxis type="number" tick={{ fill: "#7a7a85", fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fill: "#7a7a85", fontSize: 10 }} width={40} />
                <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
                <Bar dataKey="params" fill="hsl(270,50%,34%)" name="Parameters" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonDashboard;
