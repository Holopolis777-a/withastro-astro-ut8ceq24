import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-5 h-5 border rounded transition-colors ${
          checked ? 'bg-gray-900 border-gray-900' : 'border-gray-300'
        }`}>
          {checked && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}