import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Dialog } from '@headlessui/react';
import { NewsForm } from './NewsForm';
import { NewsList } from './NewsList';
import { useNewsStore } from '../../store/newsStore';
import { toast } from 'react-hot-toast';

export function NewsManagementPanel() {
  const { news, addNews, updateNews, archiveNews } = useNewsStore();
  const [isFormOpen, setFormOpen] = React.useState(false);
  const [editingNews, setEditingNews] = React.useState<News | null>(null);

  const handleSubmit = async (data: Partial<News>) => {
    try {
      if (editingNews) {
        await updateNews(editingNews.id, data);
        toast.success('News erfolgreich aktualisiert');
      } else {
        await addNews(data);
        toast.success('News erfolgreich erstellt');
      }
      setFormOpen(false);
      setEditingNews(null);
    } catch (error) {
      toast.error('Fehler beim Speichern');
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await archiveNews(id);
      toast.success('News erfolgreich archiviert');
    } catch (error) {
      toast.error('Fehler beim Archivieren');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">News Verwaltung</h2>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          News erstellen
        </Button>
      </div>

      <NewsList
        news={news}
        showActions
        onEdit={(news) => {
          setEditingNews(news);
          setFormOpen(true);
        }}
        onArchive={handleArchive}
      />

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingNews(null);
        }}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />

          <div className="relative bg-white rounded-xl max-w-2xl w-full p-6">
            <Dialog.Title className="text-xl font-semibold mb-6">
              {editingNews ? 'News bearbeiten' : 'Neue News erstellen'}
            </Dialog.Title>

            <NewsForm
              initialData={editingNews || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setFormOpen(false);
                setEditingNews(null);
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}