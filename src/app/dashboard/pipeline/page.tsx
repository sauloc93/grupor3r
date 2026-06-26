'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, User, Calendar } from 'lucide-react';
import { mockPipeline, PRODUCT_LABELS, PRODUCT_COLORS, formatCurrency } from '@/lib/data';
import { PipelineCard, PipelineStage } from '@/types';

const STAGES: { key: PipelineStage; label: string; color: string }[] = [
  { key: 'captacao', label: 'Captação', color: '#94A3B8' },
  { key: 'qualificacao', label: 'Qualificação', color: 'var(--in-fg)' },
  { key: 'proposta', label: 'Proposta', color: 'var(--pu-fg)' },
  { key: 'analise', label: 'Análise', color: 'var(--gold)' },
  { key: 'fechamento', label: 'Fechamento', color: 'var(--ok-fg)' },
  { key: 'pos-venda', label: 'Pós-Venda', color: '#003B7A' },
];

const priorityColors: Record<string, string> = {
  alta: 'var(--er-fg)',
  media: 'var(--wn-fg)',
  baixa: 'var(--fg3)',
};

export default function PipelinePage() {
  const [cards] = useState<PipelineCard[]>(mockPipeline);

  const stageCards = (stage: PipelineStage) => cards.filter(c => c.stage === stage);
  const stageValue = (stage: PipelineStage) => cards.filter(c => c.stage === stage).reduce((sum, c) => sum + c.value, 0);
  const totalVolume = cards.reduce((sum, c) => sum + c.value, 0);
  const weightedVolume = cards.reduce((sum, c) => sum + c.value * c.probability / 100, 0);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        {[
          { label: 'Oportunidades', value: cards.length.toString(), color: '#003B7A' },
          { label: 'Volume Total', value: formatCurrency(totalVolume), color: '#003B7A' },
          { label: 'Vol. Ponderado', value: formatCurrency(weightedVolume), color: 'var(--ok-fg)' },
          { label: 'Prob. Média', value: `${Math.round(cards.reduce((s, c) => s + c.probability, 0) / cards.length)}%`, color: 'var(--gold)' },
        ].map(item => (
          <Card key={item.label} hover>
            <p style={{ fontSize: '11px', color: 'var(--fg2)', marginBottom: '6px' }}>{item.label}</p>
            <p style={{ fontSize: '20px', fontWeight: 700, color: item.color, fontFamily: "'DM Mono', monospace" }}>{item.value}</p>
          </Card>
        ))}
      </div>

      <div style={{ overflowX: 'auto', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '14px', minWidth: 'max-content' }}>
          {STAGES.map(stage => {
            const list = stageCards(stage.key);
            return (
              <div key={stage.key} style={{ width: '260px', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '999px', background: stage.color }} />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg)' }}>{stage.label}</span>
                    <span style={{ background: 'var(--surface-2)', border: '1px solid var(--bd)', color: 'var(--fg2)', borderRadius: '999px', fontSize: '10px', fontWeight: 600, padding: '1px 6px' }}>{list.length}</span>
                  </div>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg3)', padding: '3px', borderRadius: '5px', display: 'flex' }}><Plus size={13} /></button>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--fg3)', marginBottom: '10px', fontFamily: "'DM Mono', monospace" }}>{formatCurrency(stageValue(stage.key))}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '160px', background: 'var(--surface-2)', border: '1px dashed var(--bd)', borderRadius: '12px', padding: '10px' }}>
                  {list.map(card => {
                    const pc = PRODUCT_COLORS[card.product] || '#003B7A';
                    return (
                      <div key={card.id} style={{ background: '#fff', borderRadius: '10px', border: '1px solid var(--bd)', padding: '12px', cursor: 'pointer', transition: 'box-shadow .15s' }}
                        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,.08)')}
                        onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '999px', background: priorityColors[card.priority], display: 'inline-block' }} />
                          <span style={{ fontSize: '10px', fontWeight: 500, padding: '1px 7px', borderRadius: '999px', background: `${pc}14`, color: pc }}>{PRODUCT_LABELS[card.product]}</span>
                        </div>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg)', marginBottom: '8px' }}>{card.clientName}</p>
                        <p style={{ fontSize: '14px', fontWeight: 700, color: '#003B7A', marginBottom: '8px', fontFamily: "'DM Mono', monospace" }}>{formatCurrency(card.value)}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--fg3)', display: 'flex', alignItems: 'center', gap: '4px' }}><User size={10} />{card.assignedTo}</span>
                          <span style={{ fontSize: '11px', color: 'var(--fg3)', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={10} />Prev. {new Date(card.expectedClose).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                            <span style={{ fontSize: '10px', color: 'var(--fg3)' }}>Prob.</span>
                            <span style={{ fontSize: '10px', fontWeight: 600, color: card.probability >= 70 ? 'var(--ok-fg)' : card.probability >= 40 ? 'var(--gold)' : 'var(--fg3)' }}>{card.probability}%</span>
                          </div>
                          <div style={{ height: '3px', background: 'var(--bd)', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ width: `${card.probability}%`, height: '100%', background: card.probability >= 70 ? 'var(--ok-fg)' : card.probability >= 40 ? 'var(--gold)' : 'var(--fg3)', borderRadius: '999px' }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {list.length === 0 && <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--fg3)', padding: '20px 0' }}>Vazio</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
