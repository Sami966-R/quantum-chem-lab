import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PAGES = [
  { path: "/", label: "Landing" },
  { path: "/overview", label: "Overview" },
  { path: "/datasets", label: "Datasets" },
  { path: "/benchmark", label: "Benchmark" },
  { path: "/results", label: "Results" },
  { path: "/molecule-testing", label: "Molecule Testing" },
  { path: "/error-analysis", label: "Error Analysis" },
  { path: "/quantum", label: "Quantum" },
];

const INTERVAL = 30000;

const PageTimelapse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentIdx = PAGES.findIndex((p) => p.path === location.pathname);

  const goTo = useCallback(
    (idx: number) => {
      const target = ((idx % PAGES.length) + PAGES.length) % PAGES.length;
      navigate(PAGES[target].path);
    },
    [navigate]
  );

  useEffect(() => {
    if (!playing) {
      setProgress(0);
      return;
    }
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
      if (elapsed >= INTERVAL) {
        goTo(currentIdx + 1);
        clearInterval(tick);
      }
    }, 100);
    return () => clearInterval(tick);
  }, [playing, currentIdx, goTo]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
      >
        <div className="flex items-center gap-3 rounded-full border border-border/60 bg-card/90 px-5 py-2.5 shadow-xl backdrop-blur-md">
          <button
            onClick={() => goTo(currentIdx - 1)}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <button
            onClick={() => setPlaying(!playing)}
            className={`rounded-full p-2 transition-colors ${
              playing
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          <button
            onClick={() => goTo(currentIdx + 1)}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <SkipForward className="h-4 w-4" />
          </button>

          <span className="min-w-[100px] text-center font-mono text-xs text-foreground">
            {currentIdx >= 0 ? PAGES[currentIdx].label : "—"}{" "}
            <span className="text-muted-foreground">
              {currentIdx + 1}/{PAGES.length}
            </span>
          </span>

          {playing && (
            <div className="h-1 w-20 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTimelapse;
