'use client';

import React from 'react';
import { usePhoto } from '@/context/photoeditor';

export default function BorderColorSelector() {
  const { borderColor, setBorderColor } = usePhoto();

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Border Color
      </label>
      <div className="flex gap-3 items-center">
        <input
          type="color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
          className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
        />
        <input
          type="text"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}