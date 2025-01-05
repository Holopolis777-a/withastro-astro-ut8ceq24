import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Download } from 'lucide-react';
import { Button } from '../../ui/Button';

interface SalaryStatementHeaderProps {
  onClose: () => void;
  onDownload: () => void;
}

export function SalaryStatementHeader({ onClose, onDownload }: SalaryStatementHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <Dialog.Title className="text-xl font-semibold">
        Gehaltsabrechnung Entgeltumwandlung
      </Dialog.Title>
      <div className="flex items-center space-x-2">
        <Button onClick={onDownload} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          PDF herunterladen
        </Button>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-500 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}