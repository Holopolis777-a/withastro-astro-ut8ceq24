import React from 'react';
import { Dialog } from '@headlessui/react';
import { SalaryStatementHeader } from './SalaryStatementHeader';
import { SalaryStatementBasicInfo } from './SalaryStatementBasicInfo';
import { SalaryStatementTable } from './SalaryStatementTable';
import { SalaryStatementSavings } from './SalaryStatementSavings';
import { generateSalaryStatementPDF } from '../../../utils/pdfGenerator';
import type { SalaryStatementData } from '../../../types/salary';

interface SalaryStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SalaryStatementData;
}

export function SalaryStatementModal({ isOpen, onClose, data }: SalaryStatementModalProps) {
  const handleDownload = () => {
    const doc = generateSalaryStatementPDF(data);
    doc.save('gehaltsabrechnung-entgeltumwandlung.pdf');
  };

  // Berechne effektive monatliche Kosten
  const effectiveCosts = data.calculations.withoutLease.net - data.calculations.withLease.net;

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-xl max-w-4xl w-full p-6">
          <SalaryStatementHeader 
            onClose={onClose}
            onDownload={handleDownload}
          />

          <div className="space-y-6">
            <SalaryStatementBasicInfo
              taxClass={data.taxClass}
              churchTax={data.churchTax}
              distanceToWork={data.distanceToWork}
            />

            <SalaryStatementTable
              calculations={data.calculations}
              monthlyRate={data.monthlyRate}
            />

            <SalaryStatementSavings
              effectiveCosts={effectiveCosts}
            />

            <p className="text-sm text-gray-500 mt-4">
              *Rate per Vilonda Gehaltsumwandlung. Die tatsächliche Einsparung ist abhängig von steuerlichen 
              Verhältnissen und kann abweichen. Für eine Überprüfung wenden Sie sich bitte an Ihren Steuerberater.
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}