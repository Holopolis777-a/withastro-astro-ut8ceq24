import React from 'react';
import { Shield, Check } from 'lucide-react';
import { BenefitCard } from '../components/BenefitCard';
import { CoverageTable } from '../components/CoverageTable';

export function InsuranceBenefits() {
  return (
    <section>
      <BenefitCard
        icon={Shield}
        title="Umfassender Versicherungsschutz"
        description="Genießen Sie maximale Sicherheit mit unserem All-Inclusive-Versicherungspaket."
      >
        <div className="mt-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {[
                'Vollkasko & Haftpflicht inklusive',
                'Kein beschränkter Fahrerkreis',
                'Keine Einstufung im Schadensfall',
                'Geringe Selbstbeteiligung',
                'Umfassende Akku-Versicherung bei E-Fahrzeugen'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <CoverageTable />
          </div>
        </div>
      </BenefitCard>
    </section>
  );
}