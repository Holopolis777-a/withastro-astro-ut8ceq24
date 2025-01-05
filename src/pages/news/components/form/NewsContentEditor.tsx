import React from 'react';
import { Code } from 'lucide-react';
import { Checkbox } from '../../../../components/ui/Checkbox';

interface NewsContentEditorProps {
  content: string;
  htmlContent: string;
  useHtml: boolean;
  onChange: (updates: { content?: string; htmlContent?: string; useHtml?: boolean }) => void;
}

export function NewsContentEditor({ content, htmlContent, useHtml, onChange }: NewsContentEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="use-html"
          checked={useHtml}
          onChange={(checked) => onChange({ useHtml: checked })}
        />
        <label htmlFor="use-html" className="flex items-center text-sm text-gray-700">
          <Code className="w-4 h-4 mr-2" />
          HTML-Editor verwenden
        </label>
      </div>

      {useHtml ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            HTML-Inhalt
          </label>
          <textarea
            value={htmlContent}
            onChange={(e) => onChange({ htmlContent: e.target.value })}
            rows={12}
            className="w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            placeholder="<p>Ihr HTML-Inhalt hier...</p>"
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text-Inhalt
          </label>
          <textarea
            value={content}
            onChange={(e) => onChange({ content: e.target.value })}
            rows={8}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
        </div>
      )}
    </div>
  );
}