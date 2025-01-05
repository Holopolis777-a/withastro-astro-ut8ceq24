import React from 'react';
import { useNewsStore } from '../../store/newsStore';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../utils/dateUtils';
import { Badge } from '../ui/Badge';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function NewsFeed() {
  const { user } = useAuthStore();
  const { getNewsByAudience } = useNewsStore();
  
  const news = React.useMemo(() => {
    if (!user) return [];
    return getNewsByAudience(user.role === 'broker' ? 'broker' : 'member');
  }, [user, getNewsByAudience]);

  if (news.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 text-center">
        <p className="text-gray-500">Keine aktuellen Neuigkeiten verfügbar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Neuigkeiten</h2>
      <div className="grid gap-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              {item.images && item.images.length > 0 && (
                <div className="md:w-2/5 lg:w-1/3">
                  <img
                    src={item.images[0]}
                    alt=""
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
              )}
              
              {/* Content Section */}
              <div className="flex-1 p-6">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="info">
                        {item.targetAudience === 'broker' ? 'Für Makler' : 'Für Mitglieder'}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formatDate(item.publishDate)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  </div>
                  
                  {/* Content */}
                  {item.useHtml ? (
                    <div 
                      className="prose prose-sm max-w-none mb-4"
                      dangerouslySetInnerHTML={{ __html: item.htmlContent || '' }}
                    />
                  ) : (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.content}
                    </p>
                  )}
                  
                  {/* Links */}
                  {item.links && item.links.length > 0 && (
                    <div className="mt-auto flex justify-end space-x-2">
                      {item.links.map((link, index) => (
                        <Button
                          key={index}
                          as="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white inline-flex items-center"
                        >
                          {link.text}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}