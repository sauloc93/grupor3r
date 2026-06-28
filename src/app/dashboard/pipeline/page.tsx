'use client';
import { useState } from 'react';

const COLUNAS = ['Captação', 'Qualificação', 'Proposta', 'Análise', 'Fechamento', 'Pós-venda'];
const colColor: Record<string, string> = { 'Captação': '#6b7280', 'Qualificação': '#b8973a', 'Proposta': '#1d4ed8', 'Análise': '#7c3aed', 'Fechamento': '#16a34a', 'Pós-venda': '#0891b2' };
const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

const initialCards = [
  { id: 1, cliente: 'Marina Alves', produto: 'Contemplado', valor: 480000, col: 'Fechamento', resp: 'Carlos M.' },
  { id: 2, cliente: 'TechBuild Ltda', produto: 'Capital de Giro', valor: 1200000, col: 'Análise', resp: 'Ana S.' },
  { id: 3, cliente: 'Roberto Fonseca', produto: 'Home Equity', valor: 750000, col: 'Proposta', resp: 'Carlos M.' },
  { id: 4, cliente: 'Construflex SA', produto: 'Contemplado', valor: 3500000, col: 'Captação', resp: 'João P.' },
  { id: 5, cliente: 'Ana Drummond', produto: 'Contemplado', valor: 320000, col: 'Qualificação', resp: 'Ana S.' },
  { id: 6, cliente: 'Grupo Mendes', produto: 'Home Equity', valor: 2100000, col: 'Pós-venda', resp: 'Carlos M.' },
  { id: 7, cliente: 'Carlos Viana', produto: 'Capital de Giro', valor: 95000, col: 'Qualificação', resp: 'João P.' },
  { id: 8, cliente: 'Construtora Vale', produto: 'Contemplado', valor: 900000, col: 'Captação', resp: 'Ana S.' },
];

export default function PipelinePage() {
  const [cards, setCards] = useState(initialCards);
  const [dragging, setDragging] = useState<number | null>(null);
  const [over, setOver] = useState<string | null>(null);

  function onDrop(col: string) {
    if (dragging === null) return;
    setCards(prev => prev.map(c => c.id === dragging ? { ...c, col } : c));
    setDragging(null);
    setOver(null);
  }

  return (
    <div style={{ padding: '32px', fontFamily: "'DM Sans', sans-serif", background: '#F5F7FA', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Pipeline — Kanban</h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Arraste os cards para mover entre etapas</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', overflowX: 'auto' }}>
        {COLUNAS.map(col => {
          const colCards = cards.filter(c => c.col === col);
          const total = colCards.reduce((s, c) => s + c.valor, 0);
          return (
            <div key={col}
              onDragOver={e => { e.preventDefault(); setOver(col); }}
              onDrop={() => onDrop(col)}
              onDragLeave={() => setOver(null)}
              style={{ background: over === col ? '#fffbf0' : '#f1f5f9', borderRadius: '12px', padding: '12px', border: `2px solid ${over === col ? '#B8973A' : 'transparent'}`, minHeight: '400px', transition: 'all 0.2s' }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: colColor[col] }}>{col}</span>
                  <span style={{ fontSize: '11px', background: colColor[col] + '20', color: colColor[col], borderRadius: '10px', padding: '2px 7px', fontWeight: 600 }}>{colCards.length}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{fmt(total)}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {colCards.map(card => (
                  <div key={card.id}
                    draggable
                    onDragStart={() => setDragging(card.id)}
                    style={{ background: '#fff', borderRadius: '10px', padding: '12px', border: '1px solid #e2e8f0', cursor: 'grab', boxShadow: dragging === card.id ? '0 4px 12px rgba(0,0,0,0.12)' : 'none', opacity: dragging === card.id ? 0.6 : 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>{card.cliente}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>{card.produto}</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#B8973A', fontFamily: "'DM Mono', monospace" }}>{fmt(card.valor)}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>{card.resp}</div>
                  </div>
                ))}
                <button style={{ padding: '8px', border: '2px dashed #e2e8f0', borderRadius: '10px', background: 'transparent', color: '#94a3b8', fontSize: '12px', cursor: 'pointer', marginTop: '4px' }}>+ Adicionar</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
