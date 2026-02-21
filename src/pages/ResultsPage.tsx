import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ScatterChart, Scatter, AreaChart, Area,
} from "recharts";
import { BarChart3 } from "lucide-react";
import Navigation from "@/components/Navigation";

const actualVsPredicted = Array.from({ length: 30 }, (_, i) => ({
  actual: -50 + i * 3 + (Math.random() - 0.5) * 2,
  predicted: -50 + i * 3 + (Math.random() - 0.5) * 5,
}));

const modelComparison = [
  { name: "Linear Reg", rmse: 0.72, mae: 0.58, r2: 0.78 },
  { name: "Random Forest", rmse: 0.48, mae: 0.35, r2: 0.89 },
  { name: "SVM", rmse: 0.55, mae: 0.42, r2: 0.85 },
  { name: "Gradient Boost", rmse: 0.42, mae: 0.31, r2: 0.92 },
];

const errorDist = Array.from({ length: 20 }, (_, i) => ({
  bin: ((-2 + i * 0.2)).toFixed(1),
  count: Math.floor(Math.exp(-((i - 10) ** 2) / 8) * 40 + Math.random() * 5),
}));

const trainingLoss = Array.from({ length: 20 }, (_, i) => ({
  epoch: i + 1,
  trainLoss: 2.5 * Math.exp(-i * 0.2) + 0.1 + Math.random() * 0.05,
  valLoss: 2.8 * Math.exp(-i * 0.18) + 0.15 + Math.random() * 0.08,
}));

const ResultsPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <div className="container mx-auto px-4 pt-24 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="mb-2 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">Results Visualization</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Results Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Placeholder graphs ready for JSON data integration from Colab notebooks</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Actual vs Predicted */}
        <div className="glass-card p-4">
          <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Actual vs Predicted Values</h4>
          <ResponsiveContainer width="100%" height={260}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
              <XAxis dataKey="actual" name="Actual" tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <YAxis dataKey="predicted" name="Predicted" tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
              <Scatter data={actualVsPredicted} fill="#FF6B00" fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Model Comparison */}
        <div className="glass-card p-4">
          <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Model Comparison (R² Score)</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={modelComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
              <XAxis dataKey="name" tick={{ fill: "#7a7a85", fontSize: 9 }} />
              <YAxis domain={[0.5, 1]} tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
              <Bar dataKey="r2" fill="hsl(270,50%,34%)" name="R² Score" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Error Distribution */}
        <div className="glass-card p-4">
          <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Error Distribution</h4>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={errorDist}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
              <XAxis dataKey="bin" tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
              <Area type="monotone" dataKey="count" stroke="#FF6B00" fill="hsl(25,100%,50%)" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Training Loss */}
        <div className="glass-card p-4">
          <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Training & Validation Loss</h4>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trainingLoss}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
              <XAxis dataKey="epoch" tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
              <Line type="monotone" dataKey="trainLoss" stroke="#5B2C83" strokeWidth={2} dot={false} name="Training Loss" />
              <Line type="monotone" dataKey="valLoss" stroke="#FF6B00" strokeWidth={2} dot={false} name="Validation Loss" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

export default ResultsPage;
