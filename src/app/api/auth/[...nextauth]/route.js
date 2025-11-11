// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from '@/lib/mongoose';
import User from '@/models/User';
// import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'AdminCredentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        isAdmin: { label: 'Admin', type: 'checkbox' },
      },
      async authorize(credentials) {

        console.log('Credentials:', credentials); // DEBUG

        // YE CHECK ZAROORI HAI
        if (credentials.isAdmin !== 'on') {
          console.log('isAdmin missing!');
          return null;
        }
        // console.log('plain password:', credentials.password);
        // console.log("email:", credentials?.email);
        // console.log('isAdmin value:', credentials.isAdmin);
        // const hash = bcrypt.hashSync('admin123', 12);
        // console.log('Hash password of admin123:', hash);

        if (!credentials?.email || !credentials?.password || credentials.isAdmin !== 'on') {
          return null;
        }


        await dbConnect();
        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
          role: 'ADMIN',
        }).select('+password');

        if (!user || !user.password) return null;

        const valid = await user.comparePassword(credentials.password);


        if (!valid) {
          console.log('Password validation failed');
          return null;
        }



        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullName,
          role: 'ADMIN',
        };
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
      if (token.id) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: '/admin/login' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };