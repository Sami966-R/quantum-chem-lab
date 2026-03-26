import { motion } from "framer-motion";
import { Trophy, ShieldCheck, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface VirtualScreeningProps {
  topCandidate: TopCandidate | null;
  results: ScreeningResult[];
}

const VirtualScreening = ({ topCandidate, results }: VirtualScreeningProps) => {
  const hasData = topCandidate && results.length > 0;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Virtual Screening — Live Results</h3>
        {hasData && (
          <Badge variant="outline" className="text-[10px] bg-accent/20 text-accent border-accent/30">
            {results.length} compounds screened
          </Badge>
        )}
      </div>

      {!hasData ? (
        <div className="flex items-center justify-center py-8 text-muted-foreground">
          <p className="font-mono text-xs">Run a prediction to see screening results</p>
        </div>
      ) : (
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
                <p className="font-mono text-lg font-bold text-foreground">{topCandidate.pdb_id}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Protein Type</p>
                <p className="font-mono text-lg font-bold text-foreground">{topCandidate.protein_type}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Predicted pKd</p>
                <p className="font-mono text-lg font-bold text-accent">{topCandidate.predicted_pkd.toFixed(5)}</p>
              </div>
              <Badge variant="outline" className="gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <ShieldCheck className="h-3 w-3" />
                {topCandidate.stability}
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
                {results.map((r) => {
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
