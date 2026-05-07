import { useEffect, useRef } from "react";

/**
 * Animated canvas-based hexagonal molecule network.
 * - Glowing double-ring hexagons in orange (#f97316) and purple (#7b2ff7)
 * - Deep #0a0a1a background with subtle radial purple ambient
 * - Slow drift, thin connection lines, pulsing glow
 * - Fixed behind all content, non-interactive
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Hex {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      pulse: number;
    }

    const COUNT = 45;
    const hexagons: Hex[] = [];
    for (let i = 0; i < COUNT; i++) {
      hexagons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 18 + Math.random() * 38,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: Math.random() > 0.45 ? "#f97316" : "#7b2ff7",
        alpha: 0.12 + Math.random() * 0.22,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const hexPath = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + r * Math.cos(a);
        const py = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const drawHex = (h: Hex, alpha: number) => {
      // Outer ring
      hexPath(h.x, h.y, h.r);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = h.color;
      ctx.lineWidth = 1.4;
      ctx.shadowColor = h.color;
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Inner ring (double-ring effect)
      hexPath(h.x, h.y, h.r * 0.6);
      ctx.globalAlpha = alpha * 0.5;
      ctx.lineWidth = 0.6;
      ctx.shadowBlur = 4;
      ctx.stroke();
    };

    const drawConnections = () => {
      for (let i = 0; i < hexagons.length; i++) {
        for (let j = i + 1; j < hexagons.length; j++) {
          const dx = hexagons[i].x - hexagons[j].x;
          const dy = hexagons[i].y - hexagons[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(hexagons[i].x, hexagons[i].y);
            ctx.lineTo(hexagons[j].x, hexagons[j].y);
            ctx.strokeStyle = hexagons[i].color;
            ctx.globalAlpha = (1 - dist / 200) * 0.18;
            ctx.lineWidth = 0.6;
            ctx.shadowBlur = 3;
            ctx.shadowColor = hexagons[i].color;
            ctx.stroke();
          }
        }
      }
    };

    const drawSparks = () => {
      hexagons.forEach((h, idx) => {
        if (idx % 7 !== 0) return;
        const a = (Math.PI / 3) * Math.floor(h.pulse) - Math.PI / 6;
        const px = h.x + h.r * Math.cos(a);
        const py = h.y + h.r * Math.sin(a);
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 0.6 + Math.sin(h.pulse * 3) * 0.3;
        ctx.shadowColor = h.color;
        ctx.shadowBlur = 12;
        ctx.fill();
      });
    };

    let raf: number;
    const animate = () => {
      // Background fill
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle purple ambient glow
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.6
      );
      grad.addColorStop(0, "rgba(123,47,247,0.08)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawConnections();
      drawSparks();

      hexagons.forEach((h) => {
        h.x += h.vx;
        h.y += h.vy;
        h.pulse += 0.018;

        if (h.x < -80) h.x = canvas.width + 80;
        if (h.x > canvas.width + 80) h.x = -80;
        if (h.y < -80) h.y = canvas.height + 80;
        if (h.y > canvas.height + 80) h.y = -80;

        const pulseAlpha = h.alpha + Math.sin(h.pulse) * 0.07;
        drawHex(h, Math.max(0.05, pulseAlpha));
      });

      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
