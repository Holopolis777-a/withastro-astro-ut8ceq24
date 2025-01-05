import React from 'react';
import { Plus, X, Link as LinkIcon } from 'lucide-react';
import { Input } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button';

interface NewsLink {
  url: string;
  text: string;
}

interface NewsLinkManagerProps {
  links: NewsLink[];
  onChange: (links: NewsLink[]) => void;
}

export function NewsLinkManager({ links, onChange }: NewsLinkManagerProps) {
  const [newLink, setNewLink] = React.useState<NewsLink>({ url: '', text: '' });

  const handleAddLink = () => {
    if (newLink.url && newLink.text) {
      onChange([...links, newLink]);
      setNewLink({ url: '', text: '' });
    }
  };

  const handleRemoveLink = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Links
      </label>

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Link-Text"
          value={newLink.text}
          onChange={(e) => setNewLink({ ...newLink, text: e.target.value })}
        />
        <div className="flex space-x-2">
          <Input
            placeholder="URL"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          />
          <Button
            type="button"
            onClick={handleAddLink}
            disabled={!newLink.url || !newLink.text}
            className="flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {links.length > 0 && (
        <div className="space-y-2">
          {links.map((link, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <LinkIcon className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{link.text}</span>
                <span className="text-sm text-gray-500">({link.url})</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveLink(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}