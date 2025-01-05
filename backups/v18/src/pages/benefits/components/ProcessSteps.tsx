import React from 'react';
import { Check, Circle } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  status: 'complete' | 'current' | 'upcoming';
  icon: React.ElementType;
}

interface ProcessStepsProps {
  steps: Step[];
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

      <div className="space-y-12">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="relative flex items-start">
              <div className="absolute left-8 top-8 -ml-px h-full w-0.5 bg-gray-200" />
              <div className="relative flex h-16 w-16 flex-none items-center justify-center bg-white">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ring-8 ring-white ${
                  step.status === 'complete' ? 'bg-green-500' :
                  step.status === 'current' ? 'bg-blue-500' :
                  'bg-gray-200'
                }`}>
                  {step.status === 'complete' ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <Icon className={`w-6 h-6 ${
                      step.status === 'current' ? 'text-white' : 'text-gray-400'
                    }`} />
                  )}
                </div>
              </div>
              <div className="ml-6 flex-auto">
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}