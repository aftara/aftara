import { ActivityLog } from '../models/ActivityLog.js';

export function logActivity(user, type, message, metadata = {}) {
  return ActivityLog.create({ user, type, message, metadata });
}
