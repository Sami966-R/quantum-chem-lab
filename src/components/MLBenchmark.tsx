import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ScatterChart, Scatter, ZAxis,
} from "recharts";
import { Brain, TrendingUp, Activity, Target, BarChart3, RefreshCw, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const API_URL = import.meta.env.VITE_API_URL || "https://dentoid-afflictively-maia.ngrok-free.dev";
const HEADERS = { "ngrok-skip-browser-warning": "true" };
const POLL_INTERVAL = 30000;

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

  useEffect(() => {
    refetch();
    const id = setInterval(refetch, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [refetch]);

  return { data, loading, error, refetch };
}

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`glass-card p-4 ${className}`}>{children}</div>
);

const SectionHeader = ({ icon: Icon, label, title }: { icon: any; label: string; title: string }) => (
  <div className="mb-2 flex items-center gap-2">
    <Icon className="h-4 w-4 text-accent" />
    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{label}</span>
    <span className="font-mono text-xs font-bold text-foreground">{title}</span>
  </div>
);

const ErrorMsg = ({ msg, onRetry }: { msg: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
    <AlertCircle className="h-5 w-5 text-destructive" />
    <p className="font-mono text-xs text-muted-foreground">{msg}</p>
    <button onClick={onRetry} className="flex items-center gap-1 rounded bg-secondary px-3 py-1 font-mono text-[10px] text-foreground hover:bg-muted">
      <RefreshCw className="h-3 w-3" /> Retry
    </button>
  </div>
);

const LoadingSkeleton = ({ h = 250 }: { h?: number }) => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton style={{ height: h }} className="w-full rounded-lg" />
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

const MLBenchmark = () => {
  const training = useFetch<any>("/ml-dashboard/training-curve");
  const scatter = useFetch<any>("/ml-dashboard/actual-vs-predicted");
  const classification = useFetch<any>("/ml-dashboard/classification-metrics");

  // API returns flat array: [{epoch, train_loss, ...}, ...]
  const trainingChartData = training.data?.training_curve || training.data?.data || [];

  // API returns flat array: [{actual, predicted, x, y}, ...]
  const scatterData = scatter.data?.actual_vs_predicted || scatter.data?.data || [];

  // Metrics are at data.metrics or directly on data
  const classMetrics = classification.data?.metrics || classification.data?.data || classification.data;

  return (
    <section id="ml" className="section-gradient relative py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <div className="mb-2 flex items-center gap-2">
            <Brain className="h-5 w-5 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">ML Dashboard</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Live Model Benchmarking</h2>
          <p className="mt-2 text-sm text-muted-foreground">Real-time training metrics · Regression results</p>
        </motion.div>

        {/* Regression Metrics */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {classification.loading ? (
            <>
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
            </>
          ) : classification.error ? (
            <div className="col-span-3">
              <ErrorMsg msg={classification.error} onRetry={classification.refetch} />
            </div>
          ) : classMetrics ? (
            <>
              {[
                { label: "R² Score", value: classMetrics.r2_score?.toFixed(4), icon: Target, color: "text-accent" },
                { label: "RMSE", value: classMetrics.rmse?.toFixed(4), icon: Activity, color: "text-[hsl(var(--glow-success))]" },
                { label: "MAE", value: classMetrics.mae?.toFixed(4), icon: BarChart3, color: "text-[hsl(var(--glow-info))]" },
              ].map((m) => (
                <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <GlassCard className="flex items-center gap-4">
                    <m.icon className={`h-8 w-8 ${m.color}`} />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</p>
                      <p className="font-mono text-2xl font-bold text-foreground">{m.value ?? "—"}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </>
          ) : null}
        </div>

        {/* Charts: Training Curve + Actual vs Predicted side by side */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Training Curve (train_losses only) */}
          <GlassCard>
            <SectionHeader icon={TrendingUp} label="Training" title="Loss Curve" />
            {training.loading ? (
              <LoadingSkeleton />
            ) : training.error ? (
              <ErrorMsg msg={training.error} onRetry={training.refetch} />
            ) : (
              <>
                <div className="mb-2 font-mono text-[10px] text-muted-foreground">
                  Epochs: <span className="text-foreground">{trainingChartData.length}</span>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={trainingChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                    <XAxis dataKey="epoch" tick={{ fill: "#7a7a85", fontSize: 10 }} label={{ value: "Epoch", position: "insideBottom", offset: -2, fill: "#7a7a85", fontSize: 10 }} />
                    <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} label={{ value: "Loss", angle: -90, position: "insideLeft", fill: "#7a7a85", fontSize: 10 }} />
                    <Tooltip contentStyle={darkTooltipStyle} />
                    <Line type="monotone" dataKey="train" stroke="hsl(270,50%,50%)" strokeWidth={2} dot={false} name="Train Loss" />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}
          </GlassCard>

          {/* Actual vs Predicted Scatter */}
          <GlassCard>
            <SectionHeader icon={Target} label="Evaluation" title="Actual vs Predicted" />
            {scatter.loading ? (
              <LoadingSkeleton />
            ) : scatter.error ? (
              <ErrorMsg msg={scatter.error} onRetry={scatter.refetch} />
            ) : (
              <>
                <div className="mb-2 font-mono text-[10px] text-muted-foreground">
                  Points: <span className="text-foreground">{scatterRaw?.count}</span> · Correlation: <span className="text-accent">{scatterRaw?.correlation?.toFixed(4)}</span>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                    <XAxis type="number" dataKey="actual" name="Actual" tick={{ fill: "#7a7a85", fontSize: 10 }} label={{ value: "Actual", position: "insideBottom", offset: -2, fill: "#7a7a85", fontSize: 10 }} />
                    <YAxis type="number" dataKey="predicted" name="Predicted" tick={{ fill: "#7a7a85", fontSize: 10 }} label={{ value: "Predicted", angle: -90, position: "insideLeft", fill: "#7a7a85", fontSize: 10 }} />
                    <ZAxis range={[20, 20]} />
                    <Tooltip contentStyle={lightTooltipStyle} />
                    <Scatter data={scatterData} fill="hsl(25,100%,50%)" fillOpacity={0.6} />
                  </ScatterChart>
                </ResponsiveContainer>
              </>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default MLBenchmark;
