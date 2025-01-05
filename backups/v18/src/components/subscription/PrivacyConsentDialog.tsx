import React from 'react';
import { Dialog } from '@headlessui/react';
import { Shield, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';

interface PrivacyConsentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function PrivacyConsentDialog({
  isOpen,
  onClose,
  onConfirm,
}: PrivacyConsentDialogProps) {
  const [consent, setConsent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (consent) {
      onConfirm();
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

        <div className="relative bg-white rounded-xl max-w-2xl w-full p-6">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Datenschutzhinweis
            </Dialog.Title>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="prose prose-sm text-gray-600">
              <p>
                Im Rahmen der Bearbeitung Ihrer Anfrage werden Ihre E-Mail-Adresse
                und Ihre Mobiltelefonnummer an die Santander Consumer Bank AG
                übermittelt. Die Übertragung erfolgt ausschließlich zum Zweck der
                Bearbeitung Ihres Anliegens sowie zur Kontaktaufnahme im
                Zusammenhang mit Ihrer Anfrage.
              </p>
              <p>
                Die Verarbeitung Ihrer Daten erfolgt gemäß den geltenden
                Datenschutzbestimmungen, insbesondere der DSGVO. Weitere
                Informationen zur Datenverarbeitung und Ihren Rechten entnehmen Sie
                bitte der{' '}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800"
                  onClick={(e) => e.preventDefault()}
                >
                  Datenschutzerklärung der Santander Consumer Bank AG
                </a>{' '}
                sowie unserer eigenen{' '}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800"
                  onClick={(e) => e.preventDefault()}
                >
                  Datenschutzerklärung
                </a>
                .
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy-consent"
                checked={consent}
                onChange={(checked) => setConsent(checked)}
              />
              <label
                htmlFor="privacy-consent"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Ich stimme der Übermittlung und Verarbeitung meiner Daten gemäß
                der oben genannten Datenschutzbestimmungen zu.
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Abbrechen
              </Button>
              <Button type="submit" disabled={!consent}>
                Jetzt absenden
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}