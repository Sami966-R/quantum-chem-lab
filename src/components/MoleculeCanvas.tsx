import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const ATOMS = [
  { pos: [0, 1.4, 0], color: "#5B2C83" },
  { pos: [1.21, 0.7, 0], color: "#5B2C83" },
  { pos: [1.21, -0.7, 0], color: "#5B2C83" },
  { pos: [0, -1.4, 0], color: "#5B2C83" },
  { pos: [-1.21, -0.7, 0], color: "#5B2C83" },
  { pos: [-1.21, 0.7, 0], color: "#5B2C83" },
  // Hydrogens
  { pos: [0, 2.5, 0], color: "#FF6B00" },
  { pos: [2.16, 1.25, 0], color: "#FF6B00" },
  { pos: [2.16, -1.25, 0], color: "#FF6B00" },
  { pos: [0, -2.5, 0], color: "#FF6B00" },
  { pos: [-2.16, -1.25, 0], color: "#FF6B00" },
  { pos: [-2.16, 1.25, 0], color: "#FF6B00" },
];

const BONDS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11],
];

function Bond({ start, end }: { start: number[]; end: number[] }) {
  const ref = useRef<THREE.Mesh>(null);
  const { position, rotation, length } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const mid = new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(e, s);
    const len = dir.length();
    const axis = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, dir.normalize());
    const euler = new THREE.Euler().setFromQuaternion(quaternion);
    return { position: mid, rotation: euler, length: len };
  }, [start, end]);

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <cylinderGeometry args={[0.06, 0.06, length, 8]} />
      <meshStandardMaterial color="#4a2070" transparent opacity={0.7} />
    </mesh>
  );
}

function MoleculeGroup() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {ATOMS.map((atom, i) => (
        <mesh key={i} position={atom.pos as [number, number, number]}>
          <sphereGeometry args={[i < 6 ? 0.3 : 0.18, 16, 16]} />
          <meshStandardMaterial
            color={atom.color}
            emissive={atom.color}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      {BONDS.map(([a, b], i) => (
        <Bond key={i} start={ATOMS[a].pos} end={ATOMS[b].pos} />
      ))}
    </group>
  );
}

const MoleculeCanvas = () => (
  <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ background: "transparent" }}>
    <ambientLight intensity={0.3} />
    <pointLight position={[5, 5, 5]} intensity={1} color="#5B2C83" />
    <pointLight position={[-5, -5, 5]} intensity={0.5} color="#FF6B00" />
    <MoleculeGroup />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
  </Canvas>
);

export default MoleculeCanvas;
