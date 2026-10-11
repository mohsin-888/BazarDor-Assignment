"use client";

import { useEffect, useState } from "react";

const Hero = () => {
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    const date = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    setBanglaDate(date);
  }, []);

  return (
    <section className="bg-gray-50 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-8 rounded-3xl border border-gray-200 bg-white px-6 py-10 shadow-sm md:grid-cols-2 md:px-10 lg:px-14">

          {/* Left Side */}
          <div>
            <div className="inline-block rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              {banglaDate || "আজকের বাজারদর"}
            </div>

            <h1 className="mt-5 max-w-xl text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              আজকের বাজারের দাম
              <span className="block text-green-700">
                এক নজরে
              </span>
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-gray-600">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, সর্বনিম্ন-সর্বোচ্চ এবং দামের
              পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-7 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              সব পণ্য দেখুন
            </a>
          </div>
          <div className="flex items-center justify-center">
            <svg
              viewBox="0 0 500 350"
              className="w-full max-w-md"
              role="img"
              aria-label="বাজারের পণ্যের ঝুড়ি"
            >         
              <ellipse
                cx="260"
                cy="315"
                rx="145"
                ry="22"
                fill="#e5e7eb"
              />

              {/* Basket */}
              <path
                d="M120 190 H400 L365 305 H155 Z"
                fill="#8b4513"
              />

        <path
                d="M135 210 H385"
                stroke="#5f2d0c"
                strokeWidth="12"
              />
              <path
                d="M180 205 L190 295"
                stroke="#5f2d0c"
                strokeWidth="9"
              />
              <path
                d="M235 205 L240 300"
                stroke="#5f2d0c"
                strokeWidth="9"
              />
              <path
                d="M290 205 L285 300"
                stroke="#5f2d0c"
                strokeWidth="9"
              />

              <path
                d="M345 205 L330 295"
                stroke="#5f2d0c"
                strokeWidth="9"
              />
              <circle
                cx="185"
                cy="160"
                r="48"
                fill="#ef4444"
              />

          <path
                d="M180 112 C185 90 205 88 215 105"
                fill="none"
                stroke="#15803d"
                strokeWidth="10"
                strokeLinecap="round"
              />

              <circle
                cx="285"
                cy="145"
                r="60"
                fill="#16a34a"
              />
              <circle
                cx="255"
                cy="135"
                r="32"
                fill="#22c55e"
              />
              <circle
                cx="310"
                cy="125"
                r="34"
                fill="#22c55e"
              />
              <path
                d="M290 85 C295 60 315 52 325 45"
                stroke="#166534"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
              />
              <circle
                cx="375"
                cy="165"
                r="38"
                fill="#f59e0b"
              />

              <circle
                cx="120"
                cy="175"
                r="30"
                fill="#7c3aed"
              />
              <circle
                cx="330"
                cy="180"
                r="28"
                fill="#f97316"
              />
                 </svg>
           </div>

         </div>
      </div>
        </section>
   );
};

export default Hero;