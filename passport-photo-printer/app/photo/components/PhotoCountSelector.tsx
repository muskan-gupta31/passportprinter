'use client';

import React from 'react';
import { usePhoto } from '@/context/photoeditor';

// Define the required photo count options
const PHOTO_COUNT_OPTIONS = [4, 6, 8, 16, 32];
// Set a default minimum value
const DEFAULT_MIN_COUNT = 4;

export default function PhotoCountSelector() {
  const { photoCount, setPhotoCount } = usePhoto();

  // Ensure photoCount is initialized to at least the minimum default
  React.useEffect(() => {
    if (photoCount < DEFAULT_MIN_COUNT) {
      setPhotoCount(DEFAULT_MIN_COUNT);
    }
  }, [photoCount, setPhotoCount]);

  const handleSelectCount = (count: number) => {
    setPhotoCount(count);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Select Number of Passport Photos:
      </label>
      <div className="flex flex-wrap gap-3">
        {PHOTO_COUNT_OPTIONS.map((count) => (
          <button
            key={count}
            onClick={() => handleSelectCount(count)}
            // Conditional styling based on selection
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150
              ${
                photoCount === count
                  ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }
            `}
          >
            **{count} Photos**
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-gray-500">
        Current Selection: **{photoCount}**
      </p>
    </div>
  );
}