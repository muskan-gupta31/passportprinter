import Link from 'next/link';
import { Camera, Printer, Image } from 'lucide-react';

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
                Upload any photo and we'll format it to passport size (35mm × 45mm)
              </p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 text-indigo-600 mb-3 flex items-center justify-center text-2xl font-bold border-2 border-indigo-600 rounded">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Choose Quantity</h3>
              <p className="text-gray-600">
                Select 1-8 photos to print on a single A4 sheet
              </p>
            </div>
            <div className="p-4">
              <Printer className="w-12 h-12 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Print or Download</h3>
              <p className="text-gray-600">
                Print directly or download as PNG for later use
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/photo"
          className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
        >
          <Camera className="w-6 h-6" />
          Start Creating Photos
        </Link>

        <div className="mt-8 text-sm text-gray-600">
          <p>✓ Standard passport size (35mm × 45mm)</p>
          <p>✓ A4 paper format (210mm × 297mm)</p>
          <p>✓ Custom border colors</p>
        </div>
      </div>
    </div>
  );
}