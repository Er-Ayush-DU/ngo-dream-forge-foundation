// src/lib/nodemailer.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendResetEmail = async (email, resetLink) => {
  await transporter.sendMail({
    from: `"DreamForge Admin" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: '🔐 Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #0f0f1e; color: #fff; border-radius: 10px;">
        <h2 style="color: #00ffcc;">Password Reset</h2>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: #00ffcc; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold;">
          RESET PASSWORD
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">
          Link expires in 1 hour. If you didn't request this, ignore.
        </p>
      </div>
    `,
  });
};