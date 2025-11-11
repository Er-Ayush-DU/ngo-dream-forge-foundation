// src/components/ProfileSection.jsx
'use client';
import { signOut } from 'next-auth/react';

export default function ProfileSection({ session }) {
  return (
    <div className="bg-white shadow-md py-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-800">DreamForge Foundation</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Welcome, <strong>{session.user.name}</strong></span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}