'use client';

import React from 'react';
import { usePhoto } from '@/context/photoeditor';

export default function PhotoCountSelector() {
  const { photoCount, setPhotoCount } = usePhoto();

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Number of Photos: {photoCount}
      </label>
      <input
        type="range"
        min="1"
        max="8"
        value={photoCount}
        onChange={(e) => setPhotoCount(Number(e.target.value))}
        className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>1</span>
        <span>8</span>
      </div>
    </div>
  );
}