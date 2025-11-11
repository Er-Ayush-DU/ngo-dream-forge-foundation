// src/app/admin/login/page.js
'use client';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// IMAGE KO DYNAMIC IMPORT KARO → NO SSR
const BackgroundImage = dynamic(() => import('@/components/BackgroundImage'), {
  ssr: false,
});

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // MOUNTED HONE KE BAAD HI RENDER
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      isAdmin: 'on',
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/admin/dashboard');
    }
  };

  // MOUNTED NAHI → LOADING DIKHAO
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-cyan-400 text-2xl">INITIALIZING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <BackgroundImage />

      {/* GLASS CARD */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/10 border border-cyan-500/30 rounded-2xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            ADMIN PORTAL
          </h2>

          {error && (
            <p className="text-red-400 text-center mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="admin@dreamforge.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-white/10 border border-cyan-500/50 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-white/10 border border-cyan-500/50 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              required
            />
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all"
            >
              ACCESS GRANTED
            </button>
          </form>

          <p className="text-center text-cyan-300/70 text-sm mt-6">
            Secure Admin Access Only
          </p>
        </div>
      </div>
    </div>
  );
}