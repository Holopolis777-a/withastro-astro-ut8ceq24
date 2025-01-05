import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceItemProps {
  icon: LucideIcon;
  title: string;
  description?: string[];
}

export function ServiceItem({ icon: Icon, title, description }: ServiceItemProps) {
  return (
    <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100">
      <div className="flex-shrink-0">
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        {description && (
          <ul className="mt-1 space-y-1">
            {description.map((item, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}