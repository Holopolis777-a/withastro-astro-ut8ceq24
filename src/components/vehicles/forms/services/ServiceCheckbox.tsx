import React from 'react';
import { Checkbox } from '../../../ui/Checkbox';
import { LucideIcon } from 'lucide-react';

interface ServiceCheckboxProps {
  id: string;
  label: string;
  icon: LucideIcon;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ServiceCheckbox({
  id,
  label,
  icon: Icon,
  description,
  checked,
  onChange
}: ServiceCheckboxProps) {
  return (
    <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100">
      <Checkbox
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-gray-600" />
          <label 
            htmlFor={id}
            className="text-sm font-medium text-gray-900 cursor-pointer"
          >
            {label}
          </label>
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
}