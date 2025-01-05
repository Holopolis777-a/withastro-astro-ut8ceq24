import React from 'react';
import clsx from 'clsx';

interface NavBadgeProps {
  count: number;
  variant?: 'primary' | 'error';
}

export function NavBadge({ count, variant = 'primary' }: NavBadgeProps) {
  if (count === 0) return null;

  return (
    <span
      className={clsx(
        'ml-auto px-2 py-0.5 text-xs font-medium rounded-full',
        {
          'bg-primary-100 text-primary-600': variant === 'primary',
          'bg-red-100 text-red-600': variant === 'error',
        }
      )}
    >
      {count}
    </span>
  );
}