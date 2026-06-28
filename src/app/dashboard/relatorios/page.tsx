'use client';
import { useState } from 'react';

const periodos = ['Maio 2025', 'Abril 2025', 'Março 2025', 'Trimestre 1'];
const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const valores = [2800000, 3100000, 2500000, 3800000, 4200000, 3600000, 4100000, 3900000, 4500000, 4800000, 5200000, 4700000];
const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact', maximumFractionDigits: 1 }).format(v);
const fmtFull = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

const topClientes = [
  { nome: 'Construflex SA', produto: 'Contemplado', volume: 3500000 },
  { nome: 'Grupo Mendes', produto: 'Home Equity', volume: 2100000 },
  { nome: 'TechBuild Ltda', produto: 'Capital de Giro', volume: 1200000 },
  { nome: 'Roberto Fonseca', produto: 'Home Equity', volume: 750000 },
  { nome: 'Construtora Vale', produto: 'Contemplado', volume: 900000 },
];

const produtos = [
  { nome: 'Contemplado', pct: 42, color: '#003B7A' },
  { nome: 'Home Equity', pct: 28, color: '#B8973A' },
  { nome: 'Capital de Giro', pct: 18, color: '#16a34a' },
  { nome: 'Outros', pct: 12, color: '#6b7280' },
];

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState('Maio 2025');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const maxVal = Math.max(...valores);

  const kpis = [
    { label: 'Propostas Abertas', value: '23', icon: '📋' },
    { label: 'Contratos Assinados', value: '12', icon: '✍️' },
    { label: 'Volume Total', value: 'R$ 4,2M', icon: '💰' },
    { label: 'Ticket Médio', value: 'R$ 350k', icon: '📊' },
  ];

  return (
    <div style={{ padding: '32px', fontFamily: "'DM Sans', sans-serif", background: '#F5F7FA', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Relatórios</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Visão analítica da operação</p>
        </div>
        <select value={periodo} onChange={e => setPeriodo(e.target.value)} style={{ padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '13px', outline: 'none' }}>
          {periodos.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{k.icon}</div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#0F172A', fontFamily: "'Playfair Display', serif" }}>{k.value}</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{k.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', marginBottom: '20px' }}>
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: 700 }}>Volume Mensal (12 meses)</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px' }}>
            {valores.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                  title={fmt(v)}
                  style={{ width: '100%', borderRadius: '6px 6px 0 0', background: hoveredBar === i ? '#B8973A' : '#003B7A', height: `${(v / maxVal) * 140}px`, transition: 'background 0.2s', cursor: 'pointer' }} />
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '6px' }}>{meses[i]}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Por Produto</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {produtos.map(p => (
              <div key={p.nome}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
                  <span style={{ color: '#475569', fontWeight: 500 }}>{p.nome}</span>
                  <span style={{ fontWeight: 700, color: p.color }}>{p.pct}%</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${p.pct}%`, background: p.color, borderRadius: '4px', transition: 'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Top 5 Clientes</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['#', 'Cliente', 'Produto', 'Volume'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topClientes.map((c, i) => (
              <tr key={c.nome} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 700, color: '#B8973A' }}>{i + 1}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{c.nome}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{c.produto}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{fmtFull(c.volume)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
