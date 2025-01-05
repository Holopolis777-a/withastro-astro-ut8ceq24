import React from 'react';
import { Banknote, PiggyBank, Calculator } from 'lucide-react';
import { BenefitCard } from '../components/BenefitCard';
import { AllInclusiveBadge } from '../components/AllInclusiveBadge';
import { PriceComparison } from '../components/PriceComparison';
import { PricingFeatures } from '../components/PricingFeatures';

export function PricingAdvantages() {
  return (
    <section>
      <BenefitCard
        icon={PiggyBank}
        title="Transparente Preisvorteile"
        description="Profitieren Sie von unseren All-Inclusive-Raten, bei denen alle Leistungen inklusive sind - nur die Versicherung ist optional wählbar."
      >
        <div className="mt-8 space-y-8">
          <AllInclusiveBadge />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <PricingFeatures />
          </div>

          <PriceComparison />
        </div>
      </BenefitCard>
    </section>
  );
}