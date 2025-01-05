import React from 'react';
import { ImageUpload } from '../../../../components/ImageUpload';

interface NewsImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function NewsImageUpload({ images, onChange }: NewsImageUploadProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Bilder
      </label>
      <ImageUpload
        images={images}
        onUpload={onChange}
        maxFiles={4}
        acceptedFileTypes={['image/jpeg', 'image/png']}
      />
      <p className="text-sm text-gray-500">
        Laden Sie bis zu 4 Bilder hoch (JPG, PNG). Maximale Größe: 5MB pro Bild.
      </p>
    </div>
  );
}