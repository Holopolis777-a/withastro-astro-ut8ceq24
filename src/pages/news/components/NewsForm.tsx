import React from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Eye, FileText } from 'lucide-react';
import { NewsContentEditor } from './form/NewsContentEditor';
import { NewsImageUpload } from './form/NewsImageUpload';
import { NewsLinkManager } from './form/NewsLinkManager';
import type { News, NewsTargetAudience } from '../../../types/news';

interface NewsFormProps {
  initialData?: Partial<News>;
  onSubmit: (data: Partial<News>) => Promise<void>;
  onCancel: () => void;
}

const AUDIENCE_OPTIONS = [
  { value: 'broker', label: 'Makler' },
  { value: 'member', label: 'Mitglieder' },
  { value: 'employer', label: 'Arbeitgeber' },
  { value: 'employee', label: 'Arbeitnehmer' },
  { value: 'salary-employee', label: 'Arbeitnehmer Gehaltsumwandlung' },
] as const;

export function NewsForm({ initialData, onSubmit, onCancel }: NewsFormProps) {
  const [formData, setFormData] = React.useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    htmlContent: initialData?.htmlContent || '',
    useHtml: initialData?.useHtml || false,
    targetAudiences: initialData?.targetAudiences || [],
    publishDate: initialData?.publishDate 
      ? new Date(initialData.publishDate).toISOString().slice(0, 16) 
      : new Date().toISOString().slice(0, 16),
    status: initialData?.status || 'draft',
    images: initialData?.images || [],
    links: initialData?.links || [],
  });

  const [isPreviewMode, setPreviewMode] = React.useState(false);

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

  const handleAudienceChange = (value: NewsTargetAudience, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      targetAudiences: checked
        ? [...prev.targetAudiences, value]
        : prev.targetAudiences.filter(a => a !== value)
    }));
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{formData.title}</h3>
          <div className="text-sm text-gray-500 mb-4">
            Veröffentlichung: {new Date(formData.publishDate).toLocaleString()}
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
            <div className="prose max-w-none whitespace-pre-wrap">
              {formData.content}
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
      <Input
        label="Titel"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <NewsImageUpload
        images={formData.images}
        onChange={(images) => setFormData({ ...formData, images })}
      />

      <NewsContentEditor
        content={formData.content}
        htmlContent={formData.htmlContent}
        useHtml={formData.useHtml}
        onChange={(updates) => setFormData(prev => ({ ...prev, ...updates }))}
      />

      <NewsLinkManager
        links={formData.links}
        onChange={(links) => setFormData({ ...formData, links })}
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Zielgruppen
        </label>
        <div className="grid grid-cols-2 gap-4">
          {AUDIENCE_OPTIONS.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`audience-${option.value}`}
                checked={formData.targetAudiences.includes(option.value)}
                onChange={(checked) => handleAudienceChange(option.value, checked)}
              />
              <label 
                htmlFor={`audience-${option.value}`}
                className="text-sm text-gray-700"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Input
        type="datetime-local"
        label="Veröffentlichungsdatum"
        value={formData.publishDate}
        onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
        required
      />

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