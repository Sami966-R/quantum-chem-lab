import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from "recharts";
import { AlertTriangle } from "lucide-react";

const monteCarlo = Array.from({ length: 50 }, (_, i) => ({
  sample: i + 1,
  energy: -75.5 + (Math.random() - 0.5) * 1.5,
  mean: -75.5,
  upper: -74.7,
  lower: -76.3,
}));

const noiseImpact = Array.from({ length: 12 }, (_, i) => ({
  noise: (i * 0.05).toFixed(2),
  variance: 0.01 + i * i * 0.003 + Math.random() * 0.005,
}));

const ErrorAnalysis = () => (
  <section id="analysis" className="relative py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">Section 07</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground">Error &amp; Uncertainty Analysis</h2>
        <p className="mt-2 text-sm text-muted-foreground">Monte Carlo simulation · Uncertainty propagation · Noise impact</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-4">
          <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Monte Carlo Energy Sampling</h4>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monteCarlo}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
              <XAxis dataKey="sample" tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <YAxis domain={[-77, -74]} tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
              <Line type="monotone" dataKey="upper" stroke="#FF6B00" strokeDasharray="4 4" dot={false} strokeWidth={1} name="Upper CI" />
              <Line type="monotone" dataKey="lower" stroke="#FF6B00" strokeDasharray="4 4" dot={false} strokeWidth={1} name="Lower CI" />
              <Line type="monotone" dataKey="mean" stroke="#5B2C83" strokeDasharray="8 4" dot={false} strokeWidth={1} name="Mean" />
              <Line type="monotone" dataKey="energy" stroke="#39b68a" strokeWidth={1.5} dot={{ fill: "#39b68a", r: 2 }} name="Sample" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-4">
          <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Measurement Variance vs Noise</h4>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={noiseImpact}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
              <XAxis dataKey="noise" tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
              <Area type="monotone" dataKey="variance" stroke="#FF6B00" fill="hsl(25,100%,50%)" fillOpacity={0.15} strokeWidth={2} name="Variance" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </section>
);

export default ErrorAnalysis;
