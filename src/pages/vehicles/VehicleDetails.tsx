import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleStore } from '../../store/vehicleStore';
import { VehicleGallery } from '../../components/vehicles/details/VehicleGallery';
import { VehicleSpecs } from '../../components/vehicles/details/VehicleSpecs';
import { VehicleFeatures } from '../../components/vehicles/details/VehicleFeatures';
import { SubscriptionConfigurator } from '../../components/subscription/SubscriptionConfigurator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles } = useVehicleStore();
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Fahrzeug nicht gefunden.</p>
      </div>
    );
  }

  const handleSubscriptionChange = (config: {
    months: number;
    kilometers: number;
    totalPrice: number;
  }) => {
    console.log('Subscription configuration:', config);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/vehicles')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Zurück zur Übersicht
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <VehicleGallery images={vehicle.images} />
          <VehicleSpecs vehicle={vehicle} />
          <VehicleFeatures features={vehicle.features} />
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-lg text-gray-600 mt-2">{vehicle.type}</p>
          </div>

          <SubscriptionConfigurator
            rates={vehicle.leasingRates}
            onConfigurationChange={handleSubscriptionChange}
          />

          <Button className="w-full py-4 text-lg bg-green-400 hover:bg-green-500">
            Abo konfigurieren
          </Button>
        </div>
      </div>
    </div>
  );
}