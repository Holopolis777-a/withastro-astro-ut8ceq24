import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function BenefitCard({ icon: Icon, title, description, children }: BenefitCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}