import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Check, Code2, Database, Github, HardDrive, KeyRound,
  LockKeyhole, RefreshCw, ShieldCheck, Sparkles, Globe,
  Cpu, GitBranch, Activity, Webhook, Terminal, Rocket, Layers, Gauge, Boxes,
} from 'lucide-react';
import { Hero3D } from '../components/Hero3D';
import { Logo } from '../components/brand/Logo';

const features = [
  { icon: KeyRound, title: 'Authentication', text: 'Password and JWT flows that just work.' },
  { icon: Database, title: 'Database', text: 'A real database with instant APIs.' },
  { icon: HardDrive, title: 'Storage', text: 'Upload and serve files globally.' },
  { icon: ShieldCheck, title: 'Security', text: 'bcrypt passwords and token expiry.' },
  { icon: Code2, title: 'REST API', text: 'Clean endpoints for every resource.' },
  { icon: RefreshCw, title: 'Token Refresh', text: 'Silent session refresh built in.' },
  { icon: Globe, title: 'Edge Ready', text: 'Deploy anywhere in the world.' },
  { icon: GitBranch, title: 'Open Source', text: 'Fork it, own it, extend it.' },
  { icon: Activity, title: 'Realtime', text: 'Live data sync coming soon.' },
  { icon: Webhook, title: 'Webhooks', text: 'Fire events on any data change.' },
  { icon: Cpu, title: 'AI Ready', text: 'Store embeddings and run search.' },
  { icon: Gauge, title: 'Observability', text: 'Logs and analytics built in.' },
];

const stats = [
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '<30ms', label: 'Edge latency' },
  { value: '12M+', label: 'Daily requests' },
  { value: '180+', label: 'Edge regions' },
];

