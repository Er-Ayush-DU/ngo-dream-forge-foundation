// src/components/AboutSection.jsx
"use client";

import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="py-20 px-6 bg-[#171719]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="inline-block px-8 py-4 text-4xl md:text-5xl font-bold">
            About <span className='text-[#194bfd]'>Us</span>
          </h2>
          <div className="h-1 w-32 bg-yellow-600 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 font-medium">
          Dream Forge Foundation (DFF) is a registered non-profit organization committed to transforming
          education and empowering youth across India. Established with a belief that “talent is equal
          everywhere, but opportunities are not,”DFF strives to bridge the gap between Tier-1 and Tier-3
          India.
        </p>

        {/* View More Button */}
        <Link href="/about">
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105">
            VIEW MORE
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </Link>
      </div>
    </section>
  );
}