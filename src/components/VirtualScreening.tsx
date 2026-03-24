import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, ShieldCheck, ShieldAlert, Package, Radio, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const API_URL = import.meta.env.VITE_API_URL || "https://dentoid-afflictively-maia.ngrok-free.dev";
const HEADERS = { "ngrok-skip-browser-warning": "true" };

interface TopCandidate {
  pdb_id: string;
  protein_type: string;
  predicted_pkd: number;
  stability: string;
}

interface ScreeningResult {
  rank: number;
  pdb_id: string;
  protein_type: string;
  predicted_pkd: number;
  stability: string;
}

interface ScreeningData {
  success: boolean;
  cached: boolean;
  total_screened: number;
  top_candidate: TopCandidate;
  results: ScreeningResult[];
}

const VirtualScreening = () => {
  const [data, setData] = useState<ScreeningData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/quantum-dashboard/virtual-screening`, { headers: HEADERS });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.success === false) throw new Error(json.detail || "API returned failure");
        setData(json);
      } catch (e: any) {
        setError(e.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Virtual Screening — Live Results</h3>
        <div className="flex items-center gap-2">
          {data && (
            <>
              <Badge variant="outline" className="text-[10px] bg-accent/20 text-accent border-accent/30">
                {data.total_screened} compounds screened
              </Badge>
              {data.cached ? (
                <Badge variant="outline" className="gap-1 text-[10px] bg-blue-500/20 text-blue-400 border-blue-500/30">
                  <Package className="h-3 w-3" /> Cached Results
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-1 text-[10px] bg-red-500/20 text-red-400 border-red-500/30">
                  <Radio className="h-3 w-3" /> Live Results
                </Badge>
              )}
            </>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8 gap-2 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading screening data…
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs text-destructive font-mono">
          {error}
        </div>
      )}

      {data && !loading && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Top Candidate */}
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="h-5 w-5 text-emerald-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">Top Candidate</span>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">PDB ID</p>
                <p className="font-mono text-lg font-bold text-foreground">{data.top_candidate.pdb_id}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Protein Type</p>
                <p className="font-mono text-lg font-bold text-foreground">{data.top_candidate.protein_type}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Predicted pKd</p>
                <p className="font-mono text-lg font-bold text-accent">{data.top_candidate.predicted_pkd.toFixed(5)}</p>
              </div>
              <Badge variant="outline" className="gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <ShieldCheck className="h-3 w-3" />
                {data.top_candidate.stability}
              </Badge>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground">
                  <th className="px-3 py-2">Rank</th>
                  <th className="px-3 py-2">PDB ID</th>
                  <th className="px-3 py-2">Protein Type</th>
                  <th className="px-3 py-2">Predicted pKd</th>
                  <th className="px-3 py-2">Stability</th>
                </tr>
              </thead>
              <tbody>
                {data.results.map((r) => {
                  const isStable = r.stability?.toLowerCase() === "stable";
                  return (
                    <tr key={r.rank} className="border-b border-border/20">
                      <td className="px-3 py-2.5 text-muted-foreground">{r.rank}</td>
                      <td className="px-3 py-2.5 text-foreground font-medium">{r.pdb_id}</td>
                      <td className="px-3 py-2.5 text-muted-foreground">{r.protein_type}</td>
                      <td className="px-3 py-2.5 text-accent font-semibold">{r.predicted_pkd.toFixed(6)}</td>
                      <td className="px-3 py-2.5">
                        <Badge
                          variant="outline"
                          className={`gap-1 text-[10px] ${
                            isStable
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }`}
                        >
                          {isStable ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                          {r.stability}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VirtualScreening;
