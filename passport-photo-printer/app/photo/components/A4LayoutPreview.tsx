'use client';

import React from 'react';
import { usePhoto } from '@/context/photoeditor';

export default function A4LayoutPreview() {
  const { uploadedImage, photoCount, borderColor } = usePhoto();

  if (!uploadedImage) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        A4 Layout Preview
      </h3>
      <div
        className="bg-gray-50 p-8 rounded-lg mx-auto"
        style={{
          width: '210mm',
          minHeight: '297mm',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10mm',
            maxWidth: '170mm',
          }}
        >
          {Array(photoCount)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                style={{
                  width: '35mm',
                  height: '45mm',
                  border: `2px solid ${borderColor}`,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'white',
                }}
              >
                <img
                  src={uploadedImage}
                  alt={`Photo ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}