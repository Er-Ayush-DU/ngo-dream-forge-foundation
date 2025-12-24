// // src/app/admin/login/page.js
// 'use client';
// import { useState, useEffect } from 'react';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import dynamic from 'next/dynamic';
// import Link from 'next/link';

// // IMAGE KO DYNAMIC IMPORT KARO → NO SSR
// const BackgroundImage = dynamic(() => import('@/components/BackgroundImage'), {
//   ssr: false,
// });

// export default function AdminLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [mounted, setMounted] = useState(false);
//   const router = useRouter();

//   // MOUNTED HONE KE BAAD HI RENDER
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await signIn('credentials', {
//       redirect: false,
//       email,
//       password,
//       // isAdmin: 'on',
//     });

//     if (res?.error) {
//       setError('Invalid credentials');
//     } else {
//       router.push('/admin/dashboard');
//     }
//   };

//   // MOUNTED NAHI → LOADING DIKHAO
//   if (!mounted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black">
//         <div className="animate-pulse text-cyan-400 text-2xl">INITIALIZING...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
//       {/* BACKGROUND IMAGE */}
//       <BackgroundImage />

//       {/* GLASS CARD */}
//       <div className="relative z-10 w-full max-w-md mx-4">
//         <div className="backdrop-blur-xl bg-white/10 border border-cyan-500/30 rounded-2xl shadow-2xl p-8">
//           <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
//             ADMIN PORTAL
//           </h2>

//           {error && (
//             <p className="text-red-400 text-center mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
//               {error}
//             </p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <input
//               type="email"
//               placeholder="admin@dreamforge.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-5 py-4 bg-white/10 border border-cyan-500/50 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-5 py-4 bg-white/10 border border-cyan-500/50 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all cursor-pointer"
//             >
//               ACCESS GRANTED
//             </button>
//           </form>
//           <Link href="/admin/forgot-password" className='text-blue-600'>
//             <p className='mt-6 text-center'>Forgot Password</p>
//           </Link>
//           {/* <p className="text-center text-cyan-300/70 text-sm mt-6">
//             Secure Admin Access Only
//           </p> */}
//         </div>
//       </div>
//     </div>
//   );
// }


// src/app/admin/login/page.js
'use client';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamic import for BackgroundImage (no SSR)
const BackgroundImage = dynamic(() => import('@/components/BackgroundImage'), {
  ssr: false,
});

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/admin/dashboard');
    }
  };

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

            {/* PASSWORD INPUT WITH TOGGLE */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 pr-12 bg-white/10 border border-cyan-500/50 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                required
              />
              {/* Eye Icon Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-300 hover:text-cyan-100 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  // Eye Off (Hidden)
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  // Eye On (Visible)
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all cursor-pointer"
            >
              ACCESS GRANTED
            </button>
          </form>

          <Link href="/admin/forgot-password">
            <p className="mt-6 text-center text-cyan-300 hover:text-cyan-100 cursor-pointer transition-colors">
              Forgot Password?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}