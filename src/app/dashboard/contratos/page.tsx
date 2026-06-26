'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Download, Eye, Search, Plus } from 'lucide-react';
import { mockContracts, PRODUCT_LABELS, PRODUCT_COLORS, formatCurrency, formatDate } from '@/lib/data';

const statusConfig = {
  'rascunho': { label: 'Rascunho', variant: 'default' as const },
  'assinado': { label: 'Assinado', variant: 'info' as const },
  'vigente': { label: 'Vigente', variant: 'success' as const },
  'encerrado': { label: 'Encerrado', variant: 'default' as const },
};

export default function ContratosPage() {
  const [search, setSearch] = useState('');
  const filtered = mockContracts.filter(c =>
    c.clientName.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())
  );

  const th: React.CSSProperties = { fontSize: '10.5px', fontWeight: 600, color: 'var(--fg2)', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid var(--bd)', background: 'var(--surface-2)' };
  const td: React.CSSProperties = { padding: '12px 16px', fontSize: '13px', color: 'var(--fg)', borderBottom: '1px solid var(--bd2)' };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        {[
          { label: 'Total', value: mockContracts.length, color: '#003B7A' },
          { label: 'Vigentes', value: mockContracts.filter(c => c.status === 'vigente').length, color: 'var(--ok-fg)' },
          { label: 'Assinados', value: mockContracts.filter(c => c.status === 'assinado').length, color: 'var(--in-fg)' },
          { label: 'Volume Total', value: formatCurrency(mockContracts.reduce((s, c) => s + c.creditValue, 0)), color: 'var(--pu-fg)' },
        ].map(item => (
          <Card key={item.label} hover>
            <p style={{ fontSize: '11px', color: 'var(--fg2)', marginBottom: '6px' }}>{item.label}</p>
            <p style={{ fontSize: '22px', fontWeight: 700, color: item.color, fontFamily: "'DM Mono', monospace" }}>{item.value}</p>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--fg3)' }} />
          <input type="text" placeholder="Buscar contratos..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '32px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', fontSize: '13px', background: '#fff', border: '1px solid var(--bd)', borderRadius: '8px', color: 'var(--fg)', width: '100%' }} />
        </div>
        <Button variant="primary" icon={<Plus size={14} />} style={{ marginLeft: 'auto' }}>Novo Contrato</Button>
      </div>

      <Card padding="none" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Contrato</th>
              <th style={th}>Cliente</th>
              <th style={th}>Produto</th>
              <th style={th}>Valor</th>
              <th style={th}>Status</th>
              <th style={th}>Assinatura</th>
              <th style={th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const st = statusConfig[c.status as keyof typeof statusConfig] || { label: c.status, variant: 'default' as const };
              const productColor = PRODUCT_COLORS[c.product] || '#003B7A';
              return (
                <tr key={c.id}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  style={{ transition: 'background .15s' }}
                >
                  <td style={{ ...td, fontFamily: "'DM Mono', monospace", fontSize: '12px', color: 'var(--fg3)' }}>{c.id}</td>
                  <td style={{ ...td, fontWeight: 600 }}>{c.clientName}</td>
                  <td style={td}>
                    <span style={{ fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '999px', background: `${productColor}14`, color: productColor }}>
                      {PRODUCT_LABELS[c.product]}
                    </span>
                  </td>
                  <td style={{ ...td, fontFamily: "'DM Mono', monospace", fontSize: '12px' }}>{formatCurrency(c.creditValue)}</td>
                  <td style={td}><Badge variant={st.variant}>{st.label}</Badge></td>
                  <td style={{ ...td, color: 'var(--fg3)', fontSize: '12px' }}>{c.signedAt ? formatDate(c.signedAt) : '—'}</td>
                  <td style={td}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg3)', padding: '4px', borderRadius: '6px', display: 'flex' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#003B7A'; (e.currentTarget as HTMLElement).style.background = 'var(--in-bg)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--fg3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      ><Eye size={14} /></button>
                      <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg3)', padding: '4px', borderRadius: '6px', display: 'flex' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#003B7A'; (e.currentTarget as HTMLElement).style.background = 'var(--in-bg)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--fg3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      ><Download size={14} /></button>
                    </div>
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
