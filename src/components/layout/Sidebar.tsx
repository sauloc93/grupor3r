'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Users, FileText, FileCheck, Kanban,
  Calculator, TrendingUp, Bot, Star, Home, Briefcase,
  Settings, LogOut, ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  slim: boolean;
}

const sections = [
  {
    label: 'Principal',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
      { href: '/dashboard/crm', label: 'Clientes', icon: Users, badge: 7 },
      { href: '/dashboard/propostas', label: 'Propostas', icon: FileText, badge: 5 },
      { href: '/dashboard/contratos', label: 'Contratos', icon: FileCheck, badge: null },
    ],
  },
  {
    label: 'Operações',
    items: [
      { href: '/dashboard/simulacao', label: 'Simulador', icon: Calculator, badge: null },
      { href: '/dashboard/pipeline', label: 'Pipeline', icon: Kanban, badge: null },
      { href: '/dashboard/automacao', label: 'Automação', icon: Bot, badge: null },
      { href: '/dashboard/relatorios', label: 'Relatórios', icon: TrendingUp, badge: null },
    ],
  },
  {
    label: 'Produtos',
    items: [
      { href: '/dashboard/contemplados', label: 'Contemplados', icon: Star, badge: null },
      { href: '/dashboard/homeequity', label: 'Home Equity', icon: Home, badge: null },
      { href: '/dashboard/capitalgiro', label: 'Capital de Giro', icon: Briefcase, badge: null },
    ],
  },
];

export function Sidebar({ slim }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0, height: '100%',
      width: slim ? '58px' : '232px',
      background: '#003B7A',
      display: 'flex', flexDirection: 'column',
      zIndex: 40, transition: 'width 0.25s ease', overflow: 'hidden',
    }}>
      <div style={{ padding: slim ? '14px 0' : '18px 16px', borderBottom: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: slim ? 'center' : 'flex-start', minHeight: '61px' }}>
        <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '13px' }}>R3R</span>
        </div>
        {!slim && (
          <div>
            <p style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '15px', lineHeight: 1.2 }}>Grupo R3R</p>
            <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '10px', letterSpacing: '0.05em' }}>Crédito & Consórcios</p>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: slim ? '10px 0' : '10px 8px' }}>
        {sections.map((section) => (
          <div key={section.label} style={{ marginBottom: '16px' }}>
            {!slim && (
              <p style={{ fontSize: '9.5px', fontWeight: 600, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '6px 10px 4px', whiteSpace: 'nowrap' }}>
                {section.label}
              </p>
            )}
            {slim && <div style={{ height: '6px' }} />}
            {section.items.map(({ href, label, icon: Icon, badge }) => {
              const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  title={slim ? label : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: slim ? '9px 0' : '8px 10px',
                    justifyContent: slim ? 'center' : 'flex-start',
                    borderRadius: slim ? 0 : '8px',
                    marginBottom: '1px',
                    background: active ? 'rgba(255,255,255,.15)' : 'transparent',
                    borderLeft: active ? '3px solid #C8962C' : '3px solid transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,.6)',
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.08)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}}
                  onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.6)'; }}}
                >
                  <Icon size={16} style={{ flexShrink: 0 }} />
                  {!slim && (
                    <>
                      <span style={{ fontSize: '13px', fontWeight: 500, flex: 1, whiteSpace: 'nowrap' }}>{label}</span>
                      {active && <ChevronRight size={12} style={{ opacity: 0.5 }} />}
                      {badge != null && (
                        <span style={{ background: '#C8962C', color: '#fff', borderRadius: '999px', fontSize: '10px', fontWeight: 700, padding: '1px 6px', lineHeight: 1.4 }}>
                          {badge}
                        </span>
                      )}
                    </>
                  )}
                  {slim && badge != null && (
                    <span style={{ position: 'absolute', top: '5px', right: '4px', background: '#C8962C', color: '#fff', borderRadius: '999px', fontSize: '9px', fontWeight: 700, width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', padding: slim ? '8px 0' : '8px' }}>
        {[
          { href: '/dashboard/configuracoes', label: 'Configurações', icon: Settings },
          { href: '/login', label: 'Sair', icon: LogOut },
        ].map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            title={slim ? label : undefined}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: slim ? '9px 0' : '8px 10px', justifyContent: slim ? 'center' : 'flex-start', borderRadius: '8px', color: 'rgba(255,255,255,.45)', textDecoration: 'none', transition: 'all 0.15s', fontSize: '13px', fontWeight: 500 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.08)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.45)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <Icon size={16} style={{ flexShrink: 0 }} />
            {!slim && <span>{label}</span>}
          </Link>
        ))}
        {!slim && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', marginTop: '4px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '999px', background: '#C8962C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>CM</span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <p style={{ color: '#fff', fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap' }}>Carlos Mendes</p>
              <p style={{ color: 'rgba(255,255,255,.45)', fontSize: '10px', whiteSpace: 'nowrap' }}>Consultor Sênior</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