const plans = [
  {
    name: 'Free', price: '$0', period: 'forever',
    tagline: 'For trying things out',
    features: ['10,000 API requests / mo', '500 MB database', '1 GB storage', 'Community support'],
    cta: 'Start free', featured: false,
  },
  {
    name: 'Pro', price: '$29', period: '/ month',
    tagline: 'For serious builders',
    features: ['Unlimited API requests', '100 GB database', '100 GB storage', 'Priority support', 'Edge functions'],
    cta: 'Start Pro trial', featured: true,
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#f5f5f5' }}>

      {/* Navbar */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 32px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />
          <nav style={{ display: 'flex', gap: '30px' }}>
            {['Features', 'Docs', 'Pricing'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ color: '#85838d', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#85838d')}
              >{item}</a>
            ))}
            <button onClick={() => navigate('/docs')} style={{ color: '#85838d', fontSize: '13px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>Developers</button>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="https://github.com/suhani-hue/backend-for-apps" target="_blank" rel="noreferrer" style={{ color: '#85838d' }}>
              <Github size={18} />
            </a>
            <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#85838d', fontSize: '13px', fontWeight: 500, cursor: 'pointer', padding: '8px 12px' }}>
              Log in
            </button>
            <button onClick={() => navigate('/register')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', background: 'linear-gradient(100deg, #a855f7, #ec4899)', color: '#fff', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              Start building <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Hero3D />

      {/* Stats */}
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 32px 80px' }}>
        <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: '16px', overflow: 'hidden', background: 'rgba(10,8,16,0.4)', backdropFilter: 'blur(12px)' }}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ padding: '32px 28px', borderRight: i < 3 ? '1px solid rgba(168,85,247,0.12)' : 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <strong style={{ fontSize: '36px', fontWeight: 700, background: 'linear-gradient(135deg, #fff, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</strong>
              <span style={{ color: '#8a8392', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.14em', fontWeight: 600 }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Features */}
      <div id="features" style={{ maxWidth: '1160px', margin: '0 auto', padding: '60px 32px 120px' }}>
        <motion.div style={{ marginBottom: '56px' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', color: '#b8a8d4', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '11px', fontWeight: 700, padding: '7px 14px', borderRadius: '100px', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)' }}>
            <Sparkles size={12} /> Everything, connected
          </div>
          <h2 style={{ margin: '20px 0 0', fontSize: 'clamp(38px, 4.5vw, 60px)', lineHeight: 1.04, letterSpacing: '-0.06em', fontWeight: 700 }}>
            The essentials.<br /><span className="text-gradient">Beautifully simple.</span>
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title}
                style={{ padding: '28px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(20,16,30,0.6), rgba(8,6,14,0.6))', backdropFilter: 'blur(16px)', cursor: 'pointer' }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6, borderColor: 'rgba(168,85,247,0.4)' }}
              >
                <div style={{ width: '44px', height: '44px', display: 'grid', placeItems: 'center', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.15))', color: '#c4b5fd', border: '1px solid rgba(168,85,247,0.2)', marginBottom: '16px' }}>
                  <Icon size={20} />
                </div>
                <h3 style={{ margin: '0 0 6px', fontSize: '17px', letterSpacing: '-0.02em', fontWeight: 600 }}>{feature.title}</h3>
                <p style={{ margin: 0, color: '#8a8392', fontSize: '13px', lineHeight: 1.6 }}>{feature.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Developer */}
      <div id="developers" style={{ maxWidth: '1160px', margin: '0 auto', padding: '60px 32px 140px', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '80px', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', color: '#b8a8d4', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '11px', fontWeight: 700, padding: '7px 14px', borderRadius: '100px', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)' }}>
            <Sparkles size={13} /> Developer experience
          </div>
          <h2 style={{ margin: '20px 0 26px', fontSize: 'clamp(38px, 4.5vw, 60px)', lineHeight: 1.04, letterSpacing: '-0.06em', fontWeight: 700 }}>
            From idea to<br /><span className="text-gradient">in production.</span>
          </h2>
          <p style={{ color: '#8a8392', fontSize: '14px', lineHeight: 1.8, maxWidth: '380px' }}>One SDK. One API. A thousand fewer things to worry about.</p>
          <button onClick={() => navigate('/docs')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', color: '#e4e0eb', fontSize: '13px', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
            Explore the API <ArrowRight size={16} />
          </button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ overflow: 'hidden', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '14px', background: '#0a0810' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', height: '46px', padding: '0 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#77727e', fontSize: '11px', fontFamily: 'monospace' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#ff5f57','#ffbd2e','#28c840'].map((c) => <i key={c} style={{ display: 'block', width: '7px', height: '7px', borderRadius: '50%', background: c }} />)}
            </div>
            <span>nexabase.ts</span>
            <span style={{ marginLeft: 'auto', color: '#53c5a3', fontSize: '9px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <LockKeyhole size={11} /> secure
            </span>
          </div>
          <pre style={{ margin: 0, padding: '26px 30px', color: '#e0dcec', fontSize: '13px', lineHeight: 1.8, fontFamily: 'monospace', overflow: 'auto' }}>
{`import { NexaBase } from '@nexabase/sdk'

const nx = new NexaBase({
  url: 'https://backend-for-apps.onrender.com'
})

// register a user
const { userId } = await nx.auth.signUp({
  email: 'you@yourapp.com',
  password: '••••••••••'
})

// store any data
await nx.data.set({
  key: 'theme',
  value: { mode: 'dark' }
})`}
          </pre>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', color: '#817c89', fontSize: '10px', fontFamily: 'monospace' }}>
            <span style={{ width: '18px', height: '18px', display: 'grid', placeItems: 'center', borderRadius: '50%', background: '#16493f', color: '#65e1bd' }}><Check size={12} /></span>
            Request completed <span style={{ marginLeft: 'auto', color: '#51c09f' }}>201 Created</span>
          </div>
        </motion.div>
      </div>

      {/* Pricing */}
      <div id="pricing" style={{ maxWidth: '1160px', margin: '0 auto', padding: '60px 32px 140px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.div style={{ marginBottom: '50px' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ fontSize: 'clamp(38px, 4.5vw, 60px)', lineHeight: 1.04, letterSpacing: '-0.06em', fontWeight: 700 }}>
            Start free.<br /><span className="text-gradient">Scale when ready.</span>
          </h2>
          <p style={{ color: '#8a8392', fontSize: '14px', marginTop: '16px' }}>Everything you need to ship your next big thing.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '760px' }}>
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              style={{ position: 'relative', padding: '32px 28px', border: plan.featured ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', background: plan.featured ? 'linear-gradient(145deg, rgba(168,85,247,0.15), rgba(14,10,20,0.8))' : 'rgba(10,8,16,0.6)', backdropFilter: 'blur(16px)' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              {plan.featured && (
                <div style={{ position: 'absolute', top: '-12px', right: '22px', padding: '6px 12px', borderRadius: '6px', color: '#fff', background: 'linear-gradient(90deg, #a855f7, #ec4899)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Most popular</div>
              )}
              <div style={{ fontWeight: 700, fontSize: '18px' }}>{plan.name}</div>
              <div style={{ color: '#726d79', fontSize: '12px', marginTop: '6px' }}>{plan.tagline}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '32px 0 10px' }}>
                <strong style={{ fontSize: '44px', letterSpacing: '-0.07em', fontWeight: 700 }}>{plan.price}</strong>
                <span style={{ color: '#716c79', fontSize: '13px' }}>{plan.period}</span>
              </div>
              <button onClick={() => navigate('/register')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', margin: '22px 0 28px', padding: '14px 20px', borderRadius: '10px', color: '#fff', background: plan.featured ? 'linear-gradient(100deg, #a855f7, #ec4899)' : 'transparent', border: plan.featured ? 'none' : '1px solid #413b4d', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                {plan.cta} <ArrowRight size={16} />
              </button>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '14px', padding: '20px 0 0', margin: 0, borderTop: '1px solid rgba(255,255,255,0.08)', color: '#b0abb8', fontSize: '13px' }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check size={16} style={{ color: '#ec4899', flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ maxWidth: '1160px', margin: '0 auto', padding: '40px 32px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <Logo />
        <p style={{ color: '#615c68', fontSize: '12px' }}>Build the future, faster.</p>
        <div style={{ display: 'flex', gap: '24px', color: '#807b89', fontSize: '12px', alignItems: 'center' }}>
          <a href="#features" style={{ color: '#807b89', textDecoration: 'none' }}>Features</a>
          <button onClick={() => navigate('/docs')} style={{ color: '#807b89', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Docs</button>
          <a href="#pricing" style={{ color: '#807b89', textDecoration: 'none' }}>Pricing</a>
          <a href="https://github.com/suhani-hue/backend-for-apps" target="_blank" rel="noreferrer" style={{ color: '#807b89' }}><Github size={17} /></a>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#4f4b55', fontSize: '11px' }}>
          <span>© 2077 NexaBase, Inc.</span>
          <span>Made for the next million builders.</span>
        </div>
      </footer>
    </div>
  );
}