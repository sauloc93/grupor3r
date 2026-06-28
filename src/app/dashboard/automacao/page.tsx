'use client';
import { useState } from 'react';

const flows = [
  { id: 1, nome: 'Boas-vindas ao novo lead', trigger: 'Novo contato no CRM', acoes: 3, ativo: true },
  { id: 2, nome: 'Follow-up proposta enviada', trigger: '48h após proposta', acoes: 2, ativo: true },
  { id: 3, nome: 'Alerta de prazo de contrato', trigger: '30 dias antes do venc.', acoes: 1, ativo: true },
  { id: 4, nome: 'Notificação de contemplação', trigger: 'Status = Contemplado', acoes: 4, ativo: false },
  { id: 5, nome: 'Relatório semanal automático', trigger: 'Toda segunda às 08h', acoes: 1, ativo: true },
  { id: 6, nome: 'NPS pós-contrato', trigger: '7 dias após assinatura', acoes: 2, ativo: false },
];

const integrations = [
  { nome: 'WhatsApp Business', icon: '💬', status: 'Conectado', color: '#16a34a' },
  { nome: 'Gmail / Workspace', icon: '📧', status: 'Conectado', color: '#16a34a' },
  { nome: 'Porto Seguro API', icon: '🔌', status: 'Conectado', color: '#16a34a' },
  { nome: 'RD Station CRM', icon: '📊', status: 'Não conectado', color: '#94a3b8' },
  { nome: 'Asaas (Pagamentos)', icon: '💳', status: 'Não conectado', color: '#94a3b8' },
  { nome: 'DocuSign', icon: '✍️', status: 'Não conectado', color: '#94a3b8' },
];

export default function AutomacaoPage() {
  const [activeFlows, setActiveFlows] = useState<Record<number, boolean>>(Object.fromEntries(flows.map(f => [f.id, f.ativo])));

  return (
    <div style={{ padding: '32px', fontFamily: "'DM Sans', sans-serif", background: '#F5F7FA', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Automação & Integrações</h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Gerencie fluxos automáticos e conexões externas</p>
      </div>

      <div style={{ background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: '12px', padding: '14px 18px', marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '18px' }}>ℹ️</span>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#1d4ed8' }}>APIs disponíveis</div>
          <div style={{ fontSize: '12px', color: '#1d4ed8', marginTop: '2px' }}>Conecte a plataforma a qualquer sistema via REST API. Documentação disponível abaixo.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', marginBottom: '20px' }}>
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Fluxos de Automação</h3>
            <button style={{ padding: '7px 14px', background: '#B8973A', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>+ Novo Fluxo</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Nome', 'Gatilho', 'Ações', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flows.map((f, i) => (
                <tr key={f.id} style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{f.nome}</td>
                  <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b' }}>{f.trigger}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569', textAlign: 'center' }}>{f.acoes}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => setActiveFlows(p => ({ ...p, [f.id]: !p[f.id] }))} style={{ padding: '5px 12px', border: '1px solid', borderColor: activeFlows[f.id] ? '#16a34a' : '#e2e8f0', borderRadius: '20px', background: activeFlows[f.id] ? '#dcfce7' : '#f8fafc', color: activeFlows[f.id] ? '#16a34a' : '#94a3b8', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                      {activeFlows[f.id] ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Integrações</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {integrations.map(int => (
              <div key={int.nome} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                <span style={{ fontSize: '20px' }}>{int.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{int.nome}</div>
                  <div style={{ fontSize: '11px', color: int.color, fontWeight: 500 }}>{int.status}</div>
                </div>
                <button style={{ padding: '5px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#fff', fontSize: '11px', cursor: 'pointer', color: '#64748b' }}>{int.status === 'Conectado' ? 'Config.' : 'Conectar'}</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: '#1e293b', borderRadius: '14px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#f1f5f9' }}>API REST — Documentação</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['Documentação', 'Token', 'Testar API'].map(b => (
              <button key={b} style={{ padding: '7px 14px', border: '1px solid #475569', borderRadius: '8px', background: 'transparent', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>{b}</button>
            ))}
          </div>
        </div>
        <pre style={{ margin: 0, fontSize: '12px', color: '#86efac', fontFamily: "'DM Mono', monospace", lineHeight: 1.6, overflowX: 'auto' }}>{`POST https://api.grupor3r.com.br/v1/propostas
Authorization: Bearer {seu_token}
Content-Type: application/json

{
  "cliente_id": "uuid",
  "produto": "contemplado",
  "valor": 480000,
  "prazo_meses": 120
}`}</pre>
      </div>
    </div>
  );
}
