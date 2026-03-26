import Navigation from "@/components/Navigation";
import LiveTesting from "@/components/LiveTesting";
import MoleculePredictor from "@/components/MoleculePredictor";

const MoleculeTestingPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <div className="pt-16">
      <LiveTesting />
      <MoleculePredictor />
    </div>
  </div>
);

export default MoleculeTestingPage;
