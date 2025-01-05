import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { FAQForm } from './FAQForm';
import { Dialog } from '@headlessui/react';
import type { FAQ } from '../../../../types/faq';
import { useFAQStore } from '../../../../store/faqStore';

export function FAQManagementPanel() {
  const { faqs, categories, addFAQ, updateFAQ, deleteFAQ } = useFAQStore();
  const [isFormOpen, setFormOpen] = React.useState(false);
  const [editingFAQ, setEditingFAQ] = React.useState<FAQ | null>(null);

  const handleSubmit = async (data: Partial<FAQ>) => {
    try {
      if (editingFAQ) {
        await updateFAQ(editingFAQ.id, data);
      } else {
        await addFAQ(data);
      }
      setFormOpen(false);
      setEditingFAQ(null);
    } catch (error) {
      console.error('Failed to save FAQ:', error);
    }
  };

  const handleDelete = async (faq: FAQ) => {
    if (confirm('Sind Sie sicher, dass Sie diese FAQ löschen möchten?')) {
      await deleteFAQ(faq.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">FAQ Verwaltung</h2>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          FAQ hinzufügen
        </Button>
      </div>

      <div className="grid gap-4">
        {faqs.map(faq => (
          <div
            key={faq.id}
            className="bg-white p-4 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{faq.question}</h3>
                <p className="text-sm text-gray-500">
                  Sichtbar für: {faq.visibility === 'all' ? 'Alle' : faq.visibility === 'broker' ? 'Makler' : 'Mitglieder'}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingFAQ(faq);
                    setFormOpen(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(faq)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingFAQ(null);
        }}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />

          <div className="relative bg-white rounded-xl max-w-2xl w-full p-6">
            <Dialog.Title className="text-xl font-semibold mb-6">
              {editingFAQ ? 'FAQ bearbeiten' : 'Neue FAQ erstellen'}
            </Dialog.Title>

            <FAQForm
              faq={editingFAQ || undefined}
              categories={categories}
              onSubmit={handleSubmit}
              onCancel={() => {
                setFormOpen(false);
                setEditingFAQ(null);
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}