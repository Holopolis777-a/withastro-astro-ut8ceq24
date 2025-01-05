import React from 'react';
import { Mail, Link, Car, Wallet, CheckCircle, Building2, Users } from 'lucide-react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { toast } from 'react-hot-toast';
import { portalBenefits } from './portalBenefits';

interface EmployeeInviteFormProps {
  onInvite: (employerId: string, email: string, portalType: 'employee' | 'salary') => Promise<void>;
  onGenerateLink: (employerId: string, portalType: 'employee' | 'salary') => Promise<string>;
  onClose: () => void;
  employerId?: string;
}

export function EmployeeInviteForm({ onInvite, onGenerateLink, onClose, employerId }: EmployeeInviteFormProps) {
  const [activePortal, setActivePortal] = React.useState<'employee' | 'salary'>('employee');
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [generatedLink, setGeneratedLink] = React.useState('');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employerId || !inviteEmail) return;
    
    try {
      await onInvite(employerId, inviteEmail, activePortal);
      setInviteEmail('');
      toast.success('Einladung erfolgreich versendet');
    } catch (error) {
      toast.error('Fehler beim Versenden der Einladung');
    }
  };

  const handleGenerateLink = async () => {
    if (!employerId) return;
    
    try {
      const link = await onGenerateLink(employerId, activePortal);
      setGeneratedLink(link);
      toast.success('Link wurde generiert');
    } catch (error) {
      toast.error('Fehler beim Generieren des Links');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success('Link wurde kopiert');
  };

  return (
    <div className="w-full">
      {/* Portal Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mb-8 lg:mb-12">
        {/* Employee Portal Card */}
        <button
          onClick={() => setActivePortal('employee')}
          className={`p-6 lg:p-8 rounded-xl lg:rounded-2xl border-2 transition-all text-left ${
            activePortal === 'employee'
              ? 'border-primary-400 bg-primary-50/50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start space-x-4 lg:flex-col lg:items-center lg:space-x-0 lg:text-center">
            <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl flex items-center justify-center lg:mb-6 ${
              activePortal === 'employee' ? 'bg-primary-400' : 'bg-gray-100'
            }`}>
              <Car className={`w-8 h-8 lg:w-10 lg:h-10 ${
                activePortal === 'employee' ? 'text-white' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1 lg:flex-none">
              <h3 className="text-xl lg:text-2xl font-semibold mb-2 lg:mb-3">Mitarbeiter Portal</h3>
              <p className="text-gray-600">
                Laden Sie Mitarbeiter ein, die Zugriff auf das Mitarbeiter-Portal mit Benefit-Fahrzeugen erhalten sollen.
              </p>
            </div>
          </div>
        </button>

        {/* Salary Portal Card */}
        <button
          onClick={() => setActivePortal('salary')}
          className={`p-6 lg:p-8 rounded-xl lg:rounded-2xl border-2 transition-all text-left ${
            activePortal === 'salary'
              ? 'border-primary-400 bg-primary-50/50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start space-x-4 lg:flex-col lg:items-center lg:space-x-0 lg:text-center">
            <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl flex items-center justify-center lg:mb-6 ${
              activePortal === 'salary' ? 'bg-primary-400' : 'bg-gray-100'
            }`}>
              <Wallet className={`w-8 h-8 lg:w-10 lg:h-10 ${
                activePortal === 'salary' ? 'text-white' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1 lg:flex-none">
              <h3 className="text-xl lg:text-2xl font-semibold mb-2 lg:mb-3">Gehaltsumwandlung Portal</h3>
              <p className="text-gray-600">
                Ermöglichen Sie Ihren Mitarbeitern Dienstwagen-Leasing durch Gehaltsumwandlung.
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 p-6 lg:p-8 rounded-xl lg:rounded-2xl mb-8 lg:mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Employer Benefits */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg lg:text-xl font-semibold text-gray-900">Vorteile für Sie als Arbeitgeber</h4>
            </div>
            <ul className="space-y-4">
              {portalBenefits[activePortal].employer.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Employee Benefits */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg lg:text-xl font-semibold text-gray-900">Vorteile für Ihre Mitarbeiter</h4>
            </div>
            <ul className="space-y-4">
              {portalBenefits[activePortal].employee.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Invite Form */}
      <div className="bg-white p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-gray-200 shadow-sm">
        <form onSubmit={handleInvite} className="space-y-6 max-w-2xl mx-auto">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              E-Mail-Adresse des Mitarbeiters
            </label>
            <Input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="mitarbeiter@firma.de"
              required
              className="h-14 text-lg"
            />
          </div>

          <Button type="submit" className="w-full h-14 text-lg">
            <Mail className="w-6 h-6 mr-3" />
            Per E-Mail einladen
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-base">
              <span className="px-4 bg-white text-gray-500">oder</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleGenerateLink}
            className="w-full h-14 text-lg"
          >
            <Link className="w-6 h-6 mr-3" />
            Einladungslink generieren
          </Button>

          {generatedLink && (
            <div className="space-y-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 break-all font-mono text-sm">
                {generatedLink}
              </div>
              <Button
                variant="secondary"
                onClick={handleCopyLink}
                className="w-full h-14 text-lg"
              >
                Link kopieren
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}