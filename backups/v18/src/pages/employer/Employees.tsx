import React from 'react';
import { useEmployeeStore } from '../../store/employeeStore';
import { useAuthStore } from '../../store/authStore';
import { EmployeeTable } from '../../components/employer/employees/EmployeeTable';
import { EmployeeInviteForm } from '../../components/employer/employees/EmployeeInviteForm';
import { Button } from '../../components/ui/Button';
import { Dialog } from '@headlessui/react';
import { Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Employees() {
  const { user } = useAuthStore();
  const { employees, loading, fetchEmployees, inviteEmployee, deleteEmployee } = useEmployeeStore();
  const [isInviteModalOpen, setInviteModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (user?.id) {
      fetchEmployees(user.id);
    }
  }, [user?.id, fetchEmployees]);

  const handleInvite = async (employerId: string, email: string) => {
    try {
      await inviteEmployee(employerId, email);
      toast.success('Einladung erfolgreich versendet');
      setInviteModalOpen(false);
    } catch (error) {
      toast.error('Fehler beim Versenden der Einladung');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Mitarbeiter wirklich löschen?')) {
      return;
    }

    try {
      await deleteEmployee(id);
      toast.success('Mitarbeiter erfolgreich gelöscht');
    } catch (error) {
      toast.error('Fehler beim Löschen des Mitarbeiters');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Mitarbeiter</h1>
        <Button onClick={() => setInviteModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Mitarbeiter einladen
        </Button>
      </div>

      <EmployeeTable
        employees={employees}
        onDelete={handleDelete}
      />

      <Dialog
        open={isInviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Neuen Mitarbeiter einladen
            </Dialog.Title>

            <EmployeeInviteForm
              onInvite={handleInvite}
              onClose={() => setInviteModalOpen(false)}
              employerId={user?.id}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}