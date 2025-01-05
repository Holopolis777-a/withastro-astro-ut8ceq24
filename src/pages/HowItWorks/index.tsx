import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { BrokerFlow } from './components/BrokerFlow';
import { MemberFlow } from './components/MemberFlow';
import { BrokerInviteProcess } from './components/BrokerInviteProcess';

export default function HowItWorks() {
  const { user } = useAuthStore();
  const isBroker = user?.role === 'broker';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {isBroker 
          ? "So funktioniert der Leasingprozess für Makler" 
          : "So funktioniert der Leasingprozess"
        }
      </h1>
      
      {isBroker ? (
        <div className="space-y-16">
          <BrokerInviteProcess />
          <BrokerFlow />
        </div>
      ) : (
        <MemberFlow />
      )}
    </div>
  );
}