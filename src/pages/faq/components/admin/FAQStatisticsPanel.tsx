import React from 'react';
import { BarChart, Users, Search, ThumbsUp } from 'lucide-react';
import type { FAQStatistics } from '../../../../types/faq';

interface FAQStatisticsPanelProps {
  statistics: FAQStatistics;
}

export function FAQStatisticsPanel({ statistics }: FAQStatisticsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-3">
          <Users className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Gesamtaufrufe</p>
            <p className="text-2xl font-semibold">{statistics.totalViews}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-3">
          <ThumbsUp className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Hilfreich-Bewertungen</p>
            <p className="text-2xl font-semibold">{statistics.helpfulVotes}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-3">
          <Search className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Häufigste Suchanfragen</p>
            <div className="mt-2">
              {statistics.searchQueries.slice(0, 3).map(query => (
                <div key={query.term} className="text-sm">
                  {query.term} ({query.count})
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-3">
          <BarChart className="w-8 h-8 text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Top Kategorien</p>
            <div className="mt-2">
              {statistics.categoryViews.slice(0, 3).map(cat => (
                <div key={cat.categoryId} className="text-sm">
                  Kategorie {cat.categoryId}: {cat.views} Aufrufe
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}