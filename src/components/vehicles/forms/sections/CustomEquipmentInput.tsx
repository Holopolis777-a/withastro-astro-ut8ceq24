import React from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';

interface CustomEquipmentInputProps {
  customEquipment: string[];
  onChange: (equipment: string[]) => void;
}

export function CustomEquipmentInput({ customEquipment = [], onChange }: CustomEquipmentInputProps) {
  const [newEquipment, setNewEquipment] = React.useState('');

  const handleAdd = () => {
    if (newEquipment.trim()) {
      onChange([...customEquipment, newEquipment.trim()]);
      setNewEquipment('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(customEquipment.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Zusätzliche Ausstattung
        </label>
        <div className="flex gap-2">
          <Input
            value={newEquipment}
            onChange={(e) => setNewEquipment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="z.B. Panoramadach, Head-up Display"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAdd}
            disabled={!newEquipment.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Hinzufügen
          </Button>
        </div>
      </div>

      {customEquipment.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {customEquipment.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <span className="text-sm text-gray-700">{item}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}