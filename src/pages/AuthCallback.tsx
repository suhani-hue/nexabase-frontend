import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const error = params.get('error');

    if (error) {
      navigate('/login?error=' + error);
      return;
    }

    if (accessToken && refreshToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f5f5f5' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid rgba(168,85,247,0.3)', borderTop: '3px solid #a855f7', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#8a8392', fontSize: '14px' }}>Completing sign in...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}