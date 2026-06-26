'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Download, TrendingUp, FileText, Users, DollarSign } from 'lucide-react';
import { mockChartData, formatCurrency } from '@/lib/data';

const reports = [
  { name: 'Produção Mensal', desc: 'Volume por consultor e produto', date: '2025-06-01', type: 'Financeiro' },
  { name: 'Carteira de Clientes', desc: 'Status e distribuição da base', date: '2025-06-01', type: 'CRM' },
  { name: 'Conversão por Produto', desc: 'Taxa de aprovação por tipo', date: '2025-05-31', type: 'Analítico' },
  { name: 'Pipeline Consolidado', desc: 'Funil de vendas período', date: '2025-05-30', type: 'Comercial' },
  { name: 'Comissões', desc: 'Remuneração por consultor', date: '2025-05-28', type: 'Financeiro' },
  { name: 'Contratos Vigentes', desc: 'Posição da carteira ativa', date: '2025-05-28', type: 'Jurídico' },
];

const typeVariant: Record<string, 'gold' | 'info' | 'success' | 'warning' | 'purple' | 'default'> = {
  'Financeiro': 'gold', 'CRM': 'info', 'Analítico': 'success', 'Comercial': 'warning', 'Jurídico': 'purple',
};

const maxVol = Math.max(...mockChartData.map(d => d.volume));

export default function RelatoriosPage() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        {[
          { label: 'Volume Anual', value: formatCurrency(mockChartData.reduce((s,d) => s + d.volume, 0)), icon: <DollarSign size={18} />, color: '#003B7A' },
          { label: 'Contratos Ano', value: mockChartData.reduce((s,d) => s + d.contratos, 0).toString(), icon: <FileText size={18} />, color: 'var(--ok-fg)' },
          { label: 'Ticket Médio', value: formatCurrency(mockChartData.reduce((s,d) => s + d.volume, 0) / mockChartData.reduce((s,d) => s + d.contratos, 0)), icon: <TrendingUp size={18} />, color: 'var(--gold)' },
          { label: 'Meta Atingida', value: '84%', icon: <Users size={18} />, color: 'var(--pu-fg)' },
        ].map(item => (
          <Card key={item.label} hover>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--fg2)', marginBottom: '6px' }}>{item.label}</p>
                <p style={{ fontSize: '20px', fontWeight: 700, color: item.color, fontFamily: "'DM Mono', monospace" }}>{item.value}</p>
              </div>
              <div style={{ padding: '8px', borderRadius: '8px', background: `${item.color}14`, color: item.color }}>{item.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)' }}>Volume Mensal 2025</h3>
            <Button variant="secondary" size="sm" icon={<Download size={13} />}>Exportar</Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '180px', marginBottom: '8px' }}>
            {mockChartData.map(d => (
              <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '9px', color: 'var(--fg3)', fontFamily: "'DM Mono', monospace" }}>{(d.contratos).toString()}</span>
                <div style={{ width: '100%', height: `${(d.volume / maxVol) * 100}%`, background: `linear-gradient(to top, #003B7A, #0055B3)`, borderRadius: '4px 4px 0 0', minHeight: '4px' }} />
                <span style={{ fontSize: '9px', color: 'var(--fg3)' }}>{d.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)', marginBottom: '14px' }}>Contratos / Mês</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {mockChartData.map(d => (
              <div key={d.month} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '28px', fontSize: '11px', color: 'var(--fg3)', flexShrink: 0 }}>{d.month}</span>
                <div style={{ flex: 1, height: '6px', background: 'var(--surface-2)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${(d.contratos / 32) * 100}%`, height: '100%', background: 'var(--gold)', borderRadius: '999px' }} />
                </div>
                <span style={{ fontSize: '11px', color: 'var(--fg)', fontWeight: 600, width: '20px', textAlign: 'right', fontFamily: "'DM Mono', monospace" }}>{d.contratos}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card padding="none" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)' }}>Relatórios Disponíveis</h3>
          <Button variant="primary" size="sm" icon={<FileText size={13} />}>Novo Relatório</Button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Nome', 'Descrição', 'Tipo', 'Data', 'Ações'].map(h => (
                <th key={h} style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--fg2)', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid var(--bd)', background: 'var(--surface-2)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.name} onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')} style={{ transition: 'background .15s' }}>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--fg)', borderBottom: '1px solid var(--bd2)' }}>{r.name}</td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--fg2)', borderBottom: '1px solid var(--bd2)' }}>{r.desc}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--bd2)' }}><Badge variant={typeVariant[r.type] ?? 'default'}>{r.type}</Badge></td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--fg3)', fontFamily: "'DM Mono', monospace", borderBottom: '1px solid var(--bd2)' }}>{new Date(r.date).toLocaleDateString('pt-BR')}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--bd2)' }}>
                  <button style={{ background: 'var(--in-bg)', border: 'none', borderRadius: '6px', color: 'var(--in-fg)', fontSize: '12px', padding: '4px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Download size={12} /> Baixar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
