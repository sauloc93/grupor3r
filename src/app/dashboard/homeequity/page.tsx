'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Home, CheckCircle2, Circle, FileText, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/data';

const products = [
  {
    id: 'residencial',
    name: 'Residencial',
    rate: '0,99% a.m.',
    ltv: '60%',
    min: 100000,
    max: 5000000,
    term: '60 a 240 meses',
    highlights: ['Imóvel residencial urbano', 'Avaliação gratuita', 'Liberação em 15 dias', 'Portabilidade disponível'],
    color: '#003B7A',
  },
  {
    id: 'comercial',
    name: 'Comercial',
    rate: '1,19% a.m.',
    ltv: '50%',
    min: 200000,
    max: 10000000,
    term: '60 a 180 meses',
    highlights: ['Imóvel comercial ou industrial', 'PJ e PF aceitos', 'Liberação em 20 dias', 'Sem restrição de finalidade'],
    color: 'var(--gold)',
  },
  {
    id: 'premium',
    name: 'Premium',
    rate: '0,89% a.m.',
    ltv: '70%',
    min: 1000000,
    max: 50000000,
    term: '120 a 360 meses',
    highlights: ['Imóveis de alto padrão', 'Análise personalizada', 'Gerente exclusivo', 'Condições negociadas'],
    color: 'var(--pu-fg)',
  },
];

const docChecklist = [
  { category: 'Documentos Pessoais', items: ['RG e CPF (ou CNH)', 'Comprovante de residência', 'Certidão de estado civil', 'Comprovante de renda (3 últimos meses)'] },
  { category: 'Documentos do Imóvel', items: ['Matrícula atualizada (max. 30 dias)', 'Certidões de ônus e ações', 'IPTU do exercício atual', 'Plantas aprovadas (se disponível)'] },
  { category: 'Documentos Empresariais (PJ)', items: ['Contrato social e alterações', 'CNPJ ativo e regular', 'Balanço patrimonial (2 anos)', 'Faturamento dos últimos 12 meses'] },
];

export default function HomeEquityPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (item: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const totalItems = docChecklist.reduce((s, c) => s + c.items.length, 0);
  const checkedCount = checkedItems.size;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
        {products.map(p => (
          <Card key={p.id} hover style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: p.color }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${p.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color }}>
                <Home size={20} />
              </div>
              <div>
                <p style={{ fontSize: '15px', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--fg)' }}>{p.name}</p>
                <p style={{ fontSize: '11px', color: 'var(--fg3)' }}>Home Equity</p>
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: 'var(--surface-2)', borderRadius: '10px', marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', color: 'var(--fg3)', marginBottom: '4px' }}>Taxa a partir de</p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: p.color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{p.rate}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
              {[
                { label: 'LTV Máx.', value: p.ltv },
                { label: 'Prazo', value: p.term },
                { label: 'Mín.', value: formatCurrency(p.min) },
                { label: 'Máx.', value: formatCurrency(p.max) },
              ].map(item => (
                <div key={item.label} style={{ background: 'var(--surface-2)', borderRadius: '7px', padding: '8px 10px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--fg3)', marginBottom: '2px' }}>{item.label}</p>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg)', fontFamily: "'DM Mono', monospace" }}>{item.value}</p>
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
              Simular <ChevronRight size={14} />
            </Button>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)' }}>Checklist de Documentação</h3>
            <Badge variant={checkedCount === totalItems ? 'success' : 'info'}>{checkedCount}/{totalItems} itens</Badge>
          </div>
          {docChecklist.map(category => (
            <div key={category.category} style={{ marginBottom: '18px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={11} /> {category.category}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {category.items.map(item => {
                  const checked = checkedItems.has(item);
                  return (
                    <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '8px 10px', borderRadius: '7px', background: checked ? 'var(--ok-bg)' : 'transparent', transition: 'background .15s' }}>
                      <button onClick={() => toggleItem(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: checked ? 'var(--ok-fg)' : 'var(--bd)', flexShrink: 0 }}>
                        {checked ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                      </button>
                      <span style={{ fontSize: '13px', color: checked ? 'var(--ok-fg)' : 'var(--fg)', textDecoration: checked ? 'line-through' : 'none' }}>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)', marginBottom: '14px' }}>Progresso</h3>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', color: 'var(--fg2)' }}>Documentação</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg)', fontFamily: "'DM Mono', monospace" }}>{Math.round((checkedCount / totalItems) * 100)}%</span>
            </div>
            <div style={{ height: '8px', background: 'var(--surface-2)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ width: `${(checkedCount / totalItems) * 100}%`, height: '100%', background: '#003B7A', borderRadius: '999px', transition: 'width .3s' }} />
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--fg2)', marginBottom: '16px', lineHeight: 1.5 }}>
            Marque os documentos já coletados para acompanhar o progresso da análise.
          </p>
          <Button variant="primary" style={{ width: '100%' }}>Iniciar Análise</Button>
        </Card>
      </div>
    </div>
  );
}
