'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search, Menu, Plus, ChevronDown } from 'lucide-react';

interface HeaderProps {
  slim: boolean;
  onToggle: () => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Visão geral da operação' },
  '/dashboard/crm': { title: 'Clientes', subtitle: 'Gestão de base de clientes' },
  '/dashboard/propostas': { title: 'Propostas', subtitle: 'Ciclo completo do lead ao fechamento' },
  '/dashboard/contratos': { title: 'Contratos', subtitle: 'Geração e assinatura digital' },
  '/dashboard/simulacao': { title: 'Simulador de Crédito', subtitle: 'Simule os melhores produtos para seu cliente' },
  '/dashboard/pipeline': { title: 'Pipeline de Vendas', subtitle: 'Gestão visual do funil' },
  '/dashboard/automacao': { title: 'Automação', subtitle: 'Fluxos automáticos e integrações' },
  '/dashboard/relatorios': { title: 'Relatórios', subtitle: 'Analytics e dados consolidados' },
  '/dashboard/contemplados': { title: 'Cartas Contempladas', subtitle: 'Disponíveis para uso imediato' },
  '/dashboard/homeequity': { title: 'Home Equity', subtitle: 'Crédito com garantia de imóvel' },
  '/dashboard/capitalgiro': { title: 'Capital de Giro', subtitle: 'Soluções para empresas' },
  '/dashboard/configuracoes': { title: 'Configurações', subtitle: 'Perfil e integrações' },
};

export function Header({ slim, onToggle }: HeaderProps) {
  const pathname = usePathname();
  const page = pageTitles[pathname] ?? { title: 'Dashboard', subtitle: '' };

  return (
    <header style={{
      background: '#fff',
      borderBottom: '1px solid var(--bd)',
      padding: '0 28px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      position: 'sticky',
      top: 0,
      zIndex: 30,
    }}>
      <button
        onClick={onToggle}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg2)', padding: '7px', borderRadius: '8px', display: 'flex', alignItems: 'center', transition: 'all .15s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg2)'; }}
      >
        <Menu size={18} />
      </button>

      <div style={{ flex: 1 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '18px', color: 'var(--fg)', lineHeight: 1.2 }}>
          {page.title}
        </h1>
        {page.subtitle && <p style={{ fontSize: '11.5px', color: 'var(--fg3)', marginTop: '1px' }}>{page.subtitle}</p>}
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Search size={13} style={{ position: 'absolute', left: '10px', color: 'var(--fg3)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Buscar clientes, propostas..."
          style={{ paddingLeft: '30px', paddingRight: '12px', paddingTop: '7px', paddingBottom: '7px', fontSize: '13px', background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: '8px', color: 'var(--fg)', width: '220px' }}
        />
      </div>

      <button
        style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: '8px', color: 'var(--fg)', fontSize: '13px', fontWeight: 500, padding: '7px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', transition: 'all .15s', whiteSpace: 'nowrap' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg)'; (e.currentTarget as HTMLElement).style.borderColor = '#003B7A'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--bd)'; }}
      >
        <Plus size={13} /> Cliente
      </button>

      <button
        style={{ background: '#003B7A', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: 600, padding: '7px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', transition: 'all .15s', whiteSpace: 'nowrap' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#004A99'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#003B7A'}
      >
        <Plus size={13} /> Proposta
      </button>

      <button
        style={{ position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg2)', padding: '7px', borderRadius: '8px', display: 'flex', alignItems: 'center', transition: 'all .15s' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        <Bell size={17} />
        <span style={{ position: 'absolute', top: '5px', right: '5px', width: '7px', height: '7px', borderRadius: '999px', background: '#DC2626', border: '2px solid #fff' }} />
      </button>

      <button
        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '5px 8px', borderRadius: '8px', transition: 'all .15s' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        <div style={{ width: '30px', height: '30px', borderRadius: '999px', background: '#003B7A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>CM</span>
        </div>
        <div style={{ textAlign: 'left' }}>
          <p style={{ color: 'var(--fg)', fontSize: '12.5px', fontWeight: 500, lineHeight: 1.2 }}>Carlos Mendes</p>
          <p style={{ color: 'var(--fg3)', fontSize: '10.5px' }}>Consultor Sênior</p>
        </div>
        <ChevronDown size={12} style={{ color: 'var(--fg3)' }} />
      </button>
    </header>
  );
}
