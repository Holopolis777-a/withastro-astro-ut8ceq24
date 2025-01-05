import React from 'react';
import { Dialog } from '@headlessui/react';
import { CompanyInviteForm } from './CompanyInviteForm';

interface CompanyInviteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CompanyInviteDialog({ isOpen, onClose }: CompanyInviteDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-xl max-w-2xl w-full p-6">
          <Dialog.Title className="text-xl font-semibold mb-6">
            Neues Unternehmen einladen
          </Dialog.Title>

          <CompanyInviteForm onClose={onClose} />
        </div>
      </div>
    </Dialog>
  );
}