import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Car, Clock, FileText, Shield } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

export default function EmployeeDashboard() {
  const { user } = useAuthStore();

  // Mock data for demonstration
  const stats = {
    activeRequests: 2,
    approvedRequests: 5,
    nextService: new Date('2024-06-15'),
    insuranceCoverage: '100%',
  };

  const quickActions = [
    { icon: Car, label: 'Neue Fahrzeuganfrage', path: '/employee/vehicles' },
    { icon: Clock, label: 'Anfragen verwalten', path: '/employee/requests' },
    { icon: FileText, label: 'Dokumente einsehen', path: '/employee/documents' },
    { icon: Shield, label: 'Versicherungsdetails', path: '/employee/insurance' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Willkommen zurück, {user?.name}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Aktive Anfragen</p>
              <p className="text-2xl font-semibold">{stats.activeRequests}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Car className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Genehmigte Anfragen</p>
              <p className="text-2xl font-semibold">{stats.approvedRequests}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Nächster Service</p>
              <p className="text-2xl font-semibold">{formatDate(stats.nextService)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Shield className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Versicherungsschutz</p>
              <p className="text-2xl font-semibold">{stats.insuranceCoverage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => window.location.href = action.path}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <action.icon className="w-6 h-6 text-gray-600" />
              </div>
              <span className="font-medium text-gray-900">{action.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}