import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import DatasetPage from "./pages/DatasetPage";
import BenchmarkPage from "./pages/BenchmarkPage";
import ResultsPage from "./pages/ResultsPage";
import MoleculeTestingPage from "./pages/MoleculeTestingPage";
import ErrorAnalysisPage from "./pages/ErrorAnalysisPage";
import QuantumPage from "./pages/QuantumPage";
import TeamPage from "./pages/TeamPage";
import NotFound from "./pages/NotFound";
import PageTimelapse from "./components/PageTimelapse";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/datasets" element={<DatasetPage />} />
          <Route path="/benchmark" element={<BenchmarkPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/molecule-testing" element={<MoleculeTestingPage />} />
          <Route path="/error-analysis" element={<ErrorAnalysisPage />} />
          <Route path="/quantum" element={<QuantumPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <PageTimelapse />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
