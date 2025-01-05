import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/formatters';

interface SalaryStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    grossSalary: number;
    taxClass: string;
    distanceToWork: number;
    monthlyRate: number;
    churchTax: boolean;
    calculations: {
      withoutLease: {
        gross: number;
        incomeTax: number;
        churchTax: number;
        socialSecurity: {
          pension: number;
          health: number;
          care: number;
          unemployment: number;
        };
        net: number;
      };
      withLease: {
        gross: number;
        leaseAmount: number;
        monetaryBenefit: {
          private: number;
          commute: number;
        };
        chargingBenefit: number;
        incomeTax: number;
        churchTax: number;
        socialSecurity: {
          pension: number;
          health: number;
          care: number;
          unemployment: number;
        };
        net: number;
      };
      savings: {
        employee: number;
        employer: number;
      };
    };
  };
}

export function SalaryStatementModal({ isOpen, onClose, data }: SalaryStatementModalProps) {
  const handleDownload = () => {
    // In einer echten Implementierung würde hier ein PDF generiert
    console.log('Downloading salary statement...');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-xl max-w-4xl w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold">
              Gehaltsabrechnung Entgeltumwandlung
            </Dialog.Title>
            <div className="flex items-center space-x-2">
              <Button onClick={handleDownload} variant="outline">
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

          <div className="space-y-6">
            {/* Kopfzeile mit Basisdaten */}
            <div className="bg-green-100 p-4 rounded-lg grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm font-medium">Steuerklasse</div>
                <div className="text-lg">{data.taxClass}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Kirchensteuer</div>
                <div className="text-lg">{data.churchTax ? "Ja" : "Nein"}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Arbeitsweg in KM</div>
                <div className="text-lg">{data.distanceToWork}</div>
              </div>
            </div>

            {/* Haupttabelle */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Position</th>
                    <th className="px-4 py-2 text-right">Ohne Vilonda</th>
                    <th className="px-4 py-2 text-right">Mit Vilonda</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Grundbrutto */}
                  <tr>
                    <td className="px-4 py-2 font-medium">Grundbrutto</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(data.calculations.withoutLease.gross)}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(data.calculations.withLease.gross)}</td>
                  </tr>
                  
                  {/* Entgeltumwandlung */}
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-medium">Entgeltumwandlung Dienstwagen</td>
                    <td className="px-4 py-2 text-right">-</td>
                    <td className="px-4 py-2 text-right text-red-600">
                      -{formatCurrency(data.monthlyRate)}
                    </td>
                  </tr>

                  {/* Geldwerter Vorteil */}
                  <tr>
                    <td className="px-4 py-2 pl-8">Geldwerter Vorteil Privatfahrten</td>
                    <td className="px-4 py-2 text-right">-</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(data.calculations.withLease.monetaryBenefit.private)}</td>
                  </tr>

                  {/* Steuerabzüge */}
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-medium">Lohnsteuer</td>
                    <td className="px-4 py-2 text-right text-red-600">
                      -{formatCurrency(data.calculations.withoutLease.incomeTax)}
                    </td>
                    <td className="px-4 py-2 text-right text-red-600">
                      -{formatCurrency(data.calculations.withLease.incomeTax)}
                    </td>
                  </tr>

                  {/* Sozialversicherung */}
                  <tr>
                    <td className="px-4 py-2 font-medium">Sozialversicherung gesamt</td>
                    <td className="px-4 py-2 text-right text-red-600">
                      -{formatCurrency(
                        Object.values(data.calculations.withoutLease.socialSecurity).reduce((a, b) => a + b, 0)
                      )}
                    </td>
                    <td className="px-4 py-2 text-right text-red-600">
                      -{formatCurrency(
                        Object.values(data.calculations.withLease.socialSecurity).reduce((a, b) => a + b, 0)
                      )}
                    </td>
                  </tr>

                  {/* Netto */}
                  <tr className="bg-gray-100 font-semibold">
                    <td className="px-4 py-2">Netto zur Auszahlung</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(data.calculations.withoutLease.net)}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(data.calculations.withLease.net)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Ersparnis */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-lg font-semibold text-green-800">
                  Arbeitnehmervorteil monatlich
                </div>
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(data.calculations.savings.employee)}
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-lg font-semibold text-yellow-800">
                  Arbeitgebervorteil monatlich
                </div>
                <div className="text-3xl font-bold text-yellow-600">
                  {formatCurrency(data.calculations.savings.employer)}
                </div>
              </div>
            </div>

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