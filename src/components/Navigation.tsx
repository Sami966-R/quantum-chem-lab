import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Atom } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Overview", href: "/overview" },
  { label: "Datasets", href: "/datasets" },
  { label: "ML Benchmark", href: "/benchmark" },
  { label: "Results", href: "/results" },
  { label: "Molecule Lab", href: "/molecule-testing" },
  { label: "Error Analysis", href: "/error-analysis" },
  { label: "Quantum", href: "/quantum" },
  { label: "Team", href: "/team" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Atom className="h-6 w-6 text-accent" />
          <span className="font-mono text-sm font-bold tracking-wider text-foreground">
            QUANTA<span className="text-accent">CURE</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors hover:bg-secondary hover:text-foreground ${
                location.pathname === item.href ? "bg-secondary text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/30 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 font-mono text-xs transition-colors hover:bg-secondary hover:text-foreground ${
                    location.pathname === item.href ? "bg-secondary text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
