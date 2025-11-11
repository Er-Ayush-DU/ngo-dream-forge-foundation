// // src/app/login/page.js
// 'use client';
// import { useState } from 'react';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     const res = await signIn('credentials', {
//       redirect: false,
//       email,
//       password,
//       isAdmin: isAdmin ? 'on' : '',
//     });

//     if (res?.error) {
//       setError('Invalid email or password');
//     } else {
//       // Redirect based on role
//       const session = await fetch('/api/auth/session').then(r => r.json());
//       if (session?.user?.role === 'ADMIN') {
//         router.push('/admin');
//       } else {
//         router.push('/');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-black p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//         {error && <p className="text-red-600 text-center mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={isAdmin}
//               onChange={(e) => setIsAdmin(e.target.checked)}
//             />
//             <span>Login as Admin</span>
//           </label>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }