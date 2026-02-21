import Navigation from "@/components/Navigation";
import LiveTesting from "@/components/LiveTesting";

const MoleculeTestingPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <div className="pt-16">
      <LiveTesting />
    </div>
  </div>
);

export default MoleculeTestingPage;
