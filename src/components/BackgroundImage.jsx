// src/components/BackgroundImage.jsx
'use client';
import Image from 'next/image';

export default function BackgroundImage() {
  return (
    <>
      <div className="absolute inset-0 z-0">
        <Image
          src="/admin-bg.jpg"
          alt="Sci-Fi Portal"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>
    </>
  );
}