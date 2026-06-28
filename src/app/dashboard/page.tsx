'use client';

import { useState } from 'react';

const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

const propostas = [
  { id: 'P-2024-047', cliente: 'Marina Alves', produto: 'Contemplado', valor: 480000, prazo: 60, admin: 'Porto Seguro', etapa: 'aprovacao', data: '15/05' },
  { id: 'P-2024-046', cliente: 'TechBuild Ltda', produto: 'Capital de Giro', valor: 280000, prazo: 36, admin: 'Embracon', etapa: 'analise', data: '14/05' },
  { id: 'P-2024-045', cliente: 'Roberto Fonseca', produto: 'Home Equity', valor: 650000, prazo: 120, admin: 'Caixa', etapa: 'assinatura', data: '13/05' },
  { id: 'P-2024-044', cliente: 'Construflex SA', produto: 'Consórcio', valor: 1200000, prazo: 180, admin: 'Porto Seguro', etapa: 'fechado', data: '12/05' },
  { id: 'P-2024-043', cliente: 'Ana Drummond', produto: 'Contemplado', valor: 320000, prazo: 48, admin: 'Rodobens', etapa: 'prospeccao', data: '11/05' },
];

const atividades = [
  { icon: '✅', texto: 'Contrato #CTR-089 assinado', sub: 'Construflex SA · R$ 1,2M', tempo: '2h atrás', cor: '#2D7A4F' },
  { icon: '📋', texto: 'Nova proposta criada', sub: 'Marina Alves · Contemplado R$ 480k', tempo: '4h atrás', cor: '#B8973A' },
  { icon: '👤', texto: 'Cliente cadastrado', sub: 'TechBuild Ltda · Capital de Giro', tempo: '5h atrás', cor: '#3464C8' },
  { icon: '🔔', texto: 'Lembrete: reunião amanhã', sub: 'Roberto Fonseca · 14h', tempo: '1d atrás', cor: '#B8793A' },
];

const etapaLabel: Record<string, string> = {
  prospeccao: 'Prospecção', qualificacao: 'Qualificação', analise: 'Análise',
  aprovacao: 'Aprovação', assinatura: 'Assinatura', fechado: 'Fechado',
};
const etapaCor: Record<string, { bg: string; color: string }> = {
  prospeccao: { bg: 'rgba(100,100,100,.15)', color: '#A8A49C' },
  qualificacao: { bg: 'rgba(52,100,200,.14)', color: '#80B8F8' },
  analise: { bg: 'rgba(217,119,6,.08)', color: '#D97706' },
  aprovacao: { bg: 'rgba(184,151,58,.18)', color: '#B8973A' },
  assinatura: { bg: 'rgba(124,58,237,.08)', color: '#7C3AED' },
  fechado: { bg: 'rgba(22,163,74,.08)', color: '#16A34A' },
};

const bars = [
  { mes: 'Jun', h: 38 }, { mes: 'Jul', h: 52 }, { mes: 'Ago', h: 45 },
  { mes: 'Set', h: 61 }, { mes: 'Out', h: 55 }, { mes: 'Nov', h: 70 },
  { mes: 'Dez', h: 48 }, { mes: 'Jan', h: 63 }, { mes: 'Fev', h: 72 },
  { mes: 'Mar', h: 58 }, { mes: 'Abr', h: 80 }, { mes: 'Mai', h: 88 },
];

const produtos = [
  { nome: 'Contemplado', pct: 42, cor: '#B8973A' },
  { nome: 'Home Equity', pct: 28, cor: '#3464C8' },
  { nome: 'Capital de Giro', pct: 18, cor: '#2D7A4F' },
  { nome: 'Outros', pct: 12, cor: '#686460' },
];

