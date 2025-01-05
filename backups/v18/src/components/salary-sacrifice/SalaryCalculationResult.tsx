import React from 'react';
import { PiggyBank, Euro } from 'lucide-react';
import type { SalaryCalculationResult as CalculationResult } from '../../utils/salary';

interface SalaryCalculationResultProps {
  calculation: CalculationResult;
}

export function SalaryCalculationResult({ calculation }: SalaryCalculationResultProps) {
  return (
    <div className="mt-8 space-y-6">
      {/* Netto Vergleich */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Euro className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Netto ohne Leasing</span>
          </div>
          <p className="text-2xl font-semibold mt-1">
            {calculation.netSalaryWithoutLease.toFixed(2)}€
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Euro className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Netto mit Leasing</span>
          </div>
          <p className="text-2xl font-semibold mt-1">
            {calculation.netSalaryWithLease.toFixed(2)}€
          </p>
        </div>
      </div>

      {/* Ersparnisse */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <PiggyBank className="w-5 h-5 text-green-600" />
            <span className="font-medium">Monatliche Steuerersparnis</span>
          </div>
          <span className="text-lg font-semibold text-green-600">
            +{calculation.taxSavings.toFixed(2)}€
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <PiggyBank className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Sozialversicherungsersparnis</span>
          </div>
          <span className="text-lg font-semibold text-blue-600">
            +{calculation.socialSecuritySavings.toFixed(2)}€
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Euro className="w-5 h-5 text-pink-600" />
            <span className="font-medium">Effektive monatliche Kosten</span>
          </div>
          <span className="text-lg font-semibold text-pink-600">
            {calculation.effectiveCosts.toFixed(2)}€
          </span>
        </div>
      </div>

      {/* Gesamtersparnis */}
      <div className="mt-4 p-6 bg-gray-900 text-white rounded-xl">
        <div className="flex items-center justify-between">
          <span className="font-medium text-lg">Ihre monatliche Ersparnis</span>
          <span className="text-3xl font-bold">
            {calculation.monthlyBenefit.toFixed(2)}€
          </span>
        </div>
      </div>
    </div>
  );
}