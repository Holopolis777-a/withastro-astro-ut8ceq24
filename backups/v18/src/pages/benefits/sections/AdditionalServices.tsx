import React from 'react';
import { Truck, Clock } from 'lucide-react';
import { BenefitCard } from '../components/BenefitCard';
import { DeliveryService } from '../components/DeliveryService';
import { DeliveryTimeline } from '../components/DeliveryTimeline';

export function AdditionalServices() {
  return (
    <section className="space-y-8">
      <BenefitCard
        icon={Truck}
        title="Zusätzliche Services"
        description="Profitieren Sie von unseren umfangreichen Zusatzleistungen."
      >
        <div className="mt-8 space-y-12">
          <DeliveryService />
          <DeliveryTimeline />
        </div>
      </BenefitCard>
    </section>
  );
}