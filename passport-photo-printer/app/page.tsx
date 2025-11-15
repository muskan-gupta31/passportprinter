// app/page.tsx
import Link from 'next/link';
import { Camera, Sparkles, Settings, Info } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-indigo-800 text-white">
      {/* Header */}
      <div className="pt-12 pb-8 px-6 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Camera className="w-12 h-12 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Passport Photos</h1>
        <p className="text-indigo-200 text-sm">Quick & Professional</p>
      </div>

      {/* Main Action Card */}
      <div className="px-6 pb-8">
        <Link
          href="/photo/upload"
          className="block bg-white rounded-3xl p-8 shadow-2xl text-center hover:scale-105 transition-transform active:scale-95"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-14 h-14 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Take Photo</h2>
          <p className="text-gray-600 mb-4">Start creating your passport photos</p>
          <div className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold">
            Get Started →
          </div>
        </Link>
      </div>

      {/* Feature Grid */}
      <div className="px-6 pb-12">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <Sparkles className="w-10 h-10 mx-auto mb-3 text-yellow-300" />
            <h3 className="font-semibold mb-1">AI Background</h3>
            <p className="text-xs text-indigo-200">Auto remove</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <Settings className="w-10 h-10 mx-auto mb-3 text-green-300" />
            <h3 className="font-semibold mb-1">Customize</h3>
            <p className="text-xs text-indigo-200">Border & size</p>
          </div>
        </div>
      </div>

    
    </div>
  );
}