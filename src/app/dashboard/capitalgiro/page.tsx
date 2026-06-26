'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Briefcase, CheckCircle2, Circle, ChevronRight, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/data';

const products = [
  {
    id: 'mei',
    name: 'MEI / ME',
    subtitle: 'Microempreendedores',
    rate: '1,99% a.m.',
    min: 5000,
    max: 80000,
    term: '12 a 48 meses',
    highlights: ['Sem garantia real', 'Aprovação em 48h', 'Documentação simplificada', 'Até R$ 80 mil'],
    color: 'var(--ok-fg)',
    badge: 'Mais Popular',
  },
  {
    id: 'media',
    name: 'Empresa Média',
    subtitle: 'Faturamento R$ 360K — R$ 4,8M/ano',
    rate: '1,49% a.m.',
    min: 80000,
    max: 1500000,
    term: '24 a 60 meses',
    highlights: ['Garantias flexíveis', 'Aprovação em 5 dias', 'Gestores especializados', 'Até R$ 1,5 milhão'],
    color: '#003B7A',
    badge: null,
  },
  {
    id: 'grande',
    name: 'Grande Empresa',
    subtitle: 'Faturamento acima de R$ 4,8M/ano',
    rate: '0,99% a.m.',
    min: 1000000,
    max: 50000000,
    term: '36 a 84 meses',
    highlights: ['Estrutura personalizada', 'Account manager exclusivo', 'Covenants flexíveis', 'Sem limite definido'],
    color: 'var(--pu-fg)',
    badge: 'Corporativo',
  },
];

const pjDocs = [
  { category: 'Documentos da Empresa', items: ['CNPJ ativo e regular', 'Contrato social / estatuto', 'Últimas alterações contratuais', 'Certidão negativa de débitos (CND)'] },
  { category: 'Documentos Financeiros', items: ['Balanço patrimonial (2 últimos anos)', 'DRE dos últimos 12 meses', 'Extratos bancários (3 meses)', 'Faturamento comprovado'] },
  { category: 'Documentos dos Sócios', items: ['RG e CPF de todos os sócios', 'Comprovante de residência dos sócios', 'Declaração de IR dos sócios', 'Certidão de casamento (se aplicável)'] },
];

export default function CapitalGiroPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (item: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const totalItems = pjDocs.reduce((s, c) => s + c.items.length, 0);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
        {products.map(p => (
          <Card key={p.id} hover style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: p.color }} />
            {p.badge && (
              <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                <Badge variant={p.id === 'mei' ? 'gold' : 'purple'}>{p.badge}</Badge>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${p.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color, flexShrink: 0 }}>
                <Briefcase size={20} />
              </div>
              <div>
                <p style={{ fontSize: '15px', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--fg)' }}>{p.name}</p>
                <p style={{ fontSize: '11px', color: 'var(--fg3)', lineHeight: 1.3 }}>{p.subtitle}</p>
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '14px', background: 'var(--surface-2)', borderRadius: '10px', marginBottom: '14px' }}>
              <p style={{ fontSize: '11px', color: 'var(--fg3)', marginBottom: '3px' }}>Taxa a partir de</p>
              <p style={{ fontSize: '26px', fontWeight: 800, color: p.color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{p.rate}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              {[
                { label: 'Mínimo', value: formatCurrency(p.min) },
                { label: 'Máximo', value: p.max >= 50000000 ? 'Sob análise' : formatCurrency(p.max) },
                { label: 'Prazo', value: p.term },
                { label: 'Sistema', value: 'SAC / Price' },
              ].map(item => (
                <div key={item.label} style={{ background: 'var(--surface-2)', borderRadius: '7px', padding: '8px 10px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--fg3)', marginBottom: '2px' }}>{item.label}</p>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--fg)' }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '14px' }}>
              {p.highlights.map(h => (
                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '4px 0' }}>
                  <CheckCircle2 size={12} style={{ color: p.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: 'var(--fg2)' }}>{h}</span>
                </div>
              ))}
            </div>

            <Button variant="primary" style={{ width: '100%', background: p.color }}>
              Iniciar Análise <ChevronRight size={14} />
            </Button>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '16px' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)' }}>Documentação PJ</h3>
            <Badge variant={checked.size === totalItems ? 'success' : 'info'}>{checked.size}/{totalItems}</Badge>
          </div>
          {pjDocs.map(cat => (
            <div key={cat.category} style={{ marginBottom: '18px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{cat.category}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {cat.items.map(item => {
                  const isChecked = checked.has(item);
                  return (
                    <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '7px 10px', borderRadius: '7px', background: isChecked ? 'var(--ok-bg)' : 'transparent', transition: 'background .15s' }}>
                      <button onClick={() => toggle(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: isChecked ? 'var(--ok-fg)' : 'var(--bd)', flexShrink: 0 }}>
                        {isChecked ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                      </button>
                      <span style={{ fontSize: '13px', color: isChecked ? 'var(--ok-fg)' : 'var(--fg)', textDecoration: isChecked ? 'line-through' : 'none' }}>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Card>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '14px', color: 'var(--fg)', marginBottom: '12px' }}>Progresso</h3>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '12px', color: 'var(--fg2)' }}>Documentação</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg)' }}>{Math.round((checked.size / totalItems) * 100)}%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--surface-2)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${(checked.size / totalItems) * 100}%`, height: '100%', background: '#003B7A', borderRadius: '999px', transition: 'width .3s' }} />
              </div>
            </div>
            <Button variant="primary" style={{ width: '100%' }}>Enviar para Análise</Button>
          </Card>

          <Card>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '14px', color: 'var(--fg)', marginBottom: '12px' }}>Por que Capital de Giro R3R?</h3>
            {[
              'Aprovação ágil e sem burocracia',
              'Condições exclusivas para clientes',
              'Assessoria especializada em crédito PJ',
              'Recursos liberados em conta corrente',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <TrendingUp size={12} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '12px', color: 'var(--fg2)', lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
