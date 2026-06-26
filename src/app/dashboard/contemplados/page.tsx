'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, Star, Calendar } from 'lucide-react';
import { formatCurrency } from '@/lib/data';

const letters = [
  { id: 'CT001', admin: 'Embracon', product: 'Imóvel', value: 350000, installments: 180, monthly: 2100, expiry: '2025-07-30', available: true },
  { id: 'CT002', admin: 'Porto Seguro', product: 'Veículo', value: 80000, installments: 72, monthly: 1350, expiry: '2025-08-15', available: true },
  { id: 'CT003', admin: 'Ademicon', product: 'Imóvel', value: 500000, installments: 200, monthly: 2900, expiry: '2025-07-20', available: true },
  { id: 'CT004', admin: 'Rodobens', product: 'Serviços', value: 45000, installments: 60, monthly: 890, expiry: '2025-09-01', available: true },
  { id: 'CT005', admin: 'Caixa', product: 'Imóvel', value: 1200000, installments: 240, monthly: 6800, expiry: '2025-07-10', available: false },
  { id: 'CT006', admin: 'Bradesco', product: 'Veículo', value: 120000, installments: 84, monthly: 1750, expiry: '2025-08-30', available: true },
  { id: 'CT007', admin: 'Itaú', product: 'Imóvel', value: 700000, installments: 180, monthly: 4200, expiry: '2025-10-01', available: true },
  { id: 'CT008', admin: 'Sompo', product: 'Serviços', value: 30000, installments: 48, monthly: 720, expiry: '2025-09-15', available: true },
];

const productColors: Record<string, string> = {
  'Imóvel': '#003B7A',
  'Veículo': 'var(--gold)',
  'Serviços': 'var(--ok-fg)',
};

export default function ContempladasPage() {
  const [search, setSearch] = useState('');
  const [product, setProduct] = useState('todos');

  const filtered = letters.filter(l => {
    const matchSearch = l.admin.toLowerCase().includes(search.toLowerCase()) || l.id.toLowerCase().includes(search.toLowerCase());
    const matchProduct = product === 'todos' || l.product === product;
    return matchSearch && matchProduct;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        {[
          { label: 'Cartas Disponíveis', value: letters.filter(l => l.available).length.toString(), color: 'var(--ok-fg)' },
          { label: 'Imóveis', value: letters.filter(l => l.product === 'Imóvel').length.toString(), color: '#003B7A' },
          { label: 'Veículos', value: letters.filter(l => l.product === 'Veículo').length.toString(), color: 'var(--gold)' },
          { label: 'Volume Total', value: formatCurrency(letters.reduce((s, l) => s + l.value, 0)), color: 'var(--pu-fg)' },
        ].map(item => (
          <Card key={item.label} hover>
            <p style={{ fontSize: '11px', color: 'var(--fg2)', marginBottom: '6px' }}>{item.label}</p>
            <p style={{ fontSize: '20px', fontWeight: 700, color: item.color, fontFamily: "'DM Mono', monospace" }}>{item.value}</p>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--fg3)' }} />
          <input type="text" placeholder="Buscar por administradora ou código..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '32px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', fontSize: '13px', background: '#fff', border: '1px solid var(--bd)', borderRadius: '8px', color: 'var(--fg)', width: '100%' }} />
        </div>
        <select value={product} onChange={e => setProduct(e.target.value)} style={{ padding: '8px 12px', fontSize: '13px', background: '#fff', border: '1px solid var(--bd)', borderRadius: '8px', color: 'var(--fg)' }}>
          <option value="todos">Todos os produtos</option>
          <option value="Imóvel">Imóvel</option>
          <option value="Veículo">Veículo</option>
          <option value="Serviços">Serviços</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '14px' }}>
        {filtered.map(l => {
          const pc = productColors[l.product] || '#003B7A';
          const daysLeft = Math.ceil((new Date(l.expiry).getTime() - Date.now()) / 86400000);
          return (
            <Card key={l.id} hover style={{ position: 'relative', borderTop: `3px solid ${pc}`, opacity: l.available ? 1 : 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${pc}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Star size={15} style={{ color: pc }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--fg3)', fontFamily: "'DM Mono', monospace" }}>{l.id}</p>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg)' }}>{l.admin}</p>
                  </div>
                </div>
                <Badge variant={l.available ? 'success' : 'default'}>{l.available ? 'Disponível' : 'Reservada'}</Badge>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '999px', background: `${pc}14`, color: pc }}>{l.product}</span>
              </div>

              <div style={{ background: 'var(--surface-2)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                <p style={{ fontSize: '11px', color: 'var(--fg3)', marginBottom: '3px' }}>Valor da Carta</p>
                <p style={{ fontSize: '22px', fontWeight: 800, color: 'var(--fg)', fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{formatCurrency(l.value)}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <p style={{ fontSize: '10px', color: 'var(--fg3)' }}>Parcela/mês</p>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg)', fontFamily: "'DM Mono', monospace" }}>{formatCurrency(l.monthly)}</p>
                </div>
                <div>
                  <p style={{ fontSize: '10px', color: 'var(--fg3)' }}>Prazo</p>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg)' }}>{l.installments}x</p>
                </div>
                <div>
                  <p style={{ fontSize: '10px', color: 'var(--fg3)' }}>Expira em</p>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: daysLeft <= 15 ? 'var(--er-fg)' : 'var(--wn-fg)' }}>{daysLeft}d</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px', fontSize: '11px', color: 'var(--fg3)' }}>
                <Calendar size={11} />&nbsp;Vence {new Date(l.expiry).toLocaleDateString('pt-BR')}
              </div>

              <Button variant="primary" style={{ width: '100%' }} disabled={!l.available}>
                {l.available ? 'Associar a Cliente' : 'Indisponível'}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
