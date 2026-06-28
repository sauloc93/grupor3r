'use client';
import { useState } from 'react';

const tabs = ['Carta Contemplada', 'Consórcio Estruturado', 'Home Equity', 'Capital de Giro', 'Financiamento'];
const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

const simResults = [
  { admin: 'Itaú Consórcio', taxa: '1.48%', parcela: 2890, total: 520200, economia: '+R$ 340k' },
  { admin: 'Porto Seguro', taxa: '1.52%', parcela: 2970, total: 534600, economia: '+R$ 326k' },
  { admin: 'Caixa', taxa: '1.45%', parcela: 2850, total: 513000, economia: '+R$ 347k' },
  { admin: 'BB Consórcio', taxa: '1.55%', parcela: 3020, total: 543600, economia: '+R$ 316k' },
  { admin: 'Bradesco', taxa: '1.50%', parcela: 2940, total: 529200, economia: '+R$ 331k' },
  { admin: 'Santander', taxa: '1.58%', parcela: 3070, total: 552600, economia: '+R$ 308k' },
  { admin: 'Mapfre', taxa: '1.44%', parcela: 2830, total: 509400, economia: '+R$ 350k' },
];

export default function SimulacaoPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [val, setVal] = useState(300000);
  const [lance, setLance] = useState(30);
  const [prazo, setPrazo] = useState(120);
  const [imov, setImov] = useState(800000);
  const [pct, setPct] = useState(40);
  const [praz2, setPraz2] = useState(120);

  const credLiq = val * (1 - lance / 100);
  const parcela = (val * 1.18) / prazo;
  const heVal = imov * (pct / 100);
  const heParcela = (heVal * (1 + 0.0099 * praz2)) / praz2;

  return (
    <div style={{ padding: '32px', fontFamily: "'DM Sans', sans-serif", background: '#F5F7FA', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Simulador de Crédito</h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Simule os melhores produtos para seu cliente</p>
      </div>

      <div style={{ display: 'flex', gap: '4px', background: '#fff', borderRadius: '12px', padding: '6px', border: '1px solid #e2e8f0', marginBottom: '24px', width: 'fit-content' }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)} style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: activeTab === i ? '#003B7A' : 'transparent', color: activeTab === i ? '#fff' : '#64748b', fontSize: '13px', fontWeight: activeTab === i ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s' }}>{t}</button>
        ))}
      </div>

      {activeTab === 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px' }}>
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Parâmetros</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Valor da Carta: {fmt(val)}</label>
              <input type="range" min={50000} max={2000000} step={10000} value={val} onChange={e => setVal(+e.target.value)} style={{ width: '100%', accentColor: '#B8973A' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}><span>R$ 50k</span><span>R$ 2M</span></div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Lance: {lance}%</label>
              <input type="range" min={20} max={60} step={1} value={lance} onChange={e => setLance(+e.target.value)} style={{ width: '100%', accentColor: '#B8973A' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}><span>20%</span><span>60%</span></div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Prazo: {prazo} meses</label>
              <input type="range" min={12} max={180} step={12} value={prazo} onChange={e => setPrazo(+e.target.value)} style={{ width: '100%', accentColor: '#B8973A' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}><span>12m</span><span>180m</span></div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #B8973A, #C8962C)', borderRadius: '12px', padding: '20px', color: '#fff' }}>
              <div style={{ fontSize: '11px', opacity: 0.85, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Crédito Líquido</div>
              <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{fmt(credLiq)}</div>
              <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '6px' }}>Parcela ~{fmt(parcela)}/mês</div>
            </div>
          </div>
          <div>
            <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Comparativo de Administradoras</h3>
                <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>Economia vs. Financiamento</div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['Administradora', 'Taxa Admin.', 'Parcela/mês', 'Total do Plano', 'Economia'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {simResults.map((r, i) => (
                    <tr key={r.admin} style={{ borderTop: '1px solid #f1f5f9', background: i === 0 ? '#fffbf0' : i % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: i === 0 ? 700 : 500, color: '#0F172A' }}>{r.admin}{i === 0 && <span style={{ marginLeft: '6px', fontSize: '10px', background: '#B8973A', color: '#fff', borderRadius: '4px', padding: '2px 6px' }}>Melhor</span>}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>{r.taxa}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{fmt(r.parcela)}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontFamily: "'DM Mono', monospace" }}>{fmt(r.total)}</td>
                      <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#16a34a' }}>{r.economia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[{ label: 'Contemplado', sub: 'Melhor opção', badge: 'Recomendado', color: '#16a34a' }, { label: 'Financiamento', sub: '+42% mais caro', badge: 'Comparativo', color: '#dc2626' }, { label: 'Home Equity', sub: 'Alternativa', badge: 'Alternativo', color: '#1d4ed8' }].map(c => (
                <div key={c.label} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px', borderTop: `3px solid ${c.color}` }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: c.color, marginBottom: '6px' }}>{c.badge}</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>{c.label}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px' }}>
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 700 }}>Home Equity</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Valor do Imóvel: {fmt(imov)}</label>
              <input type="range" min={200000} max={5000000} step={50000} value={imov} onChange={e => setImov(+e.target.value)} style={{ width: '100%', accentColor: '#003B7A' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>% do Imóvel: {pct}%</label>
              <input type="range" min={10} max={60} step={5} value={pct} onChange={e => setPct(+e.target.value)} style={{ width: '100%', accentColor: '#003B7A' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Prazo: {praz2} meses</label>
              <input type="range" min={12} max={240} step={12} value={praz2} onChange={e => setPraz2(+e.target.value)} style={{ width: '100%', accentColor: '#003B7A' }} />
            </div>
            <div style={{ background: '#003B7A', borderRadius: '12px', padding: '20px', color: '#fff' }}>
              <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '6px' }}>Crédito Disponível</div>
              <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{fmt(heVal)}</div>
              <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '6px' }}>~{fmt(heParcela)}/mês · {praz2}x</div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700 }}>Resultado da Simulação</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[{ label: 'Valor do Imóvel', value: fmt(imov) }, { label: 'Crédito ('+pct+'%)', value: fmt(heVal) }, { label: 'Taxa mensal', value: '0,99% a.m.' }, { label: 'Prazo', value: praz2+' meses' }, { label: 'Parcela estimada', value: fmt(heParcela) }, { label: 'Total pago', value: fmt(heParcela * praz2) }].map(item => (
                <div key={item.label} style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', fontFamily: "'DM Mono', monospace" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(activeTab === 1 || activeTab === 3 || activeTab === 4) && (
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔧</div>
          <h3 style={{ margin: '0 0 8px', color: '#0F172A' }}>Em desenvolvimento</h3>
          <p style={{ color: '#64748b', margin: 0 }}>Esta aba estará disponível em breve.</p>
        </div>
      )}
    </div>
  );
}
