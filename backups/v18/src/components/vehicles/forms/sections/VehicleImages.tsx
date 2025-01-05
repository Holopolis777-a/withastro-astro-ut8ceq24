import React from 'react';
import { ImageUpload } from '../../ImageUpload';

interface VehicleImagesProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function VehicleImages({ images, onChange }: VehicleImagesProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Fahrzeugbilder</h3>
      <ImageUpload
        images={images}
        onUpload={onChange}
        maxFiles={5}
        acceptedFileTypes={['image/jpeg', 'image/png']}
      />
      <p className="text-sm text-gray-500">
        Laden Sie bis zu 5 Bilder hoch. Erlaubte Formate: JPG, PNG
      </p>
    </div>
  );
}