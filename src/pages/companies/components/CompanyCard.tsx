import React from 'react';
import { Building2, Users, Car, Mail, Phone, MapPin } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { formatDate } from '../../../utils/dateUtils';
import type { Company } from '../../../types/company';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{company.name}</h3>
              <p className="text-sm text-gray-500">{company.industry}</p>
            </div>
          </div>
          <Badge variant={company.status === 'active' ? 'success' : 'warning'}>
            {company.status === 'active' ? 'Aktiv' : 'Ausstehend'}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            {company.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {company.phone}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {company.address.city}, {company.address.country}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{company.employeeCount} Mitarbeiter</span>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-sm text-gray-600">
              <Car className="w-4 h-4 mr-2" />
              <span>{company.activeVehicles} Fahrzeuge</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          Eingeladen am {formatDate(company.createdAt)}
        </div>

        <Button variant="outline" className="w-full">
          Details anzeigen
        </Button>
      </div>
    </div>
  );
}