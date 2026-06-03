import express from 'express';
import { listSosHistory, triggerSos } from '../controllers/sosController.js';
import { protect } from '../middleware/auth.js';

export const sosRouter = express.Router();

sosRouter.use(protect);
sosRouter.route('/').get(listSosHistory).post(triggerSos);
