import React from 'react';
import { Palette } from 'lucide-react';
import type { VehicleColor } from '../../../types/vehicle';

interface VehicleColorsProps {
  colors?: VehicleColor[];
  selectedColor?: string;
  onColorSelect?: (color: VehicleColor) => void;
}

export function VehicleColors({ colors = [], selectedColor, onColorSelect }: VehicleColorsProps) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Palette className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold">Verfügbare Farben</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorSelect?.(color)}
            className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
              selectedColor === color.name
                ? 'border-gray-900 bg-gray-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div
              className="w-8 h-8 rounded-full border border-gray-200 shadow-inner"
              style={{ backgroundColor: color.code }}
            />
            <div className="flex-1 text-left">
              <div className="font-medium text-gray-900">{color.name}</div>
              <div className="text-sm text-gray-500 flex items-center space-x-2">
                <span>{color.type.charAt(0).toUpperCase() + color.type.slice(1)}</span>
                {color.price ? (
                  <>
                    <span>•</span>
                    <span className="font-medium text-gray-900">+{color.price.toFixed(2)}€</span>
                  </>
                ) : null}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}