// ============================================================
// Starfield — twinkling parallax stars + occasional shooting star
// Fixed canvas behind everything.
// ============================================================
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

  let stars = [];
  let shootingStars = [];
  const STAR_COUNT_BASE = 220;

  // seeded random — keeps the starfield identical across page navigations
  // so the sky doesn't "jump" when switching pages
  let _seed = 0x9e3779b1;
  function srand() {
    _seed = (Math.imul(_seed, 1664525) + 1013904223) >>> 0;
    return _seed / 0xffffffff;
  }
  function resetSeed() { _seed = 0x9e3779b1; }

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStars();
  }

  function buildStars() {
    resetSeed();
    const density = Math.min(1.2, Math.max(0.6, (w * h) / (1440 * 900)));
    const n = Math.floor(STAR_COUNT_BASE * density);
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: srand() * w,
        y: srand() * h,
        z: srand(),                                  // depth 0..1
        r: 0.3 + srand() * 1.4,
        baseA: 0.15 + srand() * 0.65,
        tw: srand() * Math.PI * 2,                   // twinkle phase
        twSpeed: 0.4 + srand() * 1.0,
        hueShift: srand() < 0.18,                    // some warm/gold
      });
    }
  }

  function spawnShootingStar() {
    if (Math.random() > 0.0025) return;              // ~rare
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
  function tick(now) {
    const dt = (now - t0) / 1000;
    t0 = now;
    ctx.clearRect(0, 0, w, h);

    // stars
    for (const s of stars) {
      s.tw += dt * s.twSpeed;
      const a = s.baseA * (0.6 + 0.4 * (0.5 + 0.5 * Math.sin(s.tw)));
      // depth-based subtle drift
      const dx = (s.z - 0.5) * 0.04;
      s.x += dx;
      if (s.x > w + 4) s.x = -4;
      if (s.x < -4) s.x = w + 4;

      ctx.beginPath();
      if (s.hueShift) {
        ctx.fillStyle = `rgba(255, 220, 170, ${a})`;
      } else {
        ctx.fillStyle = `rgba(220, 230, 255, ${a})`;
      }
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();

      // bright cores get a soft glow
      if (s.r > 1.1) {
        ctx.beginPath();
        ctx.fillStyle = s.hueShift ? `rgba(255, 200, 140, ${a * 0.15})` : `rgba(180, 200, 255, ${a * 0.18})`;
        ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // shooting stars
    spawnShootingStar();
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      ss.x += ss.vx;
      ss.y += ss.vy;
      ss.life++;
      const lifeT = ss.life / ss.maxLife;
      const a = Math.sin(Math.PI * lifeT);

      // trail
      const grad = ctx.createLinearGradient(ss.x - ss.vx * 20, ss.y - ss.vy * 20, ss.x, ss.y);
      grad.addColorStop(0, 'rgba(180, 210, 255, 0)');
      grad.addColorStop(1, `rgba(220, 235, 255, ${a * 0.9})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(ss.x - ss.vx * 20, ss.y - ss.vy * 20);
      ctx.lineTo(ss.x, ss.y);
      ctx.stroke();

      // head
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
      ctx.arc(ss.x, ss.y, 1.6, 0, Math.PI * 2);
      ctx.fill();

      if (ss.life >= ss.maxLife || ss.x > w + 50 || ss.y > h + 50) shootingStars.splice(i, 1);
    }

    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(tick);
})();
