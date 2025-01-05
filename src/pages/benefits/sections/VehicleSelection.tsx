import React from 'react';
import { Car, Filter } from 'lucide-react';
import { BenefitCard } from '../components/BenefitCard';
import { BrandShowcase } from '../components/BrandShowcase';
import { CategoryFilter } from '../components/CategoryFilter';

const vehicleCategories = [
  { id: 'all', label: 'Alle Fahrzeuge' },
  { id: 'limousine', label: 'Limousinen' },
  { id: 'suv', label: 'SUVs' },
  { id: 'kombi', label: 'Kombis' },
];

export function VehicleSelection() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  return (
    <section className="space-y-8">
      <BenefitCard
        icon={Car}
        title="Große Fahrzeugauswahl"
        description="Wählen Sie aus einer breiten Palette von Premium-Fahrzeugen verschiedener Marken und Kategorien."
      >
        <div className="mt-8 space-y-8">
          <CategoryFilter
            categories={vehicleCategories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
          
          <BrandShowcase />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-gray-900">150+</div>
              <div className="text-sm text-gray-600">Verfügbare Fahrzeuge</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Premium Marken</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-gray-900">24h</div>
              <div className="text-sm text-gray-600">Schnelle Verfügbarkeit</div>
            </div>
          </div>
        </div>
      </BenefitCard>
    </section>
  );
}