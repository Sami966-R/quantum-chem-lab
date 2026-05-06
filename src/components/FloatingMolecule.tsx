import { motion } from "framer-motion";

const nodes = [
  { x: 50, y: 10 },
  { x: 90, y: 35 },
  { x: 80, y: 80 },
  { x: 30, y: 90 },
  { x: 10, y: 55 },
  { x: 50, y: 50 },
];
const bonds: [number, number][] = [
  [0, 5],[1, 5],[2, 5],[3, 5],[4, 5],[0, 1],[1, 2],[2, 3],[3, 4],[4, 0],
];

const FloatingMolecule = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <motion.svg
      viewBox="0 0 100 100"
      className="h-full w-full drop-shadow-[0_0_25px_rgba(0,212,255,0.4)]"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <radialGradient id="atomGrad">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#7b2ff7" />
        </radialGradient>
      </defs>
      {bonds.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#00d4ff"
          strokeWidth="0.4"
          opacity="0.6"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 5 ? 4 : 2.5}
          fill="url(#atomGrad)"
        >
          <animate attributeName="r" values={`${i === 5 ? 4 : 2.5};${i === 5 ? 5 : 3.5};${i === 5 ? 4 : 2.5}`} dur="3s" repeatCount="indefinite" />
        </circle>
      ))}
    </motion.svg>
  </div>
);

export default FloatingMolecule;
