import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export function Slider({ min, max, step, value, onChange }: SliderProps) {
  return (
    <div className="relative w-full h-6">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min} km</span>
        <span>{max} km</span>
      </div>
    </div>
  );
}