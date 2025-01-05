import React from 'react';
import { Shield, Wrench, Snowflake, FileText, Settings } from 'lucide-react';

interface ServiceProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-primary-100 rounded-xl">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export function AllInclusiveServices() {
  const services = [
    {
      icon: Shield,
      title: 'Kfz-Versicherung',
      description: 'Selbstbeteiligung: VK 1000 / TK 1000',
    },
    {
      icon: Settings,
      title: 'Schadenmanagement',
      description: 'Entspannte Abwicklung von Haftpflicht- und Kaskoschäden',
    },
    {
      icon: Wrench,
      title: 'Reifen-Protect',
      description: 'Kostenübernahme bei Reifenreparatur oder Ersatz inkl. Montage',
    },
    {
      icon: Snowflake,
      title: 'Winterkompletträder',
      description: 'Bereit für jede Jahreszeit – inkl. Einlagerung und Wechsel',
    },
    {
      icon: Wrench,
      title: 'Reifenservice',
      description: 'Sommer- und Winterreifen inkl. Montage und Zubehör',
    },
    {
      icon: Wrench,
      title: 'Wartung & Verschleiß',
      description: 'Alle Inspektionen und Reparaturen gemäß Herstellervorgaben inklusive',
    },
    {
      icon: FileText,
      title: 'Gap Service',
      description: 'Absicherung der Differenz zwischen Wiederbeschaffungswert und Ablösesumme',
    },
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">All-Inclusive Paket</h2>
        <p className="mt-4 text-lg text-gray-600">
          Alle wichtigen Services in einer monatlichen Rate
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}