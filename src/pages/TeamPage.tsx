import { motion } from "framer-motion";
import { Users, GraduationCap, Building, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";

const team = [
  { name: "Muhammad Samiullah", role: "Front End Developer" },
  { name: "Muhammad Danish Nadeem", role: "ML Engineer" },
  { name: "Safwaan Saleem", role: "Lead Researcher" },
];

const TeamPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <div className="container mx-auto px-4 pt-24 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground">Research Team</h1>
        <p className="mt-2 text-sm text-muted-foreground">The people behind QuantaCure</p>
      </motion.div>

      {/* Team Members */}
      <div className="mx-auto mb-12 grid max-w-3xl gap-6 sm:grid-cols-3">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card flex flex-col items-center p-6 text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-mono text-sm font-bold text-foreground">{member.name}</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-accent">{member.role}</p>
          </motion.div>
        ))}
      </div>

      {/* Supervisor & Details */}
      <div className="mx-auto max-w-2xl space-y-4">
        {[
          { icon: GraduationCap, label: "Supervisor", value: "Assistant Professor . Muhammad Zunnurain Hussain" },
          { icon: Building, label: "University", value: "Bahria University Lahore Campus" },
          { icon: Calendar, label: "Academic Year", value: "2025 – 2026" },
        ].map((info) => (
          <div key={info.label} className="glass-card flex items-center gap-4 p-4">
            <info.icon className="h-5 w-5 text-accent" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{info.label}</div>
              <div className="text-sm font-medium text-foreground">{info.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Footer */}
    <footer className="border-t border-border/30 py-8 text-center">
      <p className="font-mono text-xs text-muted-foreground">QuantaCure © 2025</p>
    </footer>
  </div>
);

export default TeamPage;
