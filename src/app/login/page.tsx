'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Preencha todos os campos'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { window.location.href = '/dashboard'; }, 1200);
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 12px', paddingLeft: '36px',
    fontSize: '14px', background: '#F8FAFC',
    border: '1px solid #E2E8F0', borderRadius: '8px',
    color: '#0F172A', outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '900px', gap: '0' }}>
        {/* Left branding */}
        <div style={{ flex: 1, padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#003B7A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '18px', color: '#fff' }}>R3R</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '30px', color: '#0F172A', lineHeight: 1.25, marginBottom: '14px' }}>
            Soluções Financeiras<br />Estratégicas
          </h1>
          <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6, marginBottom: '32px', maxWidth: '340px' }}>
            Plataforma completa para gestão de consórcios, crédito e clientes do Grupo R3R.
          </p>
          {[
            { label: 'Consórcio Contemplado', desc: 'Acesso imediato ao crédito', color: '#003B7A' },
            { label: 'Home Equity', desc: 'A partir de 0,99% a.m.', color: '#C8962C' },
            { label: 'Capital de Giro', desc: 'Para empresas de todos os portes', color: '#16A34A' },
          ].map(({ label, desc, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '999px', background: color, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#0F172A' }}>{label}</p>
                <p style={{ fontSize: '12px', color: '#64748B' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right form */}
        <div style={{ width: '400px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '44px 40px', boxShadow: '0 8px 40px rgba(0,0,0,.06)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '22px', color: '#0F172A', marginBottom: '6px' }}>Acesso à Plataforma</h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '28px' }}>Entre com suas credenciais</p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {error && (
              <div style={{ background: 'var(--er-bg)', border: '1px solid var(--er-bd)', color: 'var(--er-fg)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px' }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>E-mail</label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" style={inp} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Senha</label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ ...inp, paddingRight: '40px' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '11px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer', fontSize: '12.5px', color: '#64748B' }}>
                <input type="checkbox" style={{ accentColor: '#003B7A', width: '14px', height: '14px' }} />
                Manter conectado
              </label>
              <a href="#" style={{ fontSize: '12.5px', color: '#003B7A', textDecoration: 'none', fontWeight: 500 }}>Esqueceu a senha?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '12px', borderRadius: '9px', fontWeight: 600, fontSize: '14px', fontFamily: "'DM Sans', sans-serif", background: '#003B7A', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.8 : 1 }}
            >
              {loading ? (
                <svg style={{ animation: 'spin 1s linear infinite', width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24">
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : <>Entrar na Plataforma <ArrowRight size={16} /></>}
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Shield size={11} style={{ color: '#CBD5E1' }} />
            <p style={{ fontSize: '11px', color: '#CBD5E1' }}>Conexão segura · © 2025 Grupo R3R</p>
          </div>
        </div>
      </div>
    </div>
  );
}
