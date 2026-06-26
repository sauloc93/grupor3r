'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calculator, Home, Briefcase, Building2, TrendingUp, CheckCircle2, Info, Download, Share2, ChevronRight } from 'lucide-react';
import { ADMINISTRATORS, formatCurrency } from '@/lib/data';
import { ProductType, SimulationResult } from '@/types';

const PRODUCTS = [
  { key: 'contemplado', label: 'Consórcio Contemplado', icon: CheckCircle2, desc: 'Carta já contemplada, uso imediato', color: '#003B7A' },
  { key: 'programado', label: 'Carta Programada', icon: TrendingUp, desc: 'Aquisição com prazo planejado', color: '#C8962C' },
  { key: 'disponivel', label: 'Carta Disponível', icon: Home, desc: 'Para imóveis, veículos e serviços', color: '#16A34A' },
  { key: 'home-equity', label: 'Home Equity', icon: Building2, desc: 'Crédito com garantia de imóvel', color: '#7C3AED' },
  { key: 'capital-giro', label: 'Capital de Giro', icon: Briefcase, desc: 'Para empresas e negócios', color: '#0891B2' },
];

function calcSimulation(product: ProductType, creditValue: number, installments: number, administrator: string): SimulationResult {
  const feeRates: Record<string, number> = { 'contemplado': 0.015, 'programado': 0.018, 'disponivel': 0.016, 'home-equity': 0.012, 'capital-giro': 0.020 };
  const adminFee = feeRates[product] || 0.016;
  const reserveFundRate = 0.02;
  const insuranceRate = product === 'home-equity' ? 0.004 : 0.002;
  const monthlyAdmin = (creditValue * adminFee) / installments;
  const monthlyReserve = (creditValue * reserveFundRate) / installments;
  const monthlyInsurance = (creditValue * insuranceRate) / 12;
  const monthlyInstallment = monthlyAdmin + monthlyReserve + monthlyInsurance;
  return { product, creditValue, installments, monthlyInstallment, totalAmount: monthlyInstallment * installments, administrationFee: creditValue * adminFee, reserveFund: creditValue * reserveFundRate, insurance: monthlyInsurance * 12, administrator };
}

