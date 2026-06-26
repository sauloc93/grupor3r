'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Preencha todos os campos'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); window.location.href = '/dashboard'; }, 1200);
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#F5F7FA' }}>
      <div className="hidden lg:flex w-1/2 flex-col p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003B7A 0%, #0055B3 60%, #0066CC 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: '#C8962C', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: '#C8962C', transform: 'translate(-30%, 30%)' }} />
        <div className="flex items-center gap-4 mb-16 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
            <span className="text-white font-black text-2xl">R3</span>
          </div>
          <div>
            <p className="text-white font-bold text-xl leading-tight">Grupo R3R</p>
            <p className="text-blue-200 text-sm">Crédito & Consórcios</p>
          </div>
        </div>
        <div className="relative z-10 mt-auto">
          <h1 className="text-4xl font-black text-white leading-tight mb-4">Crédito sob medida<br /><span style={{ color: '#E8B84B' }}>para cada objetivo.</span></h1>
          <p className="text-blue-100 text-lg leading-relaxed mb-12">A plataforma completa do Grupo R3R para gestão de consórcios contemplados, cartas programadas, home equity e capital de giro.</p>
          <div className="grid grid-cols-3 gap-6">
            {[{ icon: Users, value: '2.400+', label: 'Clientes Ativos' }, { icon: TrendingUp, value: 'R$ 480M', label: 'Em Crédito' }, { icon: Shield, value: '98%', label: 'Satisfação' }].map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-white/10 rounded-2xl p-4">
                <Icon size={20} className="text-blue-200 mb-2" />
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-blue-200 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900">Bem-vindo!</h2>
            <p className="text-gray-500 mt-2">Acesse sua conta para continuar</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">E-mail</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="w-full pl-11 pr-4 py-3.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-11 pr-12 py-3.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60" style={{ background: loading ? '#6B7280' : '#003B7A' }}>
              {loading ? <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> : <>Entrar <ArrowRight size={18} /></>}
            </button>
          </form>
          <div className="mt-12 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">© 2024 Grupo R3R · Todos os direitos reservados</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Shield size={11} className="text-gray-400" />
              <p className="text-xs text-gray-400">Conexão segura SSL/TLS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
