import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Car, Clock, FileText, Shield, Euro } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { useSalarySacrificeStore } from '../../store/salarySacrificeStore';

export default function SalaryEmployeeDashboard() {
  const { user } = useAuthStore();
  const { vehicles } = useSalarySacrificeStore();

  // Mock data for demonstration
  const stats = {
    availableVehicles: vehicles.length,
    pendingRequests: 1,
    nextPayment: new Date('2024-04-01'),
    monthlySavings: 250,
    taxBenefits: 180,
    socialSecuritySavings: 70,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Willkommen im Gehaltsumwandlungsportal, {user?.name}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#419f49] bg-opacity-10 rounded-lg">
              <Euro className="w-5 h-5 text-[#419f49]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Monatliche Ersparnis</p>
              <p className="text-2xl font-semibold">{stats.monthlySavings}€</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Steuerersparnis</p>
              <p className="text-2xl font-semibold">{stats.taxBenefits}€</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Euro className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">SV-Ersparnis</p>
              <p className="text-2xl font-semibold">{stats.socialSecuritySavings}€</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Nächste Abrechnung</p>
              <p className="text-2xl font-semibold">{formatDate(stats.nextPayment)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Offene Anfragen</p>
              <p className="text-2xl font-semibold">{stats.pendingRequests}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Car className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Verfügbare Fahrzeuge</p>
              <p className="text-2xl font-semibold">{stats.availableVehicles}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-[#419f49] bg-opacity-10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[#419f49] mb-2">
          Ihre Vorteile durch Gehaltsumwandlung
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start space-x-2">
            <Shield className="w-5 h-5 text-[#419f49] mt-0.5" />
            <span className="text-gray-700">
              Steuerliche Vorteile durch Brutto-Gehaltsumwandlung
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Car className="w-5 h-5 text-[#419f49] mt-0.5" />
            <span className="text-gray-700">
              Attraktive Auswahl an E-Fahrzeugen
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <FileText className="w-5 h-5 text-[#419f49] mt-0.5" />
            <span className="text-gray-700">
              Full-Service von Bestellung bis Wartung
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}