// src/app/api/admin/register/route.js
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(req) {
  try {
    const { email, password, fullName } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    await dbConnect();

    // Check if admin already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
    }

    // PLAIN PASSWORD DAALO → pre('save') apne aap hash karega
    await User.create({
      email: email.toLowerCase(),
      password, // <-- NO HASH HERE
      fullName,
      role: 'ADMIN',
    });

    console.log('Admin created successfully:', email);

    // Redirect to dashboard
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}