import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import DatasetLab from "@/components/DatasetLab";
import QuantumSimPanel from "@/components/QuantumSimPanel";
import MLBenchmark from "@/components/MLBenchmark";
import ComparisonDashboard from "@/components/ComparisonDashboard";
import LiveTesting from "@/components/LiveTesting";
import MoleculePredictor from "@/components/MoleculePredictor";
import ErrorAnalysis from "@/components/ErrorAnalysis";
import AdminControls from "@/components/AdminControls";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <HeroSection />
    <DatasetLab />
    <QuantumSimPanel />
    <MLBenchmark />
    <ComparisonDashboard />
    <LiveTesting />
    <ErrorAnalysis />
    <AdminControls />
    <footer className="border-t border-border/30 py-8 text-center">
      <p className="font-mono text-xs text-muted-foreground">
        QuantaCure © 2024–2025 · Quantum Pharma Lab · All rights reserved
      </p>
    </footer>
  </div>
);

export default Index;
