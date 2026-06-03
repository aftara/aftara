import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['speech', 'ocr', 'object_detection', 'gesture', 'scene_description', 'sos', 'profile'],
      required: true,
    },
    message: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
