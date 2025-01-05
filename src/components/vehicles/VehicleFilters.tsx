import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

export function VehicleFilters() {
  return (
    <div className="bg-white p-6 rounded-lg space-y-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <Input
        label="Make"
        placeholder="z.B. BMW, Audi..."
      />
      
      <Input
        label="Model"
        placeholder="z.B. 3 Series, A4..."
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Min Year"
          type="number"
          placeholder="2020"
        />
        <Input
          label="Max Year"
          type="number"
          placeholder="2024"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Min Price"
          type="number"
          placeholder="0"
        />
        <Input
          label="Max Price"
          type="number"
          placeholder="1000"
        />
      </div>
      
      <Select
        label="Status"
        defaultValue="all"
      >
        <option value="all">All</option>
        <option value="available">Available</option>
        <option value="leased">Leased</option>
        <option value="maintenance">Maintenance</option>
      </Select>
    </div>
  );
}