import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function PasswordResetForm() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here would be the actual API call to request password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Reset-Link wurde an Ihre E-Mail-Adresse gesendet');
      navigate('/login');
    } catch (error) {
      toast.error('Fehler beim Versenden des Reset-Links');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Passwort zurücksetzen</h2>
        <p className="mt-2 text-sm text-gray-600">
          Geben Sie Ihre E-Mail-Adresse ein. Sie erhalten einen Link zum Zurücksetzen Ihres Passworts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-Mail-Adresse
          </label>
          <div className="mt-1 relative">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-12 h-14 text-lg"
              placeholder="beispiel@email.de"
            />
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/login')}
            className="text-primary-400 hover:text-primary-500"
          >
            Zurück zum Login
          </Button>
          <Button
            type="submit"
            disabled={loading || !email}
            className="h-12 text-base px-6 bg-primary-400 hover:bg-primary-500"
          >
            {loading ? 'Wird gesendet...' : 'Link anfordern'}
          </Button>
        </div>
      </form>
    </div>
  );
}