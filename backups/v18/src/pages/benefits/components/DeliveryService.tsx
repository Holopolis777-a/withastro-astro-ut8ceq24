import React from 'react';
import { Truck, MapPin, Calendar, Clock, FileCheck } from 'lucide-react';

export function DeliveryService() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Kostenlose Haustürlieferung & Zulassung
          </h3>
          <p className="text-gray-600">
            Ihr Fahrzeug wird kostenlos zugelassen und zu Ihrer Wunschadresse geliefert
          </p>
        </div>
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <Truck className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileCheck className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-medium">Zulassung</h4>
          </div>
          <p className="text-sm text-gray-600">
            Kostenlose Zulassung und Anmeldung Ihres Fahrzeugs
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-medium">Wunschadresse</h4>
          </div>
          <p className="text-sm text-gray-600">
            Lieferung an Ihre gewünschte Adresse in ganz Deutschland
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-medium">Wunschtermin</h4>
          </div>
          <p className="text-sm text-gray-600">
            Flexible Terminvereinbarung nach Ihren Vorstellungen
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-medium">Schnelle Lieferung</h4>
          </div>
          <p className="text-sm text-gray-600">
            Schnelle Haustürlieferung nach Produktion. Lagerfahrzeuge werden sofort geliefert
          </p>
        </div>
      </div>
    </div>
  );
}