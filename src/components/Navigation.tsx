import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Atom, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Overview", href: "/overview" },
  { label: "Datasets", href: "/datasets" },
  { label: "ML Benchmark", href: "/benchmark" },
  { label: "Results", href: "/results" },
  { label: "Molecule Lab", href: "/molecule-testing" },
  { label: "Drug", href: "/drug" },
  { label: "Quantum", href: "/quantum" },
  { label: "Team", href: "/team" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/20 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Atom className="h-6 w-6 text-cyan-400" />
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text font-mono text-sm font-bold tracking-wider text-transparent">
            QUANTA CURE
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`group relative rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                  active ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-3 right-3 h-px origin-left bg-cyan-400 transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
          <button
            onClick={() => navigate("/molecule-testing")}
            className="ml-3 inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all hover:shadow-[0_0_30px_rgba(123,47,247,0.6)] animate-pulse"
          >
            <Sparkles className="h-3 w-3" />
            Get Started
          </button>
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
            className="overflow-hidden border-t border-cyan-500/20 bg-black/60 backdrop-blur-xl lg:hidden"
          >
            <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 font-mono text-xs transition-colors ${
                    location.pathname === item.href ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
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
