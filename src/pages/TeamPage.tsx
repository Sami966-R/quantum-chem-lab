import { motion } from "framer-motion";
import { Users, GraduationCap, Building, Calendar, Quote } from "lucide-react";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";

const team = [
  { name: "Muhammad Samiullah", role: "Front End Developer" },
  { name: "Muhammad Danish Nadeem", role: "ML Engineer" },
  { name: "Safwaan Saleem", role: "Lead Researcher" },
];

const milestones = [
  { date: "Q3 2025", title: "Project Kickoff", desc: "Literature review, problem framing, dataset selection." },
  { date: "Q4 2025", title: "Data Pipeline", desc: "ChEMBL 36 + PDBbind ingestion, featurization, GIN baseline." },
  { date: "Q1 2026", title: "Quantum Layer", desc: "VQE + FidelityQuantumKernel integrated into the GNN edges." },
  { date: "Q2 2026", title: "Clinical Demo", desc: "Live virtual screening, RAG assistant, FYP defense." },
];

const stack = ["React", "Python", "Qiskit", "TensorFlow", "FastAPI", "Supabase"];

const TeamPage = () => (
  <div className="relative min-h-screen bg-background text-white">
    <Navigation />
    <div className="container mx-auto px-4 pt-32 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-12 text-center">
        <h1 className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
          The Quanta Cure Team
        </h1>
        <p className="mt-3 text-sm text-gray-300">The people behind the project</p>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-16 max-w-3xl rounded-xl border-l-4 border-cyan-400 bg-white/5 p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(0,212,255,0.15)]"
      >
        <Quote className="mb-3 h-6 w-6 text-cyan-400" />
        <p className="text-xl leading-relaxed text-white md:text-2xl">
          Our mission is to merge quantum computing with deep learning to make cancer detection
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent"> faster, smarter, and more accessible </span>
          for every patient on Earth.
        </p>
      </motion.div>

      {/* Members */}
      <div className="mx-auto mb-20 grid max-w-4xl gap-6 sm:grid-cols-3">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="flex flex-col items-center rounded-xl border border-cyan-500/20 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 shadow-[0_0_20px_rgba(0,212,255,0.5)]">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white">{m.name}</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-cyan-300">{m.role}</p>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <motion.h2 initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-10 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent">
        FYP Milestones
      </motion.h2>
      <div className="relative mx-auto mb-20 max-w-2xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-purple-500 via-cyan-400 to-green-400" />
        {milestones.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative mb-8 pl-12"
          >
            <div className="absolute left-2 top-1.5 h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_15px_#00d4ff]" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">{m.date}</p>
            <h3 className="text-base font-bold text-white">{m.title}</h3>
            <p className="text-sm text-gray-300">{m.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Tech stack */}
      <motion.h2 initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-10 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-center text-3xl font-bold text-transparent">
        Technology Stack
      </motion.h2>
      <div className="mx-auto mb-20 grid max-w-3xl grid-cols-3 gap-4 sm:grid-cols-6">
        {stack.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex aspect-square items-center justify-center rounded-xl border border-cyan-500/20 bg-white/5 p-3 text-center backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,212,255,0.3)]"
          >
            <span className="font-mono text-xs font-bold text-cyan-300">{t}</span>
          </motion.div>
        ))}
      </div>

      {/* Supervisor */}
      <div className="mx-auto max-w-2xl space-y-4">
        {[
          { icon: GraduationCap, label: "Supervisor", value: "Asst. Prof. Muhammad Zunnurain Hussain" },
          { icon: Building, label: "University", value: "Bahria University Lahore Campus" },
          { icon: Calendar, label: "Academic Year", value: "2025 – 2026" },
        ].map((info) => (
          <div key={info.label} className="flex items-center gap-4 rounded-xl border border-cyan-500/20 bg-white/5 p-4 backdrop-blur-sm">
            <info.icon className="h-5 w-5 text-cyan-400" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-gray-400">{info.label}</div>
              <div className="text-sm font-medium text-white">{info.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <SiteFooter />
  </div>
);

export default TeamPage;
