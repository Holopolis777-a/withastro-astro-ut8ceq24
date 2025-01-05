import React from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onUpload: (images: string[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  minImageDimensions?: { width: number; height: number };
}

export function ImageUpload({
  images,
  onUpload,
  maxFiles = 1,
  acceptedFileTypes = ['image/*'],
  maxFileSize = 2 * 1024 * 1024,
  minImageDimensions
}: ImageUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    onUpload([...images, ...imageUrls]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onUpload(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Upload ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {images.length < maxFiles && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-600">Bilder hinzufügen</span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes.join(',')}
        multiple={maxFiles > 1}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}