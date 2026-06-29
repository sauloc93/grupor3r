'use client';
import { useState } from 'react';

const contratos = [
  { id: 'CT-2025-031', cliente: 'Marina Alves', cpf: '342.891.020-15', produto: 'Carta Contemplada', valor: 480000, admin: 'Itaú Consórcio', prazo: 120, status: 'Ativo', inicio: '01/05/2025', venc: '01/05/2035' },
  { id: 'CT-2025-032', cliente: 'Construflex SA', cpf: '98.765.432/0001-10', produto: 'Carta Contemplada', valor: 3500000, admin: 'Porto Seguro', prazo: 180, status: 'Aguard. Assinatura', inicio: '—', venc: '—' },
  { id: 'CT-2025-033', cliente: 'Grupo Mendes', cpf: '45.678.901/0001-23', produto: 'Home Equity', valor: 2100000, admin: 'Caixa Econômica Federal', prazo: 240, status: 'Ativo', inicio: '10/04/2025', venc: '10/04/2045' },
  { id: 'CT-2025-034', cliente: 'Roberto Fonseca', cpf: '198.234.560-77', produto: 'Home Equity', valor: 750000, admin: 'Bradesco', prazo: 120, status: 'Aguard. Assinatura', inicio: '—', venc: '—' },
  { id: 'CT-2025-035', cliente: 'TechBuild Ltda', cpf: '12.345.678/0001-90', produto: 'Capital de Giro', valor: 1200000, admin: 'Ademicon', prazo: 36, status: 'Análise', inicio: '—', venc: '—' },
  { id: 'CT-2024-028', cliente: 'Carlos Viana', cpf: '677.234.980-01', produto: 'Carta Disponível', valor: 95000, admin: 'Rodobens', prazo: 60, status: 'Finalizado', inicio: '01/01/2024', venc: '01/01/2025' },
];

const statusColor: Record<string, string> = {
  'Ativo': '#16a34a',
  'Aguard. Assinatura': '#b8973a',
  'Análise': '#1d4ed8',
  'Finalizado': '#6b7280',
};

const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);
const today = new Date().toLocaleDateString('pt-BR');

