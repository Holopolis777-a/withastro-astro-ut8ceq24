import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSalarySacrificeStore } from '../../../store/salarySacrificeStore';
import { VehicleForm } from '../../../components/vehicles/forms/VehicleForm';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { usePermissions } from '../../../hooks/usePermissions';
import { toast } from 'react-hot-toast';

export default function EditSalaryVehicle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles, updateVehicle } = useSalarySacrificeStore(); // Use salary sacrifice store
  const vehicle = React.useMemo(() => vehicles.find(v => v.id === id), [vehicles, id]);
  const { isAdmin } = usePermissions();

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Sie haben keine Berechtigung, Fahrzeuge zu bearbeiten.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/salary-sacrifice')}
        >
          Zurück zur Übersicht
        </Button>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Fahrzeug nicht gefunden.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/salary-sacrifice')}
        >
          Zurück zur Übersicht
        </Button>
      </div>
    );
  }

  const handleSubmit = async (data: any) => {
    try {
      await updateVehicle(id!, data);
      toast.success('Gehaltsumwandlungs-Fahrzeug erfolgreich aktualisiert');
      navigate('/salary-sacrifice');
    } catch (error) {
      toast.error('Fehler beim Aktualisieren des Gehaltsumwandlungs-Fahrzeugs');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/salary-sacrifice')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zurück zur Übersicht
          </button>
          <h1 className="text-2xl font-semibold">
            {vehicle.make} {vehicle.model} bearbeiten
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <VehicleForm
          initialData={vehicle}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/salary-sacrifice')}
        />
      </div>
    </div>
  );
}