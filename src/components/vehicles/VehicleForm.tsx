import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { ImageUpload } from './ImageUpload';
import { Upload } from 'lucide-react';

interface LeasingRate {
  months: number;
  kilometers: number;
  price: string;
}

export function VehicleForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState({
    // Basic Information
    make: '',
    model: '',
    vin: '',
    buildNumber: '',
    year: new Date().getFullYear(),
    
    // Technical Data
    fuelType: 'benzin',
    transmission: 'automatik',
    power: '',
    mileage: 0,
    category: 'limousine',
    
    // Additional Information
    description: '',
    extras: '',
    details: '',
    
    // Images
    images: [],
    
    // Colors
    availableColors: [],
    
    // Leasing Configuration
    leasingRates: {
      '36_10000': '',
      '36_15000': '',
      '36_20000': '',
      '48_10000': '',
      '48_15000': '',
      '48_20000': '',
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Grundinformationen</h2>
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Marke"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            required
          />
          <Input
            label="Modell"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="VIN"
            value={formData.vin}
            onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
            required
          />
          <Input
            label="Baujahr"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
            required
          />
        </div>
      </div>

      {/* Technical Data */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Technische Daten</h2>
        <div className="grid grid-cols-2 gap-6">
          <Select
            label="Kraftstoff"
            value={formData.fuelType}
            onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
          >
            <option value="benzin">Benzin</option>
            <option value="diesel">Diesel</option>
            <option value="elektro">Elektro</option>
            <option value="hybrid">Hybrid</option>
          </Select>
          <Select
            label="Getriebe"
            value={formData.transmission}
            onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
          >
            <option value="automatik">Automatik</option>
            <option value="manuell">Manuell</option>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Leistung (PS)"
            type="number"
            value={formData.power}
            onChange={(e) => setFormData({ ...formData, power: e.target.value })}
            required
          />
          <Input
            label="Kilometerstand"
            type="number"
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
            required
          />
        </div>
      </div>

      {/* Leasing Configuration */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Leasing-Konfiguration</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="font-medium">Laufzeit</div>
            <div className="font-medium text-center">10.000 km/Jahr</div>
            <div className="font-medium text-center">15.000 km/Jahr</div>
            <div className="font-medium text-center">20.000 km/Jahr</div>
          </div>
          
          {/* 36 Months */}
          <div className="grid grid-cols-4 gap-4 items-center mb-4">
            <div className="font-medium">36 Monate</div>
            <Input
              type="number"
              value={formData.leasingRates['36_10000']}
              onChange={(e) => setFormData({
                ...formData,
                leasingRates: {
                  ...formData.leasingRates,
                  '36_10000': e.target.value
                }
              })}
              placeholder="€"
            />
            <Input
              type="number"
              value={formData.leasingRates['36_15000']}
              onChange={(e) => setFormData({
                ...formData,
                leasingRates: {
                  ...formData.leasingRates,
                  '36_15000': e.target.value
                }
              })}
              placeholder="€"
            />
            <Input
              type="number"
              value={formData.leasingRates['36_20000']}
              onChange={(e) => setFormData({
                ...formData,
                leasingRates: {
                  ...formData.leasingRates,
                  '36_20000': e.target.value
                }
              })}
              placeholder="€"
            />
          </div>

          {/* 48 Months */}
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="font-medium">48 Monate</div>
            <Input
              type="number"
              value={formData.leasingRates['48_10000']}
              onChange={(e) => setFormData({
                ...formData,
                leasingRates: {
                  ...formData.leasingRates,
                  '48_10000': e.target.value
                }
              })}
              placeholder="€"
            />
            <Input
              type="number"
              value={formData.leasingRates['48_15000']}
              onChange={(e) => setFormData({
                ...formData,
                leasingRates: {
                  ...formData.leasingRates,
                  '48_15000': e.target.value
                }
              })}
              placeholder="€"
            />
            <Input
              type="number"
              value={formData.leasingRates['48_20000']}
              onChange={(e) => setFormData({
                ...formData,
                leasingRates: {
                  ...formData.leasingRates,
                  '48_20000': e.target.value
                }
              })}
              placeholder="€"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Bilder</h2>
        <ImageUpload
          images={formData.images}
          onUpload={(images) => setFormData({ ...formData, images })}
        />
      </div>

      {/* Description */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Beschreibung</h2>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500"
          placeholder="Fahrzeugbeschreibung eingeben..."
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button type="submit">
          Fahrzeug speichern
        </Button>
      </div>
    </form>
  );
}