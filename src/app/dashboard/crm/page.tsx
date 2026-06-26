'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, Plus, Filter, Eye, Mail, Phone } from 'lucide-react';
import { mockClients, formatDate } from '@/lib/data';

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
  'ativo': { label: 'Ativo', variant: 'success' },
  'prospect': { label: 'Prospect', variant: 'info' },
  'lead': { label: 'Lead', variant: 'warning' },
  'convertido': { label: 'Convertido', variant: 'success' },
  'inativo': { label: 'Inativo', variant: 'default' },
};

export default function CRMPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  const filtered = mockClients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'todos' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const th: React.CSSProperties = {
    fontSize: '10.5px', fontWeight: 600, color: 'var(--fg2)',
    textTransform: 'uppercase', letterSpacing: '0.07em',
    padding: '10px 16px', textAlign: 'left',
    borderBottom: '1px solid var(--bd)', background: 'var(--surface-2)',
  };
  const td: React.CSSProperties = { padding: '11px 16px', fontSize: '13px', color: 'var(--fg)', borderBottom: '1px solid var(--bd2)' };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        {[
          { label: 'Total de Clientes', value: mockClients.length, color: '#003B7A' },
          { label: 'Ativos', value: mockClients.filter(c => c.status === 'ativo').length, color: 'var(--ok-fg)' },
          { label: 'Prospects', value: mockClients.filter(c => c.status === 'prospect').length, color: 'var(--in-fg)' },
          { label: 'Empresas PJ', value: mockClients.filter(c => c.type === 'PJ').length, color: 'var(--gold)' },
        ].map(item => (
          <Card key={item.label} hover>
            <p style={{ fontSize: '11px', color: 'var(--fg2)', marginBottom: '6px' }}>{item.label}</p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: item.color, fontFamily: "'DM Mono', monospace" }}>{item.value}</p>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--fg3)' }} />
          <input type="text" placeholder="Buscar por nome ou e-mail..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '32px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', fontSize: '13px', background: '#fff', border: '1px solid var(--bd)', borderRadius: '8px', color: 'var(--fg)', width: '100%' }} />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '13px', background: '#fff', border: '1px solid var(--bd)', borderRadius: '8px', color: 'var(--fg)' }}>
          <option value="todos">Todos os status</option>
          <option value="ativo">Ativo</option>
          <option value="prospect">Prospect</option>
          <option value="lead">Lead</option>
          <option value="convertido">Convertido</option>
          <option value="inativo">Inativo</option>
        </select>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <Button variant="secondary" icon={<Filter size={14} />}>Filtros</Button>
          <Button variant="primary" icon={<Plus size={14} />}>Novo Cliente</Button>
        </div>
      </div>

      <Card padding="none" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Nome</th>
              <th style={th}>Contato</th>
              <th style={th}>Tipo</th>
              <th style={th}>Segmento</th>
              <th style={th}>Responsável</th>
              <th style={th}>Status</th>
              <th style={th}>Cadastro</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const st = statusConfig[c.status] || { label: c.status, variant: 'default' as const };
              return (
                <tr key={c.id}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  style={{ transition: 'background .15s', cursor: 'pointer' }}
                >
                  <td style={{ ...td, fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '999px', background: c.type === 'PJ' ? 'rgba(200,150,44,.12)' : 'rgba(0,59,122,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: c.type === 'PJ' ? 'var(--gold)' : '#003B7A' }}>{c.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('')}</span>
                      </div>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg)' }}>{c.name}</p>
                        <p style={{ fontSize: '11px', color: 'var(--fg3)' }}>{c.cpfCnpj}</p>
                      </div>
                    </div>
                  </td>
                  <td style={td}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--fg2)', display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={10} />{c.email}</span>
                      <span style={{ fontSize: '12px', color: 'var(--fg2)', display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={10} />{c.phone}</span>
                    </div>
                  </td>
                  <td style={td}><Badge variant={c.type === 'PJ' ? 'gold' : 'info'}>{c.type}</Badge></td>
                  <td style={{ ...td, color: 'var(--fg2)', fontSize: '12px' }}>{c.segment}</td>
                  <td style={{ ...td, color: 'var(--fg2)', fontSize: '12px' }}>{c.assignedTo}</td>
                  <td style={td}><Badge variant={st.variant}>{st.label}</Badge></td>
                  <td style={{ ...td, color: 'var(--fg3)', fontSize: '12px', fontFamily: "'DM Mono', monospace" }}>{formatDate(c.createdAt)}</td>
                  <td style={td}>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg3)', padding: '4px', borderRadius: '6px', display: 'flex' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#003B7A'; (e.currentTarget as HTMLElement).style.background = 'var(--in-bg)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--fg3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    ><Eye size={15} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '12px', color: 'var(--fg3)' }}>{filtered.length} de {mockClients.length} clientes</p>
        </div>
      </Card>
    </div>
  );
}
