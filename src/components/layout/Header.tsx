'use client';
import { Bell, Search, ChevronDown } from 'lucide-react';
interface HeaderProps { title: string; subtitle?: string; }
export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center">
          <Search size={16} className="absolute left-3 text-gray-400" />
          <input type="text" placeholder="Buscar clientes, propostas..." className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 w-64" />
        </div>
        <button className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#003B7A' }}>CM</div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900">Carlos Mendes</p>
            <p className="text-xs text-gray-500">Consultor Senior</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}
