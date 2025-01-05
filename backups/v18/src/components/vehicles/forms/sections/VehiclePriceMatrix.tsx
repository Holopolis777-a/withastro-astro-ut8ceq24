import React from 'react';
import { Input } from '../../../ui/Input';
import type { Vehicle } from '../../../../types/vehicle';

interface VehiclePriceMatrixProps {
  data: Partial<Vehicle>;
  onChange: (data: Partial<Vehicle>) => void;
}

export function VehiclePriceMatrix({ data, onChange }: VehiclePriceMatrixProps) {
  const handlePriceChange = (months: number, kilometers: number, price: string) => {
    const key = `${months}_${kilometers}` as keyof typeof data.leasingRates;
    onChange({
      leasingRates: {
        ...data.leasingRates,
        [key]: Number(price)
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Preismatrix</h3>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="font-medium">Laufzeit</div>
          <div className="font-medium text-center">10.000 km/Jahr</div>
          <div className="font-medium text-center">15.000 km/Jahr</div>
          <div className="font-medium text-center">20.000 km/Jahr</div>
        </div>
        
        {/* 36 Monate */}
        <div className="grid grid-cols-4 gap-4 mb-4 items-center">
          <div className="font-medium">36 Monate</div>
          <Input
            type="number"
            min={0}
            value={data.leasingRates?.['36_10000']}
            onChange={(e) => handlePriceChange(36, 10000, e.target.value)}
            placeholder="€"
          />
          <Input
            type="number"
            min={0}
            value={data.leasingRates?.['36_15000']}
            onChange={(e) => handlePriceChange(36, 15000, e.target.value)}
            placeholder="€"
          />
          <Input
            type="number"
            min={0}
            value={data.leasingRates?.['36_20000']}
            onChange={(e) => handlePriceChange(36, 20000, e.target.value)}
            placeholder="€"
          />
        </div>

        {/* 48 Monate */}
        <div className="grid grid-cols-4 gap-4 items-center">
          <div className="font-medium">48 Monate</div>
          <Input
            type="number"
            min={0}
            value={data.leasingRates?.['48_10000']}
            onChange={(e) => handlePriceChange(48, 10000, e.target.value)}
            placeholder="€"
          />
          <Input
            type="number"
            min={0}
            value={data.leasingRates?.['48_15000']}
            onChange={(e) => handlePriceChange(48, 15000, e.target.value)}
            placeholder="€"
          />
          <Input
            type="number"
            min={0}
            value={data.leasingRates?.['48_20000']}
            onChange={(e) => handlePriceChange(48, 20000, e.target.value)}
            placeholder="€"
          />
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Alle Preise verstehen sich als monatliche Rate inkl. MwSt.
      </p>
    </div>
  );
}