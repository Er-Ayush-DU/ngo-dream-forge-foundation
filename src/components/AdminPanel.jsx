// src/components/AdminPanel.jsx
'use client';
import { Upload, Users, FileText, Settings, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminPanel({ session }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-800">DreamForge Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Hi, <strong>{session.user.name}</strong></span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Students" value="1,234" icon={Users} color="purple" />
          <StatCard title="Programs" value="8" icon={FileText} color="pink" />
          <StatCard title="Results" value="156" icon={Upload} color="green" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Upload Results</h2>
            <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Drop CSV file here</p>
              <input type="file" accept=".csv" className="hidden" id="csv" />
              <label htmlFor="csv" className="cursor-pointer inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Choose File
              </label>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <ActionButton icon={Users} label="View Students" />
              <ActionButton icon={FileText} label="Publications" />
              <ActionButton icon={Settings} label="Settings" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable Components
function StatCard({ title, value, icon: Icon, color }) {
  const colors = {
    purple: 'bg-purple-100 text-purple-600',
    pink: 'bg-pink-100 text-pink-600',
    green: 'bg-green-100 text-green-600'
  };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition">
      <Icon className="w-6 h-6 text-purple-600" />
      <span className="font-medium">{label}</span>
    </button>
  );
}