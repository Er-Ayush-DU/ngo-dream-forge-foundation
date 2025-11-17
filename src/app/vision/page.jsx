"use client";

import react from 'react';
import Navbar from '@/components/Navbar';

export default function vision() {
  return (
    <>
    <Navbar />
      <div>
        <section className="py-20 bg-[#171719] min-h-screen">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-center mb-12 text-white">Our Vision <span className='text-[#196bdf]'>& Objectives</span></h1>
            <div className="space-y-8 text-lg text-gray-300 max-w-4xl mx-auto">
              <p>
                At Dream Forge Foundation, our vision is to create an India where every student, regardless of background or geography, has equal access to knowledge, opportunities, and platforms to rise and lead. We envision a future where education is a right, not a privilege, and where transparency and fairness are the cornerstones of all academic and professional endeavors.
              </p>
              <p>
                Our objectives include:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Bridging the educational divide by providing resources and support to underprivileged students.</li>
                <li>Fostering a culture of mentorship and guidance to help students navigate their academic and career paths.</li>
                <li>Organizing initiatives that promote transparency and fairness in educational and professional settings.</li>
                <li>Collaborating with educational institutions, industry leaders, and communities to create more opportunities for students.</li>
                <li>Advocating for policies that ensure equal access to quality education for all.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}