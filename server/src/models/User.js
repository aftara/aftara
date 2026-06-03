import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';

const accessibilitySchema = new mongoose.Schema(
  {
    darkMode: { type: Boolean, default: false },
    highContrast: { type: Boolean, default: false },
    preferredLanguage: { type: String, default: 'en-US' },
    voiceNavigation: { type: Boolean, default: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: { type: String, required: true, minlength: 8, select: false },
    phone: { type: String, trim: true },
    disabilityType: {
      type: String,
      enum: ['visual', 'speech', 'mobility', 'hearing', 'multiple', 'other'],
      default: 'other',
    },
    accessibility: { type: accessibilitySchema, default: () => ({}) },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toSafeObject = function toSafeObject() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = mongoose.model('User', userSchema);
