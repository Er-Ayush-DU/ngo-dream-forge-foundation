// src/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  fullName: { type: String, required: true },
  role: { type: String, enum: ['ADMIN'], default: 'ADMIN' }, // Sirf ADMIN
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});



userSchema.methods.comparePassword = async function (pass) {
  const isMatch = bcrypt.compare(pass, this.password);
  console.log('Comparing passwords:', { pass, storedHash: this.password, isMatch });
  console.log('Password match result:', isMatch);
  return isMatch;
};



export default mongoose.models.User || mongoose.model('User', userSchema);