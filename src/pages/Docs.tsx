import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/brand/Logo';
import { ArrowRight, Check } from 'lucide-react';

export default function Docs() {
  const navigate = useNavigate();

  const codeStyle = {
    background: '#0a0810',
    border: '1px solid rgba(168,85,247,0.2)',
    borderRadius: '12px',
    padding: '24px',
    fontFamily: 'monospace',
    fontSize: '13px',
    lineHeight: 1.8,
    color: '#e0dcec',
    overflow: 'auto',
    marginBottom: '32px',
  };

  const headingStyle = {
    fontSize: '22px',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    marginBottom: '12px',
    marginTop: '48px',
    color: '#f5f5f5',
  };

  const endpoints = [
    { method: 'POST', path: '/api/register', desc: 'Register a new user' },
    { method: 'POST', path: '/api/login', desc: 'Login and get tokens' },
    { method: 'POST', path: '/api/token/refresh', desc: 'Refresh access token' },
    { method: 'POST', path: '/api/logout', desc: 'Revoke refresh token' },
    { method: 'GET', path: '/api/me', desc: 'Get user profile' },
    { method: 'GET', path: '/api/me/data', desc: 'Get all stored data' },
    { method: 'POST', path: '/api/me/data', desc: 'Store a key/value item' },
    { method: 'PUT', path: '/api/me/data/:id', desc: 'Update a data item' },
    { method: 'DELETE', path: '/api/me/data/:id', desc: 'Delete a data item' },
  ];

  const methodColor = (method: string) => {
    if (method === 'GET') return '#4ade80';
    if (method === 'POST') return '#60a5fa';
    if (method === 'PUT') return '#fbbf24';
    if (method === 'DELETE') return '#f87171';
    return '#f5f5f5';
  };

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#f5f5f5' }}>

      {/* Navbar */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 32px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 40 }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Logo />
        </button>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{ color: '#85838d', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>Log in</button>
          <button onClick={() => navigate('/register')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', background: 'linear-gradient(100deg, #a855f7, #ec4899)', color: '#fff', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            Start free <ArrowRight size={14} />
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '100px', padding: '6px 14px', fontSize: '12px', color: '#c4b5fd', marginBottom: '20px' }}>
            API Reference
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1.1, marginBottom: '16px' }}>
            NexaBase <span className="text-gradient">Docs</span>
          </h1>
          <p style={{ color: '#8a8392', fontSize: '16px', lineHeight: 1.7, maxWidth: '600px' }}>
            Everything you need to integrate NexaBase into your app. Base URL:{' '}
            <code style={{ color: '#a855f7', fontFamily: 'monospace', fontSize: '14px' }}>
              https://backend-for-apps.onrender.com
            </code>
          </p>
        </div>

        {/* Quick start */}
        <h2 style={headingStyle}>Quick start</h2>
        <pre style={codeStyle}>
{`// 1. Register a user
const res = await fetch('https://backend-for-apps.onrender.com/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'Passw0rd!'
  })
})
// Returns: { message: 'Account created', userId: 1 }

// 2. Login
const login = await fetch('https://backend-for-apps.onrender.com/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'Passw0rd!'
  })
})
const { access_token, refresh_token } = await login.json()

// 3. Use protected endpoints
const me = await fetch('https://backend-for-apps.onrender.com/api/me', {
  headers: { Authorization: \`Bearer \${access_token}\` }
})
const { user } = await me.json()`}
        </pre>

        {/* All endpoints */}
        <h2 style={headingStyle}>API Endpoints</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
          {endpoints.map((ep) => (
            <div key={ep.path} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: methodColor(ep.method), fontSize: '11px', fontWeight: 700, fontFamily: 'monospace', minWidth: '60px' }}>{ep.method}</span>
              <code style={{ color: '#c4b5fd', fontSize: '13px', fontFamily: 'monospace', flex: 1 }}>{ep.path}</code>
              <span style={{ color: '#8a8392', fontSize: '12px' }}>{ep.desc}</span>
            </div>
          ))}
        </div>

        {/* Authentication */}
        <h2 style={headingStyle}>Authentication</h2>
        <p style={{ color: '#8a8392', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
          All protected endpoints require a Bearer token in the Authorization header.
        </p>
        <pre style={codeStyle}>
{`// Add this header to every protected request
headers: {
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
}

// Access tokens expire in 15 minutes
// Use refresh token to get a new one:
const refresh = await fetch('.../api/token/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refresh_token: 'YOUR_REFRESH_TOKEN' })
})
const { access_token } = await refresh.json()`}
        </pre>

        {/* Data storage */}
        <h2 style={headingStyle}>Data Storage</h2>
        <p style={{ color: '#8a8392', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
          Store any JSON value per user with a simple key/value API.
        </p>
        <pre style={codeStyle}>
{`// Store a value
await fetch('.../api/me/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TOKEN'
  },
  body: JSON.stringify({
    key: 'settings',
    value: { theme: 'dark', language: 'en' }
  })
})

// Get all stored data
const res = await fetch('.../api/me/data', {
  headers: { 'Authorization': 'Bearer TOKEN' }
})
const { items } = await res.json()
// items = [{ id, key, value, createdAt }]`}
        </pre>

        {/* Password rules */}
        <h2 style={headingStyle}>Password Requirements</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
          {['At least 8 characters', 'One uppercase letter (A-Z)', 'One lowercase letter (a-z)', 'One number (0-9)'].map((rule) => (
            <div key={rule} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#b0abb8' }}>
              <Check size={14} style={{ color: '#4ade80' }} /> {rule}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '12px' }}>
            Ready to build?
          </h2>
          <p style={{ color: '#8a8392', fontSize: '14px', marginBottom: '28px' }}>
            Create your free account and start building in minutes.
          </p>
          <button onClick={() => navigate('/register')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '12px', background: 'linear-gradient(100deg, #a855f7, #ec4899)', color: '#fff', fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            Get started free <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}