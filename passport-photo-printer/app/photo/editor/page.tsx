// passport-photo-printer/app/photo/editor/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
import { usePhoto } from '@/context/photoeditor';
import PhotoCountSelector from '../components/PhotoCountSelector';
import BorderColorSelector from '../components/BorderColorSelector';
import PhotoPreview from '../components/PhotoPreview';
import PrintDownloadButtons from '../components/PrintDownloadButtons';
import Link from 'next/link';

export default function PhotoEditorPage() {
  const router = useRouter();
  const { uploadedImage } = usePhoto();

  useEffect(() => {
    if (!uploadedImage) {
      router.push('/photo/upload');
    }
  }, [uploadedImage, router]);

  if (!uploadedImage) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">
          Passport Photo Editor
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Panel - Controls */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Current Photo
                </label>
                <img
                  src={uploadedImage}
                  alt="Current"
                  className="w-full max-w-xs rounded-lg shadow-md"
                />
                <button
                  onClick={() => router.push('/photo/upload')}
                  className="mt-3 text-indigo-600 hover:text-indigo-800 underline text-sm"
                >
                  Change Photo
                </button>
              </div>

              <PhotoCountSelector />
              <BorderColorSelector />
              <PrintDownloadButtons />
            </div>

            {/* Right Panel - Preview */}
            <PhotoPreview />
          </div>
        </div>
      </div>
    </div>
  );
}