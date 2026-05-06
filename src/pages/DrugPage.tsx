import { motion } from "framer-motion";
import { Cpu, Atom, FlaskConical, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const DrugPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* HERO */}
      <section className="pt-28 pb-16 text-center">
        <motion.h1
          {...fadeUp}
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent"
        >
          Molecular Binding Affinity Predictor
        </motion.h1>

        <motion.p {...fadeUp} className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Enter molecular SMILES and let our Quantum-augmented GNN model predict
          binding affinity, stability, and drug potential.
        </motion.p>
      </section>
      <div className="mt-12 flex justify-center">
 <motion.img
  src="/Drug_Discovery_using_Hybrid_AI_1.jpg"
  alt="Quantum Drug Discovery Pipeline"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="rounded-xl max-w-4xl w-full shadow-[0_0_40px_rgba(0,212,255,0.3)]"
/>

      {/* PIPELINE */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-6">
        {[
          {
            icon: <Atom />,
            title: "SMILES Input",
            desc: "Provide molecular structure as SMILES string",
          },
          {
            icon: <FlaskConical />,
            title: "RDKit Graph",
            desc: "Converted into atoms and bonds graph",
          },
          {
            icon: <Cpu />,
            title: "GNN Processing",
            desc: "Processed through GINEConv layers",
          },
          {
            icon: <Sparkles />,
            title: "Prediction Output",
            desc: "pKd, energy, stability & target",
          },
        ].map((step, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            className="bg-white/5 p-6 rounded-xl border border-cyan-500/20 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] transition"
          >
            <div className="text-cyan-400 mb-3">{step.icon}</div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-gray-400">{step.desc}</p>
          </motion.div>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
};

export default DrugPage;
