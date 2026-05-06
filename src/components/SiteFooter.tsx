import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const SiteFooter = () => (
  <footer className="relative mt-20">
    <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text font-mono text-sm font-bold text-transparent">
          QUANTACURE
        </p>
        <p className="text-xs text-gray-400">
          Quanta Cure © 2025 — AI Powered Cancer Detection.
        </p>
        <div className="flex items-center gap-4">
          {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-gray-400 transition-colors hover:text-cyan-400"
              aria-label="Social link"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
