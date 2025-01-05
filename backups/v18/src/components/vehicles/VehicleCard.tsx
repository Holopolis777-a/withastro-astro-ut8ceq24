import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Car, Edit2, Power, Fuel, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { usePermissions } from '../../hooks/usePermissions';
import type { Vehicle } from '../../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = usePermissions();
  const monthlyRate = Object.values(vehicle.leasingRates).sort((a, b) => a - b)[0];

  // Determine the base path based on the vehicle ID prefix and current location
  const getBasePath = () => {
    if (vehicle.id.startsWith('pool-') || location.pathname.includes('/vehicles/pool')) {
      return '/vehicles/pool';
    }
    if (location.pathname.includes('/salary-sacrifice')) {
      return '/salary-sacrifice';
    }
    return '/vehicles';
  };

  const handleViewDetails = () => {
    const basePath = getBasePath();
    navigate(`${basePath}/${vehicle.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    const basePath = getBasePath();
    navigate(`${basePath}/edit/${vehicle.id}`);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <div className="relative">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover"
        />
        {isAdmin && (
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="bg-white/90 hover:bg-white"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        {/* Vehicle Main Info */}
        <div className="space-y-1 mb-4">
          <h3 className="text-lg font-semibold">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-gray-600">{vehicle.equipmentVariant}</p>
        </div>
        
        {/* Vehicle Specs */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Fuel className="w-4 h-4 mr-2" />
            <span>{vehicle.fuelType}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Settings className="w-4 h-4 mr-2" />
            <span>{vehicle.transmission}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Power className="w-4 h-4 mr-2" />
            <span>{vehicle.power} PS</span>
          </div>
        </div>
        
        {/* Price Section */}
        <div className="mt-4">
          <p className="text-sm text-gray-500">Ab</p>
          <p className="text-xl font-semibold">€{monthlyRate}/Monat</p>
        </div>
        
        <Button 
          onClick={handleViewDetails}
          className="mt-4 w-full"
        >
          Fahrzeug anzeigen
        </Button>
      </div>
    </div>
  );
}