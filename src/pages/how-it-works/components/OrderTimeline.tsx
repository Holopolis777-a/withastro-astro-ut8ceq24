import React from 'react';
import { Car, Settings, FileText, Mail, Smartphone, Key, LogIn } from 'lucide-react';

const steps = [
  {
    icon: Car,
    title: 'Fahrzeugauswahl',
    description: 'Wählen Sie aus unserem Premium-Portfolio Ihr Wunschfahrzeug aus.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&h=400',
  },
  {
    icon: Settings,
    title: 'Konfiguration',
    description: 'Konfigurieren Sie Ihre individuelle Laufzeit und Ihr gewünschtes Kilometerpaket.',
    image: 'https://images.unsplash.com/photo-1586772002130-b0f3daa6288b?auto=format&fit=crop&w=800&h=400',
  },
  {
    icon: FileText,
    title: 'Unverbindliche Anfrage',
    description: 'Stellen Sie eine unverbindliche Anfrage für Ihr Wunschfahrzeug.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&h=400',
  },
  {
    icon: Mail,
    title: 'Verifizierung',
    description: 'Sie erhalten eine E-Mail zur Verifizierung Ihrer E-Mail-Adresse und Handynummer.',
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=800&h=400',
  },
  {
    icon: FileText,
    title: 'Angebot',
    description: 'Nach erfolgreicher Verifizierung erhalten Sie Ihr persönliches Angebot per E-Mail.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&h=400',
  },
  {
    icon: Smartphone,
    title: 'App Download',
    description: 'Laden Sie unsere App herunter, um den Prozess abzuschließen.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&h=400',
  },
  {
    icon: Key,
    title: 'Passwort setzen',
    description: 'Klicken Sie auf "Erster Login?" und setzen Sie Ihr persönliches Passwort.',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&h=400',
  },
  {
    icon: LogIn,
    title: 'App Login',
    description: 'Melden Sie sich mit Ihrer E-Mail-Adresse und Ihrem neuen Passwort in der App an.',
    image: 'https://images.unsplash.com/photo-1536859355448-76f92ebdc33d?auto=format&fit=crop&w=800&h=400',
  },
];

export function OrderTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 lg:left-1/2" />

      <div className="space-y-16">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className={`lg:flex items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Content */}
              <div className="lg:w-1/2 lg:px-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary-400 rounded-xl flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>

              {/* Image */}
              <div className="mt-6 lg:mt-0 lg:w-1/2 lg:px-8">
                <div className="aspect-[2/1] rounded-xl overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Timeline Dot */}
            <div className="absolute left-8 top-8 lg:left-1/2 lg:-ml-1">
              <div className="w-2 h-2 rounded-full bg-primary-400 ring-4 ring-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}