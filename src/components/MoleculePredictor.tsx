import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "https://fastapi-backend-3-wqvz.onrender.com";
const PAGES = ["ChEMBL", "Predictions", "PBDBind"] as const;

interface ChemblMol {
  chembl_id: string;
  smiles: string;
  image: string;
}

interface PdbbindEntry {
  pdb_id: string;
  smiles?: string;
  image?: string;
  resolution?: string | number;
  binding_affinity?: number;
}

interface Prediction {
  name?: string;
  smiles: string;
  affinity?: number;
  energy?: number;
  stability_score?: number;
  confidence?: number;
  mode?: string;
}

const MoleculePredictor = () => {
  const [chemblMols, setChemblMols] = useState<ChemblMol[]>([]);
  const [pdbbindEntries, setPdbbindEntries] = useState<PdbbindEntry[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchChEMBL = async () => {
    try {
      const res = await fetch(`${API_URL}/chembl?count=12`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // Direct array response
      setChemblMols(Array.isArray(data) ? data : []);
      setError(null);
    } catch (e: any) {
      console.error("ChEMBL fetch error:", e);
      setError(e.message || "Could not connect to the API.");
    }
  };

  const fetchPDBbind = async () => {
    try {
      const res = await fetch(`${API_URL}/pdbbind?count=12`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // Direct array response
      setPdbbindEntries(Array.isArray(data) ? data : []);
      setError(null);
    } catch (e: any) {
      console.error("PBDBind fetch error:", e);
      setError(e.message || "Could not connect to the API.");
    }
  };

  const fetchPredictions = async () => {
    try {
      const moleculeList = [
        { name: "Aspirin", smiles: "CC(=O)Oc1ccccc1C(=O)O" },
        { name: "Caffeine", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C" },
        { name: "Ibuprofen", smiles: "CC(C)Cc1ccc(cc1)C(C)C(=O)O" },
        { name: "Leucine", smiles: "CC(C)CC(CC(=O)O)N" },
        { name: "Benzene", smiles: "c1ccccc1" },
        { name: "Ethanol", smiles: "CCO" },
      ];

      // Run individual /predict requests in parallel — backend's batch endpoint expects different schema
      const results = await Promise.all(
        moleculeList.map(async (mol) => {
          try {
            const res = await fetch(`${API_URL}/predict`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
              },
              body: JSON.stringify({ smiles: mol.smiles, mode: "Hybrid" }),
            });
            if (!res.ok) return null;
            const data = await res.json();
            return {
              name: mol.name,
              smiles: mol.smiles,
              affinity: data.affinity,
              energy: data.energy,
              stability_score: data.stability_score,
              confidence: data.confidence,
              mode: data.mode,
            } as Prediction;
          } catch {
            return null;
          }
        })
      );

      setPredictions(results.filter((r): r is Prediction => r !== null));
      setError(null);
    } catch (e: any) {
      console.error("Predictions fetch error:", e);
      setError(e.message || "Could not connect to the API.");
    }
  };

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
            <h3 className="mb-6 font-mono text-lg font-bold text-foreground">
              ChEMBL Molecules ({chemblMols.length})
            </h3>
            {chemblMols.length === 0 ? (
              <p className="text-sm text-muted-foreground">No molecule data loaded</p>
            ) : (
              <div className="max-h-[32rem] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {chemblMols.map((mol) => (
                    <div
                      key={mol.chembl_id}
                      className="glass-card overflow-hidden p-3 transition-all hover:ring-1 hover:ring-accent/50"
                    >
                      {mol.image && (
                        <div className="rounded-md bg-white p-2">
                          <img
                            src={mol.image}
                            alt={mol.chembl_id}
                            className="mx-auto h-32 w-full object-contain"
                          />
                        </div>
                      )}
                      <p className="mt-2 truncate font-mono text-xs font-bold text-accent">
                        {mol.chembl_id}
                      </p>
                      <p className="truncate font-mono text-[10px] text-muted-foreground">
                        {mol.smiles}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "Predictions":
        return (
          <div>
            <h3 className="mb-6 font-mono text-lg font-bold text-foreground">
              Binding Affinity Predictions
            </h3>
            {predictions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No predictions available</p>
            ) : (
              <div className="space-y-3">
                {predictions.map((pred, idx) => (
                  <div key={idx} className="glass-card flex items-center justify-between p-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-sm font-bold text-foreground">
                        {pred.name || `Molecule ${idx + 1}`}
                      </p>
                      <p className="truncate font-mono text-[10px] text-muted-foreground">
                        {pred.smiles}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-mono text-2xl font-bold text-accent">
                        {pred.predicted_pKd?.toFixed(3) ?? "—"}
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
            <h3 className="mb-6 font-mono text-lg font-bold text-foreground">
              PDBbind Protein-Ligand Complexes ({pdbbindEntries.length})
            </h3>
            {pdbbindEntries.length === 0 ? (
              <p className="text-sm text-muted-foreground">No ligand data loaded</p>
            ) : (
              <div className="max-h-[32rem] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {pdbbindEntries.map((entry, idx) => (
                    <div
                      key={`${entry.pdb_id}-${idx}`}
                      className="glass-card overflow-hidden p-3 transition-all hover:ring-1 hover:ring-accent/50"
                    >
                      {entry.image && (
                        <div className="rounded-md bg-white p-2">
                          <img
                            src={entry.image}
                            alt={entry.pdb_id}
                            className="mx-auto h-32 w-full object-contain"
                          />
                        </div>
                      )}
                      <p className="mt-2 truncate font-mono text-xs font-bold uppercase text-accent">
                        {entry.pdb_id}
                      </p>
                      <p className="truncate font-mono text-[10px] text-muted-foreground">
                        {entry.smiles || "—"}
                      </p>
                    </div>
                  ))}
                </div>
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
            Live data from your FastAPI backend
          </p>
        </motion.div>

        {/* Page Controls */}
        <div className="mb-6 flex items-center justify-between rounded-lg border border-border/50 bg-secondary/50 p-3">
          <div className="flex gap-2">
            {PAGES.map((page, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
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
