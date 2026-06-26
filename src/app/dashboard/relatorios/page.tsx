'use client';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { mockChartData, mockProductDistribution, formatCurrency } from '@/lib/data';

const consultorData = [
  { name: 'Carlos Mendes', contratos: 32, volume: 12500000 },
  { name: 'Ana Lima', contratos: 28, volume: 9800000 },
  { name: 'Roberto Souza', contratos: 24, volume: 8200000 },
  { name: 'Juliana Park', contratos: 20, volume: 7100000 },
  { name: 'Pedro Dias', contratos: 16, volume: 5400000 },
];

const conversionData = [
  { month: 'Jan', taxa: 28 }, { month: 'Fev', taxa: 32 }, { month: 'Mar', taxa: 30 },
  { month: 'Abr', taxa: 35 }, { month: 'Mai', taxa: 38 }, { month: 'Jun', taxa: 36 },
  { month: 'Jul', taxa: 40 }, { month: 'Ago', taxa: 38 }, { month: 'Set', taxa: 42 },
  { month: 'Out', taxa: 39 }, { month: 'Nov', taxa: 44 }, { month: 'Dez', taxa: 47 },
];

export default function RelatoriosPage() {
  return (
    <div className="animate-fade-in">
      <Header title="Relatórios" subtitle="Análise de desempenho e métricas" />
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {['Hoje', '7 dias', '30 dias', '3 meses', '12 meses'].map(period => (
              <button key={period} className={`px-4 py-2 text-sm rounded-xl font-medium transition-all ${period === '12 meses' ? 'bg-[#003B7A] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>{period}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" icon={<Filter size={14} />}>Filtros</Button>
            <Button variant="secondary" size="sm" icon={<Download size={14} />}>Exportar</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Volume Intermediado', value: 'R$ 48,5M', change: '+22%', up: true }, { label: 'Contratos Fechados', value: '124', change: '+15%', up: true }, { label: 'Taxa de Conversão', value: '34,5%', change: '+2.1pp', up: true }, { label: 'Ticket Médio', value: 'R$ 391K', change: '-1%', up: false }].map(kpi => (
            <Card key={kpi.label} className="card-hover">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              <p className={`text-xs font-medium mt-1 flex items-center gap-1 ${kpi.up ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {kpi.change} vs período anterior
              </p>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-1">Volume Mensal de Crédito</h3>
            <p className="text-sm text-gray-500 mb-5">Evolução anual em R$</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000000).toFixed(0)}M`} />
                <Tooltip formatter={(v) => [formatCurrency(Number(v)), 'Volume']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="volume" fill="#003B7A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-900 mb-1">Taxa de Conversão</h3>
            <p className="text-sm text-gray-500 mb-5">Percentual mensal</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v) => [`${v}%`, 'Conversão']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="taxa" stroke="#C8962C" strokeWidth={2.5} dot={{ fill: '#C8962C', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-1">Ranking de Consultores</h3>
            <p className="text-sm text-gray-500 mb-5">Volume intermediado por consultor</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={consultorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000000).toFixed(0)}M`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} width={100} />
                <Tooltip formatter={(v) => [formatCurrency(Number(v)), 'Volume']} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="volume" fill="#0055B3" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-900 mb-1">Por Produto</h3>
            <p className="text-sm text-gray-500 mb-4">Distribuição de contratos</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={mockProductDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={3}>{mockProductDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v) => [`${v}%`, '']} /></PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">{mockProductDistribution.map(item => (<div key={item.name} className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} /><span className="text-xs text-gray-600">{item.name}</span></div><span className="text-xs font-bold text-gray-800">{item.value}%</span></div>))}</div>
          </Card>
        </div>
        <Card padding="none">
          <div className="p-6 border-b border-gray-50"><h3 className="font-semibold text-gray-900">Detalhamento de Contratos por Período</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Mês</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Contratos</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Volume</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Ticket Médio</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Variação</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {mockChartData.map((row, i) => {
                  const prev = mockChartData[i - 1];
                  const change = prev ? ((row.volume - prev.volume) / prev.volume * 100).toFixed(1) : null;
                  return (
                    <tr key={row.month} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.month} 2024</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-700">{row.contratos}</td>
                      <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">{formatCurrency(row.volume)}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-700">{formatCurrency(row.volume / row.contratos)}</td>
                      <td className="px-6 py-4 text-sm text-right">{change !== null && <span className={`font-medium ${Number(change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>{Number(change) >= 0 ? '+' : ''}{change}%</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
