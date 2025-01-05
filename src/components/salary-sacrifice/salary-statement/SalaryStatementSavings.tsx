import React from 'react';
import { formatCurrency } from '../../../utils/formatters';

interface SalaryStatementSavingsProps {
  effectiveCosts: number;
}

export function SalaryStatementSavings({ effectiveCosts }: SalaryStatementSavingsProps) {
  return (
    <div className="bg-[#dcfce7] p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">
          Effektive monatliche Kosten
        </div>
        <div className="text-3xl font-bold text-gray-900">
          {formatCurrency(effectiveCosts)}
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-2">
        Dies sind Ihre tatsächlichen monatlichen Kosten nach Berücksichtigung aller Steuer- und Sozialversicherungsvorteile.
      </p>
    </div>
  );
}