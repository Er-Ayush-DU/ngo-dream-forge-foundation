// src/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  fullName: { type: String, required: true },
  role: { type: String, enum: ['STUDENT', 'ADMIN'], default: 'STUDENT' },
  studentId: { type: String, unique: true, sparse: true },
  // googleId: { type: String, unique: true, sparse: true }, → HATAYA
  emailVerified: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

// Auto Student ID
userSchema.pre('save', async function (next) {
  if (this.isNew && this.role === 'STUDENT' && !this.studentId) {
    const count = await this.constructor.countDocuments({ role: 'STUDENT' });
    const year = new Date().getFullYear().toString().slice(-2);
    this.studentId = `DFF${String(count + 1).padStart(4, '0')}${year}`;
  }

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (pass) {
  return bcrypt.compare(pass, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);