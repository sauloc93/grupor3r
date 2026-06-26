'use client';

import { Card, MetricCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, Users, DollarSign, TrendingUp, ChevronRight } from 'lucide-react';
import { mockProposals, mockClients, formatCurrency, formatDate, PRODUCT_LABELS } from '@/lib/data';
import Link from 'next/link';

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
  'aprovada': { label: 'Aprovada', variant: 'success' },
  'em-analise': { label: 'Em Análise', variant: 'warning' },
  'enviada': { label: 'Enviada', variant: 'info' },
  'rascunho': { label: 'Rascunho', variant: 'default' },
  'recusada': { label: 'Recusada', variant: 'danger' },
};

const clientStatusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
  'ativo': { label: 'Ativo', variant: 'success' },
  'prospect': { label: 'Prospect', variant: 'info' },
  'lead': { label: 'Lead', variant: 'warning' },
  'convertido': { label: 'Convertido', variant: 'success' },
  'inativo': { label: 'Inativo', variant: 'default' },
};

const chartData = [
  { month: 'Jan', h: 38 }, { month: 'Fev', h: 52 }, { month: 'Mar', h: 45 },
  { month: 'Abr', h: 68 }, { month: 'Mai', h: 74 }, { month: 'Jun', h: 62 },
  { month: 'Jul', h: 85 }, { month: 'Ago', h: 79 }, { month: 'Set', h: 92 },
  { month: 'Out', h: 87 }, { month: 'Nov', h: 100 }, { month: 'Dez', h: 96 },
];

const distribution = [
  { name: 'Contemplado', pct: 35, color: 'var(--gold)' },
  { name: 'Programado', pct: 25, color: 'var(--in-fg)' },
  { name: 'Disponível', pct: 20, color: 'var(--ok-fg)' },
  { name: 'Home Equity', pct: 12, color: 'var(--pu-fg)' },
  { name: 'Cap. Giro', pct: 8, color: 'var(--wn-fg)' },
];

const activities = [
  { text: 'Proposta P001 aprovada — João Silva', time: '14:32', color: 'var(--ok-fg)' },
  { text: 'Novo cliente cadastrado — Construtora Alfa', time: '13:10', color: 'var(--in-fg)' },
  { text: 'Contrato C003 assinado — Indústria Qualidade', time: '11:55', color: 'var(--gold)' },
  { text: 'Proposta P004 em análise — Horizonte', time: '10:22', color: 'var(--wn-fg)' },
  { text: 'Lead convertido — Maria Fernanda', time: '09:08', color: 'var(--ok-fg)' },
];

