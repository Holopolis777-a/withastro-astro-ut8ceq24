import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePoolVehicleStore } from '../../../store/poolVehicleStore';
import { VehicleHeader } from '../../../components/vehicles/details/VehicleHeader';
import { VehicleGallery } from '../../../components/vehicles/details/VehicleGallery';
import { VehicleSpecs } from '../../../components/vehicles/details/VehicleSpecs';
import { VehicleFeatures } from '../../../components/vehicles/details/VehicleFeatures';
import { VehicleColors } from '../../../components/vehicles/details/VehicleColors';
import { InclusiveServices } from '../../../components/vehicles/details/InclusiveServices';
import { SubscriptionConfigurator } from '../../../components/subscription/SubscriptionConfigurator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { toast } from 'react-hot-toast';
import type { VehicleColor } from '../../../types/vehicle';

export default function PoolVehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles, updateVehicle } = usePoolVehicleStore();
  const vehicle = vehicles.find((v) => v.id === id);
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>(vehicle?.color);

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Pool-Fahrzeug nicht gefunden.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/vehicles/pool')}
        >
          Zurück zur Pool-Fahrzeug Übersicht
        </Button>
      </div>
    );
  }

  const handleColorSelect = async (color: VehicleColor) => {
    try {
      await updateVehicle(vehicle.id, { color: color.name });
      setSelectedColor(color.name);
      toast.success(`Farbe ${color.name} ausgewählt`);
    } catch (error) {
      toast.error('Fehler beim Aktualisieren der Farbe');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/vehicles/pool')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Zurück zur Pool-Fahrzeug Übersicht
      </button>

      <VehicleHeader vehicle={vehicle} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <VehicleGallery images={vehicle.images} />
          <VehicleSpecs vehicle={vehicle} />
          <VehicleColors 
            colors={vehicle.availableColors} 
            selectedColor={selectedColor}
            onColorSelect={handleColorSelect}
          />
          <VehicleFeatures 
            features={vehicle.features} 
            customFeatures={vehicle.customFeatures} 
          />
          <InclusiveServices 
            services={vehicle.services}
            prices={vehicle.servicePrices}
          />
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-lg text-gray-600 mt-2">{vehicle.type}</p>
          </div>

          <SubscriptionConfigurator vehicle={vehicle} />
        </div>
      </div>
    </div>
  );
}