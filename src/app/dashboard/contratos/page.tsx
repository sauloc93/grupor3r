'use client';
import { useState } from 'react';

const contratos = [
  { id: 'CT-2024-031', cliente: 'Marina Alves', produto: 'Contemplado', valor: 480000, status: 'Ativo', inicio: '01/05/2024', venc: '01/05/2039' },
  { id: 'CT-2024-032', cliente: 'Construflex SA', produto: 'Contemplado', valor: 3500000, status: 'Aguard. Assinatura', inicio: '—', venc: '—' },
  { id: 'CT-2024-033', cliente: 'Grupo Mendes', produto: 'Home Equity', valor: 2100000, status: 'Ativo', inicio: '10/04/2024', venc: '10/04/2044' },
  { id: 'CT-2024-034', cliente: 'Roberto Fonseca', produto: 'Home Equity', valor: 750000, status: 'Aguard. Assinatura', inicio: '—', venc: '—' },
  { id: 'CT-2024-035', cliente: 'TechBuild Ltda', produto: 'Capital de Giro', valor: 1200000, status: 'Análise', inicio: '—', venc: '—' },
  { id: 'CT-2024-028', cliente: 'Carlos Viana', produto: 'Capital de Giro', valor: 95000, status: 'Finalizado', inicio: '01/01/2023', venc: '01/01/2025' },
];

const statusColor: Record<string, string> = { 'Ativo': '#16a34a', 'Aguard. Assinatura': '#b8973a', 'Análise': '#1d4ed8', 'Finalizado': '#6b7280' };
const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

export default function ContratosPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ cliente: '', produto: 'Contemplado', valor: '' });

  const stats = [
    { label: 'Contratos Ativos', value: contratos.filter(c => c.status === 'Ativo').length, color: '#16a34a' },
    { label: 'Aguard. Assinatura', value: contratos.filter(c => c.status === 'Aguard. Assinatura').length, color: '#b8973a' },
    { label: 'Finalizados', value: contratos.filter(c => c.status === 'Finalizado').length, color: '#6b7280' },
  ];

  return (
    <div style={{ padding: '32px', fontFamily: "'DM Sans', sans-serif", background: '#F5F7FA', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Contratos</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Gerencie os contratos da carteira</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ padding: '10px 20px', background: '#B8973A', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Gerar Contrato</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', borderLeft: `4px solid ${s.color}` }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: s.color, fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['Contrato', 'Cliente', 'Produto', 'Valor', 'Status', 'Início', 'Vencimento'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contratos.map((c, i) => (
              <tr key={c.id} style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '14px 16px', fontSize: '12px', fontFamily: "'DM Mono', monospace", color: '#475569' }}>{c.id}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{c.cliente}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569' }}>{c.produto}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{fmt(c.valor)}</td>
                <td style={{ padding: '14px 16px' }}><span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: statusColor[c.status] + '20', color: statusColor[c.status] }}>{c.status}</span></td>
                <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b' }}>{c.inicio}</td>
                <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b' }}>{c.venc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '440px' }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 700 }}>Gerar Contrato</h2>
            {[{ label: 'Cliente', key: 'cliente' }, { label: 'Valor (R$)', key: 'valor' }].map(f => (
              <div key={f.key} style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>{f.label}</label>
                <input value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Produto</label>
              <select value={form.produto} onChange={e => setForm(p => ({ ...p, produto: e.target.value }))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }}>
                {['Contemplado', 'Home Equity', 'Capital de Giro'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '13px', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', background: '#B8973A', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Gerar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
