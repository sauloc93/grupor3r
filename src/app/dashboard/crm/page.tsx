'use client';
import { useState } from 'react';

const clients = [
  { id: 1, nome: 'Marina Alves', tipo: 'PF', doc: '342.891.020-15', email: 'marina@gmail.com', tel: '(11) 99201-3344', produto: 'Contemplado', volume: 480000, status: 'Ativo' },
  { id: 2, nome: 'TechBuild Ltda', tipo: 'PJ', doc: '12.345.678/0001-90', email: 'financeiro@techbuild.com.br', tel: '(11) 3201-4400', produto: 'Capital de Giro', volume: 1200000, status: 'Em análise' },
  { id: 3, nome: 'Roberto Fonseca', tipo: 'PF', doc: '198.234.560-77', email: 'roberto.f@outlook.com', tel: '(21) 98811-2233', produto: 'Home Equity', volume: 750000, status: 'Contrato assinado' },
  { id: 4, nome: 'Construflex SA', tipo: 'PJ', doc: '98.765.432/0001-10', email: 'ceo@construflex.com.br', tel: '(11) 4002-8922', produto: 'Contemplado', volume: 3500000, status: 'Ativo' },
  { id: 5, nome: 'Ana Drummond', tipo: 'PF', doc: '521.003.770-44', email: 'ana.drummond@gmail.com', tel: '(31) 97733-8899', produto: 'Contemplado', volume: 320000, status: 'Prospecção' },
  { id: 6, nome: 'Grupo Mendes', tipo: 'PJ', doc: '45.678.901/0001-23', email: 'contato@grupomendes.com', tel: '(11) 3300-1122', produto: 'Home Equity', volume: 2100000, status: 'Ativo' },
  { id: 7, nome: 'Carlos Viana', tipo: 'PF', doc: '677.234.980-01', email: 'carlos.viana@yahoo.com', tel: '(85) 98800-4455', produto: 'Capital de Giro', volume: 95000, status: 'Inativo' },
];

const statusColor: Record<string, string> = {
  'Ativo': '#16a34a', 'Em análise': '#b8973a', 'Contrato assinado': '#1d4ed8',
  'Prospecção': '#6b7280', 'Inativo': '#dc2626',
};

const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

export default function CRMPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nome: '', tipo: 'PF', doc: '', email: '', tel: '', produto: 'Contemplado', obs: '' });

  const filtered = clients.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.nome.toLowerCase().includes(q) || c.doc.includes(q) || c.email.includes(q);
    const matchFilter = filter === 'Todos' || c.tipo === filter;
    return matchSearch && matchFilter;
  });

  const stats = [
    { label: 'Total de Clientes', value: clients.length },
    { label: 'Pessoa Física', value: clients.filter(c => c.tipo === 'PF').length },
    { label: 'Pessoa Jurídica', value: clients.filter(c => c.tipo === 'PJ').length },
    { label: 'Novos (30d)', value: 3 },
  ];

  return (
    <div style={{ padding: '32px', fontFamily: "'DM Sans', sans-serif", background: '#F5F7FA', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>CRM — Clientes</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Gerencie sua carteira de clientes</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ padding: '10px 20px', background: '#B8973A', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>+ Novo Cliente</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome, CPF/CNPJ ou email..." style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none' }} />
          {['Todos', 'PF', 'PJ'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 16px', border: '1px solid', borderColor: filter === f ? '#B8973A' : '#e2e8f0', background: filter === f ? '#B8973A' : '#fff', color: filter === f ? '#fff' : '#64748b', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>{f}</button>
          ))}
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['Cliente', 'Tipo', 'Documento', 'Contato', 'Produto', 'Volume', 'Status'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id} style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#B8973A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>{c.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{c.nome}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}><span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: c.tipo === 'PF' ? '#dbeafe' : '#fef3c7', color: c.tipo === 'PF' ? '#1d4ed8' : '#92400e' }}>{c.tipo}</span></td>
                <td style={{ padding: '14px 16px', fontSize: '12px', color: '#475569', fontFamily: "'DM Mono', monospace" }}>{c.doc}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: '12px', color: '#475569' }}>{c.email}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{c.tel}</div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569' }}>{c.produto}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#0F172A', fontFamily: "'DM Mono', monospace" }}>{fmt(c.volume)}</td>
                <td style={{ padding: '14px 16px' }}><span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: statusColor[c.status] + '20', color: statusColor[c.status] }}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '480px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 700 }}>Novo Cliente</h2>
            {[{ label: 'Nome completo / Razão Social', key: 'nome', type: 'text' }, { label: 'Documento (CPF/CNPJ)', key: 'doc', type: 'text' }, { label: 'E-mail', key: 'email', type: 'email' }, { label: 'Telefone', key: 'tel', type: 'text' }].map(f => (
              <div key={f.key} style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>{f.label}</label>
                <input type={f.type} value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Tipo</label>
              <select value={form.tipo} onChange={e => setForm(p => ({ ...p, tipo: e.target.value }))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }}>
                <option>PF</option><option>PJ</option>
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Observações</label>
              <textarea value={form.obs} onChange={e => setForm(p => ({ ...p, obs: e.target.value }))} rows={3} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', resize: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '13px', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', background: '#B8973A', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Salvar Cliente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
