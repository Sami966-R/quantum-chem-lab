import { motion } from "framer-motion";
import { BookOpen, Target, Atom } from "lucide-react";
import Navigation from "@/components/Navigation";

const Overview = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <div className="container mx-auto px-4 pt-24 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="mb-2 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">Research Overview</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground">Research Overview</h1>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Problem Statement */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Atom className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold text-foreground">Problem Statement</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Drug discovery is a time-consuming and computationally expensive process that can take over a decade and cost billions of dollars. Traditional computational chemistry methods struggle to accurately model molecular properties at the quantum level, limiting the efficiency of virtual screening and lead optimization.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This project uses <span className="text-accent font-medium">machine learning</span> to predict molecular properties using real scientific datasets, bridging the gap between computational cost and prediction accuracy. By leveraging classical ML models and preparing a framework for quantum computing integration, we aim to accelerate the drug discovery pipeline.
          </p>
        </motion.div>

        {/* Objectives */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold text-foreground">Research Objectives</h2>
          </div>
          <ul className="space-y-3">
            {[
              "Train classical ML models (Random Forest, SVM, Gradient Boosting, Neural Networks) on molecular datasets for property prediction",
              "Compare model performance using rigorous evaluation metrics (RMSE, MAE, R² Score)",
              "Enable molecule property prediction via an interactive testing interface",
              "Prepare a modular framework for future quantum computing integration using VQE and QAOA algorithms",
              "Validate predictions against established benchmark datasets (QM7 & ChEMBL)",
            ].map((obj, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 font-mono text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Methodology */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 glass-card p-6">
        <h2 className="mb-4 text-xl font-bold text-foreground">Methodology Overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: "01", title: "Data Collection", desc: "Gather molecular data from QM7 and ChEMBL benchmark datasets" },
            { step: "02", title: "Feature Engineering", desc: "Extract molecular descriptors, fingerprints, and Coulomb matrices" },
            { step: "03", title: "Model Training", desc: "Train and optimize classical ML models with cross-validation" },
            { step: "04", title: "Evaluation", desc: "Compare models and prepare quantum-ready framework" },
          ].map((m) => (
            <div key={m.step} className="rounded-md bg-muted/30 p-4">
              <div className="mb-2 font-mono text-2xl font-bold text-accent">{m.step}</div>
              <div className="mb-1 font-mono text-xs font-bold uppercase tracking-wider text-foreground">{m.title}</div>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default Overview;
