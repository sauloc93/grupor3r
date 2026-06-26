'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const paddings: Record<string, string> = {
  none: '0',
  sm: '14px 16px',
  md: '18px 22px',
  lg: '24px 28px',
};

export function Card({ children, className = '', style, hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={`${hover ? 'card-hover' : ''} ${className}`}
      style={{
        background: '#fff',
        border: '1px solid var(--bd)',
        borderRadius: '14px',
        padding: paddings[padding],
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function MetricCard({
  title, value, subtitle, icon, trend, trendValue, color = '#003B7A',
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
}) {
  const trendColor = trend === 'up' ? 'var(--ok-fg)' : trend === 'down' ? 'var(--er-fg)' : 'var(--fg3)';
  const trendBg = trend === 'up' ? 'var(--ok-bg)' : trend === 'down' ? 'var(--er-bg)' : 'var(--bg)';
  const trendArrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <Card hover>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--fg3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</p>
          <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--fg)', fontFamily: "'DM Mono', monospace", lineHeight: 1, marginBottom: '6px' }}>{value}</p>
          {subtitle && <p style={{ fontSize: '12px', color: 'var(--fg3)' }}>{subtitle}</p>}
          {trendValue && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '8px', fontSize: '11.5px', fontWeight: 600, color: trendColor, background: trendBg, padding: '2px 8px', borderRadius: '999px' }}>
              {trendArrow} {trendValue}
            </span>
          )}
        </div>
        <div style={{ borderRadius: '10px', padding: '10px', background: `${color}14`, border: `1px solid ${color}22`, flexShrink: 0 }}>
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
    </Card>
  );
}
