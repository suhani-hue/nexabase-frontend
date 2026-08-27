import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Check, Code2, Database, Github, HardDrive, KeyRound,
  LockKeyhole, Menu, RefreshCw, ShieldCheck, Sparkles, X, Globe,
  Cpu, GitBranch, Activity, Layers, Webhook, Terminal, Rocket, Boxes, Gauge,
} from 'lucide-react';

const Hero3D = lazy(() => import('./components/Hero3D'));

const navItems = ['Features', 'Developers', 'Pricing', 'Docs'];

const features = [
  { icon: KeyRound, title: 'Authentication', text: 'Password, OAuth, and magic-link flows that just work — no auth server to maintain.' },
  { icon: Database, title: 'Database', text: 'A real database with instant APIs, row-level security, and branching.' },
  { icon: HardDrive, title: 'Storage', text: 'Upload, transform, and serve files globally with a CDN-backed object store.' },
  { icon: ShieldCheck, title: 'Security', text: 'Row-level policies, signed URLs, and rate limiting enforced at the edge.' },
  { icon: Code2, title: 'REST API', text: 'Every table gets a typed, auto-generated REST endpoint instantly.' },
  { icon: RefreshCw, title: 'Token Refresh', text: 'Silent session refresh keeps users signed in without a single line of code.' },
  { icon: Globe, title: 'Edge Functions', text: 'Deploy serverless functions that run 50ms from every user.' },
  { icon: GitBranch, title: 'Database Branching', text: 'Spin up a full database copy per pull request, then merge or discard.' },
  { icon: Activity, title: 'Realtime', text: 'Subscribe to any row, broadcast presence, and sync state over websockets.' },
  { icon: Webhook, title: 'Webhooks', text: 'Fire signed webhooks on any data event with automatic retries.' },
  { icon: Cpu, title: 'Vector AI', text: 'Store embeddings and run similarity search in the same database as your app.' },
  { icon: Gauge, title: 'Observability', text: 'Logs, traces, and query analytics streamed live from every request.' },
];

const stats = [
  { value: 99.99, suffix: '%', label: 'Uptime SLA' },
  { value: 30, prefix: '<', suffix: 'ms', label: 'Edge latency' },
  { value: 12, suffix: 'M+', label: 'Daily requests' },
  { value: 180, suffix: '+', label: 'Edge regions' },
];

const plans = [
  { name: 'Free', price: '$0', period: 'forever', tagline: 'For trying things out', features: ['10,000 API requests / mo', '500 MB database', '1 GB storage', 'Community support'], cta: 'Start free', featured: false },
  { name: 'Pro', price: '$29', period: '/ month', tagline: 'For serious builders', features: ['Unlimited API requests', '100 GB database', '100 GB storage', 'Priority support', 'Database branching', 'Edge functions'], cta: 'Start Pro trial', featured: true },
];

