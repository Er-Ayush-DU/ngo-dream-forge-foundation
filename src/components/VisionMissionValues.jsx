// src/components/VisionMissionValues.jsx
import Link from 'next/link';
import { Lightbulb, Target, Handshake } from 'lucide-react';

const sections = [
  {
    title: "OUR MISSION",
    subtitle: "MISSION",
    icon: Lightbulb,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "Our mission is to empower youth with quality education, mentorship, and opportunities while promoting fairness, transparency, and equal access in academic and professional fields.",
    link: "/mission",
  },
  {
    title: "OUR VISION",
    subtitle: "VISION",
    icon: Target,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "To create an India where every student, regardless of background or geography, has equal access to knowledge, opportunities, and platforms to rise and lead.",
    link: "/vision",
  },
  {
    title: "OUR VALUES",
    subtitle: "VALUES",
    icon: Handshake,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "Purity, Transparency, Sustainability, and Care — we handpick every ingredient with love and responsibility toward people and planet.",
    link: "/values",
  },
];

export default function VisionMissionValues() {
  return (

    <section className="py-20 bg-[#171719]">
      <h1 className='text-4xl md:text-5xl text-center font-bold'>Mission & <span className='text-[#196bdf]'>Objectives</span></h1>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-10">
          {sections.map((item, index) => (
            <Link href={item.link} key={index}>
              <div className={`group relative bg-gradient-to-t from-[#0E0E10] to-[#17171A] rounded-3xl shadow-xl border-4 ${item.border} p-10 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer`}>
                {/* Circular Arrow Background Effect */}
                <div className={`absolute inset-0 rounded-3xl opacity-10 ${item.bg}`}></div>

                {/* Icon Circle */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className={`w-28 h-28 rounded-full ${item.bg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-14 h-14 ${item.color}`} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wider">{item.subtitle}</p>
                    <h3 className={`text-2xl font-bold mt-2 ${item.color}`}>{item.title}</h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {item.text}
                  </p>

                  {/* View More Button */}
                  <span className={`inline-flex items-center gap-2 mt-4 text-sm font-bold ${item.color} group-hover:gap-4 transition-all`}>
                    VIEW MORE
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}