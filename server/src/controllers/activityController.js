import { ActivityLog } from '../models/ActivityLog.js';
import { asyncHandler } from '../utils/error.js';
import { logActivity } from '../services/activityService.js';

export const createActivity = asyncHandler(async (req, res) => {
  const { type, message, metadata } = req.body;
  const activity = await logActivity(req.user._id, type, message, metadata);
  res.status(201).json({ success: true, activity });
});

export const listActivities = asyncHandler(async (req, res) => {
  const activities = await ActivityLog.find({ user: req.user._id }).sort('-createdAt').limit(100);
  res.json({ success: true, activities });
});
