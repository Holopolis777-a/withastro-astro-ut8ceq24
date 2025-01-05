import React from 'react';
import { Shield } from 'lucide-react';
import { formatDate } from '../../../utils/dateUtils';
import { Badge } from '../../../components/ui/Badge';
import type { Order } from '../../../types/order';
import type { Member } from '../../../types/member';

interface OrderCardProps {
  order: Order;
  member?: Member;
  showActions?: boolean;
}

const SERVICE_NAMES = {
  insurance: 'Vollkasko- & Haftpflichtversicherung',
  maintenance: 'Wartung & Verschleiß',
  winterTires: 'Winterreifen',
  gap: 'GAP Deckung Premium',
  roadside: 'KFZ-Schutzbrief & Pannenhilfe',
  damageManagement: 'Schadensmanagement',
  delivery: 'Überführung & Zulassung'
};

export function OrderCard({ order, member, showActions = true }: OrderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden">
              <img
                src={order.vehicle.image}
                alt={`${order.vehicle.make} ${order.vehicle.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">
                {order.vehicle.make} {order.vehicle.model}
              </h3>
              <div className="mt-1 space-y-1 text-sm text-gray-600">
                <p>Bestellnummer: {order.orderNumber}</p>
                <p>Bestellt am: {formatDate(order.createdAt)}</p>
                {member && (
                  <p className="font-medium text-gray-900">
                    Mitglied: {member.firstName} {member.lastName}
                  </p>
                )}
                <p>Farbe: {order.configuration.color}</p>
                <p>Laufzeit: {order.configuration.duration} Monate</p>
                <p>Kilometer/Jahr: {order.configuration.kilometers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-semibold">
              {order.totalMonthlyRate.toFixed(2)}€ <span className="text-sm text-gray-500">/Monat</span>
            </div>
            <div className="mt-2">
              <Badge
                variant={
                  order.status === 'cancelled'
                    ? 'error'
                    : order.status === 'confirmed'
                    ? 'success'
                    : 'warning'
                }
              >
                {order.status === 'cancelled'
                  ? 'Storniert'
                  : order.status === 'confirmed'
                  ? 'Bestätigt'
                  : 'Ausstehend'}
              </Badge>
            </div>
          </div>
        </div>

        {order.configuration.services.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center mb-3">
              <Shield className="w-5 h-5 text-gray-600 mr-2" />
              <h4 className="font-medium">Gewählte Services:</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {order.configuration.services.map((service) => (
                <div key={service} className="text-sm text-gray-600">
                  • {SERVICE_NAMES[service as keyof typeof SERVICE_NAMES] || service}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}