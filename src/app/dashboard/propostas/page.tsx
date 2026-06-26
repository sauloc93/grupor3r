'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, Plus, ChevronRight } from 'lucide-react';
import { mockProposals, PRODUCT_LABELS, PRODUCT_COLORS, formatCurrency, formatDate } from '@/lib/data';
import { ProposalStatus } from '@/types';

const statusConfig: Record<ProposalStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
  'rascunho': { label: 'Rascunho', variant: 'default' },
  'enviada': { label: 'Enviada', variant: 'info' },
  'em-analise': { label: 'Em Análise', variant: 'warning' },
  'aprovada': { label: 'Aprovada', variant: 'success' },
  'recusada': { label: 'Recusada', variant: 'danger' },
  'cancelada': { label: 'Cancelada', variant: 'danger' },
};

export default function PropostasPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  const filtered = mockProposals.filter(p => {
    const matchSearch = p.clientName.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'todos' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const th: React.CSSProperties = { fontSize: '10.5px', fontWeight: 600, color: 'var(--fg2)', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid var(--bd)', background: 'var(--surface-2)' };
  const td: React.CSSProperties = { padding: '11px 16px', fontSize: '13px', color: 'var(--fg)', borderBottom: '1px solid var(--bd2)' };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        {[
          { label: 'Total', value: mockProposals.length, color: '#003B7A' },
          { label: 'Aprovadas', value: mockProposals.filter(p => p.status === 'aprovada').length, color: 'var(--ok-fg)' },
          { label: 'Em Análise', value: mockProposals.filter(p => p.status === 'em-analise').length, color: 'var(--wn-fg)' },
          { label: 'Volume Total', value: formatCurrency(mockProposals.reduce((s, p) => s + p.creditValue, 0)), color: 'var(--pu-fg)' },
        ].map(item => (
          <Card key={item.label} hover>
            <p style={{ fontSize: '11px', color: 'var(--fg2)', marginBottom: '6px' }}>{item.label}</p>
            <p style={{ fontSize: '20px', fontWeight: 700, color: item.color, fontFamily: "'DM Mono', monospace" }}>{item.value}</p>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--fg3)' }} />
          <input type="text" placeholder="Buscar por cliente ou nº..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '32px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', fontSize: '13px', background: '#fff', border: '1px solid var(--bd)', borderRadius: '8px', color: 'var(--fg)', width: '100%' }} />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '13px', background: '#fff', border: '1px solid var(--bd)', borderRadius: '8px', color: 'var(--fg)' }}>
          <option value="todos">Todos os status</option>
          {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <Button variant="primary" icon={<Plus size={14} />} style={{ marginLeft: 'auto' }}>Nova Proposta</Button>
      </div>

      <Card padding="none" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Nº</th>
              <th style={th}>Cliente</th>
              <th style={th}>Produto</th>
              <th style={th}>Valor</th>
              <th style={th}>Parcela/mês</th>
              <th style={th}>Administradora</th>
              <th style={th}>Status</th>
              <th style={th}>Data</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const st = statusConfig[p.status] || { label: p.status, variant: 'default' as const };
              const pc = PRODUCT_COLORS[p.product] || '#003B7A';
              return (
                <tr key={p.id}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  style={{ transition: 'background .15s', cursor: 'pointer' }}
                >
                  <td style={{ ...td, fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'var(--fg3)' }}>{p.id}</td>
                  <td style={{ ...td, fontWeight: 600 }}>{p.clientName}</td>
                  <td style={td}>
                    <span style={{ fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '999px', background: `${pc}14`, color: pc }}>{PRODUCT_LABELS[p.product]}</span>
                  </td>
                  <td style={{ ...td, fontFamily: "'DM Mono', monospace", fontSize: '12px', fontWeight: 600 }}>{formatCurrency(p.creditValue)}</td>
                  <td style={{ ...td, fontFamily: "'DM Mono', monospace", fontSize: '12px', color: 'var(--fg2)' }}>{formatCurrency(p.monthlyInstallment)}</td>
                  <td style={{ ...td, color: 'var(--fg2)', fontSize: '12px' }}>{p.administrator}</td>
                  <td style={td}><Badge variant={st.variant}>{st.label}</Badge></td>
                  <td style={{ ...td, color: 'var(--fg3)', fontSize: '12px', fontFamily: "'DM Mono', monospace" }}>{formatDate(p.createdAt)}</td>
                  <td style={td}>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg3)', display: 'flex', alignItems: 'center' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#003B7A'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--fg3)'}
                    ><ChevronRight size={15} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
