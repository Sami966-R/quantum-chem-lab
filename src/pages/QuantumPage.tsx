import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Atom, CheckCircle2, FlaskConical, Loader2, Trophy, ShieldCheck, ShieldAlert, Package, Radio } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import VirtualScreening from "@/components/VirtualScreening";

const API_URL = import.meta.env.VITE_API_URL || "https://dentoid-afflictively-maia.ngrok-free.dev";
const HEADERS = { "ngrok-skip-browser-warning": "true" };

const QuantumPage = () => {
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

        {/* Summary highlight */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
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
      </div>
    </div>
  );
};

export default QuantumPage;
