// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from '@/lib/mongoose';
import User from '@/models/User';

// === AUTH OPTIONS ===
const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        isAdmin: { label: 'Login as Admin', type: 'checkbox' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await dbConnect();
        const role = credentials.isAdmin === 'on' ? 'ADMIN' : 'STUDENT';
        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
          role,
        }).select('+password');

        if (!user || !user.password) return null;
        const valid = await user.comparePassword(credentials.password);
        if (!valid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullName,
          role: user.role,
          isAdmin: user.role === 'ADMIN',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};

// === NEXTAUTH HANDLER WITHOUT `handlers` ===
const handler = NextAuth(authOptions);

// === EXPORT GET & POST MANUALLY ===
export { handler as GET, handler as POST };