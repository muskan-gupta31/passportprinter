'use client';

import React from 'react';
import PhotoUploader from './PhotoUploader';
import PhotoCountSelector from './PhotoCountSelector';
import BorderColorSelector from './BorderColorSelector';
import PhotoPreview from './PhotoPreview';
import PrintDownloadButtons from './PrintDownloadButtons';
import A4LayoutPreview from './A4LayoutPreview';

export default function PhotoEditor() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">
          Passport Photo Printer
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Panel - Controls */}
            <div className="space-y-6">
              <PhotoUploader />
              <PhotoCountSelector />
              <BorderColorSelector />
              <PrintDownloadButtons />
            </div>

            {/* Right Panel - Preview */}
            <PhotoPreview />
          </div>
        </div>

        {/* A4 Layout Preview */}
        <A4LayoutPreview />
      </div>
    </div>
  );
}