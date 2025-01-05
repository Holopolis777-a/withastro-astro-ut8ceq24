import React from 'react';
import { EconomicBenefits } from './sections/EconomicBenefits';
import { InsurancePackage } from './sections/InsurancePackage';
import { PremiumServices } from './sections/PremiumServices';
import { DigitalProcess } from './sections/DigitalProcess';

export default function BrokerBenefits() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Exklusive Maklervorteile auf einen Blick
        </h1>
        <p className="text-lg text-gray-600">
          Profitieren Sie von unseren umfangreichen Services und Leistungen
        </p>
      </div>

      <div className="space-y-16">
        <EconomicBenefits />
        <InsurancePackage />
        <PremiumServices />
        <DigitalProcess />
      </div>
    </div>
  );
}