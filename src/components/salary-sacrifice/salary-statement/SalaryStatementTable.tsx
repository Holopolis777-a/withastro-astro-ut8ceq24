import React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import type { SalaryCalculations } from '../../../types/salary';

interface SalaryStatementTableProps {
  calculations: SalaryCalculations;
  monthlyRate: number;
}

export function SalaryStatementTable({ calculations, monthlyRate }: SalaryStatementTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Position</th>
            <th className="px-4 py-2 text-right">Ohne Vilonda</th>
            <th className="px-4 py-2 text-right">Mit Vilonda</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {/* Grundbrutto */}
          <tr>
            <td className="px-4 py-2 font-medium">Grundbrutto</td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(calculations.withoutLease.gross)}
            </td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(calculations.withLease.gross)}
            </td>
          </tr>
          
          {/* Entgeltumwandlung */}
          <tr className="bg-gray-50">
            <td className="px-4 py-2 font-medium">Entgeltumwandlung Dienstwagen</td>
            <td className="px-4 py-2 text-right">-</td>
            <td className="px-4 py-2 text-right text-red-600">
              -{formatCurrency(monthlyRate)}
            </td>
          </tr>

          {/* Geldwerter Vorteil */}
          <tr>
            <td className="px-4 py-2 pl-8">Geldwerter Vorteil Privatfahrten</td>
            <td className="px-4 py-2 text-right">-</td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(calculations.withLease.monetaryBenefit.private)}
            </td>
          </tr>

          {/* Steuerabzüge */}
          <tr className="bg-gray-50">
            <td className="px-4 py-2 font-medium">Lohnsteuer</td>
            <td className="px-4 py-2 text-right text-red-600">
              -{formatCurrency(calculations.withoutLease.incomeTax)}
            </td>
            <td className="px-4 py-2 text-right text-red-600">
              -{formatCurrency(calculations.withLease.incomeTax)}
            </td>
          </tr>

          {/* Sozialversicherung */}
          <tr>
            <td className="px-4 py-2 font-medium">Sozialversicherung gesamt</td>
            <td className="px-4 py-2 text-right text-red-600">
              -{formatCurrency(
                Object.values(calculations.withoutLease.socialSecurity)
                  .reduce((a, b) => a + b, 0)
              )}
            </td>
            <td className="px-4 py-2 text-right text-red-600">
              -{formatCurrency(
                Object.values(calculations.withLease.socialSecurity)
                  .reduce((a, b) => a + b, 0)
              )}
            </td>
          </tr>

          {/* Netto */}
          <tr className="bg-gray-100 font-semibold">
            <td className="px-4 py-2">Netto zur Auszahlung</td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(calculations.withoutLease.net)}
            </td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(calculations.withLease.net)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}