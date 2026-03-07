import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Loader2, Play, Pause } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const PAGES = ["ChEMBL", "Predictions", "PBDBind"] as const;

interface ChemblMol {
  image?: string;
  chembl_id?: string;
  canonical_smiles?: string;
}

interface PdbbindLig {
  image?: string;
  pdb_id?: string;
  resolution?: string;
  binding_affinity?: number;
}

interface Prediction {
  name?: string;
  smiles?: string;
  predicted_pKd?: number;
}

const MoleculePredictor = () => {
  const [chemblMols, setChemblMols] = useState<ChemblMol[]>([]);
  const [pdbbindMols, setPdbbindMols] = useState<PdbbindLig[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChEMBL = async () => {
    try {
      const res = await fetch(`${API_URL}/chembl?count=6`);
      const data = await res.json();
      setChemblMols(data.molecules || []);
      setError(null);
    } catch (e) {
      console.error("ChEMBL fetch error:", e);
      setError("Could not connect to the API. Make sure the backend is running.");
    }
  };

  const fetchPDBbind = async () => {
    try {
      const res = await fetch(`${API_URL}/pdbbind?count=6`);
      const data = await res.json();
      setPdbbindMols(data.ligands || []);
      setError(null);
    } catch (e) {
      console.error("PBDBind fetch error:", e);
      setError("Could not connect to the API. Make sure the backend is running.");
    }
  };

  const fetchPredictions = async () => {
    try {
      const smiles_list = [
        "CC(=O)Oc1ccccc1C(=O)O",
        "CN1C=NC2=C1C(=O)N(C(=O)N2C)C",
        "CC(C)Cc1ccc(cc1)C(C)C(=O)O",
        "CC(C)CC(CC(=O)O)N",
        "c1ccccc1",
        "CCO",
      ];
      const res = await fetch(`${API_URL}/batch-predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ smiles_list }),
      });
      const data = await res.json();
      setPredictions(data.predictions || []);
      setError(null);
    } catch (e) {
      console.error("Predictions fetch error:", e);
      setError("Could not connect to the API. Make sure the backend is running.");
    }
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % PAGES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  useEffect(() => {
    setLoading(true);
    const page = PAGES[currentPage];
    const fetcher =
      page === "ChEMBL" ? fetchChEMBL : page === "PBDBind" ? fetchPDBbind : fetchPredictions;
    fetcher().then(() => setLoading(false));
  }, [currentPage]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-mono text-sm">Loading data from backend...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 font-mono text-xs text-destructive">
          {error}
        </div>
      );
    }

    switch (PAGES[currentPage]) {
      case "ChEMBL":
        return (
          <div>
            <h3 className="mb-6 font-mono text-lg font-bold text-foreground">ChEMBL Molecules (Real Data)</h3>
            {chemblMols.length === 0 ? (
              <p className="text-sm text-muted-foreground">No molecules loaded</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {chemblMols.map((mol, idx) => (
                  <div key={idx} className="glass-card overflow-hidden p-4 transition-shadow hover:shadow-lg">
                    {mol.image && (
                      <img
                        src={`data:image/png;base64,${mol.image}`}
                        alt="molecule"
                        className="mb-3 h-40 w-full rounded bg-secondary object-contain"
                      />
                    )}
                    <p className="break-all font-mono text-xs font-semibold text-accent">
                      {mol.chembl_id || "Unknown"}
                    </p>
                    <p className="mt-1 break-all font-mono text-[10px] text-muted-foreground">
                      {mol.canonical_smiles?.substring(0, 30)}...
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "Predictions":
        return (
          <div>
            <h3 className="mb-6 font-mono text-lg font-bold text-foreground">Binding Affinity Predictions (Real Data)</h3>
            {predictions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No predictions available</p>
            ) : (
              <div className="space-y-3">
                {predictions.map((pred, idx) => (
                  <div key={idx} className="glass-card flex items-center justify-between p-4">
                    <div>
                      <p className="font-mono text-sm font-bold text-foreground">
                        {pred.name || `Molecule ${idx + 1}`}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground">{pred.smiles}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-2xl font-bold text-accent">
                        {pred.predicted_pKd?.toFixed(3)}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground">pKd/pKi</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "PBDBind":
        return (
          <div>
            <h3 className="mb-6 font-mono text-lg font-bold text-foreground">PBDBind Protein-Ligand Complexes (Real Data)</h3>
            {pdbbindMols.length === 0 ? (
              <p className="text-sm text-muted-foreground">No ligands loaded</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {pdbbindMols.map((lig, idx) => (
                  <div key={idx} className="glass-card overflow-hidden p-4 transition-shadow hover:shadow-lg">
                    {lig.image && (
                      <img
                        src={`data:image/png;base64,${lig.image}`}
                        alt="ligand"
                        className="mb-3 h-40 w-full rounded bg-secondary object-contain"
                      />
                    )}
                    <div className="space-y-1">
                      <p className="font-mono text-sm font-bold text-accent">{lig.pdb_id}</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        <span className="text-foreground">Resolution:</span> {lig.resolution || "N/A"} Å
                      </p>
                      {lig.binding_affinity && (
                        <p className="font-mono text-xs text-muted-foreground">
                          <span className="text-foreground">Affinity:</span> {lig.binding_affinity} pKd
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
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
              Live Backend Data
            </span>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Molecular Binding Affinity</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Live data from your FastAPI backend · Auto-rotates every 10 seconds
          </p>
        </motion.div>

        {/* Page Controls */}
        <div className="mb-6 flex items-center justify-between rounded-lg border border-border/50 bg-secondary/50 p-3">
          <div className="flex gap-2">
            {PAGES.map((page, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentPage(idx);
                  setAutoPlay(false);
                }}
                className={`rounded-md px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                  currentPage === idx
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`flex items-center gap-1.5 rounded-md px-4 py-2 font-mono text-xs font-semibold transition-colors ${
              autoPlay
                ? "bg-accent text-accent-foreground glow-accent"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {autoPlay ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            {autoPlay ? "Auto (10s)" : "Paused"}
          </button>
        </div>

        {/* Content */}
        <div className="glass-card min-h-[24rem] p-8">{renderContent()}</div>

        {/* Footer */}
        <div className="mt-4 text-center font-mono text-[10px] text-muted-foreground">
          <p>
            Page {currentPage + 1}/{PAGES.length} · Backend: {API_URL}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MoleculePredictor;
