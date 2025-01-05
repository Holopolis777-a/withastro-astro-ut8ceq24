import React from 'react';
import { Car, Banknote, Clock, Truck } from 'lucide-react';

interface BenefitProps {
  icon: React.ElementType;
  title: string;
  description: string;
  items: string[];
}

const BenefitCard = ({ icon: Icon, title, description, items }: BenefitProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
    
    <ul className="space-y-3 mt-6">
      {items.map((item, index) => (
        <li key={index} className="flex items-start space-x-3">
          <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-gray-600 text-sm">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export function OtherBenefits() {
  const benefits = [
    {
      icon: Car,
      title: 'Große Fahrzeugauswahl',
      description: 'Vielfältiges Angebot an Neuwagen verschiedener Marken',
      items: [
        'Breite Auswahl an Neuwagen unterschiedlicher Marken',
        'Diverse Modelle und Ausstattungsvarianten verfügbar',
        'Spezialisierung auf Neuwagen zu attraktiven Konditionen',
        'Regelmäßige Erweiterung des Fahrzeugangebots',
        'Individuelle Konfigurationsmöglichkeiten'
      ]
    },
    {
      icon: Banknote,
      title: 'Transparente Kosten',
      description: 'Keine versteckten Gebühren oder Zusatzkosten',
      items: [
        'Keine Anzahlung erforderlich',
        'Fixe monatliche Rate',
        'Alle Leistungen in einer Rate',
        'Keine Überraschungskosten',
        'Planbare monatliche Belastung'
      ]
    },
    {
      icon: Clock,
      title: 'Flexibilität & Service',
      description: 'Maximale Flexibilität und erstklassiger Service',
      items: [
        'Flexible Laufzeiten wählbar',
        'Kilometerpaket anpassbar',
        'Persönlicher Ansprechpartner',
        'Digitaler Bestellprozess',
        '24/7 Pannenhilfe inklusive'
      ]
    },
    {
      icon: Truck,
      title: 'Lieferung',
      description: 'Lieferung bis vor die Haustür',
      items: [
        'Bundesweite Auslieferung',
        'Terminierte Übergabe',
        'Einweisung vor Ort',
        'Fahrzeugübergabe dokumentiert',
        'Professionelle Übergabe'
      ]
    }
  ];

  return (
    <div className="space-y-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Weitere Vorteile</h2>
        <p className="mt-4 text-lg text-gray-600">
          Profitieren Sie von unseren umfangreichen Services
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} />
        ))}
      </div>
    </div>
  );
}