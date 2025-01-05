import React from 'react';
import { Shield, Wrench, Disc, Key, Plus, Star } from 'lucide-react';

export function AllInclusivePackage() {
  const services = [
    {
      icon: Shield,
      title: 'Versicherungsschutz',
      description: 'Vollkasko- & Haftpflichtversicherung',
      color: 'bg-blue-500',
    },
    {
      icon: Wrench,
      title: 'Service & Wartung',
      description: 'Wartung & Verschleißreparaturen',
      color: 'bg-green-500',
    },
    {
      icon: Disc,
      title: 'Reifenservice',
      description: 'Winterreifen, Wechsel & Einlagerung',
      color: 'bg-purple-500',
    },
    {
      icon: Key,
      title: 'Fahrzeugmanagement',
      description: 'Zulassung & Überführung',
      color: 'bg-orange-500',
    },
    {
      icon: Plus,
      title: 'Zusatzleistungen',
      description: 'KFZ-Steuer & Rundfunkbeitrag',
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Star className="w-8 h-8" />
              <h2 className="text-2xl font-bold">All-Inclusive Mobilitätspaket</h2>
            </div>
            <p className="text-blue-100">
              Alles in einer monatlichen Rate - keine versteckten Kosten
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 ${service.color} rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Alle Leistungen sind in Ihrer monatlichen Rate enthalten. 
          Genießen Sie maximale Planungssicherheit ohne versteckte Zusatzkosten.
        </p>
      </div>
    </div>
  );
}