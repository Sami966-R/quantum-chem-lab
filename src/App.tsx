import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTimelapse from "./components/PageTimelapse";
import QuantaCureChat from "./components/QuantaCureChat";
import ParticleBackground from "./components/ParticleBackground";
import GlowCursor from "./components/GlowCursor";

const Landing = lazy(() => import("./pages/Landing"));
const Overview = lazy(() => import("./pages/Overview"));
const DatasetPage = lazy(() => import("./pages/DatasetPage"));
const BenchmarkPage = lazy(() => import("./pages/BenchmarkPage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const MoleculeTestingPage = lazy(() => import("./pages/MoleculeTestingPage"));
const ErrorAnalysisPage = lazy(() => import("./pages/ErrorAnalysisPage"));
const QuantumPage = lazy(() => import("./pages/QuantumPage"));
const DrugPage = lazy(() => import("./pages/DrugPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ParticleBackground />
        <GlowCursor />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/datasets" element={<DatasetPage />} />
            <Route path="/benchmark" element={<BenchmarkPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/molecule-testing" element={<MoleculeTestingPage />} />
            <Route path="/error-analysis" element={<ErrorAnalysisPage />} />
            <Route path="/quantum" element={<QuantumPage />} />
            <Route path="/drug" element={<DrugPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <PageTimelapse />
      </BrowserRouter>
      <QuantaCureChat />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
