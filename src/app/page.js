// src/app/page.js
'use client';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EducationalPrograms from '@/components/EducationalPrograms';
import EducationalPublications from '@/components/EducationalPublications';
import OurImpact from '@/components/OurImpact';
import About from '@/components/About';
import VisionMissionValues from '@/components/VisionMissionValues';
import ContactUs from '@/components/ContactUs';

export default function Home() {
  const { data: session, status } = useSession();

  // LOADING MEIN RUKO
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      {/* ADMIN HAI → NAVBAR HATAAO */}
      <Navbar />

      <div>

        <div>
          <Hero />
        </div>

        <div id="about-section">
          <About />
        </div>

        <div>
          <VisionMissionValues />
        </div>

        <div id="programs-section">
          <EducationalPrograms />
        </div>

        <div id="publications-section">
          <EducationalPublications />
        </div>

        <div id="impact-section">
          <OurImpact />
        </div>

        <div id="contact-section">
          <ContactUs />
        </div>

      </div>

    </>
  );
}