import React from 'react';
import { Check, X } from 'lucide-react';

interface CustomFeatureListProps {
  features: { [key: string]: string };
  onRemoveFeature: (id: string) => void;
}

export function CustomFeatureList({ features, onRemoveFeature }: CustomFeatureListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(features).map(([id, label]) => (
        <div
          key={id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100"
        >
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">{label}</span>
          </div>
          <button
            type="button"
            onClick={() => onRemoveFeature(id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}