import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PortalCardProps {
  type: 'employee' | 'salary';
  isActive: boolean;
  onClick: () => void;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PortalCard({
  type,
  isActive,
  onClick,
  icon: Icon,
  title,
  description
}: PortalCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-xl border-2 transition-all ${
        isActive
          ? 'border-primary-400 bg-primary-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
          isActive ? 'bg-primary-400' : 'bg-gray-100'
        }`}>
          <Icon className={`w-8 h-8 ${
            isActive ? 'text-white' : 'text-gray-600'
          }`} />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {description}
        </p>
      </div>
    </button>
  );
}