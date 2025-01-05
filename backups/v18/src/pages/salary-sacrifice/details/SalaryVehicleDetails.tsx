import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSalarySacrificeStore } from '../../../store/salarySacrificeStore';
import { VehicleHeader } from '../../../components/vehicles/details/VehicleHeader';
import { VehicleGallery } from '../../../components/vehicles/details/VehicleGallery';
import { VehicleSpecs } from '../../../components/vehicles/details/VehicleSpecs';
import { VehicleColors } from '../../../components/vehicles/details/VehicleColors';
import { VehicleFeatures } from '../../../components/vehicles/details/VehicleFeatures';
import { InclusiveServices } from '../../../components/vehicles/details/InclusiveServices';
import { SalaryDetails } from '../../../components/salary-sacrifice/SalaryDetails';
import { LeaseConfiguration } from '../../../components/salary-sacrifice/LeaseConfiguration';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { toast } from 'react-hot-toast';
import type { VehicleColor } from '../../../types/vehicle';

export default function SalaryVehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles, updateVehicle } = useSalarySacrificeStore();
  const vehicle = vehicles.find((v) => v.id === id);

  // State für Konfiguration
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>(vehicle?.color);
  const [grossSalary, setGrossSalary] = React.useState(4500);
  const [taxClass, setTaxClass] = React.useState('1');
  const [distanceToWork, setDistanceToWork] = React.useState(20);
  const [canChargeAtWork, setCanChargeAtWork] = React.useState(false);
  const [currentMonthlyRate, setCurrentMonthlyRate] = React.useState(() => {
    if (!vehicle) return 0;
    return Math.min(...Object.values(vehicle.leasingRates));
  });

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Fahrzeug nicht gefunden.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/salary-sacrifice')}
        >
          Zurück zur Übersicht
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

  const handleConfigurationChange = (months: number, kilometers: number, monthlyRate: number) => {
    setCurrentMonthlyRate(monthlyRate);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/salary-sacrifice')}
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

          <LeaseConfiguration
            vehicle={vehicle}
            onConfigurationChange={handleConfigurationChange}
          />

          <SalaryDetails
            grossSalary={grossSalary}
            onGrossSalaryChange={setGrossSalary}
            taxClass={taxClass}
            onTaxClassChange={setTaxClass}
            distanceToWork={distanceToWork}
            onDistanceChange={setDistanceToWork}
            canChargeAtWork={canChargeAtWork}
            onCanChargeAtWorkChange={setCanChargeAtWork}
            monthlyRate={currentMonthlyRate}
            listPrice={vehicle.grossListPrice}
          />
        </div>
      </div>
    </div>
  );
}