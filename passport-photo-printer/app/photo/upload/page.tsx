// app/photo/upload/page.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Camera, Upload, ArrowLeft, Wand2, ArrowRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePhoto } from '@/context/photoeditor';
import Link from 'next/link';

export default function PhotoUploadPage() {
  const router = useRouter();
  const { setUploadedImage, setOriginalImage } = usePhoto();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

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
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-indigo-800">
      {/* Header */}
      <div className="sticky top-0 bg-indigo-700 shadow-lg z-10">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">Upload Photo</h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="p-4">
        {!previewImage ? (
          <div className="space-y-4">
            {/* Camera Button */}
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="w-full bg-white rounded-3xl p-8 shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Take Photo</h2>
              <p className="text-gray-600 text-sm">Use your camera</p>
            </button>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-white rounded-3xl p-8 shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Choose Photo</h2>
              <p className="text-gray-600 text-sm">From gallery</p>
            </button>

            {/* Info Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-3">📸 Photo Tips</h3>
              <ul className="space-y-2 text-sm text-indigo-100">
                <li>• Good lighting on face</li>
                <li>• Plain background</li>
                <li>• Face clearly visible</li>
                <li>• Neutral expression</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Preview Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full rounded-2xl"
                />
                <button
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 active:scale-95 transition-transform"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleRemoveBackground}
                className="w-full bg-white rounded-2xl p-6 shadow-xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Wand2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-800">Remove Background</h3>
                    <p className="text-sm text-gray-600">Recommended for passport</p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-indigo-600" />
              </button>

              <button
                onClick={handleSkipToEditor}
                className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white font-semibold hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Skip & Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}