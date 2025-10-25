'use client';

import React from 'react';
import { usePhoto } from '@/context/photoeditor';

export default function PhotoPreview() {
  const { uploadedImage, borderColor } = usePhoto();

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
      {uploadedImage ? (
        <div className="bg-white p-4 rounded-lg shadow-inner">
          <div
            className="w-32 h-40 mx-auto rounded overflow-hidden"
            style={{ border: `3px solid ${borderColor}` }}
          >
            <img
              src={uploadedImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Passport Size: 35mm × 45mm
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <p className="text-gray-400">Upload a photo to see preview</p>
        </div>
      )}
    </div>
  );
}