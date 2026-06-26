'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, Plus, FileText, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
import { mockProposals, PRODUCT_LABELS, PRODUCT_COLORS, formatCurrency, formatDate } from '@/lib/data';
import { ProposalStatus } from '@/types';

const statusConfig: Record<ProposalStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default'; icon: React.ElementType }> = {
  'rascunho': { label: 'Rascunho', variant: 'default', icon: Clock },
  'enviada': { label: 'Enviada', variant: 'info', icon: FileText },
  'em-analise': { label: 'Em Análise', variant: 'warning', icon: AlertCircle },
  'aprovada': { label: 'Aprovada', variant: 'success', icon: CheckCircle2 },
  'recusada': { label: 'Recusada', variant: 'danger', icon: XCircle },
  'cancelada': { label: 'Cancelada', variant: 'danger', icon: XCircle },
};

export default function PropostasPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const filtered = mockProposals.filter(p => {
    const matchSearch = p.clientName.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'todos' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });
  const metrics = { total: mockProposals.length, aprovadas: mockProposals.filter(p => p.status === 'aprovada').length, emAnalise: mockProposals.filter(p => p.status === 'em-analise').length, volumeTotal: mockProposals.reduce((s, p) => s + p.creditValue, 0) };
  return (
    <div className="animate-fade-in">
      <Header title="Propostas" subtitle="Gestão de propostas de crédito" />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Total de Propostas', value: metrics.total, color: '#003B7A' }, { label: 'Aprovadas', value: metrics.aprovadas, color: '#16A34A' }, { label: 'Em Análise', value: metrics.emAnalise, color: '#D97706' }, { label: 'Volume Total', value: formatCurrency(metrics.volumeTotal), color: '#7C3AED' }].map(item => (<Card key={item.label} className="card-hover"><p className="text-xs text-gray-500">{item.label}</p><p className="text-2xl font-bold mt-1" style={{ color: item.color }}>{item.value}</p></Card>))}
        </div>
        <Card padding="sm">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-60"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por cliente ou número..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100" /></div>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-700"><option value="todos">Todos os status</option>{Object.entries(statusConfig).map(([k, v]) => (<option key={k} value={k}>{v.label}</option>))}</select>
            <Button variant="primary" size="sm" icon={<Plus size={14} />} className="ml-auto">Nova Proposta</Button>
          </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(proposal => {
            const status = statusConfig[proposal.status];
            const StatusIcon = status.icon;
            const productColor = PRODUCT_COLORS[proposal.product] || '#003B7A';
            return (
              <Card key={proposal.id} hover className="cursor-pointer border-l-4" style={{ borderLeftColor: productColor }}>
                <div className="flex items-start justify-between mb-4"><div><p className="text-xs font-mono text-gray-400">{proposal.id}</p><p className="font-semibold text-gray-900">{proposal.clientName}</p></div><Badge variant={status.variant}><StatusIcon size={10} className="mr-1" />{status.label}</Badge></div>
                <div className="flex items-center gap-2 mb-3"><span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${productColor}15`, color: productColor }}>{PRODUCT_LABELS[proposal.product]}</span></div>
                <div className="grid grid-cols-2 gap-3 mb-4"><div className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-500 mb-0.5">Valor da Carta</p><p className="text-sm font-bold text-gray-900">{formatCurrency(proposal.creditValue)}</p></div><div className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-500 mb-0.5">Parcela/mês</p><p className="text-sm font-bold text-gray-900">{formatCurrency(proposal.monthlyInstallment)}</p></div></div>
                <div className="flex items-center justify-between text-xs text-gray-400"><span>{proposal.installments}x · {proposal.administrator}</span><span>{formatDate(proposal.createdAt)}</span></div>
                <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between"><span className="text-xs text-gray-500">Consultor: {proposal.assignedTo}</span><div className="flex gap-2"><button className="text-xs text-blue-700 hover:underline font-medium">Ver</button><button className="text-xs text-blue-700 hover:underline font-medium">Editar</button></div></div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
