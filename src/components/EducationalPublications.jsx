//src/components/EducationalPublications.jsx

"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const EducationalPublications = () => {
  const [activeTab, setActiveTab] = useState('all');

  const publications = [
    {
      id: 1,
      type: 'Magazine',
      title: 'Future Learners',
      description: 'Innovative teaching methods and student success stories from our programs.',
      issue: 'Issue #2 - Aug 2024',
      action: 'Read Online',
      actionVariant: 'primary',
      imageAlt: 'Colorful magazine cover featuring STEM education and robotics workshop with enthusiastic students',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      typeColor: 'bg-blue-100 text-blue-800',
      actionColor: 'bg-indigo-600 hover:bg-indigo-700',
      category: 'magazines'
    },
    {
      id: 2,
      type: 'Book',
      title: 'Digital Literacy for All',
      description: 'Comprehensive guide to computer skills and internet safety for beginners.',
      author: 'Dr. Sarah Chen',
      year: '2024',
      action: 'Download PDF',
      actionVariant: 'secondary',
      imageAlt: 'Educational textbook cover showing community development and social impact concepts',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      typeColor: 'bg-green-100 text-green-800',
      actionColor: 'bg-emerald-600 hover:bg-emerald-700',
      category: 'books'
    },
    {
      id: 3,
      type: 'Research Article',
      title: 'Impact of After-School Programs',
      description: 'Research study on the effectiveness of supplementary education in underprivileged communities.',
      author: 'Dr. Michael Roberts',
      date: 'Jul 2024',
      action: 'Read More',
      actionVariant: 'tertiary',
      imageAlt: 'Academic paper with infographics showing scholarship program success metrics and student outcomes',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      typeColor: 'bg-purple-100 text-purple-800',
      actionColor: 'bg-purple-600 hover:bg-purple-700',
      category: 'articles'
    },
    // Add more sample data for testing
    {
      id: 4,
      type: 'Magazine',
      title: 'STEM Education Review',
      description: 'Exploring science, technology, engineering, and mathematics education innovations.',
      issue: 'Issue #1 - Jun 2024',
      action: 'Read Online',
      actionVariant: 'primary',
      imageAlt: 'STEM magazine cover with innovative classroom technology',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      typeColor: 'bg-blue-100 text-blue-800',
      actionColor: 'bg-indigo-600 hover:bg-indigo-700',
      category: 'magazines'
    },
    {
      id: 5,
      type: 'Book',
      title: 'Community Education Handbook',
      description: 'Practical guide for establishing and maintaining learning centers, community development.',
      author: 'Prof. James Wilson',
      year: '2023',
      action: 'Download PDF',
      actionVariant: 'secondary',
      imageAlt: 'Community education handbook cover',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      typeColor: 'bg-green-100 text-green-800',
      actionColor: 'bg-emerald-600 hover:bg-emerald-700',
      category: 'books'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Publications', active: activeTab === 'all' },
    { id: 'magazines', label: 'Magazines', active: activeTab === 'magazines' },
    { id: 'books', label: 'Books', active: activeTab === 'books' },
    { id: 'articles', label: 'Articles', active: activeTab === 'articles' }
  ];

  const filteredPublications = publications.filter((pub) => {
    if (activeTab === 'all') return true;
    return pub.category === activeTab;
  });

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <section className="bg-[#171719] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white sm:text-4xl">
            Educational <span className='text-[#194BFD]'>Publications</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our collection of educational magazines, books, and articles to
            support learning
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${tab.active
                ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                }`}
              aria-pressed={tab.active}
              aria-label={`Filter by ${tab.label.toLowerCase()}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Publications Count */}
        <div className="text-center mb-6 text-gray-500">
          Showing {filteredPublications.length} {activeTab === 'all' ? 'publications' : activeTab}
          {filteredPublications.length !== 1 ? 's' : ''}
        </div>

        {/* Publications Grid */}
        {filteredPublications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPublications.map((pub) => (
              <div
                key={pub.id}
                className={`relative bg-gradient-to-r from-[#0E0E10] to-[#17171A] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${pub.bgColor} ${pub.borderColor}`}
              >
                {/* Publication Type Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${pub.typeColor}`}>
                  {pub.type}
                </span>

                {/* Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-gray-400 text-3xl">
                    {pub.type === 'Magazine' ? '📖' : pub.type === 'Book' ? '📚' : '📄'}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                  {pub.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {pub.description}
                </p>

                {/* Issue/Author Info */}
                <div className="text-sm text-gray-500 mb-4 space-y-1">
                  {pub.issue && <div>{pub.issue}</div>}
                  {pub.author && <div>{pub.author} • {pub.year}</div>}
                  {pub.date && <div>{pub.date}</div>}
                </div>

                {/* Action Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${pub.actionColor}`}
                  aria-label={`Click to ${pub.action.toLowerCase()} ${pub.title}`}
                >
                  {pub.action}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No publications found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EducationalPublications;