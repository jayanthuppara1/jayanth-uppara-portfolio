import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  warm: boolean;
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };
    let rafId = 0;

    /* Warm coffee palette — latte and bronze */
    const LATTE_COLOR  = "201, 169, 122"; /* #c9a97a */
    const BRONZE_COLOR = "160, 98, 42";   /* #a0622a */

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      width  = rect.width;
      height = rect.height;
      canvas.width  = width;
      canvas.height = height;
    };

    const makeParticles = () => {
      const count = Math.min(Math.floor((width * height) / 14000), 90);
      particles = Array.from({ length: count }, () => {
        const base = Math.random() * 0.45 + 0.08;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          radius: Math.random() * 1.5 + 0.5,
          alpha: base,
          baseAlpha: base,
          warm: Math.random() > 0.65, /* ~35% use bronze instead of latte */
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const REPEL_RADIUS = 120;
      const CONNECT_DIST = 100;

      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0 && dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          p.vx -= (dx / dist) * force * 0.04;
          p.vy -= (dy / dist) * force * 0.04;
          p.alpha = Math.min(p.baseAlpha + force * 0.5, 0.85);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x  += p.vx;
        p.y  += p.vy;

        if (p.x < 0)      p.x = width;
        if (p.x > width)  p.x = 0;
        if (p.y < 0)      p.y = height;
        if (p.y > height) p.y = 0;

        const color = p.warm ? BRONZE_COLOR : LATTE_COLOR;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.10;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${LATTE_COLOR}, ${opacity})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseLeave = () => { mouse = { x: -9999, y: -9999 }; };

    const onResize = () => { resize(); makeParticles(); };

    resize();
    makeParticles();
    draw();

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      aria-hidden="true"
    />
  );
}
