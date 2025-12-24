// components/Navbar.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';  // ← useRef add kiya
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { signOut } from 'next-auth/react';

const Navbar = ({ session }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const mobileMenuRef = useRef(null); // ← YE NAYA ADD KIYA

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', scroll: 'about-section' },
    { name: 'Programs', scroll: 'programs-section' },
    { name: 'Publications', scroll: 'publications-section' },
    { name: 'Impact', scroll: 'impact-section' },
    { name: 'Exams', href: 'http://dtbe.in', external: true },
    { name: 'Contact', scroll: 'contact-section' },
  ];

  // SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // OUTSIDE CLICK → MENU BAND HO JAYEGA
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    } else {
      router.push('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
    closeMobileMenu();
  };

  return (
    <>
      {/* HERO IMAGE */}
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src="/hero-image.jpg"
          alt="Dream Forge Foundation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-20 left-0 right-0 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Dream Forge Foundation</h1>
          <p className="text-xl md:text-2xl">Shaping Futures, Building Dreams</p>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-lg border-b border-gray-200' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/')}>
              <div>
                <img
                  src="dff_logo.jpg"
                  alt="Dream Forge Foundation Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
              {/* <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${isScrolled ? 'bg-blue-600' : 'bg-blue-500'}`}>
                DF
              </div> */}
              <span className={`font-bold text-lg ${isScrolled ? 'text-gray-900' : 'text-white'} hidden sm:block`}>
                Dream Forge Foundation
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <motion.div key={item.name} whileHover={{ y: -2 }}>
                  {item.scroll ? (
                    <button onClick={() => scrollToSection(item.scroll)} className={`font-medium transition ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'}`}>
                      {item.name}
                    </button>
                  ) : item.external ? (
                    <button onClick={() => window.open(item.href, '_blank', 'noopener,noreferrer')} className={`font-medium transition ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'}`}>
                      {item.name}
                    </button>
                  ) : (
                    <Link href={item.href} className={`font-medium transition ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'}`}>
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              {session ? (
                <motion.button whileHover={{ scale: 1.05 }} onClick={handleLogout} className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">
                  Logout
                </motion.button>
              ) : (
                <Link href="/admin/login" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                  Admin Login
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <button onClick={toggleMobileMenu} className={`lg:hidden p-2 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU — WITH OUTSIDE CLICK CLOSE */}
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}  // ← YE REF LAGA DIYA
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-x-0 top-16 bg-[#171719] border-t border-gray-800 z-40"
          >
            <div className="px-6 py-8 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.scroll ? (
                    <button onClick={() => scrollToSection(item.scroll)} className="block w-full text-left py-3 text-white text-lg font-medium hover:text-blue-400 transition">
                      {item.name}
                    </button>
                  ) : item.external ? (
                    <button onClick={() => { window.open(item.href, '_blank', 'noopener,noreferrer'); closeMobileMenu(); }} className="block w-full text-left py-3 text-white text-lg font-medium hover:text-blue-400 transition">
                      {item.name}
                    </button>
                  ) : (
                    <Link href={item.href} onClick={closeMobileMenu} className="block py-3 text-white text-lg font-medium hover:text-blue-400 transition">
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-6 border-t border-gray-700">
                {session ? (
                  <button onClick={handleLogout} className="w-full py-4 bg-red-600 text-white rounded-lg font-bold text-lg hover:bg-red-700 transition">
                    Logout
                  </button>
                ) : (
                  <Link href="/admin/login" onClick={closeMobileMenu} className="block w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg text-center hover:bg-blue-700 transition">
                    Admin Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Navbar;