// components/Navbar.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { signOut } from 'next-auth/react';

const Navbar = ({ session }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // ADMIN LINK HATA DIYA
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', scroll: 'programs-section' },
    { name: 'Publications', scroll: 'publications-section' },
    { name: 'Impact', scroll: 'impact-section' },
    { name: 'Exams', href: 'https://ez-vfilms.vercel.app/' },
    { name: 'Contact', href: '/contact' },
  ];

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
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const handleNavClick = (item) => {
    if (item.scroll) {
      scrollToSection(item.scroll);
    } else {
      router.push(item.href);
      closeMobileMenu();
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
    closeMobileMenu();
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 lg:py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 flex-shrink-0 cursor-pointer"
            onClick={() => handleNavClick({ href: '/' })}
          >
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-lg">DF</span>
            </div>
            <Link href="/" className="text-lg lg:text-xl font-bold text-gray-900 hidden sm:block">
              Dream Forge Foundation
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <motion.div key={item.name} whileHover={{ y: -1 }}>
                {item.scroll ? (
                  <button
                    onClick={() => scrollToSection(item.scroll)}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition"
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}

            {/* Auth */}
            <div className="ml-4 pl-4 border-l border-gray-200">
              {session ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium"
                >
                  Logout
                </motion.button>
              ) : (
                <Link
                  href="/admin/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className="p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.scroll ? (
                  <button
                    onClick={() => scrollToSection(item.scroll)}
                    className="block w-full text-left px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t">
              {session ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 bg-red-600 text-white rounded-lg"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/admin/login"
                  onClick={closeMobileMenu}
                  className="block w-full text-left px-4 py-3 bg-blue-600 text-white rounded-lg"
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;