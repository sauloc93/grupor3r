'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, Plus, Download, Upload, Phone, Mail, MapPin, Eye, Users, Building2, User } from 'lucide-react';
import { mockClients, formatDate } from '@/lib/data';
import { Client, ClientStatus } from '@/types';

const statusConfig: Record<ClientStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
  'ativo': { label: 'Ativo', variant: 'success' },
  'prospect': { label: 'Prospect', variant: 'info' },
  'lead': { label: 'Lead', variant: 'warning' },
  'convertido': { label: 'Convertido', variant: 'success' },
  'inativo': { label: 'Inativo', variant: 'default' },
};

function ClientModal({ client, onClose }: { client: Client; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-fade-in">
        <div className="flex items-center gap-4 p-6 border-b border-gray-100">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold" style={{ background: client.type === 'PJ' ? '#C8962C' : '#003B7A' }}>{client.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</div>
          <div className="flex-1"><h2 className="text-xl font-bold text-gray-900">{client.name}</h2><p className="text-gray-500">{client.cpfCnpj}</p></div>
          <Badge variant={statusConfig[client.status].variant}>{statusConfig[client.status].label}</Badge>
          <button onClick={onClose} className="ml-2 p-2 rounded-xl hover:bg-gray-100 text-gray-400">✕</button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div><p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Contato</p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2 text-sm"><Mail size={14} className="text-gray-400" /><span>{client.email}</span></div>
                <div className="flex items-center gap-2 text-sm"><Phone size={14} className="text-gray-400" /><span>{client.phone}</span></div>
                {client.city && <div className="flex items-center gap-2 text-sm"><MapPin size={14} className="text-gray-400" /><span>{client.city}, {client.state}</span></div>}
              </div>
            </div>
            <div><p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Segmento</p><p className="text-sm mt-1 font-medium text-gray-800">{client.segment}</p></div>
          </div>
          <div className="space-y-4">
            <div><p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Consultor Responsável</p><p className="text-sm mt-1 font-medium text-gray-800">{client.assignedTo}</p></div>
            <div><p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Cadastrado em</p><p className="text-sm mt-1 font-medium text-gray-800">{formatDate(client.createdAt)}</p></div>
            <div><p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Tags</p><div className="flex flex-wrap gap-2">{client.tags.map(tag => (<span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-100">{tag}</span>))}</div></div>
          </div>
        </div>
        <div className="p-6 pt-0 flex gap-3">
          <Button variant="primary" className="flex-1">Editar Cliente</Button>
          <Button variant="outline">Nova Proposta</Button>
        </div>
      </div>
    </div>
  );
}

export default function CRMPage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'todos' | 'PF' | 'PJ'>('todos');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filtered = mockClients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.cpfCnpj.includes(search);
    const matchType = filterType === 'todos' || c.type === filterType;
    const matchStatus = filterStatus === 'todos' || c.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="animate-fade-in">
      {selectedClient && <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />}
      <Header title="CRM / Clientes" subtitle={`${mockClients.length} clientes na carteira`} />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Total', value: mockClients.length, color: '#003B7A', icon: <Users size={16} /> }, { label: 'Ativos', value: mockClients.filter(c => c.status === 'ativo').length, color: '#16A34A', icon: <User size={16} /> }, { label: 'Prospects', value: mockClients.filter(c => c.status === 'prospect').length, color: '#0891B2', icon: <Users size={16} /> }, { label: 'Empresas (PJ)', value: mockClients.filter(c => c.type === 'PJ').length, color: '#C8962C', icon: <Building2 size={16} /> }].map(item => (
            <Card key={item.label} className="card-hover"><div className="flex items-center justify-between"><div><p className="text-xs text-gray-500">{item.label}</p><p className="text-2xl font-bold mt-0.5" style={{ color: item.color }}>{item.value}</p></div><div className="rounded-xl p-2.5" style={{ background: `${item.color}15`, color: item.color }}>{item.icon}</div></div></Card>
          ))}
        </div>
        <Card padding="sm">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-64"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome, e-mail, CPF/CNPJ..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300" /></div>
            <select value={filterType} onChange={e => setFilterType(e.target.value as 'todos' | 'PF' | 'PJ')} className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-700"><option value="todos">Todos os tipos</option><option value="PF">Pessoa Física</option><option value="PJ">Pessoa Jurídica</option></select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-700"><option value="todos">Todos os status</option><option value="lead">Lead</option><option value="prospect">Prospect</option><option value="ativo">Ativo</option><option value="convertido">Convertido</option><option value="inativo">Inativo</option></select>
            <div className="ml-auto flex items-center gap-2"><Button variant="secondary" size="sm" icon={<Download size={14} />}>Exportar</Button><Button variant="secondary" size="sm" icon={<Upload size={14} />}>Importar</Button><Button variant="primary" size="sm" icon={<Plus size={14} />}>Novo Cliente</Button></div>
          </div>
        </Card>
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contato</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Segmento</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Consultor</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cadastro</th>
                <th className="px-4 py-4" />
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(client => { const st = statusConfig[client.status]; return (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: client.type === 'PJ' ? '#C8962C' : '#003B7A' }}>{client.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</div><div><p className="text-sm font-medium text-gray-900">{client.name}</p><p className="text-xs text-gray-400">{client.cpfCnpj}</p></div></div></td>
                    <td className="px-4 py-4"><span className={`text-xs font-bold px-2 py-1 rounded-lg ${client.type === 'PJ' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>{client.type}</span></td>
                    <td className="px-4 py-4"><div className="space-y-0.5"><p className="text-xs text-gray-600 flex items-center gap-1"><Mail size={11} /> {client.email}</p><p className="text-xs text-gray-600 flex items-center gap-1"><Phone size={11} /> {client.phone}</p></div></td>
                    <td className="px-4 py-4"><span className="text-sm text-gray-700">{client.segment}</span></td>
                    <td className="px-4 py-4"><Badge variant={st.variant}>{st.label}</Badge></td>
                    <td className="px-4 py-4"><span className="text-sm text-gray-700">{client.assignedTo}</span></td>
                    <td className="px-4 py-4"><span className="text-xs text-gray-400">{formatDate(client.createdAt)}</span></td>
                    <td className="px-4 py-4"><button onClick={() => setSelectedClient(client)} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-700 transition-colors"><Eye size={16} /></button></td>
                  </tr>
                ); })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50">
            <p className="text-sm text-gray-500">{filtered.length} de {mockClients.length} clientes</p>
            <div className="flex items-center gap-2"><button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">Anterior</button><button className="px-3 py-1.5 text-sm bg-blue-700 text-white rounded-lg">1</button><button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">Próximo</button></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
