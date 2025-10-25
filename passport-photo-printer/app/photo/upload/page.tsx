// passport-photo-printer/app/photo/upload/page.tsx
'use client';

import React, { useState } from 'react';
import { Upload, ArrowLeft, Wand2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePhoto } from '@/context/photoeditor';
import Link from 'next/link';

export default function PhotoUploadPage() {
  const router = useRouter();
  const { setUploadedImage, setOriginalImage } = usePhoto();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setPreviewImage(imageData);
        setOriginalImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = () => {
    if (previewImage) {
      setUploadedImage(previewImage);
      router.push('/photo/remove-bg');
    }
  };

  const handleSkipToEditor = () => {
    if (previewImage) {
      setUploadedImage(previewImage);
      router.push('/photo/editor');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">
          Upload Your Photo
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!previewImage ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Choose a Photo
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center gap-4 w-full px-6 py-16 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                >
                  <Upload className="w-16 h-16 text-indigo-600" />
                  <span className="text-indigo-600 font-medium text-lg">
                    Click to Choose Photo
                  </span>
                  <span className="text-gray-500 text-sm">
                    Accepts JPG, PNG, or other image formats
                  </span>
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <img
                  src={previewImage}
                  alt="Uploaded"
                  className="max-w-md mx-auto rounded-lg shadow-md"
                />
                <button
                  onClick={() => setPreviewImage(null)}
                  className="mt-4 text-indigo-600 hover:text-indigo-800 underline"
                >
                  Change Photo
                </button>
              </div>

              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  Do you want to remove the background?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleRemoveBackground}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                  >
                    <Wand2 className="w-5 h-5" />
                    Yes, Remove Background
                  </button>
                  <button
                    onClick={handleSkipToEditor}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
                  >
                    Skip & Continue
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-center text-sm text-gray-600 mt-3">
                  Background removal adds a clean white background (recommended for passport photos)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}