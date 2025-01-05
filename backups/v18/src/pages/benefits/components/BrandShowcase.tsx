import React from 'react';

const brands = [
  { name: 'BMW', logo: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=100&h=100' },
  { name: 'Mercedes', logo: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=100&h=100' },
  { name: 'Audi', logo: 'https://images.unsplash.com/photo-1610880846497-7257b23f6138?auto=format&fit=crop&w=100&h=100' },
];

export function BrandShowcase() {
  return (
    <div className="flex items-center justify-center space-x-8">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="w-20 h-20 rounded-lg bg-white shadow-sm border border-gray-100 p-4 flex items-center justify-center"
        >
          <img
            src={brand.logo}
            alt={brand.name}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}