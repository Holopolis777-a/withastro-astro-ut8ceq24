import React from 'react';
import { ImageUpload } from '../../../components/ImageUpload';
import { Button } from '../../../components/ui/Button';
import { useAdminStore } from '../../../store/adminStore';
import { supabase } from '../../../lib/supabase';
import { toast } from 'react-hot-toast';
import { Image, Trash2, Save } from 'lucide-react';

export default function LogoSettings() {
  const { portalLogo, updatePortalLogo, deletePortalLogo } = useAdminStore();
  const [selectedLogo, setSelectedLogo] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  const handleLogoUpload = (images: string[]) => {
    if (images.length > 0) {
      setSelectedLogo(images[0]);
    }
  };

  const handleSave = async () => {
    if (!selectedLogo) return;

    setSaving(true);
    try {
      // Convert base64 to blob
      const response = await fetch(selectedLogo);
      const blob = await response.blob();

      // Upload to Supabase Storage
      const fileName = `logo-${Date.now()}${blob.type === 'image/svg+xml' ? '.svg' : '.png'}`;
      const { data, error } = await supabase.storage
        .from('logos')
        .upload(fileName, blob, {
          contentType: blob.type,
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName);

      // Update logo in settings
      if (!urlData?.publicUrl) {
        throw new Error('Failed to get public URL');
      }

      await updatePortalLogo(urlData.publicUrl);
      setSelectedLogo(null);
      toast.success('Logo erfolgreich gespeichert');
    } catch (error) {
      console.error('Error saving logo:', error);
      toast.error('Fehler beim Speichern des Logos');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoDelete = async () => {
    try {
      // Delete from Supabase Storage if exists
      const fileName = portalLogo?.split('/').pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from('logos')
          .remove([fileName]);

        if (storageError) throw storageError;
      }

      await deletePortalLogo();
      toast.success('Logo erfolgreich gelöscht');
    } catch (error) {
      console.error('Error deleting logo:', error);
      toast.error('Fehler beim Löschen des Logos');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Image className="w-5 h-5 text-gray-600" />
        </div>
        <h2 className="text-lg font-medium">Logo-Einstellungen</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {(portalLogo || selectedLogo) ? (
          <div className="space-y-4">
            <div className="w-48 h-48 relative">
              <img
                src={selectedLogo || portalLogo}
                alt="Portal Logo"
                className="w-full h-full object-contain"
              />
              {!selectedLogo && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogoDelete}
                className="absolute top-2 right-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mb-4">Kein Logo hochgeladen</p>
        )}

        <div className="mt-6">
          <ImageUpload
            images={selectedLogo ? [selectedLogo] : portalLogo ? [portalLogo] : []}
            onUpload={handleLogoUpload}
            maxFiles={1}
            acceptedFileTypes={['image/jpeg', 'image/png', 'image/svg+xml']}
            maxFileSize={2 * 1024 * 1024} // 2MB
          />
          <p className="text-sm text-gray-500 mt-2">
            Unterstützte Formate: JPG, PNG, SVG. Maximale Größe: 2MB
          </p>
        </div>

        {selectedLogo && (
          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full sm:w-auto"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Wird gespeichert...' : 'Logo speichern'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}