'use client';
import { useState } from 'react';

const etapas = ['Captação', 'Qualificação', 'Proposta', 'Análise', 'Fechamento', 'Pós-venda'];
const etapaColor: Record<string, string> = { 'Captação': '#6b7280', 'Qualificação': '#b8973a', 'Proposta': '#1d4ed8', 'Análise': '#7c3aed', 'Fechamento': '#16a34a', 'Pós-venda': '#0891b2' };

const propostas = [
  { id: 'P-2024-089', cliente: 'Marina Alves', produto: 'Contemplado', valor: 480000, etapa: 'Fechamento', data: '12/06/2024', resp: 'Carlos M.' },
  { id: 'P-2024-090', cliente: 'TechBuild Ltda', produto: 'Capital de Giro', valor: 1200000, etapa: 'Análise', data: '14/06/2024', resp: 'Ana S.' },
  { id: 'P-2024-091', cliente: 'Roberto Fonseca', produto: 'Home Equity', valor: 750000, etapa: 'Proposta', data: '15/06/2024', resp: 'Carlos M.' },
  { id: 'P-2024-092', cliente: 'Construflex SA', produto: 'Contemplado', valor: 3500000, etapa: 'Captação', data: '16/06/2024', resp: 'João P.' },
  { id: 'P-2024-093', cliente: 'Ana Drummond', produto: 'Contemplado', valor: 320000, etapa: 'Qualificação', data: '17/06/2024', resp: 'Ana S.' },
  { id: 'P-2024-094', cliente: 'Grupo Mendes', produto: 'Home Equity', valor: 2100000, etapa: 'Fechamento', data: '18/06/2024', resp: 'Carlos M.' },
  { id: 'P-2024-095', cliente: 'Carlos Viana', produto: 'Capital de Giro', valor: 95000, etapa: 'Pós-venda', data: '20/06/2024', resp: 'João P.' },
];

const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

export default function PropostasPage() {
  const [etapaFilter, setEtapaFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ cliente: '', produto: 'Contemplado', valor: '', etapa: 'Captação' });

  const filtered = propostas.filter(p => !etapaFilter || p.etapa === etapaFilter);
  const totals = etapas.map(e => ({ etapa: e, count: propostas.filter(p => p.etapa === e).length }));

  return (
    <div style={{ padding: '32px', fontFamily: "'DM Sans', sans-serif", background: '#F5F7FA', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Propostas</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Acompanhe o funil de propostas</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: '10px', background: '#fff', fontSize: '13px', cursor: 'pointer' }}>Exportar</button>
          <button onClick={() => setShowModal(true)} style={{ padding: '10px 20px', background: '#B8973A', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>+ Nova Proposta</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '24px' }}>
        {totals.map(t => (
          <button key={t.etapa} onClick={() => setEtapaFilter(etapaFilter === t.etapa ? '' : t.etapa)} style={{ padding: '14px', background: etapaFilter === t.etapa ? etapaColor[t.etapa] : '#fff', borderRadius: '12px', border: '1px solid', borderColor: etapaFilter === t.etapa ? etapaColor[t.etapa] : '#e2e8f0', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: etapaFilter === t.etapa ? '#fff' : '#0F172A', fontFamily: "'Playfair Display', serif" }}>{t.count}</div>
            <div style={{ fontSize: '11px', color: etapaFilter === t.etapa ? 'rgba(255,255,255,0.8)' : '#64748b', marginTop: '2px' }}>{t.etapa}</div>
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['ID', 'Cliente', 'Produto', 'Valor', 'Etapa', 'Data', 'Responsável'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '14px 16px', fontSize: '12px', fontFamily: "'DM Mono', monospace", color: '#475569' }}>{p.id}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{p.cliente}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569' }}>{p.produto}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#0F172A', fontFamily: "'DM Mono', monospace" }}>{fmt(p.valor)}</td>
                <td style={{ padding: '14px 16px' }}><span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: etapaColor[p.etapa] + '20', color: etapaColor[p.etapa] }}>{p.etapa}</span></td>
                <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b' }}>{p.data}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569' }}>{p.resp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '440px' }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 700 }}>Nova Proposta</h2>
            {[{ label: 'Cliente', key: 'cliente' }, { label: 'Valor (R$)', key: 'valor' }].map(f => (
              <div key={f.key} style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>{f.label}</label>
                <input value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Produto</label>
              <select value={form.produto} onChange={e => setForm(p => ({ ...p, produto: e.target.value }))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }}>
                {['Contemplado', 'Home Equity', 'Capital de Giro'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Etapa</label>
              <select value={form.etapa} onChange={e => setForm(p => ({ ...p, etapa: e.target.value }))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }}>
                {etapas.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '13px', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', background: '#B8973A', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Criar Proposta</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
