import React from 'react';
import { PrivacyConsentDialog } from './PrivacyConsentDialog';
import { useAuthStore } from '../../store/authStore';
import { useOrderStore } from '../../store/orderStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Euro, FileText, Truck, Car } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Vehicle } from '../../types/vehicle';

interface PriceSummaryProps {
  monthlyRate: number;
  vehicle: Vehicle;
  selectedServices: string[];
  selectedMonths: number;
  selectedKilometers: number;
}

export function PriceSummary({ 
  monthlyRate, 
  vehicle,
  selectedServices,
  selectedMonths,
  selectedKilometers
}: PriceSummaryProps) {
  const [isPrivacyDialogOpen, setPrivacyDialogOpen] = React.useState(false);
  const { user } = useAuthStore();
  const { createOrder } = useOrderStore();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um eine Bestellung aufzugeben');
      return;
    }

    try {
      await createOrder(
        vehicle.id,
        user.id,
        {
          color: vehicle.color,
          materials: [],
          monthlyRate,
          duration: selectedMonths,
          kilometers: selectedKilometers,
          services: selectedServices
        },
        vehicle
      );

      toast.success('Ihr Fahrzeug wurde unverbindlich angefragt');
      setPrivacyDialogOpen(false);
      navigate('/my-orders');
    } catch (error) {
      toast.error('Es ist ein Fehler aufgetreten');
    }
  };

  const totalOneTimeCosts = vehicle.oneTimeCosts.registration + 
                          vehicle.oneTimeCosts.homeDelivery + 
                          vehicle.oneTimeCosts.transfer;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Price Header */}
      <div className="bg-gradient-to-r from-primary-400 to-primary-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Monatliche Rate</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">{monthlyRate.toFixed(2)}€</span>
              <span className="text-sm opacity-90">inkl. MwSt</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <Euro className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="p-6 bg-gray-50 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Laufzeit:</span>
            <p className="font-medium">{selectedMonths} Monate</p>
          </div>
          <div>
            <span className="text-gray-600">Kilometer/Jahr:</span>
            <p className="font-medium">{selectedKilometers.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6">
        <Button 
          onClick={() => setPrivacyDialogOpen(true)}
          className="w-full py-4 text-lg bg-primary-400 hover:bg-primary-500 transition-colors"
        >
          Jetzt unverbindlich anfragen
        </Button>

        {/* One-time Costs Section */}
        {totalOneTimeCosts > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Einmalige Kosten:</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <FileText className="w-4 h-4 mr-2" />
                  <span>Zulassungskosten</span>
                </div>
                <span className="font-medium">{vehicle.oneTimeCosts.registration.toFixed(2)}€*</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Haustürlieferung</span>
                </div>
                <span className="font-medium">{vehicle.oneTimeCosts.homeDelivery.toFixed(2)}€*</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Car className="w-4 h-4 mr-2" />
                  <span>Überführungskosten</span>
                </div>
                <span className="font-medium">{vehicle.oneTimeCosts.transfer.toFixed(2)}€*</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Gesamte Einmalkosten:</span>
                  <span className="font-semibold text-lg">{totalOneTimeCosts.toFixed(2)}€*</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">*inkl. MwSt</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <PrivacyConsentDialog
        isOpen={isPrivacyDialogOpen}
        onClose={() => setPrivacyDialogOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}