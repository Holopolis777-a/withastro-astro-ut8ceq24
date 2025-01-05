import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { VehicleGallery } from './VehicleGallery';
import { VehicleSpecs } from './VehicleSpecs';
import { VehicleFeatures } from './VehicleFeatures';
import { LeasingOptions } from './LeasingOptions';
import type { Vehicle } from '../../../types/vehicle';

interface VehicleDetailsModalProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
  onOrder: (config: { months: number; kilometers: number }) => void;
}

export function VehicleDetailsModal({
  vehicle,
  isOpen,
  onClose,
  onOrder,
}: VehicleDetailsModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-xl w-full max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <Dialog.Title className="text-2xl font-semibold">
              {vehicle.make} {vehicle.model}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            <div className="space-y-8">
              <VehicleGallery images={vehicle.images} />
              <VehicleSpecs vehicle={vehicle} />
            </div>

            <div className="space-y-8">
              <VehicleFeatures features={vehicle.features} />
              <LeasingOptions
                rates={vehicle.leasingRates}
                onSubmit={onOrder}
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}