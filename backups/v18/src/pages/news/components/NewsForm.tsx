import React from 'react';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { Eye, FileText, Image as ImageIcon, Code, Link, Plus, X } from 'lucide-react';
import { ImageUpload } from '../../../components/ImageUpload';
import type { News, NewsTargetAudience } from '../../../types/news';

interface NewsFormProps {
  initialData?: Partial<News>;
  onSubmit: (data: Partial<News>) => Promise<void>;
  onCancel: () => void;
}

interface LinkData {
  url: string;
  text: string;
}

export function NewsForm({ initialData, onSubmit, onCancel }: NewsFormProps) {
  const [formData, setFormData] = React.useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    htmlContent: initialData?.htmlContent || '',
    useHtml: initialData?.useHtml || false,
    targetAudience: initialData?.targetAudience || 'all',
    publishDate: initialData?.publishDate 
      ? new Date(initialData.publishDate).toISOString().slice(0, 16) 
      : new Date().toISOString().slice(0, 16),
    status: initialData?.status || 'draft',
    images: initialData?.images || [],
    links: initialData?.links || [],
  });

  const [newLink, setNewLink] = React.useState<LinkData>({ url: '', text: '' });
  const [isPreviewMode, setPreviewMode] = React.useState(false);

  const handleAddLink = () => {
    if (newLink.url && newLink.text) {
      setFormData(prev => ({
        ...prev,
        links: [...(prev.links || []), newLink]
      }));
      setNewLink({ url: '', text: '' });
    }
  };

  const handleRemoveLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent, asDraft = false) => {
    e.preventDefault();
    
    try {
      await onSubmit({
        ...formData,
        status: asDraft ? 'draft' : 'published',
        publishDate: new Date(formData.publishDate),
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{formData.title}</h3>
          <div className="text-sm text-gray-500 mb-4">
            Veröffentlichung: {new Date(formData.publishDate).toLocaleString()}
            {' • '}
            Zielgruppe: {
              formData.targetAudience === 'all' 
                ? 'Alle' 
                : formData.targetAudience === 'broker' 
                ? 'Nur Makler' 
                : 'Nur Mitglieder'
            }
          </div>
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {formData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Bild ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
          {formData.useHtml ? (
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.htmlContent }}
            />
          ) : (
            <div className="space-y-4">
              <div className="prose max-w-none whitespace-pre-wrap">
                {formData.content}
              </div>
              {formData.links && formData.links.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium">Weiterführende Links:</h4>
                  <div className="space-y-1">
                    {formData.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800"
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <Button onClick={() => setPreviewMode(false)} className="w-full">
          Zurück zum Bearbeiten
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titel
        </label>
        <input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
          placeholder="Geben Sie einen aussagekräftigen Titel ein..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bilder
        </label>
        <ImageUpload
          images={formData.images}
          onUpload={(images) => setFormData({ ...formData, images })}
          maxFiles={4}
          acceptedFileTypes={['image/jpeg', 'image/png']}
        />
      </div>

      <div className="flex items-center space-x-2 mb-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.useHtml}
            onChange={(e) => setFormData({ ...formData, useHtml: e.target.checked })}
            className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
          />
          <span className="text-sm font-medium text-gray-700">HTML-Inhalt verwenden</span>
        </label>
        <Code className="w-4 h-4 text-gray-400" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Inhalt
        </label>
        {formData.useHtml ? (
          <textarea
            value={formData.htmlContent}
            onChange={(e) => setFormData({ ...formData, htmlContent: e.target.value })}
            rows={12}
            className="w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            placeholder="<p>Ihr HTML-Inhalt hier...</p>"
            required
          />
        ) : (
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={8}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            required
          />
        )}
      </div>

      {!formData.useHtml && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Links
          </label>
          <div className="space-y-4">
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

            {formData.links && formData.links.length > 0 && (
              <div className="space-y-2">
                {formData.links.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <Link className="w-4 h-4 text-gray-400" />
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
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Zielgruppe"
          value={formData.targetAudience}
          onChange={(e) => setFormData({ 
            ...formData, 
            targetAudience: e.target.value as NewsTargetAudience 
          })}
          required
        >
          <option value="all">Alle</option>
          <option value="broker">Nur Makler</option>
          <option value="member">Nur Mitglieder</option>
        </Select>

        <Input
          type="datetime-local"
          label="Veröffentlichungsdatum"
          value={formData.publishDate}
          onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6 border-t">
        <div className="grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onCancel} className="w-full">
            Abbrechen
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewMode(true)}
            className="w-full"
          >
            <Eye className="w-4 h-4 mr-2" />
            Vorschau
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => handleSubmit(e, true)}
            className="w-full"
          >
            <FileText className="w-4 h-4 mr-2" />
            Entwurf
          </Button>
          <Button type="submit" className="w-full">
            Veröffentlichen
          </Button>
        </div>
      </div>
    </form>
  );
}