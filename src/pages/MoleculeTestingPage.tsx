import Navigation from "@/components/Navigation";
import LiveTesting from "@/components/LiveTesting";
import MoleculePredictor from "@/components/MoleculePredictor";
import VirtualScreening from "@/components/VirtualScreening";

const MoleculeTestingPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <div className="pt-16">
      <LiveTesting />
      <div className="container mx-auto px-4 py-10">
        <VirtualScreening />
      </div>
      <MoleculePredictor />
    </div>
  </div>
);

export default MoleculeTestingPage;
