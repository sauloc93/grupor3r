'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, DollarSign, User, Calendar } from 'lucide-react';
import { mockPipeline, PRODUCT_LABELS, PRODUCT_COLORS, formatCurrency } from '@/lib/data';
import { PipelineCard, PipelineStage } from '@/types';

const STAGES: { key: PipelineStage; label: string; color: string; bgColor: string }[] = [
  { key: 'captacao', label: 'Captação', color: '#6B7280', bgColor: '#F9FAFB' },
  { key: 'qualificacao', label: 'Qualificação', color: '#0891B2', bgColor: '#ECFEFF' },
  { key: 'proposta', label: 'Proposta', color: '#7C3AED', bgColor: '#F5F3FF' },
  { key: 'analise', label: 'Análise', color: '#C8962C', bgColor: '#FFFBEB' },
  { key: 'fechamento', label: 'Fechamento', color: '#16A34A', bgColor: '#F0FDF4' },
  { key: 'pos-venda', label: 'Pós-Venda', color: '#003B7A', bgColor: '#EFF6FF' },
];

const priorityColors: Record<string, string> = { alta: '#DC2626', media: '#D97706', baixa: '#6B7280' };

function KanbanCard({ card }: { card: PipelineCard }) {
  const productColor = PRODUCT_COLORS[card.product] || '#003B7A';
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 cursor-grab hover:shadow-md transition-all duration-200 card-hover">
      <div className="flex items-center justify-between mb-3">
        <span className="w-2 h-2 rounded-full" style={{ background: priorityColors[card.priority] }} />
        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${productColor}15`, color: productColor }}>{PRODUCT_LABELS[card.product]}</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: productColor }}>{card.clientName.split(' ').map(w => w[0]).slice(0, 2).join('')}</div>
        <p className="text-sm font-semibold text-gray-900 truncate">{card.clientName}</p>
      </div>
      <div className="flex items-center gap-1.5 mb-3"><DollarSign size={13} className="text-green-600" /><span className="text-sm font-bold text-gray-900">{formatCurrency(card.value)}</span></div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-gray-500"><User size={11} /><span>{card.assignedTo}</span></div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500"><Calendar size={11} /><span>Prev. {new Date(card.expectedClose).toLocaleDateString('pt-BR')}</span></div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1"><span className="text-xs text-gray-400">Probabilidade</span><span className="text-xs font-semibold" style={{ color: card.probability >= 70 ? '#16A34A' : card.probability >= 40 ? '#C8962C' : '#6B7280' }}>{card.probability}%</span></div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${card.probability}%`, background: card.probability >= 70 ? '#16A34A' : card.probability >= 40 ? '#C8962C' : '#9CA3AF' }} /></div>
      </div>
    </div>
  );
}

export default function PipelinePage() {
  const [cards] = useState<PipelineCard[]>(mockPipeline);
  const stageCards = (stage: PipelineStage) => cards.filter(c => c.stage === stage);
  const stageValue = (stage: PipelineStage) => cards.filter(c => c.stage === stage).reduce((sum, c) => sum + c.value, 0);
  const totalVolume = cards.reduce((sum, c) => sum + c.value, 0);
  const weightedVolume = cards.reduce((sum, c) => sum + c.value * c.probability / 100, 0);
  return (
    <div className="animate-fade-in">
      <Header title="Pipeline de Vendas" subtitle="Gestão visual do funil de negócios" />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="card-hover"><p className="text-xs text-gray-500">Total de Oportunidades</p><p className="text-2xl font-bold text-gray-900 mt-1">{cards.length}</p></Card>
          <Card className="card-hover"><p className="text-xs text-gray-500">Volume Total</p><p className="text-2xl font-bold mt-1" style={{ color: '#003B7A' }}>{formatCurrency(totalVolume)}</p></Card>
          <Card className="card-hover"><p className="text-xs text-gray-500">Volume Ponderado</p><p className="text-2xl font-bold mt-1" style={{ color: '#16A34A' }}>{formatCurrency(weightedVolume)}</p></Card>
          <Card className="card-hover"><p className="text-xs text-gray-500">Probabilidade Média</p><p className="text-2xl font-bold mt-1" style={{ color: '#C8962C' }}>{Math.round(cards.reduce((s, c) => s + c.probability, 0) / cards.length)}%</p></Card>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {STAGES.map(stage => {
              const stageList = stageCards(stage.key);
              const value = stageValue(stage.key);
              return (
                <div key={stage.key} className="w-72 flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: stage.color }} /><h3 className="font-semibold text-sm text-gray-800">{stage.label}</h3><span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{stageList.length}</span></div>
                    <button className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"><Plus size={14} /></button>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{formatCurrency(value)}</p>
                  <div className="space-y-3 min-h-40 p-3 rounded-2xl border-2 border-dashed border-gray-100 transition-colors" style={{ background: stage.bgColor }} onDragOver={e => e.preventDefault()}>
                    {stageList.map(card => <KanbanCard key={card.id} card={card} />)}
                    {stageList.length === 0 && <div className="text-center py-8 text-gray-300"><p className="text-xs">Nenhuma oportunidade</p></div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Card><h3 className="font-semibold text-gray-800 mb-4">Legenda de Produtos</h3><div className="flex flex-wrap gap-4">{Object.entries(PRODUCT_LABELS).map(([key, label]) => (<div key={key} className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: PRODUCT_COLORS[key] }} /><span className="text-sm text-gray-600">{label}</span></div>))}</div></Card>
      </div>
    </div>
  );
}
