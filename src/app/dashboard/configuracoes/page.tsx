'use client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Bell, Shield, Building2, Link, Palette } from 'lucide-react';

export default function ConfiguracoesPage() {
  return (
    <div className="animate-fade-in">
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="h-fit">
            <nav className="space-y-1">
              {[{ icon: User, label: 'Perfil', active: true }, { icon: Bell, label: 'Notificações' }, { icon: Shield, label: 'Segurança' }, { icon: Building2, label: 'Empresa' }, { icon: Link, label: 'Integrações' }, { icon: Palette, label: 'Aparência' }].map(({ icon: Icon, label, active }) => (
                <button key={label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`} style={active ? { background: '#003B7A' } : {}}>
                  <Icon size={16} />{label}
                </button>
              ))}
            </nav>
          </Card>
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="font-bold text-gray-900 mb-6">Informações do Perfil</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black" style={{ background: '#003B7A' }}>CM</div>
                <div><p className="font-bold text-gray-900">Carlos Mendes</p><p className="text-sm text-gray-500">Consultor Senior</p><button className="text-xs text-blue-700 mt-1 hover:underline">Alterar foto</button></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: 'Nome Completo', value: 'Carlos Mendes' }, { label: 'E-mail', value: 'carlos@grupor3r.com.br' }, { label: 'Telefone', value: '(11) 99999-9999' }, { label: 'Cargo', value: 'Consultor Senior' }].map(({ label, value }) => (
                  <div key={label}><label className="text-xs font-medium text-gray-500 block mb-1.5">{label}</label><input defaultValue={value} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100" /></div>
                ))}
              </div>
              <div className="mt-4 flex gap-3"><Button variant="primary">Salvar Alterações</Button><Button variant="secondary">Cancelar</Button></div>
            </Card>
            <Card>
              <h3 className="font-bold text-gray-900 mb-6">Integrações de API</h3>
              <p className="text-sm text-gray-600 mb-4">Conecte com as principais administradoras de consórcio:</p>
              <div className="space-y-3">
                {[{ name: 'Embracon API', status: 'Conectado', color: '#16A34A' }, { name: 'Ademicon API', status: 'Conectado', color: '#16A34A' }, { name: 'Porto Seguro API', status: 'Não configurado', color: '#9CA3AF' }, { name: 'Rodobens API', status: 'Não configurado', color: '#9CA3AF' }].map(item => (
                  <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full" style={{ background: item.color }} /><span className="text-sm font-medium text-gray-800">{item.name}</span></div>
                    <div className="flex items-center gap-3"><span className="text-xs" style={{ color: item.color }}>{item.status}</span><Button variant="secondary" size="sm">{item.status === 'Conectado' ? 'Configurar' : 'Conectar'}</Button></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
