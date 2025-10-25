import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PhotoProvider } from "@/context/photoeditor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Passport Photo Printer",
  description: "Print passport sized photos on A4 paper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PhotoProvider>
          {children}
        </PhotoProvider>
      </body>
    </html>
  );
}