// app/photo/editor/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Printer, Palette, Grid3x3, Download } from 'lucide-react';
import { usePhoto } from '@/context/photoeditor';
import Link from 'next/link';

const PHOTO_WIDTH_MM = 33;
const PHOTO_HEIGHT_MM = 42.4;
const PHOTO_GAP_MM = 2;
const COLUMNS = 6;

export default function PhotoEditorPage() {
  const router = useRouter();
  const { uploadedImage, photoCount, setPhotoCount, borderColor, setBorderColor } = usePhoto();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showCountPicker, setShowCountPicker] = useState(false);

  useEffect(() => {
    if (!uploadedImage) {
      router.push('/photo/upload');
    }
  }, [uploadedImage, router]);

  const handlePrint = () => {
    if (!uploadedImage) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Photos</title>
          <style>
            @media print {
              @page { size: A4; margin: 0; }
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { background: white; }
            .print-container {
              display: grid;
              grid-template-columns: repeat(${COLUMNS}, ${PHOTO_WIDTH_MM}mm);
              gap: ${PHOTO_GAP_MM}mm;
            }
            .photo-wrapper {
              width: ${PHOTO_WIDTH_MM}mm;
              height: ${PHOTO_HEIGHT_MM}mm;
              border: 3px solid ${borderColor};
              overflow: hidden;
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
            ${Array(photoCount).fill('').map(() => `
              <div class="photo-wrapper">
                <img src="${uploadedImage}" alt="Photo" />
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 250);
  };

  if (!uploadedImage) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-indigo-800 pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-indigo-700 shadow-lg z-20">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">Edit Photos</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Preview */}
      <div className="p-4">
        <div className="bg-white rounded-3xl p-4 shadow-xl mb-4">
          <div className="overflow-x-auto">
            <div
              className="grid mx-auto"
              style={{
                gridTemplateColumns: `repeat(${Math.min(COLUMNS, photoCount)}, minmax(50px, 1fr))`,
                gap: '4px',
                maxWidth: '100%'
              }}
            >
              {Array(Math.min(6, photoCount)).fill(null).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[33/42.4] overflow-hidden rounded"
                  style={{ border: `2px solid ${borderColor}` }}
                >
                  <img src={uploadedImage} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-gray-600 mt-3">
            {photoCount} photos • 33×42.4mm • 6 per row
          </p>
        </div>

        {/* Settings Cards */}
        <div className="space-y-3 mb-4">
          {/* Count Selector */}
          <button
            onClick={() => setShowCountPicker(!showCountPicker)}
            className="w-full bg-white rounded-2xl p-4 shadow-xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                <Grid3x3 className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800">Photo Count</h3>
                <p className="text-sm text-gray-600">{photoCount} photos</p>
              </div>
            </div>
          </button>

          {showCountPicker && (
            <div className="bg-white rounded-2xl p-4 shadow-xl">
              <div className="grid grid-cols-3 gap-2">
                {[4, 6, 8, 12, 16, 24].map(count => (
                  <button
                    key={count}
                    onClick={() => {
                      setPhotoCount(count);
                      setShowCountPicker(false);
                    }}
                    className={`p-3 rounded-xl font-semibold transition-all ${
                      photoCount === count
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="w-full bg-white rounded-2xl p-4 shadow-xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full border-4 border-gray-200"
                style={{ backgroundColor: borderColor }}
              />
              <div className="text-left">
                <h3 className="font-bold text-gray-800">Border Color</h3>
                <p className="text-sm text-gray-600">{borderColor}</p>
              </div>
            </div>
          </button>

          {showColorPicker && (
            <div className="bg-white rounded-2xl p-4 shadow-xl">
              <input
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                className="w-full h-32 rounded-xl cursor-pointer"
              />
              <div className="grid grid-cols-6 gap-2 mt-3">
                {['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#00FF00', '#FFD700'].map(color => (
                  <button
                    key={color}
                    onClick={() => setBorderColor(color)}
                    className="w-full aspect-square rounded-lg border-2 border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 z-20">
        <button
          onClick={handlePrint}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-4 font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Printer className="w-6 h-6" />
          Print Photos
        </button>
      </div>
    </div>
  );
}