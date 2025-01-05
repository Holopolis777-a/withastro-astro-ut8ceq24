import React from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './ui/Button';

interface ImageUploadProps {
  images: string[];
  onUpload: (images: string[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

export function ImageUpload({
  images,
  onUpload,
  maxFiles = 1,
  acceptedFileTypes = ['image/jpeg', 'image/png'],
  maxFileSize = 5 * 1024 * 1024 // 5MB default
}: ImageUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);

  const handleFiles = async (files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      if (!acceptedFileTypes.includes(file.type)) {
        alert('Ungültiges Dateiformat');
        return false;
      }
      if (file.size > maxFileSize) {
        alert('Datei ist zu groß (max. 5MB)');
        return false;
      }
      return true;
    });

    if (images.length + validFiles.length > maxFiles) {
      alert(`Maximal ${maxFiles} Bilder erlaubt`);
      return;
    }

    // Process and compress images
    const processedImages = await Promise.all(
      validFiles.map(file => processImage(file))
    );

    onUpload([...images, ...processedImages]);
  };

  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimensions
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive ? 'border-gray-400 bg-gray-50' : 'border-gray-200'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Bilder auswählen
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            oder per Drag & Drop • max. {maxFiles} Bilder • max. 5MB pro Bild
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedFileTypes.join(',')}
          multiple={maxFiles > 1}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onUpload(images.filter((_, i) => i !== index))}
                className="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
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