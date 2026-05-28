"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  baseA: number;
  tw: number;
  twSpeed: number;
  hueShift: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const STAR_COUNT_BASE = 220;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let rafId: number;

    let _seed = 0x9e3779b1;
    function srand() {
      _seed = (Math.imul(_seed, 1664525) + 1013904223) >>> 0;
      return _seed / 0xffffffff;
    }
    function resetSeed() { _seed = 0x9e3779b1; }

    function buildStars() {
      resetSeed();
      const density = Math.min(1.2, Math.max(0.6, (w * h) / (1440 * 900)));
      const n = Math.floor(STAR_COUNT_BASE * density);
      stars = [];
      for (let i = 0; i < n; i++) {
        stars.push({
          x: srand() * w,
          y: srand() * h,
          z: srand(),
          r: 0.3 + srand() * 1.4,
          baseA: 0.15 + srand() * 0.65,
          tw: srand() * Math.PI * 2,
          twSpeed: 0.4 + srand() * 1.0,
          hueShift: srand() < 0.18,
        });
      }
    }

    function resize() {
      if (!canvas || !ctx) return;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    }

    function spawnShootingStar() {
      if (Math.random() > 0.0025) return;
      const fromTop = Math.random() < 0.5;
      shootingStars.push({
        x: Math.random() * w * 0.7 + w * 0.15,
        y: fromTop ? -20 : Math.random() * h * 0.3,
        vx: 2.2 + Math.random() * 1.5,
        vy: 0.6 + Math.random() * 0.6,
        life: 0,
        maxLife: 80 + Math.random() * 40,
      });
    }

    let t0 = performance.now();
    function tick(now: number) {
      const dt = (now - t0) / 1000;
      t0 = now;
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.tw += dt * s.twSpeed;
        const a = s.baseA * (0.6 + 0.4 * (0.5 + 0.5 * Math.sin(s.tw)));
        const dx = (s.z - 0.5) * 0.04;
        s.x += dx;
        if (s.x > w + 4) s.x = -4;
        if (s.x < -4) s.x = w + 4;

        ctx.beginPath();
        ctx.fillStyle = s.hueShift
          ? `rgba(255, 220, 170, ${a})`
          : `rgba(220, 230, 255, ${a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.r > 1.1) {
          ctx.beginPath();
          ctx.fillStyle = s.hueShift
            ? `rgba(255, 200, 140, ${a * 0.15})`
            : `rgba(180, 200, 255, ${a * 0.18})`;
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;
        const lifeT = ss.life / ss.maxLife;
        const a = Math.sin(Math.PI * lifeT);

        const grad = ctx.createLinearGradient(
          ss.x - ss.vx * 20, ss.y - ss.vy * 20, ss.x, ss.y
        );
        grad.addColorStop(0, "rgba(180, 210, 255, 0)");
        grad.addColorStop(1, `rgba(220, 235, 255, ${a * 0.9})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(ss.x - ss.vx * 20, ss.y - ss.vy * 20);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.arc(ss.x, ss.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (ss.life >= ss.maxLife || ss.x > w + 50 || ss.y > h + 50) {
          shootingStars.splice(i, 1);
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("resize", resize);
    resize();
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="starfield"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
