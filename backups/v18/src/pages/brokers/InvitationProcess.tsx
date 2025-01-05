import React from 'react';
import { Users, FileText, Banknote, ArrowRight } from 'lucide-react';

export default function InvitationProcess() {
  const steps = [
    {
      icon: Users,
      title: "1. Mitglieder einladen",
      description: "Einfacher Einladungsprozess für neue Mitglieder",
      details: [
        'Öffnen Sie den Bereich "Mitglieder" in Ihrem Dashboard',
        'Klicken Sie auf "+Mitglieder einladen"',
        'Versenden Sie personalisierte E-Mail-Einladungen oder',
        'Teilen Sie Ihren individuellen Einladungslink direkt mit Ihren Kunden'
      ],
      color: "bg-blue-500"
    },
    {
      icon: FileText,
      title: "2. Kunden registrieren sich",
      description: "Automatische Zuordnung zu Ihrem Portfolio",
      details: [
        'Ihre eingeladenen Kunden erhalten die Einladung',
        'Sie registrieren sich über Ihren persönlichen Link',
        'Die Kunden werden automatisch Ihrem Portfolio zugeordnet'
      ],
      color: "bg-green-500"
    },
    {
      icon: Banknote,
      title: "3. Provision bei Vertragsabschluss",
      description: "Transparente Provisionsabrechnung",
      details: [
        'Ihre Kunden wählen und bestellen ihr Wunschfahrzeug',
        'Nach erfolgreicher Fahrzeugübergabe',
        'Automatische Auszahlung Ihrer vereinbarten Provision',
        'Nachvollziehbar in Ihrer Provisionsübersicht'
      ],
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          So funktioniert der Einladungsprozess für Makler
        </h1>
        <p className="text-lg text-gray-600">
          Ein einfacher und transparenter Prozess von der Einladung bis zur Provision
        </p>
      </div>

      <div className="space-y-12">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {index < steps.length - 1 && (
              <div className="absolute left-16 top-24 bottom-0 w-0.5 bg-gray-200" />
            )}
            
            <div className="relative flex items-start">
              <div className={`${step.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}>
                <step.icon className="w-6 h-6 text-white" />
              </div>

              <div className="ml-8 flex-1">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                    {index < steps.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-gray-400 ml-4" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        </div>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Ihr Vorteil als Makler
          </h2>
          <p className="text-gray-600">
            Profitieren Sie von einem transparenten und effizienten Prozess. 
            Von der ersten Einladung bis zur Provisionsauszahlung begleiten wir Sie 
            und Ihre Kunden mit einem durchdachten digitalen System.
          </p>
        </div>
      </div>
    </div>
  );
}