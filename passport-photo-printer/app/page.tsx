// passport-photo-printer/app/page.tsx
import Link from 'next/link';
import { Camera, Printer, Image, Wand2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Camera className="w-24 h-24 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">
            Passport Photo Printer
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Create professional passport photos ready for printing on A4 paper
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Features</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-4">
              <Image className="w-12 h-12 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Upload Photo</h3>
              <p className="text-gray-600">
                Upload any photo and format it to passport size (33mm × 42.4mm)
              </p>
            </div>
            <div className="p-4">
              <Wand2 className="w-12 h-12 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Remove Background</h3>
              <p className="text-gray-600">
                Optional AI background removal with clean white background
              </p>
            </div>
            <div className="p-4">
              <Printer className="w-12 h-12 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Print or Download</h3>
              <p className="text-gray-600">
                Print directly on A4 paper (6 photos per sheet)
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/photo/upload"
          className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
        >
          <Camera className="w-6 h-6" />
          Start Creating Photos
        </Link>

        <div className="mt-8 text-sm text-gray-600">
          <p>✓ Standard passport size (33mm × 42.4mm)</p>
          <p>✓ A4 paper format (6 photos per sheet)</p>
          <p>✓ Custom border colors</p>
          <p>✓ Optional background removal</p>
        </div>
      </div>
    </div>
  );
}