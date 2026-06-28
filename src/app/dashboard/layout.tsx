'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [slim, setSlim] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar slim={slim} />
      <div style={{ flex: 1, marginLeft: slim ? '58px' : '232px', transition: 'margin-left 0.25s ease', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header slim={slim} onToggle={() => setSlim(s => !s)} />
        <main style={{ flex: 1, padding: '28px 32px', background: 'var(--bg)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