function useCounter(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function StatCounter({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const value = useCounter(stat.value, inView);
  const display = stat.value % 1 === 0 ? Math.round(value).toString() : value.toFixed(2);
  return (
    <motion.div ref={ref} className="stat"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <strong>{stat.prefix}{display}{stat.suffix}</strong>
      <span>{stat.label}</span>
    </motion.div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section id={id} className={className}
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="site-shell">
      <div className="grain" />
      <div className="bg-orbs"><span className="orb orb-purple" /><span className="orb orb-pink" /></div>

      <header className="navbar">
        <a className="brand" href="#top" aria-label="NexaBase home">
          <span className="brand-mark"><span /></span>
          <span>Nexa<span className="brand-light">Base</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
          <a href="https://github.com/suhani-hue/backend-for-apps" aria-label="GitHub"><Github size={15} /></a>
        </nav>
        <div className="nav-actions">
          <a className="login-link" href="#login">Log in</a>
          <a className="button button-small" href="#pricing">Start building <ArrowRight size={15} /></a>
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div className="mobile-menu"
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            >
              {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="top">
        <section className="hero" ref={heroRef}>
          <motion.div className="hero-bg-3d" style={{ opacity: heroOpacity }}>
            <Suspense fallback={<div className="sphere-fallback" />}>
              <Hero3D />
            </Suspense>
          </motion.div>
          <div className="hero-inner section-wrap">
            <motion.div className="hero-copy" style={{ y: heroY }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="eyebrow"><span className="status-dot" /> The backend for what&apos;s next</div>
              <h1>Build your future<br /><span className="gradient-text">backend</span> in minutes.</h1>
              <p className="hero-subtitle">NexaBase gives you auth, a database, and data storage in one simple API — powered by a live backend at <code>backend-for-apps.onrender.com</code>.</p>
              <div className="hero-actions">
                <a className="button" href="#pricing">Start building free <ArrowRight size={17} /></a>
                <a className="text-link" href="#docs">Read the docs <ArrowRight size={16} /></a>
              </div>
              <div className="trusted-row"><span>Trusted by builders at</span><strong>◎ orbit</strong><strong>northstar</strong><strong>⟡ radix</strong></div>
            </motion.div>
          </div>
        </section>

        <Section className="stats-section section-wrap" id="stats">
          <div className="stats-grid">
            {stats.map((stat, i) => <StatCounter key={stat.label} stat={stat} index={i} />)}
          </div>
        </Section>

        <Section className="features-section section-wrap" id="features">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><Sparkles size={12} /> Everything, connected</div>
              <h2>The essentials.<br /><span className="gradient-text">Beautifully simple.</span></h2>
            </div>
            <p>Powerful primitives that feel like they were made for your product — because they were.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.article className="feature-card" key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="card-icon"><Icon size={20} /></div>
                  <div className="card-body"><h3>{feature.title}</h3><p>{feature.text}</p></div>
                  <ArrowRight className="card-arrow" size={18} />
                </motion.article>
              );
            })}
          </div>
        </Section>

        <Section className="bento-section section-wrap" id="bento">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><Boxes size={12} /> One platform</div>
              <h2>Not a stack.<br /><span className="gradient-text">A single source of truth.</span></h2>
            </div>
            <p>Stop wiring together five services. NexaBase unifies the whole backend into one API surface.</p>
          </div>
          <div className="bento-grid">
            <motion.div className="bento bento-tall" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Terminal size={22} /><h3>One SDK, every primitive</h3><p>Auth, database, storage, realtime, and edge functions all live behind a single typed client.</p>
            </motion.div>
            <motion.div className="bento" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
              <Layers size={22} /><h3>Branch like code</h3><p>Database branches per PR. Isolate schema changes, run migrations, and merge when green.</p>
            </motion.div>
            <motion.div className="bento" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16 }}>
              <Globe size={22} /><h3>Global by default</h3><p>180+ edge regions. Your data and logic run close to every user, every time.</p>
            </motion.div>
            <motion.div className="bento bento-wide" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.24 }}>
              <Rocket size={22} /><h3>Ship in minutes, not sprints</h3><p>From signup to production in a single afternoon. No infra team, no YAML, no waiting.</p>
            </motion.div>
          </div>
        </Section>

        <Section className="developer-section section-wrap" id="developers">
          <div className="developer-copy">
            <div className="eyebrow"><span className="sparkle"><Sparkles size={13} /></span> Developer experience</div>
            <h2>From idea to<br /><span className="gradient-text">in production.</span></h2>
            <p>One SDK. One API. A thousand fewer things to worry about.</p>
            <a className="text-link" href="#docs">Explore the API <ArrowRight size={16} /></a>
          </div>
          <motion.div className="code-window" id="docs"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <div className="window-top">
              <div className="window-dots"><i /><i /><i /></div>
              <span>nexabase.ts</span>
              <span className="window-lock"><LockKeyhole size={13} /> secure</span>
            </div>
            <pre><code>{`import { NexaBase } from '@nexabase/sdk'

const nx = new NexaBase({
  url: 'https://backend-for-apps.onrender.com'
})

// register a user
const { userId } = await nx.auth.signUp({
  email: 'you@yourapp.com',
  password: '••••••••••'
})

// login
const { access_token } = await nx.auth.signIn({
  email: 'you@yourapp.com',
  password: '••••••••••'
})

// store any data
await nx.data.set({
  key: 'theme',
  value: { mode: 'dark', color: 'purple' }
})`}</code></pre>
            <div className="code-result">
              <span className="success-icon"><Check size={12} /></span>
              Request completed <span>201 Created</span>
            </div>
          </motion.div>
        </Section>

        <Section className="pricing-section section-wrap" id="pricing">
          <div className="pricing-heading">
            <div className="eyebrow">Simple, transparent pricing</div>
            <h2>Start free.<br /><span className="gradient-text">Scale when ready.</span></h2>
            <p>Everything you need to ship your next big thing.</p>
          </div>
          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <motion.article className={`price-card ${plan.featured ? 'price-featured' : ''}`} key={plan.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                {plan.featured && <div className="popular">Most popular</div>}
                <div className="price-top">
                  <span className="plan-name">{plan.name}</span>
                  <span className="plan-caption">{plan.tagline}</span>
                </div>
                <div className="price"><strong>{plan.price}</strong><span>{plan.period}</span></div>
                <p>{plan.featured ? 'More power for products ready to grow.' : 'Everything you need to bring an idea to life.'}</p>
                <a className={`button ${plan.featured ? '' : 'button-outline'}`} href="https://backend-for-apps.onrender.com">{plan.cta} <ArrowRight size={16} /></a>
                <ul>{plan.features.map((f) => <li key={f}><Check size={16} /> {f}</li>)}</ul>
              </motion.article>
            ))}
          </div>
        </Section>
      </main>

      <footer className="footer section-wrap">
        <a className="brand" href="#top"><span className="brand-mark"><span /></span><span>Nexa<span className="brand-light">Base</span></span></a>
        <p>Build the future, faster.</p>
        <div className="footer-links">
          <a href="#features">Features</a><a href="#docs">Docs</a><a href="#pricing">Pricing</a>
          <a href="https://github.com/suhani-hue/backend-for-apps" aria-label="GitHub"><Github size={17} /></a>
        </div>
        <div className="footer-bottom">
          <span>© 2077 NexaBase, Inc.</span>
          <span>Made for the next million builders.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;