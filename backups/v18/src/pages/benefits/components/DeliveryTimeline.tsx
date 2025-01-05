import React from 'react';
import { Truck, CheckCircle, Clock } from 'lucide-react';

export function DeliveryTimeline() {
  const steps = [
    {
      icon: CheckCircle,
      title: 'Bestellung bestätigt',
      description: 'Ihre Bestellung wurde erfolgreich aufgenommen'
    },
    {
      icon: Clock,
      title: 'Fahrzeugvorbereitung',
      description: 'Ihr Fahrzeug wird für Sie vorbereitet'
    },
    {
      icon: Truck,
      title: 'Auslieferung',
      description: 'Kostenlose Lieferung an Ihre Wunschadresse'
    }
  ];

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
      
      <div className="space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="relative flex items-center">
              <div className="absolute left-8 top-8 -ml-px h-full w-0.5 bg-gray-200" />
              <div className="relative flex h-16 w-16 flex-none items-center justify-center bg-white">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div className="ml-6">
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}