import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Slider } from '../ui/Slider';
import { Euro, Building2, MapPin, BatteryCharging, Calculator, FileText } from 'lucide-react';
import { calculateSalarySacrifice } from '../../utils/salary';
import { SalaryCalculationResult } from './SalaryCalculationResult';
import { Button } from '../ui/Button';
import { SalaryStatementModal } from './salary-statement/SalaryStatementModal';

interface SalaryDetailsProps {
  grossSalary: number;
  onGrossSalaryChange: (value: number) => void;
  taxClass: string;
  onTaxClassChange: (value: string) => void;
  distanceToWork: number;
  onDistanceChange: (value: number) => void;
  canChargeAtWork: boolean;
  onCanChargeAtWorkChange: (value: boolean) => void;
  monthlyRate: number;
  listPrice: number;
}

export function SalaryDetails({
  grossSalary,
  onGrossSalaryChange,
  taxClass,
  onTaxClassChange,
  distanceToWork,
  onDistanceChange,
  canChargeAtWork,
  onCanChargeAtWorkChange,
  monthlyRate,
  listPrice,
}: SalaryDetailsProps) {
  const [showStatement, setShowStatement] = useState(false);

  const calculation = calculateSalarySacrifice({
    grossSalary,
    taxClass,
    distanceToWork,
    canChargeAtWork,
    monthlyRate,
    listPrice,
    hasChurchTax: false,
  });

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold flex items-center mb-6">
          <Calculator className="w-5 h-5 mr-2 text-primary-500" />
          Gehaltsumwandlungsrechner
        </h3>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Euro className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Monatlicher Bruttolohn</span>
            </div>
            <Input
              type="number"
              min="0"
              step="100"
              value={grossSalary}
              onChange={(e) => onGrossSalaryChange(Number(e.target.value))}
              className="h-14 text-lg"
            />
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Steuerklasse</span>
            </div>
            <Select
              value={taxClass}
              onChange={(e) => onTaxClassChange(e.target.value)}
              className="h-14 text-lg"
            >
              {[1, 2, 3, 4, 5, 6].map((cls) => (
                <option key={cls} value={cls}>
                  Steuerklasse {cls}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="font-medium">Entfernung zur Arbeit</span>
              </div>
              <span className="font-medium">{distanceToWork} km</span>
            </div>
            <Slider
              min={0}
              max={100}
              step={1}
              value={distanceToWork}
              onChange={onDistanceChange}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <BatteryCharging className="w-5 h-5 text-yellow-600" />
              <span className="font-medium">Lademöglichkeit beim Arbeitgeber</span>
            </div>
            <input
              type="checkbox"
              checked={canChargeAtWork}
              onChange={(e) => onCanChargeAtWorkChange(e.target.checked)}
              className="h-5 w-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            />
          </div>
        </div>

        <SalaryCalculationResult calculation={calculation} />

        <Button 
          onClick={() => setShowStatement(true)} 
          className="w-full mt-4"
          variant="outline"
        >
          <FileText className="w-4 h-4 mr-2" />
          Detaillierte Gehaltsabrechnung anzeigen
        </Button>

        <SalaryStatementModal
          isOpen={showStatement}
          onClose={() => setShowStatement(false)}
          data={{
            grossSalary,
            taxClass,
            distanceToWork,
            monthlyRate,
            churchTax: false,
            calculations: {
              withoutLease: {
                gross: grossSalary,
                incomeTax: calculation.taxSavings,
                churchTax: 0,
                socialSecurity: {
                  pension: calculation.socialSecuritySavings * 0.4,
                  health: calculation.socialSecuritySavings * 0.3,
                  care: calculation.socialSecuritySavings * 0.2,
                  unemployment: calculation.socialSecuritySavings * 0.1,
                },
                net: calculation.netSalaryWithoutLease,
              },
              withLease: {
                gross: grossSalary - monthlyRate,
                leaseAmount: monthlyRate,
                monetaryBenefit: {
                  private: listPrice * 0.0025,
                  commute: listPrice * 0.0003 * distanceToWork,
                },
                chargingBenefit: canChargeAtWork ? 30 : 70,
                incomeTax: calculation.taxSavings - (calculation.monthlyBenefit * 0.42),
                churchTax: 0,
                socialSecurity: {
                  pension: (calculation.socialSecuritySavings - calculation.monthlyBenefit * 0.093) * 0.4,
                  health: (calculation.socialSecuritySavings - calculation.monthlyBenefit * 0.073) * 0.3,
                  care: (calculation.socialSecuritySavings - calculation.monthlyBenefit * 0.0175) * 0.2,
                  unemployment: (calculation.socialSecuritySavings - calculation.monthlyBenefit * 0.012) * 0.1,
                },
                net: calculation.netSalaryWithLease,
              },
              savings: {
                employee: calculation.monthlyBenefit,
                employer: calculation.monthlyBenefit * 0.2,
              },
            },
          }}
        />
      </div>
    </div>
  );
}