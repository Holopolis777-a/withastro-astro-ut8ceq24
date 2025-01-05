import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TimelineStepProps {
  icon: LucideIcon;
  title: string;
  description: string[];
  color: string;
  isLast?: boolean;
}

export function TimelineStep({
  icon: Icon,
  title,
  description,
  color,
  isLast
}: TimelineStepProps) {
  return (
    <div className="relative flex items-start">
      {/* Icon container */}
      <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${color} shadow-lg`}>
        <Icon className="w-8 h-8 text-white" />
      </div>

      {/* Content */}
      <div className="ml-8 flex-1">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
          <ul className="space-y-2">
            {description.map((item, index) => (
              <li key={index} className="flex items-start text-gray-600">
                <span className="mr-2 mt-1.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {!isLast && (
          <div className="absolute left-8 ml-[7px] top-16 bottom-0 w-0.5 bg-gray-200" />
        )}
      </div>
    </div>
  );
}