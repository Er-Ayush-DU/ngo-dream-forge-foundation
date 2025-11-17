"use client";

import react from 'react';
import Navbar from '@/components/Navbar';


export default function mission() {
  return (
    <>
      <Navbar />
      <div>
        <section className="py-20 bg-[#171719] min-h-screen">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-center mb-12 text-white">Our Mission <span className='text-[#196bdf]'>& Objectives</span></h1>
            <div className="space-y-8 text-lg text-gray-300 max-w-4xl mx-auto">
              <p>
                At Dream Forge Foundation, our mission is to empower youth with quality education, mentorship, and opportunities while promoting fairness, transparency, and equal access in academic and professional fields. We strive to create an India where every student, regardless of background or geography, has equal access to knowledge, opportunities, and platforms to rise and lead.
              </p>
              <p>
                Our objectives include:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Providing scholarships and financial aid to deserving students.</li>
                <li>Offering mentorship programs to guide students in their academic and career paths.</li>
                <li>Organizing workshops, seminars, and training sessions to enhance skills and knowledge.</li>
                <li>Promoting transparency and fairness in all our initiatives.</li>
                <li>Building partnerships with educational institutions and industry leaders to create more opportunities for students.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>


    </>
  )
}
