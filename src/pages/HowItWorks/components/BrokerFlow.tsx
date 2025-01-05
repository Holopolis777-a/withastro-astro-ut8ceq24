import React from 'react';
import { ProcessStep } from './ProcessStep';
import { 
  InboxIcon, 
  FileTextIcon, 
  MailIcon, 
  SmartphoneIcon, 
  CheckCircleIcon 
} from 'lucide-react';

const brokerSteps = [
  {
    icon: InboxIcon,
    title: "1. Anfrage erhalten",
    description: "Sie erhalten eine neue Leasing-Anfrage von einem interessierten Kunden.",
    color: "bg-blue-500",
  },
  {
    icon: FileTextIcon,
    title: "2. Angebot erstellen",
    description: "Erstellen Sie ein individuelles Angebot basierend auf den Kundenanforderungen.",
    color: "bg-green-500",
  },
  {
    icon: MailIcon,
    title: "3. Angebot versenden",
    description: "Senden Sie das Angebot per E-Mail an den Kunden. Der Kunde erhält einen Link zur Einsicht.",
    color: "bg-purple-500",
  },
  {
    icon: SmartphoneIcon,
    title: "4. Kunde nutzt App",
    description: "Der Kunde lädt die App herunter und verifiziert seine Daten.",
    color: "bg-orange-500",
  },
  {
    icon: CheckCircleIcon,
    title: "5. Vertrag abschließen",
    description: "Nach Annahme des Angebots wird der Vertrag digital abgeschlossen.",
    color: "bg-indigo-500",
  }
];

export function BrokerFlow() {
  return (
    <div className="space-y-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {brokerSteps.map((step, index) => (
          <ProcessStep
            key={index}
            {...step}
            isLast={index === brokerSteps.length - 1}
          />
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-8 mt-12">
        <h2 className="text-xl font-semibold mb-4">Ihre Vorteile als Makler</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileTextIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium mb-2">Digitaler Prozess</h3>
            <p className="text-gray-600 text-sm">
              Vollständig digitalisierter Prozess von der Anfrage bis zum Vertragsabschluss
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <SmartphoneIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium mb-2">Einfache Verwaltung</h3>
            <p className="text-gray-600 text-sm">
              Verwalten Sie alle Ihre Kunden und Verträge übersichtlich in einem System
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircleIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium mb-2">Schnelle Abwicklung</h3>
            <p className="text-gray-600 text-sm">
              Beschleunigte Prozesse durch automatisierte Abläufe und digitale Unterschriften
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}