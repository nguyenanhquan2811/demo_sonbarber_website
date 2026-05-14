'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import '../admin.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Email hoặc mật khẩu không đúng.');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '16px' }}>🔐</div>
        <h1>Admin Login</h1>
        <p>Đăng nhập để quản lý SonBarber</p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem', color: '#475569' }}>
              Email
            </label>
            <input
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sonbarber.com"
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem', color: '#475569' }}>
              Mật khẩu
            </label>
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div style={{
              padding: '10px 14px',
              background: '#fee2e2',
              color: '#dc2626',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '16px',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
            disabled={loading}
          >
            {loading ? '⏳ Đang đăng nhập...' : '🔑 Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}
