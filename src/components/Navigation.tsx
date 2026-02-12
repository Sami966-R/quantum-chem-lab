import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Atom } from "lucide-react";

const navItems = [
  { label: "Overview", href: "#hero" },
  { label: "Dataset Lab", href: "#dataset" },
  { label: "Quantum Sim", href: "#quantum" },
  { label: "ML Benchmark", href: "#ml" },
  { label: "Comparison", href: "#comparison" },
  { label: "Live Testing", href: "#live" },
  { label: "Analysis", href: "#analysis" },
  { label: "Controls", href: "#controls" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#hero" className="flex items-center gap-2">
          <Atom className="h-6 w-6 text-accent" />
          <span className="font-mono text-sm font-bold tracking-wider text-foreground">
            QUANTA<span className="text-accent">CURE</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </a>
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
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
