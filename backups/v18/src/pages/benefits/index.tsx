import React from 'react';
import { Shield, Banknote, Clock, Truck, FileText, Car } from 'lucide-react';

export default function Benefits() {
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
      icon: Shield,
      title: 'All-Inclusive Paket',
      description: 'Vollkasko, Wartung, Winterreifen und mehr in einer Rate',
      items: [
        'Vollkasko- & Haftpflichtversicherung inklusive',
        'Wartung & Verschleiß inklusive',
        'Winterreifen mit Wechsel & Einlagerung',
        'Zulassung & Überführung inklusive',
        'KFZ-Steuer & Rundfunkbeitrag inklusive'
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
      title: 'Kostenlose Lieferung',
      description: 'Bequeme Lieferung bis vor die Haustür',
      items: [
        'Bundesweite kostenlose Auslieferung',
        'Terminierte Übergabe',
        'Einweisung vor Ort',
        'Fahrzeugübergabe dokumentiert',
        'Professionelle Übergabe'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Ihre Vorteile als Mitglied
        </h1>
        <p className="text-lg text-gray-600">
          Profitieren Sie von unseren umfangreichen Services und Leistungen
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            </div>
            
            <ul className="space-y-3 mt-6">
              {benefit.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-3">
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
        ))}
      </div>
    </div>
  );
}