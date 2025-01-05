import React from 'react';
import { Building, Wallet, Users, Car, Gift, CheckCircle, Euro, Laptop } from 'lucide-react';

export default function Information() {
  const portals = [
    {
      title: 'Gehaltsumwandlungs-Portal',
      description: 'Ermöglichen Sie Ihren Mitarbeitern Fahrzeugleasing durch Gehaltsumwandlung',
      icon: Wallet,
      color: 'bg-green-500',
      benefits: [
        'Steuerliche Vorteile durch Brutto-Gehaltsumwandlung',
        'Full-Service von Bestellung bis Wartung',
        'Reduzierter administrativer Aufwand',
        'Förderung von Nachhaltigkeit',
        'Steigerung der Arbeitgeberattraktivität'
      ]
    },
    {
      title: 'Mitarbeiter-Benefit-Portal',
      description: 'Exklusive Sonderkonditionen für Ihre Mitarbeiter',
      icon: Gift,
      color: 'bg-purple-500',
      benefits: [
        'Sondernachlässe auf diverse Fahrzeugmodelle',
        'Verbrenner, Hybrid- und Elektrofahrzeuge',
        'Direkte Vertragsabwicklung',
        'Kein administrativer Aufwand',
        'Attraktives Mitarbeiter-Benefit'
      ]
    },
    {
      title: 'Pool-Fahrzeuge',
      description: 'Attraktive Angebote für Ihre Firmenflotte',
      icon: Car,
      color: 'bg-blue-500',
      benefits: [
        'Exklusive Sonderraten mit Full-Service',
        'Große Auswahl verschiedener Hersteller',
        'Beste Preise ohne Verhandlungen',
        'Lieferung direkt ins Autohaus',
        'Vollständig digitaler Prozess'
      ]
    }
  ];

  const advantages = [
    {
      title: 'Attraktive Konditionen',
      description: 'Beste Preise für Mitarbeiter und Firmenflotte durch gebündelte Nachfrage',
      icon: Euro,
      color: 'bg-emerald-500'
    },
    {
      title: 'Große Auswahl',
      description: 'Vielfältige Fahrzeugauswahl verschiedener Hersteller und Antriebsarten',
      icon: Car,
      color: 'bg-indigo-500'
    },
    {
      title: 'Digitaler Prozess',
      description: 'Vollständig digitalisierte und effiziente Abwicklung aller Prozesse',
      icon: Laptop,
      color: 'bg-cyan-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Willkommen im Vilonda-Dashboard
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Ihr zentraler Hub für die Verwaltung und Nutzung unserer Mobilitätslösungen. 
          Hier haben Sie direkten Zugriff auf zwei maßgeschneiderte Portale für Ihre Mitarbeiter 
          sowie auf attraktive Angebote für Ihre Firmenflotte.
        </p>
      </div>

      {/* Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portals.map((portal, index) => {
          const Icon = portal.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className={`${portal.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{portal.title}</h3>
                <p className="text-gray-600 mb-6">{portal.description}</p>
                <ul className="space-y-3">
                  {portal.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advantages Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Ihre Vorteile auf einen Blick
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div key={index} className="text-center">
                <div className={`${advantage.color} w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-primary-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Nutzen Sie das Vilonda-Dashboard
        </h2>
        <p className="text-gray-600">
          Bringen Sie Ihre Mobilitätsstrategie auf das nächste Level – 
          effizient, modern und unkompliziert!
        </p>
      </div>
    </div>
  );
}