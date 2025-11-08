// src/app/ClientLayout.js
'use client';

import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </SessionProvider>
  );
}