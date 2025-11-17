// src/app/admin/reset-password/[token]/page.js
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage('Password reset successful! Redirecting...');
      setTimeout(() => window.location.href = '/admin/login', 2000);
    } else {
      setError(data.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/10 border border-cyan-500/30 rounded-2xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            RESET PASSWORD
          </h2>

          {error && <p className="text-red-400 text-center mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">{error}</p>}
          {message && <p className="text-green-400 text-center mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-white/10 border border-cyan-500/50 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-5 py-4 bg-white/10 border border-cyan-500/50 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all disabled:opacity-70"
            >
              {loading ? 'RESETTING...' : 'RESET PASSWORD'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}