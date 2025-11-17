// src/app/api/auth/forgot-password/route.js
import { dbConnect } from '@/lib/mongoose';
import User from '@/models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { sendResetEmail } from '@/lib/nodemailer';

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();

    const user = await User.findOne({ 
      email: email.toLowerCase(), 
      role: 'ADMIN' 
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'Admin not found' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/reset-password/${token}`;

    // AB GMAIL PE BHEJEGA
    await sendResetEmail(email, resetLink);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' });
  }
}