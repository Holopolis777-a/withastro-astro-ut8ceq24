import React from 'react';
import { formatDate } from '../../utils/dateUtils';
import { Badge } from '../ui/Badge';
import type { News } from '../../types/news';

interface NewsListProps {
  news: News[];
  showActions?: boolean;
  onEdit?: (news: News) => void;
  onArchive?: (id: string) => void;
}

export function NewsList({ news, showActions, onEdit, onArchive }: NewsListProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Keine Neuigkeiten verfügbar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{formatDate(item.publishDate)}</span>
                <span>•</span>
                <Badge variant={item.targetAudience === 'all' ? 'info' : 'warning'}>
                  {item.targetAudience === 'all' ? 'Alle' : item.targetAudience === 'broker' ? 'Makler' : 'Mitglieder'}
                </Badge>
                <span>•</span>
                <span>{item.readCount} Aufrufe</span>
              </div>
            </div>

            {showActions && (
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit?.(item)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Bearbeiten
                </button>
                <button
                  onClick={() => onArchive?.(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Archivieren
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 text-gray-600 whitespace-pre-wrap">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}