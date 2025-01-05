import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VehicleGalleryProps {
  images: string[];
}

export function VehicleGallery({ images }: VehicleGalleryProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  const previousImage = () => {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  return (
    <div className="relative">
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="Fahrzeugbild"
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={previousImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div className="flex gap-2 mt-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-20 h-20 rounded-lg overflow-hidden ${
              index === currentIndex ? 'ring-2 ring-gray-900' : ''
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}