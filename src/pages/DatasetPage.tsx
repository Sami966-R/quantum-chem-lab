import Navigation from "@/components/Navigation";
import DatasetLab from "@/components/DatasetLab";

const DatasetPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <div className="pt-16">
      <DatasetLab />
    </div>
  </div>
);

export default DatasetPage;
