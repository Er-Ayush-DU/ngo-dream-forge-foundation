// // src/app/admin/page.js
// 'use client';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { Upload, Users, FileText, Settings, LogOut, Menu } from 'lucide-react';

// export default function AdminPanel() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [mobileMenu, setMobileMenu] = useState(false);

//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
//       </div>
//     );
//   }

//   if (!session || session.user.role !== 'ADMIN') {
//     router.push('/admin/login');
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
//       {/* Navbar */}
//       <nav className="bg-white shadow-lg sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-purple-800">DreamForge Admin</h1>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-4">
//               <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition">
//                 <Upload className="w-5 h-5" /> Upload Results
//               </button>
//               <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition">
//                 <Users className="w-5 h-5" /> Manage Users
//               </button>
//               <ProfileDropdown />
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden flex items-center">
//               <button onClick={() => setMobileMenu(!mobileMenu)} className="text-gray-700">
//                 <Menu className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenu && (
//           <div className="md:hidden bg-white border-t">
//             <div className="px-4 py-2 space-y-2">
//               <button className="w-full text-left flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg">
//                 <Upload className="w-5 h-5" /> Upload Results
//               </button>
//               <button className="w-full text-left flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg">
//                 <Users className="w-5 h-5" /> Manage Users
//               </button>
//               <ProfileDropdown mobile />
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-10">
//         <div className="grid md:grid-cols-3 gap-6 mb-10">
//           <StatCard title="Total Students" value="1,234" icon={Users} color="purple" />
//           <StatCard title="Programs Active" value="8" icon={FileText} color="pink" />
//           <StatCard title="Results Uploaded" value="156" icon={Upload} color="green" />
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-white p-8 rounded-2xl shadow-xl">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Exam Results</h2>
//             <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center">
//               <Upload className="w-12 h-12 text-purple-600 mx-auto mb-4" />
//               <p className="text-gray-600 mb-4">Drop CSV file here or click to browse</p>
//               <input type="file" accept=".csv" className="hidden" id="csv-upload" />
//               <label htmlFor="csv-upload" className="cursor-pointer inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
//                 Choose File
//               </label>
//             </div>
//           </div>

//           <div className="bg-white p-8 rounded-2xl shadow-xl">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
//             <div className="space-y-4">
//               <ActionButton icon={Users} label="View All Students" />
//               <ActionButton icon={FileText} label="Manage Publications" />
//               <ActionButton icon={Settings} label="System Settings" />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// // Reusable Components
// function StatCard({ title, value, icon: Icon, color }) {
//   const colors = {
//     purple: 'bg-purple-100 text-purple-600',
//     pink: 'bg-pink-100 text-pink-600',
//     green: 'bg-green-100 text-green-600'
//   };
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-lg">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-600 text-sm">{title}</p>
//           <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
//         </div>
//         <div className={`p-3 rounded-full ${colors[color]}`}>
//           <Icon className="w-6 h-6" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function ActionButton({ icon: Icon, label }) {
//   return (
//     <button className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 hover:shadow-md transition">
//       <Icon className="w-6 h-6 text-purple-600" />
//       <span className="text-gray-700 font-medium">{label}</span>
//     </button>
//   );
// }

// function ProfileDropdown({ mobile }) {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [open, setOpen] = useState(false);

//   const handleLogout = () => {
//     signOut({ callbackUrl: '/' });
//   };

//   return (
//     <div className={`relative ${mobile ? 'w-full' : ''}`}>
//       <button
//         onClick={() => setOpen(!open)}
//         className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-50 transition ${mobile ? 'w-full justify-between' : ''}`}
//       >
//         <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
//           {session?.user?.name?.[0] || 'A'}
//         </div>
//         <span className="hidden md:block text-gray-700 font-medium">{session?.user?.name}</span>
//         <svg className={`w-4 h-4 transition ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {open && (
//         <div className={`absolute ${mobile ? 'left-0 right-0' : 'right-0'} mt-2 bg-white rounded-lg shadow-xl border w-56 z-50`}>
//           <div className="p-4 border-b">
//             <p className="font-semibold text-gray-800">{session?.user?.name}</p>
//             <p className="text-sm text-gray-600">{session?.user?.email}</p>
//           </div>
//           <button className="w-full text-left px-4 py-3 hover:bg-purple-50 flex items-center gap-2 text-gray-700">
//             <Settings className="w-4 h-4" /> Change Password
//           </button>
//           <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-2 text-red-600">
//             <LogOut className="w-4 h-4" /> Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


// src/app/admin/dashboard/page.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // BINA LOGIN YA NON-ADMIN → LOGIN PE BHEJO
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/admin/login');
  }

  // ADMIN HAI → DASHBOARD DIKHAO
  return <AdminPanel session={session} />;
}