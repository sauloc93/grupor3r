'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Bell, Shield, Building2, Link, Save } from 'lucide-react';

const TABS = [
  { id: 'perfil', label: 'Perfil', icon: User },
  { id: 'notificacoes', label: 'Notificações', icon: Bell },
  { id: 'seguranca', label: 'Segurança', icon: Shield },
  { id: 'empresa', label: 'Empresa', icon: Building2 },
  { id: 'integracoes', label: 'Integrações', icon: Link },
];

function InputGroup({ label, defaultValue, type = 'text' }: { label: string; defaultValue: string; type?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--fg2)' }}>{label}</label>
      <input type={type} defaultValue={defaultValue} style={{ padding: '9px 12px', fontSize: '13px', background: 'var(--surface-2)', border: '1px solid var(--bd)', borderRadius: '8px', color: 'var(--fg)' }} />
    </div>
  );
}

function Toggle({ label, desc, defaultOn = false }: { label: string; desc?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--bd2)' }}>
      <div>
        <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--fg)' }}>{label}</p>
        {desc && <p style={{ fontSize: '12px', color: 'var(--fg3)', marginTop: '2px' }}>{desc}</p>}
      </div>
      <button onClick={() => setOn(!on)} style={{ width: '36px', height: '20px', borderRadius: '999px', border: 'none', cursor: 'pointer', background: on ? '#003B7A' : 'var(--bd)', position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: '2px', left: on ? '18px' : '2px', width: '16px', height: '16px', borderRadius: '999px', background: '#fff', transition: 'left .2s', display: 'block' }} />
      </button>
    </div>
  );
}

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState('perfil');

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px', alignItems: 'start' }}>
      <Card padding="sm">
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500, background: activeTab === id ? 'rgba(0,59,122,.08)' : 'transparent', color: activeTab === id ? '#003B7A' : 'var(--fg2)', transition: 'all .15s', textAlign: 'left' }}
              onMouseEnter={e => { if (activeTab !== id) (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'; }}
              onMouseLeave={e => { if (activeTab !== id) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </nav>
      </Card>

      <Card>
        {activeTab === 'perfil' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '16px', color: 'var(--fg)', marginBottom: '20px' }}>Informações do Perfil</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '999px', background: '#003B7A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>CM</span>
              </div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--fg)' }}>Carlos Mendes</p>
                <p style={{ fontSize: '13px', color: 'var(--fg3)' }}>Consultor Sênior</p>
              </div>
              <Button variant="secondary" size="sm" style={{ marginLeft: 'auto' }}>Alterar foto</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <InputGroup label="Nome" defaultValue="Carlos Mendes" />
              <InputGroup label="E-mail" defaultValue="carlos@grupor3r.com.br" type="email" />
              <InputGroup label="Telefone" defaultValue="(11) 99999-0000" />
              <InputGroup label="Cargo" defaultValue="Consultor Sênior" />
            </div>
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--bd)' }}>
              <Button variant="primary" icon={<Save size={14} />}>Salvar Alterações</Button>
            </div>
          </div>
        )}

        {activeTab === 'notificacoes' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '16px', color: 'var(--fg)', marginBottom: '20px' }}>Preferências de Notificação</h3>
            <Toggle label="Nova proposta criada" desc="Quando uma nova proposta for registrada" defaultOn />
            <Toggle label="Proposta aprovada" desc="Quando uma proposta for aprovada" defaultOn />
            <Toggle label="Contrato assinado" desc="Quando um contrato for assinado digitalmente" defaultOn />
            <Toggle label="Novo cliente cadastrado" desc="Quando um lead for inserido no sistema" />
            <Toggle label="Relatório semanal" desc="Resumo de atividades enviado toda segunda-feira" defaultOn />
            <div style={{ marginTop: '20px' }}><Button variant="primary" icon={<Save size={14} />}>Salvar</Button></div>
          </div>
        )}

        {activeTab === 'seguranca' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '16px', color: 'var(--fg)', marginBottom: '20px' }}>Segurança da Conta</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '380px' }}>
              <InputGroup label="Senha Atual" defaultValue="" type="password" />
              <InputGroup label="Nova Senha" defaultValue="" type="password" />
              <InputGroup label="Confirmar Nova Senha" defaultValue="" type="password" />
              <Button variant="primary" icon={<Save size={14} />}>Alterar Senha</Button>
            </div>
            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--bd)' }}>
              <Toggle label="Autenticação em dois fatores" desc="Adiciona uma camada extra de segurança" />
            </div>
          </div>
        )}

        {activeTab === 'empresa' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '16px', color: 'var(--fg)', marginBottom: '20px' }}>Dados da Empresa</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <InputGroup label="Razão Social" defaultValue="Grupo R3R Crédito Ltda" />
              <InputGroup label="CNPJ" defaultValue="12.345.678/0001-99" />
              <InputGroup label="Endereço" defaultValue="Av. Paulista, 1000" />
              <InputGroup label="Cidade / Estado" defaultValue="São Paulo / SP" />
            </div>
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--bd)' }}>
              <Button variant="primary" icon={<Save size={14} />}>Salvar</Button>
            </div>
          </div>
        )}

        {activeTab === 'integracoes' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '16px', color: 'var(--fg)', marginBottom: '20px' }}>Integrações</h3>
            {[
              { name: 'WhatsApp Business', desc: 'Envio de mensagens automáticas', connected: true },
              { name: 'DocuSign', desc: 'Assinatura digital de contratos', connected: true },
              { name: 'Serasa', desc: 'Consulta de crédito e score', connected: false },
              { name: 'Receita Federal', desc: 'Validação de CPF/CNPJ', connected: false },
              { name: 'HubSpot CRM', desc: 'Sincronização de leads', connected: false },
            ].map(int => (
              <div key={int.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--bd2)' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg)' }}>{int.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--fg3)', marginTop: '2px' }}>{int.desc}</p>
                </div>
                <Button variant={int.connected ? 'secondary' : 'primary'} size="sm">
                  {int.connected ? 'Desconectar' : 'Conectar'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
