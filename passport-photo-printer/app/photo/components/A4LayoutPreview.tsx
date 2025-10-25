// passport-photo-printer/app/photo/components/A4LayoutPreview.tsx
'use client';

import React from 'react';
import { usePhoto } from '@/context/photoeditor';

// New size for 6-across on A4
const PHOTO_WIDTH_MM = 33; 
const PHOTO_HEIGHT_MM = 42.4; 
const PHOTO_GAP_MM = 2;
const COLUMNS = 6;

export default function PhotoPreview() {
  const { uploadedImage, borderColor, photoCount } = usePhoto();
  
  // Screen sizing (1mm ≈ 4px for rough preview)
  const previewWidthPx = PHOTO_WIDTH_MM * 4;
  const previewHeightPx = PHOTO_HEIGHT_MM * 4;
  const previewGapPx = PHOTO_GAP_MM * 4;

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
      {uploadedImage ? (
        <div className="bg-white p-4 rounded-lg shadow-inner overflow-auto">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${COLUMNS}, ${previewWidthPx}px)`,
              gap: `${previewGapPx}px`,
            }}
          >
            {Array(photoCount)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden bg-white"
                  style={{ 
                    width: `${previewWidthPx}px`,
                    height: `${previewHeightPx}px`,
                    border: `3px solid ${borderColor}` 
                  }}
                >
                  <img
                    src={uploadedImage}
                    alt={`Passport Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            <strong>Actual Print Size:</strong> {PHOTO_WIDTH_MM.toFixed(1)}mm × {PHOTO_HEIGHT_MM.toFixed(1)}mm 
            <br />
            ({photoCount} photos in 6-column layout)
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