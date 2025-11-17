// src/app/about/page.js
"use client";

import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#171719] py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE - PRODUCT IMAGE + STATS */}
            <div className="relative">
              {/* Main Product Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 text-center relative overflow-hidden">
                <Image
                  src="/about_image.png" // ← Apni image daal dena public folder mein
                  alt="AU Natural Organics Jojoba Oil"
                  width={600}
                  height={800}
                  className="mx-auto rounded-lg shadow-lg"
                />

                {/* Reviews Badge */}
                <div className="absolute bottom-4 left-8 bg-white rounded-full shadow-xl px-6 py-3 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white" />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">8000+ reviews</p>
                  </div>
                </div>

                {/* Monthly Members Badge */}
                <div className="absolute top-8 right-8 bg-white rounded-2xl shadow-xl px-6 py-4">
                  <p className="text-xs text-gray-600">Monthly Members</p>
                  <p className="text-3xl font-bold text-green-600">5000+</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - TEXT CONTENT */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                About <span className='text-[#194bdf]'>Us</span>
              </h1>

              <div className="text-lg text-[#e6e6e62c] space-y-5 leading-relaxed">
                <p>
                  <strong>Dream Forge Foundation (DFF)</strong>is a registered non-profit organization committed to transforming
                  education and empowering youth across India. Established with a belief that "talent is equal
                  everywhere, but opportunities are not," DFF strives to bridge the gap between Tier-1 and Tier-3
                  India.
                </p>
                <p>
                  For decades, entry into premier institutions like <strong>IITs, IIMs, AIIMS</strong>, and top central universities has
                  been dominated by students from Tier-1 cities. This dominance was not due to higher capability, but
                  because of greater access to resources, coaching, exposure, and networks. Students from Tier-3
                  districts and rural areas, despite having immense potential, have often been left behind.

                </p>

                <p>
                  At <strong>DFF</strong>, we aim to break this barrier. Through our flagship programs, talent benchmark
                  examinations, mentorship initiatives, and academic outreach, we provide students from smaller
                  towns and rural belts the same platform and exposure enjoyed by their peers in metro cities.
                </p>
              </div>


            </div>

          </div>
        </div>
      </div>
    </>
  );
}