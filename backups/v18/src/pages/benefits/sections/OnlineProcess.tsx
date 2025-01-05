import React from 'react';
import { Laptop, FileText, PenTool, Car } from 'lucide-react';
import { BenefitCard } from '../components/BenefitCard';
import { ProcessSteps } from '../components/ProcessSteps';

export function OnlineProcess() {
  const steps = [
    {
      title: 'Fahrzeug auswählen',
      description: 'Wählen Sie aus unserer großen Auswahl an Premium-Fahrzeugen.',
      icon: Car,
      status: 'complete'
    },
    {
      title: 'Konfiguration',
      description: 'Passen Sie Laufzeit und Kilometerpaket an Ihre Bedürfnisse an.',
      icon: FileText,
      status: 'current'
    },
    {
      title: 'Online Antrag',
      description: 'Füllen Sie den Antrag bequem online aus.',
      icon: Laptop,
      status: 'upcoming'
    },
    {
      title: 'Digitale Unterschrift',
      description: 'Unterschreiben Sie Ihren Vertrag digital.',
      icon: PenTool,
      status: 'upcoming'
    },
    {
      title: 'Fahrzeugübergabe',
      description: 'Erhalten Sie Ihr Wunschfahrzeug.',
      icon: Car,
      status: 'upcoming'
    }
  ];

  return (
    <section>
      <BenefitCard
        icon={Laptop}
        title="Digitaler Prozess"
        description="Einfach und schnell zum Wunschfahrzeug - komplett digital."
      >
        <div className="mt-8">
          <ProcessSteps steps={steps} />
        </div>
      </BenefitCard>
    </section>
  );
}