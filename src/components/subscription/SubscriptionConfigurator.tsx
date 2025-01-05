import React from 'react';
import { DurationSelector } from './DurationSelector';
import { KilometerSelector } from './KilometerSelector';
import { PriceSummary } from './PriceSummary';
import type { Vehicle } from '../../types/vehicle';

interface SubscriptionConfiguratorProps {
  vehicle: Vehicle;
  onConfigurationChange?: (months: number, kilometers: number, monthlyRate: number) => void;
}

export function SubscriptionConfigurator({ vehicle, onConfigurationChange }: SubscriptionConfiguratorProps) {
  const [selectedMonths, setSelectedMonths] = React.useState<36 | 48>(36);
  const [selectedKilometers, setSelectedKilometers] = React.useState<10000 | 15000 | 20000>(10000);
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);

  // Calculate base monthly rate
  const baseRate = vehicle.leasingRates[`${selectedMonths}_${selectedKilometers}`] || 0;

  // Calculate additional services cost
  const servicesCost = selectedServices.reduce((total, serviceId) => {
    return total + (vehicle.servicePrices[serviceId as keyof typeof vehicle.servicePrices] || 0);
  }, 0);

  // Calculate total monthly rate
  const totalMonthlyRate = baseRate + servicesCost;

  // Notify parent component when configuration changes
  React.useEffect(() => {
    onConfigurationChange?.(selectedMonths, selectedKilometers, totalMonthlyRate);
  }, [selectedMonths, selectedKilometers, totalMonthlyRate, onConfigurationChange]);

  const handleDurationChange = (months: 36 | 48) => {
    setSelectedMonths(months);
  };

  const handleKilometersChange = (kilometers: 10000 | 15000 | 20000) => {
    setSelectedKilometers(kilometers);
  };

  return (
    <div className="space-y-6">
      <DurationSelector
        selectedMonths={selectedMonths}
        onChange={handleDurationChange}
      />

      <KilometerSelector
        selectedKilometers={selectedKilometers}
        onChange={handleKilometersChange}
      />

      <PriceSummary
        monthlyRate={totalMonthlyRate}
        vehicle={vehicle}
        selectedServices={selectedServices}
        selectedMonths={selectedMonths}
        selectedKilometers={selectedKilometers}
      />
    </div>
  );
}