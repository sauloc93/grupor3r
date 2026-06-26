'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'gold' | 'purple';
  size?: 'sm' | 'md';
}

const variantStyles: Record<string, React.CSSProperties> = {
  default:  { background: '#F1F5F9', color: '#64748B', border: '1px solid #E2E8F0' },
  success:  { background: 'var(--ok-bg)', color: 'var(--ok-fg)', border: '1px solid var(--ok-bd)' },
  warning:  { background: 'var(--wn-bg)', color: 'var(--wn-fg)', border: '1px solid var(--wn-bd)' },
  danger:   { background: 'var(--er-bg)', color: 'var(--er-fg)', border: '1px solid var(--er-bd)' },
  info:     { background: 'var(--in-bg)', color: 'var(--in-fg)', border: '1px solid var(--in-bd)' },
  gold:     { background: 'var(--gold-bg)', color: 'var(--gold-dk)', border: '1px solid rgba(200,150,44,.25)' },
  purple:   { background: 'var(--pu-bg)', color: 'var(--pu-fg)', border: '1px solid var(--pu-bd)' },
};

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', fontWeight: 500,
      borderRadius: '999px', whiteSpace: 'nowrap',
      fontSize: size === 'sm' ? '11px' : '12px',
      padding: size === 'sm' ? '2px 8px' : '3px 10px',
      ...variantStyles[variant],
    }}>
      {children}
    </span>
  );
}
