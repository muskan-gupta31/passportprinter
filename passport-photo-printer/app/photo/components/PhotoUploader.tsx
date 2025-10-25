'use client';

import React from 'react';
import { Upload } from 'lucide-react';
import { usePhoto } from '@/context/photoeditor';

export default function PhotoUploader() {
  const { uploadedImage, setUploadedImage } = usePhoto();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Upload Photo
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
          className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all"
        >
          <Upload className="w-5 h-5 text-indigo-600" />
          <span className="text-indigo-600 font-medium">
            {uploadedImage ? 'Change Photo' : 'Choose Photo'}
          </span>
        </label>
      </div>
    </div>
  );
}