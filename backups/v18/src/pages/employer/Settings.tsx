import React from 'react';
import { useEmployerStore } from '../../store/employerStore';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { toast } from 'react-hot-toast';

export default function Settings() {
  const { user } = useAuthStore();
  const { employers, updateEmployer } = useEmployerStore();
  const employer = employers.find(e => e.id === user?.id);

  const [settings, setSettings] = React.useState(employer?.settings || {
    allowEmployeeRegistration: true,
    requireApproval: true,
    maxOrdersPerEmployee: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      await updateEmployer(user.id, { settings });
      toast.success('Einstellungen erfolgreich gespeichert');
    } catch (error) {
      toast.error('Fehler beim Speichern der Einstellungen');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Einstellungen</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <Checkbox
            id="allowRegistration"
            label="Mitarbeiter können sich selbst registrieren"
            checked={settings.allowEmployeeRegistration}
            onChange={(checked) => setSettings(s => ({
              ...s,
              allowEmployeeRegistration: checked
            }))}
          />

          <Checkbox
            id="requireApproval"
            label="Bestellungen müssen genehmigt werden"
            checked={settings.requireApproval}
            onChange={(checked) => setSettings(s => ({
              ...s,
              requireApproval: checked
            }))}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximale Anzahl Bestellungen pro Mitarbeiter
            </label>
            <Input
              type="number"
              min={1}
              max={5}
              value={settings.maxOrdersPerEmployee}
              onChange={(e) => setSettings(s => ({
                ...s,
                maxOrdersPerEmployee: parseInt(e.target.value)
              }))}
            />
          </div>
        </div>

        <Button type="submit">Einstellungen speichern</Button>
      </form>
    </div>
  );
}