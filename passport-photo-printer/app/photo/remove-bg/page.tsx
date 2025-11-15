// passport-photo-printer/app/photo/remove-bg/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePhoto } from '@/context/photoeditor';
import { removeBackground } from '@imgly/background-removal';

export default function RemoveBackgroundPage() {
    const router = useRouter();
    const { uploadedImage, setUploadedImage, originalImage } = usePhoto();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const progressRef = useRef(0);

    const resizeImage = (file: File, maxWidth = 400): Promise<File> => {
        return new Promise((resolve) => {
            const img = new Image();
            const url = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const scale = maxWidth / img.width;
                const width = Math.min(img.width, maxWidth);
                const height = img.height * (img.width > maxWidth ? scale : 1);
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d')!;
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    resolve(new File([blob!], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
                    URL.revokeObjectURL(url);
                }, 'image/jpeg', 0.8);
            };
            img.src = url;
        });
    };

    const dataURLtoFile = (dataUrl: string, filename: string): File => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const updateProgress = (value: number) => {
        // Only update if new value is higher than current
        if (value > progressRef.current) {
            progressRef.current = value;
            setProgress(value);
        }
    };

    const handleRemoveBackground = async () => {
        if (!uploadedImage) return;

        setLoading(true);
        setError(null);
        progressRef.current = 0;
        setProgress(0);

        try {
            updateProgress(5);
            const file = dataURLtoFile(uploadedImage, 'photo.jpg');
            
            updateProgress(10);
            // Smaller size = much faster processing
            const resized = await resizeImage(file, 400);

            updateProgress(15);
            
            // Remove background with progress tracking
            const result = await removeBackground(resized, {
                progress: (key, current, total) => {
                    // Map background removal progress to 15-85%
                    const bgProgress = 15 + (current / total) * 70;
                    updateProgress(Math.min(bgProgress, 85));
                },
                model: 'small',
                output: {
                    format: 'image/png',
                    quality: 0.8,
                }
            });

            updateProgress(87);

            const img = new Image();
            const blob = new Blob([result], { type: 'image/png' });
            img.src = URL.createObjectURL(blob);
            await img.decode();

            updateProgress(92);

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d', { alpha: false })!;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            updateProgress(96);

            const finalBlob = await new Promise<Blob>((resolve) =>
                canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.9)
            );

            const url = URL.createObjectURL(finalBlob);
            setProcessedImage(url);
            updateProgress(100);

            // Clean up
            URL.revokeObjectURL(img.src);
        } catch (err) {
            console.error('Error removing background:', err);
            setError('Failed to remove background. Please try a different photo.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (uploadedImage) {
            handleRemoveBackground();
        } else {
            router.push('/photo/upload');
        }
    }, []);

    const handleUseProcessed = () => {
        if (processedImage) {
            setUploadedImage(processedImage);
            router.push('/photo/editor');
        }
    };

    const handleUseOriginal = () => {
        if (originalImage) {
            setUploadedImage(originalImage);
            router.push('/photo/editor');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => router.push('/photo/upload')}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
                    disabled={loading}
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </button>

                <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">
                    🪄 Removing Background
                </h1>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="#e5e7eb"
                                        strokeWidth="8"
                                        fill="none"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="#4f46e5"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeDasharray={`${2 * Math.PI * 56}`}
                                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                                        className="transition-all duration-500 ease-out"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-indigo-600">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                            </div>
                            <p className="text-blue-600 text-lg font-semibold">Processing your image...</p>
                            <p className="text-gray-500 text-sm mt-2">
                                {progress < 15 ? 'Preparing image...' :
                                 progress < 85 ? 'Removing background...' :
                                 progress < 96 ? 'Applying white background...' :
                                 'Finalizing...'}
                            </p>
                            <div className="mt-4 w-64 mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div 
                                    className="bg-indigo-600 h-full transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-16">
                            <p className="text-red-600 text-lg mb-4">{error}</p>
                            <button
                                onClick={() => router.push('/photo/upload')}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                            >
                                Try Different Photo
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-center font-semibold mb-3 text-gray-800">Original</h3>
                                    {originalImage ? (
                                        <img
                                            src={originalImage}
                                            alt="Original"
                                            className="w-full rounded-xl shadow-md"
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-center font-semibold mb-3 text-gray-800">White Background</h3>
                                    {processedImage ? (
                                        <img
                                            src={processedImage}
                                            alt="Processed"
                                            className="w-full rounded-xl shadow-md bg-white border-2 border-gray-200"
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">
                                            Processing...
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <button
                                    onClick={handleUseProcessed}
                                    disabled={!processedImage}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Use White Background
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleUseOriginal}
                                    className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
                                >
                                    Use Original Photo
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}