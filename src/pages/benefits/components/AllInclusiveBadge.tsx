import React from 'react';
import { Check } from 'lucide-react';

export function AllInclusiveBadge() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">All-Inclusive Rate</h3>
          <p className="text-indigo-100">
            Eine monatliche Rate - alle Leistungen inklusive
          </p>
        </div>
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}