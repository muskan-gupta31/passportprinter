'use client'

import React, { useState } from 'react'
import { removeBackground } from '@imgly/background-removal'

export default function RemoveBackgroundPage() {
  const [inputImage, setInputImage] = useState<string | null>(null)
  const [outputImage, setOutputImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const resizeImage = (file: File, maxWidth = 800): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const scale = maxWidth / img.width
        const width = Math.min(img.width, maxWidth)
        const height = img.height * (img.width > maxWidth ? scale : 1)
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob((blob) => {
          resolve(new File([blob!], file.name, { type: 'image/png' }))
        }, 'image/png')
      }
      img.src = url
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setInputImage(URL.createObjectURL(file))
    setLoading(true)

    try {
      // Resize before processing → faster
      const resized = await resizeImage(file)

      // Remove background
      const result = await removeBackground(resized)

      // Draw with white background
      const img = new Image()
      img.src = URL.createObjectURL(new Blob([result], { type: 'image/png' }))
      await img.decode()

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = '#ffffff' // white background
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)

      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), 'image/png')
      )

      const url = URL.createObjectURL(blob)
      setOutputImage(url)
    } catch (err) {
      console.error('Error removing background:', err)
      alert('Failed to remove background')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">🪄 Background Remover (White BG)</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-6"
      />

      {loading && <p className="text-blue-600 animate-pulse">Processing...</p>}

      <div className="flex gap-8 mt-6">
        {inputImage && (
          <div>
            <h3 className="text-center font-semibold mb-2">Original</h3>
            <img
              src={inputImage}
              alt="Original"
              className="max-w-xs rounded-xl shadow-md"
            />
          </div>
        )}

        {outputImage && (
          <div>
            <h3 className="text-center font-semibold mb-2">With White Background</h3>
            <img
              src={outputImage}
              alt="Output"
              className="max-w-xs rounded-xl shadow-md bg-white"
            />
            <a
              href={outputImage}
              download="white-bg.png"
              className="block text-center mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