export default function DashboardPage() {
  const [hiBar, setHiBar] = useState(11);

  return (
    <div style={{ animation: 'fadeIn .2s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '11px 14px', borderRadius: '10px', background: 'rgba(217,119,6,.08)', border: '1px solid rgba(217,119,6,.2)', color: '#D97706', fontSize: '12.5px', marginBottom: '24px' }}>
        <span style={{ fontSize: '16px' }}>⚠️</span>
        <div><strong>3 propostas aguardam aprovação</strong> · 2 contratos para assinar hoje</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '28px' }}>
        {[
          { lbl: 'Propostas Ativas', val: '47', dt: '+12% mês', up: true, ico: '📋', cor: 'rgba(184,151,58,.13)' },
          { lbl: 'Volume em Cartas', val: 'R$ 18,4M', dt: '+8% mês', up: true, ico: '💰', cor: 'rgba(45,122,79,.14)' },
          { lbl: 'Clientes Ativos', val: '234', dt: '+5 novos', up: true, ico: '👥', cor: 'rgba(52,100,200,.14)' },
          { lbl: 'Taxa Conversão', val: '68%', dt: '-2% mês', up: false, ico: '📊', cor: 'rgba(184,50,50,.14)' },
        ].map((k, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: '14px', padding: '17px 19px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '90px', height: '90px', borderRadius: '50%', background: k.cor, pointerEvents: 'none' }} />
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', background: k.cor, marginBottom: '12px' }}>{k.ico}</div>
            <div style={{ fontSize: '10.5px', color: 'var(--fg2)', textTransform: 'uppercase', letterSpacing: '0.9px', marginBottom: '5px' }}>{k.lbl}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', lineHeight: 1, marginBottom: '7px', color: 'var(--fg)' }}>{k.val}</div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '11.5px', padding: '2px 8px', borderRadius: '999px', background: k.up ? 'rgba(22,163,74,.08)' : 'rgba(220,38,38,.08)', color: k.up ? '#16A34A' : '#DC2626' }}>
              {k.up ? '↑' : '↓'} {k.dt}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px', marginBottom: '28px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: '14px', padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--fg)' }}>Volume por Produto</div>
              <div style={{ fontSize: '12px', color: 'var(--fg2)', marginTop: '2px' }}>Participação % no portfólio</div>
            </div>
            <span style={{ display: 'inline-flex', fontSize: '11px', fontWeight: 500, padding: '2.5px 9px', borderRadius: '999px', background: 'rgba(184,151,58,.18)', color: '#B8973A' }}>Mai 2025</span>
          </div>
          {produtos.map(p => (
            <div key={p.nome} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--fg)', fontWeight: 500 }}>{p.nome}</span>
                <span style={{ color: 'var(--fg2)' }}>{p.pct}%</span>
              </div>
              <div style={{ height: '5px', background: 'var(--bd)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${p.pct}%`, height: '100%', borderRadius: '3px', background: p.cor }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: '14px', padding: '18px 20px' }}>
          <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--fg)', marginBottom: '4px' }}>Evolução Mensal</div>
          <div style={{ fontSize: '12px', color: 'var(--fg2)', marginBottom: '16px' }}>Propostas últimos 12 meses</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '88px' }}>
            {bars.map((b, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div onMouseEnter={() => setHiBar(i)} onMouseLeave={() => setHiBar(11)}
                  style={{ width: '100%', height: `${b.h}%`, borderRadius: '4px 4px 0 0', background: i === hiBar ? '#B8973A' : 'rgba(184,151,58,.22)', cursor: 'pointer', transition: 'background .15s' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '5px', marginTop: '4px' }}>
            {bars.map((b, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '9.5px', color: 'var(--fg3)' }}>{b.mes}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '22px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: '14px', padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--fg)' }}>Últimas Propostas</div>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '12px', color: 'var(--fg2)' }}>Ver todas →</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr>{['Nº', 'Cliente', 'Produto', 'Valor', 'Etapa'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '9px 14px', fontSize: '10.5px', color: 'var(--fg2)', textTransform: 'uppercase', letterSpacing: '.9px', borderBottom: '1px solid var(--bd)', fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {propostas.map(p => (
                  <tr key={p.id} style={{ transition: 'background .12s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid rgba(226,232,240,.6)', fontSize: '11.5px', color: 'var(--fg2)' }}>{p.id}</td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid rgba(226,232,240,.6)', fontWeight: 500, color: 'var(--fg)' }}>{p.cliente}</td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid rgba(226,232,240,.6)', fontSize: '12px', color: 'var(--fg2)' }}>{p.produto}</td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid rgba(226,232,240,.6)', fontFamily: "'DM Mono', monospace", fontSize: '12.5px' }}>{fmt(p.valor)}</td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid rgba(226,232,240,.6)' }}>
                      <span style={{ display: 'inline-flex', padding: '2.5px 9px', borderRadius: '999px', fontSize: '11px', fontWeight: 500, ...etapaCor[p.etapa] }}>
                        {etapaLabel[p.etapa]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: '14px', padding: '18px 20px' }}>
          <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--fg)', marginBottom: '16px' }}>Atividades Recentes</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {atividades.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', paddingBottom: i < atividades.length - 1 ? '16px' : 0, position: 'relative' }}>
                {i < atividades.length - 1 && (
                  <div style={{ position: 'absolute', left: '15px', top: '32px', bottom: 0, width: '2px', background: 'var(--bd)' }} />
                )}
                <div style={{ width: '32px', height: '32px', minWidth: '32px', borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', zIndex: 1 }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1, paddingTop: '4px' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--fg)' }}>{a.texto}</div>
                  <div style={{ fontSize: '11px', color: 'var(--fg2)', marginTop: '2px' }}>{a.sub}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--fg3)', marginTop: '3px' }}>{a.tempo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
