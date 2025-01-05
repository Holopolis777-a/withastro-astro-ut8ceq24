import React from 'react';
import { Input } from '../../../ui/Input';
import { FileText, Truck, Car } from 'lucide-react';
import type { OneTimeCosts } from '../../../../types/vehicle';

interface OneTimeCostsSectionProps {
  costs: OneTimeCosts;
  onChange: (costs: OneTimeCosts) => void;
}

export function OneTimeCostsSection({ costs, onChange }: OneTimeCostsSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Einmalkosten</h3>
      
      <div className="grid gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Zulassungskosten
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={costs.registration || ''}
                onChange={(e) => onChange({ ...costs, registration: Number(e.target.value) })}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 ml-12">
            Kosten für die Fahrzeugzulassung und Kennzeichen
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Haustürlieferung
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={costs.homeDelivery || ''}
                onChange={(e) => onChange({ ...costs, homeDelivery: Number(e.target.value) })}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 ml-12">
            Kosten für die Lieferung zum Kunden
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Car className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Überführungskosten
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={costs.transfer || ''}
                onChange={(e) => onChange({ ...costs, transfer: Number(e.target.value) })}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 ml-12">
            Kosten für die Überführung vom Händler
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Gesamtkosten:</span>
          <span className="text-lg font-semibold">
            {(costs.registration + costs.homeDelivery + costs.transfer).toFixed(2)}€
          </span>
        </div>
      </div>
    </div>
  );
}