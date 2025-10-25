import jwt from "jsonwebtoken"

function verifyAdmin(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'Access Denied: No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ message: 'Not authorized' });

    next(); 
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export default verifyAdmin
