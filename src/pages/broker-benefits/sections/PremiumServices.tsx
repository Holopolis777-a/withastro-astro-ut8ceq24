import React from 'react';
import { Truck, FileText, Calendar, Clock, Laptop, Headphones } from 'lucide-react';
import { ServiceCard } from '../components/ServiceCard';

const services = [
  {
    icon: Truck,
    title: 'Kostenfreie Auslieferung',
    description: 'Bundesweite Auslieferung ohne Zusatzkosten'
  },
  {
    icon: FileText,
    title: 'Zulassung inklusive',
    description: 'Komplette Fahrzeugzulassung im Service enthalten'
  },
  {
    icon: Calendar,
    title: 'Flexible Termine',
    description: 'Terminvereinbarung nach Ihren Wünschen'
  },
  {
    icon: Clock,
    title: 'Expresslieferung',
    description: 'Schnelle Lieferung für Lagerfahrzeuge'
  },
  {
    icon: Laptop,
    title: 'Digitaler Prozess',
    description: 'Durchgängig digitaler End-to-End-Prozess'
  },
  {
    icon: Headphones,
    title: 'Persönliche Betreuung',
    description: 'Ihr persönlicher Ansprechpartner'
  }
];

export function PremiumServices() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8">Premium-Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
}