import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InsuranceFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function InsuranceFeature({ icon: Icon, title, description }: InsuranceFeatureProps) {
  return (
    <div className="flex items-start space-x-4 bg-white p-4 rounded-lg">
      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-green-600" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
}