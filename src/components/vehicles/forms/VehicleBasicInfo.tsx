import React from 'react';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import type { VehicleFormData } from '../../../types/vehicle';

interface VehicleBasicInfoProps {
  data: VehicleFormData;
  onChange: (data: Partial<VehicleFormData>) => void;
}

export function VehicleBasicInfo({ data, onChange }: VehicleBasicInfoProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Grundinformationen</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Marke *"
          value={data.make}
          onChange={(e) => onChange({ make: e.target.value })}
          required
        />
        <Input
          label="Modell *"
          value={data.model}
          onChange={(e) => onChange({ model: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Fahrgestellnummer (VIN)"
          value={data.vin}
          onChange={(e) => onChange({ vin: e.target.value })}
          placeholder="Optional"
        />
        <Input
          label="Kennzeichen"
          value={data.licensePlate}
          onChange={(e) => onChange({ licensePlate: e.target.value })}
          placeholder="Optional"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Baujahr *"
          type="number"
          min={1900}
          max={new Date().getFullYear() + 1}
          value={data.year}
          onChange={(e) => onChange({ year: Number(e.target.value) })}
          required
        />
        <Select
          label="Fahrzeugtyp *"
          value={data.type}
          onChange={(e) => onChange({ type: e.target.value })}
          required
        >
          <option value="limousine">Limousine</option>
          <option value="kombi">Kombi</option>
          <option value="suv">SUV</option>
          <option value="coupe">Coupé</option>
          <option value="cabrio">Cabriolet</option>
        </Select>
      </div>
    </div>
  );
}