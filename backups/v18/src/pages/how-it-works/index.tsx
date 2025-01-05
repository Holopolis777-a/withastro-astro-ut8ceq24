import React from 'react';
import { Car, Settings, FileText, PenTool, Calendar } from 'lucide-react';

const steps = [
  {
    icon: Car,
    title: 'Fahrzeugauswahl',
    description: 'Wählen Sie aus unserem Premium-Portfolio'
  },
  {
    icon: Settings,
    title: 'Konfiguration',
    description: 'Individuelle Laufzeit- und Kilometerauswahl'
  },
  {
    icon: FileText,
    title: 'Antragstellung',
    description: 'Einfache Online-Antragstellung'
  },
  {
    icon: PenTool,
    title: 'Vertragsabschluss',
    description: 'Digitale Vertragsunterzeichnung'
  },
  {
    icon: Calendar,
    title: 'Fahrzeugübergabe',
    description: 'Terminierte Übergabe an Wunschadresse'
  }
];

export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        So funktioniert der Bestellprozess
      </h1>
      
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex items-start">
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-8 -ml-px h-full w-0.5 bg-gray-200" />
                )}
                <div className="relative flex h-16 w-16 flex-none items-center justify-center bg-white">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center ring-8 ring-white">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-6 flex-auto">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}