'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calculator, TrendingUp, Info } from 'lucide-react';
import { formatCurrency } from '@/lib/data';

const TABS = [
  { id: 'contemplado', label: 'Carta Contemplada' },
  { id: 'consorcio', label: 'Consórcio Estruturado' },
  { id: 'homeequity', label: 'Home Equity' },
  { id: 'capitalgiro', label: 'Capital de Giro' },
  { id: 'financiamento', label: 'Financiamento' },
];

function ResultRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--bd2)' }}>
      <span style={{ fontSize: '13px', color: 'var(--fg2)' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: highlight ? 700 : 500, color: highlight ? '#003B7A' : 'var(--fg)', fontFamily: "'DM Mono', monospace" }}>{value}</span>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'number', suffix, options }: { label: string; value: string; onChange: (v: string) => void; type?: string; suffix?: string; options?: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--fg2)' }}>{label}</label>
      {options ? (
        <select value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: '9px 12px', fontSize: '13px', background: 'var(--surface-2)', border: '1px solid var(--bd)', borderRadius: '8px', color: 'var(--fg)' }}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <div style={{ position: 'relative' }}>
          <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: '9px 12px', paddingRight: suffix ? '36px' : '12px', fontSize: '14px', background: 'var(--surface-2)', border: '1px solid var(--bd)', borderRadius: '8px', color: 'var(--fg)' }} />
          {suffix && <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', color: 'var(--fg3)' }}>{suffix}</span>}
        </div>
      )}
    </div>
  );
}

function EmptyResult() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--fg3)' }}>
      <Calculator size={36} style={{ margin: '0 auto 12px', opacity: 0.25 }} />
      <p style={{ fontSize: '13px' }}>Preencha os dados e clique em calcular</p>
    </div>
  );
}

function SimuladorContemplado() {
  const [valor, setValor] = useState('350000');
  const [parcelas, setParcelas] = useState('180');
  const [taxa, setTaxa] = useState('1.8');
  const [admin, setAdmin] = useState('Embracon');
  const [resultado, setResultado] = useState<{ parcela: number; total: number; taxaVal: number } | null>(null);

  const calcular = () => {
    const v = parseFloat(valor) || 0;
    const n = parseInt(parcelas) || 1;
    const t = parseFloat(taxa) / 100;
    const taxaVal = v * t;
    const parcela = v / n + taxaVal / n;
    const total = parcela * n;
    setResultado({ parcela, total, taxaVal });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <Card>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)', marginBottom: '16px' }}>Dados da Simulação</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <InputField label="Valor da Carta (R$)" value={valor} onChange={setValor} />
          <InputField label="Prazo (meses)" value={parcelas} onChange={setParcelas} />
          <InputField label="Taxa de Administração (% a.a.)" value={taxa} onChange={setTaxa} suffix="%" />
          <InputField label="Administradora" value={admin} onChange={setAdmin} options={['Embracon', 'Porto Seguro', 'Ademicon', 'Rodobens', 'Sompo', 'Bradesco']} />
          <Button variant="primary" onClick={calcular} style={{ marginTop: '4px' }}><Calculator size={15} /> Calcular Simulação</Button>
        </div>
      </Card>
      <Card>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)', marginBottom: '16px' }}>Resultado</h3>
        {resultado ? (
          <>
            <div style={{ background: 'rgba(0,59,122,.06)', borderRadius: '10px', padding: '16px', marginBottom: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: 'var(--fg3)', marginBottom: '4px' }}>Parcela Mensal Estimada</p>
              <p style={{ fontSize: '32px', fontWeight: 800, color: '#003B7A', fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{formatCurrency(resultado.parcela)}</p>
            </div>
            <ResultRow label="Valor da Carta" value={formatCurrency(parseFloat(valor))} />
            <ResultRow label="Total de Parcelas" value={parcelas + 'x'} />
            <ResultRow label="Administradora" value={admin} />
            <ResultRow label="Taxa de Administração" value={formatCurrency(resultado.taxaVal)} />
            <ResultRow label="Valor Total Pago" value={formatCurrency(resultado.total)} highlight />
            <Button variant="secondary" style={{ marginTop: '16px', width: '100%' }}><TrendingUp size={15} /> Gerar Proposta</Button>
          </>
        ) : <EmptyResult />}
      </Card>
    </div>
  );
}

