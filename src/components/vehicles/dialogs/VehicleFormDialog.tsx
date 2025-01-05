import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { VehicleForm } from '../forms/VehicleForm';
import { toast } from 'react-hot-toast';
import type { Vehicle } from '../../../types/vehicle';

interface VehicleFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'regular' | 'pool';
  store: {
    addVehicle: (vehicle: Omit<Vehicle, 'id'>) => Promise<void>;
  };
}

export function VehicleFormDialog({ 
  isOpen, 
  onClose, 
  type = 'regular',
  store 
}: VehicleFormDialogProps) {
  const handleSubmit = async (data: any) => {
    try {
      // Validate required fields
      const requiredFields = {
        make: 'Marke',
        model: 'Modell',
        year: 'Baujahr',
        type: 'Fahrzeugtyp',
        fuelType: 'Kraftstoffart',
        transmission: 'Getriebe',
        power: 'Leistung',
        grossListPrice: 'Bruttolistenpreis'
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([key]) => !data[key])
        .map(([, label]) => label);

      if (missingFields.length > 0) {
        throw new Error(`Bitte füllen Sie folgende Pflichtfelder aus: ${missingFields.join(', ')}`);
      }

      // Add vehicle using the provided store
      await store.addVehicle({
        ...data,
        standardEquipment: data.standardEquipment?.trim() || '',
        // Set default values for required fields
        mileage: data.mileage ?? 0,
        images: data.images ?? [],
        features: data.features ?? [],
        customFeatures: data.customFeatures ?? {},
        availableColors: data.availableColors ?? [],
        services: {
          insurance: true,
          maintenance: true,
          delivery: true,
          winterTires: true,
          gap: true,
          roadside: true,
          damageManagement: true,
          ...(data.services ?? {})
        },
        servicePrices: {
          insurance: 89,
          maintenance: 59,
          winterTires: 39,
          gap: 19,
          roadside: 15,
          damageManagement: 29,
          ...(data.servicePrices ?? {})
        },
        leasingRates: data.leasingRates || {
          '36_10000': 0,
          '36_15000': 0,
          '36_20000': 0,
          '48_10000': 0,
          '48_15000': 0,
          ...(data.leasingRates ?? {})
        },
        oneTimeCosts: {
          registration: 0,
          homeDelivery: 0,
          transfer: 0,
          ...(data.oneTimeCosts ?? {})
        }
      });
      toast.success(`${type === 'pool' ? 'Pool-Fahrzeug' : 'Fahrzeug'} erfolgreich angelegt`);
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      toast.error(errorMessage);
      console.error('Error creating vehicle:', error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-xl max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold">
              {type === 'pool' ? 'Neues Pool-Fahrzeug anlegen' : 'Neues Fahrzeug anlegen'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <VehicleForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            type={type}
          />
        </div>
      </div>
    </Dialog>
  );
}