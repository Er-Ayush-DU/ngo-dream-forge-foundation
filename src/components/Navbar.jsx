// components/Navbar.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession(); // ← Auth status

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Publications', href: '/publications' },
    { name: 'Impact', href: '/impact' },
    { name: 'Exams', href: '/exams' },
    { name: 'Contact', href: '/contact' },
    // Admin link — hidden in UI for non-admins
    { name: 'Admin', href: '/admin', adminOnly: true }
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (href) => {
    router.push(href);
    closeMobileMenu();
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/register' });
    closeMobileMenu();
  };

  // Filter admin link for non-admins
  const visibleNav = navigation.filter(item =>
    !item.adminOnly || session?.user?.role === 'ADMIN'
  );

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 lg:py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 flex-shrink-0 cursor-pointer"
            onClick={() => handleNavClick('/')}
          >
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-lg">DF</span>
            </div>
            <Link href="/" className="text-lg lg:text-xl font-bold text-gray-900 hidden sm:block">
              Dream Forge Foundation
            </Link>
          </motion.div>

          {/* Desktop: Navigation + Auth */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Main Links */}
            <div className="flex items-center space-x-1">
              {visibleNav.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -1 }}
                  className="relative group"
                  onClick={() => handleNavClick(item.href)}
                >
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 px-2 lg:px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                  >
                    {item.name}
                    {item.adminOnly && (
                      <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Auth Button */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
              {status === 'authenticated' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 rounded-md shadow-sm transition-all duration-200"
                >
                  Logout
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick('/register')}
                >
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md shadow-sm transition-all duration-200"
                  >
                    Register
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <motion.button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900 p-2"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Links */}
            <div className="space-y-1">
              {visibleNav.map((item) => (
                <motion.div
                  key={item.name}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleNavClick(item.href)}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg text-base font-medium transition-colors duration-200 flex items-center"
                  >
                    {item.name}
                    {item.adminOnly && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Auth */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              {status === 'authenticated' ? (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 shadow-sm transition-all duration-200"
                >
                  Logout
                </motion.button>
              ) : (
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleNavClick('/register')}
                >
                  <Link
                    href="/register"
                    onClick={closeMobileMenu}
                    className="block w-full text-left px-4 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all duration-200"
                  >
                    Register
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;