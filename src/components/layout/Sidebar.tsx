'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Users, FileText, FileCheck, Kanban,
  Calculator, Settings, LogOut, ChevronRight, TrendingUp,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/crm', label: 'CRM / Clientes', icon: Users },
  { href: '/dashboard/pipeline', label: 'Pipeline', icon: Kanban },
  { href: '/dashboard/propostas', label: 'Propostas', icon: FileText },
  { href: '/dashboard/contratos', label: 'Contratos', icon: FileCheck },
  { href: '/dashboard/simulacao', label: 'Simulação', icon: Calculator },
  { href: '/dashboard/relatorios', label: 'Relatórios', icon: TrendingUp },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col z-40" style={{ background: '#003B7A' }}>
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <span className="text-white font-bold text-lg">R3</span>
          </div>
          <div>
            <p className="text-white font-bold text-base leading-tight">Grupo R3R</p>
            <p className="text-blue-200 text-xs">Crédito & Consórcios</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active ? 'bg-white/15 text-white' : 'text-blue-200 hover:bg-white/10 hover:text-white'}`}>
              <Icon size={18} />
              <span className="text-sm font-medium flex-1">{label}</span>
              {active && <ChevronRight size={14} className="opacity-60" />}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 pb-2">
        <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider px-2 mb-2">Produtos</p>
        <div className="space-y-1">
          {[{ label: 'Contemplado', color: '#C8962C' }, { label: 'Carta Programada', color: '#16A34A' }, { label: 'Home Equity', color: '#7C3AED' }, { label: 'Capital de Giro', color: '#0891B2' }].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-xs text-blue-200">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-white/10 space-y-1">
        <Link href="/dashboard/configuracoes" className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-200 hover:bg-white/10 hover:text-white transition-all">
          <Settings size={18} /><span className="text-sm font-medium">Configurações</span>
        </Link>
        <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-200 hover:bg-white/10 hover:text-white transition-all">
          <LogOut size={18} /><span className="text-sm font-medium">Sair</span>
        </Link>
      </div>
    </aside>
  );
}
