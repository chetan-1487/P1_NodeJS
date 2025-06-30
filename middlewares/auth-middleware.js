import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, 'secret'); // Replace with process.env.JWT_SECRET
    req.user = decoded; // Attach user info to req
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const authorize = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: 'Only admin can take action, not user' });
    }
    next();
  };
};
