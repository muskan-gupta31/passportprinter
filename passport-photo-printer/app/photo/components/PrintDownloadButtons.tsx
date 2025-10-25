// passport-photo-printer/app/photo/components/PrintDownloadButtons.tsx
'use client';

import React from 'react';
import { Printer } from 'lucide-react';
import { usePhoto } from '@/context/photoeditor';

const PHOTO_WIDTH_MM = 33;
const PHOTO_HEIGHT_MM = 42.4;
const PHOTO_GAP_MM = 2;
const COLUMNS = 6;

export default function PrintDownloadButtons() {
  const { uploadedImage, photoCount, borderColor } = usePhoto();

  const handlePrint = () => {
    if (!uploadedImage) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Passport Photos</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            @media print {
              @page {
                size: A4;
                margin: 0; 
              }
            }
            
            body {
              margin: 0;
              padding: 0;
              background: white;
            }
            
            .print-container {
              display: grid;
              grid-template-columns: repeat(${COLUMNS}, ${PHOTO_WIDTH_MM}mm);
              gap: ${PHOTO_GAP_MM}mm;
              padding: 0;
              margin: 0;
            }
            
            .photo-wrapper {
              width: ${PHOTO_WIDTH_MM}mm;
              height: ${PHOTO_HEIGHT_MM}mm;
              border: 3px solid ${borderColor};
              overflow: hidden;
              background: white;
            }
            
            .photo-wrapper img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${Array(photoCount)
              .fill('')
              .map(
                () => `
              <div class="photo-wrapper">
                <img src="${uploadedImage}" alt="Passport Photo" />
              </div>
            `
              )
              .join('')}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="flex gap-3 pt-4">
      <button
        onClick={handlePrint}
        disabled={!uploadedImage}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
      >
        <Printer className="w-5 h-5" />
        Print A4 Layout (6 Across)
      </button>
    </div>
  );
}