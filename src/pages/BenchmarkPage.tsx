import Navigation from "@/components/Navigation";
import MLBenchmark from "@/components/MLBenchmark";

const BenchmarkPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <div className="pt-16">
      <MLBenchmark />
    </div>
  </div>
);

export default BenchmarkPage;
