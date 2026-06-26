'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FileCheck, Download, Eye, PenLine, Search, Plus, Shield, Clock, CheckCircle2 } from 'lucide-react';
import { mockContracts, PRODUCT_LABELS, PRODUCT_COLORS, formatCurrency, formatDate } from '@/lib/data';

const statusConfig = {
  'rascunho': { label: 'Rascunho', variant: 'default' as const, icon: Clock },
  'assinado': { label: 'Assinado', variant: 'info' as const, icon: CheckCircle2 },
  'vigente': { label: 'Vigente', variant: 'success' as const, icon: Shield },
  'encerrado': { label: 'Encerrado', variant: 'default' as const, icon: FileCheck },
};

function ContractCard({ contract }: { contract: typeof mockContracts[0] }) {
  const status = statusConfig[contract.status];
  const StatusIcon = status.icon;
  const productColor = PRODUCT_COLORS[contract.product] || '#003B7A';
  return (
    <Card className="card-hover cursor-pointer">
      <div className="flex items-start justify-between mb-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${productColor}15` }}><FileCheck size={18} style={{ color: productColor }} /></div><div><p className="text-xs font-mono text-gray-400">{contract.id}</p><p className="font-semibold text-gray-900">{contract.clientName}</p></div></div><Badge variant={status.variant}><StatusIcon size={10} className="mr-1 inline" />{status.label}</Badge></div>
      <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${productColor}15`, color: productColor }}>{PRODUCT_LABELS[contract.product]}</span></div>
      <div className="bg-gray-50 rounded-xl p-3 mb-4"><p className="text-xs text-gray-500">Valor do Crédito</p><p className="text-lg font-bold text-gray-900">{formatCurrency(contract.creditValue)}</p></div>
      <div className="space-y-1.5 mb-4">{contract.signedAt && <div className="flex justify-between text-xs"><span className="text-gray-400">Assinatura</span><span className="font-medium text-gray-700">{formatDate(contract.signedAt)}</span></div>}<div className="flex justify-between text-xs"><span className="text-gray-400">Emissão</span><span className="font-medium text-gray-700">{formatDate(contract.createdAt)}</span></div></div>
      <div className="pt-3 border-t border-gray-50 flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"><Eye size={13} /> Visualizar</button>
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"><Download size={13} /> Baixar</button>
        {contract.status === 'rascunho' && <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"><PenLine size={13} /> Assinar</button>}
      </div>
    </Card>
  );
}

function ContractGeneratorModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div><h2 className="text-xl font-bold text-gray-900">Gerar Novo Contrato</h2><p className="text-sm text-gray-500">Passo {step} de 4</p></div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 text-lg">✕</button>
        </div>
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2 mb-6">
            {['Cliente', 'Produto', 'Revisão', 'Assinar'].map((label, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i + 1 === step ? 'text-white shadow-md' : i + 1 < step ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`} style={i + 1 === step ? { background: '#003B7A' } : {}}>{i + 1 < step ? '✓' : i + 1}</div>
                <span className={`text-xs ${i + 1 <= step ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>{label}</span>
                {i < 3 && <div className={`flex-1 h-0.5 rounded ${i + 1 < step ? 'bg-green-400' : 'bg-gray-100'}`} />}
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 pb-6 space-y-4">
          {step === 1 && <div className="space-y-4"><div><label className="text-sm font-medium text-gray-700 block mb-1.5">Selecionar Cliente</label><select className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50"><option>João Silva</option><option>Tech Solutions Ltda</option><option>Maria Fernanda Costa</option></select></div><div><label className="text-sm font-medium text-gray-700 block mb-1.5">Proposta Vinculada</label><select className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50"><option>P001 - Consórcio Contemplado R$ 350.000</option><option>P002 - Capital de Giro R$ 500.000</option></select></div></div>}
          {step === 2 && <div className="grid grid-cols-2 gap-4">{Object.entries(PRODUCT_LABELS).map(([key, label]) => (<label key={key} className="flex items-center gap-3 p-4 border-2 border-gray-100 rounded-xl cursor-pointer hover:border-blue-200 transition-all"><input type="radio" name="product" value={key} className="accent-blue-700" /><span className="text-sm font-medium text-gray-800">{label}</span></label>))}</div>}
          {step === 3 && <div className="space-y-3"><div className="bg-blue-50 rounded-xl p-4 border border-blue-100"><h4 className="font-semibold text-blue-900 mb-3">Revisão do Contrato</h4><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-600">Cliente:</span><span className="font-medium">João Silva</span></div><div className="flex justify-between"><span className="text-gray-600">Produto:</span><span className="font-medium">Consórcio Contemplado</span></div><div className="flex justify-between"><span className="text-gray-600">Valor:</span><span className="font-medium">R$ 350.000,00</span></div><div className="flex justify-between"><span className="text-gray-600">Parcelas:</span><span className="font-medium">180x de R$ 2.100,00</span></div></div></div></div>}
          {step === 4 && <div className="text-center py-6"><div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={32} className="text-green-500" /></div><h3 className="text-lg font-bold text-gray-900">Contrato Gerado!</h3><p className="text-sm text-gray-500 mt-2">O contrato foi criado com sucesso.</p><div className="flex gap-3 mt-6 justify-center"><Button variant="primary" icon={<Download size={15} />}>Baixar PDF</Button><Button variant="outline" icon={<PenLine size={15} />}>Assinar Digitalmente</Button></div></div>}
        </div>
        {step < 4 && <div className="px-6 pb-6 flex justify-between"><Button variant="secondary" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Voltar</Button><Button variant="primary" onClick={() => setStep(step + 1)}>{step === 3 ? 'Gerar Contrato' : 'Continuar'}</Button></div>}
      </div>
    </div>
  );
}

export default function ContratosPage() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = mockContracts.filter(c => c.clientName.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="animate-fade-in">
      {showModal && <ContractGeneratorModal onClose={() => setShowModal(false)} />}
      <Header title="Contratos" subtitle="Gestão e geração de contratos" />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Total', value: mockContracts.length, color: '#003B7A' }, { label: 'Vigentes', value: mockContracts.filter(c => c.status === 'vigente').length, color: '#16A34A' }, { label: 'Assinados', value: mockContracts.filter(c => c.status === 'assinado').length, color: '#0891B2' }, { label: 'Volume', value: formatCurrency(mockContracts.reduce((s, c) => s + c.creditValue, 0)), color: '#7C3AED' }].map(item => (<Card key={item.label} className="card-hover"><p className="text-xs text-gray-500">{item.label}</p><p className="text-xl font-bold mt-1" style={{ color: item.color }}>{item.value}</p></Card>))}
        </div>
        <Card padding="sm"><div className="flex items-center gap-3"><div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar contratos..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100" /></div><Button variant="primary" icon={<Plus size={14} />} onClick={() => setShowModal(true)}>Novo Contrato</Button></div></Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.map(contract => (<ContractCard key={contract.id} contract={contract} />))}</div>
      </div>
    </div>
  );
}
