import React from 'react';
import { Car, Settings, FileText, PenTool, Calendar } from 'lucide-react';
import { ProcessStep } from '../components/ProcessStep';

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

export function DigitalProcess() {
  return (
    <section className="bg-gray-50 rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-8">Digitaler Bestellprozess</h2>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-8">
          {steps.map((step, index) => (
            <ProcessStep 
              key={index} 
              {...step} 
              number={index + 1}
              isLast={index === steps.length - 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}