// // src/app/api/auth/[...nextauth]/route.js
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { dbConnect } from '@/lib/mongoose';
// import User from '@/models/User';
// // import bcrypt from 'bcryptjs';

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'AdminCredentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//         // isAdmin: { label: 'Admin', type: 'checkbox' },
//       },
//       async authorize(credentials) {

//         console.log('Credentials:', credentials); // DEBUG

//         // YE CHECK ZAROORI HAI
//         // if (credentials.isAdmin !== 'on') {
//         //   console.log('isAdmin missing!');
//         //   return null;
//         // }
//         // console.log('plain password:', credentials.password);
//         // console.log("email:", credentials?.email);
//         // console.log('isAdmin value:', credentials.isAdmin);
//         // const hash = bcrypt.hashSync('admin123', 12);
//         // console.log('Hash password of admin123:', hash);

//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }


//         await dbConnect();
//         const user = await User.findOne({
//           email: credentials.email.toLowerCase(),
//           role: 'ADMIN',
//         }).select('+password');

//         if (!user || !user.password) return null;

//         if (!user || user.role !== 'ADMIN') {
//           console.log("User not found or not admin");
//           return null;
//         }

//         const valid = await user.comparePassword(credentials.password);
//         if (!valid) {
//           console.log('Password validation failed');
//           return null;
//         }



//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.fullName,
//           role: 'ADMIN',
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token.id) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   pages: { signIn: '/admin/login' },
//   session: { strategy: 'jwt' },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };



// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from '@/lib/mongoose';
import User from '@/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'AdminCredentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // DEBUG LOG (optional, baad mein hata dena)
        console.log('Login attempt →', {
          email: credentials?.email,
          hasPassword: !!credentials?.password,
        });

        // Basic validation
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password');
          return null;
        }

        try {
          await dbConnect();

          // YE LINE SABSE ZAROORI HAI → PASSWORD KO FORCE SELECT KARO
          const user = await User.findOne({
            email: credentials.email.toLowerCase(),
          }).select('+password');

          // Agar user nahi mila ya admin nahi hai
          if (!user) {
            console.log('User not found');
            return null;
          }

          if (user.role !== 'ADMIN') {
            console.log('User is not admin');
            return null;
          }

          if (!user.password) {
            console.log('User has no password set');
            return null;
          }

          // Password compare karo
          const isValid = await user.comparePassword(credentials.password);
          if (!isValid) {
            console.log('Invalid password');
            return null;
          }

          console.log('LOGIN SUCCESS →', user.email);

          // Success → user return karo
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.fullName || 'Admin',
            role: user.role,
          };
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: '/admin/login',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };