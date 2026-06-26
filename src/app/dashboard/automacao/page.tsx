'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Bot, Plus, Play, Pause, Settings, Zap, MessageSquare, FileText, Mail } from 'lucide-react';

const automations = [
  { id: 'A001', name: 'Boas-vindas ao Lead', trigger: 'Novo lead cadastrado', action: 'Enviar WhatsApp', execucoes: 142, ultima: '2h atrás', active: true },
  { id: 'A002', name: 'Follow-up de Proposta', trigger: 'Proposta sem resposta (3 dias)', action: 'E-mail + notificação', execucoes: 38, ultima: '1 dia atrás', active: true },
  { id: 'A003', name: 'Contrato Assinado', trigger: 'Contrato assinado digitalmente', action: 'Gerar documentos + e-mail', execucoes: 27, ultima: '3 dias atrás', active: true },
  { id: 'A004', name: 'Reativação de Inativos', trigger: 'Cliente inativo por 60 dias', action: 'E-mail de reativação', execucoes: 0, ultima: '—', active: false },
  { id: 'A005', name: 'Relatório Semanal', trigger: 'Toda segunda-feira 08h', action: 'E-mail para gestores', execucoes: 24, ultima: '5 dias atrás', active: true },
];

const integrations = [
  { name: 'WhatsApp Business', icon: 'MessageSquare', connected: true, color: '#25D366' },
  { name: 'Gmail / SMTP', icon: 'Mail', connected: true, color: '#EA4335' },
  { name: 'DocuSign', icon: 'FileText', connected: true, color: '#003B7A' },
  { name: 'Make (Integromat)', icon: 'Zap', connected: false, color: '#7C3AED' },
  { name: 'Zapier', icon: 'Zap', connected: false, color: '#FF6600' },
];

export default function AutomacaoPage() {
  const [list, setList] = useState(automations);

  const toggle = (id: string) => {
    setList(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const th: React.CSSProperties = { fontSize: '10.5px', fontWeight: 600, color: 'var(--fg2)', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid var(--bd)', background: 'var(--surface-2)' };
  const td: React.CSSProperties = { padding: '12px 16px', fontSize: '13px', color: 'var(--fg)', borderBottom: '1px solid var(--bd2)' };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        {[
          { label: 'Automações Ativas', value: list.filter(a => a.active).length.toString(), color: 'var(--ok-fg)' },
          { label: 'Pausadas', value: list.filter(a => !a.active).length.toString(), color: 'var(--wn-fg)' },
          { label: 'Execuções (total)', value: list.reduce((s, a) => s + a.execucoes, 0).toString(), color: '#003B7A' },
          { label: 'Integrações Ativas', value: integrations.filter(i => i.connected).length.toString(), color: 'var(--pu-fg)' },
        ].map(item => (
          <Card key={item.label} hover>
            <p style={{ fontSize: '11px', color: 'var(--fg2)', marginBottom: '6px' }}>{item.label}</p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: item.color, fontFamily: "'DM Mono', monospace" }}>{item.value}</p>
          </Card>
        ))}
      </div>

      <Card padding="none" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--bd)' }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)' }}>Automações Configuradas</h3>
            <p style={{ fontSize: '12px', color: 'var(--fg2)', marginTop: '2px' }}>Fluxos automáticos do sistema</p>
          </div>
          <Button variant="primary" size="sm" icon={<Plus size={14} />}>Nova Automação</Button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>
            <th style={th}>Nome</th>
            <th style={th}>Gatilho</th>
            <th style={th}>Ação</th>
            <th style={th}>Status</th>
            <th style={th}>Execuções</th>
            <th style={th}>Última execução</th>
            <th style={th}>Ações</th>
          </tr></thead>
          <tbody>
            {list.map(a => (
              <tr key={a.id} onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')} style={{ transition: 'background .15s' }}>
                <td style={{ ...td, fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(0,59,122,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Bot size={14} style={{ color: '#003B7A' }} />
                    </div>
                    {a.name}
                  </div>
                </td>
                <td style={{ ...td, fontSize: '12px', color: 'var(--fg2)' }}>{a.trigger}</td>
                <td style={{ ...td, fontSize: '12px', color: 'var(--fg2)' }}>{a.action}</td>
                <td style={td}><Badge variant={a.active ? 'success' : 'warning'}>{a.active ? 'Ativo' : 'Pausado'}</Badge></td>
                <td style={{ ...td, fontFamily: "'DM Mono', monospace", fontSize: '12px' }}>{a.execucoes}</td>
                <td style={{ ...td, fontSize: '12px', color: 'var(--fg3)' }}>{a.ultima}</td>
                <td style={td}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => toggle(a.id)} style={{ background: a.active ? 'var(--wn-bg)' : 'var(--ok-bg)', border: 'none', borderRadius: '6px', color: a.active ? 'var(--wn-fg)' : 'var(--ok-fg)', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                      {a.active ? <Pause size={11} /> : <Play size={11} />} {a.active ? 'Pausar' : 'Ativar'}
                    </button>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg3)', padding: '4px', borderRadius: '6px', display: 'flex' }}><Settings size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: 'var(--fg)', marginBottom: '16px' }}>Integrações</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: '12px' }}>
          {integrations.map(int => (
            <div key={int.name} style={{ border: '1px solid var(--bd)', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${int.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: int.color }}>
                  <Zap size={18} />
                </div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg)' }}>{int.name}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Badge variant={int.connected ? 'success' : 'default'}>{int.connected ? 'Conectado' : 'Desconectado'}</Badge>
                <button style={{ fontSize: '11px', fontWeight: 500, color: int.connected ? 'var(--er-fg)' : '#003B7A', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  {int.connected ? 'Desconectar' : 'Conectar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
