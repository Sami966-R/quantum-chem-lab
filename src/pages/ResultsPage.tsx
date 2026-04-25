import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ScatterChart, Scatter, AreaChart, Area, ZAxis,
} from "recharts";
import { BarChart3, RefreshCw, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Skeleton } from "@/components/ui/skeleton";

const API_URL = import.meta.env.VITE_API_URL || "https://fastapi-backend-3-wqvz.onrender.com";
const HEADERS = { "ngrok-skip-browser-warning": "true" };

function useFetch<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}${endpoint}`, { headers: HEADERS });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (e: any) {
      console.error(`Fetch ${endpoint}:`, e);
      setError(e.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => { refetch(); }, [refetch]);

  return { data, loading, error, refetch };
}

const ErrorMsg = ({ msg, onRetry }: { msg: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
    <AlertCircle className="h-5 w-5 text-destructive" />
    <p className="font-mono text-xs text-muted-foreground">{msg}</p>
    <button onClick={onRetry} className="flex items-center gap-1 rounded bg-secondary px-3 py-1 font-mono text-[10px] text-foreground hover:bg-muted">
      <RefreshCw className="h-3 w-3" /> Retry
    </button>
  </div>
);

const darkTooltipStyle = {
  background: "hsl(240,24%,10%)",
  border: "1px solid hsl(260,30%,22%)",
  fontSize: 11,
  fontFamily: "IBM Plex Mono",
};

const lightTooltipStyle = {
  background: "#ffffff",
  border: "1px solid #e2e2e2",
  fontSize: 11,
  fontFamily: "IBM Plex Mono",
  color: "#1a1a1a",
};

const ResultsPage = () => {
  const scatter = useFetch<any>("/ml-dashboard/actual-vs-predicted");
  const errorDist = useFetch<any>("/ml-dashboard/error-distribution");
  const training = useFetch<any>("/ml-dashboard/training-curve");

  // API returns flat array: [{actual, predicted, x, y}, ...]
  const scatterData = scatter.data?.actual_vs_predicted || scatter.data?.data || [];

  // API returns flat array: [{bins, counts}, ...]
  const errorDistData = errorDist.data?.error_distribution || errorDist.data?.data || [];

  // API returns flat array: [{epoch, train_loss, ...}, ...]
  const trainingChartData = training.data?.training_curve || training.data?.data || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="mb-2 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">Results Visualization</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Results Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">Live data from backend API endpoints</p>
        </motion.div>

        <div className="grid gap-6">
          {/* Actual vs Predicted — full width */}
          <div className="glass-card p-4">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Actual vs Predicted Values</h4>
            {scatter.loading ? (
              <Skeleton className="h-[280px] w-full rounded-lg" />
            ) : scatter.error ? (
              <ErrorMsg msg={scatter.error} onRetry={scatter.refetch} />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                  <XAxis type="number" dataKey="x" name="Actual" tick={{ fill: "#7a7a85", fontSize: 10 }} />
                   <YAxis type="number" dataKey="y" name="Predicted" tick={{ fill: "#7a7a85", fontSize: 10 }} />
                  <ZAxis range={[20, 20]} />
                  <Tooltip contentStyle={lightTooltipStyle} />
                  <Scatter data={scatterData} fill="#FF6B00" fillOpacity={0.7} />
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Bottom row: Error Distribution + Training Loss */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Error Distribution */}
            <div className="glass-card p-4">
              <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Error Distribution</h4>
              {errorDist.loading ? (
                <Skeleton className="h-[260px] w-full rounded-lg" />
              ) : errorDist.error ? (
                <ErrorMsg msg={errorDist.error} onRetry={errorDist.refetch} />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={errorDistData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                    <XAxis dataKey="bins" tick={{ fill: "#7a7a85", fontSize: 10 }} />
                     <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} />
                     <Tooltip contentStyle={darkTooltipStyle} />
                     <Area type="monotone" dataKey="counts" stroke="#FF6B00" fill="hsl(25,100%,50%)" fillOpacity={0.2} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Training Loss (train_losses only) */}
            <div className="glass-card p-4">
              <h4 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Training Loss</h4>
              {training.loading ? (
                <Skeleton className="h-[260px] w-full rounded-lg" />
              ) : training.error ? (
                <ErrorMsg msg={training.error} onRetry={training.refetch} />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={trainingChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                    <XAxis dataKey="epoch" tick={{ fill: "#7a7a85", fontSize: 10 }} />
                    <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} />
                    <Tooltip contentStyle={darkTooltipStyle} />
                    <Line type="monotone" dataKey="train_loss" stroke="#5B2C83" strokeWidth={2} dot={false} name="Training Loss" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
