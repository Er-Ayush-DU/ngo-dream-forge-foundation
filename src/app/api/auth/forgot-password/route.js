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

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find admin user (case-insensitive email)
    const user = await User.findOne({
      email: email.toLowerCase(),
      role: 'ADMIN'
    });

    if (!user) {
      // Security best practice: Don't reveal if email exists or not
      // Always return success to prevent email enumeration
      return NextResponse.json({ success: false, error: 'Admin not found' });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    // Build correct reset link for both local and production
    const baseUrl = process.env.NEXTAUTH_URL ||
      process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const resetLink = `${baseUrl}/admin/reset-password/${token}`;

    // Send email
    await sendResetEmail(user.email, resetLink);

    return NextResponse.json({
      success: true,
      message: 'Password reset link sent successfully',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}