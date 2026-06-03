import express from 'express';
import { createActivity, listActivities } from '../controllers/activityController.js';
import { protect } from '../middleware/auth.js';

export const activityRouter = express.Router();

activityRouter.use(protect);
activityRouter.route('/').get(listActivities).post(createActivity);