function SimuladorHomeEquity() {
  const [imovel, setImovel] = useState('500000');
  const [credito, setCredito] = useState('200000');
  const [prazo, setPrazo] = useState('120');
  const [resultado, setResultado] = useState<{ parcela: number; ltv: number } | null>(null);

  const calcular = () => {
    const v = parseFloat(credito) || 0;
    const n = parseInt(prazo) || 1;
    const rate = 0.0099;
    const parcela = v * rate / (1 - Math.pow(1 + rate, -n));
    const ltv = (v / parseFloat(imovel)) * 100;
    setResultado({ parcela, ltv });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <Card>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)', marginBottom: '16px' }}>Dados do Imóvel</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <InputField label="Valor do Imóvel (R$)" value={imovel} onChange={setImovel} />
          <InputField label="Crédito Desejado (R$)" value={credito} onChange={setCredito} />
          <InputField label="Prazo (meses)" value={prazo} onChange={setPrazo} />
          <div style={{ background: 'var(--in-bg)', borderRadius: '8px', padding: '10px 12px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <Info size={13} style={{ color: 'var(--in-fg)', flexShrink: 0, marginTop: '1px' }} />
            <p style={{ fontSize: '12px', color: 'var(--in-fg)', lineHeight: 1.4 }}>LTV máximo 60% do valor do imóvel. Taxa a partir de 0,99% a.m.</p>
          </div>
          <Button variant="primary" onClick={calcular}><Calculator size={15} /> Calcular</Button>
        </div>
      </Card>
      <Card>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)', marginBottom: '16px' }}>Resultado</h3>
        {resultado ? (
          <>
            <div style={{ background: 'rgba(0,59,122,.06)', borderRadius: '10px', padding: '16px', marginBottom: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: 'var(--fg3)', marginBottom: '4px' }}>Parcela Mensal (SAC)</p>
              <p style={{ fontSize: '32px', fontWeight: 800, color: '#003B7A', fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{formatCurrency(resultado.parcela)}</p>
            </div>
            <ResultRow label="Valor do Crédito" value={formatCurrency(parseFloat(credito))} />
            <ResultRow label="Valor do Imóvel" value={formatCurrency(parseFloat(imovel))} />
            <ResultRow label="LTV" value={resultado.ltv.toFixed(1) + '%'} highlight={resultado.ltv > 60} />
            <ResultRow label="Prazo" value={prazo + ' meses'} />
            <ResultRow label="Taxa" value="0,99% a.m." highlight />
            <Button variant="secondary" style={{ marginTop: '16px', width: '100%' }}>Gerar Proposta</Button>
          </>
        ) : <EmptyResult />}
      </Card>
    </div>
  );
}

function SimuladorGenerico({ titulo, taxaDefault }: { titulo: string; taxaDefault: string }) {
  const [valor, setValor] = useState('100000');
  const [prazo, setPrazo] = useState('60');
  const [taxa] = useState(taxaDefault);
  const [resultado, setResultado] = useState<{ parcela: number; total: number } | null>(null);

  const calcular = () => {
    const v = parseFloat(valor) || 0;
    const n = parseInt(prazo) || 1;
    const rate = parseFloat(taxa) / 100;
    const parcela = v * rate / (1 - Math.pow(1 + rate, -n));
    setResultado({ parcela, total: parcela * n });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <Card>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)', marginBottom: '16px' }}>{titulo}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <InputField label="Valor (R$)" value={valor} onChange={setValor} />
          <InputField label="Prazo (meses)" value={prazo} onChange={setPrazo} />
          <Button variant="primary" onClick={calcular}><Calculator size={15} /> Calcular</Button>
        </div>
      </Card>
      <Card>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)', marginBottom: '16px' }}>Resultado</h3>
        {resultado ? (
          <>
            <div style={{ background: 'rgba(0,59,122,.06)', borderRadius: '10px', padding: '16px', marginBottom: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: 'var(--fg3)', marginBottom: '4px' }}>Parcela Mensal</p>
              <p style={{ fontSize: '32px', fontWeight: 800, color: '#003B7A', fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{formatCurrency(resultado.parcela)}</p>
            </div>
            <ResultRow label="Valor" value={formatCurrency(parseFloat(valor))} />
            <ResultRow label="Prazo" value={prazo + ' meses'} />
            <ResultRow label="Taxa" value={taxa + '% a.m.'} highlight />
            <ResultRow label="Total" value={formatCurrency(resultado.total)} highlight />
            <Button variant="secondary" style={{ marginTop: '16px', width: '100%' }}>Gerar Proposta</Button>
          </>
        ) : <EmptyResult />}
      </Card>
    </div>
  );
}

export default function SimulacaoPage() {
  const [activeTab, setActiveTab] = useState('contemplado');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '2px', background: 'var(--surface-2)', border: '1px solid var(--bd)', borderRadius: '10px', padding: '3px' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: '8px 10px', fontSize: '12.5px', fontWeight: 500, border: 'none', borderRadius: '7px', cursor: 'pointer', background: activeTab === tab.id ? '#fff' : 'transparent', color: activeTab === tab.id ? '#003B7A' : 'var(--fg2)', boxShadow: activeTab === tab.id ? '0 1px 4px rgba(0,0,0,.08)' : 'none', transition: 'all .15s' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'contemplado' && <SimuladorContemplado />}
      {activeTab === 'consorcio' && <SimuladorGenerico titulo="Consórcio Estruturado" taxaDefault="1.5" />}
      {activeTab === 'homeequity' && <SimuladorHomeEquity />}
      {activeTab === 'capitalgiro' && <SimuladorGenerico titulo="Capital de Giro" taxaDefault="2.2" />}
      {activeTab === 'financiamento' && <SimuladorGenerico titulo="Financiamento" taxaDefault="1.8" />}
    </div>
  );
}
