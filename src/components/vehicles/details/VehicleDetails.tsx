import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useVehicleStore } from '../../../store/vehicleStore';
import { usePoolVehicleStore } from '../../../store/poolVehicleStore';
import { useSalarySacrificeStore } from '../../../store/salarySacrificeStore';
import { VehicleHeader } from './VehicleHeader';
import { VehicleGallery } from './VehicleGallery';
import { VehicleSpecs } from './VehicleSpecs';
import { VehicleFeatures } from './VehicleFeatures';
import { VehicleColors } from './VehicleColors';
import { InclusiveServices } from './InclusiveServices';
import { SubscriptionConfigurator } from '../../../components/subscription/SubscriptionConfigurator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { toast } from 'react-hot-toast';
import type { VehicleColor } from '../../../types/vehicle';

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Select the appropriate store based on the URL path
  const store = React.useMemo(() => {
    if (location.pathname.startsWith('/vehicles/pool')) {
      return usePoolVehicleStore();
    }
    if (location.pathname.startsWith('/salary-sacrifice')) {
      return useSalarySacrificeStore();
    }
    return useVehicleStore();
  }, [location.pathname]);

  const [selectedColor, setSelectedColor] = React.useState<string | undefined>();
  
  // Fetch vehicles when component mounts
  React.useEffect(() => {
    store.fetchVehicles();
  }, [store]);

  const vehicle = store.vehicles.find((v) => v.id === id);

  // Update selected color when vehicle is loaded
  React.useEffect(() => {
    if (vehicle) {
      setSelectedColor(vehicle.color);
    }
  }, [vehicle]);

  const getBackPath = () => {
    if (location.pathname.startsWith('/vehicles/pool')) {
      return '/vehicles/pool';
    }
    if (location.pathname.startsWith('/salary-sacrifice')) {
      return '/salary-sacrifice';
    }
    return '/vehicles';
  };

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Fahrzeug nicht gefunden.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate(getBackPath())}
        >
          Zurück zur Übersicht
        </Button>
      </div>
    );
  }

  const handleColorSelect = async (color: VehicleColor) => {
    try {
      await store.updateVehicle(vehicle.id, { color: color.name });
      setSelectedColor(color.name);
      toast.success(`Farbe ${color.name} ausgewählt`);
    } catch (error) {
      toast.error('Fehler beim Aktualisieren der Farbe');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(getBackPath())}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Zurück zur Übersicht
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
            standardEquipment={vehicle.standardEquipment || ''}
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