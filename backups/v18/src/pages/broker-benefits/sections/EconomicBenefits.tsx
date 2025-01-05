import React from 'react';
import { BenefitCard } from '../components/BenefitCard';
import { PiggyBank, Calculator, FileText, Banknote } from 'lucide-react';

const benefits = [
  {
    icon: Calculator,
    title: 'All-Inclusive-Monatsrate',
    description: 'Transparente Kosten ohne versteckte Gebühren'
  },
  {
    icon: Banknote,
    title: 'Keine Anzahlung',
    description: 'Start ohne hohe Anfangsinvestition'
  },
  {
    icon: PiggyBank,
    title: 'Planungssicherheit',
    description: 'Fixe monatliche Raten für bessere Planung'
  },
  {
    icon: FileText,
    title: 'Gebündelte Leistungen',
    description: 'Alle Services in einer Rate (außer optionale Versicherung)'
  }
];

export function EconomicBenefits() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8">Wirtschaftliche Vorteile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} />
        ))}
      </div>
    </section>
  );
}