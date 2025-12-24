// // src/app/admin/reset-password/[token]/page.js
// 'use client';
// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';

// export default function ResetPassword() {
//   const [password, setPassword] = useState('');
//   const [confirm, setConfirm] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { token } = useParams();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirm) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     const res = await fetch('/api/auth/reset-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token, password }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       setMessage('Password reset successful! Redirecting...');
//       setTimeout(() => window.location.href = '/admin/login', 2000);
//     } else {
//       setError(data.error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900" />
//         <div className="absolute inset-0 bg-black/50" />
//       </div>

//       <div className="relative z-10 w-full max-w-md mx-4">
//         <div className="backdrop-blur-xl bg-white/10 border border-cyan-500/30 rounded-2xl shadow-2xl p-8">
//           <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
//             RESET PASSWORD
//           </h2>

//           {error && <p className="text-red-400 text-center mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">{error}</p>}
//           {message && <p className="text-green-400 text-center mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">{message}</p>}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <input
//               type="password"
//               placeholder="New Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-5 py-4 bg-white/10 border border-cyan-500/50 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//               className="w-full px-5 py-4 bg-white/10 border border-cyan-500/50 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//               required
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all disabled:opacity-70"
//             >
//               {loading ? 'RESETTING...' : 'RESET PASSWORD'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/app/admin/reset-password/[token]/page.js
'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    if (!password.trim()) {
      setError('Password cannot be empty');
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
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/admin/login';
      }, 2000);
    } else {
      setError(data.error || 'Something went wrong');
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

          {error && (
            <p className="text-red-400 text-center mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              {error}
            </p>
          )}
          {message && (
            <p className="text-green-400 text-center mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 pr-12 bg-white/10 border border-cyan-500/50 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-300 hover:text-cyan-100 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-5 py-4 pr-12 bg-white/10 border border-cyan-500/50 rounded-xl text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-300 hover:text-cyan-100 transition-colors"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'RESETTING...' : 'RESET PASSWORD'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}