function ContractPreview({ data }: { data: typeof contratos[0] | null }) {
  if (!data) return null;
  return (
    <div style={{ background: '#fff', color: '#1a1a1a', padding: '36px 42px', fontFamily: 'Georgia, serif', fontSize: '12px', lineHeight: 1.75, maxHeight: '520px', overflowY: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#0D1B2A', letterSpacing: '2px', marginBottom: '4px' }}>GRUPO R3R</div>
        <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Soluções Financeiras Estratégicas · CNPJ 00.000.000/0001-00</div>
        <div style={{ height: '2px', background: 'linear-gradient(90deg, #C8962C, #003B7A)', marginBottom: '16px' }} />
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#0D1B2A' }}>CONTRATO DE INTERMEDIAÇÃO FINANCEIRA</div>
        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>N.º {data.id} · Emitido em {today}</div>
      </div>

      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D1B2A', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '10px', marginTop: '20px' }}>1. PARTES CONTRATANTES</div>
      <p><strong>CONTRATANTE:</strong> {data.cliente} — CPF/CNPJ: {data.cpf}</p>
      <p><strong>CONTRATADA:</strong> Grupo R3R Soluções Financeiras LTDA, inscrita no CNPJ sob o n.º 00.000.000/0001-00, com sede na Av. Paulista, n.º 1000, Bela Vista, São Paulo/SP, CEP 01310-000.</p>
      <p><strong>ADMINISTRADORA:</strong> {data.admin}</p>

      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D1B2A', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '10px', marginTop: '20px' }}>2. OBJETO DO CONTRATO</div>
      <p>O presente contrato tem como objeto a intermediação financeira para aquisição de <strong>{data.produto}</strong>, com valor de crédito de <strong>{fmt(data.valor)}</strong>, pelo prazo de <strong>{data.prazo} meses</strong>, junto à administradora <strong>{data.admin}</strong>, conforme condições e termos estabelecidos neste instrumento.</p>

      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D1B2A', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '10px', marginTop: '20px' }}>3. CONDIÇÕES FINANCEIRAS</div>
      <p><strong>Valor da Carta de Crédito:</strong> {fmt(data.valor)}</p>
      <p><strong>Prazo:</strong> {data.prazo} meses</p>
      <p><strong>Taxa de Administração:</strong> A ser definida pela administradora, conforme tabela vigente.</p>
      <p><strong>Fundo de Reserva:</strong> Conforme regulamento do grupo de consórcio.</p>
      <p><strong>Modalidade:</strong> {data.produto}</p>

      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D1B2A', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '10px', marginTop: '20px' }}>4. OBRIGAÇÕES DA CONTRATADA</div>
      <p>A Grupo R3R obriga-se a: (i) assessorar o CONTRATANTE na escolha do produto financeiro mais adequado ao seu perfil; (ii) intermediar a contratação junto à administradora escolhida; (iii) acompanhar todo o processo até a contemplação e liberação do crédito; (iv) manter sigilo absoluto sobre as informações fornecidas pelo CONTRATANTE.</p>

      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D1B2A', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '10px', marginTop: '20px' }}>5. OBRIGAÇÕES DO CONTRATANTE</div>
      <p>O CONTRATANTE obriga-se a: (i) fornecer documentação verídica e atualizada; (ii) manter pagamento das parcelas em dia junto à administradora; (iii) comunicar à Grupo R3R qualquer alteração cadastral.</p>

      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D1B2A', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '10px', marginTop: '20px' }}>6. VIGÊNCIA</div>
      <p>O presente contrato entra em vigor na data de sua assinatura e vigorará pelo prazo de {data.prazo} meses, podendo ser renovado mediante acordo entre as partes.</p>

      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D1B2A', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '10px', marginTop: '20px' }}>7. FORO</div>
      <p>Fica eleito o Foro da Comarca de São Paulo, Estado de São Paulo, para dirimir eventuais controvérsias decorrentes do presente instrumento, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</p>

      <p style={{ marginTop: '20px' }}>E, por estarem justos e contratados, firmam o presente instrumento em duas vias de igual teor e forma.</p>
      <p style={{ marginTop: '6px' }}>São Paulo, {today}</p>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '44px', gap: '20px' }}>
        {[{ label: data.cliente, sub: 'Contratante' }, { label: 'Grupo R3R', sub: 'Contratada' }, { label: data.admin, sub: 'Administradora' }].map(s => (
          <div key={s.label} style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '6px', fontSize: '11px' }}>
              <div style={{ fontWeight: 700 }}>{s.label}</div>
              <div style={{ color: '#64748b' }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContratosPage() {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState<typeof contratos[0] | null>(null);
  const [form, setForm] = useState({ cliente: '', cpf: '', produto: 'Carta Contemplada', valor: '', admin: 'Porto Seguro', prazo: '120' });
  const [generated, setGenerated] = useState<typeof contratos[0] | null>(null);

  const stats = [
    { label: 'Contratos Ativos', value: contratos.filter(c => c.status === 'Ativo').length, color: '#16a34a' },
    { label: 'Aguard. Assinatura', value: contratos.filter(c => c.status === 'Aguard. Assinatura').length, color: '#b8973a' },
    { label: 'Em Análise', value: contratos.filter(c => c.status === 'Análise').length, color: '#1d4ed8' },
    { label: 'Finalizados', value: contratos.filter(c => c.status === 'Finalizado').length, color: '#6b7280' },
  ];

  function handleGenerate() {
    const doc = {
      id: `CT-2025-0${Date.now().toString().slice(-2)}`,
      cliente: form.cliente || 'Cliente não informado',
      cpf: form.cpf || '000.000.000-00',
      produto: form.produto,
      valor: parseFloat(form.valor.replace(/\D/g, '')) || 0,
      admin: form.admin,
      prazo: parseInt(form.prazo),
      status: 'Aguard. Assinatura',
      inicio: '—',
      venc: '—',
    };
    setGenerated(doc);
    setShowModal(false);
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#F5F7FA', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Contratos e Documentos</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Geração, envio e assinatura digital de contratos</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ padding: '10px 20px', background: '#003B7A', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
          📄 Gerar Contrato
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', borderLeft: `4px solid ${s.color}` }}>
            <div style={{ fontSize: '30px', fontWeight: 700, color: s.color, fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
            <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {generated && (
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '14px 18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', color: '#166534', fontWeight: 600 }}>
            ✅ Contrato {generated.id} gerado para {generated.cliente} — {fmt(generated.valor)}
          </div>
          <button onClick={() => setPreview(generated)} style={{ padding: '6px 14px', background: '#003B7A', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            Visualizar
          </button>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['Contrato', 'Cliente', 'Produto', 'Valor', 'Administradora', 'Status', 'Início', 'Vencimento', 'Ações'].map(h => (
                <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '10.5px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contratos.map((c, i) => (
              <tr key={c.id} style={{ borderTop: '1px solid #f1f5f9' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ padding: '13px 14px', fontSize: '11.5px', fontFamily: "'DM Mono', monospace", color: '#475569' }}>{c.id}</td>
                <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{c.cliente}</td>
                <td style={{ padding: '13px 14px', fontSize: '12px', color: '#475569' }}>{c.produto}</td>
                <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{fmt(c.valor)}</td>
                <td style={{ padding: '13px 14px', fontSize: '12px', color: '#475569' }}>{c.admin}</td>
                <td style={{ padding: '13px 14px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: statusColor[c.status] + '20', color: statusColor[c.status] }}>{c.status}</span>
                </td>
                <td style={{ padding: '13px 14px', fontSize: '12px', color: '#64748b' }}>{c.inicio}</td>
                <td style={{ padding: '13px 14px', fontSize: '12px', color: '#64748b' }}>{c.venc}</td>
                <td style={{ padding: '13px 14px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => setPreview(c)} style={{ padding: '5px 10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 500 }}>Ver</button>
                    {c.status === 'Aguard. Assinatura' && (
                      <button style={{ padding: '5px 10px', background: '#003B7A', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 500 }}>Assinar</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: Gerar Contrato */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '520px', maxWidth: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>Gerar Contrato</h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>Preencha os dados para gerar o documento</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#94a3b8', lineHeight: 1 }}>×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '5px', textTransform: 'uppercase' }}>Nome do Cliente *</label>
                <input value={form.cliente} onChange={e => setForm(p => ({ ...p, cliente: e.target.value }))} placeholder="Ex: João Silva" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '5px', textTransform: 'uppercase' }}>CPF / CNPJ *</label>
                <input value={form.cpf} onChange={e => setForm(p => ({ ...p, cpf: e.target.value }))} placeholder="000.000.000-00" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '5px', textTransform: 'uppercase' }}>Produto</label>
                <select value={form.produto} onChange={e => setForm(p => ({ ...p, produto: e.target.value }))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }}>
                  {['Carta Contemplada', 'Carta Programada', 'Carta Disponível', 'Home Equity', 'Capital de Giro'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '5px', textTransform: 'uppercase' }}>Valor (R$)</label>
                <input value={form.valor} onChange={e => setForm(p => ({ ...p, valor: e.target.value }))} placeholder="Ex: 500000" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '5px', textTransform: 'uppercase' }}>Administradora</label>
                <select value={form.admin} onChange={e => setForm(p => ({ ...p, admin: e.target.value }))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }}>
                  {['Porto Seguro', 'Itaú Consórcio', 'Caixa Econômica Federal', 'Bradesco', 'BB Consórcio', 'Santander', 'Embracon', 'Rodobens', 'Ademicon', 'Sompo'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '5px', textTransform: 'uppercase' }}>Prazo (meses)</label>
                <select value={form.prazo} onChange={e => setForm(p => ({ ...p, prazo: e.target.value }))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }}>
                  {['12','24','36','48','60','72','84','96','108','120','144','180','240'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '11px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '13px', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={handleGenerate} style={{ flex: 2, padding: '11px', background: '#003B7A', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                📄 Gerar e Visualizar Contrato
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Contract Preview */}
      {preview && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '780px', maxWidth: '100%', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Contrato {preview.id}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{preview.cliente} · {preview.produto}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ padding: '8px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>🖨️ Imprimir</button>
                <button style={{ padding: '8px 16px', background: '#003B7A', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>✍️ Enviar para Assinatura</button>
                <button onClick={() => setPreview(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', color: '#94a3b8', lineHeight: 1, padding: '0 4px' }}>×</button>
              </div>
            </div>
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, background: '#f8fafc' }}>
              <ContractPreview data={preview} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
