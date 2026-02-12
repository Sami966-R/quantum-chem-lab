import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line,
} from "recharts";
import { Brain, TrendingUp } from "lucide-react";

const models = [
  { name: "Random Forest", train: 94.2, test: 89.1, mae: 0.42, rmse: 0.58, r2: 0.89 },
  { name: "SVM", train: 91.8, test: 86.3, mae: 0.51, rmse: 0.67, r2: 0.85 },
  { name: "Gradient Boost", train: 96.1, test: 91.4, mae: 0.35, rmse: 0.48, r2: 0.92 },
  { name: "Neural Network", train: 97.3, test: 90.8, mae: 0.38, rmse: 0.52, r2: 0.91 },
];

const radarData = [
  { metric: "Accuracy", RF: 89, SVM: 86, GB: 91, NN: 90 },
  { metric: "Precision", RF: 87, SVM: 84, GB: 90, NN: 89 },
  { metric: "Recall", RF: 85, SVM: 82, GB: 88, NN: 91 },
  { metric: "F1-Score", RF: 86, SVM: 83, GB: 89, NN: 90 },
  { metric: "Speed", RF: 92, SVM: 78, GB: 85, NN: 70 },
];

const learningCurve = Array.from({ length: 10 }, (_, i) => ({
  samples: (i + 1) * 500,
  train: 100 - 6 * Math.exp(-i * 0.5),
  val: 100 - 12 * Math.exp(-i * 0.4) - Math.random() * 2,
}));

const MLBenchmark = () => (
  <section id="ml" className="section-gradient relative py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="mb-2 flex items-center gap-2">
          <Brain className="h-5 w-5 text-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">Section 04</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground">Classical ML Benchmarking</h2>
        <p className="mt-2 text-sm text-muted-foreground">Random Forest · SVM · Gradient Boosting · Neural Network</p>
      </motion.div>

      {/* Model cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {models.map((m) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-4"
          >
            <h4 className="mb-3 font-mono text-xs font-bold text-foreground">{m.name}</h4>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Train Acc</span>
                <span className="text-glow-success">{m.train}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Test Acc</span>
                <span className="text-foreground">{m.test}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">MAE</span>
                <span className="text-foreground">{m.mae}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">RMSE</span>
                <span className="text-foreground">{m.rmse}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">R²</span>
                <span className="text-accent">{m.r2}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Accuracy comparison */}
        <div className="glass-card p-4">
          <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Accuracy Comparison</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={models}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
              <XAxis dataKey="name" tick={{ fill: "#7a7a85", fontSize: 9 }} />
              <YAxis domain={[80, 100]} tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
              <Bar dataKey="train" fill="hsl(270,50%,34%)" name="Train" radius={[3, 3, 0, 0]} />
              <Bar dataKey="test" fill="#FF6B00" name="Test" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart */}
        <div className="glass-card p-4">
          <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Model Comparison Radar</h4>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(260,30%,22%)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <PolarRadiusAxis domain={[60, 100]} tick={{ fill: "#7a7a85", fontSize: 8 }} />
              <Radar name="Gradient Boost" dataKey="GB" stroke="#FF6B00" fill="#FF6B00" fillOpacity={0.2} />
              <Radar name="Neural Network" dataKey="NN" stroke="#5B2C83" fill="#5B2C83" fillOpacity={0.2} />
              <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Learning curve */}
        <div className="glass-card p-4 lg:col-span-2">
          <h4 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="h-4 w-4" /> Learning Curve — Gradient Boosting
          </h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={learningCurve}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
              <XAxis dataKey="samples" tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <YAxis domain={[70, 100]} tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
              <Line type="monotone" dataKey="train" stroke="#5B2C83" strokeWidth={2} dot={false} name="Training" />
              <Line type="monotone" dataKey="val" stroke="#FF6B00" strokeWidth={2} dot={false} name="Validation" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </section>
);

export default MLBenchmark;
