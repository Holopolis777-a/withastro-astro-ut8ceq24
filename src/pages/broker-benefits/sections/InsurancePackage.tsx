import React from 'react';
import { Shield, Users, Star, Battery, FileCheck } from 'lucide-react';
import { InsuranceFeature } from '../components/InsuranceFeature';

const features = [
  {
    icon: Shield,
    title: 'All-Risk-Versicherungspaket',
    description: 'Vollkasko-, Teilkasko- und Haftpflichtversicherung inklusive'
  },
  {
    icon: Users,
    title: 'Unbeschränkter Fahrerkreis',
    description: 'Keine Einschränkungen beim Fahrerkreis'
  },
  {
    icon: Star,
    title: 'Keine SF-Einstufung',
    description: 'Keine Schadenfreiheitsklassen-Einstufung notwendig'
  },
  {
    icon: Battery,
    title: 'E-Fahrzeug-Akkuversicherung',
    description: 'Spezielle Versicherung für Elektrofahrzeuge'
  },
  {
    icon: FileCheck,
    title: 'GAP-Deckung',
    description: 'Umfassende GAP-Deckung inklusive'
  }
];

export function InsurancePackage() {
  return (
    <section className="bg-gray-50 rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-8">Versicherungspaket</h2>
      <div className="grid gap-6">
        {features.map((feature, index) => (
          <InsuranceFeature key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}