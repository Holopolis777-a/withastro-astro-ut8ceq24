import React from 'react';
import { ProcessStep } from './ProcessStep';
import {
  CheckCircleIcon,
  FileTextIcon,
  MailIcon,
  SmartphoneIcon,
  KeyIcon,
  LogInIcon,
  ArrowRightIcon
} from 'lucide-react';

const memberSteps = [
  {
    icon: CheckCircleIcon,
    title: "1. Anfrage bestätigt",
    description: "Nach Ihrer Leasing-Anfrage erhalten Sie eine Bestätigung. Dies ist noch kein verbindlicher Vertrag.",
    color: "bg-blue-500"
  },
  {
    icon: FileTextIcon,
    title: "2. Individuelles Angebot",
    description: "Unsere Mitarbeiter erstellen für Sie ein maßgeschneidertes Leasingangebot.",
    color: "bg-green-500"
  },
  {
    icon: MailIcon,
    title: "3. Angebot per E-Mail",
    description: "Sie erhalten einen Link per E-Mail, über den Sie das Angebot einsehen können.",
    color: "bg-purple-500"
  },
  {
    icon: SmartphoneIcon,
    title: "4. App-Download",
    description: "Laden Sie unsere App herunter und verifizieren Sie Ihre E-Mail-Adresse und Handynummer.",
    color: "bg-orange-500"
  },
  {
    icon: KeyIcon,
    title: "5. Passwort setzen",
    description: "Setzen Sie Ihr persönliches Passwort für die App.",
    color: "bg-indigo-500"
  },
  {
    icon: LogInIcon,
    title: "6. App-Login",
    description: "Melden Sie sich mit Ihrer E-Mail-Adresse und Ihrem neuen Passwort in der App an.",
    color: "bg-pink-500"
  },
  {
    icon: ArrowRightIcon,
    title: "7. Prozess abschließen",
    description: "Folgen Sie den weiteren Anweisungen in der App, um den Leasingprozess abzuschließen.",
    color: "bg-teal-500"
  }
];

export function MemberFlow() {
  return (
    <div className="space-y-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {memberSteps.map((step, index) => (
          <ProcessStep
            key={index}
            {...step}
            isLast={index === memberSteps.length - 1}
          />
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-8 mt-12">
        <h2 className="text-xl font-semibold mb-4">Ihre Vorteile</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <SmartphoneIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium mb-2">Einfacher Prozess</h3>
            <p className="text-gray-600 text-sm">
              Benutzerfreundliche App-Führung durch den gesamten Leasingprozess
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium mb-2">Schnelle Abwicklung</h3>
            <p className="text-gray-600 text-sm">
              Digitaler Prozess ermöglicht schnelle und unkomplizierte Vertragsabschlüsse
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FileTextIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium mb-2">Transparente Konditionen</h3>
            <p className="text-gray-600 text-sm">
              Alle Leistungen und Kosten auf einen Blick transparent dargestellt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}