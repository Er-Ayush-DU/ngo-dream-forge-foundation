"use client";

import React from "react";
import Navbar from "@/components/Navbar";

export default function values() {
  return (
    <>
      <Navbar />
      <div>
        <section className="py-20 bg-[#171719] min-h-screen">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-center mb-12 text-white">Our <span className="text-[#196bdf]">Values</span></h1>
            <div className="space-y-8 text-lg text-gray-300 max-w-4xl mx-auto">
              <p>
                At Dream Forge Foundation, our core values are Purity, Transparency, Sustainability, and Care. We believe in handpicking every ingredient with love and responsibility toward people and planet. These values guide our actions and decisions as we strive to create a positive impact in the lives of students and the broader community.
              </p>
              <p>
                Our values include:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Purity: We are committed to maintaining the highest standards of integrity and honesty in all our initiatives.</li>
                <li>Transparency: We believe in open communication and accountability to our stakeholders, ensuring that our processes and decisions are clear and accessible.</li>
                <li>Sustainability: We are dedicated to promoting sustainable practices that protect the environment and ensure long-term benefits for future generations.</li>
                <li>Care: We prioritize the well-being of our students, staff, and community, fostering a supportive and nurturing environment.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}