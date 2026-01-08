// components/Footer.jsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  const navigation = {
    about: [
      { name: 'About Us', href: '/' },
      { name: 'Our Programs', href: '/' },
      { name: 'Publications', href: '/' },
      { name: 'Our Impact', href: '/' },
    ],
    quickLinks: [
      { name: 'Exams', href: 'https://www.dtbe.in/' },
      { name: 'Donate', href: '/' },
      { name: 'Volunteer', href: '/' },
      { name: 'Partner with Us', href: '/' },
      { name: 'Careers', href: '/' },
    ],
    getInvolved: [
      { name: 'Donate', href: '/' },
      { name: 'Volunteer', href: '/' },
      { name: 'Partner with Us', href: '/' },
      { name: 'Careers', href: '/' },
    ]
  };

  const socialMedia = [
    { name: 'Facebook', href: '/', icon: '📘', ariaLabel: 'Facebook' },
    { name: 'Twitter', href: '/', icon: '🐦', ariaLabel: 'Twitter' },
    { name: 'LinkedIn', href: '/', icon: '💼', ariaLabel: 'LinkedIn' },
  ];

  // const handleSocialClick = (href, ariaLabel) => {
  //   // Implement social media tracking or opening in new tab
  //   window.open(href, '_blank', 'noopener,noreferrer');
  // };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gray-900 border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Dream Forge Foundation Column */}
          <div className="lg:col-span-1">
            <motion.div
              className="flex justify-center lg:justify-start"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Dream Forge Foundation
              </h3>
            </motion.div>
            <motion.p
              className="text-gray-400 text-sm mb-6 leading-relaxed text-center lg:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Empowering education, building futures for underprivileged children worldwide.
            </motion.p>

            {/* Social Media Icons */}
            <div className="flex justify-center lg:justify-start space-x-4">
              {socialMedia.map((platform) => (
                <motion.button
                  key={platform.name}
                  // onClick={() => handleSocialClick(platform.href, platform.ariaLabel)}
                  className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={platform.ariaLabel}
                >
                  <span className="text-xl">{platform.icon}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-6 text-center lg:text-left">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navigation.quickLinks.map((item) => (
                <motion.li key={item.name} whileHover={{ x: 4 }}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-6 text-center lg:text-left">
              Get Involved
            </h4>
            <ul className="space-y-3">
              {navigation.getInvolved.map((item) => (
                <motion.li key={item.name} whileHover={{ x: 4 }}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-6 text-center lg:text-left">
              Contact Us
            </h4>
            <div className="space-y-3 text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                G44, Malkaganj New Delhi 110007
              </p>
              <p className="text-gray-400 text-sm">
                <a href="mailto:dreamforgef@gmail.com" className="hover:text-white transition-colors">
                  dreamforgef@gmail.com
                </a>
              </p>
              <p className="text-gray-400 text-sm">
                <a href="tel:+919211052177" className="hover:text-white transition-colors">
                  +91-9211052177
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-800 pt-8 mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            © 2024 Dream Forge Foundation. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;