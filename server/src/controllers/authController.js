import { User } from '../models/User.js';
import { AppError, asyncHandler } from '../utils/error.js';
import { signToken } from '../utils/jwt.js';
import { logActivity } from '../services/activityService.js';

function authResponse(user, statusCode, res) {
  const token = signToken(user._id);
  res.status(statusCode).json({ success: true, token, user: user.toSafeObject() });
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, disabilityType } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError('Email is already registered', 409);

  const user = await User.create({ name, email, password, phone, disabilityType });
  await logActivity(user._id, 'profile', 'User registered');
  authResponse(user, 201, res);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new AppError('Invalid email or password', 401);

  await logActivity(user._id, 'profile', 'User logged in');
  authResponse(user, 200, res);
});

export const getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user.toSafeObject() });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const allowed = ['name', 'phone', 'disabilityType', 'accessibility'];
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) req.user[field] = req.body[field];
  });
  await req.user.save();
  await logActivity(req.user._id, 'profile', 'Profile updated');
  res.json({ success: true, user: req.user.toSafeObject() });
});
