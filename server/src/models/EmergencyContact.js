import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    relationship: { type: String, trim: true, default: 'Emergency Contact' },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    isPrimary: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);
