'use client';
import { useState } from 'react';

const cartas = [
  { id: 'CC-0012', valor: 480000, admin: 'Itaú Consórcio', lance: 32, prazo: 120, tipo: 'Imóvel', icon: '🏠' },
  { id: 'CC-0018', valor: 750000, admin: 'Porto Seguro', lance: 28, prazo: 90, tipo: 'Imóvel', icon: '🏠' },
  { id: 'CC-0023', valor: 85000, admin: 'BB Consórcio', lance: 40, prazo: 60, tipo: 'Veículo', icon: '🚗' },
  { id: 'CC-0031', valor: 320000, admin: 'Caixa', lance: 35, prazo: 150, tipo: 'Imóvel', icon: '🏠' },
  { id: 'CC-0045', valor: 45000, admin: 'Bradesco', lance: 50, prazo: 36, tipo: 'Serviço', icon: '🔧' },
];

const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

export default function ContemPladosPage() {
  const [filter, setFilter] = useState('Todos');
  const [hover, setHover] = useState<string | null>(null);

  const filtered = cartas.filter(c => filter === 'Todos' || c.tipo === filter);

  return (
    <div style={{ padding: '32px', fontFamily: "'DM Sans', sans-serif", background: '#F5F7FA', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Cartas Contempladas</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Cartas disponíveis para uso imediato</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Todos', 'Imóvel', 'Veículo', 'Serviço'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 16px', border: '1px solid', borderColor: filter === f ? '#B8973A' : '#e2e8f0', background: filter === f ? '#B8973A' : '#fff', color: filter === f ? '#fff' : '#64748b', borderRadius: '8px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '14px 18px', marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ fontSize: '18px' }}>✅</span>
        <div style={{ fontSize: '13px', color: '#166534', fontWeight: 600 }}>{filtered.length} cartas disponíveis para uso imediato — solicite a alocação para o cliente desejado.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {filtered.map(c => (
          <div key={c.id}
            onMouseEnter={() => setHover(c.id)}
            onMouseLeave={() => setHover(null)}
            style={{ background: '#fff', borderRadius: '14px', border: `1px solid ${hover === c.id ? '#B8973A' : '#e2e8f0'}`, padding: '24px', cursor: 'pointer', transform: hover === c.id ? 'translateY(-2px)' : 'none', boxShadow: hover === c.id ? '0 4px 16px rgba(184,151,58,0.15)' : 'none', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{c.icon}</div>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: "'DM Mono', monospace" }}>{c.id}</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#B8973A', fontFamily: "'Playfair Display', serif", marginBottom: '4px' }}>{fmt(c.valor)}</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>{c.admin}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {[{ label: 'Lance', value: c.lance + '%' }, { label: 'Prazo', value: c.prazo + 'm' }, { label: 'Tipo', value: c.tipo }].map(item => (
                <div key={item.label} style={{ background: '#f8fafc', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{item.value}</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px', textTransform: 'uppercase' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <button style={{ marginTop: '16px', width: '100%', padding: '10px', background: hover === c.id ? '#B8973A' : '#f8fafc', color: hover === c.id ? '#fff' : '#475569', border: '1px solid', borderColor: hover === c.id ? '#B8973A' : '#e2e8f0', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>Alocar Carta</button>
          </div>
        ))}
      </div>
    </div>
  );
}
