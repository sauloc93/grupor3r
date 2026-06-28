'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
}

const variants: Record<string, React.CSSProperties> = {
  primary:   { background: '#003B7A', color: '#fff', border: 'none' },
  secondary: { background: '#fff', color: 'var(--fg)', border: '1px solid var(--bd)' },
  outline:   { background: 'transparent', color: '#003B7A', border: '1px solid #003B7A' },
  ghost:     { background: 'transparent', color: 'var(--fg2)', border: 'none' },
  danger:    { background: 'var(--er-bg)', color: 'var(--er-fg)', border: '1px solid var(--er-bd)' },
  gold:      { background: 'var(--gold)', color: '#fff', border: 'none' },
};

const sizes: Record<string, React.CSSProperties> = {
  sm: { padding: '5px 12px', fontSize: '12px', borderRadius: '7px', gap: '4px' },
  md: { padding: '8px 16px', fontSize: '13px', borderRadius: '8px', gap: '6px' },
  lg: { padding: '11px 22px', fontSize: '14px', borderRadius: '10px', gap: '7px' },
};

export function Button({ children, variant = 'primary', size = 'md', loading, icon, style, ...props }: ButtonProps) {
  return (
    <button
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 500, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
        transition: 'all 0.15s ease', whiteSpace: 'nowrap',
        opacity: (loading || props.disabled) ? 0.55 : 1,
        ...variants[variant],
        ...sizes[size],
        ...style,
      } as React.CSSProperties}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg style={{ animation: 'spin 1s linear infinite', width: '14px', height: '14px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24">
          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon}
      {children}
    </button>
  );
}
