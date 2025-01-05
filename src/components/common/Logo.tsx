import React from 'react';
import { useAdminStore } from '../../store/adminStore';

interface LogoProps {
  className?: string;
  defaultLogo?: string;
}

export function Logo({ className, defaultLogo = 'https://axlulsosmeywcieethux.supabase.co/storage/v1/object/public/logos/Kopie%20von%20Logo%20Autohaus%20Seifert%20PDF.pdf.jpg' }: LogoProps) {
  const { portalLogo } = useAdminStore();

  return (
    <img
      src={portalLogo || defaultLogo}
      alt="Vilonda"
      className={`h-8 max-w-[180px] object-contain ${className}`}
    />
  );
}