import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  number: number;
  isLast?: boolean;
}

export function ProcessStep({ icon: Icon, title, description, number, isLast }: ProcessStepProps) {
  return (
    <div className="relative flex items-start ml-8">
      {!isLast && (
        <div className="absolute left-8 top-8 -ml-px h-full w-0.5 bg-gray-200" />
      )}
      <div className="relative flex h-16 w-16 flex-none items-center justify-center bg-white">
        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center ring-8 ring-white">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <div className="ml-6 flex-auto">
        <div className="flex items-center">
          <span className="text-sm text-blue-600 font-medium mr-2">
            Schritt {number}
          </span>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}