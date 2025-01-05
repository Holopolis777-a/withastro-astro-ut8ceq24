import React from 'react';

const brands = [
  { name: 'BMW', logo: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=200&h=100' },
  { name: 'Mercedes', logo: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=200&h=100' },
  { name: 'Audi', logo: 'https://images.unsplash.com/photo-1610880846497-7257b23f6138?auto=format&fit=crop&w=200&h=100' },
  { name: 'Tesla', logo: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=200&h=100' },
];

export function BrandShowcase() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-center mb-8">Unsere Premium-Marken</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="aspect-[2/1] rounded-lg bg-white shadow-sm border border-gray-100 p-4 flex items-center justify-center hover:shadow-md transition-shadow"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}