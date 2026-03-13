import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, ScatterChart, Scatter, ZAxis,
} from "recharts";
import { Brain, TrendingUp, Activity, Target, BarChart3, RefreshCw, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const API_URL = import.meta.env.VITE_API_URL || "https://dentoid-afflictively-maia.ngrok-free.dev";
const HEADERS = { "ngrok-skip-browser-warning": "true" };
const POLL_INTERVAL = 30000;

interface TrainingCurveData {
  epochs: number[];
  train_losses: number[];
  val_losses: number[];
  final_train_loss: number;
  final_val_loss: number;
}

interface ErrorDistData {
  train_set: { counts: number[]; bins: number[]; mean: number; std: number };
  test_set: { counts: number[]; bins: number[]; mean: number; std: number };
}

interface ActualVsPredicted {
  actual: number[];
  predicted: number[];
  count: number;
  correlation: number;
}

interface TestMetrics {
  r2_score: number;
  rmse: number;
  mae: number;
}

interface ModelComparison {
  [model: string]: { accuracy?: number; speed?: number; precision?: number; f1_score?: number };
}

interface ClassificationModel {
  model?: string;
  name?: string;
  train_accuracy: number;
  test_accuracy: number;
  mae: number;
  rmse: number;
  r2: number;
}

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

const tooltipStyle = {
  background: "hsl(240,24%,10%)",
  border: "1px solid hsl(260,30%,22%)",
  fontSize: 11,
  fontFamily: "IBM Plex Mono",
};

const MLBenchmark = () => {
  const training = useFetch<TrainingCurveData>("/ml-dashboard/training-curve");
  const errorDist = useFetch<ErrorDistData>("/ml-dashboard/error-distribution");
  const scatter = useFetch<ActualVsPredicted>("/ml-dashboard/actual-vs-predicted");
  const metrics = useFetch<TestMetrics>("/ml-dashboard/test-metrics");
  const comparison = useFetch<ModelComparison>("/ml-dashboard/model-comparison");
  const classification = useFetch<ClassificationModel[]>("/ml-dashboard/classification-metrics");

  // Unwrap nested API responses
  const trainingCurve = (training.data as any)?.training_curve;
  const errorDistribution = (errorDist.data as any)?.error_distribution;
  const scatterRaw = (scatter.data as any)?.actual_vs_predicted;
  const testMetrics = (metrics.data as any)?.metrics;
  const comparisonModels = (comparison.data as any)?.models;
  const classificationModels = (classification.data as any)?.models;

  // Transform training curve — epochs is a count, not an array
  const trainingChartData = trainingCurve?.train_losses
    ? trainingCurve.train_losses.map((_: number, i: number) => ({
        epoch: i + 1,
        train: trainingCurve.train_losses[i],
        val: trainingCurve.val_losses[i],
      }))
    : [];

  // Transform error distribution
  const errorChartData = (set: any, label: string) => {
    if (!set?.counts) return [];
    return set.counts.map((count: number, i: number) => ({
      bin: set.bins[i]?.toFixed(2) ?? i,
      [label]: count,
    }));
  };

  // Transform scatter
  const scatterData = scatterRaw?.actual
    ? scatterRaw.actual.map((a: number, i: number) => ({ actual: a, predicted: scatterRaw.predicted[i] }))
    : [];

  // Transform radar
  const radarData = comparisonModels && Object.keys(comparisonModels).length > 0
    ? Object.keys(Object.values(comparisonModels)[0] || {}).map((metric) => {
        const entry: Record<string, any> = { metric: metric.replace(/_/g, " ") };
        Object.entries(comparisonModels).forEach(([model, vals]) => {
          entry[model] = (vals as any)[metric] ?? 0;
        });
        return entry;
      })
    : [];
  const radarModels = comparisonModels ? Object.keys(comparisonModels) : [];

  const radarColors = [
    "hsl(25,100%,50%)", "hsl(270,50%,50%)", "hsl(160,60%,45%)", "hsl(200,80%,55%)",
  ];

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
          <p className="mt-2 text-sm text-muted-foreground">Real-time training metrics · Error analysis · Model comparison</p>
        </motion.div>

        {/* Test Metrics Summary */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {metrics.loading ? (
            <>
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
            </>
          ) : metrics.error ? (
            <div className="col-span-3">
              <ErrorMsg msg={metrics.error} onRetry={metrics.refetch} />
            </div>
          ) : testMetrics ? (
            <>
              {[
                { label: "R² Score", value: testMetrics.r2_score?.toFixed(4), icon: Target, color: "text-accent" },
                { label: "RMSE", value: testMetrics.rmse?.toFixed(4), icon: Activity, color: "text-[hsl(var(--glow-success))]" },
                { label: "MAE", value: testMetrics.mae?.toFixed(4), icon: BarChart3, color: "text-[hsl(var(--glow-info))]" },
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

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Training Curve */}
          <GlassCard>
            <SectionHeader icon={TrendingUp} label="Training" title="Loss Curve" />
            {training.loading ? (
              <LoadingSkeleton />
            ) : training.error ? (
              <ErrorMsg msg={training.error} onRetry={training.refetch} />
            ) : (
              <>
                <div className="mb-2 flex gap-4 font-mono text-[10px] text-muted-foreground">
                  <span>Final Train: <span className="text-foreground">{trainingCurve?.final_train_loss?.toFixed(4)}</span></span>
                  <span>Final Val: <span className="text-accent">{trainingCurve?.final_val_loss?.toFixed(4)}</span></span>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trainingChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                    <XAxis dataKey="epoch" tick={{ fill: "#7a7a85", fontSize: 10 }} label={{ value: "Epoch", position: "insideBottom", offset: -2, fill: "#7a7a85", fontSize: 10 }} />
                    <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} label={{ value: "Loss", angle: -90, position: "insideLeft", fill: "#7a7a85", fontSize: 10 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="train" stroke="hsl(270,50%,50%)" strokeWidth={2} dot={false} name="Train Loss" />
                    <Line type="monotone" dataKey="val" stroke="hsl(25,100%,50%)" strokeWidth={2} dot={false} name="Val Loss" />
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
                <ResponsiveContainer width="100%" height={250}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                    <XAxis type="number" dataKey="actual" name="Actual" tick={{ fill: "#7a7a85", fontSize: 10 }} label={{ value: "Actual", position: "insideBottom", offset: -2, fill: "#7a7a85", fontSize: 10 }} />
                    <YAxis type="number" dataKey="predicted" name="Predicted" tick={{ fill: "#7a7a85", fontSize: 10 }} label={{ value: "Predicted", angle: -90, position: "insideLeft", fill: "#7a7a85", fontSize: 10 }} />
                    <ZAxis range={[20, 20]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Scatter data={scatterData} fill="hsl(25,100%,50%)" fillOpacity={0.6} />
                  </ScatterChart>
                </ResponsiveContainer>
              </>
            )}
          </GlassCard>

          {/* Error Distribution */}
          <GlassCard>
            <SectionHeader icon={BarChart3} label="Error" title="Train Distribution" />
            {errorDist.loading ? (
              <LoadingSkeleton />
            ) : errorDist.error ? (
              <ErrorMsg msg={errorDist.error} onRetry={errorDist.refetch} />
            ) : (
              <>
                <div className="mb-2 font-mono text-[10px] text-muted-foreground">
                  Mean: <span className="text-foreground">{errorDistribution?.train_set?.mean?.toFixed(4)}</span> · Std: <span className="text-foreground">{errorDistribution?.train_set?.std?.toFixed(4)}</span>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={errorChartData(errorDistribution?.train_set, "train")}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                    <XAxis dataKey="bin" tick={{ fill: "#7a7a85", fontSize: 9 }} />
                    <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="train" fill="hsl(270,50%,34%)" name="Train Errors" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
          </GlassCard>

          {/* Error Distribution - Test */}
          <GlassCard>
            <SectionHeader icon={BarChart3} label="Error" title="Test Distribution" />
            {errorDist.loading ? (
              <LoadingSkeleton />
            ) : errorDist.error ? (
              <ErrorMsg msg={errorDist.error} onRetry={errorDist.refetch} />
            ) : (
              <>
                <div className="mb-2 font-mono text-[10px] text-muted-foreground">
                  Mean: <span className="text-foreground">{errorDistribution?.test_set?.mean?.toFixed(4)}</span> · Std: <span className="text-foreground">{errorDistribution?.test_set?.std?.toFixed(4)}</span>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={errorChartData(errorDistribution?.test_set, "test")}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,30%,22%)" />
                    <XAxis dataKey="bin" tick={{ fill: "#7a7a85", fontSize: 9 }} />
                    <YAxis tick={{ fill: "#7a7a85", fontSize: 10 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="test" fill="hsl(25,100%,50%)" name="Test Errors" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
          </GlassCard>

          {/* Radar - Model Comparison */}
          <GlassCard>
            <SectionHeader icon={Brain} label="Comparison" title="Model Radar" />
            {comparison.loading ? (
              <LoadingSkeleton />
            ) : comparison.error ? (
              <ErrorMsg msg={comparison.error} onRetry={comparison.refetch} />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(260,30%,22%)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#7a7a85", fontSize: 10 }} />
                  <PolarRadiusAxis tick={{ fill: "#7a7a85", fontSize: 8 }} />
                  {radarModels.map((model, i) => (
                    <Radar key={model} name={model} dataKey={model} stroke={radarColors[i % radarColors.length]} fill={radarColors[i % radarColors.length]} fillOpacity={0.15} />
                  ))}
                  <Tooltip contentStyle={tooltipStyle} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </GlassCard>

          {/* Classification Metrics Table */}
          <GlassCard>
            <SectionHeader icon={Activity} label="Classification" title="Model Metrics" />
            {classification.loading ? (
              <LoadingSkeleton h={200} />
            ) : classification.error ? (
              <ErrorMsg msg={classification.error} onRetry={classification.refetch} />
            ) : classification.data ? (
              <div className="overflow-auto">
                <table className="w-full font-mono text-[10px]">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="pb-2 pr-3">Model</th>
                      <th className="pb-2 pr-3">Train Acc</th>
                      <th className="pb-2 pr-3">Test Acc</th>
                      <th className="pb-2 pr-3">MAE</th>
                      <th className="pb-2 pr-3">RMSE</th>
                      <th className="pb-2">R²</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Array.isArray(classification.data) ? classification.data : []).map((m, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 pr-3 font-bold text-foreground">{m.model || m.name || `Model ${i + 1}`}</td>
                        <td className="py-2 pr-3 text-[hsl(var(--glow-success))]">{m.train_accuracy?.toFixed(2)}%</td>
                        <td className="py-2 pr-3 text-foreground">{m.test_accuracy?.toFixed(2)}%</td>
                        <td className="py-2 pr-3 text-foreground">{m.mae?.toFixed(4)}</td>
                        <td className="py-2 pr-3 text-foreground">{m.rmse?.toFixed(4)}</td>
                        <td className="py-2 text-accent">{m.r2?.toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default MLBenchmark;
