import React from 'react';
import { Building2, Users, CheckCircle } from 'lucide-react';

interface BenefitsSectionProps {
  activePortal: 'employee' | 'salary';
  benefits: {
    employer: string[];
    employee: string[];
  };
}

export function BenefitsSection({ activePortal, benefits }: BenefitsSectionProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Employer Benefits */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Vorteile für Sie als Arbeitgeber</h4>
          </div>
          <ul className="space-y-2">
            {benefits.employer.map((benefit, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Employee Benefits */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-900">Vorteile für Ihre Mitarbeiter</h4>
          </div>
          <ul className="space-y-2">
            {benefits.employee.map((benefit, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}