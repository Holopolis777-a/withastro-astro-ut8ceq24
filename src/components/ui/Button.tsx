import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

const variants = {
  primary: 'bg-primary-400 text-white hover:bg-primary-500',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-700 hover:bg-gray-100',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  disabled,
  children,
  as = 'button',
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const Component = as;
  const buttonProps = {
    className: clsx(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 disabled:opacity-50 disabled:cursor-not-allowed',
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    ),
    disabled,
    href,
    target,
    rel,
    ...props,
  };

  return <Component {...buttonProps}>{children}</Component>;
}