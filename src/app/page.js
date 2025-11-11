// src/app/page.js
'use client';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GoalsMission from '@/components/GoalsMission';
import EducationalPrograms from '@/components/EducationalPrograms';
import EducationalPublications from '@/components/EducationalPublications';
import OurImpact from '@/components/OurImpact';

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
      {session?.user?.role !== 'ADMIN' && <Navbar session={session} />}

      <div>
        <Hero />
        <GoalsMission />

        <div id="programs-section">
          <EducationalPrograms />
        </div>

        <div id="publications-section">
          <EducationalPublications />
        </div>

        <div id="impact-section">
          <OurImpact />
        </div>
      </div>

      {/* ADMIN NAHI → ADMIN LOGIN BUTTON */}
      {session?.user?.role !== 'ADMIN' && !session && (
        <section className="py-20 bg-gradient-to-r from-violet-600 to-indigo-600">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Admin Access</h2>
            <a
              href="/admin/login"
              className="inline-block px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition"
            >
              Admin Login
            </a>
          </div>
        </section>
      )}
    </>
  );
}