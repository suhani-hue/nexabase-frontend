import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

const DEMO_URL = "https://backend-for-apps.onrender.com";

const orbitChips = [
  { label: "Auth", top: "12%", left: "6%", delay: "0s" },
  { label: "Postgres", top: "70%", left: "2%", delay: "1.2s" },
  { label: "Storage", top: "18%", left: "78%", delay: "0.6s" },
  { label: "Functions", top: "76%", left: "72%", delay: "1.8s" },
];

export function Hero3D() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const node = sceneRef.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, idle = 0;
    const render = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      node.style.transform = `perspective(1200px) rotateY(${cx * 10}deg) rotateX(${-cy * 8}deg) translate3d(0,0,0)`;
      node.style.setProperty("--px", `${cx * 26}px`);
      node.style.setProperty("--py", `${cy * 26}px`);
      idle = Math.abs(tx - cx) < 0.0008 && Math.abs(ty - cy) < 0.0008 ? idle + 1 : 0;
      if (idle > 30) { raf = 0; node.style.willChange = "auto"; return; }
      raf = requestAnimationFrame(render);
    };
    const start = () => {
      if (raf) return;
      idle = 0;
      node.style.willChange = "transform";
      raf = requestAnimationFrame(render);
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      start();
    };
    const onLeave = () => { tx = 0; ty = 0; start(); };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const copyDemo = async () => {
    try {
      await navigator.clipboard.writeText(DEMO_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '10rem', paddingBottom: '4rem' }}>
      <div className="grid-lines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div className="bg-halo" style={{ position: 'absolute', top: '-10rem', left: '50%', transform: 'translateX(-50%)', width: '46rem', height: '46rem', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

        <div>
          <span className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '100px', padding: '6px 14px', fontSize: '12px', color: '#8a8392' }}>
            <span className="animate-pulse-glow" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7', display: 'inline-block' }} />
            Early preview · v0.9
          </span>

          <h1 style={{ margin: '24px 0 20px', fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1.05, fontWeight: 700, letterSpacing: '-0.04em' }}>
            Build your future <span className="text-gradient">backend</span> in minutes.
          </h1>

          <p style={{ color: '#8a8392', fontSize: '16px', lineHeight: 1.7, maxWidth: '440px', margin: '0 0 32px' }}>
            Nexabase gives you auth, a database, and data storage in one simple API — zero infrastructure babysitting.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={DEMO_URL + '/health'} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '14px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', background: 'linear-gradient(100deg, #a855f7, #ec4899)', color: '#fff' }}>
              Open demo
            </a>
            <a href="#developers" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '14px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#f5f5f5' }}>
              View docs
            </a>
          </div>

          <button onClick={copyDemo} style={{ marginTop: '28px', display: 'flex', width: '100%', maxWidth: '420px', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontFamily: 'monospace', fontSize: '12px', color: '#f5f5f5', textAlign: 'left' }}>
            <span style={{ color: '#8a8392' }}>Live demo:</span>
            <span style={{ color: '#a855f7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{DEMO_URL}</span>
            <span style={{ color: '#8a8392', marginLeft: 'auto' }}>
              {copied ? <Check style={{ width: '16px', height: '16px', color: '#a855f7' }} /> : <Copy style={{ width: '16px', height: '16px' }} />}
            </span>
          </button>
        </div>

        {/* 3D Sphere Scene */}
        <div ref={sceneRef} style={{ position: 'relative', aspectRatio: '1', width: '100%', maxWidth: '520px', margin: '0 auto', transformStyle: 'preserve-3d' }}>

          {/* Outer rings */}
          <div className="animate-spin-slow" style={{ position: 'absolute', inset: '20px', borderRadius: '50%', border: '1px solid rgba(168,85,247,0.2)' }} />
          <div className="animate-spin-slow" style={{ position: 'absolute', inset: '60px', borderRadius: '50%', border: '1px solid rgba(236,72,153,0.2)', animationDirection: 'reverse' }} />
          <div className="animate-spin-slow" style={{ position: 'absolute', inset: '100px', borderRadius: '50%', border: '1px solid rgba(192,132,252,0.15)', animationDuration: '25s' }} />

          {/* Main glowing sphere */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="animate-float-slow" style={{ position: 'relative', width: '220px', height: '220px' }}>
              {/* Outer glow */}
              <div style={{ position: 'absolute', inset: '-30px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(168,85,247,0.1) 50%, transparent 70%)', filter: 'blur(20px)' }} />
              {/* Main sphere */}
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #d8b4fe, #9333ea 40%, #581c87 75%, #3b0764)', boxShadow: '0 0 60px rgba(168,85,247,0.6), 0 0 120px rgba(168,85,247,0.3), inset 0 0 40px rgba(0,0,0,0.5)' }} />
              {/* Shine */}
              <div style={{ position: 'absolute', top: '15%', left: '20%', width: '35%', height: '20%', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', filter: 'blur(8px)', transform: 'rotate(-30deg)' }} />
              {/* Pink accent */}
              <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: '25%', height: '15%', borderRadius: '50%', background: 'rgba(236,72,153,0.4)', filter: 'blur(10px)' }} />
            </div>
          </div>

          {/* Floating orbit chips */}
          {orbitChips.map((chip) => (
            <div key={chip.label} className="glass animate-float" style={{ position: 'absolute', top: chip.top, left: chip.left, animationDelay: chip.delay, borderRadius: '100px', padding: '6px 14px', fontSize: '12px', fontWeight: 500, color: '#f5f5f5', border: '1px solid rgba(168,85,247,0.3)', background: 'rgba(168,85,247,0.1)', backdropFilter: 'blur(12px)' }}>
              {chip.label}
            </div>
          ))}

          {/* Small glowing dots */}
          {[0,1,2,3,4,5].map((i) => (
            <div key={i} className="animate-pulse-glow" style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '50%', background: i % 2 === 0 ? '#a855f7' : '#ec4899', top: `${20 + i * 12}%`, right: `${5 + (i % 3) * 8}%`, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero3D;