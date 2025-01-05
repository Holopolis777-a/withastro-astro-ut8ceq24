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
      // Add vehicle using the provided store
      await store.addVehicle(data);
      toast.success(`${type === 'pool' ? 'Pool-Fahrzeug' : 'Fahrzeug'} erfolgreich angelegt`);
      onClose();
    } catch (error) {
      toast.error(`Fehler beim Anlegen des ${type === 'pool' ? 'Pool-Fahrzeugs' : 'Fahrzeugs'}`);
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