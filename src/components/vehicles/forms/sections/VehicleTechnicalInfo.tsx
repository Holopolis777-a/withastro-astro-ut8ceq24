import React from 'react';
import { Input } from '../../../ui/Input';
import { Select } from '../../../ui/Select';
import { ElectricRangeInput } from '../../electric/ElectricRangeInput';
import type { Vehicle } from '../../../../types/vehicle';

interface VehicleTechnicalInfoProps {
  data: Partial<Vehicle>;
  onChange: (data: Partial<Vehicle>) => void;
}

export function VehicleTechnicalInfo({ data, onChange }: VehicleTechnicalInfoProps) {
  const isElectric = data.fuelType === 'elektro';

  const handleFuelTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFuelType = e.target.value;
    onChange({ 
      fuelType: newFuelType,
      // Only clear electric range when switching from electric to non-electric
      ...(newFuelType !== 'elektro' && { electricRange: undefined })
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Technische Daten</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Kraftstoffart *"
          value={data.fuelType}
          onChange={handleFuelTypeChange}
          required
        >
          <option value="benzin">Benzin</option>
          <option value="diesel">Diesel</option>
          <option value="elektro">Elektro</option>
          <option value="hybrid">Hybrid</option>
        </Select>
        <Select
          label="Getriebe *"
          value={data.transmission}
          onChange={(e) => onChange({ transmission: e.target.value })}
          required
        >
          <option value="automatik">Automatik</option>
          <option value="manuell">Manuell</option>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Leistung (PS) *"
          type="number"
          min={1}
          value={data.power}
          onChange={(e) => onChange({ power: Number(e.target.value) })}
          required
        />
        {isElectric ? (
          <ElectricRangeInput
            value={data.electricRange || 0}
            onChange={(value) => onChange({ electricRange: value })}
            required
          />
        ) : (
          <Input
            label="Hubraum (ccm)"
            type="number"
            min={0}
            value={data.engineSize}
            onChange={(e) => onChange({ engineSize: Number(e.target.value) })}
          />
        )}
      </div>
    </div>
  );
}