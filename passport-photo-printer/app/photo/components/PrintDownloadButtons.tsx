'use client';

import React from 'react';
import { Printer, Download } from 'lucide-react';
import { usePhoto } from '@/context/photoeditor';

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
            @media print {
              @page {
                size: A4;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
              }
            }
            body {
              margin: 0;
              padding: 20mm;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 297mm;
              width: 210mm;
            }
            .print-container {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10mm;
              width: 100%;
              max-width: 170mm;
            }
            .photo-wrapper {
              width: 35mm;
              height: 45mm;
              border: 2px solid ${borderColor};
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              background: white;
            }
            .photo-wrapper img {
              width: 100%;
              height: 100%;
              object-fit: cover;
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

  const handleDownload = () => {
    if (!uploadedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // A4 size at 300 DPI: 2480 x 3508 pixels
    canvas.width = 2480;
    canvas.height = 3508;

    // White background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = () => {
      // Passport photo size: 35mm x 45mm
      // At 300 DPI: 413 x 531 pixels
      const photoWidth = 413;
      const photoHeight = 531;
      const borderWidth = 8;
      const gap = 118; // 10mm gap

      const cols = 2;
      const rows = Math.ceil(photoCount / cols);

      const startX = (canvas.width - (cols * photoWidth + (cols - 1) * gap)) / 2;
      const startY = 236; // Top margin

      for (let i = 0; i < photoCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = startX + col * (photoWidth + gap);
        const y = startY + row * (photoHeight + gap);

        // Draw border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(x, y, photoWidth, photoHeight);

        // Draw image
        ctx.drawImage(
          img,
          x + borderWidth / 2,
          y + borderWidth / 2,
          photoWidth - borderWidth,
          photoHeight - borderWidth
        );
      }

      // Download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'passport-photos.png';
        a.click();
        URL.revokeObjectURL(url);
      });
    };
    img.src = uploadedImage;
  };

  return (
    <div className="flex gap-3 pt-4">
      <button
        onClick={handlePrint}
        disabled={!uploadedImage}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
      >
        <Printer className="w-5 h-5" />
        Print
      </button>
      <button
        onClick={handleDownload}
        disabled={!uploadedImage}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
      >
        <Download className="w-5 h-5" />
        Download
      </button>
    </div>
  );
}