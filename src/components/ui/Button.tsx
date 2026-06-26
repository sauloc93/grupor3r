'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
}

const variants: Record<string, string> = {
  primary: 'bg-[#003B7A] hover:bg-[#004A9E] text-white shadow-sm',
  secondary: 'bg-[#F5F7FA] hover:bg-[#E8ECF0] text-[#003B7A] border border-[#E8ECF0]',
  outline: 'bg-white hover:bg-[#F5F7FA] text-[#003B7A] border border-[#003B7A]',
  ghost: 'bg-transparent hover:bg-[#F5F7FA] text-[#5A6A7A]',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  gold: 'bg-[#C8962C] hover:bg-[#B8861C] text-white shadow-sm',
};

const sizes: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
};

export function Button({ children, variant = 'primary', size = 'md', loading, icon, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon}
      {children}
    </button>
  );
}
