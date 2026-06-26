'use client';

import { Header } from '@/components/layout/Header';
import { Card, MetricCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  Users, FileText, FileCheck, DollarSign, TrendingUp, Target, Clock, BarChart2, ChevronRight,
} from 'lucide-react';
import { mockMetrics, mockChartData, mockProductDistribution, mockProposals, mockClients, formatCurrency, formatDate } from '@/lib/data';
import { PRODUCT_LABELS } from '@/lib/data';
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

export default function DashboardPage() {
  const metrics = mockMetrics;
  return (
    <div className="animate-fade-in">
      <Header title="Dashboard" subtitle={`Bem-vindo de volta! Hoje é ${new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}`} />
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Total de Clientes" value={metrics.totalClients.toLocaleString('pt-BR')} subtitle="Carteira ativa" icon={<Users size={22} />} trend="up" trendValue="+12%" color="#003B7A" />
          <MetricCard title="Propostas Ativas" value={metrics.activeProposals.toString()} subtitle="Em andamento" icon={<FileText size={22} />} trend="up" trendValue="+8%" color="#C8962C" />
          <MetricCard title="Contratos Assinados" value={metrics.signedContracts.toString()} subtitle="Total acumulado" icon={<FileCheck size={22} />} trend="up" trendValue="+15%" color="#16A34A" />
          <MetricCard title="Volume de Crédito" value={`R$ ${(metrics.totalCreditVolume / 1000000).toFixed(1)}M`} subtitle="Total intermediado" icon={<DollarSign size={22} />} trend="up" trendValue="+22%" color="#7C3AED" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard title="Receita Mensal" value={formatCurrency(metrics.monthlyRevenue)} icon={<TrendingUp size={22} />} trend="up" trendValue="+18%" color="#0891B2" />
          <MetricCard title="Taxa de Conversão" value={`${metrics.conversionRate}%`} icon={<Target size={22} />} trend="up" trendValue="+2.1pp" color="#003B7A" />
          <MetricCard title="Ticket Médio" value={formatCurrency(metrics.averageTicket)} icon={<BarChart2 size={22} />} trend="neutral" trendValue="estável" color="#C8962C" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div><h3 className="font-semibold text-gray-900">Volume de Crédito</h3><p className="text-sm text-gray-500">Evolução mensal 2024</p></div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockChartData}>
                <defs><linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#003B7A" stopOpacity={0.15} /><stop offset="95%" stopColor="#003B7A" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Volume']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="volume" stroke="#003B7A" strokeWidth={2.5} fill="url(#colorVolume)" dot={false} activeDot={{ r: 5, fill: '#003B7A' }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-900 mb-1">Distribuição</h3>
            <p className="text-sm text-gray-500 mb-4">Por produto</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={mockProductDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">{mockProductDistribution.map((entry, index) => <Cell key={index} fill={entry.color} />)}</Pie><Tooltip formatter={(v) => [`${v}%`, '']} /></PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">{mockProductDistribution.map(item => (<div key={item.name} className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} /><span className="text-xs text-gray-600">{item.name}</span></div><span className="text-xs font-semibold text-gray-800">{item.value}%</span></div>))}</div>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card padding="none">
            <div className="flex items-center justify-between p-6 border-b border-gray-50">
              <div><h3 className="font-semibold text-gray-900">Últimas Propostas</h3><p className="text-sm text-gray-500">Atividade recente</p></div>
              <Link href="/dashboard/propostas" className="flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800">Ver todas <ChevronRight size={14} /></Link>
            </div>
            <div className="divide-y divide-gray-50">{mockProposals.slice(0, 4).map(p => { const status = statusConfig[p.status] || { label: p.status, variant: 'default' as const }; return (<div key={p.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ background: '#003B7A' }}>{p.clientName.split(' ').map(w => w[0]).slice(0, 2).join('')}</div><div><p className="text-sm font-medium text-gray-900">{p.clientName}</p><p className="text-xs text-gray-500">{PRODUCT_LABELS[p.product]}</p></div></div><div className="text-right"><p className="text-sm font-semibold text-gray-900">{formatCurrency(p.creditValue)}</p><Badge variant={status.variant}>{status.label}</Badge></div></div>); })}</div>
          </Card>
          <Card padding="none">
            <div className="flex items-center justify-between p-6 border-b border-gray-50">
              <div><h3 className="font-semibold text-gray-900">Clientes Recentes</h3><p className="text-sm text-gray-500">Cadastros recentes</p></div>
              <Link href="/dashboard/crm" className="flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800">Ver todos <ChevronRight size={14} /></Link>
            </div>
            <div className="divide-y divide-gray-50">{mockClients.slice(0, 4).map(c => { const status = clientStatusConfig[c.status] || { label: c.status, variant: 'default' as const }; return (<div key={c.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ background: c.type === 'PJ' ? '#C8962C' : '#003B7A' }}>{c.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</div><div><p className="text-sm font-medium text-gray-900">{c.name}</p><p className="text-xs text-gray-500">{c.type} · {c.city}</p></div></div><div className="text-right"><Badge variant={status.variant}>{status.label}</Badge><p className="text-xs text-gray-400 mt-1">{formatDate(c.createdAt)}</p></div></div>); })}</div>
          </Card>
        </div>
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-amber-600" />
            <h3 className="font-semibold text-gray-900">Tarefas Pendentes</h3>
            <span className="ml-auto text-sm text-amber-600 font-medium">{metrics.pendingTasks} pendentes</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{ text: 'Enviar proposta para Tech Solutions', due: 'Hoje', priority: 'alta' }, { text: 'Reunião com Construtora Horizonte', due: 'Amanhã', priority: 'alta' }, { text: 'Revisar documentação João Silva', due: '28/03', priority: 'media' }, { text: 'Follow-up Pedro Alves', due: '29/03', priority: 'media' }, { text: 'Atualizar dados cadastrais Indústria Qualidade', due: '30/03', priority: 'baixa' }, { text: 'Relatório mensal de conversões', due: '01/04', priority: 'baixa' }].map((task, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <input type="checkbox" className="mt-0.5 accent-blue-700" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{task.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{task.due}</span>
                    <Badge variant={task.priority === 'alta' ? 'danger' : task.priority === 'media' ? 'warning' : 'default'}>{task.priority}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
