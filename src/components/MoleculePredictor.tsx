import { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const MoleculePredictor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMolecules = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/chembl?count=8`);
      const data = await res.json();
      setImage(`data:image/png;base64,${data.image}`);
    } catch (e) {
      console.error(e);
      setError("Could not connect to the API. Make sure the backend is running.");
    }
    setLoading(false);
  };

  return (
    <section className="section-gradient relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-2 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              ChEMBL Visualizer
            </span>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Molecule Predictor</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fetch and visualize molecules from the ChEMBL backend API
          </p>
        </motion.div>

        <div className="glass-card p-6 space-y-4">
          <button
            onClick={fetchMolecules}
            disabled={loading}
            className="rounded-md bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-accent-foreground transition-all glow-accent hover:brightness-110 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Loading...
              </>
            ) : (
              "Show Molecules"
            )}
          </button>

          {error && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 font-mono text-xs text-destructive">
              {error}
            </div>
          )}

          {image && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={image}
              alt="ChEMBL Molecules"
              className="mt-4 max-w-2xl rounded-md border border-border/30"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default MoleculePredictor;
