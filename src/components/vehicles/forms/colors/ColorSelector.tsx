import React from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '../../../ui/Input';
import { Select } from '../../../ui/Select';
import { Button } from '../../../ui/Button';
import type { VehicleColor } from '../../../../types/vehicle';

interface ColorSelectorProps {
  colors: VehicleColor[];
  onChange: (colors: VehicleColor[]) => void;
}

export function ColorSelector({ colors, onChange }: ColorSelectorProps) {
  const [newColor, setNewColor] = React.useState<VehicleColor>({
    name: '',
    code: '',
    type: 'solid',
    price: 0,
  });

  const handleAddColor = () => {
    if (!newColor.name || !newColor.code) return;
    onChange([...colors, newColor]);
    setNewColor({
      name: '',
      code: '',
      type: 'solid',
      price: 0,
    });
  };

  const handleRemoveColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    onChange(newColors);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Verfügbare Farben</h3>

      {/* Color List */}
      <div className="space-y-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200"
          >
            <div
              className="w-8 h-8 rounded-full border border-gray-200"
              style={{ backgroundColor: color.code }}
            />
            <div className="flex-1">
              <div className="font-medium">{color.name}</div>
              <div className="text-sm text-gray-500">
                {color.type.charAt(0).toUpperCase() + color.type.slice(1)}
                {color.price ? ` • +${color.price.toFixed(2)}€` : ''}
              </div>
            </div>
            <button
              onClick={() => handleRemoveColor(index)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Color */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <Input
          label="Farbname"
          value={newColor.name}
          onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
          placeholder="z.B. Alpinweiß"
        />
        <Input
          label="Farbcode"
          value={newColor.code}
          onChange={(e) => setNewColor({ ...newColor, code: e.target.value })}
          placeholder="#FFFFFF oder Farbcode"
        />
        <Select
          label="Typ"
          value={newColor.type}
          onChange={(e) => setNewColor({ ...newColor, type: e.target.value as 'solid' | 'metallic' | 'pearl' })}
        >
          <option value="solid">Uni-Lackierung</option>
          <option value="metallic">Metallic-Lackierung</option>
          <option value="pearl">Perleffekt-Lackierung</option>
        </Select>
        <Input
          type="number"
          label="Aufpreis (€)"
          value={newColor.price || ''}
          onChange={(e) => setNewColor({ ...newColor, price: Number(e.target.value) })}
          placeholder="0.00"
        />
        <div className="col-span-2 flex justify-end">
          <Button
            type="button"
            onClick={handleAddColor}
            disabled={!newColor.name || !newColor.code}
          >
            <Plus className="w-4 h-4 mr-2" />
            Farbe hinzufügen
          </Button>
        </div>
      </div>
    </div>
  );
}