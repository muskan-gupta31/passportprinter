import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PhotoProvider } from "@/context/photoeditor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Passport Photo Printer",
  description: "Print passport sized photos on A4 paper",
  manifest: "/manifest.json",
  themeColor: "#0f172a",
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-512x512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Optional but good for mobile and PWA */}
        <meta name="theme-color" content="#0f172a" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-512x512.png" />
      </head>
      <body className={inter.className}>
        <PhotoProvider>{children}</PhotoProvider>
      </body>
    </html>
  );
}
