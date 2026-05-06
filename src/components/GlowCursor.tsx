import { useEffect, useRef } from "react";

const GlowCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    let raf: number;
    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.15;
      trail.current.y += (pos.current.y - trail.current.y) * 0.15;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trail.current.x - 16}px, ${trail.current.y - 16}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={trailRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-cyan-400/40 hidden md:block"
        style={{ boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-cyan-400 hidden md:block"
        style={{ boxShadow: "0 0 12px #00d4ff" }}
      />
    </>
  );
};

export default GlowCursor;
