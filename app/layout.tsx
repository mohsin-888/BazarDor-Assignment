import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের বাজারদর এক নজরে",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>

        <Suspense
          fallback={
           <header className="border-b border-gray-200 bg-white">
              <div className="mx-auto max-w-6xl px-4 py-5">
               <div className="h-8 w-40 animate-pulse rounded bg-gray-200"></div>
              </div>
            </header>
          }
        >
          <Navbar />
        </Suspense>

        {children}

        <Footer />

      </body>
    </html>
  );
}