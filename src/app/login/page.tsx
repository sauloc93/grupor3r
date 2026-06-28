'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('saulo17marques@gmail.com');
  const [senha, setSenha] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  function doLogin() {
    setLoading(true);
    setTimeout(() => router.push('/dashboard'), 700);
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0D1B2A',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        width: '400px', background: '#1A2F45',
        border: '1px solid #253D56', borderRadius: '14px',
        padding: '40px 36px',
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', color: '#B8973A', textAlign: 'center', letterSpacing: '2px', marginBottom: '4px' }}>R3R</div>
        <div style={{ textAlign: 'center', fontSize: '11px', color: '#A8A49C', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '32px' }}>Soluções Financeiras Estratégicas</div>
        <div style={{ fontSize: '18px', fontWeight: 600, color: '#EEE9E0', marginBottom: '20px', textAlign: 'center' }}>Acesso à Plataforma</div>

        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#A8A49C', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>E-mail</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com"
            style={{ width: '100%', padding: '8px 12px', background: '#162538', border: '1px solid #253D56', borderRadius: '10px', color: '#EEE9E0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#A8A49C', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>Senha</label>
          <div style={{ position: 'relative' }}>
            <input type={showPwd ? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doLogin()} placeholder="••••••••"
              style={{ width: '100%', padding: '8px 40px 8px 12px', background: '#162538', border: '1px solid #253D56', borderRadius: '10px', color: '#EEE9E0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
            <button onClick={() => setShowPwd(s => !s)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#686460', cursor: 'pointer', fontSize: '13px' }}>
              {showPwd ? 'ocultar' : 'mostrar'}
            </button>
          </div>
        </div>

        <button onClick={doLogin} disabled={loading}
          style={{ width: '100%', padding: '10px', background: loading ? '#8A6E28' : '#B8973A', color: '#0D1B2A', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          {loading ? 'Entrando...' : 'Entrar na Plataforma'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '11.5px', color: '#686460' }}>
          Grupo R3R · 25 anos no mercado financeiro
        </div>
      </div>
    </div>
  );
}
