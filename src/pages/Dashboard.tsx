import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/brand/Logo';
import { LogOut, Plus, Trash2, User, Database, Key } from 'lucide-react';

const API = 'https://backend-for-apps.onrender.com/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: number; email: string; createdAt: string } | null>(null);
  const [items, setItems] = useState<{ id: number; key: string; value: unknown }[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [meRes, dataRes] = await Promise.all([
        fetch(`${API}/me`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API}/me/data`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (meRes.status === 401) { navigate('/login'); return; }

      const meData = await meRes.json();
      const dataData = await dataRes.json();

      setUser(meData.user);
      setItems(dataData.items || []);
    } catch {
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!newKey.trim() || !newValue.trim()) return;
    setAdding(true);
    try {
      let parsedValue;
      try { parsedValue = JSON.parse(newValue); } catch { parsedValue = newValue; }

      const res = await fetch(`${API}/me/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ key: newKey, value: parsedValue }),
      });

      if (res.ok) {
        setNewKey('');
        setNewValue('');
        fetchData();
      }
    } finally {
      setAdding(false);
    }
  };

  const deleteItem = async (id: number) => {
    await fetch(`${API}/me/data/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      await fetch(`${API}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const inputStyle = {
    padding: '10px 14px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f5f5f5',
    fontSize: '13px',
    outline: 'none',
  };

  if (loading) {
    return (
      <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#a855f7', fontSize: '16px' }}>Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#f5f5f5' }}>

      {/* Navbar */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 32px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 40 }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Logo />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#8a8392', fontSize: '13px' }}>{user?.email}</span>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#f5f5f5', fontSize: '13px', cursor: 'pointer' }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 32px' }}>

        {/* Welcome */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '8px' }}>
            Welcome back! 👋
          </h1>
          <p style={{ color: '#8a8392', fontSize: '14px' }}>Manage your data and account settings</p>
        </div>

        {/* Stats cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
          <div style={{ padding: '24px', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '16px', background: 'rgba(168,85,247,0.05)' }}>
            <User size={20} style={{ color: '#a855f7', marginBottom: '12px' }} />
            <div style={{ fontSize: '13px', color: '#8a8392', marginBottom: '4px' }}>Account</div>
            <div style={{ fontSize: '15px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
          </div>
          <div style={{ padding: '24px', border: '1px solid rgba(236,72,153,0.2)', borderRadius: '16px', background: 'rgba(236,72,153,0.05)' }}>
            <Database size={20} style={{ color: '#ec4899', marginBottom: '12px' }} />
            <div style={{ fontSize: '13px', color: '#8a8392', marginBottom: '4px' }}>Stored items</div>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>{items.length}</div>
          </div>
          <div style={{ padding: '24px', border: '1px solid rgba(192,132,252,0.2)', borderRadius: '16px', background: 'rgba(192,132,252,0.05)' }}>
            <Key size={20} style={{ color: '#c084fc', marginBottom: '12px' }} />
            <div style={{ fontSize: '13px', color: '#8a8392', marginBottom: '4px' }}>User ID</div>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>#{user?.id}</div>
          </div>
        </div>

        {/* Add new item */}
        <div style={{ padding: '28px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', background: 'rgba(10,8,16,0.6)', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Store new data</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="Key (e.g. theme)"
              style={{ ...inputStyle, flex: '1', minWidth: '140px' }}
              onFocus={e => (e.target.style.borderColor = 'rgba(168,85,247,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
            <input
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder='Value (e.g. "dark" or {"mode":"dark"})'
              style={{ ...inputStyle, flex: '2', minWidth: '200px' }}
              onFocus={e => (e.target.style.borderColor = 'rgba(168,85,247,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              onKeyDown={(e) => e.key === 'Enter' && addItem()}
            />
            <button
              onClick={addItem}
              disabled={adding}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '8px', background: 'linear-gradient(100deg, #a855f7, #ec4899)', color: '#fff', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              <Plus size={16} /> {adding ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>

        {/* Data items */}
        <div style={{ padding: '28px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', background: 'rgba(10,8,16,0.6)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Your data</h2>

          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#8a8392' }}>
              <Database size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <p>No data stored yet. Add your first item above!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#a855f7', fontSize: '13px', fontWeight: 600, minWidth: '120px', fontFamily: 'monospace' }}>{item.key}</span>
                  <span style={{ color: '#8a8392', fontSize: '12px', fontFamily: 'monospace', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {typeof item.value === 'object' ? JSON.stringify(item.value) : String(item.value)}
                  </span>
                  <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a8392', padding: '4px' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8a8392')}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}