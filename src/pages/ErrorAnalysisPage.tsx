import { motion } from "framer-motion";
import { RefreshCw, Database, RotateCcw } from "lucide-react";
import Navigation from "@/components/Navigation";
import ErrorAnalysis from "@/components/ErrorAnalysis";

const ErrorAnalysisPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <div className="pt-16">
      <ErrorAnalysis />

      {/* Research Controls */}
      <section className="section-gradient relative py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="text-3xl font-bold text-foreground">Research Controls</h2>
            <p className="mt-2 text-sm text-muted-foreground">Actions for model management (backend integration pending)</p>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            {[
              { icon: RotateCcw, label: "Retrain Models", desc: "Re-run training pipeline with current parameters" },
              { icon: Database, label: "Load Dataset", desc: "Import new dataset for analysis" },
              { icon: RefreshCw, label: "Refresh Results", desc: "Reload latest prediction results" },
            ].map((btn) => (
              <button
                key={btn.label}
                className="glass-card flex items-center gap-3 px-6 py-4 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <btn.icon className="h-5 w-5 text-accent" />
                <div className="text-left">
                  <div className="font-bold text-foreground">{btn.label}</div>
                  <div className="mt-0.5 normal-case tracking-normal text-muted-foreground">{btn.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default ErrorAnalysisPage;
