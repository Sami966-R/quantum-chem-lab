import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, LineChart, Line, AreaChart, Area,
} from "recharts";
import { Database, Filter, FlaskConical } from "lucide-react";

const chemblData = [
  { smiles: "CC(=O)Oc1ccccc1C(=O)O", mw: 180.16, logP: 1.2, activity: 7.8 },
  { smiles: "c1ccc2c(c1)cc1ccc3cccc4ccc2c1c34", mw: 228.29, logP: 4.5, activity: 5.2 },
  { smiles: "CC(C)Cc1ccc(cc1)C(C)C(=O)O", mw: 206.28, logP: 3.5, activity: 6.1 },
  { smiles: "O=C(O)c1cc(O)c(O)c(O)c1", mw: 170.12, logP: 0.7, activity: 8.3 },
  { smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C", mw: 194.19, logP: -0.07, activity: 4.9 },
  { smiles: "CC12CCC3C(C1CCC2O)CCC4=CC(=O)CCC34C", mw: 288.42, logP: 3.9, activity: 7.1 },
];

const mwDist = [
  { range: "100-150", count: 12 }, { range: "150-200", count: 28 },
  { range: "200-250", count: 35 }, { range: "250-300", count: 22 },
  { range: "300-350", count: 18 }, { range: "350-400", count: 8 },
  { range: "400-500", count: 5 },
];

const energyDist = Array.from({ length: 20 }, (_, i) => ({
  energy: (-50 + i * 5).toFixed(1),
  count: Math.floor(Math.random() * 40 + 10),
  density: Math.exp(-((i - 10) ** 2) / 20) * 50,
}));

const correlationData = Array.from({ length: 40 }, () => ({
  mw: Math.random() * 300 + 100,
  logP: Math.random() * 6 - 1,
  activity: Math.random() * 10,
}));

const DatasetLab = () => {
  const [activeTab, setActiveTab] = useState<"chembl" | "qm7">("chembl");

  return (
    <section id="dataset" className="section-gradient relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-2 flex items-center gap-2">
            <Database className="h-5 w-5 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">Section 02</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Dataset Laboratory</h2>
          <p className="mt-2 text-sm text-muted-foreground">ChEMBL & QM7 datasets · Interactive exploration & visualization</p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          {(["chembl", "qm7"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`rounded-md px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                activeTab === t ? "bg-primary text-primary-foreground glow-primary" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "chembl" ? "ChEMBL Dataset" : "QM7 Dataset"}
            </button>
          ))}
        </div>

        {activeTab === "chembl" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Compounds", value: "1,879,206" },
                { label: "Assays", value: "1,583,375" },
                { label: "Targets", value: "15,328" },
                { label: "Avg MW", value: "371.8 Da" },
              ].map((s) => (
                <div key={s.label} className="glass-card p-4 text-center">
                  <div className="font-mono text-lg font-bold text-accent">{s.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="glass-card overflow-x-auto p-4">
              <div className="mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground">Sample Compounds</span>
              </div>
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-border/50 text-muted-foreground">
                    <th className="px-3 py-2">SMILES</th>
                    <th className="px-3 py-2">MW (Da)</th>
                    <th className="px-3 py-2">LogP</th>
                    <th className="px-3 py-2">pActivity</th>
                  </tr>
                </thead>
                <tbody>
                  {chemblData.map((r, i) => (
                    <tr key={i} className="border-b border-border/20 hover:bg-secondary/50 transition-colors">
                      <td className="max-w-[200px] truncate px-3 py-2 text-accent">{r.smiles}</td>
                      <td className="px-3 py-2 text-foreground">{r.mw}</td>
                      <td className="px-3 py-2 text-foreground">{r.logP}</td>
                      <td className="px-3 py-2 text-foreground">{r.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="glass-card p-4">
                <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Molecular Weight Distribution</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={mwDist}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                    <XAxis dataKey="range" tick={{ fill: "#7a7a85", fontSize: 10 }} />
                    <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} />
                    <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
                    <Bar dataKey="count" fill="hsl(270,50%,34%)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card p-4">
                <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">MW vs LogP Correlation</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                    <XAxis dataKey="mw" name="MW" tick={{ fill: "#7a7a85", fontSize: 10 }} />
                    <YAxis dataKey="logP" name="LogP" tick={{ fill: "#7a7a85", fontSize: 10 }} />
                    <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
                    <Scatter data={correlationData} fill="#FF6B00" fillOpacity={0.6} />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "qm7" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Molecules", value: "7,165" },
                { label: "Max Atoms", value: "23" },
                { label: "Properties", value: "Atomization E" },
                { label: "Representation", value: "Coulomb Matrix" },
              ].map((s) => (
                <div key={s.label} className="glass-card p-4 text-center">
                  <div className="font-mono text-lg font-bold text-glow-info">{s.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="glass-card p-4">
              <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Atomization Energy Distribution</h4>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={energyDist}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                  <XAxis dataKey="energy" tick={{ fill: "#7a7a85", fontSize: 10 }} label={{ value: "Energy (kcal/mol)", position: "insideBottom", offset: -5, fill: "#7a7a85", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: "hsl(240,24%,10%)", border: "1px solid hsl(260,30%,22%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
                  <Area type="monotone" dataKey="density" stroke="#5B2C83" fill="hsl(270,50%,34%)" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="count" stroke="#FF6B00" fill="hsl(25,100%,50%)" fillOpacity={0.15} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DatasetLab;