export default function SimulacaoPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('contemplado');
  const [creditValue, setCreditValue] = useState(300000);
  const [installments, setInstallments] = useState(180);
  const [administrator, setAdministrator] = useState(ADMINISTRATORS[0]);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const selectedProductInfo = PRODUCTS.find(p => p.key === selectedProduct)!;
  const handleSimulate = () => { setLoading(true); setTimeout(() => { setResult(calcSimulation(selectedProduct, creditValue, installments, administrator)); setLoading(false); }, 800); };
  const installmentOptions: Record<ProductType, number[]> = { 'contemplado': [60, 80, 100, 120, 150, 180, 200], 'programado': [60, 80, 100, 120, 150, 180], 'disponivel': [36, 48, 60, 72, 84], 'home-equity': [60, 84, 120, 180, 240], 'capital-giro': [12, 24, 36, 48, 60] };
  return (
    <div className="animate-fade-in">
      <Header title="Simulador de Crédito" subtitle="Simule os melhores produtos para seu cliente" />
      <div className="p-8 space-y-8">
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-4">Selecione o Produto</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {PRODUCTS.map(({ key, label, icon: Icon, desc, color }) => (
              <button key={key} onClick={() => { setSelectedProduct(key as ProductType); setResult(null); }} className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${selectedProduct === key ? 'border-current shadow-md' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'}`} style={selectedProduct === key ? { borderColor: color, background: `${color}08` } : {}}>
                <div className="rounded-xl p-2.5 w-fit mb-3" style={{ background: `${color}15` }}><Icon size={20} style={{ color }} /></div>
                <p className="text-sm font-semibold text-gray-900 leading-tight">{label}</p>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2"><Calculator size={18} style={{ color: selectedProductInfo.color }} />Parâmetros da Simulação</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor da Carta de Crédito</label>
                  <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">R$</span><input type="number" value={creditValue} onChange={e => setCreditValue(Number(e.target.value))} min={10000} max={5000000} step={10000} className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 font-medium" /></div>
                  <input type="range" min={10000} max={2000000} step={10000} value={creditValue} onChange={e => setCreditValue(Number(e.target.value))} className="w-full mt-3 accent-blue-700" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1"><span>R$ 10 mil</span><span className="font-medium text-blue-700">{formatCurrency(creditValue)}</span><span>R$ 2 milhões</span></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número de Parcelas</label>
                  <div className="flex flex-wrap gap-2">
                    {installmentOptions[selectedProduct].map(n => (<button key={n} onClick={() => setInstallments(n)} className={`px-3 py-2 text-sm rounded-xl font-medium transition-all ${installments === n ? 'text-white shadow-sm' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`} style={installments === n ? { background: selectedProductInfo.color } : {}}>{n}x</button>))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Administradora</label>
                  <select value={administrator} onChange={e => setAdministrator(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100">{ADMINISTRATORS.map(a => <option key={a}>{a}</option>)}</select>
                </div>
                <Button onClick={handleSimulate} loading={loading} variant="primary" size="lg" className="w-full" style={{ background: selectedProductInfo.color }}>Simular Agora</Button>
              </div>
            </Card>
            <Card className="border-l-4" style={{ borderLeftColor: selectedProductInfo.color }}>
              <div className="flex items-start gap-3">
                <Info size={18} style={{ color: selectedProductInfo.color }} className="mt-0.5 shrink-0" />
                <div><h4 className="font-semibold text-gray-900 text-sm">{selectedProductInfo.label}</h4><p className="text-xs text-gray-600 mt-1 leading-relaxed">{selectedProduct === 'contemplado' && 'Carta já sorteada ou lanceada. O cliente pode usar o crédito imediatamente.'}{selectedProduct === 'programado' && 'Planejamento de médio a longo prazo. Cliente adquire a carta e aguarda a contemplação.'}{selectedProduct === 'disponivel' && 'Cartas disponíveis no mercado secundário com desconto.'}{selectedProduct === 'home-equity' && 'Crédito com garantia do imóvel. Taxas menores e prazos mais longos.'}{selectedProduct === 'capital-giro' && 'Solução para empresas que precisam de capital de giro.'}</p></div>
              </div>
            </Card>
          </div>
          <div className="lg:col-span-3">
            {result ? (
              <div className="space-y-6 animate-fade-in">
                <Card className="text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: selectedProductInfo.color }} />
                  <div className="pt-4">
                    <p className="text-sm text-gray-500 mb-1">Parcela Mensal Estimada</p>
                    <p className="text-5xl font-bold" style={{ color: selectedProductInfo.color }}>{formatCurrency(result.monthlyInstallment)}</p>
                    <p className="text-sm text-gray-400 mt-2">por mês · {result.installments} parcelas</p>
                    <div className="flex items-center justify-center gap-2 mt-3"><Badge variant="info">{result.administrator}</Badge></div>
                  </div>
                </Card>
                <Card>
                  <h4 className="font-semibold text-gray-900 mb-4">Composição da Parcela</h4>
                  <div className="space-y-3">
                    {[{ label: 'Carta de Crédito (valor contratado)', value: result.creditValue, highlight: true }, { label: 'Taxa de Administração Total', value: result.administrationFee, highlight: false }, { label: 'Fundo de Reserva', value: result.reserveFund, highlight: false }, { label: 'Seguro (anual)', value: result.insurance, highlight: false }, { label: 'Custo Total do Plano', value: result.totalAmount, highlight: true }].map(item => (
                      <div key={item.label} className={`flex items-center justify-between py-3 ${item.highlight ? 'border-t border-gray-100 mt-2' : ''}`}>
                        <span className={`text-sm ${item.highlight ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{item.label}</span>
                        <span className={`text-sm font-bold ${item.highlight ? '' : 'text-gray-800'}`} style={item.highlight ? { color: selectedProductInfo.color } : {}}>{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card>
                  <h4 className="font-semibold text-gray-900 mb-4">Comparativo de Prazos</h4>
                  <div className="space-y-3">
                    {installmentOptions[selectedProduct].map(n => {
                      const sim = calcSimulation(selectedProduct, creditValue, n, administrator);
                      const isSelected = n === installments;
                      return (<button key={n} onClick={() => { setInstallments(n); setResult(sim); }} className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${isSelected ? 'border-2' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`} style={isSelected ? { borderColor: selectedProductInfo.color, background: `${selectedProductInfo.color}05` } : {}}><span className="text-sm font-medium text-gray-700">{n} parcelas</span><div className="flex items-center gap-3"><span className={`text-sm font-bold ${isSelected ? '' : 'text-gray-800'}`} style={isSelected ? { color: selectedProductInfo.color } : {}}>{formatCurrency(sim.monthlyInstallment)}/mês</span>{isSelected && <Badge variant="info">Selecionado</Badge>}</div></button>);
                    })}
                  </div>
                </Card>
                <div className="flex gap-3">
                  <Button variant="primary" className="flex-1" style={{ background: selectedProductInfo.color }}>Gerar Proposta <ChevronRight size={16} /></Button>
                  <Button variant="secondary" icon={<Download size={15} />}>PDF</Button>
                  <Button variant="secondary" icon={<Share2 size={15} />}>Compartilhar</Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center py-20">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${selectedProductInfo.color}10` }}><Calculator size={40} style={{ color: selectedProductInfo.color }} /></div>
                  <p className="font-semibold text-gray-700">Configure os parâmetros</p>
                  <p className="text-sm text-gray-400 mt-1">e clique em Simular Agora</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
