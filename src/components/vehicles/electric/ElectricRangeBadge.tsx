import React from 'react';
import { Battery } from 'lucide-react';

interface ElectricRangeBadgeProps {
  range: number;
  className?: string;
}

export function ElectricRangeBadge({ range, className }: ElectricRangeBadgeProps) {
  return (
    <div className={`flex items-center text-green-600 font-medium ${className}`}>
      <Battery className="w-4 h-4 mr-2" />
      <span>{range} km Reichweite</span>
    </div>
  );
}