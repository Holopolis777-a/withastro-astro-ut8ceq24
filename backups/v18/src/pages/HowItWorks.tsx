import React from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  CheckCircle2, 
  FileText, 
  Smartphone, 
  Mail, 
  Key, 
  LogIn, 
  ArrowRight 
} from 'lucide-react';

export default function HowItWorks() {
  const { user } = useAuthStore();
  const isBroker = user?.role === 'broker';

  const timelineSteps = isBroker ? [
    {
      icon: CheckCircle2,
      title: "Anfrage erhalten",
      description: "Sie erhalten eine neue Leasing-Anfrage von einem interessierten Kunden."
    },
    {
      icon: FileText,
      title: "Angebot erstellen",
      description: "Erstellen Sie ein individuelles Angebot basierend auf den Kundenanforderungen."
    },
    {
      icon: Mail,
      title: "Angebot versenden",
      description: "Senden Sie das Angebot per E-Mail an den Kunden. Der Kunde erhält einen Link zur Einsicht."
    },
    {
      icon: Smartphone,
      title: "Kunde nutzt App",
      description: "Der Kunde lädt die App herunter und verifiziert seine Daten."
    },
    {
      icon: CheckCircle2,
      title: "Vertrag abschließen",
      description: "Nach Annahme des Angebots wird der Vertrag digital abgeschlossen."
    }
  ] : [
    {
      icon: CheckCircle2,
      title: "Vielen Dank für Ihre Anfrage",
      description: "Nach Ihrer Leasing-Anfrage erhalten Sie eine Bestätigung. Dies ist noch kein verbindlicher Vertrag."
    },
    {
      icon: FileText,
      title: "Erstellung Ihres individuellen Angebots",
      description: "Unsere Mitarbeiter erstellen für Sie ein maßgeschneidertes Leasingangebot."
    },
    {
      icon: Mail,
      title: "Angebot per E-Mail",
      description: "Sie erhalten einen Link per E-Mail, über den Sie das Angebot einsehen können."
    },
    {
      icon: Smartphone,
      title: "App-Download & Anmeldung",
      description: "Laden Sie unsere App herunter und verifizieren Sie Ihre E-Mail-Adresse und Handynummer."
    },
    {
      icon: Key,
      title: "Passwort setzen",
      description: "Setzen Sie Ihr persönliches Passwort für die App."
    },
    {
      icon: LogIn,
      title: "App-Login",
      description: "Melden Sie sich mit Ihrer E-Mail-Adresse und Ihrem neuen Passwort in der App an."
    },
    {
      icon: ArrowRight,
      title: "Anweisungen folgen",
      description: "Folgen Sie den weiteren Anweisungen in der App, um den Leasingprozess abzuschließen."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {isBroker ? "So funktioniert der Leasingprozess" : "So funktioniert es nach Ihrer Leasing-Anfrage"}
      </h1>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-12">
          {timelineSteps.map((step, index) => (
            <div key={index} className="relative flex items-start">
              <div className="absolute left-8 top-8 -ml-px h-full w-0.5 bg-gray-200" />
              <div className="relative flex h-16 w-16 flex-none items-center justify-center bg-white">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center ring-8 ring-white">
                  <step.icon className="h-6 w-6 text-gray-600" />
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
          ))}
        </div>
      </div>
    </div>
  );
}