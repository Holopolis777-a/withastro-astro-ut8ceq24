import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { BrokerRegistrationForm } from './BrokerRegistrationForm';

interface BrokerRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrokerRegistrationDialog({ isOpen, onClose }: BrokerRegistrationDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-xl max-w-2xl w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold">
              Neuen Makler hinzufügen
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <BrokerRegistrationForm onClose={onClose} />
        </div>
      </div>
    </Dialog>
  );
}