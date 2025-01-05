import React from 'react';
import { Logo } from '../../common/Logo';
import { useAdminStore } from '../../../store/adminStore';

export function NavHeader() {
  const { portalLogo } = useAdminStore();

  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
      <Logo />
      {!portalLogo && <span className="text-xl font-semibold">Vilonda</span>}
    </div>
  );
}