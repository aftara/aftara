import mongoose from 'mongoose';

const sosHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['triggered', 'sent', 'acknowledged', 'cancelled'], default: 'triggered' },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      accuracy: { type: Number },
      mapsUrl: { type: String, required: true },
    },
    notifiedContacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EmergencyContact' }],
  },
  { timestamps: true }
);

export const SOSHistory = mongoose.model('SOSHistory', sosHistorySchema);
