import React from 'react';
import { useNewsStore } from '../../store/newsStore';
import { useAuthStore } from '../../store/authStore';
import { NewsForm } from './components/NewsForm';
import { NewsList } from './components/NewsList';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import type { News } from '../../types/news';

export default function NewsManagement() {
  const { user } = useAuthStore();
  const { news, addNews, updateNews, archiveNews } = useNewsStore();
  const [isFormOpen, setFormOpen] = React.useState(false);
  const [editingNews, setEditingNews] = React.useState<News | null>(null);
  const navigate = useNavigate();

  // Redirect non-admin users
  React.useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (user?.role !== 'admin') {
    return null;
  }

  const handleSubmit = async (data: Partial<News>) => {
    try {
      if (editingNews) {
        await updateNews(editingNews.id, data);
        toast.success('Neuigkeit erfolgreich aktualisiert');
      } else {
        await addNews(data);
        toast.success('Neuigkeit erfolgreich erstellt');
      }
      setFormOpen(false);
      setEditingNews(null);
    } catch (error) {
      toast.error('Fehler beim Speichern');
    }
  };

  const handleEdit = (news: News) => {
    setEditingNews(news);
    setFormOpen(true);
  };

  const handleArchive = async (id: string) => {
    try {
      await archiveNews(id);
      toast.success('Neuigkeit erfolgreich archiviert');
    } catch (error) {
      toast.error('Fehler beim Archivieren');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">News Management</h1>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Neue Nachricht
        </Button>
      </div>

      <NewsList onEdit={handleEdit} onArchive={handleArchive} />

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
              {editingNews ? 'Nachricht bearbeiten' : 'Neue Nachricht erstellen'}
            </Dialog.Title>

            <NewsForm
              initialData={editingNews}
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