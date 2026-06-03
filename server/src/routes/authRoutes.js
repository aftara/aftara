import express from 'express';
import { getProfile, login, register, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

export const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/profile', protect, getProfile);
authRouter.put('/profile', protect, updateProfile);
