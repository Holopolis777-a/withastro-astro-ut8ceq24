import React from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '../../../ui/Input';
import { Select } from '../../../ui/Select';
import { Button } from '../../../ui/Button';
import type { VehicleColor, VehicleFormData } from '../../../../types/vehicle';

interface ColorManagementProps {
  data: VehicleFormData;
  onChange: (data: Partial<VehicleFormData>) => void;
}

export function ColorManagement({ data, onChange }: ColorManagementProps) {
  const [newColor, setNewColor] = React.useState<VehicleColor>({
    name: '',
    code: '',
    type: 'solid',
    price: 0,
  });

  const handleAddColor = () => {
    if (!newColor.name || !newColor.code) return;
    
    const updatedColors = [...(data.availableColors || []), newColor];
    onChange({ 
      availableColors: updatedColors,
      // Set as default color if it's the first one
      color: data.color || newColor.name 
    });
    
    setNewColor({
      name: '',
      code: '',
      type: 'solid',
      price: 0,
    });
  };

  const handleRemoveColor = (index: number) => {
    const updatedColors = data.availableColors.filter((_, i) => i !== index);
    onChange({ 
      availableColors: updatedColors,
      // Update selected color if removed
      color: data.color === data.availableColors[index].name 
        ? updatedColors[0]?.name || ''
        : data.color
    });
  };

  const handleSelectColor = (colorName: string) => {
    onChange({ color: colorName });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Verfügbare Farben</h3>

      {/* Color List */}
      {data.availableColors?.length > 0 && (
        <div className="grid gap-4 mb-6">
          {data.availableColors.map((color, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 bg-white rounded-lg border ${
                data.color === color.name ? 'border-gray-900' : 'border-gray-200'
              }`}
              onClick={() => handleSelectColor(color.name)}
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
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveColor(index);
                }}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

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
          placeholder="#FFFFFF oder RGB"
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
        <div className="col-span-2">
          <Button
            type="button"
            onClick={handleAddColor}
            disabled={!newColor.name || !newColor.code}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Farbe hinzufügen
          </Button>
        </div>
      </div>
    </div>
  );
}