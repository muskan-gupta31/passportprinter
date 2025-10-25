// passport-photo-printer/app/photo/remove-bg/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePhoto } from '@/context/photoeditor';
import { removeBackground } from '@imgly/background-removal';

export default function RemoveBackgroundPage() {
    const router = useRouter();
    const { uploadedImage, setUploadedImage, originalImage } = usePhoto();
    const [loading, setLoading] = useState(false);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const resizeImage = (file: File, maxWidth = 800): Promise<File> => {
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
                    resolve(new File([blob!], file.name, { type: 'image/png' }));
                }, 'image/png');
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

    const handleRemoveBackground = async () => {
        if (!uploadedImage) return;

        setLoading(true);
        setError(null);

        try {
            const file = dataURLtoFile(uploadedImage, 'photo.png');
            const resized = await resizeImage(file);

            const result = await removeBackground(resized);

            const img = new Image();
            img.src = URL.createObjectURL(new Blob([result], { type: 'image/png' }));
            await img.decode();

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d')!;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            const blob = await new Promise<Blob>((resolve) =>
                canvas.toBlob((b) => resolve(b!), 'image/png')
            );

            const url = URL.createObjectURL(blob);
            setProcessedImage(url);
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
                            <Loader2 className="animate-spin h-16 w-16 text-indigo-600 mx-auto mb-4" />
                            <p className="text-blue-600 text-lg font-semibold">Processing your image...</p>
                            <p className="text-gray-500 text-sm mt-2">This may take a few seconds</p>
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
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
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