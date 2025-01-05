import React from 'react';
import { Users, UserPlus, Car, Banknote } from 'lucide-react';
import { TimelineStep } from './TimelineStep';

const steps = [
  {
    icon: UserPlus,
    title: "SCHRITT 1: Mitglieder einladen",
    description: [
      "Öffnen Sie den \"Mitglieder\"-Bereich in Ihrem Dashboard",
      "Wählen Sie \"+Mitglieder einladen\"",
      "Versenden Sie personalisierte E-Mail-Einladungen oder",
      "Teilen Sie Ihren individuellen Einladungslink direkt mit Ihren Kunden"
    ],
    color: "bg-blue-500"
  },
  {
    icon: Users,
    title: "SCHRITT 2: Kunden registrieren sich",
    description: [
      "Ihre eingeladenen Kunden erhalten die Einladung",
      "Sie registrieren sich über Ihren persönlichen Link",
      "Die Kunden werden automatisch Ihrem Portfolio zugeordnet"
    ],
    color: "bg-purple-500"
  },
  {
    icon: Car,
    title: "SCHRITT 3: Fahrzeugbestellung",
    description: [
      "Ihre Kunden wählen ihr Wunschfahrzeug",
      "Sie durchlaufen den Bestellprozess",
      "Der Leasingvertrag wird abgeschlossen"
    ],
    color: "bg-green-500"
  },
  {
    icon: Banknote,
    title: "SCHRITT 4: Provisionsauszahlung",
    description: [
      "Nach erfolgreicher Fahrzeugübergabe",
      "Sie erhalten automatisch Ihre vereinbarte Provision",
      "Nachvollziehbar in Ihrer Provisionsübersicht"
    ],
    color: "bg-orange-500"
  }
];

export function BrokerInviteProcess() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          So funktioniert der Einladungsprozess für Makler
        </h2>
        <p className="text-gray-600">
          Ein einfacher und transparenter Prozess von der Einladung bis zur Provision
        </p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-12">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              {...step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}