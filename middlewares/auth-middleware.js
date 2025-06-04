import jwt from 'jsonwebtoken';


export const authenticate=(req, res, next)=> {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authenticate' });

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
}

export const authorize=(role)=> {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ error: 'Only admin can take action not user.' });
    next();
  };
}

