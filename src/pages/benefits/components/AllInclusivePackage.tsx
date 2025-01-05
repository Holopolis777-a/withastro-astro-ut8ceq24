import React from 'react';
import { Shield, Wrench, Snowflake, FileText, Car, Euro } from 'lucide-react';

export function AllInclusivePackage() {
  const services = [
    {
      icon: Shield,
      title: 'Vollkasko & Haftpflicht',
      description: 'Umfassender Versicherungsschutz ohne Einschränkungen',
      color: 'bg-blue-500',
    },
    {
      icon: Wrench,
      title: 'Wartung & Verschleiß',
      description: 'Regelmäßige Wartung und Verschleißreparaturen inklusive',
      color: 'bg-green-500',
    },
    {
      icon: Snowflake,
      title: 'Winterreifen-Service',
      description: 'Winterreifen inkl. Wechsel und Einlagerung',
      color: 'bg-purple-500',
    },
    {
      icon: Car,
      title: 'Zulassung & Überführung',
      description: 'Komplette Fahrzeugzulassung und Überführung',
      color: 'bg-orange-500',
    },
    {
      icon: Euro,
      title: 'Steuern & Abgaben',
      description: 'KFZ-Steuer und Rundfunkbeitrag inklusive',
      color: 'bg-indigo-500',
    },
    {
      icon: FileText,
      title: 'Digitale Verwaltung',
      description: 'Einfache digitale Verwaltung aller Services',
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          All-Inclusive Paket
        </h2>
        <p className="text-gray-600">
          Ein monatlicher Preis - alle Services inklusive
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start space-x-4">
              <div className={`${service.color} p-3 rounded-xl shadow-sm`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Info */}
      <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Shield className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Rundum sorglos</h4>
              <p className="text-sm text-gray-600">
                Alle Leistungen in einer monatlichen Rate
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Ab</div>
            <div className="text-2xl font-bold text-primary-600">499€</div>
            <div className="text-sm text-gray-500">pro Monat</div>
          </div>
        </div>
      </div>
    </div>
  );
}