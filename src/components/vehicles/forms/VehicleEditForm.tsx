import React from 'react';
import { useVehicleStore } from '../../../store/vehicleStore';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { ImageUpload } from '../ImageUpload';
import { toast } from 'react-hot-toast';
import type { Vehicle } from '../../../types/vehicle';

interface VehicleEditFormProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export function VehicleEditForm({ vehicle, onClose }: VehicleEditFormProps) {
  const { updateVehicle } = useVehicleStore();
  const [formData, setFormData] = React.useState({
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    vin: vehicle.vin || '',
    licensePlate: vehicle.licensePlate || '',
    type: vehicle.type || 'limousine',
    fuelType: vehicle.fuelType || 'benzin',
    transmission: vehicle.transmission || 'automatik',
    power: vehicle.power || '',
    mileage: vehicle.mileage,
    color: vehicle.color,
    images: vehicle.images,
    features: vehicle.features,
    leasingRates: vehicle.leasingRates,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateVehicle(vehicle.id, formData);
      toast.success('Fahrzeug erfolgreich aktualisiert');
      onClose();
    } catch (error) {
      toast.error('Fehler beim Aktualisieren des Fahrzeugs');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          label="Baujahr"
          type="number"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
          required
        />
        <Input
          label="Fahrgestellnummer (VIN)"
          value={formData.vin}
          onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Select
          label="Fahrzeugtyp"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="limousine">Limousine</option>
          <option value="kombi">Kombi</option>
          <option value="suv">SUV</option>
          <option value="coupe">Coupé</option>
        </Select>
        <Select
          label="Kraftstoffart"
          value={formData.fuelType}
          onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
        >
          <option value="benzin">Benzin</option>
          <option value="diesel">Diesel</option>
          <option value="elektro">Elektro</option>
          <option value="hybrid">Hybrid</option>
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
          label="Farbe"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          required
        />
      </div>

      <ImageUpload
        images={formData.images}
        onUpload={(images) => setFormData({ ...formData, images })}
      />

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Abbrechen
        </Button>
        <Button type="submit">
          Änderungen speichern
        </Button>
      </div>
    </form>
  );
}