import jwt from "jsonwebtoken"

function verifyUser(req, res, next) {


  const token = req.header('user-token');
  if (!token) return res.status(401).json({ message: 'Access Denied: No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isUser) return res.status(403).json({ message: 'Not authorized' });

     req.user = decoded


    next(); 
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export default verifyUser
