import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Car, Building2, Users, User, Building, Briefcase, Wallet } from 'lucide-react';
import { ForgotPasswordButton } from '../components/auth/ForgotPasswordButton';
import type { UserRole } from '../types/auth';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    try {
      await login(email, password, selectedRole);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const roleCards = [
    {
      role: 'admin' as const,
      title: 'Administrator',
      description: 'Verwalten Sie Makler, Fahrzeuge und Plattform-Einstellungen',
      icon: Building2,
      color: 'bg-primary-400',
    },
    {
      role: 'broker' as const,
      title: 'Makler',
      description: 'Verwalten Sie Mitglieder und Fahrzeugbestellungen',
      icon: Users,
      color: 'bg-primary-400',
    },
    {
      role: 'employer' as const,
      title: 'Arbeitgeber',
      description: 'Verwalten Sie Ihre Mitarbeiter und Fahrzeugflotte',
      icon: Building,
      color: 'bg-primary-400',
    },
    {
      role: 'employee' as const,
      title: 'Mitarbeiter',
      description: 'Durchsuchen und bestellen Sie Fahrzeuge',
      icon: Briefcase,
      color: 'bg-primary-400',
    },
    {
      role: 'salary-employee' as const,
      title: 'Gehaltsumwandlung',
      description: 'Fahrzeuge über Gehaltsumwandlung bestellen',
      icon: Wallet,
      color: 'bg-primary-400',
    },
    {
      role: 'user' as const,
      title: 'Mitglied',
      description: 'Durchsuchen und leasen Sie Fahrzeuge',
      icon: User,
      color: 'bg-primary-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Car className="w-16 h-16 text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Willkommen im Vilonda Portal
          </h1>
          <p className="text-gray-600">
            Wählen Sie Ihre Rolle aus, um auf die Plattform zuzugreifen
          </p>
        </div>

        {!selectedRole ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roleCards.map(({ role, title, description, icon: Icon, color }) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left border-2 border-transparent hover:border-primary-400 focus:outline-none focus:border-primary-400"
              >
                <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                ← Zurück
              </button>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Anmelden als {roleCards.find(r => r.role === selectedRole)?.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-Mail-Adresse
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full h-12 px-4 text-base rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Passwort
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full h-12 px-4 text-base rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 flex justify-center items-center px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-400 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400"
              >
                Anmelden
              </button>

              <ForgotPasswordButton />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}