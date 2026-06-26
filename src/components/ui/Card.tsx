'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };

export function Card({ children, className = '', style, hover = false, padding = 'md' }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${paddings[padding]} ${hover ? 'card-hover cursor-pointer' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}

export function MetricCard({ title, value, subtitle, icon, trend, trendValue, color = '#003B7A' }: {
  title: string; value: string; subtitle?: string; icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral'; trendValue?: string; color?: string;
}) {
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500';
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
  return (
    <Card className="card-hover">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {trendValue && <p className={`text-xs font-medium mt-2 ${trendColor}`}>{trendIcon} {trendValue} vs mês anterior</p>}
        </div>
        <div className="rounded-xl p-3 ml-4" style={{ backgroundColor: `${color}15` }}>
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
    </Card>
  );
}
