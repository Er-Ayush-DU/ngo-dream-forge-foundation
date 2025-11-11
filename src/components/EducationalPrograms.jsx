//src/components/EducationalPrograms.jsx
"use client";
import React from 'react';

const EducationalPrograms = () => {
  const programs = [
    {
      icon: '📖',
      title: 'Digital Literacy Program',
      subtitle: 'Bridging the digital divide by providing computer and internet access to underprivileged students',
      features: [
        'Basic computer skills',
        'Internet safety education',
        'Coding fundamentals'
      ]
    },
    {
      icon: '🏠',
      title: 'After-School Support',
      subtitle: 'Supplementary help for students who need extra academic support',
      features: [
        'Homework assistance',
        'Subject-specific tutoring',
        'Study skills development'
      ]
    },
    {
      icon: '🌱',
      title: 'Scholarship Program',
      subtitle: 'Financial support for meritorious students to continue their education without financial barriers',
      features: [
        'Tuition fee support',
        'Educational material provision',
        'Mentorship opportunities'
      ]
    }
  ];

  return (
    <section className="bg-[#171719] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Our Educational <span className='text-[#194BFD]'>Programs</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive programs designed to address educational gaps and 
            create lasting impact
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-[#0E0E10] to-[#17171A] border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <span className="text-2xl">{program.icon}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {program.title}
              </h3>
              
              {/* Subtitle */}
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {program.subtitle}
              </p>
              
              {/* Features */}
              <ul className="space-y-2 flex-1">
                {program.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationalPrograms;