import jwt from 'jsonwebtoken';

import { secret } from '../config/auth.config.js';

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('No authorization header provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