export default function DashboardPage() {
  const th: React.CSSProperties = { fontSize: '10.5px', fontWeight: 600, color: 'var(--fg2)', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '0 0 10px', textAlign: 'left', borderBottom: '1px solid var(--bd)' };
  const td: React.CSSProperties = { padding: '11px 0', fontSize: '13px', color: 'var(--fg)', borderBottom: '1px solid var(--bd2)' };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
        <MetricCard title="Propostas Ativas" value="47" subtitle="Em andamento" icon={<FileText size={20} />} trend="up" trendValue="+8%" color="var(--gold)" />
        <MetricCard title="Volume Total" value="R$ 18,4M" subtitle="Este mês" icon={<DollarSign size={20} />} trend="up" trendValue="+22%" color="var(--ok-fg)" />
        <MetricCard title="Clientes" value="234" subtitle="Carteira ativa" icon={<Users size={20} />} trend="up" trendValue="+12%" color="var(--in-fg)" />
        <MetricCard title="Conversão" value="68%" subtitle="Taxa do mês" icon={<TrendingUp size={20} />} trend="up" trendValue="+2.1pp" color="var(--pu-fg)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)' }}>Volume de Crédito</h3>
              <p style={{ fontSize: '12px', color: 'var(--fg2)', marginTop: '2px' }}>Evolução mensal 2025</p>
            </div>
            <select style={{ background: 'var(--surface-2)', border: '1px solid var(--bd)', borderRadius: '6px', color: 'var(--fg2)', fontSize: '12px', padding: '5px 8px' }}>
              <option>2025</option><option>2024</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '160px' }}>
            {chartData.map(d => (
              <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${d.h}%`, background: `linear-gradient(to top, #A07820, var(--gold))`, borderRadius: '4px 4px 0 0', opacity: 0.85, minHeight: '4px' }} />
                <span style={{ fontSize: '9px', color: 'var(--fg3)' }}>{d.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)', marginBottom: '4px' }}>Distribuição</h3>
          <p style={{ fontSize: '12px', color: 'var(--fg2)', marginBottom: '16px' }}>Por produto</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {distribution.map(d => (
              <div key={d.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--fg2)' }}>{d.name}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: d.color, fontFamily: "'DM Mono', monospace" }}>{d.pct}%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--surface-2)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${d.pct}%`, height: '100%', background: d.color, borderRadius: '999px' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Card padding="none">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--bd)' }}>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)' }}>Últimas Propostas</h3>
              <p style={{ fontSize: '12px', color: 'var(--fg2)', marginTop: '2px' }}>Atividade recente</p>
            </div>
            <Link href="/dashboard/propostas" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--gold)', textDecoration: 'none', fontWeight: 500 }}>
              Ver todas <ChevronRight size={13} />
            </Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ padding: '0 20px' }}>
              <th style={{ ...th, padding: '10px 20px' }}>Cliente</th>
              <th style={{ ...th, padding: '10px 20px' }}>Produto</th>
              <th style={{ ...th, padding: '10px 20px' }}>Valor</th>
              <th style={{ ...th, padding: '10px 20px' }}>Status</th>
            </tr></thead>
            <tbody>
              {mockProposals.slice(0, 5).map(p => {
                const st = statusConfig[p.status] || { label: p.status, variant: 'default' as const };
                return (
                  <tr key={p.id} style={{ transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ ...td, padding: '10px 20px', fontWeight: 500 }}>{p.clientName}</td>
                    <td style={{ ...td, padding: '10px 20px', color: 'var(--fg2)', fontSize: '12px' }}>{PRODUCT_LABELS[p.product]}</td>
                    <td style={{ ...td, padding: '10px 20px', fontFamily: "'DM Mono', monospace", fontSize: '12px' }}>{formatCurrency(p.creditValue)}</td>
                    <td style={{ ...td, padding: '10px 20px' }}><Badge variant={st.variant}>{st.label}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <Card>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)', marginBottom: '4px' }}>Atividade</h3>
          <p style={{ fontSize: '12px', color: 'var(--fg2)', marginBottom: '16px' }}>Hoje</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {activities.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', paddingBottom: '14px', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '999px', background: a.color, flexShrink: 0, marginTop: '3px' }} />
                  {i < activities.length - 1 && <div style={{ width: '1px', flex: 1, background: 'var(--bd2)', marginTop: '4px' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', color: 'var(--fg)', lineHeight: 1.4 }}>{a.text}</p>
                  <p style={{ fontSize: '11px', color: 'var(--fg3)', marginTop: '2px', fontFamily: "'DM Mono', monospace" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card padding="none">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--bd)' }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)' }}>Clientes Recentes</h3>
            <p style={{ fontSize: '12px', color: 'var(--fg2)', marginTop: '2px' }}>Cadastros recentes</p>
          </div>
          <Link href="/dashboard/crm" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--gold)', textDecoration: 'none', fontWeight: 500 }}>
            Ver todos <ChevronRight size={13} />
          </Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>
            <th style={{ ...th, padding: '10px 20px' }}>Nome</th>
            <th style={{ ...th, padding: '10px 20px' }}>Tipo</th>
            <th style={{ ...th, padding: '10px 20px' }}>Cidade</th>
            <th style={{ ...th, padding: '10px 20px' }}>Status</th>
            <th style={{ ...th, padding: '10px 20px' }}>Cadastro</th>
          </tr></thead>
          <tbody>
            {mockClients.map(c => {
              const st = clientStatusConfig[c.status] || { label: c.status, variant: 'default' as const };
              return (
                <tr key={c.id}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ ...td, padding: '10px 20px', fontWeight: 500 }}>{c.name}</td>
                  <td style={{ ...td, padding: '10px 20px' }}><Badge variant={c.type === 'PJ' ? 'gold' : 'info'}>{c.type}</Badge></td>
                  <td style={{ ...td, padding: '10px 20px', color: 'var(--fg2)', fontSize: '12px' }}>{c.city}, {c.state}</td>
                  <td style={{ ...td, padding: '10px 20px' }}><Badge variant={st.variant}>{st.label}</Badge></td>
                  <td style={{ ...td, padding: '10px 20px', color: 'var(--fg3)', fontSize: '12px', fontFamily: "'DM Mono', monospace" }}>{formatDate(c.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
