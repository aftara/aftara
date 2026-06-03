import { User } from '../models/User.js';
import { AppError, asyncHandler } from '../utils/error.js';
import { verifyToken } from '../utils/jwt.js';

export const protect = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) throw new AppError('Authentication token is required', 401);

  const decoded = verifyToken(header.split(' ')[1]);
  const user = await User.findById(decoded.id);
  if (!user) throw new AppError('User no longer exists', 401);

  req.user = user;
  next();
});
