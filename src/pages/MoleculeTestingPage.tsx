import Navigation from "@/components/Navigation";
import LiveTesting from "@/components/LiveTesting";
import MoleculePredictor from "@/components/MoleculePredictor";

const MoleculeTestingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="pt-24 space-y-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            Live Molecule Testing Lab
          </h1>
          <p className="text-gray-400 mt-4">
            Test molecules in real-time using AI + Quantum simulation
          </p>
        </div>

        <LiveTesting />
        <MoleculePredictor />
      </div>
    </div>
  );
};

export default MoleculeTestingPage;
