'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PhotoContextType {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  photoCount: number;
  setPhotoCount: (count: number) => void;
  borderColor: string;
  setBorderColor: (color: string) => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export function PhotoProvider({ children }: { children: ReactNode }) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [photoCount, setPhotoCount] = useState<number>(4);
  const [borderColor, setBorderColor] = useState<string>('#000000');

  return (
    <PhotoContext.Provider
      value={{
        uploadedImage,
        setUploadedImage,
        photoCount,
        setPhotoCount,
        borderColor,
        setBorderColor,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhoto() {
  const context = useContext(PhotoContext);
  if (context === undefined) {
    throw new Error('usePhoto must be used within a PhotoProvider');
  }
  return context;
}