import React from 'react';
import { useNewsStore } from '../../../store/newsStore';
import { formatDate } from '../../../utils/dateUtils';
import { Badge } from '../../../components/ui/Badge';
import { Edit2, Archive } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useAuthStore } from '../../../store/authStore';

interface NewsListProps {
  onEdit?: (news: any) => void;
  onArchive?: (id: string) => void;
}

export function NewsList({ onEdit, onArchive }: NewsListProps) {
  const { news } = useNewsStore();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  
  const sortedNews = [...news]
    .filter(item => !item.archived)
    .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());

  if (sortedNews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Keine Nachrichten verfügbar</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedNews.map((item) => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{formatDate(item.publishDate)}</span>
                  <span>•</span>
                  <Badge variant={item.status === 'published' ? 'success' : 'warning'}>
                    {item.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                  </Badge>
                  <span>•</span>
                  <Badge variant="info">
                    {item.targetAudience === 'all' 
                      ? 'Alle' 
                      : item.targetAudience === 'broker' 
                      ? 'Nur Makler' 
                      : 'Nur Mitglieder'}
                  </Badge>
                </div>
              </div>

              {item.images && item.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {item.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Bild ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="mt-4 text-gray-600 whitespace-pre-wrap">
                {item.content}
              </div>
            </div>

            {isAdmin && (
              <div className="flex space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit?.(item)}
                  title="Bearbeiten"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (window.confirm('Möchten Sie diese Nachricht wirklich archivieren?')) {
                      onArchive?.(item.id);
                    }
                  }}
                  title="Archivieren"
                >
                  <Archive className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}